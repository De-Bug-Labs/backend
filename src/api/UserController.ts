import { getManager } from 'typeorm';
import { User } from '../orm/entity/user';
import { Role } from '../orm/entity/role';

const userRepo = getManager().getRepository(User);
const roleRepo = getManager().getRepository(Role);

export const createUser = async (req, res): Promise<void> => {
	try {
		let usr = new User();
		usr = req.swagger.params.user.raw;
		// usr.name = req.swagger.params.user.raw.name;
		// usr.lastName = req.swagger.params.user.raw.lastName;
		// usr.email = req.swagger.params.user.raw.email;
		usr.password = req.swagger.params.user.raw.password;
		const roleId = req.swagger.params.user.raw.roleId;
		const role = await roleRepo.findByIds(roleId);
		usr.roles = role;
		console.info(usr);
		const insert = await userRepo.save(usr);
		res.status(201).json(insert);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};

export const deleteUser = async (req, res): Promise<void> => {
	res.status(501);
};
