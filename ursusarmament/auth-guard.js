console.log("AUTH GUARD LOADED");

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 Gate function
async function enforceGate(user) {
  // Not logged in → redirect to login
  if (!user) {
    window.location.replace("/ursusarmament/login/");
    return;
  }

  try {
    // Look up Firestore doc by email prefix (e.g. "johndoe" from "johndoe@gmail.com")
    const emailPrefix = user.email.split("@")[0];
    const snap = await getDoc(doc(window.firebaseDB, "users", emailPrefix));
    const data = snap.data();

    // Block if no record, not approved, or status not approved
    if (!data || data.e_approved !== true || data.f_status !== "approved") {
      window.location.replace("/ursusarmament/pending/");
      return;
    }

    // ✅ Allowed access (page continues normally)

  } catch (error) {
    console.error("Auth gate error:", error);
    window.location.replace("/ursusarmament/login/");
  }
}

// 👀 Run gate check on auth state change
onAuthStateChanged(window.firebaseAuth, (user) => {
  console.log("AUTH STATE:", user);
  enforceGate(user);
});
