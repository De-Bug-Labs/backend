import connection from '../connect';
import { ExampleUser } from './entities';
import { Role, Permission, User } from './entities';
import { hashPassword } from '../api/UserController';

connection
	.create()
	.then(async (con) => {
		// Add data inserts here
		await con
			.createQueryBuilder()
			.insert()
			.into(ExampleUser)
			.values([
				{ firstName: 'John', lastName: 'Doe', age: 21 },
				{ firstName: 'Jane', lastName: 'Doe', age: 22 },
			])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Role)
			.values([{ name: 'prueba', description: 'rol de test' }])
			.execute();

		const swaggerPermissions = [
			{ name: 'test:read', description: '' },
			{ name: 'test:write', description: '' },
			{ name: 'test:delete', description: '' },
			{ name: 'mail:write', description: '' },
			{ name: 'staff:write', description: '' },
			{ name: 'staff:read', description: '' },
			{ name: 'staff:delete', description: '' },
			{ name: 'user:delete', description: '' },
			{ name: 'information:read', description: '' },
			{ name: 'information:modify', description: '' },
			{ name: 'staff:read', description: '' },
			{ name: 'staff:modify', description: '' },
			{ name: 'material:write', description: '' },
			{ name: 'material:read', description: '' },
			{ name: 'material:delete', description: '' },
			{ name: 'material:modify', description: '' },
			{ name: 'department:read', description: '' },
			{ name: 'colaborator:write', description: '' },
			{ name: 'colaborator:read', description: '' },
			{ name: 'section:read', description: '' },
			{ name: 'user:create', description: '' },
		];

		await con.getRepository(Permission).save(swaggerPermissions);
		const sAdmin = await con.getRepository(Role).save({
			name: 'Super Admin',
			description: '',
			permissions: swaggerPermissions,
		});
		await con.getRepository(User).save({
			email: 'admin@localhost.io',
			name: 'Admin',
			lastName: '',
			password: await hashPassword('pass'),
			roles: [sAdmin],
		});
	})
	.then(() => {
		console.info('Load initial data done');
		connection.close();
	});
