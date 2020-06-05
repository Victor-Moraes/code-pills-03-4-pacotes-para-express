import { Router } from 'express';

import TodoController from './controllers/TodoController';

const todoController = new TodoController();

const routes = Router();

routes.get('/todos', (request, response) => {
  throw new Error('Erro');
}, todoController.index);


const promisedException = async () => new Promise((resolve, reject) => {
  return reject(new Error('Erro dentro da promise'));
});

routes.post('/todos', async (request, response) => {
  return promisedException();
}, todoController.store);

routes.put('/todos/:id', todoController.update);

export default routes;
