import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationshipInImageCategory1671354171023 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE IF EXISTS product_entity DROP' +
    ' CONSTRAINT IF EXISTS "FK_e2c62cb8eaec0d909de8264e5ca"');
    await queryRunner.query('ALTER TABLE file_entity ADD COLUMN IF NOT EXISTS product_id INT');
    await queryRunner.query('ALTER TABLE file_entity ADD CONSTRAINT ' +
    'FK_product FOREIGN KEY(product_id) REFERENCES product_entity(id)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE product_entity ADD CONSTRAINT ' +
    'FK_e2c62cb8eaec0d909de8264e5ca FOREING KEY(ImageId) REFERENCES file_entity(id)');
    await queryRunner.query('ALTER TABLE IF EXISTS file_entity DROP CONSTRAINT ' +
    'IF EXIST "FK_categories"');
  }

}
