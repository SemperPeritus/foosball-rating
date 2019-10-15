import { MigrationInterface, QueryRunner } from 'typeorm';

export class GameCreatedBy1571140413044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "createdById" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "createdById" DROP NOT NULL`);
  }
}
