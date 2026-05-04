import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email: email.toLowerCase() } });
  }

  async getProfile(id: string) {
    const user = await this.findById(id);
    const { password_hash, two_fa_secret, deleted_at, ...profile } = user;
    return {
      ...profile,
      full_name: user.full_name,
      verification_badges: user.verification_badges,
    };
  }

  async updateProfile(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    // Hassas alanların güncellenmesini engelle
    delete updates.password_hash;
    delete updates.role;
    delete updates.is_email_verified;
    delete updates.is_id_verified;
    delete updates.stripe_customer_id;
    delete updates.stripe_connect_id;

    Object.assign(user, updates);
    return this.usersRepository.save(user);
  }

  async switchToHost(userId: string): Promise<User> {
    const user = await this.findById(userId);
    user.role = 'host';
    return this.usersRepository.save(user);
  }

  // GDPR: Veri export
  async exportUserData(userId: string) {
    const user = await this.findById(userId);
    const { password_hash, two_fa_secret, ...data } = user;
    return data;
  }

  // GDPR: Hesap silme (soft delete)
  async deleteAccount(userId: string): Promise<void> {
    await this.usersRepository.softDelete(userId);
  }
}
