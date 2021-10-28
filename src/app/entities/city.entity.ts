import { Entity, Column } from 'typeorm';
import { AppBaseEntity } from './app-base-entity';

@Entity('cities')
export class CityEntity extends AppBaseEntity {
  @Column('varchar', { nullable: false, unique: true })
  title: string;
}
