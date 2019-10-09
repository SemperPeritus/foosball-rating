import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlayerNames1570615973190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "player" RENAME COLUMN "name" to "firstName"`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "player" RENAME COLUMN "firstName" to "name"`);
  }
}
