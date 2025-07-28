// netlify/functions/addTodo.js (例)
const { addDoc, collection, Timestamp } = require("firebase/firestore");
const { db } = require("../../src/firebase"); // firebase.jsのパスを調整
const DOMPurify = require('dompurify'); // npm install dompurify

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, task } = JSON.parse(event.body);

    // DOMPurifyでサニタイズ
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedTask = DOMPurify.sanitize(task);

    await addDoc(collection(db, "todos"), {
      name: sanitizedName,
      task: sanitizedTask,
      completed: false,
      progress: "20%",
      createdAt: Timestamp.now(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "TODO added successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};