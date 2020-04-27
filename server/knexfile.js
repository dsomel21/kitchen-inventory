require('dotenv').config();

console.log(process.env.POSTGRES_DB);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);

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
