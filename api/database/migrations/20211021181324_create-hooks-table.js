exports.up = function (knex) {
  return knex.schema.createTable('hooks', function (table) {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable();
    table.string('name').notNullable();
    table.text('url').notNullable();
    table.string('method').notNullable();
    table.json('body');
    table.json('query');
    table.json('headers');
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('hooks');
};
