const countries = require('../../server/src/constants/countries');
const provinces = require('../../server/src/constants/provinces');

exports.seed = async (knex) => {
  // Country
  await knex('countries').del();
  await knex('countries').insert(countries);

  // State
  await knex('states').del();
  await knex('states').insert(provinces);
};
