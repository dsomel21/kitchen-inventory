require('dotenv').config();

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
  },
};
