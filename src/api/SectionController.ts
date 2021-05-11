import { getManager, Like } from 'typeorm';
import { Collaborator } from '../orm/entity/collaborator';
import { Section } from '../orm/entity/section';

const sectionRepo = getManager().getRepository(Section);

const collaboratorRepo = getManager().getRepository(Collaborator);

export const consultSections = async (req, res): Promise<void> => {
	try {
		const sections = await sectionRepo.find();
		res.status(200).json(sections);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};

export const consultSectionPage = async (req, res): Promise<void> => {
	try {
		const pageSize = req.swagger.params.pageSize.raw;
		const page = req.swagger.params.page.raw;
		const sectionId = req.swagger.params.id.raw;
		const name = req.swagger.params.name.raw;
		const collaborators = await collaboratorRepo.find({
			where: { section: sectionId ,name: Like(`${name}%`)}, 
			take: pageSize,
			skip: (page - 1) * pageSize,
			relations: ['section'],
		});
		if (collaborators.length) res.status(200).json(collaborators);
		else res.status(404).json({ message: 'index out of bound' });
	} catch (e) {
		res.status(400).json(e);
	}
};

export const consultSectionPagination = async (req, res): Promise<void> => {
	try {
		const sectionId = req.swagger.params.id.raw;
		const pageSize = req.swagger.params.pageSize.raw;
		const sectionCount = await collaboratorRepo.count({ where: { section: sectionId }, relations: ['section'] });
		res.status(200).json({
			sectionId: sectionId,
			sectionCount: sectionCount,
			sectionPages: sectionCount / pageSize,
		});
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};


export const consultSectionPageName = async (req, res): Promise<void> => {
	try {
		
		const sectionId = req.swagger.params.id.raw;
		const name = req.swagger.params.name.raw;
		
		const collaborators = await collaboratorRepo.find({
			where: { section: sectionId,name: Like(`${name}%`)},
			
			relations: ['section'],
		});
		console.info(collaborators);
		if (collaborators.length) res.status(200).json(collaborators);
		else res.status(404).json({ message: 'index out of bound' });
	} catch (e) {
		res.status(400).json(e);
	}
};


