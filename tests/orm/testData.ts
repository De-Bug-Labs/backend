import connection from '../../src/connect';
import { ExampleUser, Rol, Section, Staff, Department } from '../../src/orm/entities';

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
			.into(Rol)
			.values([{ name: 'TestRol', description: 'TestRolDescription' }])
			.into(Section)
			.values([{ name: 'TestSectionName' }])
			.into(Staff)
			.values([{ email: 'test@test.com' }])
			.into(Department)
			.values([{ name: 'nutricion', description: 'Descripcion de nutricion' }])
			.into(Department)
			.values([{ name: 'nutricion', description: 'Descripcion de nutricion' }])
			.execute();
	})
	.then(() => connection.close());
