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

  if (todoIdx === -1) {
    throw new Error('Todo not found');
  }

  TODOS[todoIdx] = new Todo(TODOS[todoIdx].id, text);
  return TODOS[todoIdx];
};

const deleteTodo = (id: string) => {
  const todoIdx = TODOS.findIndex((t) => t.id === id);

  if (todoIdx === -1) {
    throw new Error('Todo not found');
  }

  TODOS.splice(todoIdx, 1);
  return { success: true };
};

export default { addNewTodo, getAllTodos, updateTodo, deleteTodo };
