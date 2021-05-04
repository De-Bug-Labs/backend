import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response) => {
	const token = <string>req.body.auth;
	const jwtSecret = process.env.JWT_SECRET || '';
	const jwtExpire = process.env.JWT_EXPIRE || '30m';

	if (token) {
		try {
			const jwtPayload = jwt.verify(token, jwtSecret);
			res.locals.jwtPayload = jwtPayload;
			const newToken = jwt.sign(jwtPayload, jwtSecret, { expiresIn: jwtExpire });
			res.setHeader('token', newToken);
			res.cookie('token', newToken);
		} catch (e) {
			res.status(401).send();
			return;
		}
	} else {
		res.locals.jwtPayload = { permissions: [] };
	}
};
