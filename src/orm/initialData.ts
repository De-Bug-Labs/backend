import connection from '../connect';

connection
	.create()
	.then(async () => {
		console.info('Initial data has been moved to migrations');
	})
	.then(() => {
		console.info('Load initial data done');
		connection.close();
	});
