const {
  addDefaultColumns,
  createOnlyNameColumnOnTable,
} = require('../../src/lib/tableUtils.js');

exports.up = async (knex) => {
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
  });

  // Shape
  knex.schema.createTable('shapes', (t) => {
    t.increments().notNullable();
    createOnlyNameColumnOnTable(t);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('sizes');
  await knex.schema.dropTable('shapes');
};
