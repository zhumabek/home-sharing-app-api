import { Logger, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  imports: [SharedModule],
  controllers: [CityController],
  providers: [CityService, Logger],
})
export class CityModule {}
