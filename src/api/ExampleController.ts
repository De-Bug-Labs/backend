import { getManager } from 'typeorm';
import { ExampleUser } from '../orm/entities';

const exampleRepo = getManager().getRepository(ExampleUser);


//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createExampleUser = async (req, res): Promise<void> => {
	try {
		let usr = new ExampleUser();
		usr = req.swagger.params.exampleUser.raw;

		const insert = await exampleRepo.save(usr);
		res.status(201).json(insert);
	}
	catch (e) { res.status(400).json(e)}
}

export const readExampleUser = async (req, res): Promise<void> => {
	try {
		const usr = await exampleRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(usr);
	}
	catch (e) { res.status(404).json(e) }
};

export const updateExampleUser = async (req, res): Promise<void> => {
	try {
		await exampleRepo.update(
			req.swagger.params.id.raw,
			req.swagger.params.exampleUser.raw
		);
		const usr = await exampleRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(usr);
	} catch (e) {
		res.status(404).json(e)
	}
}

export const deleteExampleUser = async (req, res): Promise<void> => {
	try {
		const usr = await exampleRepo.findOneOrFail(req.swagger.params.id.raw);
		await exampleRepo.delete(req.swagger.params.id.raw);
		res.status(200).json(usr);
	} catch (e) {
		res.status(410).json(e)
	}
}