import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('todos', table => {
    table.increments('id')
      .primary();

    table.string('text')
      .notNullable();

    table.dateTime('due_date');

    table.boolean('completed')
      .notNullable()
      .defaultTo(false);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('todos');
}