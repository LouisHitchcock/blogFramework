import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const postsDiv = document.getElementById("posts");

const q = query(collection(db, "posts"), orderBy("created", "desc"));
const snapshot = await getDocs(q);

snapshot.forEach(doc => {
  const data = doc.data();

  const card = document.createElement("a");
  card.href = `post.html?id=${doc.id}`;
  card.className = "post-card";

  const title = document.createElement("h2");
  title.textContent = data.title || "Untitled Post";

  const readMore = document.createElement("p");
  readMore.textContent = "Read More";
  readMore.className = "read-more";

  card.appendChild(title);
  card.appendChild(readMore);
  postsDiv.appendChild(card);
});
