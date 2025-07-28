// src/contexts/ForumContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, serverTimestamp } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const ForumContext = createContext();

export const useForum = () => {
  return useContext(ForumContext);
};

export const ForumProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPost = async (author, message) => {
    if (!author || !message) {
      alert("名前とメッセージは必須です。");
      return;
    }
    if (!confirm("掲示板に投稿しますか？")) return;
    try {
      await addDoc(collection(db, "posts"), {
        author,
        message,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding post: ", e);
      alert("投稿に失敗しました。");
    }
  };

  const updatePost = async (id, updatedFields) => {
    if (!confirm("投稿を更新しますか？")) return;
    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, updatedFields);
    } catch (e) {
      console.error("Error updating post: ", e);
      alert("投稿の更新に失敗しました。");
    }
  };

  const deletePost = async (id) => {
    if (!confirm("投稿を削除しますか？")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (e) {
      console.error("Error deleting post: ", e);
      alert("投稿の削除に失敗しました。");
    }
  };

  const value = {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
  };

  return (
    <ForumContext.Provider value={value}>
      {children}
    </ForumContext.Provider>
  );
};