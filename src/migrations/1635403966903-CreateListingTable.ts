import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { getBaseEntityColumns } from '../app/utils/migration.helper';
import { ListingType } from '../app/entities';

export class CreateListingTable1635403966903 implements MigrationInterface {
  private indices = [
    new TableIndex({
      name: 'IDX_LISTINGS_TITLE',
      columnNames: ['title'],
    }),
    new TableIndex({
      name: 'IDX_LISTINGS_TYPE',
      columnNames: ['type'],
    }),
    new TableIndex({
      name: 'IDX_LISTINGS_ADDRESS',
      columnNames: ['address'],
    }),
    new TableIndex({
      name: 'IDX_LISTINGS_PRICE',
      columnNames: ['price'],
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'listings',
        columns: [
          ...getBaseEntityColumns(),
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'numOfQuests',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'listing_type_enum',
            enum: [ListingType.APARTMENT, ListingType.HOUSE],
            default: `'${ListingType.APARTMENT}'`,
          },
          {
            name: 'imageId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'hostId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cityId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndices('listings', this.indices);

    await queryRunner.createForeignKey(
      'listings',
      new TableForeignKey({
        columnNames: ['imageId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'images',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'listings',
      new TableForeignKey({
        columnNames: ['cityId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'listings',
      new TableForeignKey({
        columnNames: ['hostId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('listings');
    if (table.foreignKeys) {
      await queryRunner.dropForeignKeys('listings', table.foreignKeys);
    }

    await queryRunner.dropIndices('listings', this.indices);
    await queryRunner.dropTable('listings');
    await queryRunner.query(`DROP TYPE listing_type_enum;`);
  }
}
