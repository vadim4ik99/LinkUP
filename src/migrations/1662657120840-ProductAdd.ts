import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAdd1662657120840 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE product_entity ALTER COLUMN sold DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE product_entity ALTER COLUMN sold SET NOT NULL');
  }

}
