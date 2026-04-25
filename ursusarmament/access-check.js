const TWELVE_HOURS = 12 * 60 * 60 * 1000;
const ONE_HOUR     = 60 * 60 * 1000;

/* ── Region Check ── */
async function checkRegion() {
  const cached = JSON.parse(localStorage.getItem("ursus_region") || "null");
  if (cached && cached.us === true && (Date.now() - cached.time < TWELVE_HOURS)) {
    console.log("[Ursus Region] Cache hit — US verified, skipping API call. Expires in", Math.round((TWELVE_HOURS - (Date.now() - cached.time)) / 60000), "minutes.");
    return;
  }
  console.log("[Ursus Region] No valid cache — calling ipapi.co...");
  try {
    const res  = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    console.log("[Ursus Region] API response — country:", data.country_code, "| city:", data.city, "| region:", data.region);
    if (data.country_code === "US") {
      localStorage.setItem("ursus_region", JSON.stringify({ us: true, time: Date.now() }));
      console.log("[Ursus Region] US confirmed — cached for 12 hours.");
    } else {
      localStorage.removeItem("ursus_region");
      console.warn("[Ursus Region] Non-US detected (" + data.country_code + ") — redirecting.");
      window.location.href = "/ursusarmament/accessrestriction/";
    }
  } catch (e) {
    console.warn("[Ursus Region] API call failed — failing open:", e);
  }
}

/* ── Age / US Person Gate ── */
function checkGate() {
  const data  = JSON.parse(localStorage.getItem("ursus_gate") || "null");
  const valid = data && data.allowed === true && (Date.now() - data.time < ONE_HOUR);
  if (valid) return;
  document.body.classList.add("gate-active");
  document.getElementById("accessGate").style.display = "flex";
}

function allowAccess() {
  localStorage.setItem("ursus_gate", JSON.stringify({ allowed: true, time: Date.now() }));
  document.body.classList.remove("gate-active");
  document.getElementById("accessGate").style.display = "none";
}

function denyAccess() {
  window.location.href = "/ursusarmament/accessrestriction/";
}

/* ── Run on every page load ── */
window.addEventListener("load", async () => {
  await checkRegion();
  checkGate();
});
