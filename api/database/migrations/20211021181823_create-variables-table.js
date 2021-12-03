exports.up = function (knex) {
  return knex.schema.createTable('variables', function (table) {
    table.uuid('id').primary();
    table.uuid('task_id').notNullable();
    table.string('name').notNullable();
    table.string('value').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('variables');
};
