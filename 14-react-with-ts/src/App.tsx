import React from 'react';
import Todolist from './component/TodoList';

const App: React.FC = () => {
  const todos = [
    { id: '1', text: 'hello' },
    { id: '2', text: 'world' },
  ];

  return (
    <div className="App">
      {/* A component that adds todos */}
      <Todolist items={todos} />
    </div>
  );
};

export default App;
