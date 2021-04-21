import { Connection, createConnection, getConnection } from 'typeorm';

const connection = {
	async create(): Promise<Connection> {
		return createConnection();
	},

	async close(): Promise<void> {
		await getConnection().close();
	},

	async clear(): Promise<void> {
		const connection = getConnection();
		const entities = connection.entityMetadatas;
		try {
			entities.forEach(async (entity) => {
				const repository = connection.getRepository(entity.name);
				await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE`);
			});
		} catch (error) {
			throw new Error(`ERROR: Cleaning test db: ${error}`);
		}
	},
};
export default connection;
