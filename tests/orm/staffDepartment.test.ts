import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { StaffDepartment, Department, Staff } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of staff_department', async () => {
	const staffDepartment = new StaffDepartment();
	staffDepartment.department = await getRepository(Department).findOneOrFail({
		where: {
			name: 'nutricion',
		},
	});
	staffDepartment.staff = await getRepository(Staff).findOneOrFail({
		where: {
			email: 'test@test.com',
		},
	});

	const res = await getRepository(StaffDepartment).save(staffDepartment);
	const checkStaffDepartment = await getRepository(StaffDepartment).findOne({
		where: {
			idStaffDepartment: res.idStaffDepartment,
		},
	});
	expect(checkStaffDepartment).toMatchObject(staffDepartment);
});
