const PLANETS = {
  earth:   { name: "Earth",   yearDays: 365.25,   dayHours: 24,     symbol: "🌍", fact: "The Earth completes one orbit around the Sun every 365.25 days. Our entiry calendar is built around this very single cosmic cycle. " },
  mercury: { name: "Mercury", yearDays: 87.97,    dayHours: 1407.6, symbol: "☿",  fact: "A Mercury day (from sunrise to sunset) lasts around 176 Earth days which is longer than its year! Temperatures there swings between -180°C and 430°C. " },
  venus:   { name: "Venus",   yearDays: 224.7,    dayHours: 5832,   symbol: "♀",  fact: "Venus rotates backwards (we can also say retrograde), so the Sun rise from the west. A Venus day is longer than it's entire year. " },
  mars:    { name: "Mars",    yearDays: 686.97,   dayHours: 24.62,  symbol: "♂",  fact: "A Martian day (also called a Sol) is just 37 minutes longer than an Earth's one. Mars host the tallest volcano in the solar system: Olympus Mons. " },
  jupiter: { name: "Jupiter", yearDays: 4332.59,  dayHours: 9.93,   symbol: "♃",  fact: "Jupiter is the planet with the shortest day of the solar system (only 10 hours) and that's despite being the largest one. Its Great Red Spot storm is over 350 years old." },
  saturn:  { name: "Saturn",  yearDays: 10759.22, dayHours: 10.66,  symbol: "♄",  fact: "Saturn's rings span 282,000 km but are only ~10 meters thick. It's so low-density it would float on water. " },
  uranus:  { name: "Uranus",  yearDays: 30688.5,  dayHours: 17.23,  symbol: "⛢",  fact: "Uranus is tilted 98° on it's side. This cause its poles to experience 42 years of continuous sunlight then 42 years of total darkness. " },
  neptune: { name: "Neptune", yearDays: 60182,    dayHours: 16.11,  symbol: "♆",  fact: "Since its discovery in 1846, Neptune has completed just one full orbit. Its winds reach 2,100 km/h. Than make them the fastest winds in the solar system. ", },
  pluto: { name: "Pluto", yearDays: 90560, dayHours: 153.3, symbol: "⯓", fact: "Pluto was reclassified as a dwarf planet in 2006 (what a downgrade be grateful you aren't reclassified as a sandwich). It has hearth-shaped nitrogen ice plain called Tombaugh Regio. One Pluto year is 248 Earth years, so since it's discovery in 1930, it has completed just 1/3 of its orbit around the Sun.", },
  sun: { name: "Sun", yearDays:365.25, dayHours: 609.12, symbol: "☀", fact: "The Sun rotates faster at its equator (around 25 days) than at its poles (around 35 days). A days at the Sun's equator is about 609 hours long. The Sun is so huge that about 1.3 million Earths could fit inside it. The Sun alone contait 99.86% of the total mass of the solar system (so take it easy you aren't that fat).", },
};

let selectedPlanet = "earth";
let tickInterval = null;
let confettiFrame = null;
 
// URL params
const params = new URLSearchParams(window.location.search);
if (params.get("dob")) document.getElementById("dob").value = params.get("dob");
if (params.get("planet") && PLANETS[params.get("planet")]) {
  selectedPlanet = params.get("planet");
  document.querySelectorAll(".planet-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.planet === selectedPlanet);
  });
}
 
const dobInput = document.getElementById("dob");
dobInput.max = new Date().toISOString().split("T")[0];
dobInput.addEventListener("change", () => { render(); updateURL(); });
 
// theme
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});
 
function selectPlanet(btn) {
  document.querySelectorAll(".planet-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedPlanet = btn.dataset.planet;
  render(); updateURL();
}
 
function updateURL() {
  const val = dobInput.value;
  if (!val) return;
  const url = new URL(window.location.href);
  url.searchParams.set("dob", val);
  url.searchParams.set("planet", selectedPlanet);
  window.history.replaceState({}, "", url.toString());
}
 
function fmt(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + " trillion";
  return Math.round(n).toLocaleString();
}
 
function fmtDaysUntil(earthDays) {
  if (earthDays < 1)   return "less than a day";
  if (earthDays < 30)  return `${Math.round(earthDays)} Earth days`;
  if (earthDays < 365) return `~${Math.round(earthDays / 30.44)} months`;
  return `~${(earthDays / 365.25).toFixed(1)} Earth years`;
}
 
function isBirthdayToday(dob, key) {
  const p = PLANETS[key];
  const earthDays = (Date.now() - dob.getTime()) / 86400000;
  const planetYears = earthDays / p.yearDays;
  const prevCheck = ((earthDays - 1) / p.yearDays);
  return Math.floor(planetYears) > Math.floor(prevCheck);
}
 
function daysUntilNextBirthday(dob, key) {
  const p = PLANETS[key];
  const earthDays = (Date.now() - dob.getTime()) / 86400000;
  const planetYears = earthDays / p.yearDays;
  return (Math.ceil(planetYears) * p.yearDays) - earthDays;
}
 
function updateBirthdayBadges(dob) {
  document.querySelectorAll(".planet-btn").forEach(btn => {
    const ex = btn.querySelector(".bday-badge");
    if (ex) ex.remove();
    if (isBirthdayToday(dob, btn.dataset.planet)) {
      const badge = document.createElement("div");
      badge.className = "bday-badge";
      btn.appendChild(badge);
    }
  });
}
 
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ["#7b6cff","#f59e0b","#22c55e","#f43f5e","#38bdf8","#fb923c"];
  const particles = Array.from({length: 130}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 3 + 1.5,
    spin: Math.random() * 0.2 - 0.1,
    angle: Math.random() * Math.PI * 2,
  }));
  if (confettiFrame) cancelAnimationFrame(confettiFrame);
  let ticks = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speed; p.angle += p.spin;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 1.6);
      ctx.restore();
    });
    ticks++;
    if (ticks < 200) confettiFrame = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}
 
