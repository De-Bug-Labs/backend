import { MigrationInterface, QueryRunner } from 'typeorm';

export class createIndexData1636318251369 implements MigrationInterface {
	name = 'createIndexData1636318251369';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "information" ADD "indexText" text default \'GAAP\' NOT NULL');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "information" DROP COLUMN "indexText"');
	}
}
