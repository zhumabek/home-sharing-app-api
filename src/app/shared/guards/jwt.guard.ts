import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { UserEntity } from '../../entities';
import { JwtService } from '@nestjs/jwt';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '../../config/app.config';
const app = initializeApp(FIREBASE_CONFIG);

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

    const user: UserEntity = await this.validateByIdToken(token);
    if (!user) {
      throw new UnauthorizedException('Token is invalid or has expired!');
    }
    request.user = user;
    return true;
  }

  async validateByIdToken(idToken: string): Promise<UserEntity> {
    try {
      const credential = GoogleAuthProvider.credential(idToken);

      const auth = getAuth();
      const {
        user: { email },
      } = await signInWithCredential(auth, credential);

      return UserEntity.findOne({ email });
    } catch (error) {
      throw error;
    }
  }
}
