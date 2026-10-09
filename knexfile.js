require('dotenv').config();

const baseConnection = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'kanishka_tasks',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword'
};

module.exports = {
  development: {
    client: 'mysql2',
    connection: baseConnection,
    pool: { min: 2, max: 10 },
    migrations: { directory: './migrations', tableName: 'knex_migrations' },
    seeds: { directory: './seeds' }
  },
  test: {
    client: 'mysql2',
    connection: baseConnection,
    pool: { min: 1, max: 5 },
    migrations: { directory: './migrations', tableName: 'knex_migrations' },
    seeds: { directory: './seeds' }
  }
};
