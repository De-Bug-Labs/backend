import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Information } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('Register institutional information', async () => {
	const information = new Information();
	information.mision =
		'Brindar a nuestros beneficiarios un servicio integral humano, personalizado y de calidad, con una metodología activa, buscando la integración y la participación del adulto mayor con sus familiares fortaleciendo la relación, generando redes de comunicación y solidaridad.';
	information.instalation = 'COMPUTADORAS, IMPRESORA, COPIADORA, TABLETS';
	information.team = 'Contamos con un equipo altamente capacitado, conformado por especialistas, compañías y voluntarios.';
	const res = await getRepository(Information).save(information);
	const checkInformation = await getRepository(Information).findOne({
		where: {
			id: res.id,
		},
	});
	expect(checkInformation).toMatchObject(information);
});
