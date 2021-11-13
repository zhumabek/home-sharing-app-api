import { Entity, Column, OneToMany } from 'typeorm';
import { AppBaseEntity } from './app-base-entity';
import { ListingEntity } from './listing.entity';
import { BookingEntity } from './booking.entity';

@Entity('users')
export class UserEntity extends AppBaseEntity {
  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  firstName: string;

  @Column('varchar', { nullable: true })
  lastName: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('boolean', { default: false })
  hasWallet: boolean;

  @Column('varchar', { nullable: true })
  walletNumber: string;

  @Column('varchar', { nullable: true })
  avatar: string;

  @OneToMany(
    () => ListingEntity,
    listing => listing.host,
    { onDelete: 'CASCADE' },
  )
  listings: ListingEntity[];

  @OneToMany(
    () => BookingEntity,
    booking => booking.tenant,
    { onDelete: 'CASCADE' },
  )
  bookings: BookingEntity[];
}
