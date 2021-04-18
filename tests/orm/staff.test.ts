import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Staff} from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new collaborator', async () => {
	const staff = new Staff();
	staff.email='email@gmail.com'
    staff.post_register;//llave foranea matute arregla esto
    staff.staff_department;//llave foranea matute arregla esto
	const res = await getRepository(Staff).save(staff);
	const checkStaff = await getRepository(Staff).findOne({
		where: {
			id_staff: res.id_staff,
		},
	});
	expect(checkStaff).toMatchObject(staff);
});
