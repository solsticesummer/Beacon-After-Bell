# Beacon After Bell — Design System ("Prism, Printed", 2026)

The reference for every visual decision on the site. If you're about to style something,
read the relevant section here first; if you're about to *invent* something, add it here after.

## 1. Brand idea

**One light, many paths — rendered as print, not glow.** A beacon's light passes through
the student body and splits into a spectrum: one guiding light (the non-profit's mission),
many paths (grades, streams, interests). The light is drawn the way a well-made student
publication would print it: hard-edged spectrum bars and flat tints, never blur, glass, or
ambient gradients. The identity is bright, warm, and energetic — designed to project
**energy, belief, and motivation** to 14–18 year olds. It is deliberately:

- **light-only** — no dark surfaces anywhere; dark themes read gloomy and off-message;
- **colorful with purpose** — every accent hue *means* something (see hue-coding below);
- **hard-edged** — color arrives as solid bars, plates, and rules with crisp boundaries;
  blurred glows and glassmorphism read as template AI output and are banned;
- **neither childish nor corporate** — vivid color balanced by a serious deep-indigo ink
  and generous whitespace.

## 2. Color

All tokens live in the `:root` block of `styles.css`. Never hardcode a hex in a rule.

### Palette

| Token | Hex | Role |
|---|---|---|
| `--aurora-base` | `#FFFDF9` | Warm off-white page canvas |
| `--aurora-base-deep` | `#FFFFFF` | White cards + alternating section bands |
| `--aurora-line` | `#FFEACD` | Gold-tinted hairline borders/dividers |
| `--beacon-gold` | `#FFB020` | **Primary.** CTAs, active states, beams, wins |
| `--beacon-gold-bright` | `#FFD666` | Beam-tip highlight in gradients |
| `--beacon-gold-deep` | `#8A5A00` | Gold as text/icons (5.8:1 AA) |
| `--pulse-violet` / `-dim` | `#8B5CF6` / `#6D28D9` | Vault / essays (dim: 7.0:1) |
| `--pulse-cyan` / `-dim` | `#00D3E8` / `#007A88` | Timelines / grades (dim: 5.0:1) |
| `--pulse-coral` / `-dim` | `#FF5470` / `#C92544` | Blog / "What I Wish I Knew" (dim: 5.4:1) |
| `--pulse-magenta` / `-dim` | `#FF2EC0` / `#C4148D` | Interviews (dim: 5.4:1) |
| `--ink` | `#1B1140` | Headings + body text (17.2:1 AAA) |
| `--ink-soft` | `#5A5378` | Secondary text (7.0:1 AAA) |

Neon lime (`#F5FF3D`) was removed in this redesign: near-invisible on white and the least
cohesive member of the old set. Don't reintroduce it.

### The two-tier rule (this is the accessibility contract)

Bright tokens (`--beacon-gold`, `--pulse-*`) are **fills only** — buttons, tags, gradients,
dots, big graphics. As *text on light surfaces* they fail WCAG (bright gold is 1.8:1).
Text and icons always use the `-deep`/`-dim` tier, every one of which is verified ≥ 4.5:1
on both `--aurora-base` and white. Ink-on-gold and ink-on-cyan (buttons) are 9.6:1 AAA.

**Why this shape:** it lets the site stay vivid (big bright fills) without ever producing
illegible text — the choice of "which gold" is answered by "is it text?"

### Hue-coding is wayfinding

| Hue | Section |
|---|---|
| Violet | Essay Vault |
| Cyan | Timelines (Grade 9 chip) |
| Coral | Blog / WIWIK |
| Magenta | Interviews (Grade 11 chip) |
| Gold | CTAs, Success Wall, Forums, Grade 12 |

Grade chips on the homepage run 9→12 as cyan → violet → magenta → **gold**: senior year
is the light. A page declares its hue once — `<main class="hue-violet">` — and every
component inside (eyebrows, tags, focus tints, links, timeline dots) follows via
`var(--hue)` / `var(--hue-dim)` with sensible fallbacks. To theme a new component, read
those variables; don't reference a specific `--pulse-*` token inside component rules.

### Color psychology (why these, for this audience)

Gold carries optimism and achievement — motivation without corporate stiffness. Deep
navy-violet ink keeps long-form content calm and readable (and is friendlier than pure
black on a warm canvas). The spectrum accents supply peer energy, and because each one is
tied to a section, students quickly learn "my section's color" — color does navigation
work instead of decoration. Bright-on-white everywhere: hopeful, never gloomy.

## 3. Typography

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display (`--display`) | Bricolage Grotesque | 500–800 | Headings, logo, big numbers. Tracking −0.03 to −0.04em on large sizes |
| Body (`--sans`) | Inter | 400–600 | Body, UI. Line-height 1.7 |

Loaded from Google Fonts (only the weights above — keep the request lean). Fluid type via
`clamp()`: hero `clamp(2.6rem, 6vw, 4.5rem)`, section h2 `clamp(1.9rem, 3.2vw, 2.5rem)`,
page-hero h1 `clamp(2rem, 4vw, 3rem)`. Never one font for both roles.

## 4. Space, radius, depth

- Layout: centered `.container`, `--max-width: 1120px`, 24px side padding. Homepage
  sections open with `.section-head` — headline + spectrum-rule left, standfirst right,
  on a 5fr/7fr grid — instead of centered stacks.
- Section rhythm: `.section` = 88px vertical; `.grade-band` = 64px (compact).
- Radius: `--radius: 20px` (cards), `--radius-sm: 12px` (chips, panels, inputs),
  `999px` (pills).
- Depth has two planes: canvas → card (`--shadow-card`). There is no glass/floating
  plane. Surfaces that need presence use a flat `color-mix()` tint of their hue on white
  (≤ 10% hue, so ink text keeps its contrast headroom) plus a solid hue border. Shadows
  are **layered and tinted** (gold + violet, low opacity) — never a flat gray shadow.

## 5. Signature elements

### Spectrum masthead (site-wide)
A 3px band of the five hues in **hard stops** (`linear-gradient(90deg, violet 0 20%,
cyan 20% 40%, …)`) under the sticky header, via `.site-header::after`. Pure CSS, so the
shared header markup stays byte-identical across pages. This is the beam printed flat —
the site's constant signature.

### Prism Fan (homepage hero only)
Five solid bars of stepped widths — violet, cyan, gold, coral, magenta — skewed as one
unit (`.prism-fan`, `skewY(-8deg)`) in the right column of the asymmetric hero grid: one
light splitting into paths. **Static by design**; the site has no keyframe animation, so
the motion budget lives entirely in hover/focus micro-interactions. Hidden below 720px.

### Page plates (interior heroes)
`.page-hero` is a flat plate tinted with the page's hue (8% `color-mix()` on white)
closed by a 2px solid hue rule — wayfinding you can read at a glance.

### Spectrum rule
`hr.spectrum-rule` — a 4px pill gradient of all five hues. In `.section-head` it sits
under homepage section headings; inside a `.hue-*` scope it collapses to the page's own
hue fading into gold. It's the beam, echoed quietly.

## 6. Components (inventory)

`.btn-primary` (gold, ink text) · `.btn-secondary` (outline) · `.nav-cta` (header pill) ·
`.skip-link` · `.section-head` (offset headline/standfirst grid) · `.grade-chip` (hue
left-border entry card) · `.prism-fan` (hero signature) · `.archive-layout` =
`.archive-lead` (hue-tinted lead panel) + `.archive-list`/`.archive-row` (hue left-border
index rows) · `.beacon-card` (flat gold plate, Tonight's Beacon quote) · `.feature-card` ·
`.essay-card` + `.essay-tag` · `.tabs`/`.tab-btn` (state via `aria-selected`) ·
`.timeline` · `.accordion` (state via `aria-expanded`) · `.post-card` · `.interview-card` ·
`.cs-panel` (coming-soon) · `.soon-chip` · `.spectrum-rule` · `.wall-chip` ·
`.footer-grid` · `.mt-lg` (spacing utility).

**State convention:** interactive state lives in ARIA attributes and `hidden`, and CSS
selects on those (`[aria-selected="true"]`, `[aria-expanded="true"]`) — the accessible
state and the visual state are one piece of data. Every clickable element has hover,
focus-visible (2px violet outline), and active states.

### Adding a new component (walkthrough)
1. Check the inventory — extend before inventing.
2. Colors: `var(--hue)`/`var(--hue-dim)` if it should follow the page hue, otherwise
   tokens. Text = `-deep`/`-dim` tier only. Tinted surfaces = flat `color-mix()` of the
   hue on white at ≤ 10% — never a blurred gradient, glass, or grain overlay.
3. Type: `--display` for headings/numbers, `--sans` for everything else.
4. Surfaces: pick a depth plane (canvas / card) rather than a new shadow.
5. Motion: `transform`/`opacity` only, spring easing `cubic-bezier(0.16, 1, 0.3, 1)`,
   never `transition: all`, and no keyframe animation — hover/focus states only.
6. Verify contrast for any new text color pairing (≥ 4.5:1) and add it to this doc.

## 7. Logo blueprint

**Anatomy** (see `assets/logo.svg`): a school bell (two ink strokes: dome + flared mouth)
with a **beam of gold light rising through it** (gradient wedge, `#FFB020 → #FFD666`,
brighter at the top — light escaping upward). The beam's flanks carry two hairline
**prism edges** (violet left, cyan right): the moment of refraction. Two small gold rays
flank the dome.

- **Favicon** (`assets/favicon.svg`): drops the rays and prism edges, thickens the bell
  strokes to 2.4 — only bell + beam survive at 16px. Never scale the full mark down.
- **Clear space:** keep ≥ ½ bell-width of empty space around the mark.
- **One-color variant:** all-ink (strokes + solid beam) for stamps/print; never all-gold
  (fails contrast on light backgrounds).
- **Don't:** rotate, recolor the beam to a pulse hue, place on a dark surface (the brand
  has none), or set the wordmark in anything but Bricolage Grotesque 800.
- Wordmark: "Beacon" in ink, "After Bell" in `--beacon-gold-deep`.

## 8. Motion & accessibility floor

- The site has **no keyframe animation** — motion is hover/focus micro-interactions
  only, `transform`/`opacity` only; the global `prefers-reduced-motion: reduce` rule
  (kept as a safety net) collapses every transition to 0.001ms.
- Every page: skip link → `<main id="main">`; `aria-current="page"` in the nav;
  landmarks (`header`/`nav`/`main`/`footer`); unique title + meta description.
- Tabs: full APG pattern (roving tabindex, ArrowLeft/Right/Home/End, `aria-controls`,
  panels `role="tabpanel"` + `hidden`). Accordion: `aria-expanded` + `aria-controls`,
  triggers wrapped in headings, panels ship open for no-JS readers.
- Text contrast ≥ 4.5:1 (verified per token above); large display text ≥ 3:1.

## 9. Future exercise (deliberately not built)

A live `/styleguide.html` rendering this document's components would be a great learning
project — it wasn't shipped because an 8th page must be kept in header-sync and would
drift. If you build it, reuse the shared shell and add it to the footer only.
