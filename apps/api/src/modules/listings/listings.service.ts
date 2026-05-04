import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing, ListingImage, ListingAmenity, AvailabilityCalendar } from './entities/listing.entity';
import { CreateListingDto, UpdateListingDto, SearchListingsDto } from './dto/listing.dto';

@Injectable()
export class ListingsService {
  private readonly logger = new Logger(ListingsService.name);

  constructor(
    @InjectRepository(Listing)
    private listingsRepo: Repository<Listing>,
    @InjectRepository(ListingImage)
    private imagesRepo: Repository<ListingImage>,
    @InjectRepository(ListingAmenity)
    private amenitiesRepo: Repository<ListingAmenity>,
    @InjectRepository(AvailabilityCalendar)
    private calendarRepo: Repository<AvailabilityCalendar>,
  ) {}

  async create(hostId: string, dto: CreateListingDto): Promise<Listing> {
    const listing = this.listingsRepo.create({
      host_id: hostId,
      title: dto.title,
      description: dto.description,
      property_type: dto.property_type as any,
      latitude: dto.latitude,
      longitude: dto.longitude,
      address_line: dto.address_line,
      city: dto.city,
      country: dto.country,
      max_guests: dto.max_guests,
      bedrooms: dto.bedrooms,
      beds: dto.beds,
      bathrooms: dto.bathrooms,
      base_price_per_night: dto.base_price_per_night,
      cleaning_fee: dto.cleaning_fee || 0,
      currency: dto.currency || 'TRY',
      cancellation_policy: (dto.cancellation_policy as any) || 'moderate',
      instant_booking: dto.instant_booking || false,
      status: 'draft',
    });

    const saved = await this.listingsRepo.save(listing);

    // PostGIS Point güncelle (raw SQL gerekli)
    await this.listingsRepo
      .createQueryBuilder()
      .update()
      .set({ location: () => `ST_SetSRID(ST_MakePoint(${dto.longitude}, ${dto.latitude}), 4326)` } as any)
      .where('id = :id', { id: saved.id })
      .execute();

    // Amenities
    if (dto.amenity_ids?.length) {
      const amenityEntries = dto.amenity_ids.map((amenity_id) =>
        this.amenitiesRepo.create({ listing_id: saved.id, amenity_id }),
      );
      await this.amenitiesRepo.save(amenityEntries);
    }

    this.logger.log(`Yeni ilan oluşturuldu: ${saved.id} by ${hostId}`);
    return saved;
  }

  async findById(id: string): Promise<Listing> {
    const listing = await this.listingsRepo.findOne({
      where: { id },
      relations: ['host'],
    });
    if (!listing) throw new NotFoundException('İlan bulunamadı');

    // Resimleri ve olanakları yükle
    listing.images = await this.imagesRepo.find({
      where: { listing_id: id },
      order: { sort_order: 'ASC' },
    });

    return listing;
  }

  async search(dto: SearchListingsDto) {
    const page = dto.page || 1;
    const limit = Math.min(dto.limit || 20, 50);
    const offset = (page - 1) * limit;

    let query = this.listingsRepo
      .createQueryBuilder('l')
      .where('l.status = :status', { status: 'active' });

    // Geo arama
    if (dto.lat && dto.lng) {
      const radius = (dto.radius || 25) * 1000; // km → m
      query = query.andWhere(
        `ST_DWithin(l.location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)`,
        { lat: dto.lat, lng: dto.lng, radius },
      );
    }

    // Şehir filtresi
    if (dto.city) {
      query = query.andWhere('LOWER(l.city) = LOWER(:city)', { city: dto.city });
    }

    // Misafir sayısı
    if (dto.guests) {
      query = query.andWhere('l.max_guests >= :guests', { guests: dto.guests });
    }

    // Fiyat aralığı
    if (dto.min_price) {
      query = query.andWhere('l.base_price_per_night >= :minPrice', { minPrice: dto.min_price });
    }
    if (dto.max_price) {
      query = query.andWhere('l.base_price_per_night <= :maxPrice', { maxPrice: dto.max_price });
    }

    // Mülk tipi
    if (dto.property_type) {
      query = query.andWhere('l.property_type = :propertyType', { propertyType: dto.property_type });
    }

    // Sıralama
    switch (dto.sort_by) {
      case 'price_asc':
        query = query.orderBy('l.base_price_per_night', 'ASC');
        break;
      case 'price_desc':
        query = query.orderBy('l.base_price_per_night', 'DESC');
        break;
      case 'rating':
        query = query.orderBy('l.avg_rating', 'DESC');
        break;
      case 'newest':
      default:
        query = query.orderBy('l.created_at', 'DESC');
        break;
    }

    const [items, total] = await query.skip(offset).take(limit).getManyAndCount();

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, hostId: string, dto: UpdateListingDto): Promise<Listing> {
    const listing = await this.findById(id);
    if (listing.host_id !== hostId) {
      throw new ForbiddenException('Bu ilanı düzenleme yetkiniz yok');
    }

    Object.assign(listing, dto);
    return this.listingsRepo.save(listing);
  }

  async submitForReview(id: string, hostId: string): Promise<Listing> {
    const listing = await this.findById(id);
    if (listing.host_id !== hostId) throw new ForbiddenException();
    listing.status = 'pending';
    return this.listingsRepo.save(listing);
  }

  async getCalendar(listingId: string, startDate: string, endDate: string) {
    return this.calendarRepo
      .createQueryBuilder('c')
      .where('c.listing_id = :listingId', { listingId })
      .andWhere('c.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('c.date', 'ASC')
      .getMany();
  }

  async getHostListings(hostId: string) {
    return this.listingsRepo.find({
      where: { host_id: hostId },
      order: { created_at: 'DESC' },
    });
  }
}
