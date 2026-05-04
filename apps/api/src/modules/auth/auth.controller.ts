import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, Enable2FADto } from './dto/auth.dto';
import { CurrentUser, Public } from '../../common/decorators';
import { User } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Yeni kullanıcı kaydı' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Kullanıcı girişi' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Access token yenileme' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refresh_token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('2fa/enable')
  @ApiBearerAuth()
  @ApiOperation({ summary: '2FA etkinleştirme başlat' })
  async enable2FA(@CurrentUser() user: User) {
    return this.authService.enable2FA(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('2fa/verify')
  @ApiBearerAuth()
  @ApiOperation({ summary: '2FA doğrulama ve aktivasyon' })
  async verify2FA(@CurrentUser() user: User, @Body() dto: Enable2FADto) {
    return this.authService.verify2FA(user.id, dto.totp_code);
  }
}
