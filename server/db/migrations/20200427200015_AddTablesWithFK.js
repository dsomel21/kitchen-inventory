const { addDefaultColumns } = require('../../src/lib/tableUtils.js');

exports.up = async (knex) => {
  // Address
  await Promise.all([
    knex.schema.createTable('addresses', (t) => {
      t.increments();
      t.string('street_address_1', 50).notNullable();
      t.string('street_address_2', 50);
      t.string('city', 50).notNullable();
      t.string('zipcode', 14).notNullable();
      t.specificType('coordinate', 'POINT');

      // BELONGS TO states
      t.integer(`state_id`)
        .unsigned()
        .references(`states.id`)
        .onDelete('CASCADE');

      addDefaultColumns(t);
    }),

    // Add country_id to State
    knex.schema.table('states', (t) => {
      t.integer(`country_id`)
        .unsigned()
        .references(`countries.id`)
        .onDelete('CASCADE')
        .notNullable();
    }),

    // Manufacturer
    knex.schema.createTable('manufacturers', (t) => {
      t.increments().notNullable();
      t.string('name').notNullable();
      t.string('logo_url', 2000);
      t.string('description', 1000);
      t.string('email', 254).unique();

      // Add address_id to Manufacturer
      t.integer(`address_id`)
        .unsigned()
        .references(`addresses.id`)
        .onDelete('CASCADE')
        .notNullable();

      addDefaultColumns(t);
    }),

    // Size
    knex.schema.createTable('sizes', (t) => {
      t.increments().notNullable();
      t.string('name').notNullable();
      t.float('width_in_cm');
      t.float('length_in_cm');
      t.float('height_in_cm');

      t.integer(`shape_id`)
        .unsigned()
        .references(`shapes.id`)
        .onDelete('CASCADE');

      addDefaultColumns(t);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists('manufacturers'),
    knex.schema.dropTableIfExists('addresses'),
    knex.schema.table('states', (t) => {
      t.dropColumn('country_id');
    }),
    knex.schema.dropTableIfExists('sizes'),
  ]);
};
