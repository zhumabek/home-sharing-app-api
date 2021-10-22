import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppResponse } from '../../utils/shared.types';
import { UserEntity } from '../../entities';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Auth } from '../../shared/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth()
  @Put('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() data: UserDto,
  ): Promise<AppResponse<UserEntity>> {
    return this.userService.update(id, data);
  }

  @Get('')
  getByEmail(@Query('email') email: string): Promise<AppResponse> {
    return this.userService.getByEmail(email);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<AppResponse<UserEntity>> {
    return this.userService.getById(id);
  }
}
