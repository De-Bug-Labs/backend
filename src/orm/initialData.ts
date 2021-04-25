import connection from '../connect';
import { ExampleUser } from './entities';
import { Role } from './entities';

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
	})
	.then(() => {
		console.info('Load initial data done');
		connection.close();
	});
