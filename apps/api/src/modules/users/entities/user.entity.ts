import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn, OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  @Exclude()
  password_hash: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: 'guest' })
  role: 'guest' | 'host' | 'admin';

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: false })
  is_email_verified: boolean;

  @Column({ default: false })
  is_phone_verified: boolean;

  @Column({ default: false })
  is_id_verified: boolean;

  @Column({ default: false })
  is_2fa_enabled: boolean;

  @Column({ nullable: true })
  @Exclude()
  two_fa_secret: string;

  @Column({ default: 'tr' })
  preferred_language: string;

  @Column({ default: 'TRY' })
  preferred_currency: string;

  @Column({ nullable: true })
  stripe_customer_id: string;

  @Column({ nullable: true })
  stripe_connect_id: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_login_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;

  // Computed
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  get verification_badges(): string[] {
    const badges: string[] = [];
    if (this.is_email_verified) badges.push('email');
    if (this.is_phone_verified) badges.push('phone');
    if (this.is_id_verified) badges.push('id');
    return badges;
  }
}
