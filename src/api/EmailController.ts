import { getManager } from 'typeorm';
import { Department, ExampleUser } from '../orm/entities';
import { PostRegister } from '../orm/entity/postRegister';
import { Staff } from '../orm/entity/staff';

const exampleRepo = getManager().getRepository(ExampleUser);

const staffRepo = getManager().getRepository(Staff);
const departmentRepo = getManager().getRepository(Department);
const registerRepo = getManager().getRepository(PostRegister);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createRegisterEmail = async (req, res): Promise<void> => {
	try {
		let usr = new PostRegister();
		usr = req.swagger.params.postRegister.raw;
		const department = req.swagger.params.postRegister.raw.departmentId;
		const staff = (
			await departmentRepo.findOneOrFail({
				relations: ['staff'],
				where: {
					id: department,
				},
			})
		).staff;
		usr.staff = staff[0];
        usr.date=new Date();
		console.info(usr);
		const insert = await registerRepo.save(usr);
		res.status(201).json(insert);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};