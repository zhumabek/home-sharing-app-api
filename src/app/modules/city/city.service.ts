import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { CityRepository } from '../../repositories';
import { AppResponse } from '../../utils/shared.types';
import { CityEntity } from '../../entities';
import { CityDto } from './dto/user.dto';

@Injectable()
export class CityService {
  constructor(
    @Inject(Logger)
    private logger: LoggerService,
    private cityRepo: CityRepository,
  ) {}

  async create(data: CityDto): Promise<AppResponse<CityEntity>> {
    try {
      const city = this.cityRepo.create({ title: data.title });
      await city.save();

      return { data: city, message: 'Город успешно добавлен.' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async getAll(): Promise<AppResponse<CityEntity[]>> {
    try {
      const cities = await this.cityRepo.find();

      return { data: cities };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
