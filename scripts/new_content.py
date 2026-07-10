#!/usr/bin/env python3
"""Scaffold a new content file from a reviewed submission.

Usage:
    python3 scripts/new_content.py essay
    python3 scripts/new_content.py interview
    python3 scripts/new_content.py post
    python3 scripts/new_content.py quote
    python3 scripts/new_content.py faq

Each subcommand prompts for the same fields, in the same order, as the
matching Google Form (see CONTRIBUTING.md) — read a reviewed Sheet row
or email left-to-right and paste answers straight in.

Stdlib only, no dependencies. essay/interview/post write one new file
per submission (matches "one file = one collection item"). quote/faq
are YAML *lists* in a single file, so this script never parses the
existing YAML back into memory — it only appends a correctly-indented
block via plain string formatting. That's deliberately simpler and
lower-risk than round-tripping through a YAML library, but it does
mean it trusts the existing file to already be well-formed.
"""

import argparse
import datetime
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def slugify(text):
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "untitled"


def yaml_quote(value):
    """Wrap a string as a safe YAML double-quoted scalar.

    Without this, a submitter's stray " or \\ in a title/quote could
    corrupt the surrounding YAML structure (e.g. a title containing a
    literal " would prematurely close the front-matter string and
    turn the rest of the line into invalid YAML). Escaping backslash
    first, then double-quote, keeps both characters literal in the
    resulting scalar. This is a general lesson, not specific to this
    script: never interpolate untrusted input into structured-syntax
    output (YAML, JSON, SQL, shell, ...) without escaping it first.
    """
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def prompt(label, required=True, default=""):
    while True:
        value = input(f"{label}: ").strip()
        if value:
            return value
        if not required:
            return default
        print("  (required, try again)")


def next_order(directory):
    existing = list(directory.glob("*.md")) if directory.exists() else []
    return len(existing) + 1


def write_file(path, content):
    if path.exists():
        print(f"  refusing to overwrite existing file: {path}")
        sys.exit(1)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"  wrote {path.relative_to(ROOT)}")


def cmd_essay():
    title = prompt("Essay/entry title")
    university = prompt("University (full name)")
    university_tag = prompt(
        "University short tag (blank to reuse the full name)", required=False
    )
    program = prompt("Program/major")
    school = prompt("School name (not shown publicly yet)", required=False)
    summary = prompt("One-two sentence summary (shown on the card)")
    body = prompt(
        "Full essay text (optional, not published yet)", required=False
    )

    directory = ROOT / "_essays"
    order = next_order(directory)
    lines = [
        "---",
        f"title: {yaml_quote(title)}",
        f"university: {yaml_quote(university)}",
    ]
    if university_tag:
        lines.append(f"university_tag: {yaml_quote(university_tag)}")
    lines += [
        f"program: {yaml_quote(program)}",
        f"school: {yaml_quote(school)}",
        f"summary: {yaml_quote(summary)}",
        "sample: false",
        f"order: {order}",
        "---",
    ]
    if body:
        lines.append(body)
    write_file(directory / f"{slugify(title)}.md", "\n".join(lines) + "\n")


def cmd_interview():
    name = prompt("Interviewee name (as it should display)")
    initials = prompt("Initials (2 letters, for the avatar circle)")
    role = prompt("Role/credential line (e.g. Graduate · UBC Engineering)")
    quote = prompt("Pull-quote (the line shown on the card)")

    directory = ROOT / "_interviews"
    order = next_order(directory)
    content = "\n".join(
        [
            "---",
            f"name: {yaml_quote(name)}",
            f"initials: {yaml_quote(initials)}",
            f"role: {yaml_quote(role)}",
            f"quote: {yaml_quote(quote)}",
            f"order: {order}",
            "---",
            "",
        ]
    )
    write_file(directory / f"{slugify(name)}.md", content)


def cmd_post():
    kicker = prompt("Kicker (e.g. 'What I Wish I Knew')")
    title = prompt("Title")
    byline = prompt("Byline (e.g. 'Alumni, UBC Science')")
    body = prompt("Reflection text")

    date_str = datetime.date.today().isoformat()
    content = "\n".join(
        [
            "---",
            f"kicker: {yaml_quote(kicker)}",
            f"title: {yaml_quote(title)}",
            f"byline: {yaml_quote(byline)}",
            "---",
            body,
            "",
        ]
    )
    write_file(ROOT / "_posts" / f"{date_str}-{slugify(title)}.md", content)


KNOWN_LINKS = [
    ("Vault", "vault.html"),
    ("Timelines · Grade 9", "timelines.html#grade-9"),
    ("Timelines · Grade 10", "timelines.html#grade-10"),
    ("Timelines · Grade 11", "timelines.html#grade-11"),
    ("Timelines · Grade 12", "timelines.html#grade-12"),
    ("Blog", "blog.html"),
    ("Interviews", "interviews.html"),
]


def cmd_quote():
    quote = prompt("Quote text")
    source = prompt("Source/attribution label")

    print("Link destination:")
    for i, (label, _) in enumerate(KNOWN_LINKS, start=1):
        print(f"  {i}) {label}")
    choice = prompt(f"Pick 1-{len(KNOWN_LINKS)}")
    try:
        href = KNOWN_LINKS[int(choice) - 1][1]
    except (ValueError, IndexError):
        print("  not a valid choice")
        sys.exit(1)

    label = prompt("Link label text (e.g. 'Read more')")

    block = "\n".join(
        [
            f"- quote: {yaml_quote(quote)}",
            f"  source: {yaml_quote(source)}",
            f"  href: {yaml_quote(href)}",
            f"  label: {yaml_quote(label)}",
            "",
        ]
    )
    path = ROOT / "_data" / "beacon_quotes.yml"
    with path.open("a", encoding="utf-8") as f:
        f.write(block)
    print(f"  appended to {path.relative_to(ROOT)}")


def cmd_faq():
    question = prompt("Question")
    answer = prompt("Answer")

    block = "\n".join(
        [
            f"- question: {yaml_quote(question)}",
            f"  answer: {yaml_quote(answer)}",
            "",
        ]
    )
    path = ROOT / "_data" / "faqs.yml"
    with path.open("a", encoding="utf-8") as f:
        f.write(block)
    print(f"  appended to {path.relative_to(ROOT)}")


COMMANDS = {
    "essay": cmd_essay,
    "interview": cmd_interview,
    "post": cmd_post,
    "quote": cmd_quote,
    "faq": cmd_faq,
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("type", choices=COMMANDS.keys())
    args = parser.parse_args()
    COMMANDS[args.type]()


if __name__ == "__main__":
    main()
