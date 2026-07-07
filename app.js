// Beacon After Bell — interactive behaviors (no dependencies)

/* ---------- Vault: live filtering ---------- */
(function initVault() {
  const grid = document.getElementById('vault-grid');
  if (!grid) return;

  const search = document.getElementById('vault-search');
  const uniSel = document.getElementById('filter-university');
  const progSel = document.getElementById('filter-program');
  const countEl = document.getElementById('vault-count');
  const noResults = document.getElementById('no-results');
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
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    countEl.textContent =
      visible + (visible === 1 ? ' essay' : ' essays') + ' shown';
    noResults.hidden = visible !== 0;
  }

  [search, uniSel, progSel].forEach((el) =>
    el.addEventListener('input', apply)
  );
  apply();
})();

/* ---------- Timelines: grade tabs ---------- */
(function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));
  if (!tabs.length) return;

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabs.forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });
})();

/* ---------- Blog: FAQ accordion ---------- */
(function initAccordion() {
  const triggers = Array.from(document.querySelectorAll('.accordion-trigger'));
  if (!triggers.length) return;

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });
})();
