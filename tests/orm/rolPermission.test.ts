import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { RolPermission, Rol, Permission } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new Rol Permission', async () => {
	const rolPermission = new RolPermission();
	//matute arregla esto
	rolPermission.permission = await getRepository(Permission).findOneOrFail({
		where: {
			name: 'TestPermission',
		},
	});
	rolPermission.rol = await getRepository(Rol).findOneOrFail({
		where: {
			name: 'TestRol',
		},
	});
	const res = await getRepository(RolPermission).save(rolPermission);
	const checkPostRegister = await getRepository(RolPermission).findOne({
		where: {
			idRolPermission: res.idRolPermission,
		},
	});
	expect(checkPostRegister).toMatchObject(rolPermission);
});
