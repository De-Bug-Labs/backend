import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Department } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new collaborator', async () => {
	const department = new Department();
	department.description = 'Fisioterapia';
	department.name =
		'disciplina de la ciencia de la salud que ofrece un tratamiento terapéutico y de rehabilitación no farmacológica para diagnosticar, prevenir y tratar síntomas de múltiples dolencias, tanto agudas como crónicas, por medio de ejercicios terapéuticos y agentes físicos como la electricidad, ultrasonido, láser, calor, frío, agua, técnicas manuales como estiramientos, tracciones, masoterapia.';

	const res = await getRepository(Department).save(department);
	const checkDepartment = await getRepository(Department).findOne({
		where: {
			id: res.id,
		},
	});

	expect(checkDepartment).toMatchObject(department);
});
