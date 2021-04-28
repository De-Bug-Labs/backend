import { getUser } from './api/UserController';
import connection from './connect';

async function run() {
	await connection.create();
	const usr = await getUser('4501599a-a874-48b0-804c-e677a50b61e2');
	console.log(usr);
}

run();
