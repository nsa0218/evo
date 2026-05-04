import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReservationsService, CreateReservationDto } from './reservations.service';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards/roles.guard';
import { User } from '../users/entities/user.entity';

@ApiTags('reservations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni rezervasyon oluştur' })
  async create(@CurrentUser() user: User, @Body() dto: CreateReservationDto) {
    return this.reservationsService.create(user.id, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Misafir rezervasyonlarım' })
  async getMyReservations(@CurrentUser() user: User) {
    return this.reservationsService.getGuestReservations(user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('host', 'admin')
  @Get('host')
  @ApiOperation({ summary: 'Host gelen rezervasyonlar' })
  async getHostReservations(@CurrentUser() user: User) {
    return this.reservationsService.getHostReservations(user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('host', 'admin')
  @Put(':id/confirm')
  @ApiOperation({ summary: 'Rezervasyon onayla (Host)' })
  async confirm(@Param('id') id: string, @CurrentUser() user: User) {
    return this.reservationsService.confirm(id, user.id);
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Rezervasyon iptal' })
  async cancel(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body('reason') reason: string,
  ) {
    return this.reservationsService.cancel(id, user.id, reason);
  }

  @UseGuards(RolesGuard)
  @Roles('host', 'admin')
  @Put(':id/check-in')
  @ApiOperation({ summary: 'Check-in onayla (Host)' })
  async checkIn(@Param('id') id: string) {
    return this.reservationsService.checkIn(id);
  }
}
