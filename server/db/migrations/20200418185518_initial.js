const Knex = require('knex');

exports.up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.increments().notNullable();
    t.string('email', 254).notNullable().unique();
    t.string('name').notNullable();
    t.string('password', 127).notNullable();
    t.datetime('last_login');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
