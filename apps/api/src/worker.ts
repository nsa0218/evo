import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

// BullMQ Worker - Background job'ları işler
// Escrow release, bildirim gönderimi vb.

async function bootstrap() {
  const logger = new Logger('Worker');
  const app = await NestFactory.createApplicationContext(AppModule);

  logger.log('Worker başlatıldı - Job kuyruklarını dinliyor...');

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.log('Worker kapatılıyor...');
    await app.close();
    process.exit(0);
  });
}

bootstrap();
