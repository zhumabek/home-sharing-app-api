import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { UserRepository } from '../../repositories';
import { AppResponse } from '../../utils/shared.types';
import { UserEntity } from '../../entities';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(Logger)
    private logger: LoggerService,
    private userRepo: UserRepository,
  ) {}

  async update(
    userId: string,
    data: UserDto,
  ): Promise<AppResponse<UserEntity>> {
    try {
      const user = await this.userRepo.findOne(userId);
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.email = data.email;
      user.phone = data.phone;

      await user.save();

      return { data: user, message: 'Пользователь успешно отредактирован.' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async getProfile(
    id: string,
    withListings: boolean,
  ): Promise<AppResponse<UserEntity>> {
    try {
      const relations = withListings
        ? {
            relations: ['listings', 'bookings'],
          }
        : undefined;
      const user = await this.userRepo.findOne(id, relations);
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      return { data: user };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
