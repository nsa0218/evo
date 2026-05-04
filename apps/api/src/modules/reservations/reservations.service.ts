import { Injectable, BadRequestException, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Reservation, Payment } from './entities/reservation.entity';
import { Listing, AvailabilityCalendar } from '../listings/entities/listing.entity';
import { ConfigService } from '@nestjs/config';

export class CreateReservationDto {
  listing_id: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  special_requests?: string;
}

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    @InjectRepository(Reservation) private reservationsRepo: Repository<Reservation>,
    @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
    @InjectRepository(Listing) private listingsRepo: Repository<Listing>,
    @InjectRepository(AvailabilityCalendar) private calendarRepo: Repository<AvailabilityCalendar>,
    @InjectQueue('escrow') private escrowQueue: Queue,
    @InjectQueue('notifications') private notifQueue: Queue,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async create(guestId: string, dto: CreateReservationDto): Promise<Reservation> {
    // Transaction ile atomik işlem (race condition koruması)
    return this.dataSource.transaction(async (manager) => {
      // İlanı kilitle
      const listing = await manager
        .createQueryBuilder(Listing, 'l')
        .setLock('pessimistic_write')
        .where('l.id = :id', { id: dto.listing_id })
        .getOne();

      if (!listing || listing.status !== 'active') {
        throw new NotFoundException('İlan bulunamadı veya aktif değil');
      }

      if (listing.host_id === guestId) {
        throw new BadRequestException('Kendi ilanınıza rezervasyon yapamazsınız');
      }

      // Tarih doğrulama
      const checkIn = new Date(dto.check_in);
      const checkOut = new Date(dto.check_out);
      const now = new Date();

      if (checkIn <= now) throw new BadRequestException('Check-in tarihi geçmişte olamaz');
      if (checkOut <= checkIn) throw new BadRequestException('Check-out, check-in sonrası olmalı');

      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      if (nights < listing.min_nights) throw new BadRequestException(`Minimum ${listing.min_nights} gece`);
      if (nights > listing.max_nights) throw new BadRequestException(`Maksimum ${listing.max_nights} gece`);

      if (dto.guests_count > listing.max_guests) {
        throw new BadRequestException(`Maksimum ${listing.max_guests} misafir`);
      }

      // Müsaitlik kontrolü (çakışma var mı?)
      const conflict = await manager
        .createQueryBuilder(Reservation, 'r')
        .where('r.listing_id = :listingId', { listingId: dto.listing_id })
        .andWhere('r.status IN (:...statuses)', { statuses: ['confirmed', 'checked_in', 'pending'] })
        .andWhere('r.check_in < :checkOut AND r.check_out > :checkIn', {
          checkIn: dto.check_in,
          checkOut: dto.check_out,
        })
        .getCount();

      if (conflict > 0) {
        throw new BadRequestException('Seçilen tarihler müsait değil');
      }

      // Fiyat hesapla
      const commissionPercent = Number(this.configService.get('PLATFORM_COMMISSION_PERCENT', '10'));
      const subtotal = Number(listing.base_price_per_night) * nights;
      const cleaningFee = Number(listing.cleaning_fee) || 0;
      const serviceFee = Math.round(subtotal * commissionPercent) / 100;
      const totalPrice = subtotal + cleaningFee + serviceFee;
      const hostPayout = subtotal + cleaningFee - serviceFee;

      // Rezervasyon oluştur
      const reservation = manager.create(Reservation, {
        guest_id: guestId,
        listing_id: dto.listing_id,
        host_id: listing.host_id,
        check_in: dto.check_in,
        check_out: dto.check_out,
        guests_count: dto.guests_count,
        nightly_rate: listing.base_price_per_night,
        nights_count: nights,
        subtotal,
        cleaning_fee: cleaningFee,
        service_fee: serviceFee,
        total_price: totalPrice,
        host_payout: hostPayout,
        currency: listing.currency,
        status: listing.instant_booking ? 'confirmed' : 'pending',
        special_requests: dto.special_requests,
      });

      const saved = await manager.save(reservation);

      // Payment kaydı
      const payment = manager.create(Payment, {
        reservation_id: saved.id,
        amount: totalPrice,
        platform_fee: serviceFee,
        currency: listing.currency,
        status: 'pending',
      });
      await manager.save(payment);

      // Bildirim kuyruğuna ekle
      await this.notifQueue.add('reservation_created', {
        reservation_id: saved.id,
        host_id: listing.host_id,
        guest_id: guestId,
      });

      this.logger.log(`Rezervasyon oluşturuldu: ${saved.id}`);
      return saved;
    });
  }

  async confirm(reservationId: string, hostId: string): Promise<Reservation> {
    const reservation = await this.reservationsRepo.findOneOrFail({
      where: { id: reservationId, host_id: hostId },
    });

    if (reservation.status !== 'pending') {
      throw new BadRequestException('Sadece bekleyen rezervasyonlar onaylanabilir');
    }

    reservation.status = 'confirmed';
    const saved = await this.reservationsRepo.save(reservation);

    // Bildirim
    await this.notifQueue.add('reservation_confirmed', { reservation_id: saved.id });

    return saved;
  }

  async cancel(reservationId: string, userId: string, reason: string): Promise<Reservation> {
    const reservation = await this.reservationsRepo.findOneOrFail({
      where: { id: reservationId },
    });

    if (reservation.guest_id !== userId && reservation.host_id !== userId) {
      throw new ForbiddenException();
    }

    const isHost = reservation.host_id === userId;
    reservation.status = isHost ? 'cancelled_by_host' : 'cancelled_by_guest';
    reservation.cancellation_reason = reason;
    reservation.cancelled_at = new Date();

    return this.reservationsRepo.save(reservation);
  }

  async checkIn(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationsRepo.findOneOrFail({
      where: { id: reservationId },
    });
    reservation.status = 'checked_in';
    const saved = await this.reservationsRepo.save(reservation);

    // Escrow release zamanla
    const hours = Number(this.configService.get('ESCROW_RELEASE_HOURS', '24'));
    await this.escrowQueue.add('release_escrow', { reservation_id: saved.id }, {
      delay: hours * 60 * 60 * 1000,
    });

    return saved;
  }

  async getGuestReservations(guestId: string) {
    return this.reservationsRepo.find({
      where: { guest_id: guestId },
      relations: ['listing'],
      order: { created_at: 'DESC' },
    });
  }

  async getHostReservations(hostId: string) {
    return this.reservationsRepo.find({
      where: { host_id: hostId },
      relations: ['guest', 'listing'],
      order: { created_at: 'DESC' },
    });
  }
}
