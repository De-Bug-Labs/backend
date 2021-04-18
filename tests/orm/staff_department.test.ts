import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Staff_Department, Department, Staff } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of staff_department', async () => {
	const staff_department = new Staff_Department();
	staff_department.department = await getRepository(Department).findOneOrFail({
		where: {
			name: 'nutricion',
		},
	});
	staff_department.staff = await getRepository(Staff).findOneOrFail({
		where: {
			email: 'test@test.com',
		},
	});

	const res = await getRepository(Staff_Department).save(staff_department);
	const checkStaff_Department = await getRepository(Staff_Department).findOne({
		where: {
			id_staff_department: res.id_staff_department,
		},
	});
	expect(checkStaff_Department).toMatchObject(staff_department);
});
