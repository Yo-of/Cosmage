# Cosmage

I built this because I was bored and thought "how old would I actually be on Mars?" and then
spent way too long making it look good. here we are.

jk I built it because I have exams next week and I still need to learn 36 lessons and 3 books among others :) hc team plz don't ban me I swear I'll get a good grade (somehow)

built for **Hack Club Horizons :** https://horizons.hackclub.com

Link: **https://cosmage.netlify.app**

## okay so what does it do

you put in your birthday, pick a planet, and it tells you your age in seconds, minutes, hours,
days, weeks, months and years, but calculated using that planet's actual year and day length.

so like on Jupiter you'd be around 1.7 years old. on Mercury you're already ancient.
on Neptune nobody has even turned 1 yet since it was discovered.

also:
- the seconds counter ticks live (satisfying to watch)
- there's a progress bar showing how far you are into your current planetary year
- it tells you when your next birthday is on each planet
- fun comparisons like how many full moons you've lived through or how many km you've traveled around the Sun
- if it's your birthday on a planet, confetti drops (you're welcome)
- green dot on planet buttons where it's currently your birthday
- dark/light mode toggle
- share button that puts your birthdate + planet in the URL so your friends can see your results

## how it works

each planet has a real orbital period (how long its year is) and a real day length. i take how
many milliseconds you've been alive, convert that to Earth days, and divide by the planet's year.
that's your age. everything else is just math and formatting.

planets supported: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto and the Sun. (yes Pluto is in there. it got demoted to dwarf planet but i still respect it)

## sharing

when you pick a planet and enter your date, the URL updates automatically, send it to someone and they'll load your exact results. good for reminding your friends at 2am that you're the oldest, the best and that they should repect you because you can legally adopt them.

## stack

vanilla HTML, CSS and JavaScript. no frameworks, no libraries, no build tools.
just three files and a browser.

## AI usage

I won't lie I used a little bit of AI mainly for getting the information and fun-facts.