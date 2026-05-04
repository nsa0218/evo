import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private minioClient: Minio.Client;
  private bucket: string;
  private readonly logger = new Logger(MediaService.name);

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: configService.get('MINIO_ENDPOINT', 'minio'),
      port: configService.get<number>('MINIO_PORT', 9000),
      useSSL: false,
      accessKey: configService.get('MINIO_ROOT_USER', 'minioadmin'),
      secretKey: configService.get('MINIO_ROOT_PASSWORD', 'change_me'),
    });
    this.bucket = configService.get('MINIO_BUCKET', 'platform-media');
    this.ensureBucket();
  }

  private async ensureBucket() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucket);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucket);
        // Public read policy
        const policy = {
          Version: '2012-10-17',
          Statement: [{
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.bucket}/*`],
          }],
        };
        await this.minioClient.setBucketPolicy(this.bucket, JSON.stringify(policy));
        this.logger.log(`Bucket oluşturuldu: ${this.bucket}`);
      }
    } catch (err) {
      this.logger.error(`Bucket hatası: ${err.message}`);
    }
  }

  async uploadImage(
    buffer: Buffer,
    originalName: string,
    folder: string = 'listings',
  ): Promise<{ url: string; thumbnail_url: string }> {
    const id = uuidv4();
    const ext = originalName.split('.').pop() || 'jpg';

    // Ana resim (max 1920px)
    const mainBuffer = await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    const mainKey = `${folder}/${id}.jpg`;
    await this.minioClient.putObject(this.bucket, mainKey, mainBuffer, mainBuffer.length, {
      'Content-Type': 'image/jpeg',
    });

    // Thumbnail (400px)
    const thumbBuffer = await sharp(buffer)
      .resize(400, 300, { fit: 'cover' })
      .jpeg({ quality: 75 })
      .toBuffer();

    const thumbKey = `${folder}/thumb_${id}.jpg`;
    await this.minioClient.putObject(this.bucket, thumbKey, thumbBuffer, thumbBuffer.length, {
      'Content-Type': 'image/jpeg',
    });

    return {
      url: `/media/${mainKey}`,
      thumbnail_url: `/media/${thumbKey}`,
    };
  }

  async deleteImage(key: string): Promise<void> {
    await this.minioClient.removeObject(this.bucket, key);
  }
}
