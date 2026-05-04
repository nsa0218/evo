import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Listing } from '../../listings/entities/listing.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guest_id: string;

  @Column()
  listing_id: string;

  @Column()
  host_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column({ type: 'date' })
  check_in: string;

  @Column({ type: 'date' })
  check_out: string;

  @Column({ default: 1 })
  guests_count: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  nightly_rate: number;

  @Column()
  nights_count: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cleaning_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  service_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  host_payout: number;

  @Column({ default: 'TRY' })
  currency: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled_by_guest' | 'cancelled_by_host' | 'disputed' | 'refunded';

  @Column({ type: 'text', nullable: true })
  special_requests: string;

  @Column({ type: 'text', nullable: true })
  cancellation_reason: string;

  @Column({ type: 'timestamptz', nullable: true })
  cancelled_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reservation_id: string;

  @ManyToOne(() => Reservation)
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @Column({ nullable: true })
  stripe_payment_intent_id: string;

  @Column({ nullable: true })
  stripe_transfer_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  platform_fee: number;

  @Column({ default: 'TRY' })
  currency: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'captured' | 'in_escrow' | 'released' | 'refunded' | 'partially_refunded' | 'failed';

  @Column({ type: 'timestamptz', nullable: true })
  escrow_release_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  released_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  refund_amount: number;

  @Column({ type: 'timestamptz', nullable: true })
  refunded_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
