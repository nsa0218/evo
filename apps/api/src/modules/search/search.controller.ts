import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
export class SearchController {
  // Elasticsearch tabanlı gelişmiş arama Faz 4'te eklenecek
  // Şu an GET /api/listings endpoint'i PostGIS ile arama yapıyor
}
