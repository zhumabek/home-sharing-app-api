import { Logger, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [SharedModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule {}
