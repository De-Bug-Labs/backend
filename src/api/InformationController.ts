import { getManager } from 'typeorm';
import { Information } from '../orm/entities';

const informationRepo = getManager().getRepository(Information);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const readInformation = async (req, res): Promise<void> => {
	try {
		const information = await informationRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(information);
	} catch (e) {
		res.status(404).json(e);
	}
};

export const updateInformation = async (req, res): Promise<void> => {
	try {
		await informationRepo.update(req.swagger.params.id.raw, req.swagger.params.information.raw);
		const information = await informationRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(information);
	} catch (e) {
        console.info(e);
		res.status(404).json(e);
	}
};
