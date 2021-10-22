import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppResponse } from '../../utils/shared.types';
import { LogInWithSocialNetworkDto } from './dto/auth.dto';
import { UserEntity } from '../../entities';
import * as queryString from 'query-string';
import { LogInResponse } from './interfaces';
import { config } from '../../config/app.config';
import { UserRepository } from '../../repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async getUserByToken(token: string): Promise<AppResponse<LogInResponse>> {
    try {
      const jwtPayload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepo.findOne({
        id: jwtPayload.id,
        email: jwtPayload.email,
      });
      if (!user) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }

      return { data: { user, token } };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async validateGoogleLogIn(
    data: LogInWithSocialNetworkDto,
  ): Promise<UserEntity> {
    try {
      const { id, email, firstName, lastName, avatar } = data;

      const user = await this.userRepo.findOne({ email, googleId: id });

      if (!user) {
        const newUser = this.userRepo.create();
        newUser.email = email;
        newUser.googleId = id;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.avatar = avatar;
        await newUser.save();

        return newUser;
      }

      return user;
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async logInViaGoogle(user: UserEntity, res): Promise<void> {
    try {
      const token = this.jwtService.sign({
        id: user.id,
        email: user.email,
      });

      const queryToken = queryString.stringify({ token });
      res.redirect(`${config.CLIENT_SIGN_IN_URL}?${queryToken}`);
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
