import { getRepository } from 'typeorm';
import connection from '../../src/connect';
import { Donation } from '../../src/orm/entities';

beforeAll(async () => {
	await connection.create();
});

afterAll(async () => {
	await connection.close();
});

test('Register  a new donation', async () => {
	const donation = new Donation();
	donation.amount = 1000;
	donation.date = new Date();
	donation.name = 'TestDonationName';
	const res = await getRepository(Donation).save(donation);
	const checkDonation = await getRepository(Donation).findOne({
		where: {
			id: res.id,
		},
	});
	expect(checkDonation).toMatchObject(donation);
});
