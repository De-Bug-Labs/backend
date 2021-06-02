import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../../api/UserController';
import { Collaborator, Department, Information, Permission, Role, Section, User, View } from '../entities';

export class InitialRBAC1622574514121 implements MigrationInterface {
	name = 'InitialRBAC1622574514121';
	//permisos de swagger
	swaggerPerms = [
		{ name: 'test:read', description: '' },
		{ name: 'test:write', description: '' },
		{ name: 'test:delete', description: '' },
		{ name: 'mail:write', description: '' },
		{ name: 'staff:write', description: '' },
		{ name: 'staff:read', description: '' },
		{ name: 'staff:delete', description: '' },
		{ name: 'staff:modify', description: '' },
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
		{ name: 'adminPortal:access', description: '' },
		{ name: 'login', description: '' },
	];

	public async up(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;
		const swaggerPermissions = [...this.swaggerPerms];

		// Add data inserts here
		await con.getRepository(Permission).save(swaggerPermissions);
		//permisos de admin
		const adminPermissions = swaggerPermissions.filter((p) => p.name !== 'login');
		//permisos de guest
		const guestPermissionsTxt = [
			'mail:write',
			'staff:read',
			'user:getMail',
			'information:read',
			'material:read',
			'department:read',
			'collaborator:read',
			'section:read',
			'calendar:read',
			'view:read',
			'login',
		];
		const guestPermissions = swaggerPermissions.filter((p) => guestPermissionsTxt.indexOf(p.name) !== -1);
		//agregar rol de guest
		await con.getRepository(Role).save({
			name: 'guest',
			description: '',
			permissions: guestPermissions,
		});
		//agregar rol de administrador
		const sAdmin = await con.getRepository(Role).save({
			name: 'Super Admin',
			description: '',
			permissions: adminPermissions,
		});
		//agregar usuario con el rol de administrador
		await con.getRepository(User).save({
			email: 'postregistergaap@gmail.com',
			name: 'Admin',
			lastName: '',
			password: await hashPassword('d3@BUG@l4bs'),
			roles: [sAdmin],
		});
		//agregar informacion de gaap

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
		//agregar departamentos
		await con.getRepository(Department).save([
			{
				name: 'Nutricion',
				description:
					'disciplina que, mediante el estudio de los alimentos y su impacto en nuestra salud, estipula la alimentación adecuada para cada caso',
				staff: [],
			},
			{
				name: 'Medicina',
				description:
					'disciplina integral que intenta mantener y recuperar la salud mediante el estudio, el diagnóstico y el tratamiento de la enfermedad o lesión del paciente',
				staff: [],
			},
			{
				name: 'Dental',
				description:
					'disciplina integral que se encarga del diagnóstico, tratamiento y prevención de las enfermedades del aparato estomatognático, el cual incluye además de los dientes, las encías, el tejido periodontal, el maxilar superior, el maxilar inferior y la articulación temporomandibular',
				staff: [],
			},
			{
				name: 'Rehabilitacion',
				description:
					'disciplina integral que aborda todo lo relacionado con el conjunto de medidas sociales, educativas y profesionales destinadas a restituir al sujeto en situación de discapacidad la mayor capacidad e independencia posibles',
				staff: [],
			},
			{
				name: 'Tanatologia',
				description: 'disciplina integral que aborda todo lo relacionado con el fenómeno de la muerte en el ser humano',
				staff: [],
			},
		]);
		//agregar secciones  la de estudiantes, profesionales y empresarios
		await con.getRepository(Section).save([{ name: 'Estudiantes' }, { name: 'Profesionales' }, { name: 'Empresarios' }]);
		//agregar vista del portal
		await con.getRepository(View).save([{ name: 'Portal view', status: true }]);
		//agregar colaboradores
		await con.getRepository(Collaborator).save([
			{
				name: 'Emilio Rivas',
				description: 'Creador de la pagina web de GAAP',
				srcimg: 'https://drive.google.com/uc?id=18-1GV7C_KSsyvIGh5Si6DXq6sxqvbyq_&export=download',
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
				srcimg: 'https://drive.google.com/uc?id=16dsQfMEpPsgM2PoRdHPZVGaCbv1OjVeZ&export=download',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},

			{
				name: 'Nahim Medellin',
				description: 'Creador de la pagina web de GAAP',
				srcimg: 'https://drive.google.com/uc?id=1JMrqqdKi7kqeR7h4J3n24vdAssAuCtnU&export=download',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},

			{
				name: 'Eduardo Cadena',
				description: 'Creador de la pagina web de GAAP',
				srcimg: 'https://drive.google.com/uc?id=1S4lom0K6Na8DD88OiJ2I5LN3ii_DdYXE&export=download',
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
				srcimg: 'https://drive.google.com/uc?id=1FpoaxDj-e4MoYJwPu6FFhemP-QBa3jk4&export=download',
				institution: 'Tecnologico de Monterrey',
				section: await con.getRepository(Section).findOneOrFail({
					where: {
						name: 'Estudiantes',
					},
				}),
			},
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;
		const swaggerPermissions = [...this.swaggerPerms].map((p) => p.name);

		await con.getRepository(Collaborator).delete({ description: 'Creador de la pagina web de GAAP' });

		await con.getRepository(View).delete({ name: 'Portal view' });
		await con.getRepository(Section).delete({ name: In(['Estudiantes', 'Profesionales', 'Empresarios']) });
		await con.getRepository(Department).delete({ name: In(['Nutricion', 'Medicina', 'Dental', 'Rehabilitacion', 'Tanatologia']) });
		await queryRunner.query('TRUNCATE TABLE "information" CASCADE');
		await con.getRepository(User).delete({ email: 'postregistergaap@gmail.com' });
		await con.getRepository(Role).delete({ name: 'Super Admin' });
		await con.getRepository(Role).delete({ name: 'guest' });

		await con.getRepository(Permission).delete({ name: In(swaggerPermissions) });
	}
}
