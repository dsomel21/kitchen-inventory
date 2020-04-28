const Knex = require('knex');

const addDefaultColumns = (t) => {
  // timestamps([useTimestamps], [defaultToNow])
  t.timestamps(false, true);
  t.datetime('deleted_at');
};

const createNameTable = (knex, tableName) => {
  return knex.schema.createTable(tableName, (t) => {
    t.increments().notNullable();
    t.string('name').notNullable();

    addDefaultColumns(t);
  });
};

exports.up = async (knex) => {
  // User
  await knex.schema.createTable('users', (t) => {
    t.increments().notNullable();
    t.string('email', 254).notNullable().unique();
    t.string('name').notNullable();
    t.string('password', 127).notNullable();
    t.datetime('last_login');

    addDefaultColumns(t);
  });
  // ItemType
  await createNameTable(knex, 'item_types');

  // Country
  await createNameTable(knex, 'countries');

  // State
  await createNameTable(knex, 'states');

  // Shape
  await createNameTable(knex, 'shapes');

  // Location
  await knex.schema.createTable('locations', (t) => {
    t.increments();
    t.string('name').notNullable();
    t.string('description, 1000');
    t.string('image_url, 1000');

    addDefaultColumns(t);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('item_types');
  await knex.schema.dropTable('countries');
  await knex.schema.dropTable('states');
  await knex.schema.dropTable('shapes');
  await knex.schema.dropTable('locations');
};
