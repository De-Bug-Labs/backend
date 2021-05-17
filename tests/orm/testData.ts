import connection from '../../src/connect';
import { ExampleUser, Role, Section, Staff, Department, Permission, Material, Collaborator, Information } from '../../src/orm/entities';

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
			.into(Information)
			.values([
				{
					mision: 'GAAP CENTRO INTEGRAL DE APOYO GERIATRICO, IAP \nSomos una estancia de día para el Adulto y Adulto Mayor  ofreciendo servicios de ASISTENCIA SOCIAL, mediante el cuidado integral de la persona , buscando   un estado salud optimo, mejorar la calidad de vida, con una  atención de respeto y trato digno',
					instalation:
						'Contamos con áreas de atención  para personas de la tercera edad a través del servicio de Medicina General, Rehabilitación y Terapia Física, Atención Dental, Nutrición y Tanatología. De igual manera se cuenta con Talleres de Baile, Tejido, Taller Manejo de celulares, Terapia de la Memoria',
					team: 'Contamos con un equipo de PROFESIONISTAS integrado por Médicos Generales, Médico en Rehabilitación, Terapeuta Físico, Odontólogo, Nutrióloga, Tanatóloga. \nContadores Públicos, Licenciada en Artes Escénicas, Licenciada en Comunicación. \n Jóvenes de Servicio Social y Voluntarios.',
				},
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
			.into(Permission)
			.values([
				{
					name: 'Crear Evento',
					description: 'Funcion que le permite al usuario crear y manejar un evento en el modulo del calendario',
				},
			])
			.execute();
		const Alberto = await con.getRepository(Staff).save({
			email: 'a01704584@itesm.mx',
			name: 'Alberto Matute',
		});
		const Eduardo = await con.getRepository(Staff).save({
			email: 'a01704641@itesm.mx',
			name: 'Eduardo Cadena',
		});
		const Bernardo = await con.getRepository(Staff).save({
			email: 'a01704320@itesm.mx',
			name: 'Bernardo Estrada',
		});
		const Emilio = await con.getRepository(Staff).save({
			email: 'a01704615@itesm.mx',
			name: 'Emilio Rivas',
		});
		const Nahim = await con.getRepository(Staff).save({
			email: 'a01700190@itesm.mx',
			name: 'Nahim Medellin',
		});
		await con.getRepository(Department).save([
			{
				name: 'Nutricion',
				description:
					'disciplina que, mediante el estudio de los alimentos y su impacto en nuestra salud, estipula la alimentación adecuada para cada caso',
				staff: [Alberto],
			},
			{
				name: 'Medicina',
				description:
					'disciplina integral que intenta mantener y recuperar la salud mediante el estudio, el diagnóstico y el tratamiento de la enfermedad o lesión del paciente',
				staff: [Eduardo],
			},
			{
				name: 'Dental',
				description:
					'disciplina integral que se encarga del diagnóstico, tratamiento y prevención de las enfermedades del aparato estomatognático, el cual incluye además de los dientes, las encías, el tejido periodontal, el maxilar superior, el maxilar inferior y la articulación temporomandibular',
				staff: [Emilio],
			},
			{
				name: 'Rehabilitacion',
				description:
					'disciplina integral que aborda todo lo relacionado con el conjunto de medidas sociales, educativas y profesionales destinadas a restituir al sujeto en situación de discapacidad la mayor capacidad e independencia posibles',
				staff: [Bernardo],
			},
			{
				name: 'Tanatologia',
				description: 'disciplina integral que aborda todo lo relacionado con el fenómeno de la muerte en el ser humano',
				staff: [Nahim],
			},
		]);
		await con
			.createQueryBuilder()
			.insert()
			.into(Material)
			.values([
				{ title: 'Raúl Morón Orozco ', link: 'https://www.youtube.com/watch?v=B1jWpIslHvo' },
				{ title: 'Ciudad inteligente', link: 'https://www.youtube.com/watch?v=cOsF6KOm3k0' },
				{ title: 'Marruecos', link: 'https://www.youtube.com/watch?v=zhWODS0MdIM' },
				{ title: 'El carbón', link: 'https://www.youtube.com/watch?v=-rJ6JbH3NXI' },
				{ title: 'Chernóbil', link: 'https://www.youtube.com/watch?v=3p4_-jtm_wI' },
				{ title: '¿Qué sabía el papa?', link: 'https://www.youtube.com/watch?v=L_IPezZSP-M' },
				{ title: 'DE ÉBOLA A COVID', link: 'https://www.youtube.com/watch?v=205LX8-v8xo' },
				{ title: '¡Que tengas suerte!', link: 'https://www.youtube.com/watch?v=O9QhY0ZPNos' },
				{ title: 'Documentales 2', link: 'https://www.youtube.com/watch?v=O6rU67_R-_4' },
				{ title: 'Barcos olvidados', link: 'https://www.youtube.com/watch?v=OPKY5UyW_NI' },
				{ title: 'El chocolate', link: 'https://www.youtube.com/watch?v=n9ApASqZ_Lo&t=1198s' },
				{ title: 'La vida de los ', link: 'https://www.youtube.com/watch?v=Uqb3nG4s4D8' },
				{ title: 'Transilvania', link: 'https://www.youtube.com/watch?v=LwVuCxvmY6U' },
				{ title: 'Los menonitas', link: 'https://www.youtube.com/watch?v=lMNibYOtWuI' },
				{ title: 'Chillhop Radio', link: 'https://www.youtube.com/watch?v=5yx6BWlEVcY' },
				{ title: 'old songs', link: 'https://www.youtube.com/watch?v=BrnDlRmW5hs&t=309s' },
				{ title: '竹内 まりや Plastic Love', link: 'https://youtu.be/3bNITQR4Uso' },
				{ title: 'Lofi Mexicano', link: 'https://www.youtube.com/watch?v=YIY_QkgRhSo' },
				{ title: 'Chale, no va pal centro', link: 'https://www.youtube.com/watch?v=dew0Mw-r5jE' },
				{ title: 'Ejercicios para adultos', link: 'https://www.youtube.com/watch?v=TXCp7SZKkUI' },
				{ title: 'Aspiradoras chidas', link: 'https://www.youtube.com/watch?v=d5WkAGSGAQg' },
				{ title: 'Matematicas ligeras', link: 'https://www.youtube.com/watch?v=5Es-wF5wCuU' },
				{ title: 'Explotara el mundo?', link: 'https://www.youtube.com/watch?v=XqKA87QQZHs' },
				{ title: 'Motos para la 3ra edad', link: 'https://youtu.be/DkPMj9iSB2Q' },
				{ title: 'Monos amarillos', link: 'https://youtu.be/LAD628sDvy0' },
				{ title: 'Musica clasica', link: 'https://www.youtube.com/watch?v=owOvCyg5ia0' },
				{ title: 'Cyber Chascarrillos', link: 'https://www.youtube.com/watch?v=pSDTmJtE-Bc' },
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
			{
				name: 'Dom Dimadon',
				description: 'Dueño del domo din de dimsdale',
				srcimg: 'img/test.jpg',
				institution: 'Dimsdale',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Empresarios',
					},
				}),
			},
			{
				name: 'Franz Lombardi',
				description: 'Faint next to me baby',
				srcimg: 'img/test.jpg',
				institution: 'Musica',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Profesionales',
					},
				}),
			},
			{
				name: 'Rodillera de bronze',
				description: 'Con su rodillera de bronze',
				srcimg: 'img/test.jpg',
				institution: 'Heroe',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Profesionales',
					},
				}),
			},
			{
				name: 'Reyna Elizabeth',
				description: 'Vive por siempre',
				srcimg: 'img/test.jpg',
				institution: 'Inglaterra',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Profesionales',
					},
				}),
			},
			{
				name: 'Paco Diaz',
				description: 'A pesar de su avanzada edad logra programar de una manera casi musical',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Sebastian Resendiz',
				description: 'Se la pasa chido y asegura realizar todas las actividades a la perfeccion',
				srcimg: 'img/test.jpg',
				institution: 'Cobac',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Eduardo Cadena',
				description: 'Un verdadero caballero un maestro dirian algunos en cuanto a las computadoras',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Adrian Torres',
				description: 'El la verdad no se la esta pasando bien pero aun asi va un dia a la vez',
				srcimg: 'img/test.jpg',
				institution: 'Cobac',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Buzz Lightyear',
				description: 'Guardian espacial, comando estelar no le contesta y destruyo su nave 4072 ',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Adrian Torres',
				description: 'El la verdad no se la esta pasando bien pero aun asi va un dia a la vez',
				srcimg: 'img/test.jpg',
				institution: 'UVM',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Alberto Matute',
				description: 'Un maestro de las bases de datos y el unico hombre digno de microsoft',
				srcimg: 'img/test.jpg',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
			{
				name: 'Paquita Barrio',
				description: 'tiene la prepa trunca y la esta terminando porque una rata de dos patas la reprobo',
				srcimg: 'img/test.jpg',
				institution: 'UVM',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
		]);
	})
	.then(() => {
		console.info('Load test data done');
		connection.close();
	});
