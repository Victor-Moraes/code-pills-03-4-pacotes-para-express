import { Router } from 'express';

import TodoController from './controllers/TodoController';

const todoController = new TodoController();

const routes = Router();

routes.get('/todos', todoController.index);
routes.post('/todos', todoController.store);
routes.put('/todos/:id', todoController.update);

export default routes;
