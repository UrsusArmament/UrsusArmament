import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAY_4dHMxnUedsOeyA3LTKz5AGC3xCZLA",
  authDomain: "ursus-armament.firebaseapp.com",
  projectId: "ursus-armament",
  storageBucket: "ursus-armament.firebasestorage.app",
  messagingSenderId: "430731167862",
  appId: "1:430731167862:web:a5447de86db180edad3757"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth + DB
const auth = getAuth(app);
const db = getFirestore(app);

// 🌐 Make available globally for other scripts (important for auth-guard.js)
window.firebaseAuth = auth;
window.firebaseDB = db;
