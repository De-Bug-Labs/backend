import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Rol_Permission} from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of post_register', async () => {
	const rol_permission = new Rol_Permission();
    //matute arregla esto
    rol_permission.permission=await getRepository(Staff_Department).findOneOrFail({
		where: {
			name:'Estudiantes',//matute arreglalo
		},
	});
    rol_permission.rol=await getRepository(Staff_Department).findOneOrFail({
		where: {
			name:'Estudiantes',//matute arreglalo
		},
	});
	const res = await getRepository(Rol_Permission).save(rol_permission);
	const checkPost_Register= await getRepository(Rol_Permission).findOne({
		where: {
			id_rol_permission: res.id_rol_permission,
		},
	});
	expect(checkPost_Register).toMatchObject(Rol_Permission);
});
