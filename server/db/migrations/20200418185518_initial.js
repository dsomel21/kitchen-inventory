const Knex = require('knex');

const addDefaultColumns = (t) => {
  // timestamps([useTimestamps], [defaultToNow])
  t.timestamps(false, true);
  t.datetime('deleted_at');
};

const createNameTable = (tableName) => {
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
  await createNameTable('item_types');

  // Country
  await createNameTable('countries');

  // State
  await createNameTable('states');

  // Shape
  await createNameTable('shapes');

  // Location
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
