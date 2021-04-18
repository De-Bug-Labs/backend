import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Rol, User } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of rol', async () => {
	const rol = new Rol();
	rol.name = 'TestRol';
	rol.description = 'TestRolDescription';

	const res = await getRepository(Rol).save(rol);
	const checkPost_Register = await getRepository(Rol).findOne({
		where: {
			id_rol: res.id_rol,
		},
	});
	expect(checkPost_Register).toMatchObject(rol);
});
