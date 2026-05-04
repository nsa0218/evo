import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // Security
  app.use(helmet());
  app.enableCors({
    origin: process.env.PLATFORM_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger API Docs
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Konaklama Platform API')
      .setDescription('Konaklama ve Rezervasyon Platformu REST API')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Kimlik doğrulama')
      .addTag('users', 'Kullanıcı yönetimi')
      .addTag('listings', 'İlan yönetimi')
      .addTag('reservations', 'Rezervasyon yönetimi')
      .addTag('payments', 'Ödeme işlemleri')
      .addTag('messaging', 'Mesajlaşma')
      .addTag('reviews', 'Yorum ve puanlama')
      .addTag('admin', 'Yönetim paneli')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log('Swagger docs: http://localhost:3001/api/docs');
  }

  const port = process.env.API_PORT || 3001;
  await app.listen(port);
  logger.log(`API sunucusu ${port} portunda çalışıyor`);
}

bootstrap();
