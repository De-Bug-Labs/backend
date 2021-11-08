import { MigrationInterface, QueryRunner } from 'typeorm';

export class createIndexData1622574514120 implements MigrationInterface {
	name = 'createIndexData1622574514120';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "information" ADD "indexText" text default \'GAAP\' NOT NULL');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "information" DROP COLUMN "indexText"');
	}
}
