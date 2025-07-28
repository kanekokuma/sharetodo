// src/components/ForumPost.js
import React, { useState } from 'react';
import { useForum } from '../contexts/ForumContext';

function ForumPost({ post }) {
  const { updatePost, deletePost } = useForum();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(post.message);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const sanitizedMessage = editedMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    updatePost(post.id, { message: sanitizedMessage });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '不明';
    const date = timestamp.toDate();
    return date.toLocaleString('ja-JP');
  };

  return (
    <li className="bg-gray-100 p-4 mb-3 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600">投稿者: {post.author}</p>
      {isEditing ? (
        <textarea
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          className="border p-1 rounded w-full h-20"
        ></textarea>
      ) : (
        <p className="text-lg text-gray-800 break-words whitespace-pre-wrap">
          {post.message}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-1">投稿日時: {formatTimestamp(post.createdAt)}</p>
      <div className="mt-2 flex space-x-2">
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

export default ForumPost;