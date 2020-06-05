import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('todos').insert([
    { text: 'Aprender Javascript', due_date: new Date('2020-06-25'), completed: false },
    { text: 'Aprender NodeJS', due_date: new Date('2020-07-15'), completed: false },
    { text: 'Aprender ReactJS', due_date: new Date('2020-08-01'), completed: false },
    { text: 'Desenvolver uma Aplicação Fullstack', due_date: new Date('2020-09-15'), completed: false },
  ]);
}