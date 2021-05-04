import 'reflect-metadata';
// import { createConnection, FileLogger } from 'typeorm';
// import { ExampleUser } from './orm/entities';
import * as YAML from 'yamljs';
import express from 'express';
import * as SwaggerExpress from 'swagger-express-mw';
import * as SwaggerUi from 'swagger-ui-express';
import { checkJwt } from './middleware/checkJwt';
import { checkRoles } from './middleware/checkRoles';

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
			checkJwt(req, res);
			checkRoles(req, res, cb);
		},
		// 	} else {
		// 		const privilege = req.swagger.operation['x-security-privilege'];
		// 		console.info(privilege);
		// 		validator.validate(userinfo.sub, privilege, cb);
		// 	}
		// },
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
