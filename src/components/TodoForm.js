// src/components/TodoForm.js
import React, { useState } from 'react';
import { useTodos } from '../contexts/TodoContext';

function TodoForm() {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    // HTMLエスケープ（簡易的な例、より厳密にはサーバーサイドでサニタイズ）
    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedTask = task.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    addTodo(sanitizedName, sanitizedTask);
    setName('');
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          名前:
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="task" className="block text-gray-700 text-sm font-bold mb-2">
          やること:
        </label>
        <input
          type="text"
          id="task"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        TODOを追加
      </button>
    </form>
  );
}

export default TodoForm;