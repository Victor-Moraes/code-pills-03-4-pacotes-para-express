import {Request, Response} from 'express';
import knex from '../db/conn';

class TodoController {
  async index(request: Request, response: Response) {
    const todos = await knex('todos').select('*');

    const serializedTodos = todos.map(todo => ({
      ...todo,
      due_date: todo.due_date && new Date(todo.due_date).toISOString()
    }));

    return response.json(serializedTodos);
  }

  async store(request: Request, response: Response) {
    const { text, due_date = null } = request.body;

    const todo = { text, due_date, completed: false };
    
    const insertedTodoIds = await knex('todos').insert(todo);

    return response.json({ id: insertedTodoIds[0], ...todo });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const todo = await knex('todos').where('id', id).first();

    if(!todo) return response.status(404).json({ msg: 'Todo not found.' });

    const { text, due_date, completed } = request.body;

    const newTodoInformation = { text, due_date, completed };

    await knex('todos').update(newTodoInformation).where('id', todo.id);

    return response.json({...newTodoInformation, id: todo.id});
  }
};

export default TodoController;