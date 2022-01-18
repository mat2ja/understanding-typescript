import React, { useState } from 'react';
import NewTodo from './component/NewTodo';
import Todolist from './component/TodoList';
import { Todo } from './todo.model';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    const todo = {
      id: Math.random().toString(),
      text,
    };
    setTodos((todos) => [...todos, todo]);
  };

  const todoDeleteHandler = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <Todolist items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
