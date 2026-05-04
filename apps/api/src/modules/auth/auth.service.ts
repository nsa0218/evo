import { Injectable, ConflictException, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    // Email kontrolü
    const existing = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('Bu email adresi zaten kayıtlı');
    }

    // Şifre hash
    const password_hash = await bcrypt.hash(dto.password, 12);

    // Kullanıcı oluştur
    const user = this.usersRepository.create({
      email: dto.email.toLowerCase(),
      password_hash,
      first_name: dto.first_name,
      last_name: dto.last_name,
      phone: dto.phone,
    });

    await this.usersRepository.save(user);
    this.logger.log(`Yeni kullanıcı kaydı: ${user.email}`);

    return this.generateTokens(user);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Geçersiz email veya şifre');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Geçersiz email veya şifre');
    }

    // 2FA kontrolü
    if (user.is_2fa_enabled) {
      if (!dto.totp_code) {
        throw new BadRequestException('2FA kodu gerekli');
      }
      const isValid = authenticator.verify({
        token: dto.totp_code,
        secret: user.two_fa_secret,
      });
      if (!isValid) {
        throw new UnauthorizedException('Geçersiz 2FA kodu');
      }
    }

    // Son giriş tarihini güncelle
    user.last_login_at = new Date();
    await this.usersRepository.save(user);

    this.logger.log(`Kullanıcı giriş yaptı: ${user.email}`);
    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.deleted_at) {
        throw new UnauthorizedException('Geçersiz token');
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Geçersiz veya süresi dolmuş refresh token');
    }
  }

  async enable2FA(userId: string): Promise<{ secret: string; otpauth_url: string }> {
    const user = await this.usersRepository.findOneOrFail({ where: { id: userId } });
    const secret = authenticator.generateSecret();
    const otpauth_url = authenticator.keyuri(user.email, 'Konaklama Platform', secret);

    // Secret'ı geçici olarak kaydet (doğrulama sonrası aktif edilecek)
    user.two_fa_secret = secret;
    await this.usersRepository.save(user);

    return { secret, otpauth_url };
  }

  async verify2FA(userId: string, totpCode: string): Promise<{ success: boolean }> {
    const user = await this.usersRepository.findOneOrFail({ where: { id: userId } });

    if (!user.two_fa_secret) {
      throw new BadRequestException('Önce 2FA kurulumu başlatın');
    }

    const isValid = authenticator.verify({
      token: totpCode,
      secret: user.two_fa_secret,
    });

    if (!isValid) {
      throw new UnauthorizedException('Geçersiz doğrulama kodu');
    }

    user.is_2fa_enabled = true;
    await this.usersRepository.save(user);

    return { success: true };
  }

  private generateTokens(user: User): AuthResponseDto {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    };
  }
}
