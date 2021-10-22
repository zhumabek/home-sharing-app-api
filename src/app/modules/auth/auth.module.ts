import { Logger, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [SharedModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, Logger],
})
export class AuthModule {}
