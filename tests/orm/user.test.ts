import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { User, Role } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new collaborator', async () => {
	const user = new User();
	user.email = 'email@mail.com';
	user.lastName = 'Trump';
	user.name = 'Donald';
	user.password = '234jjjsdfk234';
	user.roles = await getRepository(Role).find({
		where: {
			name: 'testRol',
		},
	});

	const res = await getRepository(User).save(user);
	const checkUser = await getRepository(User).findOne({
		relations: ['roles'],
		where: {
			id: res.id,
		},
	});
	expect(checkUser).toMatchObject(user);
});
