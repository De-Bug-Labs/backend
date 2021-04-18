import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Post_Register} from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of post_register', async () => {
	const post_register = new Post_Register();
	post_register.date= new Date(2020, 11, 12, 11, 52);
    post_register.description='cocina mexicana';
    post_register.email='asdf@gmail.com';
    post_register.name='Juan Pancho';
    post_register.phone='4272265540';
    post_register.staff=await getRepository(Staff_Department).findOneOrFail({
		where: {
			name:'Estudiantes',//matute arreglalo
		},
	});
	const res = await getRepository(Post_Register).save(post_register);
	const checkPost_Register= await getRepository(Post_Register).findOne({
		where: {
			id_post: res.id_post,
		},
	});
	expect(checkPost_Register).toMatchObject(Post_Register);
});
