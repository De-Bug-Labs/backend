import { getManager } from 'typeorm';
import { Department } from '../orm/entities';
import { Staff } from '../orm/entity/staff';

const staffRepo = getManager().getRepository(Staff);
const departmentRepo = getManager().getRepository(Department);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createStaff = async (req, res): Promise<void> => {
	try {
		let staff = new Staff();
		staff = req.swagger.params.staff.raw;
		staff.name = req.swagger.params.staff.raw.name;
		staff.email = req.swagger.params.staff.raw.email;
		const departmentId = req.swagger.params.staff.raw.departmentId;
		const department = await departmentRepo.findByIds(departmentId);
		staff.departments = department;
		console.info(staff);
		const insert = await staffRepo.save(staff);
		res.status(201).json(insert);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};

export const deleteStaff = async (req, res): Promise<void> => {
	try {
		const staff = await staffRepo.findOneOrFail(req.swagger.params.staff.raw.staffId);
		await staffRepo.delete(req.swagger.params.staff.raw.staffId);
		res.status(200).json(staff);
	} catch (e) {
		res.status(410).json(e);
	}
};
