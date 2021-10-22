import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { getBaseEntityColumns } from '../app/utils/migration.helper';

export class CreateImagesTable1634907119402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          ...getBaseEntityColumns(),
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'path',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'images',
      new TableIndex({
        name: 'IDX_IMAGES_NAME',
        columnNames: ['name'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('images', 'IDX_IMAGES_NAME');
    await queryRunner.dropTable('images');
  }
}
