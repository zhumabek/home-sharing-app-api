import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository, UserRepository } from '../repositories';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../config/app.config';
import { FileService } from './services/file.service';

const REPOSITORIES = [ImageRepository, UserRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(REPOSITORIES),
    JwtModule.register(JWT_CONFIG),
  ],
  providers: [FileService],
  exports: [TypeOrmModule, JwtModule, FileService],
  controllers: [],
})
export class SharedModule {}
