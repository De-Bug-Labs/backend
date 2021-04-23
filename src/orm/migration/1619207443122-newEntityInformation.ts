import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntityInformation1619207443122 implements MigrationInterface {
    name = 'newEntityInformation1619207443122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."information" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mision" text NOT NULL, "instalation" text NOT NULL, "team" text NOT NULL, CONSTRAINT "PK_f976ae977afe6a7ab02c6c046f3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."information"`);
    }

}
