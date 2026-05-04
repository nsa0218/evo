import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MessagingService } from './messaging.service';
import { CurrentUser } from '../../common/decorators';
import { User } from '../users/entities/user.entity';

@ApiTags('messaging')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('conversations')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get()
  @ApiOperation({ summary: 'Konuşma listesi' })
  async getConversations(@CurrentUser() user: User) {
    return this.messagingService.getConversations(user.id);
  }

  @Get(':id/messages')
  @ApiOperation({ summary: 'Mesaj geçmişi' })
  async getMessages(
    @Param('id') id: string,
    @Query('page') page: number,
  ) {
    return this.messagingService.getMessages(id, page);
  }

  @Post()
  @ApiOperation({ summary: 'Yeni konuşma başlat' })
  async startConversation(
    @CurrentUser() user: User,
    @Body() body: { recipient_id: string; listing_id?: string; message: string },
  ) {
    const conv = await this.messagingService.getOrCreateConversation(
      user.id, body.recipient_id, body.listing_id,
    );
    const msg = await this.messagingService.sendMessage(conv.id, user.id, body.message);
    return { conversation: conv, message: msg };
  }
}
