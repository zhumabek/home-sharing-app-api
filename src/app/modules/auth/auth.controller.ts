import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  @UsePipes(ValidationPipe)
  getGoogleAuthUrl(@Req() req) {
    console.log('GOOGLE');
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  @UsePipes(ValidationPipe)
  logInViaGoogle(@Req() req, @Res() res): Promise<void> {
    console.log('REDIRECT');
    return this.authService.logInViaGoogle(req.user, res);
  }
}