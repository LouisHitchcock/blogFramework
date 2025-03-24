// js/create.js
import { db } from "./firebase.js";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById("submit").onclick = async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const docRef = await addDoc(collection(db, "posts"), {
    title,
    content,
    created: Timestamp.now()
  });

  window.location.href = `post.html?id=${docRef.id}`;
};
