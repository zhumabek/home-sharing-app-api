require('dotenv').config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  CityEntity,
  ImageEntity,
  ListingEntity,
  UserEntity,
} from '../../entities';

export const ENTITIES = [UserEntity, ImageEntity, CityEntity, ListingEntity];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_SECRET || 'postgres',
  database: process.env.DB_NAME || 'home-sharing-app',
  entities: ENTITIES,
  synchronize: false,
};

export const typeOrmCliConfig: TypeOrmModuleOptions = {
  ...typeOrmConfig,
  entities: ['**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
