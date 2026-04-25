const TWELVE_HOURS = 12 * 60 * 60 * 1000;

/* ── Inject gate styles ── */
const gateStyle = document.createElement("style");
gateStyle.textContent = `
  .gate-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10,10,8,0.65);
    backdrop-filter: blur(12px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  }
  body.gate-active > *:not(#accessGate) {
    filter: blur(10px);
    pointer-events: none;
    user-select: none;
  }
  .gate-box {
    width: min(540px, 92%);
    background: linear-gradient(180deg, #1a1a17, #111110);
    border: 1px solid rgba(255,255,255,0.12);
    padding: 2.2rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  }
  .gate-tag {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #c8922a;
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .gate-tag::before, .gate-tag::after {
    content: '';
    display: block;
    height: 1px;
    width: 2rem;
    background: #c8922a;
    opacity: 0.4;
  }
  .gate-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    letter-spacing: 0.15em;
    color: #e8e4d9;
    margin-bottom: 0.5rem;
  }
  .gate-intro {
    font-family: 'Barlow', sans-serif;
    font-size: 0.88rem;
    color: #8a8678;
    line-height: 1.7;
    margin-bottom: 1.75rem;
  }
  .gate-checks {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 1.75rem;
  }
  .gate-check-item {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
  }
  .gate-check-item input[type="checkbox"] {
    margin-top: 3px;
    accent-color: #c8922a;
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .gate-check-label {
    font-family: 'Barlow', sans-serif;
    font-size: 0.88rem;
    color: #e8e4d9;
    line-height: 1.6;
    cursor: pointer;
  }
  .gate-check-label .gate-cite {
    color: #c8922a;
  }
  .gate-sublist {
    margin: 0.5rem 0 0 0;
    padding-left: 1.1rem;
    font-size: 0.8rem;
    color: #8a8678;
    line-height: 1.8;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .gate-divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
  .gate-actions {
    display: flex;
    gap: 0.75rem;
  }
  .gate-confirm {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #c8922a;
    background: #c8922a;
    color: #0a0a08;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: not-allowed;
    opacity: 0.35;
    transition: all 0.2s;
  }
  .gate-confirm.ready {
    cursor: pointer;
    opacity: 1;
  }
  .gate-confirm.ready:hover {
    background: #e8a830;
    border-color: #e8a830;
  }
  .gate-deny {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    color: #8a8678;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }
  .gate-deny:hover {
    border-color: #9a4a4a;
    color: #9a4a4a;
  }
  .gate-fine {
    margin-top: 1.1rem;
    font-family: 'Barlow', sans-serif;
    font-size: 0.7rem;
    color: #8a8678;
    opacity: 0.6;
    text-align: center;
    line-height: 1.6;
  }
`;
document.head.appendChild(gateStyle);

/* ── Inject gate HTML ── */
const gateEl = document.createElement("div");
gateEl.id = "accessGate";
gateEl.className = "gate-overlay";
gateEl.innerHTML = `
  <div class="gate-box">
    <div class="gate-tag">Before You Continue</div>
    <div class="gate-title">ACCESS CONFIRMATION</div>
    <div class="gate-intro">
      To comply with U.S. export control regulations, including ITAR and EAR, you must confirm the following before accessing this site.
    </div>
    <div class="gate-checks">
      <div class="gate-check-item">
        <input type="checkbox" id="gateCb1">
        <label for="gateCb1" class="gate-check-label">
          I confirm that I am a U.S. person or represent a qualifying U.S. entity, as defined under <span class="gate-cite">22 CFR § 120.62</span>. This includes:
          <ul class="gate-sublist">
            <li>A U.S. citizen (by birth or naturalization)</li>
            <li>A lawful permanent resident (Green Card holder, 8 U.S.C. § 1101(a)(20))</li>
            <li>A protected individual granted refugee or asylee status (8 U.S.C. § 1324b(a)(3))</li>
            <li>An organization incorporated or authorized to do business in the U.S.</li>
            <li>A federal, state, or local government agency</li>
          </ul>
        </label>
      </div>
      <div class="gate-divider"></div>
      <div class="gate-check-item">
        <input type="checkbox" id="gateCb2">
        <label for="gateCb2" class="gate-check-label">
          I confirm that I am physically located within the United States and am not accessing this site through a VPN, proxy, anonymization service, or similar tool.
        </label>
      </div>
      <div class="gate-divider"></div>
      <div class="gate-check-item">
        <input type="checkbox" id="gateCb3">
        <label for="gateCb3" class="gate-check-label">
          I am at least 18 years of age.
        </label>
      </div>
    </div>
    <div class="gate-actions">
      <button class="gate-confirm" id="gateConfirmBtn" disabled onclick="allowAccess()">Confirm Access</button>
      <button class="gate-deny" onclick="denyAccess()">I Do Not Qualify</button>
    </div>
    <div class="gate-fine">
      By confirming, you certify under penalty of applicable law that the above statements are true. Misrepresentation may constitute a violation of U.S. export control laws.
    </div>
  </div>
`;
document.body.appendChild(gateEl);

/* ── Checkbox logic ── */
["gateCb1", "gateCb2", "gateCb3"].forEach(id => {
  document.getElementById(id).addEventListener("change", () => {
    const allChecked =
      document.getElementById("gateCb1").checked &&
      document.getElementById("gateCb2").checked &&
      document.getElementById("gateCb3").checked;
    const btn = document.getElementById("gateConfirmBtn");
    btn.disabled = !allChecked;
    btn.classList.toggle("ready", allChecked);
  });
});

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

/* ── Gate Check ── */
function checkGate() {
  const data  = JSON.parse(localStorage.getItem("ursus_gate") || "null");
  const valid = data && data.allowed === true && (Date.now() - data.time < TWELVE_HOURS);
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
