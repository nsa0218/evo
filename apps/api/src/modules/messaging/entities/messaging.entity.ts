import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Listing } from '../../listings/entities/listing.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() participant_1: string;
  @Column() participant_2: string;
  @Column({ nullable: true }) listing_id: string;

  @ManyToOne(() => User) @JoinColumn({ name: 'participant_1' }) user1: User;
  @ManyToOne(() => User) @JoinColumn({ name: 'participant_2' }) user2: User;
  @ManyToOne(() => Listing) @JoinColumn({ name: 'listing_id' }) listing: Listing;

  @Column({ type: 'timestamptz', nullable: true }) last_message_at: Date;
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() conversation_id: string;
  @Column() sender_id: string;
  @Column({ type: 'text' }) content: string;
  @Column({ default: 'text' }) message_type: 'text' | 'image' | 'system';
  @Column({ nullable: true }) attachment_url: string;
  @Column({ default: false }) is_read: boolean;
  @Column({ type: 'timestamptz', nullable: true }) read_at: Date;
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;

  @ManyToOne(() => Conversation) @JoinColumn({ name: 'conversation_id' }) conversation: Conversation;
  @ManyToOne(() => User) @JoinColumn({ name: 'sender_id' }) sender: User;
}
