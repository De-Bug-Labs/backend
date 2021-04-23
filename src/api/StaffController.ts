import { getManager } from 'typeorm';
import { Department } from '../orm/entities';
import { Staff } from '../orm/entity/staff';

const staffRepo = getManager().getRepository(Staff);
const departmentRepo = getManager().getRepository(Department);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createStaff = async (req, res): Promise<void> => {
	try {
		let usr = new Staff();
		usr = req.swagger.params.staff.raw;
		usr.name = req.swagger.params.staff.raw.name;
		usr.email = req.swagger.params.staff.raw.email;
		const departmentId = req.swagger.params.staff.raw.departmentId;
		const department = await departmentRepo.findByIds(departmentId);
		usr.departments = department;
		console.info(usr);
		const insert = await staffRepo.save(usr);
		res.status(201).json(insert);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};

export const deleteStaff = async (req, res): Promise<void> => {
	try {
		const usr = await staffRepo.findOneOrFail(req.swagger.params.staff.raw.staffId);
		await staffRepo.delete(req.swagger.params.staff.raw.staffId);
		res.status(200).json(usr);
	} catch (e) {
		res.status(410).json(e);
	}
};
