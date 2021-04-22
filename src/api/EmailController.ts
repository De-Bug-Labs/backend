import { getManager } from 'typeorm';
import { ExampleUser } from '../orm/entities';
import { Staff } from '../orm/entity/staff';

const staff = getManager().getRepository(Staff);


export const exampleTest = async (req, res): Promise<void> => {
	const usrs = await staff.find();
	const d = parseInt(req.swagger.params.id.raw);
	res.status(200).json({ id: d, rand: Math.round(Math.random() * 100), users: usrs });
};
