import { Todo } from '../models/todo.model';

const TODOS: Todo[] = [];

const addNewTodo = (text: string) => {
  const todo: Todo = { id: Math.random().toString(), text };

  TODOS.push(todo);

  return todo;
};

const getAllTodos = () => {
  return TODOS;
};

const updateTodo = (id: string, text: string) => {
  const todoIdx = TODOS.findIndex((t) => t.id === id);
  if (todoIdx !== -1) {
    TODOS[todoIdx] = { ...TODOS[todoIdx], text };
  }
  return TODOS[todoIdx];
};

export default { addNewTodo, getAllTodos, TODOS, updateTodo };
