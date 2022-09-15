import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRole1662548682807 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE roles AS ENUM (\'vendor\', \'customer\')');
    await queryRunner.query('ALTER TABLE user_entity ADD COLUMN roles roles');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TYPE roles');
    await queryRunner.query('ALTER TABLE user_entity DROP COLUMN roles');
  }

}
