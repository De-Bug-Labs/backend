import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExampleUser1617789123671 implements MigrationInterface {
	name = 'createExampleUser1617789123671';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "public"."example_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_2673ead44b59f956d2274522ac0" PRIMARY KEY ("id"))',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "public"."example_user"');
	}
}
