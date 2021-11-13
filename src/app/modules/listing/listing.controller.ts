import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppResponse, MulterFile } from '../../utils/shared.types';
import { ListingEntity } from '../../entities';
import { ListingService } from './listing.service';
import { BookingDto, ListingDto } from './dto/user.dto';
import { Auth } from '../../shared/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedImageResponse } from './interfaces';

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

  @Get('/all')
  getAll(
    @Query('cityId') cityId?: string,
  ): Promise<AppResponse<ListingEntity[]>> {
    return this.listingService.getAll(cityId);
  }

  @Get('/search')
  searchListings(
    @Query('value') value?: string,
  ): Promise<AppResponse<ListingEntity[]>> {
    return this.listingService.searchListings(value);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  getById(@Param('id') id: string): Promise<AppResponse<ListingEntity>> {
    return this.listingService.getById(id);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteById(@Param('id') id: string): Promise<AppResponse<ListingEntity>> {
    return this.listingService.deleteById(id);
  }

  @Get('/city/:cityId')
  @UsePipes(ValidationPipe)
  getListingsByCityId(
    @Param('cityId') cityId: string,
  ): Promise<AppResponse<ListingEntity[]>> {
    return this.listingService.getListingsByCityId(cityId);
  }

  @Auth()
  @Post('upload/image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() file: MulterFile,
  ): Promise<UploadedImageResponse> {
    return this.listingService.uploadImage(file);
  }

  @Auth()
  @Post('/:id/book')
  @UsePipes(ValidationPipe)
  bookListing(
    @Req() req,
    @Param('id') listingId: string,
    @Body() data: BookingDto,
  ): Promise<AppResponse<ListingEntity>> {
    return this.listingService.bookListing(listingId, data, req.user.id);
  }
}
