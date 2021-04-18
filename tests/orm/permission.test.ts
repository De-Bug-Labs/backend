import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Permission, Rol_Permission } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('Register  a new permission', async () => {
	const permission = new Permission();
	permission.description = 'usuario puede ver help portal';
	permission.name = 'view help portal';
	const res = await getRepository(Permission).save(permission);
	const checkPermission = await getRepository(Permission).findOne({
		where: {
			id_permission: res.id_permission,
		},
	});
	expect(checkPermission).toMatchObject(permission);
});
