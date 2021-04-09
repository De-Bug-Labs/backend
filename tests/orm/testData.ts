import connection from '../../src/connect';
import { ExampleUser } from '../../src/orm/entities';

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
	})
	.then(() => connection.close());
