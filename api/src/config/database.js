module.exports = {
	client: process.env.DB_CLIENT || 'sqlite3',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_DBNAME || 'db',
		filename: process.env.DB_FILENAME || '',
	},
	useNullAsDefault: true,
}