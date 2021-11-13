import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import {
  CityRepository,
  ImageRepository,
  ListingRepository,
  UserRepository,
} from '../../repositories';
import { AppResponse, MulterFile } from '../../utils/shared.types';
import { BookingEntity, ListingEntity } from '../../entities';
import { BookingDto, ListingDto } from './dto/user.dto';
import { UploadedImageResponse } from './interfaces';
import { config } from '../../config/app.config';

@Injectable()
export class ListingService {
  constructor(
    @Inject(Logger)
    private logger: LoggerService,
    private listingRepo: ListingRepository,
    private userRepo: UserRepository,
    private cityRepo: CityRepository,
    private imageRepo: ImageRepository,
  ) {}

  async update(
    listingId: string,
    data: ListingDto,
    hostId: string,
  ): Promise<AppResponse<ListingEntity>> {
    try {
      const listing = await this.listingRepo.findOne(listingId);
      if (!listing) {
        throw new HttpException('Listing not found.', HttpStatus.NOT_FOUND);
      }

      listing.title = data.address;
      listing.description = data.description;
      listing.address = data.address;
      listing.type = data.type;
      listing.price = data.price;
      listing.numOfGuests = data.numOfGuests;

      listing.host = await this.userRepo.findOne(hostId);
      listing.city = await this.cityRepo.findOne(data.cityId);
      listing.image = await this.imageRepo.findOne(data.imageId);

      await listing.save();

      return { data: listing, message: 'Дом успешно отредактирован.' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async create(
    data: ListingDto,
    hostId: string,
  ): Promise<AppResponse<ListingEntity>> {
    try {
      const listing = new ListingEntity();
      listing.title = data.title;
      listing.description = data.description;
      listing.address = data.address;
      listing.type = data.type;
      listing.price = data.price;
      listing.numOfGuests = data.numOfGuests;

      listing.host = await this.userRepo.findOne(hostId);
      listing.city = await this.cityRepo.findOne(data.cityId);
      listing.image = await this.imageRepo.findOne(data.imageId);

      await listing.save();

      return { data: listing, message: 'Дом успешно добавлен.' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async getAll(cityId = ''): Promise<AppResponse<ListingEntity[]>> {
    try {
      let whereQuery = {} as any;

      if (cityId) {
        whereQuery = { where: { city: await this.cityRepo.findOne(cityId) } };
      }

      const listings = await this.listingRepo.find(whereQuery);

      return { data: listings };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async searchListings(
    searchValue = '',
  ): Promise<AppResponse<ListingEntity[]>> {
    try {
      const qb = await this.listingRepo
        .createQueryBuilder('listing')
        .leftJoinAndSelect('listing.host', 'host')
        .leftJoinAndSelect('listing.city', 'city')
        .leftJoinAndSelect('listing.image', 'image');

      await qb.orWhere('listing.title ILIKE :title', {
        title: `%${searchValue}%`,
      });

      await qb.orWhere('listing.address ILIKE :address', {
        address: `%${searchValue}%`,
      });

      // await qb.andWhere('listing.price ILIKE :price', {
      //   price: `%${searchValue}%`,
      // });

      await qb.orWhere('city.title ILIKE :cityTitle', {
        cityTitle: `%${searchValue}%`,
      });

      const listings = await qb.getMany();

      return { data: listings };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async getListingsByCityId(
    cityId: string,
  ): Promise<AppResponse<ListingEntity[]>> {
    try {
      const city = await this.cityRepo.findOne(cityId);
      const listings = await this.listingRepo.find({ where: { city } });

      return { data: listings };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async getById(id: string): Promise<AppResponse<ListingEntity>> {
    try {
      const listing = await this.listingRepo.findOne(id);
      if (!listing) {
        throw new HttpException('Listing not found.', HttpStatus.NOT_FOUND);
      }
      return { data: listing };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async uploadImage(file: MulterFile): Promise<UploadedImageResponse> {
    try {
      const image = await this.imageRepo.upload(
        file,
        config.LISTING_IMAGES_DIR_NAME,
        ['jpeg', 'png'],
      );

      return { imageId: image.id };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async bookListing(
    listingId: string,
    data: BookingDto,
    tenantId: string,
  ): Promise<AppResponse> {
    try {
      const booking = new BookingEntity();

      booking.listing = await this.listingRepo.findOne(listingId);
      booking.tenant = await this.userRepo.findOne(tenantId);
      booking.checkIn = data.checkIn;
      booking.checkOut = data.checkOut;

      await booking.save();

      return { message: 'Бронирование жиля успешно.' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
