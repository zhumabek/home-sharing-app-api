import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/database/typeorm.config';
import { AuthModule, UserModule } from './modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from './config/app.config';
import { ListingModule } from './modules/listing/listing.module';
import { CityModule } from './modules/city/city.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: config.STATIC_DIR,
    }),
    UserModule,
    AuthModule,
    ListingModule,
    CityModule,
  ],
})
export class AppModule {}
