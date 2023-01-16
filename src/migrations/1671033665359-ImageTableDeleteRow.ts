import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ImageTableDeleteRow1671033665359 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE file_entity DROP COLUMN type');
    await queryRunner.query('DROP TYPE file_entity_type_enum');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE file_entity_type_enum as enum(`gif`,`jpeg`,`png`,`webp`)');
    await queryRunner.query('ALTER TABLE file_entity INSERT COLUMN type file_entity_type_enum');
  }

}
