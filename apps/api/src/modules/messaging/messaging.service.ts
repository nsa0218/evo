import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation, Message } from './entities/messaging.entity';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Conversation) private convRepo: Repository<Conversation>,
    @InjectRepository(Message) private msgRepo: Repository<Message>,
  ) {}

  async getOrCreateConversation(userId1: string, userId2: string, listingId?: string): Promise<Conversation> {
    // Mevcut konuşmayı ara
    let conv = await this.convRepo
      .createQueryBuilder('c')
      .where(
        '((c.participant_1 = :u1 AND c.participant_2 = :u2) OR (c.participant_1 = :u2 AND c.participant_2 = :u1))',
        { u1: userId1, u2: userId2 },
      )
      .andWhere(listingId ? 'c.listing_id = :listingId' : '1=1', { listingId })
      .getOne();

    if (!conv) {
      conv = this.convRepo.create({
        participant_1: userId1,
        participant_2: userId2,
        listing_id: listingId,
      });
      await this.convRepo.save(conv);
    }

    return conv;
  }

  async sendMessage(conversationId: string, senderId: string, content: string, type = 'text'): Promise<Message> {
    const msg = this.msgRepo.create({
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      message_type: type as any,
    });

    const saved = await this.msgRepo.save(msg);

    // Konuşma son mesaj zamanını güncelle
    await this.convRepo.update(conversationId, { last_message_at: new Date() });

    return saved;
  }

  async getConversations(userId: string) {
    return this.convRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user1', 'u1')
      .leftJoinAndSelect('c.user2', 'u2')
      .leftJoinAndSelect('c.listing', 'l')
      .where('c.participant_1 = :userId OR c.participant_2 = :userId', { userId })
      .orderBy('c.last_message_at', 'DESC')
      .getMany();
  }

  async getMessages(conversationId: string, page = 1, limit = 50) {
    return this.msgRepo.find({
      where: { conversation_id: conversationId },
      relations: ['sender'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async markAsRead(conversationId: string, userId: string) {
    await this.msgRepo
      .createQueryBuilder()
      .update(Message)
      .set({ is_read: true, read_at: new Date() })
      .where('conversation_id = :conversationId AND sender_id != :userId AND is_read = false', {
        conversationId,
        userId,
      })
      .execute();
  }
}
