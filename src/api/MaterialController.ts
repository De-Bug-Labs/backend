import { getManager } from 'typeorm';
import { Material } from '../orm/entities';

const materialRepo = getManager().getRepository(Material);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createMaterial = async (req, res): Promise<void> => {
	try {
		let material = new Material();
		material = req.swagger.params.material.raw;
		const insert = await materialRepo.save(material);
		res.status(201).json(insert);
	} catch (e) {
		res.status(400).json(e);
	}
};

export const deleteMaterial = async (req, res): Promise<void> => {
	try {
		const material = await materialRepo.findOneOrFail(req.swagger.params.id.raw);
		await materialRepo.delete(req.swagger.params.id.raw);
		res.status(200).json(material);
	} catch (e) {
		res.status(410).json(e);
	}
};

export const updateMaterial = async (req, res): Promise<void> => {
	try {
		await materialRepo.update(req.swagger.params.id.raw, req.swagger.params.material.raw);
		const material = await materialRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(material);
	} catch (e) {
		res.status(404).json(e);
	}
};

export const readMaterial= async (req, res): Promise<void> => {
	try {
		const material = await materialRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(material);
	} catch (e) {
		res.status(404).json(e);
	}
};
