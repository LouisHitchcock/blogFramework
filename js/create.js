import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Convert title to slug format
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, '')     // trim dashes from start/end
    .replace(/--+/g, '-');       // collapse multiple dashes
}

// Ensure slug is unique
async function getUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return slug;
    count++;
    slug = `${baseSlug}-${count}`;
  }
}

document.getElementById("submit").onclick = async () => {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!title || !content) {
    alert("Please enter a title and content.");
    return;
  }

  const baseSlug = slugify(title);
  const uniqueSlug = await getUniqueSlug(baseSlug);

  const docRef = await addDoc(collection(db, "posts"), {
    title,
    content,
    image,
    slug: uniqueSlug,
    created: Timestamp.now()
  });

  window.location.href = `post.html?slug=${uniqueSlug}`;
};
