// src/contexts/TodoContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, serverTimestamp } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const TodoContext = createContext();

export const useTodos = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (name, task) => {
    if (!name || !task) {
      alert("名前とTODO内容は必須です。");
      return;
    }
    if (!confirm("TODOを追加しますか？")) return;
    try {
      await addDoc(collection(db, "todos"), {
        name,
        task,
        completed: false,
        progress: "20%", // 初期進捗率
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("TODOの追加に失敗しました。");
    }
  };

  const updateTodo = async (id, updatedFields) => {
    if (!confirm("TODOを更新しますか？")) return;
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, updatedFields);
    } catch (e) {
      console.error("Error updating document: ", e);
      alert("TODOの更新に失敗しました。");
    }
  };

  const deleteTodo = async (id) => {
    if (!confirm("TODOを削除しますか？")) return;
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
      alert("TODOの削除に失敗しました。");
    }
  };

  const value = {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};