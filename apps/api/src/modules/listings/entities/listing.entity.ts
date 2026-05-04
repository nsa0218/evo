import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  host_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  property_type: 'apartment' | 'house' | 'villa' | 'room' | 'hotel' | 'unique';

  @Column({ default: 'draft' })
  status: 'draft' | 'pending' | 'active' | 'suspended' | 'archived';

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: string;

  @Column({ nullable: true })
  address_line: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ default: 1 })
  max_guests: number;

  @Column({ default: 1 })
  bedrooms: number;

  @Column({ default: 1 })
  beds: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 1 })
  bathrooms: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  base_price_per_night: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cleaning_fee: number;

  @Column({ default: 'TRY' })
  currency: string;

  @Column({ type: 'jsonb', default: {} })
  house_rules: Record<string, any>;

  @Column({ type: 'time', default: '14:00' })
  check_in_time: string;

  @Column({ type: 'time', default: '11:00' })
  check_out_time: string;

  @Column({ default: 1 })
  min_nights: number;

  @Column({ default: 365 })
  max_nights: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  avg_rating: number;

  @Column({ default: 0 })
  review_count: number;

  @Column({ default: 0 })
  view_count: number;

  @Column({ default: 'moderate' })
  cancellation_policy: 'flexible' | 'moderate' | 'strict';

  @Column({ default: false })
  instant_booking: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations loaded separately
  images?: ListingImage[];
  amenity_ids?: string[];
}

@Entity('listing_images')
export class ListingImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  listing_id: string;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column()
  url: string;

  @Column({ nullable: true })
  thumbnail_url: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ default: 0 })
  sort_order: number;

  @Column({ default: false })
  is_cover: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}

@Entity('amenities')
export class Amenity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  name_tr: string;

  @Column({ nullable: true })
  icon: string;

  @Column()
  category: 'essentials' | 'features' | 'safety' | 'accessibility';

  @Column({ default: 0 })
  sort_order: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}

@Entity('listing_amenities')
export class ListingAmenity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  listing_id: string;

  @Column()
  amenity_id: string;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @ManyToOne(() => Amenity)
  @JoinColumn({ name: 'amenity_id' })
  amenity: Amenity;
}

@Entity('availability_calendar')
export class AvailabilityCalendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  listing_id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: true })
  is_available: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  custom_price: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: 'manual' })
  source: 'manual' | 'ical_sync' | 'reservation';
}

@Entity('pricing_rules')
export class PricingRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  listing_id: string;

  @Column()
  rule_type: 'weekly_discount' | 'monthly_discount' | 'seasonal' | 'last_minute' | 'early_bird';

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  adjustment_percent: number;

  @Column({ type: 'date', nullable: true })
  valid_from: string;

  @Column({ type: 'date', nullable: true })
  valid_to: string;

  @Column({ nullable: true })
  min_nights: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
