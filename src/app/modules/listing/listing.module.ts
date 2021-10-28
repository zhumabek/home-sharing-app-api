import { Logger, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';

@Module({
  imports: [SharedModule],
  controllers: [ListingController],
  providers: [ListingService, Logger],
})
export class ListingModule {}
