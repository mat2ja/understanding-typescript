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

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const { text } = req.body as { text: string };
  const { id } = req.params;

  try {
    const todo = Methods.updateTodo(id, text);

    if (todo) {
      res.status(200).send({ message: 'Todo was updated', updatedTodo: todo });
    }
  } catch (err: any) {
    res.status(404).send({ message: err.message });
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const { id } = req.params;

  try {
    const { success } = Methods.deleteTodo(id);

    if (success) {
      res.status(200).send({ message: 'Todo was deleted' });
    }
  } catch (err: any) {
    res.status(404).send({ message: err.message });
  }
};
