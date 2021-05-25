require('dotenv-expand')(require('dotenv').config());

module.exports = {
	name: 'default',
	type: 'postgres',
	url: process.env.DATABASE_URL,
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
	// host: process.env.PG_HOST,
	// port: process.env.PG_PORT,
	// username: process.env.PG_USERNAME,
	// password: process.env.PG_PASSWORD,
	// database: process.env.PG_DATABASE,
	// schema: process.env.PG_SCHEMA,
	synchronize: false,
	logging: ['error', 'schema', 'warn', 'info ', 'log'],
	entities: ['dist/src/orm/entity/**/*.js'],
	migrations: ['dist/src/orm/migration/**/*.js'],
	subscribers: ['dist/src/orm/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'src/orm/entity',
		migrationsDir: 'src/orm/migration',
		subscribersDir: 'src/orm/subscriber',
	},
};