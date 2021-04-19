import { MigrationInterface, QueryRunner } from 'typeorm';

export class CamelCaseFix1618789044992 implements MigrationInterface {
	name = 'CamelCaseFix1618789044992';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."calendar" RENAME COLUMN "id_calendar" TO "idCalendar"');
		await queryRunner.query(
			'ALTER TABLE "public"."calendar" RENAME CONSTRAINT "PK_2954ddcc1fd162709afe66e508a" TO "PK_8f4e3bd2710b248ab8651137f1c"',
		);
		await queryRunner.query('ALTER TABLE "public"."section" RENAME COLUMN "id_section" TO "idSection"');
		await queryRunner.query(
			'ALTER TABLE "public"."section" RENAME CONSTRAINT "PK_d97e4d3b7bbd509fbd2fda46180" TO "PK_d09e6ce323bde28bd7bf295ba69"',
		);
		await queryRunner.query('ALTER TABLE "public"."collaborator" RENAME COLUMN "id_collaborator" TO "idCollaborator"');
		await queryRunner.query(
			'ALTER TABLE "public"."collaborator" RENAME CONSTRAINT "PK_6ab40b4d34fa0035f037fe8c410" TO "PK_7623d2fcb662a065b9e8cf5faa6"',
		);
		await queryRunner.query('ALTER TABLE "public"."staff" RENAME COLUMN "id_staff" TO "idStaff"');
		await queryRunner.query(
			'ALTER TABLE "public"."staff" RENAME CONSTRAINT "PK_35add68404d9042c4c939a25841" TO "PK_d0e557989dd4d0f91f1a9a1fc75"',
		);
		await queryRunner.query('ALTER TABLE "public"."department" RENAME COLUMN "id_department" TO "idDepartment"');
		await queryRunner.query(
			'ALTER TABLE "public"."department" RENAME CONSTRAINT "PK_ee66ffd112694dbc1d73ac96c7c" TO "PK_c280b9cb7f351b63ffd9233d3ae"',
		);
		await queryRunner.query('ALTER TABLE "public"."donation" RENAME COLUMN "id_donation" TO "idDonation"');
		await queryRunner.query(
			'ALTER TABLE "public"."donation" RENAME CONSTRAINT "PK_412d05ab5ed4998ed96424c7737" TO "PK_d2979648f464f82a482dc0e3a6d"',
		);
		await queryRunner.query('ALTER TABLE "public"."material" RENAME COLUMN "id_material" TO "idMaterial"');
		await queryRunner.query(
			'ALTER TABLE "public"."material" RENAME CONSTRAINT "PK_0ee3b92e97285c9b8dcf1fd1b17" TO "PK_3ceaf5571bf2f8f35baa834e186"',
		);
		await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "id_user" TO "idUser"');
		await queryRunner.query(
			'ALTER TABLE "public"."user" RENAME CONSTRAINT "PK_92e42a9ff722382ab9e92b03bfe" TO "PK_dfb0b474d4ee83046fe238e1a08"',
		);
		await queryRunner.query('ALTER TABLE "public"."rol" RENAME COLUMN "id_rol" TO "idRol"');
		await queryRunner.query(
			'ALTER TABLE "public"."rol" RENAME CONSTRAINT "PK_fa51840376defd0ba4ec9eeaf8c" TO "PK_7c8e1b34f45a2e23885625541f4"',
		);
		await queryRunner.query('ALTER TABLE "public"."permission" RENAME COLUMN "id_permission" TO "idPermission"');
		await queryRunner.query(
			'ALTER TABLE "public"."permission" RENAME CONSTRAINT "PK_88fc53d8ab2c8645d5627e158e9" TO "PK_f9b25e5763852696c9581e33f17"',
		);
		await queryRunner.query('ALTER TABLE "public"."view" RENAME COLUMN "id_view" TO "idView"');
		await queryRunner.query(
			'ALTER TABLE "public"."view" RENAME CONSTRAINT "PK_9066637809ea732d286f4e608c1" TO "PK_cc7436efda60a4a8f092f665b77"',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."post_register" ("idPost" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "description" character varying NOT NULL, "date" date NOT NULL, "staffIdStaff" uuid, CONSTRAINT "PK_9c7c57f91441e4fd6611cc597f0" PRIMARY KEY ("idPost"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."staff_department" ("idStaffDepartment" uuid NOT NULL DEFAULT uuid_generate_v4(), "staffIdStaff" uuid, "departmentIdDepartment" uuid, CONSTRAINT "PK_b41c546a15e808e373539a28f78" PRIMARY KEY ("idStaffDepartment"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."donation_settings" ("date" date NOT NULL, "limit" integer NOT NULL, CONSTRAINT "PK_1ee69e5547778d8709dda108325" PRIMARY KEY ("date"))',
		);
		await queryRunner.query(
			'CREATE TABLE "public"."rol_permission" ("idRolPermission" uuid NOT NULL DEFAULT uuid_generate_v4(), "rolIdRol" uuid, "permissionIdPermission" uuid, CONSTRAINT "PK_5d984f46701f923915d34472311" PRIMARY KEY ("idRolPermission"))',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."post_register" ADD CONSTRAINT "FK_e4e78857915fa49dbe9b5f152e9" FOREIGN KEY ("staffIdStaff") REFERENCES "public"."staff"("idStaff") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."staff_department" ADD CONSTRAINT "FK_8590d61c7ff9c7730f6ea795ceb" FOREIGN KEY ("staffIdStaff") REFERENCES "public"."staff"("idStaff") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."staff_department" ADD CONSTRAINT "FK_2de3417abdfccfa4004dd47f282" FOREIGN KEY ("departmentIdDepartment") REFERENCES "public"."department"("idDepartment") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."rol_permission" ADD CONSTRAINT "FK_d067607b3fb5e5e02c9465004ee" FOREIGN KEY ("rolIdRol") REFERENCES "public"."rol"("idRol") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE "public"."rol_permission" ADD CONSTRAINT "FK_3f4c8561cb7a6d9c4065dcebe07" FOREIGN KEY ("permissionIdPermission") REFERENCES "public"."permission"("idPermission") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "public"."rol_permission" DROP CONSTRAINT "FK_3f4c8561cb7a6d9c4065dcebe07"');
		await queryRunner.query('ALTER TABLE "public"."rol_permission" DROP CONSTRAINT "FK_d067607b3fb5e5e02c9465004ee"');
		await queryRunner.query('ALTER TABLE "public"."staff_department" DROP CONSTRAINT "FK_2de3417abdfccfa4004dd47f282"');
		await queryRunner.query('ALTER TABLE "public"."staff_department" DROP CONSTRAINT "FK_8590d61c7ff9c7730f6ea795ceb"');
		await queryRunner.query('ALTER TABLE "public"."post_register" DROP CONSTRAINT "FK_e4e78857915fa49dbe9b5f152e9"');
		await queryRunner.query('DROP TABLE "public"."rol_permission"');
		await queryRunner.query('DROP TABLE "public"."donation_settings"');
		await queryRunner.query('DROP TABLE "public"."staff_department"');
		await queryRunner.query('DROP TABLE "public"."post_register"');
		await queryRunner.query(
			'ALTER TABLE "public"."view" RENAME CONSTRAINT "PK_cc7436efda60a4a8f092f665b77" TO "PK_9066637809ea732d286f4e608c1"',
		);
		await queryRunner.query('ALTER TABLE "public"."view" RENAME COLUMN "idView" TO "id_view"');
		await queryRunner.query(
			'ALTER TABLE "public"."permission" RENAME CONSTRAINT "PK_f9b25e5763852696c9581e33f17" TO "PK_88fc53d8ab2c8645d5627e158e9"',
		);
		await queryRunner.query('ALTER TABLE "public"."permission" RENAME COLUMN "idPermission" TO "id_permission"');
		await queryRunner.query(
			'ALTER TABLE "public"."rol" RENAME CONSTRAINT "PK_7c8e1b34f45a2e23885625541f4" TO "PK_fa51840376defd0ba4ec9eeaf8c"',
		);
		await queryRunner.query('ALTER TABLE "public"."rol" RENAME COLUMN "idRol" TO "id_rol"');
		await queryRunner.query(
			'ALTER TABLE "public"."user" RENAME CONSTRAINT "PK_dfb0b474d4ee83046fe238e1a08" TO "PK_92e42a9ff722382ab9e92b03bfe"',
		);
		await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "idUser" TO "id_user"');
		await queryRunner.query(
			'ALTER TABLE "public"."material" RENAME CONSTRAINT "PK_3ceaf5571bf2f8f35baa834e186" TO "PK_0ee3b92e97285c9b8dcf1fd1b17"',
		);
		await queryRunner.query('ALTER TABLE "public"."material" RENAME COLUMN "idMaterial" TO "id_material"');
		await queryRunner.query(
			'ALTER TABLE "public"."donation" RENAME CONSTRAINT "PK_d2979648f464f82a482dc0e3a6d" TO "PK_412d05ab5ed4998ed96424c7737"',
		);
		await queryRunner.query('ALTER TABLE "public"."donation" RENAME COLUMN "idDonation" TO "id_donation"');
		await queryRunner.query(
			'ALTER TABLE "public"."department" RENAME CONSTRAINT "PK_c280b9cb7f351b63ffd9233d3ae" TO "PK_ee66ffd112694dbc1d73ac96c7c"',
		);
		await queryRunner.query('ALTER TABLE "public"."department" RENAME COLUMN "idDepartment" TO "id_department"');
		await queryRunner.query(
			'ALTER TABLE "public"."staff" RENAME CONSTRAINT "PK_d0e557989dd4d0f91f1a9a1fc75" TO "PK_35add68404d9042c4c939a25841"',
		);
		await queryRunner.query('ALTER TABLE "public"."staff" RENAME COLUMN "idStaff" TO "id_staff"');
		await queryRunner.query(
			'ALTER TABLE "public"."collaborator" RENAME CONSTRAINT "PK_7623d2fcb662a065b9e8cf5faa6" TO "PK_6ab40b4d34fa0035f037fe8c410"',
		);
		await queryRunner.query('ALTER TABLE "public"."collaborator" RENAME COLUMN "idCollaborator" TO "id_collaborator"');
		await queryRunner.query(
			'ALTER TABLE "public"."section" RENAME CONSTRAINT "PK_d09e6ce323bde28bd7bf295ba69" TO "PK_d97e4d3b7bbd509fbd2fda46180"',
		);
		await queryRunner.query('ALTER TABLE "public"."section" RENAME COLUMN "idSection" TO "id_section"');
		await queryRunner.query(
			'ALTER TABLE "public"."calendar" RENAME CONSTRAINT "PK_8f4e3bd2710b248ab8651137f1c" TO "PK_2954ddcc1fd162709afe66e508a"',
		);
		await queryRunner.query('ALTER TABLE "public"."calendar" RENAME COLUMN "idCalendar" TO "id_calendar"');
	}
}
