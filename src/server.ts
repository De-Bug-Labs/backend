import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import * as util from 'util';
import { app } from './app';
import cors from 'cors';
import config from '../config/config';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('uncaughtException', (error: any) => {
	if (error && error.code !== 'ECONNREFUSED') console.error(error);
});
process.on('unhandledRejection', (reason, p) => {
	console.error(`Unhandled rejection at: ${util.inspect(p)} reason: ${reason}`);
});

const corsOptions = {
	// origin: (origin, cb) => {
	// 	if (config.corsWhiteList.indexOf(origin) !== -1) cb(null, true);
	// 	else cb(new Error('Not allowed by CORS'));
	// },
	origin: config.corsWhiteList,
	maxAge: process.env.CORS_MAX_AGE || 3600,
};
app.use(cors(corsOptions));
app.options('*', cors());
app.use(bodyParser.json.apply({ limit: 100_000_000, type: 'application/json' }));
app.use(cookieParser());

createConnection()
	.then(async () => {
		const prt = process.env.PORT || process.env.APP_PORT || 5000;
		app.listen(prt, () => {
			console.info('App is running at http://localhost:%d', process.env.APP_PORT || 5000);
		});
	})
	.catch((error) => console.error('TypeORM connection error: ', error));