window.copyResults = function() {
  const val = dobInput.value;
  if (!val) return;
  const p = PLANETS[selectedPlanet];
  const ms = Date.now() - new Date(val).getTime();
  const seconds = ms / 1000;
  const earthDays = seconds / 86400;
  const planetYears = earthDays / p.yearDays;
  const text = [
    `🪐 My age on ${p.name}:`,
    `• ${fmt(seconds)} seconds`,
    `• ${fmt(seconds/60)} minutes`,
    `• ${fmt(seconds/3600)} hours`,
    `• ${parseFloat(planetYears.toFixed(2)).toLocaleString()} ${p.name} years`,
    ``,
    `Calculate yours → ${window.location.href}`,
  ].join("\n");
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-btn");
    btn.textContent = "✓ Copied!"; btn.classList.add("copied");
    setTimeout(() => { btn.textContent = "📋 Copy results"; btn.classList.remove("copied"); }, 2000);
  });
};
 
window.shareURL = function() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = document.getElementById("share-btn");
    btn.textContent = "✓ Link copied!"; btn.classList.add("copied");
    setTimeout(() => { btn.textContent = "🔗 Share link"; btn.classList.remove("copied"); }, 2000);
  });
};
 
function render() {
  const val = dobInput.value;
  const area = document.getElementById("results-area");
  if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
 
  if (!val) {
    area.innerHTML = '<div class="empty-state">Enter your birthdate to dive into your cosmic journey.</div>';
    return;
  }
 
  const dob = new Date(val);
  if (Date.now() - dob.getTime() <= 0) {
    area.innerHTML = '<div class="empty-state">Birthdate must be in the past.</div>';
    return;
  }
 
  updateBirthdayBadges(dob);
  const isBday = isBirthdayToday(dob, selectedPlanet);
  if (isBday) launchConfetti();
 
  function buildHTML() {
    const p = PLANETS[selectedPlanet];
    const ms = Date.now() - dob.getTime();
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const earthDays = hours / 24;
    const planetDays = (hours * 24) / p.dayHours;
    const planetWeeks = planetDays / 7;
    const planetYears = earthDays / p.yearDays;
    const planetMonths = planetYears * 12;
    const e = selectedPlanet === "earth";
    const pct = ((planetYears % 1) * 100).toFixed(1);
    const daysLeft = daysUntilNextBirthday(dob, selectedPlanet);
    const fullMoons  = earthDays / 29.53;
    const kmTravelled = earthDays * 2573424;
    const heartbeats = seconds * 1.2;
 
    return `
      ${isBday ? `<div class="bday-banner">🎉 Happy ${p.name} Birthday! You're completing a full orbit today!</div>` : ""}
 
      <div class="results-grid">
        <div class="metric-card live">
          <div class="metric-label">Seconds ⚡</div>
          <div class="metric-value" id="live-seconds">${fmt(seconds)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Minutes</div>
          <div class="metric-value">${fmt(minutes)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Hours</div>
          <div class="metric-value">${fmt(hours)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">${e ? "Days" : `Days on ${p.name}`}</div>
          <div class="metric-value">${fmt(planetDays)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">${e ? "Weeks" : `Weeks on ${p.name}`}</div>
          <div class="metric-value">${fmt(planetWeeks)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">${e ? "Months" : `${p.name} months`}</div>
          <div class="metric-value">${fmt(planetMonths)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">${e ? "Years" : `Years on ${p.name}`}</div>
          <div class="metric-value">${parseFloat(planetYears.toFixed(2)).toLocaleString()}</div>
        </div>
      </div>
 
      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-title">Progress through current ${p.name} year</span>
          <span class="progress-pct">${pct}%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="progress-sub">Next ${p.name} birthday in <strong style="color:var(--text)">${fmtDaysUntil(daysLeft)}</strong></div>
      </div>
 
      <div class="fun-section">
        <div class="fun-title">In your lifetime on Earth…</div>
        <div class="fun-grid">
          <div class="fun-item"><span>🌕</span><span>You've seen <strong>${fmt(fullMoons)}</strong> full moons</span></div>
          <div class="fun-item"><span>🛸</span><span>Traveled <strong>${fmt(kmTravelled)} km</strong> around the Sun</span></div>
          <div class="fun-item"><span>❤️</span><span>Your heart beat <strong>${fmt(heartbeats)}</strong> times</span></div>
          <div class="fun-item"><span>🌅</span><span>Witnessed <strong>${fmt(earthDays)}</strong> Earth sunrises</span></div>
        </div>
      </div>
 
      <div class="planet-fact">
        <strong>${p.symbol} ${p.name}</strong>${p.fact}
      </div>
 
      <div class="action-row">
        <button class="action-btn" id="copy-btn" onclick="copyResults()">📋 Copy results</button>
        <button class="action-btn" id="share-btn" onclick="shareURL()">🔗 Share link</button>
      </div>
    `;
  }
 
  area.innerHTML = buildHTML();
 
  // live seconds ticker
  tickInterval = setInterval(() => {
    const el = document.getElementById("live-seconds");
    if (!el) { clearInterval(tickInterval); return; }
    el.textContent = fmt((Date.now() - dob.getTime()) / 1000);
  }, 1000);
}
 
if (dobInput.value) render();