import { getRepository, QueryFailedError } from 'typeorm';
import connection from '../../src/connect';
import { Staff } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new staff', async () => {
	const staff = new Staff();
	staff.email = 'test@test.com';
	const func = async () => {
		return await getRepository(Staff).save(staff);
	};
	expect(func).rejects.toEqual(new QueryFailedError('default', undefined, 'test'));
});
