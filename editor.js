/* ============================================================
   AMPLIA — EDITOR VISUAL INLINE
   Ativado via URL: ?edit
   ============================================================ */
(function () {
  'use strict';
  const STORAGE_KEY = 'amplia_content';

  if (!new URLSearchParams(location.search).has('edit')) return;

  // ── MAPA DE ELEMENTOS SIMPLES ────────────────────────────
  const SIMPLE = [
    { sel: '.hero .eyebrow',                key: 'h-eyebrow' },
    { sel: '.hero__ctas .btn--pulse',       key: 'h-cta' },
    { sel: '.hero__pillar p',               key: 'h-pillar1', idx: 0 },
    { sel: '.hero__pillar p',               key: 'h-pillar2', idx: 1 },
    { sel: '.sobre .eyebrow',               key: 'sb-eyebrow' },
    { sel: '.sobre__quote p',               key: 'sb-quote' },
    { sel: '.sobre__quote cite',            key: 'sb-cite' },
    { sel: '.sobre__text > p',              key: 'sb-p1',    idx: 0 },
    { sel: '.sobre__text > p',              key: 'sb-p2',    idx: 1 },
    { sel: '.bullet__text',                 key: 'sb-b1',    idx: 0 },
    { sel: '.bullet__text',                 key: 'sb-b2',    idx: 1 },
    { sel: '.bullet__text',                 key: 'sb-b3',    idx: 2 },
    { sel: '.sobre__badge-num',             key: 'sb-badge-from', idx: 0 },
    { sel: '.sobre__badge-num',             key: 'sb-badge-to',   idx: 1 },
    { sel: '.sobre__badge-label',           key: 'sb-badge-label' },
    { sel: '.para-quem .eyebrow',           key: 'pq-eyebrow' },
    { sel: '.pq-cta p',                     key: 'pq-cta-text' },
    { sel: '.pq-cta .btn',                  key: 'pq-cta-btn' },
    { sel: '.cta-final__inner > p',         key: 'ct-sub' },
    { sel: '.cta-final__actions .btn--pulse', key: 'ct-wabtn' },
    { sel: '.cta-final__actions .btn--ghost', key: 'ct-igbtn' },
    { sel: '.footer__logo span:last-child', key: 'g-tagline' },
  ];

  // ── MAPA DE ARRAYS ───────────────────────────────────────
  const ARRAYS = [
    { containerSel: '.sol-card', arrayKey: 'solutions', fields: [
      { elSel: '.sol-card__icon',      field: 'icon' },
      { elSel: 'h3',                   field: 'title' },
      { elSel: 'p',                    field: 'desc' },
      { elSel: '.sol-card__highlight', field: 'highlight' },
    ]},
    { containerSel: '.res-card', arrayKey: 'clients', fields: [
      { elSel: '.res-card__tag', field: 'tag' },
      { elSel: 'h3',             field: 'name' },
      { elSel: '.res-val',       field: 'value' },
      { elSel: '.res-period',    field: 'period' },
      { elSel: 'p',              field: 'desc' },
    ]},
    { containerSel: '.fund-card', arrayKey: 'founders', fields: [
      { elSel: '.fund-card__avatar', field: 'initials' },
      { elSel: 'h3',                 field: 'name' },
      { elSel: '.fund-card__role',   field: 'role' },
      { elSel: '.fund-stat-num',     field: 'statNum' },
      { elSel: '.fund-stat-label',   field: 'statLabel' },
      { elSel: 'p:last-child',       field: 'bio' },
    ]},
  ];

  // ── MARCAR ELEMENTOS COMO EDITÁVEIS ─────────────────────
  function markEditable(el, key) {
    el.dataset.editKey = key;
    el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'false');
    el.classList.add('ei-editable');
  }

  function activateEditing() {
    // Simple
    SIMPLE.forEach(({ sel, key, idx }) => {
      const all = document.querySelectorAll(sel);
      const el  = idx !== undefined ? all[idx] : all[0];
      if (el) markEditable(el, key);
    });

    // Arrays
    ARRAYS.forEach(({ containerSel, arrayKey, fields }) => {
      document.querySelectorAll(containerSel).forEach((container, i) => {
        fields.forEach(({ elSel, field }) => {
          const el = container.querySelector(elSel);
          if (!el) return;
          el.dataset.editArrayKey   = arrayKey;
          el.dataset.editArrayIdx   = i;
          el.dataset.editArrayField = field;
          el.setAttribute('contenteditable', 'true');
          el.setAttribute('spellcheck', 'false');
          el.classList.add('ei-editable');
        });
      });
    });

    // PQ cards (índice dinâmico)
    document.querySelectorAll('.pq-card').forEach((card, i) => {
      const iconEl = card.querySelector('.pq-card__icon');
      const textEl = card.querySelector('p');
      if (iconEl) markEditable(iconEl, `pq-icon-${i + 1}`);
      if (textEl) markEditable(textEl, `pq-text-${i + 1}`);
    });
  }

  // ── COLETAR EDIÇÕES E SALVAR ─────────────────────────────
  function collectAndSave() {
    let d = {};
    try { d = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch {}

    // Campos simples
    document.querySelectorAll('[data-edit-key]').forEach(el => {
      d[el.dataset.editKey] = el.textContent.trim();
    });

    // Campos de arrays
    const arrays = {};
    document.querySelectorAll('[data-edit-array-key]').forEach(el => {
      const arrayKey = el.dataset.editArrayKey;
      const idx      = parseInt(el.dataset.editArrayIdx);
      const field    = el.dataset.editArrayField;
      if (!arrays[arrayKey])     arrays[arrayKey] = [];
      if (!arrays[arrayKey][idx]) arrays[arrayKey][idx] = {};
      arrays[arrayKey][idx][field] = el.textContent.trim();
    });

    Object.entries(arrays).forEach(([key, items]) => {
      if (!Array.isArray(d[key])) d[key] = [];
      items.forEach((changes, i) => {
        if (!d[key][i]) d[key][i] = {};
        Object.assign(d[key][i], changes);
      });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  }

  // ── TOOLTIP DE LABEL ─────────────────────────────────────
  const LABELS = {
    'h-eyebrow': 'Eyebrow Hero', 'h-cta': 'Botão Hero',
    'h-pillar1': 'Pilar 1', 'h-pillar2': 'Pilar 2',
    'sb-eyebrow': 'Eyebrow Sobre', 'sb-quote': 'Citação',
    'sb-cite': 'Autor', 'sb-p1': 'Parágrafo 1', 'sb-p2': 'Parágrafo 2',
    'sb-b1': 'Bullet 1', 'sb-b2': 'Bullet 2', 'sb-b3': 'Bullet 3',
    'sb-badge-from': 'Badge: de', 'sb-badge-to': 'Badge: para',
    'sb-badge-label': 'Badge: legenda',
    'pq-eyebrow': 'Eyebrow Para Quem', 'pq-cta-text': 'Texto CTA',
    'pq-cta-btn': 'Botão CTA', 'ct-sub': 'Subtítulo Contato',
    'ct-wabtn': 'Botão WhatsApp', 'ct-igbtn': 'Botão Instagram',
    'g-tagline': 'Tagline rodapé',
  };

  const tooltip = document.createElement('div');
  tooltip.id = 'ei-tooltip';
  document.body.appendChild(tooltip);

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('.ei-editable');
    if (!el) { tooltip.style.display = 'none'; return; }
    const key = el.dataset.editKey;
    const label = key ? (LABELS[key] || key) :
      `${el.dataset.editArrayKey}[${el.dataset.editArrayIdx}].${el.dataset.editArrayField}`;
    tooltip.textContent = label;
    tooltip.style.display = 'block';
  });

  document.addEventListener('mousemove', e => {
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top  = (e.clientY - 28) + 'px';
  });

  document.addEventListener('mouseout', e => {
    if (!e.target.closest('.ei-editable')) tooltip.style.display = 'none';
  });

  // ── TOOLBAR ──────────────────────────────────────────────
  const bar = document.createElement('div');
  bar.id = 'ei-bar';
  bar.innerHTML = `
    <div class="ei-bar__left">
      <span class="ei-dot"></span>
      <span class="ei-bar__title">Modo Edição</span>
    </div>
    <span class="ei-bar__hint">Clique em qualquer texto laranja para editar</span>
    <div class="ei-bar__actions">
      <button id="ei-save">Salvar alterações</button>
      <button id="ei-exit">Sair</button>
    </div>
  `;
  document.body.prepend(bar);

  document.getElementById('ei-save').addEventListener('click', () => {
    collectAndSave();
    const btn = document.getElementById('ei-save');
    const prev = btn.textContent;
    btn.textContent = '✓ Salvo!';
    btn.classList.add('saved');
    setTimeout(() => { btn.textContent = prev; btn.classList.remove('saved'); }, 2000);
  });

  document.getElementById('ei-exit').addEventListener('click', () => {
    location.href = location.pathname;
  });

  // ── ESTILOS INJETADOS ────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    body { padding-top: 56px !important; }

    #ei-bar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 99999;
      height: 56px; background: #0d0d0d; border-bottom: 2px solid #fc4900;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 1.5rem; gap: 1rem;
      font-family: 'Montserrat', 'Inter', sans-serif; font-size: .82rem; color: #fff;
      box-shadow: 0 4px 20px rgba(0,0,0,.6);
    }
    .ei-bar__left  { display: flex; align-items: center; gap: .55rem; font-weight: 700; letter-spacing: .03em; }
    .ei-dot        { width: 9px; height: 9px; border-radius: 50%; background: #fc4900; animation: ei-pulse 1.4s infinite; }
    @keyframes ei-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.85)} }
    .ei-bar__hint  { color: rgba(255,255,255,.38); font-size: .74rem; flex: 1; text-align: center; }
    .ei-bar__actions { display: flex; gap: .6rem; }

    #ei-save {
      background: #fc4900; color: #fff; border: none; border-radius: 7px;
      padding: .42rem 1.1rem; font-size: .8rem; font-weight: 700;
      cursor: pointer; transition: background .18s, transform .1s;
      font-family: inherit;
    }
    #ei-save:hover  { background: #e03d00; transform: scale(1.04); }
    #ei-save.saved  { background: #22c55e; }

    #ei-exit {
      background: transparent; color: rgba(255,255,255,.5);
      border: 1px solid rgba(255,255,255,.18); border-radius: 7px;
      padding: .42rem .85rem; font-size: .8rem; cursor: pointer;
      transition: color .18s, border-color .18s; font-family: inherit;
    }
    #ei-exit:hover  { color: #fff; border-color: rgba(255,255,255,.45); }

    .ei-editable {
      outline: 2px dashed transparent;
      border-radius: 3px;
      cursor: text !important;
      transition: outline-color .15s, background-color .15s;
    }
    .ei-editable:hover {
      outline-color: #fc4900;
      background-color: rgba(252,73,0,.08) !important;
    }
    .ei-editable:focus {
      outline: 2px solid #fc4900 !important;
      background-color: rgba(252,73,0,.12) !important;
    }

    #ei-tooltip {
      position: fixed; z-index: 100000; display: none;
      background: #fc4900; color: #fff; font-size: .7rem; font-weight: 600;
      padding: .25rem .55rem; border-radius: 4px; pointer-events: none;
      font-family: 'Inter', sans-serif; white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,.4);
    }
  `;
  document.head.appendChild(style);

  // ── INIT ─────────────────────────────────────────────────
  activateEditing();
})();
