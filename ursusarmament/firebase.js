import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth + DB
const auth = getAuth(app);
const db = getFirestore(app);

// 🌐 expose globally (IMPORTANT)
window.firebaseAuth = auth;
window.firebaseDB = db;

// 🧪 DEBUG (ADD THESE HERE)
console.log("FIREBASE INIT LOADED");
console.log("Auth:", window.firebaseAuth);
console.log("DB:", window.firebaseDB);
