import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Staff_Department} from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of staff_department', async () => {
	const staff_department = new Staff_Department();
	staff_department.department;//llaves foraneas matute arregla esto
    staff_department.staff;//llaves foraneas matute arregla esto
 
	const res = await getRepository(Staff_Department).save(staff_department);
	const checkStaff_Department = await getRepository(Staff_Department).findOne({
		where: {
			id_staff_department: res.id_staff_department,
		},
	});
	expect(checkStaff_Department).toMatchObject(staff_department);
});
