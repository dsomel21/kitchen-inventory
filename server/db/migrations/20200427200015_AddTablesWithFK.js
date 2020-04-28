const addDefaultColumns = (t) => {
  // timestamps([useTimestamps], [defaultToNow])
  t.timestamps(false, true);
  t.datetime('deleted_at');
};

exports.up = async (knex) => {
  // Address
  await knex.schema.createTable('addresses', (t) => {
    t.increments();
    t.string('street_address_1', 50).notNullable();
    t.string('street_address_2', 50);
    t.string('city', 50).notNullable();
    t.string('zipcode', 14).notNullable();
    t.specificType('coordinate', 'POINT');
    // unsigned() => Only POSITIVE Integer

    // BELONGS TO states
    t.integer(`state_id`)
      .unsigned()
      .references(`states.id`)
      .onDelete('CASCADE');

    // BELONGS TO countries
    t.integer(`country_id`)
      .unsigned()
      .references(`countries.id`)
      .onDelete('CASCADE');

    addDefaultColumns(t);
  });

  // Manufacturer
  await knex.schema.createTable('manufacturers', (t) => {
    t.string('name').notNullable();
    t.string('logo_url', 2000);
    t.string('description', 1000);
    t.string('email', 254).unique();

    // BELONGS TO addresses
    t.integer(`address_id`)
      .unsigned()
      .references(`addresses.id`)
      .onDelete('CASCADE');

    addDefaultColumns(t);
  });
};

exports.down = async (knex) => {
  knex.dropTable('addresses');
  knex.dropTable('manufacturers');
};
