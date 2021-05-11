import 'reflect-metadata';
import * as YAML from 'yamljs';
import express from 'express';
import * as SwaggerExpress from 'swagger-express-mw';
import * as SwaggerUi from 'swagger-ui-express';
import { checkJwt } from './middleware/checkJwt';
import { checkRoles } from './middleware/checkRoles';

export const app = express();

const config = {
	appRoot: __dirname,
	configDir: __dirname + '/../../config',
	swaggerFile: __dirname + '/../../swagger.yaml',
	swaggerSecurityHandlers: {
		JWT: async function securityHandler(req, res, cb) {
			if (checkJwt(req, res)) checkRoles(req, res, cb);
			//cb(); // ? uncomment to skip role checking 
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
