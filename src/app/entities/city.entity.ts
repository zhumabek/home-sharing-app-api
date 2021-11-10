import { Entity, Column, OneToMany } from 'typeorm';
import { AppBaseEntity } from './app-base-entity';
import { ListingEntity } from './listing.entity';

@Entity('cities')
export class CityEntity extends AppBaseEntity {
  @Column('varchar', { nullable: false, unique: true })
  title: string;

  @OneToMany(
    () => ListingEntity,
    listing => listing.city,
    { onDelete: 'SET NULL' },
  )
  listings: ListingEntity[];
}
