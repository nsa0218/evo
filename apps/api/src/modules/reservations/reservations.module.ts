import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation, Payment } from './entities/reservation.entity';
import { Listing, AvailabilityCalendar } from '../listings/entities/listing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Payment, Listing, AvailabilityCalendar]),
    BullModule.registerQueue({ name: 'escrow' }),
    BullModule.registerQueue({ name: 'notifications' }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
