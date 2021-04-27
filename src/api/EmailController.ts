import { getManager } from 'typeorm';
import { Department } from '../orm/entities';
import { PostRegister } from '../orm/entity/postRegister';
const departmentRepo = getManager().getRepository(Department);
const registerRepo = getManager().getRepository(PostRegister);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createRegisterEmail = async (req, res): Promise<void> => {
	try {
		let email = new PostRegister();
		email = req.swagger.params.postRegister.raw;
		const department = req.swagger.params.postRegister.raw.departmentId;
		const staff = (
			await departmentRepo.findOneOrFail({
				relations: ['staff'],
				where: {
					id: department,
				},
			})
		).staff;
		email.staff = staff[0];
		email.date = new Date();
		const insert = await registerRepo.save(email);
		res.status(201).json(insert);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};
