import {Request, Response} from 'express';
import knex from '../db/conn';

import Todo from '../@types/Todo';

class TodoController {
  async index(request: Request<
    {},
    {},
    {},
    { completed?: string, due_date?: { gte?: string, lte?:string } }>,
    response: Response
  ) {
    const { completed, due_date } = request.query;

    const query = knex('todos').select('*');
    if(typeof completed !== 'undefined') query.where('completed', '=', completed === 'true' ? 1 : 0);
    if(typeof due_date?.gte !== 'undefined') query.where('due_date','>=', due_date.gte);
    if(typeof due_date?.lte !== 'undefined') query.where('due_date','<=', due_date.lte);

    const todos: Todo[] = await query;

    const serializedTodos = todos.map(todo => ({
      ...todo,
      due_date: todo.due_date && new Date(todo.due_date).toISOString()
    }));

    return response.json(serializedTodos);
  }

  async store(
    request: Request<{}, {}, { text: string, due_date?: string }>,
    response: Response
  ) {
    const { text, due_date } = request.body;

    const todo: Todo = { text, due_date, completed: false };
    
    const insertedTodoIds = await knex('todos').insert(todo);

    return response.json({ id: insertedTodoIds[0], ...todo });
  }

  async update(
    request: Request<{ id: string }, {}, { text: string, due_date: string, completed: boolean }>,
    response: Response
  ) {
    const id = Number(request.params.id);

    const todo: Todo | null = await knex('todos').where('id', id).first();

    if(!todo) return response.status(404).json({ msg: 'Todo not found.' });

    const { text, due_date, completed } = request.body;

    const newTodoInformation: Todo = { text, due_date, completed };

    await knex('todos').update(newTodoInformation).where('id', id);

    return response.json({...newTodoInformation, id: id});
  }
};

export default TodoController;