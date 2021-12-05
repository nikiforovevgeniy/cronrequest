module.exports = {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: () => {
    switch (process.env.DB_CLIENT) {
      case 'sqlite3':
        return {
          filename: process.env.DB_FILENAME || '',
        };
      case 'mysql':
      case 'mysql2':
        return {
          host: process.env.DB_HOST || 'localhost',
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASSWORD || '',
          database: process.env.DB_DBNAME || 'db',
        };
    }
  },
  useNullAsDefault: true,
};
