import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterBookingTable1636913867429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('bookings');
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('listingId') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('bookings', foreignKey);
    }

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['listingId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'listings',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('bookings');
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('listingId') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('bookings', foreignKey);
    }

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
}
