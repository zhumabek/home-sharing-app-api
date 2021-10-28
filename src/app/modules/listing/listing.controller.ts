import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppResponse } from '../../utils/shared.types';
import { ListingEntity } from '../../entities';
import { ListingService } from './listing.service';
import { ListingDto } from './dto/user.dto';
import { Auth } from '../../shared/decorators/auth.decorator';

@Controller('listing')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Auth()
  @Put('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() data: ListingDto,
  ): Promise<AppResponse<ListingEntity>> {
    return this.listingService.update(id, data, req.user.id);
  }

  @Auth()
  @Post('/add')
  @UsePipes(ValidationPipe)
  create(
    @Req() req,
    @Body() data: ListingDto,
  ): Promise<AppResponse<ListingEntity>> {
    return this.listingService.create(data, req.user.id);
  }

  @Auth()
  @Post('/all')
  @UsePipes(ValidationPipe)
  getAll(): Promise<AppResponse<ListingEntity[]>> {
    return this.listingService.getAll();
  }
}
