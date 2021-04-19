import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestFix1618798194742 implements MigrationInterface {
	name = 'TestFix1618798194742';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."post_register" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."post_register" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL');
		await queryRunner.query('ALTER TABLE "public"."donation" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."donation" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL');
		await queryRunner.query('ALTER TABLE "public"."donation_settings" DROP CONSTRAINT "PK_1ee69e5547778d8709dda108325"');
		await queryRunner.query('ALTER TABLE "public"."donation_settings" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."donation_settings" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL');
		await queryRunner.query(
			'ALTER TABLE "public"."donation_settings" ADD CONSTRAINT "PK_1ee69e5547778d8709dda108325" PRIMARY KEY ("date")',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."donation_settings" DROP CONSTRAINT "PK_1ee69e5547778d8709dda108325"');
		await queryRunner.query('ALTER TABLE "public"."donation_settings" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."donation_settings" ADD "date" date NOT NULL');
		await queryRunner.query(
			'ALTER TABLE "public"."donation_settings" ADD CONSTRAINT "PK_1ee69e5547778d8709dda108325" PRIMARY KEY ("date")',
		);
		await queryRunner.query('ALTER TABLE "public"."donation" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."donation" ADD "date" date NOT NULL');
		await queryRunner.query('ALTER TABLE "public"."post_register" DROP COLUMN "date"');
		await queryRunner.query('ALTER TABLE "public"."post_register" ADD "date" date NOT NULL');
	}
}
