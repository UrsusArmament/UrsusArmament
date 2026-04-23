import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 Firebase configuration (REPLACE WITH YOUR REAL VALUES)
const firebaseConfig = {
  apiKey: "AIzaSyAAY_4dHMxnUedsOeyA3LTKz5AGC3xCZLA",
  authDomain: "ursus-armament.firebaseapp.com",
  projectId: "ursus-armament",
  storageBucket: "ursus-armament.firebasestorage.app",
  messagingSenderId: "430731167862",
  appId: "1:430731167862:web:a5447de86db180edad3757"
};

// 🚀 Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔐 Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// 🌐 Make available globally for other modules (IMPORTANT)
window.firebaseAuth = auth;
window.firebaseDB = db;

// 🧪 Debug checks
console.log("FIREBASE INIT LOADED");
console.log("Auth ready:", !!window.firebaseAuth);
console.log("DB ready:", !!window.firebaseDB);
