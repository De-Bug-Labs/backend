import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Section } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new collaborator', async () => {
	const section = new Section();
	section.name = 'testSection';

	const res = await getRepository(Section).save(section);
	const checkSection = await getRepository(Section).findOne({
		where: {
			id: res.id,
		},
	});
	expect(checkSection).toMatchObject(section);
});
