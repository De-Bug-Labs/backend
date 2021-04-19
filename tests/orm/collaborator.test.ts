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
	collaborator.description = 'TestCollaboratorDescription';
	collaborator.institution = 'TestCollaboratorInstitution';
	collaborator.name = 'TestCollaborator';
	collaborator.section = await getRepository(Section).findOneOrFail({
		where: {
			name: 'TestSectionName',
		},
	});
	collaborator.srcimg = 'img/test.jpg';
	const res = await getRepository(Collaborator).save(collaborator);
	const checkCollaborator = await getRepository(Collaborator).findOne({
		where: {
			idCollaborator: res.idCollaborator,
		},
	});
	expect(checkCollaborator).toMatchObject(collaborator);
});
