import { getRepository } from 'typeorm';
import { User, Role } from '../orm/entities';
import _ from 'lodash';
import * as bcrypt from 'bcrypt';

export const createUser = async (req, res): Promise<void> => {
	const userRepo = getRepository(User);
	const roleRepo = getRepository(Role);

	try {
		let usr = new User();
		usr = req.swagger.params.user.raw;
		usr.password = await hashPassword(req.swagger.params.user.raw.password);
		const roleId = req.swagger.params.user.raw.roleId;
		const role = await roleRepo.findByIds(roleId);
		usr.roles = role;
		const insert = await userRepo.save(usr);
		res.status(201).json(insert);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};

export const getAllUsers = async (req, res): Promise<void> => {
	const userRepo = getRepository(User);
	try {
		const usr = await userRepo.find();
		res.status(200).json(usr);
	} catch (e) {
		res.status(404).json(e);
	}
};

export const deleteUser = async (req, res): Promise<void> => {
	const userRepo = getRepository(User);
	try {
		const id = req.swagger.params.user.raw.id;
		const usr = await userRepo.findOneOrFail(id);
		await userRepo.delete(id);
		res.status(200).json(usr);
	} catch (e) {
		console.log(e);
		res.status(410).json(e);
	}
};

export const getUserPermissions = async (id: string): Promise<string[]> => {
	const userRepo = getRepository(User);

	const user = await userRepo.findOneOrFail(id, {
		join: {
			alias: 'user',
			leftJoinAndSelect: {
				roles: 'user.roles',
				permissions: 'roles.permissions',
			},
		},
	});
	return _.uniq(_.flatten(user.roles.map((r) => r.permissions.map((p) => p.name))));
};

export const getUser = async (id: string): Promise<User | undefined> => {
	const user = await getRepository(User).findOne(id);
	return user;
};

export const checkEmail = async (req, res): Promise<void> => {
	/* const userRepo = getRepository(User);
	const usr = await userRepo.findOneOrFail(email); */
	try {
		const usr = await getRepository(User).findOne({
			where: { email: req.swagger.params.email.raw },
		});
		res.status(200).json(!!usr);
	} catch (error) {
		console.error(error);
		res.status(400).send();
	}
};

export const hashPassword = async (pwd: string) => await bcrypt.hash(pwd, 10);
export const checkIfPasswordIsValid = async (usr: User, unencryptedPassword: string): Promise<boolean> => {
	const res = await bcrypt.compare(unencryptedPassword, usr.password);
	return res === true;
};
