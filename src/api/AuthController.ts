import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';
import { User } from '../orm/entities';
import { checkIfPasswordIsValid, getUserPermissions } from './UserController';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		res.status(200).send();
	}

	const userRepo = getRepository(User);
	let user: User | undefined;
	let permissions = Array<string>();
	try {
		user = await userRepo.findOneOrFail({
			where: { email },
			select: ['id', 'email', 'password'],
		});
		permissions = await getUserPermissions(user.id);
	} catch (e) {
		user = undefined;
	}

	if (!user || !(await checkIfPasswordIsValid(user, password))) {
		res.status(401).json({ message: 'Incorect username or password' }).send();
		return;
	}

	const payload = {
		userId: user.id,
		username: user.email,
		permissions: permissions,
	};
	const token = jwt.sign(payload, config.jwtSecret, {
		expiresIn: '1h',
	});

	res.send({ payload, token });
};

// !Cant logout on JWT
// export const logout = async (req: Request, res: Response) => {
// 	res.locals.jwtPayload;

// 	res.send(token);
// };

export const changePassword = async (req: Request, res: Response) => {
	const id = res.locals.jwtPayload.userId;

	const { oldPass, newPass } = req.body;
	if (!(oldPass && newPass)) {
		res.status(400).send();
		return;
	}
	const userRepository = getRepository(User);
	let user: User;

	try {
		user = await userRepository.findOneOrFail(id);
	} catch (id) {
		res.status(401).send();
		return;
	}

	if (!checkIfPasswordIsValid(user, oldPass)) {
		res.status(400).send();
		return;
	}
	user.password = newPass;
	userRepository.save(user);
	res.status(204).send();
};
