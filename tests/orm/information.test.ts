import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Information } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('Register institutional information', async () => {
	const information = new Information();
	information.mision = 'mi mision';
	information.instalation = 'mi instalacion';
	information.team = 'mi equipo';
	const res = await getRepository(Information).save(information);
	const checkInformation = await getRepository(Information).findOne({
		where: {
			id: res.id,
		},
	});
	expect(checkInformation).toMatchObject(information);
});
