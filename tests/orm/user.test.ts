import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { User, Rol } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new collaborator', async () => {
	const user = new User();
	user.email = 'email@gmail.com';
	user.lastName = 'Trump';
	user.name = 'Donald';
	user.password = '234jjjsdfk234';
	user.rol = await getRepository(Rol).findOneOrFail({
		where: {
			name: 'testRol',
		},
	});

	const res = await getRepository(User).save(user);
	const checkUser = await getRepository(User).findOne({
		where: {
			idUser: res.idUser,
		},
	});
	expect(checkUser).toMatchObject(user);
});
