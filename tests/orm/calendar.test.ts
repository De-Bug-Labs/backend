import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Calendar } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create calendar event', async () => {
	const event = new Calendar();
	event.title = 'Clase de cocina';
	event.description = 'Clases de cocina mexicana';
	event.address = 'centro de queretaro';
	event.date = new Date(2020, 11, 12, 11, 52);
	event.srcimg = 'img/hola.jpg';
	const res = await getRepository(Calendar).save(event);
	const checkEvent = await getRepository(Calendar).findOne({
		where: {
			id_calendar: res.id_calendar,
		},
	});
	expect(checkEvent).toMatchObject(event);
});
