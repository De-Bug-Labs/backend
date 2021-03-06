import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '../orm/entities';
import { checkIfPasswordIsValid, getUserPermissions } from './UserController';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		res.status(400).send();
	}
	const userRepo = getRepository(User);
	let user: User;
	let permissions = Array<string>();
	try {
		user = await userRepo.findOneOrFail({
			where: { email },
			select: ['id', 'email', 'password'],
		});
		permissions = await getUserPermissions(user.id);
	} catch (e) {
		res.status(401).json({ message: 'Incorect username or password' }).send();
		return;
	}

	if (!user || !(await checkIfPasswordIsValid(user, password))) {
		res.status(401).json({ message: 'Incorect username or password' }).send();
		return;
	}

	const payload = {
		userId: user.id,
		email: user.email,
		permissions: permissions,
	};
	const jwtSecret = process.env.JWT_SECRET || '';
	const jwtExpire = process.env.JWT_EXPIRE || '30m';
	const token = jwt.sign(payload, jwtSecret, {
		expiresIn: jwtExpire,
	});

	res.setHeader('token', token);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { exp } = <any>jwt.decode(token);
	const d = new Date(0);
	d.setUTCSeconds(exp); // The 0 there is the key, which sets the date to the epoch
	res.cookie('token', token, { expires: d, secure: false, sameSite: false });
	res.setHeader('Access-Control-Allow-Origin', (req.headers.origin as string) || '*');
	//console.log(req.headers.origin as string);
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
