import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { createConnection } from 'typeorm';
import * as util from 'util';
import { app } from './app';
import { toInteger } from 'lodash';
//const createMiddleware = require('@apidevtools/swagger-express-middleware');

dotenvExpand(dotenv.config());

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
		const prt = toInteger(process.env.PORT || process.env.APP_PORT || 5000);
		app.listen(prt, '0.0.0.0', () => {
			console.info('App is running at http://localhost:%d', prt);
		});
	})
	.catch((error) => console.error('TypeORM connection error: ', error));
