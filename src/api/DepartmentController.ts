import { getManager } from 'typeorm';
import { Department } from '../orm/entities';

const departmentRepo = getManager().getRepository(Department);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const consultDepartment = async (req, res): Promise<void> => {
	try {
		const departments = await departmentRepo.find();
		if (departments.length) res.status(200).json(departments);
		else res.status(404).json({ message: 'index out of bound' });
	} catch (e) {
		res.status(400).json(e);
	}
};
