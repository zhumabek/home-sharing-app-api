import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex,
} from 'typeorm';

export class DeleteGoogleIdColumnFromUsersTable1635275556250
  implements MigrationInterface {
  private columns = [
    new TableColumn({
      name: 'googleId',
      type: 'varchar',
      isNullable: false,
    }),
  ];

  private indices = [
    new TableIndex({
      name: 'IDX_USERS_GOOGLE_ID',
      columnNames: ['googleId'],
      isUnique: true,
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndices('users', this.indices);
    await queryRunner.dropColumns('users', this.columns);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', this.columns);
    await queryRunner.createIndices('users', this.indices);
  }
}
