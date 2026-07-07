# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Beacon After Bell — the site for a student-founded non-profit (Vancouver, BC) that offers an online database of resources for high school students. `index.html` is the landing page; each planned feature (essay vault, timelines, blog, interviews, forums, community board) gets its own interior page linked from the nav and the feature cards. Interior pages are being built out one at a time — `vault.html` exists; others linked from the nav (`timelines.html`, `blog.html`, `interviews.html`, `forums.html`, `community.html`) may not exist yet.

## Stack & structure

Static HTML/CSS, no JavaScript, no build step, no dependencies. Hosted on GitHub Pages at https://solsticesummer.github.io/Beacon-After-Bell/.

- `index.html` — landing page: header/nav, hero, `#what` / `#how` / `#features` / `#contact` sections. Nav links point to interior pages plus the `#contact` anchor; feature cards are `<a class="feature-card">` links to their interior pages.
- `vault.html` (and future interior pages) — reuse the same header/footer/`.container` markup and `styles.css`. Keep the header and nav consistent across pages.
- `styles.css` — all styling for every page. Design tokens live in the `:root` block at the top (twilight/beacon/paper color system, `--radius`, `--max-width`, `--serif`/`--sans` font stacks). Change colors and spacing there rather than hardcoding values in rules. A `prefers-color-scheme: dark` block overrides the paper/ink tokens for dark mode.
- `README.md` — mission statement and the roadmap of planned features.

## Develop

Serve locally (no build):

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Conventions

- Theme metaphor drives the naming: "twilight" = dusk background, "beacon" = orange guiding accent, "paper" = light body sections. Preserve this vocabulary when adding tokens.
- Layout is centered on `.container` (max-width via `--max-width`); alternating sections use `.section` / `.section-alt`.
- Deploys are just pushes to the default branch (GitHub Pages).
