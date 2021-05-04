import connection from '../../src/connect';
import { ExampleUser, Role, Section, Staff, Department, Permission, Material, Collaborator } from '../../src/orm/entities';

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
			.values([
				{
					name: 'Administrador',
					description:
						'Usuario con alto nivel de permisos, capaz de manejar el sistema desde el subdominio administrativo, cuenta con credenciales necesarias para ingresar al sistema',
				},
			])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Staff)
			.values([{ name: 'Rodolfo Neri Vela', email: 'vela@nasa.com' }])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Department)
			.values([
				{
					name: 'Nutricion',
					description:
						'disciplina que se ocupa de la prevención, diagnóstico y tratamiento de los cambios nutricionales y metabólicos relacionados con enfermedades agudas o crónicas y con condiciones causadas por un exceso o falta de energía',
				},
			])
			.execute();
		await con
			.createQueryBuilder()
			.insert()
			.into(Permission)
			.values([
				{
					name: 'Crear Evento',
					description: 'Funcion que le permite al usuario crear y manejar un evento en el modulo del calendario',
				},
			])
			.execute();
		const staffUsr = await con.getRepository(Staff).save({
			email: 'jisus3000@gmail.com',
			name: 'Jesus Cristo',
		});
		await con.getRepository(Department).save({
			name: 'Tanatologia',
			description: 'disciplina integral que aborda todo lo relacionado con el fenómeno de la muerte en el ser humano',
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
		await con.getRepository(Section).save([{ name: 'Estudiantes' }, { name: 'Profesionales' }, { name: 'Empresarios' }]);

		await con.getRepository(Collaborator).save([
			{
				name: 'Emilio Rivas',
				description:
					'Una persona que trabajaba demasiado y aun asi se quejaba de todo lo que habia que haccerse, verdaderamente un heroe mexicano',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Bernardo Estrada',
				description: 'Una persona que sabia todo y al mismo tiempo no sabia nada, un ejemplo a seguir',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Mutate Tatume',
				description: 'tutametatumemutate',
				srcimg: 'img/test.jpg',
				institution: 'Mexico',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Empresarios',
					},
				}),
			},
			{
				name: 'Luis Carranza',
				description: 'Heroe del ambito de sistemas mobiles',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Profesionales',
					},
				}),
			},
			{
				name: 'Luis Corral',
				description: 'heroe del ambito de sistemas mobiles pero chad',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Profesionales',
					},
				}),
			},
			{
				name: 'Rutarde Tuntante',
				description: 'nadie sabe que hizo pero algo hizo',
				srcimg: 'img/test.jpg',
				institution: 'UNAM',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Empresarios',
					},
				}),
			},
		]);
	})
	.then(() => {
		console.info('Load test data done');
		connection.close();
	});
