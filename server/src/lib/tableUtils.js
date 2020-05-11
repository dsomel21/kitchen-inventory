const pluralize = require('pluralize');

const addDefaultColumns = async (t) => {
  // timestamps([useTimestamps], [defaultToNow])
  t.timestamps(false, true);
  t.datetime('deleted_at');
};

const createOnlyNameColumnOnTable = (knex, tableName) => {
  return knex.schema.createTable(tableName, async (t) => {
    t.increments().notNullable();
    t.string('name').notNullable();

    addDefaultColumns(t);
  });
};

// references(t, item_types)
const references = async (t, tableName) => {
  const singularTableName = pluralize.singular(tableName);

  t.integer(`${singularTableName}_id`)
    .unsigned()
    .references(`${tableName}.id`)
    .onDelete('CASCADE');
};

module.exports = { addDefaultColumns, createOnlyNameColumnOnTable, references };
