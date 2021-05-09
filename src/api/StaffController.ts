import { getManager } from 'typeorm';
import { Department, Staff } from '../orm/entities';

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

export const consultStaff = async (req, res): Promise<void> => {
	try {
		const page = req.swagger.params.page.raw;
		const pageSize = req.swagger.params.pageSize.raw;
		const staffs = await staffRepo.find({ take: pageSize, skip: (page - 1) * pageSize });
		if (staffs.length) res.status(200).json(staffs);
		else res.status(404).json({ message: 'index out of bound' });
	} catch (e) {
		res.status(400).json(e);
	}
};

export const consultStaffPages = async (req, res): Promise<void> => {
	try {
		const pageSize = req.swagger.params.pageSize.raw;
		const staffs = await staffRepo.count();
		res.status(200).json({
			pageSize: pageSize,
			staffsCount: staffs,
			pageCount: Math.ceil(staffs / pageSize),
		});
	} catch (e) {
		res.status(400).json(e);
	}
};

export const updateStaff = async (req, res): Promise<void> => {
	try {
		await staffRepo.update(req.swagger.params.id.raw, req.swagger.params.staff.raw);
		const staff = await staffRepo.findOneOrFail(req.swagger.params.id.raw);
		res.status(200).json(staff);
	} catch (e) {
		console.info(e);
		res.status(404).json(e);
	}
};
