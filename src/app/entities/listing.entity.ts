import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AppBaseEntity } from './app-base-entity';
import { UserEntity } from './user.entity';
import { CityEntity } from './city.entity';
import { ImageEntity } from './image.entity';
import { BookingEntity } from './booking.entity';

export enum ListingType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
}

@Entity('listings')
export class ListingEntity extends AppBaseEntity {
  @Column('varchar', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description: string;

  @OneToOne(() => ImageEntity, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  image: ImageEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.listings,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  host: UserEntity;

  @Column('varchar', { nullable: false })
  address: string;

  @ManyToOne(() => CityEntity, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn()
  city: CityEntity;

  @Column('integer', { nullable: false, default: 0 })
  price: number;

  @Column('integer', { nullable: false, default: 0 })
  numOfGuests: number;

  @Column('enum', { enum: ListingType, default: ListingType.APARTMENT })
  type: ListingType;

  @OneToMany(
    () => BookingEntity,
    booking => booking.listing,
  )
  bookings: BookingEntity[];
}
