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
import { AppResponse } from '../../utils/shared.types';
import { ListingEntity } from '../../entities';
import { ListingDto } from './dto/user.dto';

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
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
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

      return { data: listing, message: 'Дом успешно добавлен.' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async getAll(): Promise<AppResponse<ListingEntity[]>> {
    try {
      const listings = await this.listingRepo.find();

      return { data: listings };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
