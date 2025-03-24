# 🔥 Minimal Frontend Blog with Firebase

This is a simple, frontend-only blog site built with vanilla HTML, CSS, and JavaScript — powered by **Firebase Firestore** for post storage. No frameworks, no Node.js, no build tools — just clean static files.

## ✨ Features

- Create blog posts (title, content, optional image)
- Dynamic slug-based URLs for blog posts (SEO-friendly)
- Duplicate title handling (`-2`, `-3`, etc.)
- Markdown support in post content
- **Automatic XSS protection** with DOMPurify
- Post creation timestamps displayed on each post
- 3x3 responsive grid display on homepage
- Mobile-friendly layout
- Firebase Firestore as the database
- Fully client-side with no backend required

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/your-blog.git
cd your-blog
```

### 2. Set up Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable **Firestore Database**
- Register a web app and get your **Firebase config**

### 3. Add your Firebase config

Create a file called `js/firebase-config.js`:

```js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};
```

> 🔐 **Important**: Do not commit this file. It's listed in `.gitignore`.

Then in `js/firebase.js`, import it:

```js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

### 4. Run Locally

Because this project uses ES Modules, you'll need to run a local server.

With Python:
```bash
python -m http.server 8080
```

Then open: `http://localhost:8080/index.html`

With VS Code:
- Install the Live Server extension
- Right-click `index.html` → "Open with Live Server"

---

## 🔐 Firebase Security Tips

Even though Firebase config is public, lock down access:

### 🔒 Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null; // require auth if needed
    }
  }
}
```

### 🔒 Restrict API Key

Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials), select your API key, and:

- Restrict usage by **HTTP referrer**
- Add `http://localhost:8080/*` for local
- Add your domain (if hosted)

---

## 🛡 XSS Protection

To protect against malicious content in blog posts:

- We use [`DOMPurify`](https://github.com/cure53/DOMPurify) to sanitize all Markdown output
- This removes any embedded `<script>` or dangerous HTML
- Safe to render user-submitted Markdown content

---

## 🛠 Project Structure

```
├── index.html         # Post grid view
├── create.html        # New post form
├── post.html          # View individual post
├── style.css          # Shared styling
└── js/
    ├── index.js       # Load posts to grid
    ├── create.js      # Submit new post with slug
    ├── post.js        # Display post by slug or ID, with date
    ├── firebase.js    # Firebase init
    └── firebase-config.js  # Your secret config (gitignored)
```

---

## 📦 Deployment

You can deploy using:
- Firebase Hosting (`firebase deploy`)
- GitHub Pages
- Netlify / Vercel (just drag & drop the folder)

---

## 🧪 Future Ideas

- Image uploads with Firebase Storage
- Search or filter by tags
- Auth + admin-only posting
- WYSIWYG Markdown editor

---

## 📄 License

MIT — feel free to use, fork, or modify.

---

Built with ❤️ using Firebase + Vanilla JS.
