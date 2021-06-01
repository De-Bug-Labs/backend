import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueRole1622572950091 implements MigrationInterface {
	name = 'AddUniqueRole1622572950091';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "collaborator" DROP CONSTRAINT "FK_78fe7285e81a59a40a48f2ede74"');
		await queryRunner.query('ALTER TABLE "post_register" DROP CONSTRAINT "FK_d0a3760386082039447bf4aae35"');
		await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "FK_86d2c1da498ad42a1c1d6391f66"');
		await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "FK_5bb9da51f06e9d1f852681b3eeb"');
		await queryRunner.query('ALTER TABLE "staff_department" DROP CONSTRAINT "FK_0d5de4b50a4cc15fdf8260c2e00"');
		await queryRunner.query('ALTER TABLE "staff_department" DROP CONSTRAINT "FK_8bf11b91691f1867a9ba997a475"');
		await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_2e9ceea4329b17c617ffc2a36e9"');
		await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_14ecf7a54a0cd8be247be7ab992"');
		await queryRunner.query('DROP INDEX "IDX_86d2c1da498ad42a1c1d6391f6"');
		await queryRunner.query('DROP INDEX "IDX_5bb9da51f06e9d1f852681b3ee"');
		await queryRunner.query('DROP INDEX "IDX_8bf11b91691f1867a9ba997a47"');
		await queryRunner.query('DROP INDEX "IDX_0d5de4b50a4cc15fdf8260c2e0"');
		await queryRunner.query('DROP INDEX "IDX_2e9ceea4329b17c617ffc2a36e"');
		await queryRunner.query('DROP INDEX "IDX_14ecf7a54a0cd8be247be7ab99"');
		await queryRunner.query('ALTER TABLE "permission" ADD CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name")');
		await queryRunner.query('CREATE INDEX "IDX_72e80be86cab0e93e67ed1a7a9" ON "role_permission" ("permissionId") ');
		await queryRunner.query('CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON "role_permission" ("roleId") ');
		await queryRunner.query('CREATE INDEX "IDX_cb015e97a44a6830be4478044c" ON "staff_department" ("staffId") ');
		await queryRunner.query('CREATE INDEX "IDX_b646e986660fc491f035e5840e" ON "staff_department" ("departmentId") ');
		await queryRunner.query('CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") ');
		await queryRunner.query('CREATE INDEX "IDX_ab40a6f0cd7d3ebfcce082131f" ON "user_role" ("userId") ');
		await queryRunner.query(
			'ALTER TABLE "collaborator" ADD CONSTRAINT "FK_f91d870771bc46a2a618767b700" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "post_register" ADD CONSTRAINT "FK_9cb0e12fca1424665fd9036a530" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "staff_department" ADD CONSTRAINT "FK_cb015e97a44a6830be4478044cb" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "staff_department" ADD CONSTRAINT "FK_b646e986660fc491f035e5840e4" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"');
		await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"');
		await queryRunner.query('ALTER TABLE "staff_department" DROP CONSTRAINT "FK_b646e986660fc491f035e5840e4"');
		await queryRunner.query('ALTER TABLE "staff_department" DROP CONSTRAINT "FK_cb015e97a44a6830be4478044cb"');
		await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"');
		await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"');
		await queryRunner.query('ALTER TABLE "post_register" DROP CONSTRAINT "FK_9cb0e12fca1424665fd9036a530"');
		await queryRunner.query('ALTER TABLE "collaborator" DROP CONSTRAINT "FK_f91d870771bc46a2a618767b700"');
		await queryRunner.query('DROP INDEX "IDX_ab40a6f0cd7d3ebfcce082131f"');
		await queryRunner.query('DROP INDEX "IDX_dba55ed826ef26b5b22bd39409"');
		await queryRunner.query('DROP INDEX "IDX_b646e986660fc491f035e5840e"');
		await queryRunner.query('DROP INDEX "IDX_cb015e97a44a6830be4478044c"');
		await queryRunner.query('DROP INDEX "IDX_e3130a39c1e4a740d044e68573"');
		await queryRunner.query('DROP INDEX "IDX_72e80be86cab0e93e67ed1a7a9"');
		await queryRunner.query('ALTER TABLE "permission" DROP CONSTRAINT "UQ_240853a0c3353c25fb12434ad33"');
		await queryRunner.query('CREATE INDEX "IDX_14ecf7a54a0cd8be247be7ab99" ON "user_role" ("userId") ');
		await queryRunner.query('CREATE INDEX "IDX_2e9ceea4329b17c617ffc2a36e" ON "user_role" ("roleId") ');
		await queryRunner.query('CREATE INDEX "IDX_0d5de4b50a4cc15fdf8260c2e0" ON "staff_department" ("staffId") ');
		await queryRunner.query('CREATE INDEX "IDX_8bf11b91691f1867a9ba997a47" ON "staff_department" ("departmentId") ');
		await queryRunner.query('CREATE INDEX "IDX_5bb9da51f06e9d1f852681b3ee" ON "role_permission" ("roleId") ');
		await queryRunner.query('CREATE INDEX "IDX_86d2c1da498ad42a1c1d6391f6" ON "role_permission" ("permissionId") ');
		await queryRunner.query(
			'ALTER TABLE "user_role" ADD CONSTRAINT "FK_14ecf7a54a0cd8be247be7ab992" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "user_role" ADD CONSTRAINT "FK_2e9ceea4329b17c617ffc2a36e9" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "staff_department" ADD CONSTRAINT "FK_8bf11b91691f1867a9ba997a475" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "staff_department" ADD CONSTRAINT "FK_0d5de4b50a4cc15fdf8260c2e00" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "role_permission" ADD CONSTRAINT "FK_5bb9da51f06e9d1f852681b3eeb" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "role_permission" ADD CONSTRAINT "FK_86d2c1da498ad42a1c1d6391f66" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "post_register" ADD CONSTRAINT "FK_d0a3760386082039447bf4aae35" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "collaborator" ADD CONSTRAINT "FK_78fe7285e81a59a40a48f2ede74" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
	}
}
