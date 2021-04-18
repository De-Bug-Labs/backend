import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Staff } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register  of staff', async () => {
	const staff = new Staff();
	staff.email = 'test@test.com';
	const res = await getRepository(Staff).save(staff);
	const checkStaff = await getRepository(Staff).findOne({
		where: {
			id_staff: res.id_staff,
		},
	});
	expect(checkStaff).toMatchObject(staff);
});
