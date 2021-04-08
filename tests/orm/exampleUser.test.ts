import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { ExampleUser } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('store Joe and fetch it', async () => {
	const user = new ExampleUser();
	user.firstName = 'John';
	user.lastName = 'Doe';
	user.age = 21;
	const res = await getRepository(ExampleUser).save(user);
	const joe = await getRepository(ExampleUser).findOne({
		where: {
			id: res.id,
		},
	});
	expect(joe).toMatchObject(user);
});
