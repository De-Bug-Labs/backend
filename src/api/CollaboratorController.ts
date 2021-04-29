import { getManager } from 'typeorm';
import { Collaborator } from '../orm/entity/collaborator';

const collaboratorRepo = getManager().getRepository(Collaborator);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createCollaborator = async (req, res): Promise<void> => {
	try {
		let collaborator = new Collaborator();
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
		const page = req.swagger.params.page.raw;
		const pageSize = req.swagger.params.pageSize.raw;
        const sectionId = req.swagger.params.sectionId.raw;
		const collaborators = await collaboratorRepo.findByIds(sectionId,{take:pageSize,skip:(page-1)* pageSize});
		if(collaborators.length)
			res.status(200).json(collaborators);
		else
			res.status(404).json({message: 'index out of bound'});
	} catch (e) {
		res.status(400).json(e);
	}
};

export const searchCollaborator = async (req, res): Promise<void> => {
	try {
        const collaboratorId = req.swagger.params.Id.raw;
		const collaborators = await collaboratorRepo.findOneOrFail(collaboratorId);
		res.status(200).json(collaborators);
	} catch (e) {
		res.status(400).json(e);
	}
};

export const consultCollaboratorPages = async (req, res): Promise<void> => {
	try {
		const pageSize = req.swagger.params.pageSize.raw;
        const sectionId = req.swagger.params.sectionId.raw;
		const collaborators = await collaboratorRepo.count(sectionId);
		res.status(200).json({
			pageSize: pageSize,
			collaboratorsCount: collaborators,
			pageCount: Math.ceil(collaborators / pageSize),
		});
	} catch (e) {
		res.status(400).json(e);
	}
};

