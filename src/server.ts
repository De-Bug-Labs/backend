import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import * as util from 'util';
import { app } from './app';
import { toInteger } from 'lodash';
const createMiddleware = require('@apidevtools/swagger-express-middleware');

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

export function optionCORS(req, res, next): void {
	const origin: string = req.headers.origin as string;
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Origin', origin);
	if (req.method === 'OPTIONS' || req.method === 'HEAD') {
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Content-Length, Origin, ' + 'X-Requested-With');

		res.sendStatus(204);
		return;
	}
	next();
}

app.use(optionCORS);

createConnection()
	.then(async () => {
		const prt = toInteger(process.env.PORT || process.env.APP_PORT || 5000);
		app.listen(prt, '0.0.0.0', () => {
			console.info('App is running at http://localhost:%d', prt);
		});
	})
	.catch((error) => console.error('TypeORM connection error: ', error));
