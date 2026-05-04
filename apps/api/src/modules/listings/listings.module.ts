import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { Listing, ListingImage, Amenity, ListingAmenity, AvailabilityCalendar, PricingRule } from './entities/listing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, ListingImage, Amenity, ListingAmenity, AvailabilityCalendar, PricingRule]),
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
