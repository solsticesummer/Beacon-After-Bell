# Beacon After Bell

A student-founded non-profit based in Vancouver, BC, designed to bridge between academic years,
grades, and age groups through a highly accessible online database of resources.

Our purpose is to shift the focus from individual success to collective growth amongst high
school students, making them capable of thriving in the navigation of high school, university,
and the transition between.

**Live site:** https://solsticesummer.github.io/Beacon-After-Bell/

## What

A student-founded non-profit designed to bridge between academic years, grades, and age groups
through a highly accessible online database of resources.

## How

Main MVP: a user-friendly website organized by grade level, academics, streams, and interests.

### Planned Features

- **Living Archive / Vault** — A searchable database of successful college application essays,
  categorized by university programs and designated schools.
- **Interactive Timelines** — For grades 9–12, covering major milestones and recommended steps
  in preparation for university (course selection, competitions, APs, IB, SAT, etc.).
- **FAQ / Blog** — A space where students, graduates, and alumni contribute, comment, and discuss
  answers to common doubts — "What I Wish I Knew" and "What I Would Have Done at This Point in
  Time."
- **Monthly / Bi-weekly Interviews** — A digital series featuring interviews with successful
  students or graduates sharing and discussing their journey.
- **Common-Goal Forums** — Students tag their interests, goals, or field of study to discover
  peers with the same aspirations, facilitating study groups and shared advice.
- **Community Board**
  - *Pt. 1* — A shared calendar for deadlines (scholarship applications, position deadlines,
    competition sign-ups).
  - *Pt. 2* — A success wall for students to post and celebrate academic wins of every magnitude.

## Tech Stack

Static HTML/CSS/JS built with Jekyll, hosted on GitHub Pages. GitHub Pages runs Jekyll natively —
pushing to `main` rebuilds and redeploys automatically, no separate build service or CI config
needed. Content (essays, interviews, blog posts, timeline milestones, FAQ, the daily quote) lives
in Markdown files and YAML data files under `_essays/`, `_interviews/`, `_posts/`, and `_data/`
rather than hardcoded HTML — see [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to add new content.

## Design

The 2026 "Prism" identity: one beacon light, many paths. Bright warm-white canvas, beacon-gold
primary, and a spectrum of accents that color-code each section of the site. The full design
system (palette, type, components, logo blueprint) lives in [`docs/DESIGN.md`](docs/DESIGN.md);
expanded feature concepts live in [`docs/FEATURES.md`](docs/FEATURES.md).

## Development

GitHub Pages builds this with Jekyll automatically on every push — you don't need anything
installed locally just to ship a change. Push to `main`, then check the repo's Pages build status
and reload the live site.

Local preview is optional, and only buys a faster feedback loop (see the rendered page in seconds
instead of waiting on a remote build):

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

Requires Ruby + Bundler. If you don't have (or don't want) a Ruby toolchain, skip this — pushing
and checking the Pages build is a completely valid, zero-install way to iterate, just slower per
round-trip.

## Contributing

Beacon After Bell is just getting started, and it runs on real essays, quotes, and interviews
from real students and grads. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to submit content
and how a maintainer turns an accepted submission into a published page.
