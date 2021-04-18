import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Donation_Settings } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of donation_settings', async () => {
	const donation_settings = new Donation_Settings();
	donation_settings.date=new Date(2020, 11, 12, 11, 52);;
    donation_settings.limit=500;
	const res = await getRepository(Donation_Settings).save(donation_settings);
	const checkRegister= await getRepository(Donation_Settings).findOne({
		where: {
			date: res.date,
		},
	});
	expect(checkRegister).toMatchObject(donation_settings);
});
