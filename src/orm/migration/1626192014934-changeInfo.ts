import { MigrationInterface, QueryRunner } from 'typeorm';
import { Information } from '../entities';

export class changeInfo1626192014934 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;
		const id = await (await con.getRepository(Information).findOneOrFail()).id;

		const team =
			'Contamos con un equipo de profesionistas integrado por médicos generales, odontólogos, nutriólogos, tanatólogos, rehabilitación y terapia física. Además contamos con talleres de baile, tejido, terapia de la memoria, manejo de celulares entre otros.';
		const instalation =
			'Contamos con áreas de atención para personas de la tercera edad a través del servicio de medicina general, atención dental, nutrición, tanatología, rehabilitación y terapia física. De igual manera se cuenta con talleres de baile, tejido, manejo de celulares y terapia de la memoria.';
		const mision = `GAAP CENTRO INTEGRAL DE APOYO GERIATRICO, IAP 
Somos una estancia de día para el Adulto y Adulto Mayor ofreciendo servicios de ASISTENCIA SOCIAL, mediante el cuidado integral de la persona, buscando un estado salud optimo, mejorar la calidad de vida, con una atención de respeto y trato digno`;

		await con.getRepository(Information).update(id, {
			team: team,
			instalation: instalation,
			mision: mision,
		});
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;

		const id = await (await con.getRepository(Information).findOneOrFail()).id;

		const team = `Contamos con un equipo de PROFESIONISTAS integrado por Médicos Generales, Médico en Rehabilitación, Terapeuta Físico, Odontólogo, Nutrióloga, Tanatóloga. 
Contadores Públicos, Licenciada en Artes Escénicas, Licenciada en Comunicación. 
 Jóvenes de Servicio Social y Voluntarios.`;
		const instalation =
			'Contamos con áreas de atención para personas de la tercera edad a través del servicio de Medicina General, Rehabilitación y Terapia Física, Atención Dental, Nutrición y Tanatología. De igual manera se cuenta con Talleres de Baile, Tejido, Taller Manejo de celulares, Terapia de la Memoria';
		const mision = `GAAP CENTRO INTEGRAL DE APOYO GERIATRICO, IAP 
Somos una estancia de día para el Adulto y Adulto Mayor  ofreciendo servicios de ASISTENCIA SOCIAL, mediante el cuidado integral de la persona , buscando   un estado salud optimo, mejorar la calidad de vida, con una  atención de respeto y trato digno`;

		await con.getRepository(Information).update(id, {
			team: team,
			instalation: instalation,
			mision: mision,
		});
	}
}
