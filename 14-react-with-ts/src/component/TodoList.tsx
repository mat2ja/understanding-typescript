import React from 'react';

interface TodoItem {
  id: string;
  text: string;
}

interface TodoListProps {
  items: TodoItem[];
}

const Todolist: React.FC<TodoListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

export default Todolist;
