import { Controller, Get, Put, Delete, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators';
import { User } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Kendi profilini görüntüle' })
  async getMyProfile(@CurrentUser() user: User) {
    return this.usersService.getProfile(user.id);
  }

  @Put('me')
  @ApiOperation({ summary: 'Profil güncelle' })
  async updateMyProfile(@CurrentUser() user: User, @Body() updates: Partial<User>) {
    return this.usersService.updateProfile(user.id, updates);
  }

  @Get('me/export')
  @ApiOperation({ summary: 'GDPR - Kişisel veri export' })
  async exportData(@CurrentUser() user: User) {
    return this.usersService.exportUserData(user.id);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'GDPR - Hesap silme (soft delete)' })
  async deleteAccount(@CurrentUser() user: User) {
    return this.usersService.deleteAccount(user.id);
  }

  @Put('me/become-host')
  @ApiOperation({ summary: 'Ev sahibi rolüne geç' })
  async becomeHost(@CurrentUser() user: User) {
    return this.usersService.switchToHost(user.id);
  }
}
