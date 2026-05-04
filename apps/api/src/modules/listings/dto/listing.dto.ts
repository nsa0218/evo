import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsArray, Min, Max, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateListingDto {
  @ApiProperty({ example: 'Boğaz Manzaralı Lüks Daire' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ['apartment', 'house', 'villa', 'room', 'hotel', 'unique'] })
  @IsEnum(['apartment', 'house', 'villa', 'room', 'hotel', 'unique'])
  property_type: string;

  @ApiProperty({ example: 41.0082 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 28.9784 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address_line?: string;

  @ApiProperty({ example: 'İstanbul' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Türkiye' })
  @IsString()
  country: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(1)
  @Max(50)
  max_guests: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(0)
  bedrooms: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  beds: number;

  @ApiProperty({ example: 1.5 })
  @IsNumber()
  @Min(0.5)
  bathrooms: number;

  @ApiProperty({ example: 750.00 })
  @IsNumber()
  @Min(1)
  base_price_per_night: number;

  @ApiPropertyOptional({ example: 200.00 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cleaning_fee?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: ['uuid-1', 'uuid-2'] })
  @IsOptional()
  @IsArray()
  amenity_ids?: string[];

  @ApiPropertyOptional({ enum: ['flexible', 'moderate', 'strict'] })
  @IsOptional()
  @IsEnum(['flexible', 'moderate', 'strict'])
  cancellation_policy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  instant_booking?: boolean;
}

export class UpdateListingDto {
  @IsOptional() @IsString() @MaxLength(255) title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsNumber() @Min(1) base_price_per_night?: number;
  @IsOptional() @IsNumber() @Min(0) cleaning_fee?: number;
  @IsOptional() @IsNumber() @Min(1) @Max(50) max_guests?: number;
  @IsOptional() @IsNumber() bedrooms?: number;
  @IsOptional() @IsNumber() beds?: number;
  @IsOptional() @IsNumber() bathrooms?: number;
  @IsOptional() @IsArray() amenity_ids?: string[];
  @IsOptional() @IsBoolean() instant_booking?: boolean;
}

export class SearchListingsDto {
  @IsOptional() @IsNumber() @Type(() => Number) lat?: number;
  @IsOptional() @IsNumber() @Type(() => Number) lng?: number;
  @IsOptional() @IsNumber() @Type(() => Number) radius?: number; // km
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() check_in?: string;
  @IsOptional() @IsString() check_out?: string;
  @IsOptional() @IsNumber() @Type(() => Number) guests?: number;
  @IsOptional() @IsNumber() @Type(() => Number) min_price?: number;
  @IsOptional() @IsNumber() @Type(() => Number) max_price?: number;
  @IsOptional() @IsString() property_type?: string;
  @IsOptional() @IsArray() amenities?: string[];
  @IsOptional() @IsString() sort_by?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
