import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Listing } from '../../listings/entities/listing.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  reservation_id: string;

  @Column()
  author_id: string;

  @Column()
  listing_id: string;

  @ManyToOne(() => Reservation)
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column()
  overall_rating: number;

  @Column({ nullable: true })
  cleanliness_rating: number;

  @Column({ nullable: true })
  accuracy_rating: number;

  @Column({ nullable: true })
  communication_rating: number;

  @Column({ nullable: true })
  location_rating: number;

  @Column({ nullable: true })
  value_rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'text', nullable: true })
  host_response: string;

  @Column({ type: 'timestamptz', nullable: true })
  host_responded_at: Date;

  @Column({ default: true })
  is_public: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
