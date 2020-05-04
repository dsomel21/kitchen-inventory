exports.up = async (knex) => {
  // countries.code
  await knex.schema.table('countries', (t) => {
    t.string('code');
  });
  // states.code
  await knex.schema.table('states', (t) => {
    t.string('code');
  });
};

exports.down = async (knex) => {
  // countries.code
  await knex.schema.table('countries', (t) => {
    t.dropColumn('code');
  });
  // states.code
  await knex.schema.table('states', (t) => {
    t.dropColumn('code');
  });
};
