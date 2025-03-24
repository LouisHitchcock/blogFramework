import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const docRef = doc(db, "posts", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const data = docSnap.data();
  document.getElementById("title").textContent = data.title;

  // Render Markdown to HTML
  document.getElementById("content").innerHTML = marked.parse(data.content);

  if (data.image) {
    const img = document.getElementById("image");
    img.src = data.image;
    img.style.display = "block";
  }
} else {
  document.body.innerHTML = "<p>Post not found.</p>";
}
