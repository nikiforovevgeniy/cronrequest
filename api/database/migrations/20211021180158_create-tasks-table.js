exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.uuid('hook_id').notNullable();
    table.uuid('user_id').notNullable();
    table.datetime('start_at').notNullable();
    table.integer('timezone').defaultTo(0);
    table.integer('repeat_cnt').defaultTo(0); // -1 for infinity
    table.string('crontime');
    table.boolean('completed').defaultTo(false);
    // table.datetime('created_at').defaultTo(knex.fn.now());
    // table.datetime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
