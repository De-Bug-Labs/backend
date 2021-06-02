import connection from '../../src/connect';
import { ExampleUser, Section, Staff, Material, Collaborator, Calendar } from '../../src/orm/entities';

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

		await con.getRepository(Staff).save({
			email: 'a01704584@itesm.mx',
			name: 'Alberto Matute',
			departments: await con.getRepository(Section).find({
				where: { name: 'Nutricion' },
			}),
		});
		await con.getRepository(Staff).save({
			email: 'a01704641@itesm.mx',
			name: 'Eduardo Cadena',
			departments: await con.getRepository(Section).find({
				where: { name: 'Medicina' },
			}),
		});
		await con.getRepository(Staff).save({
			email: 'a01704320@itesm.mx',
			name: 'Bernardo Estrada',
			departments: await con.getRepository(Section).find({
				where: { name: 'Dental' },
			}),
		});
		await con.getRepository(Staff).save({
			email: 'a01704615@itesm.mx',
			name: 'Emilio Rivas',
			departments: await con.getRepository(Section).find({
				where: { name: 'Rehabilitacion' },
			}),
		});
		await con.getRepository(Staff).save({
			email: 'a01700190@itesm.mx',
			name: 'Nahim Medellin',
			departments: await con.getRepository(Section).find({
				where: { name: 'Tanatologia' },
			}),
		});

		await con.getRepository(Calendar).save([
			{
				date: '2021-05-20',
				srcimg: 'https://thumbs.dreamstime.com/b/backflip-beach-over-sunset-dubai-uae-backflip-beach-over-sunset-dubai-uae-editorial-183464357.jpg',
				description: 'Como hacer backflips como un chad de 80+ años',
				address: 'El mundo de los colchones',
				title: 'Como hacer backflips',
			},
			{
				date: '2021-05-01',
				srcimg: 'https://depor.com/resizer/oXiwyVaYXm2BaKFA7IVCzkQbkMQ=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HCUOQUJTQNBWJFL6YRXONIBQTA.jpg',
				description: 'En este evento aprenderemos como defendernos de carnivoros salvajes como el cocodrilo de caracas ',
				address: 'Wameru',
				title: 'Defensa de cocodrilos',
			},
			{
				date: '2021-05-05',
				srcimg: 'https://i2.wp.com/hipertextual.com/wp-content/uploads/2020/12/hipertextual-hacker-vacuna-covid-19-1.jpg?fit=2000%2C1126&ssl=1',
				description: 'Clases de hackeo en html y css',
				address: 'Los servidores de la CIA',
				title: 'clases de Hackers',
			},
			{
				date: '2021-05-08',
				srcimg: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F8F9626F-21DB-486E-A63F-634DFB12C300/Derivates/d6cfcad9-aec0-4454-82f8-e7f4e8004c40.jpg',
				description: 'gomichelas en tarro de minion para todos',
				address: 'Las miches',
				title: 'nnoche de micheladas de mango',
			},
			{
				date: '2021-05-02',
				srcimg: 'https://m.media-amazon.com/images/I/515hAcQ2cNL.jpg',
				description: 'Enseñale a tu perro fisica cuantica! y dale la oportunnidad de obtener su titulo en la UNAM',
				address: 'La UNAM',
				title: 'Fisica cuantica para Perros',
			},
			{
				date: '2021-06-02',
				srcimg: 'https://metalpordetras.com/wp-content/uploads/policia-precinta-moshpit.jpg',
				description:
					'La banda de metal RAMSTEIN ofrecera el primer mosh pit de metal para la tercera edad asi que preparate para la diversion',
				address: 'Estadio Corregidora',
				title: 'Mosh pit',
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

		await con.getRepository(Collaborator).save([
			{
				name: 'Emilio Rivas',
				description:
					'Una persona que trabajaba demasiado y aun asi se quejaba de todo lo que habia que haccerse, verdaderamente un heroe mexicano',
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
				srcimg: 'https://lh3.googleusercontent.com/pw/ACtC-3dn6LnsDsEWCjcI99RYTdjDPeQ4RtxReyWnWbJHMJjoRDvUx453auU22kLVbYP2dx91tVGJY8VHuS6_p3ibGD0KTaPH3VuC_gZ117fy2MlnMteeizzBP5EvG2quO2d3YqbHpMYcX6YFdJvYsK02YhrE=s1007-no?authuser=0',
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
