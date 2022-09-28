import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CartTotal1663520284202 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE cart_entity ADD COLUMN IF NOT EXISTS quantity INT default 1');
    await queryRunner.query('ALTER TABLE cart_entity ADD COLUMN IF NOT EXISTS total INT');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE cart_entity DROP COLUMN quantity INT');
    await queryRunner.query('ALTER TABLE cart_entity DROP COLUMN total INT');
  }

}
