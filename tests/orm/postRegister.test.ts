import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { PostRegister, Staff } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of post register', async () => {
	const postRegister = new PostRegister();
	postRegister.date = new Date();
	postRegister.description = 'las abichuelas me provocan gases';
	postRegister.email = 'abuelo@gmail.com';
	postRegister.name = 'Emilio Rivas';
	postRegister.phone = '4272265540';
	postRegister.staff = await getRepository(Staff).findOneOrFail({
		where: {
			email: 'jisus3000@gmail.com',
		},
	});
	const res = await getRepository(PostRegister).save(postRegister);
	const checkPostRegister = await getRepository(PostRegister).findOne({
		relations: ['staff'],
		where: {
			id: res.id,
		},
	});
	expect(checkPostRegister).toMatchObject(postRegister);
});
