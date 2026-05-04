import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification) private notifRepo: Repository<Notification>,
  ) {}

  async create(userId: string, type: string, title: string, body?: string, data?: any): Promise<Notification> {
    const notif = this.notifRepo.create({ user_id: userId, type, title, body, data });
    return this.notifRepo.save(notif);
  }

  async getUserNotifications(userId: string, page = 1) {
    return this.notifRepo.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
      skip: (page - 1) * 20,
      take: 20,
    });
  }

  async markAsRead(notifId: string, userId: string) {
    await this.notifRepo.update({ id: notifId, user_id: userId }, { is_read: true, read_at: new Date() });
  }

  async markAllAsRead(userId: string) {
    await this.notifRepo.update({ user_id: userId, is_read: false }, { is_read: true, read_at: new Date() });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notifRepo.count({ where: { user_id: userId, is_read: false } });
  }
}
