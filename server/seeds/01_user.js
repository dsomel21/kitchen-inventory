const bcrypt = require('bcrypt');

const generateRandomPasswordHash = () => {
  const stringPassword = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 12);
  return bcrypt.hashSync(stringPassword, 12);
};

exports.seed = async (knex) => {
  await knex('users').del();

  await knex('users').insert([
    {
      id: 1,
      email: 'dsomel21@gmail.com',
      name: 'Rage',
      password: generateRandomPasswordHash(),
    },
  ]);
};
