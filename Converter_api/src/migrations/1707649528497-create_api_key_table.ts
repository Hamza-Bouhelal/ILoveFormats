import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateApiKeyTable1707649528497 implements MigrationInterface {
    name = 'CreateApiKeyTable1707649528497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_key" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expired_at" TIMESTAMP NOT NULL DEFAULT (CURRENT_DATE + interval '1' month), "usage_count" integer NOT NULL DEFAULT '0', "userId" uuid, CONSTRAINT "UQ_fb080786c16de6ace7ed0b69f7d" UNIQUE ("key"), CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD CONSTRAINT "FK_277972f4944205eb29127f9bb6c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" DROP CONSTRAINT "FK_277972f4944205eb29127f9bb6c"`);
        await queryRunner.query(`DROP TABLE "api_key"`);
    }

}
