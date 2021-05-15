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
	event.description =
		'a República Mexicana está plagada de grandes platillos, sabores y texturas que varían de región a región y de ciudad a ciudad. Si bien hay muchos restaurantes y oferta gastronómica centralizada en la Ciudad de México, también hay ciudades como Guadalajara, Monterrey, Puebla y León que tienen ofertas culinarias de lo más interesantes, tanto a nivel educativo como a nivel tradición. La ciudad de Querétaro ha visto un crecimiento impresionante en los últimos años, razón por la cual su oferta gastronómica ha ido maximizándose también. Hay varios lugares que cuentan con cursos para aficionados de la cocina, así como universidades que tienen diversos grados de especialidad si es que eliges hacer de tu pasión por la gastronomía un estilo de vida.';
	event.address = 'centro de queretaro';
	event.date = '2021-05-30';
	event.srcimg = 'img/hola.jpg';
	const res = await getRepository(Calendar).save(event);
	const checkEvent = await getRepository(Calendar).findOne({
		where: {
			id: res.id,
		},
	});
	expect(checkEvent).toMatchObject(event);
});
