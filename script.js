const PLANETS = {
    earth: { name: "Earth", yearDays: 365.25, dayHours: 24, symbol: "🌍", fact: "Earth completes one orbit around the Sun every 365.25 days. Our entiry calendar is built around this very single cosmic cycle." },
    mercury: { name: "Mercury", yearDays: 87.97, dayHours: 1407.6, symbol: "☿", fact: "A Mercury day (from sunrise to sunset) lasts around 176 Earth days which is longer than its year! Temperatures there swings between -180°C and 430°C." },
    venus: { name: "Venus", yearDays: 224.7, dayHours: 5832, symbol:"♀", fact: "Venus rotates backwards (we can also say retrograde), so the Sun rise from the west. A Venus day is longer than it's entire year." },
    mars: { name: "Mars", yearDays: 686.97, dayHours: 24.62, symbol:"♂", fact: "A Martian day (also called a Sol) is just 37 minutes longer than an Earth's one. Mars host the tallest volcano in the solar system: Olympus Mons." },
    jupiter: { name: "Jupiter", yearDays: 4332.59, dayHours: 9.93, symbol: "♃", fact: "Jupiter is the planet with the shortest day of the solar system (only 10 hours), despite being the largest one. Its Great Red Spot storm is over 350 years old" },
    saturn: { name: "Saturn", yearDays: 10759.22, dayHours: 10.66, symbol: "♄", fact: "Saturn's rings span 282,000 km but are only ~10 meters thick. It's so low-density it would float on water." },
    uranus: { name: "Uranus", yearDays: 30688.5, dayHours: 17.23, symbol: "⛢", fact: "Uranus is tilted 98° on it's side. This cause its poles to experience 42 years of continuous sunlight then 42 years of total darkness" },
    neptune: { name: "Neptune", yearDays: 60182, dayHours: 16.11, symbol: "♆", fact: "Since its discovery in 1846, Neptune has completed just one full orbit. Its winds reach 2,100 km/h. Than make them the fastest winds in the solar system.", },
};

let selectPlanet = "earth";

const dobInput = document.getElementById("dob");
dobInput.max = new Date().toISOString().split("T")[0];
dobInput.addEventListener("change", render);

function selectPlanet(btn) {
    document.querySelectorAll(".planet-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add()
}