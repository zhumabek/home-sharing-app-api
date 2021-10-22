import { Entity, Column } from 'typeorm';
import { AppBaseEntity } from './app-base-entity';

@Entity('images')
export class ImageEntity extends AppBaseEntity {
  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @Column('varchar', { nullable: false, unique: true })
  path: string;
}
