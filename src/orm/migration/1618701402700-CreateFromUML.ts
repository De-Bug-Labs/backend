import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFromUML1618701402700 implements MigrationInterface {
	name = 'CreateFromUML1618701402700';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "public"."calendar" ("id_calendar" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "time" TIME, "srcimg" character varying, "description" character varying, "address" character varying, "title" character varying NOT NULL, CONSTRAINT "PK_2954ddcc1fd162709afe66e508a" PRIMARY KEY ("id_calendar"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."section" ("id_section" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_d97e4d3b7bbd509fbd2fda46180" PRIMARY KEY ("id_section"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."collaborator" ("id_collaborator" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "srcimg" character varying NOT NULL, "institution" character varying NOT NULL, "sectionIdSection" uuid, CONSTRAINT "PK_6ab40b4d34fa0035f037fe8c410" PRIMARY KEY ("id_collaborator"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."post__register" ("id_post" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "description" character varying NOT NULL, "date" date NOT NULL, "staffIdStaff" uuid, CONSTRAINT "PK_4f01aa830c8467ab5ed9dd76eb5" PRIMARY KEY ("id_post"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."staff" ("id_staff" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, CONSTRAINT "UQ_1ffedaa40d577e985ee601915e2" UNIQUE ("email"), CONSTRAINT "PK_35add68404d9042c4c939a25841" PRIMARY KEY ("id_staff"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."staff__department" ("id_staff_department" uuid NOT NULL DEFAULT uuid_generate_v4(), "staffIdStaff" uuid, "departmentIdDepartment" uuid, CONSTRAINT "PK_254dff15cebd875ef4a200f7ae4" PRIMARY KEY ("id_staff_department"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."department" ("id_department" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ee66ffd112694dbc1d73ac96c7c" PRIMARY KEY ("id_department"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."donation__settings" ("date" date NOT NULL, "limit" integer NOT NULL, CONSTRAINT "PK_c8ef5a3d6448f9fa521230a0409" PRIMARY KEY ("date"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."donation" ("id_donation" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "date" date NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_412d05ab5ed4998ed96424c7737" PRIMARY KEY ("id_donation"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."material" ("id_material" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_0ee3b92e97285c9b8dcf1fd1b17" PRIMARY KEY ("id_material"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."user" ("id_user" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "rolIdRol" uuid, CONSTRAINT "UQ_b7a5e4a3b174e954b2dabf2ef9e" UNIQUE ("email"), CONSTRAINT "PK_92e42a9ff722382ab9e92b03bfe" PRIMARY KEY ("id_user"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."rol" ("id_rol" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_fa51840376defd0ba4ec9eeaf8c" PRIMARY KEY ("id_rol"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."rol__permission" ("id_rol_permission" uuid NOT NULL DEFAULT uuid_generate_v4(), "rolIdRol" uuid, "permissionIdPermission" uuid, CONSTRAINT "PK_236abcff90ab93b0a368f0a6a5f" PRIMARY KEY ("id_rol_permission"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."permission" ("id_permission" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_88fc53d8ab2c8645d5627e158e9" PRIMARY KEY ("id_permission"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."view" ("id_view" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_9066637809ea732d286f4e608c1" PRIMARY KEY ("id_view"))',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."collaborator" ADD CONSTRAINT "FK_a2dfbf14332a85188c980ebce61" FOREIGN KEY ("sectionIdSection") REFERENCES "public"."section"("id_section") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."post__register" ADD CONSTRAINT "FK_1e9c31f3f06df1ed3ecd707189a" FOREIGN KEY ("staffIdStaff") REFERENCES "public"."staff"("id_staff") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."staff__department" ADD CONSTRAINT "FK_78c665503410e0453db342a3903" FOREIGN KEY ("staffIdStaff") REFERENCES "public"."staff"("id_staff") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."staff__department" ADD CONSTRAINT "FK_799945234f9ada4d43eee5f99e5" FOREIGN KEY ("departmentIdDepartment") REFERENCES "public"."department"("id_department") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."user" ADD CONSTRAINT "FK_ff841801299b3fd4651b36a1fe1" FOREIGN KEY ("rolIdRol") REFERENCES "public"."rol"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."rol__permission" ADD CONSTRAINT "FK_c8cb02ab081604607d5a6776601" FOREIGN KEY ("rolIdRol") REFERENCES "public"."rol"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."rol__permission" ADD CONSTRAINT "FK_4b7c92c0ac72c09db313079d13c" FOREIGN KEY ("permissionIdPermission") REFERENCES "public"."permission"("id_permission") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."rol__permission" DROP CONSTRAINT "FK_4b7c92c0ac72c09db313079d13c"');
		await queryRunner.query('ALTER TABLE "public"."rol__permission" DROP CONSTRAINT "FK_c8cb02ab081604607d5a6776601"');
		await queryRunner.query('ALTER TABLE "public"."user" DROP CONSTRAINT "FK_ff841801299b3fd4651b36a1fe1"');
		await queryRunner.query('ALTER TABLE "public"."staff__department" DROP CONSTRAINT "FK_799945234f9ada4d43eee5f99e5"');
		await queryRunner.query('ALTER TABLE "public"."staff__department" DROP CONSTRAINT "FK_78c665503410e0453db342a3903"');
		await queryRunner.query('ALTER TABLE "public"."post__register" DROP CONSTRAINT "FK_1e9c31f3f06df1ed3ecd707189a"');
		await queryRunner.query('ALTER TABLE "public"."collaborator" DROP CONSTRAINT "FK_a2dfbf14332a85188c980ebce61"');
		await queryRunner.query('DROP TABLE "public"."view"');
		await queryRunner.query('DROP TABLE "public"."permission"');
		await queryRunner.query('DROP TABLE "public"."rol__permission"');
		await queryRunner.query('DROP TABLE "public"."rol"');
		await queryRunner.query('DROP TABLE "public"."user"');
		await queryRunner.query('DROP TABLE "public"."material"');
		await queryRunner.query('DROP TABLE "public"."donation"');
		await queryRunner.query('DROP TABLE "public"."donation__settings"');
		await queryRunner.query('DROP TABLE "public"."department"');
		await queryRunner.query('DROP TABLE "public"."staff__department"');
		await queryRunner.query('DROP TABLE "public"."staff"');
		await queryRunner.query('DROP TABLE "public"."post__register"');
		await queryRunner.query('DROP TABLE "public"."collaborator"');
		await queryRunner.query('DROP TABLE "public"."section"');
		await queryRunner.query('DROP TABLE "public"."calendar"');
	}
}
