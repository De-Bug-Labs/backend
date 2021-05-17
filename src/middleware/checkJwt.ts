import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';

export const checkJwt = (req: Request, res: Response): boolean => {
	let token = <string>req.cookies.token || <string>req.headers.authorization || <string>req.headers.token;
	console.log(req.cookies.token);
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
			res.status(401).json(e).send();
			return false;
		}
	} else {
		res.locals.jwtPayload = {
			permissions: config.guestPermissions,
		};
	}
	return true;
};
