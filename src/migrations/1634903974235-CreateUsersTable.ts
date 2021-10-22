import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { getBaseEntityColumns } from '../app/utils/migration.helper';

export class CreateUsersTable1634903974235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ...getBaseEntityColumns(),
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'hasWallet',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'googleId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'walletNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_EMAIL',
        columnNames: ['email'],
        isUnique: true,
      }),
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_GOOGLE_ID',
        columnNames: ['googleId'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_USERS_EMAIL');
    await queryRunner.dropIndex('users', 'IDX_USERS_GOOGLE_ID');
    await queryRunner.dropTable('users');
  }
}
