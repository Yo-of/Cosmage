const PLANETS = {
  earth:   { name: "Earth",   yearDays: 365.25,   dayHours: 24,     symbol: "🌍", fact: "Earth completes one orbit around the Sun every 365.25 days. Our entiry calendar is built around this very single cosmic cycle. " },
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

const params = new URLSearchParams(window.location.search);
if (params.get("dob")) document.getElementById("dob").value = params.get("dob");
if (params.get("planet") && PLANETS[params.get("planet")]) {
  selectedPlanet = params.get("planet");
  document.querySelector(".planet-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.planet === selectedPlanet);
  });
}

const dobInput = document.getElementById("dob");
dobInput.max = new Date().toISOString().split("T")[0];
dobInput.addEventListener("change", () => { render(); updateURL(); });

const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

function selectPlanet(btn) {
  document.querySelectorAll(".planet-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedPlanet = btn.dataset.planet;
  render();
  updateURL();
}

function updateURL() {
  const val = dobIput.value;
  if (!val) return;
  const url = new URL(window.location.href);
  url.searchParams.set("dob", value);
  url.searchParams.set("planet", selectedPlanet);
  window.history.replaceState( {}, "", url.toString() );
}

function fmt(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + " trillion";
  if (n >= 1e9)  return (n / 1e9).toFixed(2) + " billion";
  if (n >= 1e6)  return (n / 1e6).toFixed(2) + " million";
  return Math.round(n).toLocaleString();
}

function fmtDaysUntil(earthDays) {
  if (earthDays < 1) return "Less than a day";
  if (earthDays < 30) return `${Math.round(earthDays)} Earth days`;
  if (earthDays < 365) return `~${Math.round(earthDays / 30.44)} months`;
  return `~${(earthDays / 365.25).toFixed(1)} Earth years`; 
}

function render() {
  const area = document.getElementById("results-area");
  const val = dobInput.value;

  if (!val) {
    area.innerHTML = '<div class="empty-state">Enter your birthdate to dive into your cosmic journey.</div>';
    return;
  }

  const msAlive = new Date() - new Date(val);
  if (msAlive <= 0) {
    area.innerHTML = '<div class="empty-state">Birthdate must be in the past.</div>';
    return;
  }

  const p = PLANETS[selectedPlanet];
  const seconds      = msAlive / 1000;
  const minutes      = seconds / 60;
  const hours        = minutes / 60;
  const earthDays    = hours / 24;
  const planetDays   = (hours * 24) / p.dayHours;
  const planetWeeks  = planetDays / 7;
  const planetYears  = earthDays / p.yearDays;
  const planetMonths = planetYears * 12;
  const e = selectedPlanet === "earth";

  area.innerHTML = `
    <div class="results-grid">
      <div class="metric-card"><div class="metric-label">Seconds</div><div class="metric-value">${fmt(seconds)}</div></div>
      <div class="metric-card"><div class="metric-label">Minutes</div><div class="metric-value">${fmt(minutes)}</div></div>
      <div class="metric-card"><div class="metric-label">Hours</div><div class="metric-value">${fmt(hours)}</div></div>
      <div class="metric-card"><div class="metric-label">${e ? "Days" : `Days on ${p.name}`}</div><div class="metric-value">${fmt(planetDays)}</div></div>
      <div class="metric-card"><div class="metric-label">${e ? "Weeks" : `Weeks on ${p.name}`}</div><div class="metric-value">${fmt(planetWeeks)}</div></div>
      <div class="metric-card"><div class="metric-label">${e ? "Months" : `${p.name} Months`}</div><div class="metric-value">${fmt(planetMonths)}</div></div>
      <div class="metric-card"><div class="metric-label">${e ? "Years" : `Years on ${p.name}`}</div><div class="metric-value">${parseFloat(planetYears.toFixed(2)).toLocaleString()}</div></div>
    </div>
    <div class="planet-fact"><strong>${p.symbol} ${p.name}</strong>${p.fact}</div>
  `;
}