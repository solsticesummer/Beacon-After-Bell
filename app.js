// Beacon After Bell — interactive behaviors (no dependencies)
//
// Every block is a self-invoking function that no-ops if its page's
// markup is absent, so every page can safely load this one script.
//
// State convention: visual state is driven by ARIA attributes
// (aria-selected, aria-expanded) and the `hidden` attribute — not by
// CSS classes. The accessible state and the visible state are the
// same piece of data, so they can never disagree.

/* ---------- Vault: live filtering ---------- */
(function initVault() {
  const grid = document.getElementById('vault-grid');
  if (!grid) return;

  const search = document.getElementById('vault-search');
  const uniSel = document.getElementById('filter-university');
  const progSel = document.getElementById('filter-program');
  const countEl = document.getElementById('vault-count');   // aria-live: announces results to screen readers
  const noResults = document.getElementById('no-results');
  const clearBtn = document.getElementById('clear-filters');
  const cards = Array.from(grid.querySelectorAll('.essay-card'));

  function apply() {
    const q = (search.value || '').trim().toLowerCase();
    const uni = uniSel.value;
    const prog = progSel.value;
    let visible = 0;

    cards.forEach((card) => {
      const matchesText = !q || card.textContent.toLowerCase().includes(q);
      const matchesUni = !uni || card.dataset.university === uni;
      const matchesProg = !prog || card.dataset.program === prog;
      const show = matchesText && matchesUni && matchesProg;
      // `hidden` instead of style.display: it's semantic (hides from
      // assistive tech too) and keeps styling out of JS.
      card.hidden = !show;
      if (show) visible++;
    });

    countEl.textContent =
      visible + (visible === 1 ? ' essay' : ' essays') + ' shown';
    noResults.hidden = visible !== 0;
  }

  [search, uniSel, progSel].forEach((el) =>
    el.addEventListener('input', apply)
  );

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      search.value = '';
      uniSel.value = '';
      progSel.value = '';
      apply();
      search.focus(); // put the keyboard user back at the start of the flow
    });
  }

  apply();
})();

/* ---------- Timelines: grade tabs (APG tabs pattern) ----------
   Mouse users click; keyboard users get Left/Right/Home/End on the
   tablist with a roving tabindex (only the active tab is tabbable,
   so Tab jumps straight from the tablist into the open panel). */
(function initTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute('aria-controls'))
  );

  function select(tab, { focus = true } = {}) {
    tabs.forEach((t, i) => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) tab.focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      let target = null;
      if (e.key === 'ArrowRight') target = tabs[i === last ? 0 : i + 1];
      else if (e.key === 'ArrowLeft') target = tabs[i === 0 ? last : i - 1];
      else if (e.key === 'Home') target = tabs[0];
      else if (e.key === 'End') target = tabs[last];
      if (target) {
        e.preventDefault(); // don't also scroll the page
        select(target);
      }
    });
  });

  // Deep links: the homepage grade chips point at timelines.html#grade-11
  // etc. If the hash names a panel, open its tab (without stealing focus).
  const fromHash = tabs.find(
    (t) => '#' + t.getAttribute('aria-controls') === window.location.hash
  );
  select(fromHash || tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0], { focus: false });
})();

/* ---------- Blog: FAQ accordion ---------- */
(function initAccordion() {
  const triggers = Array.from(document.querySelectorAll('.accordion-trigger'));
  if (!triggers.length) return;

  triggers.forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    // Markup ships with panels open so no-JS readers see the answers;
    // collapse to the aria-expanded state once the script is running.
    panel.hidden = btn.getAttribute('aria-expanded') !== 'true';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });
})();

/* ---------- Tonight's Beacon: one archive pick per day ----------
   Date-seeded, so every visitor sees the same pick on the same day
   and a new one tomorrow — a daily-return hook with zero backend.
   The HTML ships with the first pick as static fallback for no-JS. */
(function initTonightsBeacon() {
  const quoteEl = document.getElementById('beacon-quote');
  if (!quoteEl) return;

  const sourceEl = document.getElementById('beacon-source');
  const linkEl = document.getElementById('beacon-link');

  const picks = [
    {
      quote: '“Start the essays in the summer — writing under deadline made every sentence worse.”',
      source: 'What I Wish I Knew · Class of 2025',
      href: 'blog.html',
      label: 'Read more',
    },
    {
      quote: '“Grade 11 course selection quietly decides which programs you can even apply to. Map it backwards from the program.”',
      source: 'Timelines · Grade 11',
      href: 'timelines.html#grade-11',
      label: 'See the Grade 11 timeline',
    },
    {
      quote: '“My essay wasn’t about winning — it was about the season we lost and what I rebuilt after.”',
      source: 'Essay Vault · UBC Sauder',
      href: 'vault.html',
      label: 'Browse the vault',
    },
    {
      quote: '“Ask one grad from your dream program how they got there. Worst case: you learn one new path.”',
      source: 'Interviews',
      href: 'interviews.html',
      label: 'Meet the grads',
    },
    {
      quote: '“Clubs beat marks for learning who you are. Marks open the door; the rest of you walks through it.”',
      source: 'What I Wish I Knew · Class of 2024',
      href: 'blog.html',
      label: 'Read more',
    },
    {
      quote: '“Grade 9 is for range: try the club you’re not sure about. Depth comes later.”',
      source: 'Timelines · Grade 9',
      href: 'timelines.html#grade-9',
      label: 'See the Grade 9 timeline',
    },
    {
      quote: '“Scholarship deadlines cluster in the fall of Grade 12 — collect them in one calendar before school starts.”',
      source: 'Timelines · Grade 12',
      href: 'timelines.html#grade-12',
      label: 'See the Grade 12 timeline',
    },
  ];

  // Days since epoch → stable index for the whole day, new one at midnight.
  const day = Math.floor(Date.now() / 86400000);
  const pick = picks[day % picks.length];

  quoteEl.textContent = pick.quote;
  sourceEl.textContent = pick.source;
  linkEl.href = pick.href;
  linkEl.textContent = pick.label;
})();
