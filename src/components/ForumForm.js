// src/components/ForumForm.js
import React, { useState } from 'react';
import { useForum } from '../contexts/ForumContext';

function ForumForm() {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const { addPost } = useForum();

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedAuthor = author.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    addPost(sanitizedAuthor, sanitizedMessage);
    setAuthor('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">情報共有掲示板</h2>
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
          名前:
        </label>
        <input
          type="text"
          id="author"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
          メッセージ:
        </label>
        <textarea
          id="message"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        投稿
      </button>
    </form>
  );
}

export default ForumForm;