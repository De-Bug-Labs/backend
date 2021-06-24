import { MigrationInterface, QueryRunner } from 'typeorm';
import { Permission, Role, User } from '../entities';

export class createRoleEndpoint1624491268386 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;
		const rolePerm = await con.getRepository(Permission).save({ name: 'roles:getAll', description: '' });

		const sAdmin = await con.getRepository(Role).findOneOrFail({ where: { name: 'Super Admin' }, relations: ['permissions'] });

		await con.getRepository(User).createQueryBuilder().relation(Role, 'permissions').of(sAdmin).add(rolePerm);

		const superAdminPermsDiff = ['user:create', 'user:getAll', 'user:getMail', 'user:delete', 'roles:getAll'];

		const normalAdminPerms = sAdmin.permissions.filter((p) => superAdminPermsDiff.indexOf(p.name) === -1);

		//agregar rol de administrador
		await con.getRepository(Role).save({
			name: 'Admin',
			description: '',
			permissions: normalAdminPerms,
		});
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;
		await con.getRepository(Role).delete({ name: 'Admin' });
		await con.getRepository(Permission).delete({ name: 'roles:getAll' });
	}
}
