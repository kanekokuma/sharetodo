// src/components/TodoItem.js
import React, { useState } from 'react';
import { useTodos } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleProgressChange = (e) => {
    updateTodo(todo.id, { progress: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const sanitizedTask = editedTask.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    updateTodo(todo.id, { task: sanitizedTask });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '不明';
    // Firebase TimestampオブジェクトをDateオブジェクトに変換
    const date = timestamp.toDate();
    return date.toLocaleString('ja-JP'); // 日本のロケールで整形
  };

  return (
    <li className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-100 p-4 mb-3 rounded-lg shadow-sm">
      <div className="flex-1 mb-2 md:mb-0">
        <p className="text-sm text-gray-600">投稿者: {todo.name}</p>
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.task}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">投稿日時: {formatTimestamp(todo.createdAt)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <select
          value={todo.progress}
          onChange={handleProgressChange}
          className="border p-1 rounded text-sm"
        >
          <option value="20%">20%</option>
          <option value="40%">40%</option>
          <option value="60%">60%</option>
          <option value="80%">80%</option>
          <option value="完了">完了</option> {/* 完了状態もここで表現可能 */}
        </select>
        <button
          onClick={handleToggleComplete}
          className={`px-3 py-1 rounded text-white text-sm ${
            todo.completed ? 'bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {todo.completed ? '完了済み' : '完了にする'}
        </button>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            保存
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm"
          >
            編集
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          削除
        </button>
      </div>
    </li>
  );
}

export default TodoItem;