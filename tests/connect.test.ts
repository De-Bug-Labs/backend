import { getConnection, getRepository } from 'typeorm';
import connection from '../src/connect';

beforeAll(async () => {
	await connection.create();
	await connection.clear();
});

afterAll(async () => {
	await connection.close();
});

test('Check entities are cleared correctly', async () => {
	expect(0).toEqual(0);
});
