// src/App.js
import React from 'react';
import { TodoProvider } from './contexts/TodoContext';
import { ForumProvider } from './contexts/ForumContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ForumForm from './components/ForumForm';
import ForumList from './components/ForumList';

function App() {
  return (
    <TodoProvider>
      <ForumProvider>
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* TODOセクション */}
            <div>
              <TodoForm />
              <TodoList />
            </div>

            {/* 掲示板セクション */}
            <div>
              <ForumForm />
              <ForumList />
            </div>
          </div>
        </div>
      </ForumProvider>
    </TodoProvider>
  );
}

export default App;