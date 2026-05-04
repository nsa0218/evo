import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Listing } from '../listings/entities/listing.entity';

interface CreateReviewDto {
  reservation_id: string;
  overall_rating: number;
  cleanliness_rating?: number;
  accuracy_rating?: number;
  communication_rating?: number;
  location_rating?: number;
  value_rating?: number;
  comment?: string;
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewsRepo: Repository<Review>,
    @InjectRepository(Reservation) private reservationsRepo: Repository<Reservation>,
    @InjectRepository(Listing) private listingsRepo: Repository<Listing>,
  ) {}

  async create(authorId: string, dto: CreateReviewDto): Promise<Review> {
    const reservation = await this.reservationsRepo.findOneOrFail({
      where: { id: dto.reservation_id },
    });

    if (reservation.guest_id !== authorId) throw new ForbiddenException();
    if (reservation.status !== 'completed') {
      throw new BadRequestException('Sadece tamamlanmış rezervasyonlar değerlendirilebilir');
    }

    const existing = await this.reviewsRepo.findOne({
      where: { reservation_id: dto.reservation_id },
    });
    if (existing) throw new BadRequestException('Bu rezervasyon zaten değerlendirilmiş');

    const review = this.reviewsRepo.create({
      reservation_id: dto.reservation_id,
      author_id: authorId,
      listing_id: reservation.listing_id,
      overall_rating: dto.overall_rating,
      cleanliness_rating: dto.cleanliness_rating,
      accuracy_rating: dto.accuracy_rating,
      communication_rating: dto.communication_rating,
      location_rating: dto.location_rating,
      value_rating: dto.value_rating,
      comment: dto.comment,
    });

    const saved = await this.reviewsRepo.save(review);

    // İlan ortalama puanını güncelle
    const { avg, count } = await this.reviewsRepo
      .createQueryBuilder('r')
      .select('AVG(r.overall_rating)', 'avg')
      .addSelect('COUNT(*)', 'count')
      .where('r.listing_id = :listingId AND r.is_public = true', { listingId: reservation.listing_id })
      .getRawOne();

    await this.listingsRepo.update(reservation.listing_id, {
      avg_rating: parseFloat(avg) || 0,
      review_count: parseInt(count) || 0,
    });

    return saved;
  }

  async getListingReviews(listingId: string, page = 1) {
    return this.reviewsRepo.find({
      where: { listing_id: listingId, is_public: true },
      relations: ['author'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * 10,
      take: 10,
    });
  }
}
