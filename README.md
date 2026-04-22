# 🪐 Cosmage — Cosmic Age Calculator

Ever wondered how old you'd be if you were born on Mars? Or how many Jupiter years you've lived?
That's literally why I built this.

Cosmage calculates your age across every planet in the solar system in seconds, minutes, hours,
days, weeks, months, and years. Because why settle for just one age when you can have ten.

🔗 **Live site → [cosmage.netlify.app](https://cosmage.netlify.app)**

---

## What it does

- Pick any planet (yes, Pluto is in there. it deserves respect even tho it became a fallen ang- hum planet)
- See your age in every unit of time, calculated using that planet's actual orbital period
- Watch your seconds tick live in real time
- See how far you are through your current planetary year
- Find out when your next birthday is on each planet
- Get fun facts like how many full moons you've lived through or how far you've traveled around the Sun
- If today is your birthday on a planet: confetti! obviously.
- Dark and light mode because not everyone likes staring at a black screen (still don't understand them it burn the eyes)
- Share your results via a link so your friends can feel existentially small too

---

## How to run it locally

No installs. No npm. No nonsense.

1. Download the 3 files
2. Put them in the same folder
3. Open `index.html` in your browser
4. That's it

```bash
git clone https://github.com/your-username/cosmage.git
cd cosmage
open index.html
```

---

## Project structure

```
cosmage/
├── index.html   → the structure
├── style.css    → the looks
└── script.js    → the brains
```

---

## The math (it's not that scary)

Every planet has an orbital period (how long its year is in Earth days) and a day length.
I take how many milliseconds you've been alive, convert to Earth days, then divide by the
planet's year length. That's your planetary age. The rest is just formatting.

| Planet  | Year (Earth days) | Day length (hours) |
|---------|-------------------|--------------------|
| Mercury | 87.97             | 1,407.6            |
| Venus   | 224.7             | 5,832              |
| Earth   | 365.25            | 24                 |
| Mars    | 686.97            | 24.62              |
| Jupiter | 4,332.59          | 9.93               |
| Saturn  | 10,759.22         | 10.66              |
| Uranus  | 30,688.5          | 17.23              |
| Neptune | 60,182            | 16.11              |
| Pluto   | 90,560            | 153.29             |
| Sun     | 365.25            | 609.12             |

---

## Sharing

When you enter a date and pick a planet, the URL updates automatically

## Built with

Just HTML, CSS, and vanilla JavaScript. No frameworks, no libraries, no dependencies.
Built this entirely from scratch.

---

## AI Usage

I won't lie I used a little bit of AI mainly for getting the information and fun-facts. I also used it to format this README since I still didn't learned MARKDOWN (I know... I'll have to learn at some point but not today)

## License

MIT — do whatever you want with it.