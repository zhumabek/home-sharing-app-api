import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { getBaseEntityColumns } from '../app/utils/migration.helper';

export class CreateBookingsTable1636803316814 implements MigrationInterface {
  private indices = [
    new TableIndex({
      name: 'IDX_BOOKINGS_CHECK_OUT',
      columnNames: ['checkOut'],
    }),
    new TableIndex({
      name: 'IDX_BOOKINGS_CHECK_IN',
      columnNames: ['checkIn'],
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          ...getBaseEntityColumns(),
          {
            name: 'checkIn',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'checkOut',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'tenantId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'listingId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndices('bookings', this.indices);

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['tenantId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['listingId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'listings',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('bookings');
    if (table.foreignKeys) {
      await queryRunner.dropForeignKeys('bookings', table.foreignKeys);
    }

    await queryRunner.dropIndices('bookings', this.indices);
    await queryRunner.dropTable('bookings');
  }
}
