import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() user_id: string;
  @Column() type: string;
  @Column() title: string;
  @Column({ type: 'text', nullable: true }) body: string;
  @Column({ type: 'jsonb', default: {} }) data: Record<string, any>;
  @Column({ default: false }) is_read: boolean;
  @Column({ type: 'timestamptz', nullable: true }) read_at: Date;
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;

  @ManyToOne(() => User) @JoinColumn({ name: 'user_id' }) user: User;
}
