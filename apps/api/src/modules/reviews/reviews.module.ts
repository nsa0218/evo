import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Listing } from '../listings/entities/listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Reservation, Listing])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
