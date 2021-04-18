import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyCalendar1618703209049 implements MigrationInterface {
	name = 'ModifyCalendar1618703209049';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "public"."calendar" DROP COLUMN "time"`);
		await queryRunner.query(`ALTER TABLE "public"."calendar" DROP COLUMN "date"`);
		await queryRunner.query(`ALTER TABLE "public"."calendar" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "public"."calendar" DROP COLUMN "date"`);
		await queryRunner.query(`ALTER TABLE "public"."calendar" ADD "date" date NOT NULL`);
		await queryRunner.query(`ALTER TABLE "public"."calendar" ADD "time" TIME`);
	}
}
