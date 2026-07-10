# Beacon After Bell — Feature Expansion & Stickiness Roadmap

Concepts only — nothing in this file is built yet (except where noted). Each idea says
*why students would want it*, what it needs, and its risks, so future contributors can
pick work off this list deliberately instead of building whatever sounds fun.

## The thesis

Beacon's mission is **collective growth**: the site should reward *giving* help at least
as much as *getting* it. Every feature below is scored against that thesis — a feature
that only increases consumption doesn't belong here, no matter how engaging.

---

## 1. Keep Your Beacon Lit — contribution economy

**What:** Two loops. A *streak* ("your beacon has been lit 12 days") rewards showing up.
**Lumens** — the site's karma — are earned only by *giving*: contributing an essay,
answering a forum question, posting a "What I Wish I Knew" reflection, adding a deadline
to the community calendar. Lumens unlock cosmetic recognition (profile glow tiers,
a "Lighthouse" badge for top contributors per school), never access — advice stays free.

**Why students would love it:** streaks are a habit mechanic they already know from
Duolingo/Snapchat; Lumens give seniors a *status* reason to write for juniors, which is
the cold-start problem for every archive feature on this site.

**Why it fits the thesis:** it makes generosity the visible, celebrated metric — the
collective-growth mission expressed as a game mechanic.

**Needs:** accounts, a points ledger, moderation (anti-gaming: rate limits, review
before Lumens land). **Risk:** karma-farming low-quality posts — mitigate by granting
Lumens on *accepted/featured* contributions, not raw posts. **Effort:** large (backend).

## 2. My Path — personalized hub

**What:** A one-time picker ("Grade? Interests? Applying where?") that personalizes the
homepage: your grade's timeline milestones surface first, deadline countdowns for your
targets ("SAT registration closes in 12 days"), and Tonight's Beacon weights toward your
interests. Store in `localStorage` today (no accounts needed); migrate to profiles later.

**Why students would love it:** the site stops being a library and starts being *their*
dashboard; a countdown you care about is a reason to come back tomorrow.

**Needs (v1):** a JS block + a JSON of dated deadlines; no backend. **Risk:** stale
deadline data looks worse than none — assign an owner per admissions cycle.
**Effort:** small for v1; the highest value-per-effort item in this file.

## 3. Time Capsule — letters to your future self

**What:** Each September, write a letter to next-year-you. It seals, then unlocks a year
later. On unlock, opt-in to publish excerpts into "What I Wish I Knew" — tagged with the
grade you wrote it in.

**Why students would love it:** it's emotionally sticky (a guaranteed return visit with
real anticipation) and low-pressure — you write for yourself, not an audience.

**Why it fits:** it's a self-refilling content pipeline: private reflection today becomes
next year's public advice, written in exactly the voice younger students trust.

**Needs:** accounts + scheduled unlock (or v0: email-based via a scheduled-send service).
**Risk:** sensitive content — publishing must be opt-in per excerpt, with review.
**Effort:** medium.

## 4. Director's Commentary — annotated vault essays

**What:** Vault essays gain margin notes from the student who wrote them: *why* the
opening worked, what the reader was supposed to feel, what they'd cut today. Toggleable
overlay, like a director's commentary track.

**Why students would love it:** raw successful essays teach imitation; commentary teaches
*craft*. This is the difference between "copy this structure" and "understand why it
landed" — and it can't be scraped from anywhere else.

**Why it fits:** it deepens the giving loop — contributing an essay becomes teaching,
not trophy-posting. Pairs naturally with Lumens (#1).

**Needs (v1):** static — an `annotations` array per sample essay and a details toggle;
no backend. **Risk:** commentary quality varies — provide 3 prompt questions to authors.
**Effort:** small for v1 on sample essays.

---

## Stickiness: what makes the hub daily

**Already shipped (static, zero backend):**
- **Tonight's Beacon** — date-seeded daily pick on the homepage (`app.js`); same pick for
  everyone on a given day, new one at midnight. Grows better as the picks array grows —
  add one line per new piece of content.
- **Grade entry chips** — "Start where you are" deep-links into the timeline tabs, so the
  homepage answers "what should *I* do" in one click.

**Next (still no backend):** My Path v1 (localStorage grade pick reorders the strip and
adds countdowns); Director's Commentary on the 8 sample essays.

**Later (needs accounts):** streaks + Lumens; success-wall feed on the homepage;
Time Capsule; weekly "new in the archive" email digest.

**Anti-goals:** no infinite feeds, no engagement-bait notifications, no leaderboards of
*grades* (only of generosity). The site should feel like a lighthouse, not a casino —
students come back because tomorrow it will help them again, not because it hooked them.
