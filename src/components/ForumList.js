// src/components/ForumList.js
import React from 'react';
import { useForum } from '../contexts/ForumContext';
import ForumPost from './ForumPost';

function ForumList() {
  const { posts, loading } = useForum();

  if (loading) {
    return <p className="text-center text-gray-600">投稿を読み込み中...</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">まだ投稿がありません。最初の投稿をしましょう！</p>
      ) : (
        <ul>
          {posts.map(post => (
            <ForumPost key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ForumList;