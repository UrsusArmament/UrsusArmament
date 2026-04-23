console.log("AUTH GUARD LOADED");

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 Gate function
async function enforceGate(user) {
  // Not logged in → redirect to login
  if (!user) {
    window.location.href = "/ursusarmament/login.html";
    return;
  }

  try {
    // Get user record from Firestore
    const snap = await getDoc(doc(window.firebaseDB, "users", user.uid));
    const data = snap.data();

    // Block if no record or not approved
    if (!data || data.approved !== true) {
      window.location.href = "/ursusarmament/pending.html";
      return;
    }

    // Allowed access
    document.body.style.display = "block";

  } catch (error) {
    console.error("Auth gate error:", error);
    window.location.href = "/ursusarmament/login.html";
  }
}

// 👀 Run gate check on auth state change
onAuthStateChanged(window.firebaseAuth, (user) => {
  console.log("AUTH STATE:", user);
});
