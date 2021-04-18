import { getManager } from 'typeorm';
import { ExampleUser } from '../orm/entities';

const exampleRepo = getManager().getRepository(ExampleUser);

export const exampleTest = async (req, res): Promise<void> => {
	const d = parseInt(req.swagger.params.id.raw);
	res.status(200).json({ id: d, rand: Math.round(Math.random() * 100) });
};
