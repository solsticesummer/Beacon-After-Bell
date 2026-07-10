# Contributing content

Beacon After Bell runs on real essays, quotes, and interviews from real
students and grads. There's no self-serve publishing — every submission
is reviewed before it goes live — but adding a reviewed submission to
the site is now a quick file-add, not an HTML edit.

## Two ways to submit

- **Email** `hello@beaconafterbell.org` with your essay, quote, or
  interview answers. This is the lowest-friction path — just write it
  up and send it.
- **Google Form** — a public form per content type (links go here once
  created; see field lists below for exactly what each form should
  collect). Responses land in a linked Sheet for review.

Either way: nothing gets published automatically. A site maintainer
reviews the submission and, once accepted, adds it to the site (see
"Publishing an accepted submission" below). There's no guaranteed
turnaround time.

## What we're looking for

- **Essays** — a real application essay/response, tagged by university
  and program, so future applicants can learn from what actually
  worked.
- **Interviews** — a short pull-quote plus your name/initials, role,
  and program, for the Interviews page.
- **Quotes/blurbs** — a one-line piece of advice for "Tonight's
  Beacon," linking to whichever part of the site it's most related to.

## Google Form field lists

If you're setting up the actual forms (a manual step in Google
Forms/Sheets — not something checked into this repo), each should
collect:

**Essay submission**
1. Your name
2. Your email (not published — for follow-up only)
3. Essay/entry title
4. University (full name)
5. University short tag, if it should display differently than the
   full name (e.g. "University of Toronto" → "U of T") — optional
6. Program/major
7. School name (not shown publicly today; recorded for a possible
   future filter)
8. One–two sentence summary (this is what shows on the card)
9. Full essay text — optional, not published yet, saved for a future
   "read the full essay" page
10. Consent checkbox: "I wrote this essay (or have permission to share
    it) and I'm okay with it being published on Beacon After Bell"
11. Name-display preference: full name / initials / anonymous

**Interview submission**
1. Your name (as it should display)
2. Initials (2 letters, for the avatar circle)
3. Role/credential line (e.g. "Graduate · UBC Engineering")
4. Pull-quote (the one line shown on the card)
5. Contact email (not published)
6. Consent checkbox

**Quote/blurb submission ("Tonight's Beacon")**
1. Quote text
2. Source/attribution label
3. Link destination — a **dropdown** of the known internal pages
   (Vault, Timelines Grade 9/10/11/12, Blog, Interviews), not a free-
   text URL, so a submission can't produce a broken link
4. Link label text (e.g. "Read more")
5. Submitter name/email (not published)
6. Consent checkbox

FAQ entries and timeline milestones stay maintainer-authored rather
than submitted per item — they're short, structured, and change
rarely, so there's no form for them.

## Publishing an accepted submission

Once you've reviewed a submission (an email or an approved Sheet row),
turn it into a file with the scaffold script:

```bash
python3 scripts/new_content.py essay      # -> _essays/<slug>.md
python3 scripts/new_content.py interview  # -> _interviews/<slug>.md
python3 scripts/new_content.py post       # -> _posts/<date>-<slug>.md
python3 scripts/new_content.py quote      # appends to _data/beacon_quotes.yml
python3 scripts/new_content.py faq        # appends to _data/faqs.yml
```

Each command prompts for the same fields, in the same order, as the
matching form above — read a Sheet row left to right (or an email) and
paste the answers straight in. Then:

```bash
git add -A
git commit -m "Add essay: <title>"
git push
```

GitHub Pages rebuilds automatically on push — no separate deploy step.

## Content style

- Use real punctuation (`—`, `·`, curly quotes `“ ”`) rather than HTML
  entities (`&mdash;`, `&middot;`) — the site's Markdown/YAML content
  is plain UTF-8, and typing real characters is far more natural than
  remembering entity codes.
- Front-matter and data-file text is rendered as-is, without escaping
  (this is how a FAQ answer can contain a real `<a href="...">` link).
  That also means don't paste in raw HTML from an untrusted source —
  treat every field as literal site content, not markup to sanitize.
