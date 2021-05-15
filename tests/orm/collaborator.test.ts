import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Collaborator, Section } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new collaborator', async () => {
	const collaborator = new Collaborator();
	collaborator.description = 'Bromneas?, es un papusho, su rostro parece tallado por los mismos angeles';
	collaborator.institution = 'Tecnologico de Monterrey';
	collaborator.name = 'Alberto Matute';
	collaborator.section = await getRepository(Section).findOneOrFail({
		where: {
			name: 'Estudiantes',
		},
	});
	collaborator.srcimg = 'img/test.jpg';
	const res = await getRepository(Collaborator).save(collaborator);
	const checkCollaborator = await getRepository(Collaborator).findOne({
		relations: ['section'],
		where: {
			id: res.id,
		},
	});

	expect(checkCollaborator).toMatchObject(collaborator);
});
