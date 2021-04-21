import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Role } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of rol', async () => {
	const rol = new Role();
	rol.name = 'TestRol';
	rol.description = 'TestRolDescription';

	const res = await getRepository(Role).save(rol);
	const checkPostRegister = await getRepository(Role).findOne({
		where: {
			id: res.id,
		},
	});
	expect(checkPostRegister).toMatchObject(rol);
});
