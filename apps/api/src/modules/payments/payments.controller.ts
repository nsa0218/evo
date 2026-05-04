import { Controller, Post, Body, Headers, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { PaymentsService } from './payments.service';
import { CurrentUser, Public } from '../../common/decorators';
import { User } from '../users/entities/user.entity';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  private stripe: Stripe;

  constructor(
    private readonly paymentsService: PaymentsService,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY', ''));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-intent')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ödeme intent oluştur' })
  async createIntent(
    @Body() body: { reservation_id: string; amount: number; currency: string },
  ) {
    return this.paymentsService.createPaymentIntent(body.reservation_id, body.amount, body.currency);
  }

  @Public()
  @Post('webhook')
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET', '');
    const rawBody = (req as any).rawBody;
    if (!rawBody) {
      throw new BadRequestException('Raw body gerekli');
    }
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
    await this.paymentsService.handleWebhook(event);
    return { received: true };
  }
}
