import type { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1662490748917 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user_entity ADD COLUMN roles enum(\`vendor\`, \`costumer\`) ');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user_entity DROP COLUMN roles');
  }

}
