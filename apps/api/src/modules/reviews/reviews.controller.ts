import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReviewsService } from './reviews.service';
import { CurrentUser, Public } from '../../common/decorators';
import { User } from '../users/entities/user.entity';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get('listing/:listingId')
  @ApiOperation({ summary: 'İlan yorumları' })
  async getListingReviews(
    @Param('listingId') listingId: string,
    @Query('page') page: number,
  ) {
    return this.reviewsService.getListingReviews(listingId, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yorum yaz' })
  async create(@CurrentUser() user: User, @Body() dto: any) {
    return this.reviewsService.create(user.id, dto);
  }
}
