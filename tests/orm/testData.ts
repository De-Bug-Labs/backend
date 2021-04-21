import connection from '../../src/connect';
import { ExampleUser, Role, Section, Staff, Department, Permission } from '../../src/orm/entities';

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
			.values([{ name: 'TestRol', description: 'TestRolDescription' }])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Section)
			.values([{ name: 'TestSectionName' }])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Staff)
			.values([{ email: 'test@test.com' }])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Department)
			.values([{ name: 'nutricion', description: 'Descripcion de nutricion' }])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Permission)
			.values([{ name: 'TestPermission', description: 'Test Permission' }])
			.execute();
	})
	.then(() => {
		console.info('Load test data done');
		connection.close();
	});
