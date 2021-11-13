import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AppBaseEntity } from './app-base-entity';
import { ListingEntity } from './listing.entity';
import { UserEntity } from './user.entity';

@Entity('bookings')
export class BookingEntity extends AppBaseEntity {
  @Column('date', { nullable: false })
  checkIn: Date;

  @Column('date', { nullable: false })
  checkOut: Date;

  @ManyToOne(
    () => ListingEntity,
    listing => listing.bookings,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn()
  listing: ListingEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.bookings,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn()
  tenant: UserEntity;
}
