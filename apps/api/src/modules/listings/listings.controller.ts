import { Controller, Get, Post, Put, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ListingsService } from './listings.service';
import { CreateListingDto, UpdateListingDto, SearchListingsDto } from './dto/listing.dto';
import { CurrentUser, Public, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards/roles.guard';
import { User } from '../users/entities/user.entity';

@ApiTags('listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'İlan ara ve filtrele' })
  async search(@Query() dto: SearchListingsDto) {
    return this.listingsService.search(dto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'İlan detay' })
  async findOne(@Param('id') id: string) {
    return this.listingsService.findById(id);
  }

  @Public()
  @Get(':id/calendar')
  @ApiOperation({ summary: 'İlan takvimi' })
  async getCalendar(
    @Param('id') id: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.listingsService.getCalendar(id, start, end);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('host', 'admin')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yeni ilan oluştur (Host)' })
  async create(@CurrentUser() user: User, @Body() dto: CreateListingDto) {
    return this.listingsService.create(user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('host', 'admin')
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'İlan güncelle (Host)' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateListingDto,
  ) {
    return this.listingsService.update(id, user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('host', 'admin')
  @Put(':id/submit')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'İlanı onaya gönder' })
  async submitForReview(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listingsService.submitForReview(id, user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('host', 'admin')
  @Get('host/my-listings')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Host kendi ilanları' })
  async getMyListings(@CurrentUser() user: User) {
    return this.listingsService.getHostListings(user.id);
  }
}
