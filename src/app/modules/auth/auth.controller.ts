import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/auth.dto';
import { LogInResponse } from './interfaces';
import { AppResponse } from '../../utils/shared.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  logInViaGoogle(@Body() data: LogInDto): Promise<AppResponse<LogInResponse>> {
    return this.authService.logInViaGoogle(data.idToken);
  }
}
