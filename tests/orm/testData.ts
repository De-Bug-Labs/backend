import connection from '../../src/connect';
import { ExampleUser, Role, Section, Staff, Department, Permission, Material, Collaborator, Information, Calendar } from '../../src/orm/entities';

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
					mision:
						'GAAP CENTRO INTEGRAL DE APOYO GERIATRICO, IAP \nSomos una estancia de día para el Adulto y Adulto Mayor  ofreciendo servicios de ASISTENCIA SOCIAL, mediante el cuidado integral de la persona , buscando   un estado salud optimo, mejorar la calidad de vida, con una  atención de respeto y trato digno',
					instalation:
						'Contamos con áreas de atención  para personas de la tercera edad a través del servicio de Medicina General, Rehabilitación y Terapia Física, Atención Dental, Nutrición y Tanatología. De igual manera se cuenta con Talleres de Baile, Tejido, Taller Manejo de celulares, Terapia de la Memoria',
					team:
						'Contamos con un equipo de PROFESIONISTAS integrado por Médicos Generales, Médico en Rehabilitación, Terapeuta Físico, Odontólogo, Nutrióloga, Tanatóloga. \nContadores Públicos, Licenciada en Artes Escénicas, Licenciada en Comunicación. \n Jóvenes de Servicio Social y Voluntarios.',
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
		await con.getRepository(Calendar).save([
			{
				date: "2021-05-20",
				srcimg: "https://thumbs.dreamstime.com/b/backflip-beach-over-sunset-dubai-uae-backflip-beach-over-sunset-dubai-uae-editorial-183464357.jpg",
				description: "Como hacer backflips como un chad de 80+ años",
				address: "El mundo de los colchones",
				title: "Como hacer backflips"
			},
			{
				date: "2021-05-01",
				srcimg: "https://depor.com/resizer/oXiwyVaYXm2BaKFA7IVCzkQbkMQ=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HCUOQUJTQNBWJFL6YRXONIBQTA.jpg",
				description: "En este evento aprenderemos como defendernos de carnivoros salvajes como el cocodrilo de caracas ",
				address: "Wameru",
				title: "Defensa de cocodrilos"
			},
			{
				date: "2021-05-05",
				srcimg: "https://i2.wp.com/hipertextual.com/wp-content/uploads/2020/12/hipertextual-hacker-vacuna-covid-19-1.jpg?fit=2000%2C1126&ssl=1",
				description: "Clases de hackeo en html y css",
				address: "Los servidores de la CIA",
				title: "clases de Hackers"
			},
			{
				date: "2021-05-08",
				srcimg: "data:image/jpeg;base64,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",
				description: "gomichelas en tarro de minion para todos",
				address: "Las miches",
				title: "nnoche de micheladas de mango"
			},
			{
				date: "2021-05-02",
				srcimg: "https://m.media-amazon.com/images/I/515hAcQ2cNL.jpg",
				description: "Esneñale a tu perro fisica cuantica! y dale la oportunnidad de obtener su titulo en la UNAM",
				address: "La UNAM",
				title: "Fisica cuantica para Perros"
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
