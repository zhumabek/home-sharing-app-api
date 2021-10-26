import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppResponse } from '../../utils/shared.types';

import { LogInResponse } from './interfaces';
import { FIREBASE_CONFIG } from '../../config/app.config';
import { UserRepository } from '../../repositories';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async logInViaGoogle(idToken: string): Promise<AppResponse<LogInResponse>> {
    try {
      const credential = GoogleAuthProvider.credential(idToken);

      const auth = getAuth();
      const {
        user: { displayName, email, photoURL },
      } = await signInWithCredential(auth, credential);

      const user = await this.userRepo.findOne({ email });

      if (!user) {
        const newUser = this.userRepo.create();
        newUser.email = email;
        newUser.firstName = displayName.split(' ')[0];
        newUser.lastName = displayName.split(' ')[1];
        newUser.avatar = photoURL;
        await newUser.save();

        return { data: { user: newUser, idToken: credential.idToken } };
      }

      return { data: { user, idToken: credential.idToken } };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
