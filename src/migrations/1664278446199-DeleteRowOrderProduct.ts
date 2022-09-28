import type { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteRowOrderProduct1664278446199 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE order_product_entity DROP COLUMN quantity');
    await queryRunner.query('ALTER TABLE order_product_entity DROP COLUMN cost');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE order_product_entity INSERT COLUMN quantity INT');
    await queryRunner.query('ALTER TABLE order_product_entity INSERT COLUMN cost INT');
  }

}
