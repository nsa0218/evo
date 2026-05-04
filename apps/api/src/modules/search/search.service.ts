import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  // Elasticsearch entegrasyonu Faz 4'te eklenecek
  // Şu an listings.service.ts'deki PostGIS sorguları kullanılıyor
  async indexListing(listingId: string, data: any) {
    this.logger.debug(`Listing indexed (stub): ${listingId}`);
  }

  async removeListing(listingId: string) {
    this.logger.debug(`Listing removed from index (stub): ${listingId}`);
  }
}
