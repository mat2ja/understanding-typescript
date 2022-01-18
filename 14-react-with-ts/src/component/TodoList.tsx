import React from 'react';
import { Todo } from '../todo.model';

interface TodoListProps {
  items: Todo[];
  onDeleteTodo: (id: string) => void;
}

const Todolist: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
  const todoDeleteHandler = (id: string) => {
    onDeleteTodo(id);
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.text}</span>
          <button onClick={todoDeleteHandler.bind(null, item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Todolist;
