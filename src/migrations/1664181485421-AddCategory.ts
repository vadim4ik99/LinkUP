import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategory1664181485421 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO categories_entity(name)'+
    +'VALUES (\'Category1\'),(\'Category2\'),(\'Category3\')');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM categories_entity');
  }

}
