import { NextFunction } from 'express';

export const checkRoles = async (req, res, next: NextFunction) => {
	const permission = req.swagger.operation['x-security-privilege'];
	const userPermissions = res.locals.jwtPayload.permissions;
	if (!permission || userPermissions.indexOf(permission) !== -1) {
		next();
	} else {
		res.status(401).send;
	}
};
