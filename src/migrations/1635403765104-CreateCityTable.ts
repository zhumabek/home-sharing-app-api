import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getBaseEntityColumns } from '../app/utils/migration.helper';

export class CreateCityTable1635403765104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          ...getBaseEntityColumns(),
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cities');
  }
}
