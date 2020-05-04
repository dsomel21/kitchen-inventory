export const addDefaultColumns = (t) => {
  // timestamps([useTimestamps], [defaultToNow])
  t.timestamps(false, true);
  t.datetime('deleted_at');
};

const createOnlyNameColumnOnTable = (knex, tableName) => {
  return knex.schema.createTable(tableName, (t) => {
    t.increments().notNullable();
    t.string('name').notNullable();

    addDefaultColumns(t);
  });
};
