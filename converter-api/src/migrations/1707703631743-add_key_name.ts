import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKeyName1707703631743 implements MigrationInterface {
  name = "AddKeyName1707703631743";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "api_key" ADD "name" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "name"`);
  }
}
