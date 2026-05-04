import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Payment } from '../reservations/entities/reservation.entity';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY', ''));
  }

  async createPaymentIntent(reservationId: string, amount: number, currency: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe kuruş cinsinden
      currency: currency.toLowerCase(),
      metadata: { reservation_id: reservationId },
    });

    // Payment kaydını güncelle
    await this.paymentsRepo.update(
      { reservation_id: reservationId },
      { stripe_payment_intent_id: paymentIntent.id, status: 'pending' },
    );

    return { client_secret: paymentIntent.client_secret };
  }

  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        await this.paymentsRepo.update(
          { stripe_payment_intent_id: pi.id },
          { status: 'in_escrow' },
        );
        this.logger.log(`Ödeme escrow'a alındı: ${pi.id}`);
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        await this.paymentsRepo.update(
          { stripe_payment_intent_id: pi.id },
          { status: 'failed' },
        );
        this.logger.warn(`Ödeme başarısız: ${pi.id}`);
        break;
      }
    }
  }

  async releaseEscrow(reservationId: string) {
    const payment = await this.paymentsRepo.findOneOrFail({
      where: { reservation_id: reservationId, status: 'in_escrow' },
    });

    // Stripe Transfer (host'a ödeme)
    // Not: Host'un stripe_connect_id'si gerekli
    this.logger.log(`Escrow serbest bırakıldı: ${reservationId}`);

    payment.status = 'released';
    payment.released_at = new Date();
    await this.paymentsRepo.save(payment);
  }

  async refund(reservationId: string, amount?: number) {
    const payment = await this.paymentsRepo.findOneOrFail({
      where: { reservation_id: reservationId },
    });

    const refund = await this.stripe.refunds.create({
      payment_intent: payment.stripe_payment_intent_id,
      amount: amount ? Math.round(amount * 100) : undefined, // Kısmi veya tam iade
    });

    payment.status = amount ? 'partially_refunded' : 'refunded';
    payment.refund_amount = amount || Number(payment.amount);
    payment.refunded_at = new Date();
    await this.paymentsRepo.save(payment);

    return refund;
  }
}
