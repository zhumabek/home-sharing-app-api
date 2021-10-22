import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { UserEntity } from '../../entities';
import { JwtService } from '@nestjs/jwt';
import { LoginJwtPayload } from '../../modules/auth/interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token =
      request.headers['authorization'] &&
      request.headers['authorization'].split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is not provided!');
    }

    const user: UserEntity = await this.validateByToken(token);
    if (!user) {
      throw new UnauthorizedException('Jwt token is invalid or has expired!');
    }
    request.user = user;
    return true;
  }

  async validateByToken(token: string): Promise<UserEntity> {
    const payload: LoginJwtPayload = await this.jwtService.verifyAsync(token);
    return await UserEntity.findOne({ id: payload.id });
  }
}
