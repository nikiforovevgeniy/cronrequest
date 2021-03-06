exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password');
    table.string('role');
    // table.datetime('created_at').defaultTo(knex.fn.now());
    // table.datetime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
