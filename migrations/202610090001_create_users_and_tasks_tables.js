/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.enu('role', ['user', 'admin']).notNullable().defaultTo('user');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('title', 255).notNullable();
    table.text('description').nullable();
    table
      .enu('status', ['Pending', 'In Progress', 'Testing', 'Completed'])
      .notNullable()
      .defaultTo('Pending');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('users');
};
