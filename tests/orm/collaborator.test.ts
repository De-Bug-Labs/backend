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
	collaborator.description='estudiante isc';
    collaborator.institution='tec';
    collaborator.name='nerbie tamute';
    collaborator.section=await getRepository(Section).findOneOrFail({
		where: {
			name:'Estudiantes',
		},
	});
    collaborator.srcimg= 'img/hola.jpg';
	const res = await getRepository(Collaborator).save(collaborator);
	const checkCollaborator = await getRepository(Collaborator).findOne({
		where: {
			id_collaborator: res.id_collaborator,
		},
	});
	expect(checkCollaborator).toMatchObject(collaborator);
});
