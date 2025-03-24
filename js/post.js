import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {
  document.body.innerHTML = "<p>Missing slug.</p>";
  throw new Error("Missing slug");
}

const q = query(collection(db, "posts"), where("slug", "==", slug));
const snapshot = await getDocs(q);

if (snapshot.empty) {
  document.body.innerHTML = "<p>Post not found.</p>";
} else {
  const docSnap = snapshot.docs[0].data();

  document.getElementById("title").textContent = docSnap.title;
  document.getElementById("content").innerHTML = marked.parse(docSnap.content);

  if (docSnap.image) {
    const img = document.getElementById("image");
    img.src = docSnap.image;
    img.style.display = "block";
  }
}
