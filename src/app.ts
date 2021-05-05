import 'reflect-metadata';
// import { createConnection, FileLogger } from 'typeorm';
// import { ExampleUser } from './orm/entities';
import * as YAML from 'yamljs';
import express from 'express';
import * as SwaggerExpress from 'swagger-express-mw';
import * as SwaggerUi from 'swagger-ui-express';
import * as _ from 'lodash';
import md5 from 'blueimp-md5';

export const app = express();

// createConnection()
// 	.then(async (connection) => {
// 		console.log('Inserting a new user into the database...');
// 		const user = new ExampleUser();
// 		user.firstName = 'John';
// 		user.lastName = 'Doe';
// 		user.age = 25;
// 		await connection.manager.save(user);
// 		console.log('Saved a new user with id: ' + user.id);

// 		console.log('Loading users from the database...');
// 		const users = await connection.manager.find(ExampleUser);
// 		console.log('Loaded users: ', users);

// 		console.log('Here you can setup and run express/koa/any other framework.');
// 	})
// 	.catch((error) => console.log(error));

const config = {
	appRoot: __dirname,
	configDir: __dirname + '/../../config',
	swaggerFile: __dirname + '/../../swagger.yaml',
	swaggerSecurityHandlers: {
		JWT: async function securityHandler(req, res, cb) {
			//if (checkJwt(req, res)) checkRoles(req, res, cb);
			cb(); // ? uncomment to skip role checking
		},
	},
};

const swaggerDoc = YAML.load(__dirname + '/../../swagger.yaml');
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDoc));

SwaggerExpress.create(config, (err, SwaggerExpress) => {
	if (err) {
		throw err;
	}
	SwaggerExpress.register(app);
});
