import connection from '../connect';
import { 
	ExampleUser,
	Role,
	Section,
	Staff,
	Department,
	Permission,
	Material,
	Collaborator,
	Information,
	Calendar,
	View,
	User
 } from './entities';
import { hashPassword } from '../api/UserController';

connection
	.create()
	.then(async (con) => {
		// Add data inserts here
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
		const swaggerPermissions = [
			{ name: 'test:read', description: '' },
			{ name: 'test:write', description: '' },
			{ name: 'test:delete', description: '' },

			{ name: 'mail:write', description: '' },

			{ name: 'staff:write', description: '' },
			{ name: 'staff:read', description: '' },
			{ name: 'staff:delete', description: '' },
			{ name: 'staff:modify', description: '' },

			{ name: 'user:delete', description: '' },
			{ name: 'user:create', description: '' },
			{ name: 'user:getAll', description: '' },
			{ name: 'user:getMail', description: '' },
			{ name: 'user:delete', description: '' },
			
			{ name: 'information:read', description: '' },
			{ name: 'information:modify', description: '' },
			
			
			{ name: 'material:write', description: '' },
			{ name: 'material:read', description: '' },
			{ name: 'material:delete', description: '' },
			{ name: 'material:modify', description: '' },

			{ name: 'department:read', description: '' },

			{ name: 'collaborator:write', description: '' },
			{ name: 'collaborator:read', description: '' },
			{ name: 'collaborator:modify', description: '' },
			{ name: 'collaborator:delete', description: '' },

			{ name: 'section:read', description: '' },
		
			{ name: 'calendar:read', description: '' },
			{ name: 'calendar:write', description: '' },
			{ name: 'calendar:delete', description: '' },
			{ name: 'calendar:modify', description: '' },

			{ name: 'view:read', description: '' },
			{ name: 'view:modify', description: '' },

			{ name: 'login', description: '' },
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
					date: '2021-05-20',
					srcimg: 'http://www.karlosperu.com/wp-content/uploads/2017/11/LG-cuenta-con-aplicaci%C3%B3n-para-usar-el-celular-como-control-remoto.jpg',
					description: 'Cómo usar las funciones básicas del celular,aprender a hacer llamadas mandas mensajes por whatsapp',
					address: 'Santiago del Río 32, Jardines de Villas de Santiago, 76140 Santiago de Querétaro, Qro.',
					title: 'Funciones básicas del celular',
				},
				{
					date: '2021-05-01',
					srcimg: 'https://es.validasinbarreras.com/img-article-950-533/yoga-para-ancianos-abuelos-beneficios-ejercicios-salud-actividades.jpg',
					description: 'Varios ejercicios de yoga desde tu casa sin necesidad de ningun aparato',
					address: 'Santiago del Río 32, Jardines de Villas de Santiago, 76140 Santiago de Querétaro, Qro.',
					title: 'Haz yoga desde tu casa',
				},
				{
					date: '2021-05-05',
					srcimg: 'https://www.educaciontrespuntocero.com/wp-content/uploads/2020/03/280647.jpg',
					description: 'Clases de ingles básico para adultos mayores',
					address: 'Santiago del Río 32, Jardines de Villas de Santiago, 76140 Santiago de Querétaro, Qro.',
					title: 'clases de Ingles',
				},
				{
					date: '2021-05-08',
					srcimg: 'https://www.tecnologia-informatica.com/wp-content/uploads/2018/08/caracteristicas-de-las-computadoras.jpg',
					description: 'Aprende usar la computadora y sus funciones, enviar correo y buscar por internet',
					address: 'Santiago del Río 32, Jardines de Villas de Santiago, 76140 Santiago de Querétaro, Qro.',
					title: '¿Cómo usar la computadora?',
				}
			]);
			await con
			.createQueryBuilder()
			.insert()
			.into(Material)
			.values([
				{ title: 'Yoga Para Adultos Mayores Y Principiantes.', link: 'https://www.youtube.com/watch?v=20Xwv2zSIhc' },
				{ title: 'Cómo pintar con acrílicos. Clase de pintura.', link: 'https://www.youtube.com/watch?v=qqw_tMvniSc' },
				{ title: 'Curso de ingles desde el inicio COMPLETO Y GRATIS para PRINCIPIANTES hasta AVANZADO', link: 'https://www.youtube.com/watch?v=99FY4YcOUPE' },
				{ title: 'Relajación guiada', link: 'https://www.youtube.com/watch?v=DQnkAUYT_-k' },
				{ title: 'Meditación para principiantes', link: 'https://www.youtube.com/watch?v=3oCC4NDgYrY' },
				{ title: 'Clases de canto parte 1', link: 'https://www.youtube.com/watch?v=UVUwP8AqD1g' },
				{ title: 'Clases de canto parte 2', link: 'https://www.youtube.com/watch?v=4j_I4ECbJHU' },
				{ title: 'Clases de canto parte 3', link: 'https://www.youtube.com/watch?v=3gmFx34Izp4' },
				{ title: 'Alta Presión Sanguínea', link: 'https://www.youtube.com/watch?v=DzK_VBkA3N4' },
				{ title: 'La mejor receta del pastel de 3 leches', link: 'https://www.youtube.com/watch?v=AYbNXNKIEMs' },
				{ title: 'Las 8 ensaladas mas famosas del mundo', link: 'https://www.youtube.com/watch?v=JT-waJaWROg' },
			])
			.execute();
			await con.getRepository(Section).save([{ name: 'Estudiantes' }, { name: 'Profesionales' }, { name: 'Empresarios' }]);
			await con.getRepository(View).save([{ name: 'Portal view',status:true}]);
			await con.getRepository(Collaborator).save([
				{
					name: 'Emilio Rivas',
					description:
						'Creador de la pagina web de GAAP',
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
					description: 'Creador de la pagina web de GAAP',
					srcimg: '',
					institution: 'Tecnologico de Monterrey',
					section: await con.getRepository(Section).findOneOrFail({
						where: {
							name: 'Estudiantes',
						},
					}),
				},
				{
					name: 'Alberto Matute',
					description: 'Creador de la pagina web de GAAP',
					srcimg: '',
					institution: 'Mexico',
					section: await con.getRepository(Section).findOneOrFail({
						where: {
							name: 'Estudiantes',
						},
					}),
				},
				
				
				{
					name: 'Eduardo Cadena',
					description: 'Creador de la pagina web de GAAP',
					srcimg: '',
					institution: 'Tecnologico de Monterrey',
					section: await con.getRepository(Section).findOneOrFail({
						where: {
							name: 'Estudiantes',
						},
					}),
				},
				
				{
					name: 'Nahima Medellin',
					description: 'Creador de la pagina web de GAAP',
					srcimg: '',
					institution: 'Tecnologico de Monterrey',
					section: await con.getRepository(Section).findOneOrFail({
						where: {
							name: 'Estudiantes',
						},
					}),
				},
				
			]);
	})
	.then(() => {
		console.info('Load initial data done');
		connection.close();
	});
