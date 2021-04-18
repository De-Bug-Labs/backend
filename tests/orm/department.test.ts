import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Department, Staff_Department } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new collaborator', async () => {
	const department = new Department();
	department.description = 'TestDepartmentDescription';
	department.name = 'TestDepartmentName';

	const res = await getRepository(Department).save(department);
	const checkDepartment = await getRepository(Department).findOne({
		where: {
			id_department: res.id_department,
		},
	});
	expect(checkDepartment).toMatchObject(department);
});
