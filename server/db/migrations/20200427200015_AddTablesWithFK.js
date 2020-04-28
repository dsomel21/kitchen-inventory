const addDefaultColumns = (t) => {
  // timestamps([useTimestamps], [defaultToNow])
  t.timestamps(false, true);
  t.datetime('deleted_at');
};

const references = (table, foreignTableName) => {
  table
    .integer(`${foreignTableName}_id`)
    .unsigned()
    .references(`${foreignTableName}.id`)
    .onDelete('CASCADE');
};

exports.up = async (knex) => {
  // Address
  await knex.createTable('addresses', (t) => {
    t.increments();
    t.string('street_address_1', 50).notNullable();
    t.string('street_address_2', 50);
    t.string('city', 50).notNullable();
    t.string('zipcode', 14).notNullable();
    t.specificType('coordinate', 'POINT');
    references(t, 'states');
    references(t, 'countries');
    // unsigned() => Only POSITIVE Integer

    addDefaultColumns();
  });

  // Manufacturer
  await knex.createTable('manufacturers', (t) => {
    t.string('name').notNullable();
    t.string('logo_url', 2000);
    t.string('description', 1000);
     
  });
};

exports.down = async (knex) => {
  knex.dropTable('addresses');
};
