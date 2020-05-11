const {
  addDefaultColumns,
  references,
} = require('../../src/lib/tableUtils.js');

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable('items', (t) => {
      t.increments().notNullable();

      // BELONGS TO users
      references(t, 'users');
      t.string('name');
      // BELONGS TO item_types
      references(t, 'item_types');
      t.string('description', 1000);
      // BELONGS TO manufacturers
      references(t, 'manufacturers');
      // BELONGS TO sizes
      references(t, 'sizes');
      t.string('sku').unique();

      addDefaultColumns(t);
    }),

    knex.schema.createTable('item_infos', (t) => {
      t.increments().notNullable();
      references(t, 'items');
      t.datetime('purchase_date');
      t.datetime('expiration_date');
      t.datetime('last_used');
      t.float('price');
      references(t, 'locations');
    }),

    knex.schema.createTable('item_images', (t) => {
      t.increments().notNullable();
      references(t, 'items');
      t.string('image_url', 1000);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists('item_infos'),
    knex.schema.dropTableIfExists('item_images'),
    knex.schema.dropTableIfExists('items'),
  ]);
};
