import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCalendarEntityDateAgain1621098272424 implements MigrationInterface {
	name = 'updateCalendarEntityDateAgain1621098272424';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."calendar" ALTER COLUMN "date" DROP DEFAULT');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."calendar" ALTER COLUMN "date" SET DEFAULT CURRENT_DATE');
	}
}
