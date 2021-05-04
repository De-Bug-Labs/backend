import { getManager } from 'typeorm';
import { Collaborator } from '../orm/entity/collaborator';

const collaboratorRepo = getManager().getRepository(Collaborator);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createCollaborator = async (req, res): Promise<void> => {
	try {
		const collaborator = new Collaborator();
		collaborator.name = req.swagger.params.collaborator.raw.name;
		collaborator.description = req.swagger.params.collaborator.raw.description;
		collaborator.srcimg = req.swagger.params.collaborator.raw.srcimg;
		collaborator.institution = req.swagger.params.collaborator.raw.institution;
		collaborator.section = req.swagger.params.collaborator.raw.sectionId;
		const insert = await collaboratorRepo.save(collaborator);
		res.status(200).json(insert);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};

export const consultCollaborator = async (req, res): Promise<void> => {
	try {
		const collaboratorId = req.swagger.params.id.raw;
		const collaborator = await collaboratorRepo.findOneOrFail(collaboratorId);
		res.status(200).json(collaborator);
	} catch (e) {
		res.status(400).json(e);
	}
};
export const consultCollaboratorPage = async (req, res): Promise<void> => {
	try {
		const sectionId = req.swagger.params.id.raw;
		const page = req.swagger.params.page.raw;
		const pageSize = req.swagger.params.pageSize.raw;
		const collaborators = await collaboratorRepo.findByIds(sectionId, { take: pageSize, skip: (page - 1) * pageSize });
		if (collaborators.length) res.status(200).json(collaborators);
		else res.status(404).json({ message: 'index out of bound' });
	} catch (e) {
		res.status(400).json(e);
	}
};
