import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';

export const checkJwt = (req: Request, res: Response) => {
	const token = <string>req.body.auth;

	if (token) {
		try {
			const jwtPayload = jwt.verify(token, config.jwtSecret);
			res.locals.jwtPayload = jwtPayload;
			const newToken = jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '1m' });
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
