import Methods from './../methods/todos';
import { RequestHandler } from 'express';

export const createTodo: RequestHandler = (req, res) => {
  const { text } = req.body as { text: string };

  const todo = Methods.addNewTodo(text);

  res.status(201).send({ message: 'Todo was created', createdTodo: todo });
};

export const getTodos: RequestHandler = (req, res) => {
  const todos = Methods.getAllTodos();
  res.status(200).send({ todos });
};

export const updateTodo: RequestHandler = (req, res) => {
  const { text } = req.body as { text: string };
  const { id } = req.params as { id: string };

  const todo = Methods.updateTodo(id, text);

  if (todo) {
    res.status(200).send({ message: 'Todo was updated', updatedTodo: todo });
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
};
