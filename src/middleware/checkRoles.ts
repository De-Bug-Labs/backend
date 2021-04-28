import { Request, Response, NextFunction } from 'express';
import { getUserPermissions } from '../api/UserController';

export const checkRoles = (permission: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const id = res.locals.jwtPayload.userId;
		
	
		const userPermissions = await getUserPermissions(id);
		console.log(userPermissions);
		if (!permission || userPermissions.indexOf(permission) !== -1)
			next();
		else res.status(401).send;
	};
};
