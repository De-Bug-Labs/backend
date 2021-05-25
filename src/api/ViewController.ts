import { getManager } from 'typeorm';
import { View } from '../orm/entities';

const viewRepo = getManager().getRepository(View);
//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const getView = async (req, res): Promise<void> => {
	try {
		const view = await viewRepo.findOne();
		if (view) res.status(200).json(view);
		else res.status(404).json({ message: 'index out of bound' });
	} catch (e) {
		res.status(400).json(e);
	}
};

export const updateView = async (req, res): Promise<void> => {
	try {
		await viewRepo.update(req.swagger.params.view.raw.viewId, req.swagger.params.view.raw);
		const usr = await viewRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(usr);
	} catch (e) {
		res.status(404).json(e);
	}
};
