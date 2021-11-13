import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ListingType } from '../../../entities';

export class ListingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsEnum(ListingType)
  type: ListingType;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  cityId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  numOfGuests: number;
}

export class BookingDto {
  @IsString()
  @IsNotEmpty()
  checkIn: Date;

  @IsString()
  @IsNotEmpty()
  checkOut: Date;
}
