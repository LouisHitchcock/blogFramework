import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const id = params.get("id");

const titleEl = document.getElementById("title");
const dateEl = document.getElementById("date");
const imageEl = document.getElementById("image");
const contentEl = document.getElementById("content");

function renderPost(data) {
  titleEl.textContent = data.title;

  if (data.created && data.created.toDate) {
    const date = data.created.toDate();
    dateEl.textContent = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  if (data.image) {
    imageEl.src = data.image;
    imageEl.style.display = "block";
  }

  const rawHTML = marked.parse(data.content);
  contentEl.innerHTML = DOMPurify.sanitize(rawHTML);

}

if (slug) {
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    renderPost(snapshot.docs[0].data());
  } else {
    document.body.innerHTML = "<p>Post not found.</p>";
  }
} else if (id) {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    renderPost(docSnap.data());
  } else {
    document.body.innerHTML = "<p>Post not found.</p>";
  }
} else {
  document.body.innerHTML = "<p>Missing slug or ID.</p>";
}
