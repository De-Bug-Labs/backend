import connection from '../../src/connect';
import { ExampleUser, Role, Section, Staff, Department, Permission, Material } from '../../src/orm/entities';

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
			.values([{ name: 'testStaff', email: 'test@test.com' }])
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
		const staffUsr = await con.getRepository(Staff).save({
			email: 'hola@test.com',
			name: 'holaStaff',
		});
		await con.getRepository(Department).save({
			name: 'Tanatologia',
			description: 'Descripcion de Tanatologia',
			staff: [staffUsr],
		});
		await con
			.createQueryBuilder()
			.insert()
			.into(Material)
			.values([
				{ title: 'Raúl Morón Orozco ', link: 'https://www.youtube.com/watch?v=B1jWpIslHvo' },
				{ title: 'Ciudad inteligente', link: 'https://www.youtube.com/watch?v=cOsF6KOm3k0' },
				{ title: 'Marruecos ', link: 'https://www.youtube.com/watch?v=zhWODS0MdIM' },
				{ title: 'El carbón ', link: 'https://www.youtube.com/watch?v=-rJ6JbH3NXI' },
				{ title: 'Chernóbil', link: 'https://www.youtube.com/watch?v=3p4_-jtm_wI' },
				{ title: '¿Qué sabía el papa', link: 'https://www.youtube.com/watch?v=L_IPezZSP-M' },
				{ title: 'DE ÉBOLA A COVID-', link: 'https://www.youtube.com/watch?v=205LX8-v8xo' },
				{ title: '¡Que tengas suerte!', link: 'https://www.youtube.com/watch?v=O9QhY0ZPNos' },
				{ title: ' y documentales 2', link: 'https://www.youtube.com/watch?v=O6rU67_R-_4' },
				{ title: 'Barcos olvidad', link: 'https://www.youtube.com/watch?v=OPKY5UyW_NI' },
				{ title: 'El chocolate -', link: 'https://www.youtube.com/watch?v=n9ApASqZ_Lo&t=1198s' },
				{ title: 'La vida de los ', link: 'https://www.youtube.com/watch?v=Uqb3nG4s4D8' },
				{ title: 'Transilvania: en', link: 'https://www.youtube.com/watch?v=LwVuCxvmY6U' },
				{ title: 'Los menonitas ', link: 'https://www.youtube.com/watch?v=lMNibYOtWuI' },
				{ title: 'Chillhop Radio -', link: 'https://www.youtube.com/watch?v=5yx6BWlEVcY' },
				{ title: 'old songs ', link: 'https://www.youtube.com/watch?v=BrnDlRmW5hs&t=309s' },
			])
			.execute();
	})
	.then(() => {
		console.info('Load test data done');
		connection.close();
	});
