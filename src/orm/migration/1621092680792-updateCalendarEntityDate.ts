import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCalendarEntityDate1621092680792 implements MigrationInterface {
	name = 'updateCalendarEntityDate1621092680792';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."calendar" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."calendar" ADD "date" date NOT NULL DEFAULT CURRENT_DATE');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."calendar" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."calendar" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL');
	}
}
