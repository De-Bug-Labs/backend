import { MigrationInterface, QueryRunner } from 'typeorm';

export class newStaffAtribute1619132835027 implements MigrationInterface {
	name = 'newStaffAtribute1619132835027';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "public"."calendar" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "srcimg" character varying, "description" character varying, "address" character varying, "title" character varying NOT NULL, CONSTRAINT "PK_9e4dccc64ddd5d38064978d5531" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_066fa112d784a19df44b4e473e4" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."collaborator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "srcimg" character varying NOT NULL, "institution" character varying NOT NULL, "sectionId" uuid, CONSTRAINT "PK_1c5cd83154da82f6ad955fb67e1" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."example_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_2673ead44b59f956d2274522ac0" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."donation_settings" ("date" TIMESTAMP WITH TIME ZONE NOT NULL, "limit" integer NOT NULL, CONSTRAINT "PK_1ee69e5547778d8709dda108325" PRIMARY KEY ("date"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."donation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_72732f70d3e7ab2df8c45922d8f" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."material" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_9db6c9744207cef198465e158ed" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5fdbe810f27ad2158d241b56b76" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_1ffedaa40d577e985ee601915e2" UNIQUE ("email"), CONSTRAINT "PK_c7879e4c2a09b630716078ee54c" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."post_register" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "staffId" uuid, CONSTRAINT "PK_c977229da114bdbe772e2617626" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ab841b6a976216a286c10c117f1" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_b7a5e4a3b174e954b2dabf2ef9e" UNIQUE ("email"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."view" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_ba11fb464268f7c4757a18b9631" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_58d261117d7d8ccd61e5948f5f8" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."role_permission" ("permissionId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_56305046d1128b69385c974409a" PRIMARY KEY ("permissionId", "roleId"))',
		);
		await queryRunner.query('CREATE INDEX "IDX_86d2c1da498ad42a1c1d6391f6" ON "public"."role_permission" ("permissionId") ');
		await queryRunner.query('CREATE INDEX "IDX_5bb9da51f06e9d1f852681b3ee" ON "public"."role_permission" ("roleId") ');
		await queryRunner.query(
			'CREATE TABLE "public"."staff_department" ("staffId" uuid NOT NULL, "departmentId" uuid NOT NULL, CONSTRAINT "PK_381988bf0016f0e1d3362c2b9c4" PRIMARY KEY ("staffId", "departmentId"))',
		);
		await queryRunner.query('CREATE INDEX "IDX_0d5de4b50a4cc15fdf8260c2e0" ON "public"."staff_department" ("staffId") ');
		await queryRunner.query('CREATE INDEX "IDX_8bf11b91691f1867a9ba997a47" ON "public"."staff_department" ("departmentId") ');
		await queryRunner.query(
			'CREATE TABLE "public"."user_role" ("roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_7bacece462d4b85513a592a534f" PRIMARY KEY ("roleId", "userId"))',
		);
		await queryRunner.query('CREATE INDEX "IDX_2e9ceea4329b17c617ffc2a36e" ON "public"."user_role" ("roleId") ');
		await queryRunner.query('CREATE INDEX "IDX_14ecf7a54a0cd8be247be7ab99" ON "public"."user_role" ("userId") ');
		await queryRunner.query(
			'ALTER TABLE "public"."collaborator" ADD CONSTRAINT "FK_78fe7285e81a59a40a48f2ede74" FOREIGN KEY ("sectionId") REFERENCES "public"."section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."post_register" ADD CONSTRAINT "FK_d0a3760386082039447bf4aae35" FOREIGN KEY ("staffId") REFERENCES "public"."staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_86d2c1da498ad42a1c1d6391f66" FOREIGN KEY ("permissionId") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_5bb9da51f06e9d1f852681b3eeb" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."staff_department" ADD CONSTRAINT "FK_0d5de4b50a4cc15fdf8260c2e00" FOREIGN KEY ("staffId") REFERENCES "public"."staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."staff_department" ADD CONSTRAINT "FK_8bf11b91691f1867a9ba997a475" FOREIGN KEY ("departmentId") REFERENCES "public"."department"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."user_role" ADD CONSTRAINT "FK_2e9ceea4329b17c617ffc2a36e9" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."user_role" ADD CONSTRAINT "FK_14ecf7a54a0cd8be247be7ab992" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_14ecf7a54a0cd8be247be7ab992"');
		await queryRunner.query('ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_2e9ceea4329b17c617ffc2a36e9"');
		await queryRunner.query('ALTER TABLE "public"."staff_department" DROP CONSTRAINT "FK_8bf11b91691f1867a9ba997a475"');
		await queryRunner.query('ALTER TABLE "public"."staff_department" DROP CONSTRAINT "FK_0d5de4b50a4cc15fdf8260c2e00"');
		await queryRunner.query('ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_5bb9da51f06e9d1f852681b3eeb"');
		await queryRunner.query('ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_86d2c1da498ad42a1c1d6391f66"');
		await queryRunner.query('ALTER TABLE "public"."post_register" DROP CONSTRAINT "FK_d0a3760386082039447bf4aae35"');
		await queryRunner.query('ALTER TABLE "public"."collaborator" DROP CONSTRAINT "FK_78fe7285e81a59a40a48f2ede74"');
		await queryRunner.query('DROP INDEX "public"."IDX_14ecf7a54a0cd8be247be7ab99"');
		await queryRunner.query('DROP INDEX "public"."IDX_2e9ceea4329b17c617ffc2a36e"');
		await queryRunner.query('DROP TABLE "public"."user_role"');
		await queryRunner.query('DROP INDEX "public"."IDX_8bf11b91691f1867a9ba997a47"');
		await queryRunner.query('DROP INDEX "public"."IDX_0d5de4b50a4cc15fdf8260c2e0"');
		await queryRunner.query('DROP TABLE "public"."staff_department"');
		await queryRunner.query('DROP INDEX "public"."IDX_5bb9da51f06e9d1f852681b3ee"');
		await queryRunner.query('DROP INDEX "public"."IDX_86d2c1da498ad42a1c1d6391f6"');
		await queryRunner.query('DROP TABLE "public"."role_permission"');
		await queryRunner.query('DROP TABLE "public"."department"');
		await queryRunner.query('DROP TABLE "public"."view"');
		await queryRunner.query('DROP TABLE "public"."user"');
		await queryRunner.query('DROP TABLE "public"."role"');
		await queryRunner.query('DROP TABLE "public"."post_register"');
		await queryRunner.query('DROP TABLE "public"."staff"');
		await queryRunner.query('DROP TABLE "public"."permission"');
		await queryRunner.query('DROP TABLE "public"."material"');
		await queryRunner.query('DROP TABLE "public"."donation"');
		await queryRunner.query('DROP TABLE "public"."donation_settings"');
		await queryRunner.query('DROP TABLE "public"."example_user"');
		await queryRunner.query('DROP TABLE "public"."collaborator"');
		await queryRunner.query('DROP TABLE "public"."section"');
		await queryRunner.query('DROP TABLE "public"."calendar"');
	}
}
