import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { View } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of view', async () => {
	const view = new View();
	view.name = 'help portal';
	view.status = true;

	const res = await getRepository(View).save(view);
	const checkView = await getRepository(View).findOne({
		where: {
			id: res.id,
		},
	});
	expect(checkView).toMatchObject(view);
});
