const Knex = require('knex');

const {
  addDefaultColumns,
  createOnlyNameColumnOnTable,
} = require('../../src/lib/tableUtils.js');

exports.up = async (knex) => {
  await Promise.all([
    // User
    knex.schema.createTable('users', (t) => {
      t.increments().notNullable();
      t.string('email', 254).notNullable().unique();
      t.string('name').notNullable();
      t.string('password', 127).notNullable();
      t.datetime('last_login');

      addDefaultColumns(t);
    }),

    // ItemType
    createOnlyNameColumnOnTable(knex, 'item_types'),

    // Country
    knex.schema.createTable('countries', (t) => {
      t.increments().notNullable();
      t.string('name').notNullable();
      t.string('code');

      addDefaultColumns(t);
    }),

    // State
    createOnlyNameColumnOnTable(knex, 'states'),

    // Shape
    createOnlyNameColumnOnTable(knex, 'shapes'),

    // Location
    knex.schema.createTable('locations', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description, 1000');
      t.string('image_url, 1000');

      addDefaultColumns(t);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('item_types'),
    knex.schema.dropTableIfExists('countries'),
    knex.schema.dropTableIfExists('states'),
    knex.schema.dropTableIfExists('shapes'),
    knex.schema.dropTableIfExists('locations'),
  ]);
};
