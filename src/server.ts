import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import * as util from 'util';
import { app } from './app';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('uncaughtException', (error: any) => {
	if (error && error.code !== 'ECONNREFUSED') console.error(error);
});
process.on('unhandledRejection', (reason, p) => {
	console.error(`Unhandled rejection at: ${util.inspect(p)} reason: ${reason}`);
});

app.use(bodyParser.json.apply({ limit: 100_000_000, type: 'application/json' }));
app.use(cookieParser());

createConnection()
	.then(async () => {
		app.listen(process.env.APP_PORT, () => {
			console.info('App is running at http://localhost:%d', process.env.APP_PORT);
		});
	})
	.catch((error) => console.error('TypeORM connection error: ', error));
