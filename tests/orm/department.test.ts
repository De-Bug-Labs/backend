import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Department, StaffDepartment } from '../../src/orm/entities';
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
			idDepartment: res.idDepartment,
		},
	});
	expect(checkDepartment).toMatchObject(department);
});
