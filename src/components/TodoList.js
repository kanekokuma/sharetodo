// src/components/TodoList.js
import React from 'react';
import { useTodos } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

function TodoList() {
  const { todos, loading } = useTodos();

  if (loading) {
    return <p className="text-center text-gray-600">TODOを読み込み中...</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">共有TODOリスト</h2>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">まだTODOがありません。最初のTODOを追加しましょう！</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;