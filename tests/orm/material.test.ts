import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Material } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('Register a new material', async () => {
	const material = new Material();
	material.link = 'https://www.youtube.com/watch?v=SMiVJ4mmbQM';
	material.title = 'clases de baile';
	const res = await getRepository(Material).save(material);
	const checkMaterial = await getRepository(Material).findOne({
		where: {
			id_material: res.id_material,
		},
	});
	expect(checkMaterial).toMatchObject(material);
});
