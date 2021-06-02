import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Role } from '../orm/entities';

export const checkJwt = async (req: Request, res: Response): Promise<boolean> => {
	let token = <string>req.cookies.token || <string>req.headers.authorization || <string>req.headers.token;
	//console.log(req.cookies.token);
	const jwtSecret = process.env.JWT_SECRET || '';
	const jwtExpire = process.env.JWT_EXPIRE || '5m';

	if (token) {
		try {
			token = token.replace('Bearer ', '');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const jwtPayload: any = jwt.verify(token, jwtSecret);
			res.locals.jwtPayload = jwtPayload;
			const { id, email, permissions } = jwtPayload;
			const newToken = jwt.sign({ id, email, permissions }, jwtSecret, { expiresIn: jwtExpire });
			res.setHeader('token', newToken);
			const expire = jwtPayload.exp || 0;
			const d = new Date(0);
			d.setUTCSeconds(expire);
			res.cookie('token', newToken, { expires: d, secure: false, sameSite: false });
		} catch (e) {
			res.status(401).json({ message: 'unauthorized', error: e }).send();
			return false;
		}
	} else {
		const guest = await getRepository(Role).findOneOrFail({
			where: { name: 'guest' },
			relations: ['permissions'],
		});
		if (guest) {
			res.locals.jwtPayload = {
				permissions: guest.permissions.map((p) => p.name),
			};
			const newToken = jwt.sign({ permissions: res.locals.jwtPayload.permissions }, jwtSecret, { expiresIn: '1d' });
			res.setHeader('token', newToken);
			const expire = Date.now() + 1000 * 60 * 60 * 24;
			const d = new Date(expire);
			res.cookie('token', newToken, { expires: d, secure: false, sameSite: false });
		}
	}
	return true;
};
