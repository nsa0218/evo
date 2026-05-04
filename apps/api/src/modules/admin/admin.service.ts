import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Listing } from '../listings/entities/listing.entity';
import { Reservation } from '../reservations/entities/reservation.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Listing) private listingsRepo: Repository<Listing>,
    @InjectRepository(Reservation) private reservationsRepo: Repository<Reservation>,
  ) {}

  async getDashboard() {
    const [totalUsers, totalListings, totalReservations, activeListings] = await Promise.all([
      this.usersRepo.count(),
      this.listingsRepo.count(),
      this.reservationsRepo.count(),
      this.listingsRepo.count({ where: { status: 'active' } }),
    ]);

    const pendingListings = await this.listingsRepo.count({ where: { status: 'pending' } });

    const revenue = await this.reservationsRepo
      .createQueryBuilder('r')
      .select('SUM(r.service_fee)', 'total')
      .where('r.status IN (:...s)', { s: ['confirmed', 'checked_in', 'completed'] })
      .getRawOne();

    return {
      total_users: totalUsers,
      total_listings: totalListings,
      active_listings: activeListings,
      pending_listings: pendingListings,
      total_reservations: totalReservations,
      total_revenue: parseFloat(revenue?.total) || 0,
    };
  }

  async approveListing(listingId: string) {
    await this.listingsRepo.update(listingId, { status: 'active' });
    return { success: true };
  }

  async suspendListing(listingId: string) {
    await this.listingsRepo.update(listingId, { status: 'suspended' });
    return { success: true };
  }

  async getPendingListings() {
    return this.listingsRepo.find({
      where: { status: 'pending' },
      relations: ['host'],
      order: { created_at: 'ASC' },
    });
  }

  async getUsers(page = 1) {
    return this.usersRepo.find({
      order: { created_at: 'DESC' },
      skip: (page - 1) * 20,
      take: 20,
    });
  }
}
