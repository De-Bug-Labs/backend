import { timeStamp } from 'node:console';
import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { DonationSettings } from '../../src/orm/entities';
beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('create a new register of donation_settings', async () => {
	const donationSettings = new DonationSettings();
	donationSettings.date = new Date();
	donationSettings.limit = 500;
	const res = await getRepository(DonationSettings).save(donationSettings);
	const checkRegister = await getRepository(DonationSettings).findOne({
		where: {
			date: res.date,
		},
	});
	expect(checkRegister).toMatchObject(donationSettings);
});
