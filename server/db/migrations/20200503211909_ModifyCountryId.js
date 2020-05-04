exports.up = async (knex) => {
  // Drop country_id from Address
  await knex.schema.table('addresses', (t) => {
    t.dropColumn('country_id');
  });

  // Add country_id to State
  await knex.schema.table('states', (t) => {
    t.integer(`country_id`)
      .unsigned()
      .references(`countries.id`)
      .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  // Re-Add country_id in Address
  await knex.schema.table('addresses', (t) => {
    t.integer(`country_id`)
      .unsigned()
      .references(`countries.id`)
      .onDelete('CASCADE');
  });

  // Drop country_id from State
  await knex.schema.table('states', (t) => {
    t.dropColumn('country_id');
  });
};
