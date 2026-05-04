import { Controller, Get, Put, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Admin dashboard metrikleri' })
  async getDashboard() {
    return this.adminService.getDashboard();
  }

  @Get('listings/pending')
  @ApiOperation({ summary: 'Onay bekleyen ilanlar' })
  async getPendingListings() {
    return this.adminService.getPendingListings();
  }

  @Put('listings/:id/approve')
  @ApiOperation({ summary: 'İlanı onayla' })
  async approveListing(@Param('id') id: string) {
    return this.adminService.approveListing(id);
  }

  @Put('listings/:id/suspend')
  @ApiOperation({ summary: 'İlanı askıya al' })
  async suspendListing(@Param('id') id: string) {
    return this.adminService.suspendListing(id);
  }

  @Get('users')
  @ApiOperation({ summary: 'Kullanıcı listesi' })
  async getUsers(@Query('page') page: number) {
    return this.adminService.getUsers(page);
  }
}
