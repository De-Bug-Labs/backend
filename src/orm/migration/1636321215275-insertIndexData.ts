import { MigrationInterface, QueryRunner } from 'typeorm';
import { Information } from '../entities';

export class insertIndexData1636321215275 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;
		const id = await (await con.getRepository(Information).findOneOrFail()).id;

		await con.getRepository(Information).update(id, {
			indexText:
				'Somos una estancia de día para el Adulto y Adulto Mayor ofreciendo servicios de ASISTENCIA SOCIAL, mediante el cuidado integral de la persona, buscando un estado de salud optima y una mejora en la calidad de vida, con una atención de respeto y trato digno. Estamos ubicados en SANTIAGO DEL RIO No. 32 COL. JARDINES DE SANTIAGO, C.P.76148, QUERETARO,QRO.',
		});
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const con = queryRunner.connection;
		const id = await (await con.getRepository(Information).findOneOrFail()).id;

		await con.getRepository(Information).update(id, {
			indexText: '',
		});
	}
}
