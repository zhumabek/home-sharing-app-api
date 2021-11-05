import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppResponse } from '../../utils/shared.types';
import { CityEntity } from '../../entities';
import { CityDto } from './dto/user.dto';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(private cityService: CityService) {}

  @Post('/add')
  @UsePipes(ValidationPipe)
  create(@Body() data: CityDto): Promise<AppResponse<CityEntity>> {
    return this.cityService.create(data);
  }

  @Get('/all')
  @UsePipes(ValidationPipe)
  getAll(): Promise<AppResponse<CityEntity[]>> {
    return this.cityService.getAll();
  }
}
