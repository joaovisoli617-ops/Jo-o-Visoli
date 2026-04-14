/* ============================================================
   GRUPO AMPLIA — SCRIPT v2
   ============================================================ */

// ── LOAD ADMIN OVERRIDES ────────────────────
(function applyAdminContent() {
  const STORAGE_KEY = 'amplia_content';
  let data = {};
  try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch {}
  if (!Object.keys(data).length) return;

  function setText(sel, val) {
    const el = document.querySelector(sel);
    if (el && val) el.textContent = val;
  }
  function setAttr(sel, attr, val) {
    const el = document.querySelector(sel);
    if (el && val) el.setAttribute(attr, val);
  }
  function setHref(sel, val) { setAttr(sel, 'href', val); }

  // General
  if (data['g-tagline']) setText('.footer__logo span:last-child', data['g-tagline']);
  if (data['g-logo-size']) {
    const px = parseInt(data['g-logo-size']) + 'px';
    document.querySelectorAll('.logo-img').forEach(el => el.style.height = px);
  }
  const wa = data['g-whatsapp'];
  const ig = data['g-instagram'];
  if (wa) document.querySelectorAll('a[href*="wa.me"]').forEach(a => a.href = `https://wa.me/${wa}`);
  if (ig) document.querySelectorAll('a[href*="instagram.com"]').forEach(a => a.href = `https://instagram.com/${ig}`);

  // Hero
  if (data['h-eyebrow']) setText('.hero .eyebrow', data['h-eyebrow']);
  if (data['h-cta']) setText('.hero__ctas .btn--pulse', data['h-cta']);
  const p1 = data['h-pillar1'], p2 = data['h-pillar2'];
  const pillars = document.querySelectorAll('.hero__pillar p');
  if (p1 && pillars[0]) pillars[0].textContent = p1;
  if (p2 && pillars[1]) pillars[1].textContent = p2;

  // Stats
  if (Array.isArray(data.stats)) {
    const statEls = document.querySelectorAll('.numero-val');
    data.stats.forEach((s, i) => {
      if (!statEls[i]) return;
      const el = statEls[i];
      el.textContent = s.prefix + s.value + s.suffix;
      el.dataset.target = s.value;
      el.dataset.prefix = s.prefix;
      el.dataset.suffix = s.suffix;
    });
    const labelEls = document.querySelectorAll('.numero-label');
    data.stats.forEach((s, i) => { if (labelEls[i] && s.label) labelEls[i].textContent = s.label; });
  }

  // Solutions
  if (Array.isArray(data.solutions)) {
    const cards = document.querySelectorAll('.sol-card');
    data.solutions.forEach((s, i) => {
      const card = cards[i];
      if (!card) return;
      const iconEl = card.querySelector('.sol-card__icon');
      const numEl  = card.querySelector('.sol-card__num');
      const titleEl = card.querySelector('h3');
      const descEl  = card.querySelector('p');
      const ulEl    = card.querySelector('ul');
      const hlEl    = card.querySelector('.sol-card__highlight');
      if (iconEl && s.icon)  iconEl.textContent = s.icon;
      if (numEl  && s.num)   numEl.textContent  = s.num;
      if (titleEl && s.title) titleEl.textContent = s.title;
      if (descEl  && s.desc)  descEl.textContent  = s.desc;
      if (ulEl && s.items) {
        ulEl.innerHTML = s.items.split('\n').filter(Boolean).map(item => `<li>${item}</li>`).join('');
      }
      if (hlEl) {
        if (s.highlight) { hlEl.textContent = s.highlight; hlEl.style.display = ''; }
        else hlEl.style.display = 'none';
      }
    });
  }

  // Clients
  if (Array.isArray(data.clients)) {
    const cards = document.querySelectorAll('.res-card');
    data.clients.forEach((c, i) => {
      const card = cards[i];
      if (!card) return;
      const tagEl  = card.querySelector('.res-card__tag');
      const nameEl = card.querySelector('h3');
      const valEl  = card.querySelector('.res-val');
      const perEl  = card.querySelector('.res-period');
      const descEl = card.querySelector('p');
      if (tagEl  && c.tag)    tagEl.textContent  = c.tag;
      if (nameEl && c.name)   nameEl.textContent = c.name;
      if (valEl  && c.value)  valEl.textContent  = c.value;
      if (perEl  && c.period) perEl.textContent  = c.period;
      if (descEl && c.desc)   descEl.textContent = c.desc;
    });
  }

  // Founders
  if (Array.isArray(data.founders)) {
    const cards = document.querySelectorAll('.fund-card');
    data.founders.forEach((f, i) => {
      const card = cards[i];
      if (!card) return;
      const avEl    = card.querySelector('.fund-card__avatar');
      const nameEl  = card.querySelector('h3');
      const roleEl  = card.querySelector('.fund-card__role');
      const snumEl  = card.querySelector('.fund-stat-num');
      const slabEl  = card.querySelector('.fund-stat-label');
      const bioEl   = card.querySelector('p:last-child');
      if (avEl    && f.initials)  avEl.textContent   = f.initials;
      if (nameEl  && f.name)      nameEl.textContent  = f.name;
      if (roleEl  && f.role)      roleEl.textContent  = f.role;
      if (snumEl  && f.statNum)   snumEl.textContent  = f.statNum;
      if (slabEl  && f.statLabel) slabEl.textContent  = f.statLabel;
      if (bioEl   && f.bio)       bioEl.textContent   = f.bio;
    });
  }

  // ── Layout ──
  const FONT_SIZE_CSS = {
    xlarge: 'clamp(2.6rem, 6vw, 5.2rem)',
    large:  'clamp(2rem, 4.5vw, 4rem)',
    medium: 'clamp(1.6rem, 3.5vw, 3rem)',
    small:  'clamp(1.2rem, 2.5vw, 2rem)',
  };
  const BG_CSS = {
    'black':       '#000',
    'dark-orange': 'linear-gradient(135deg,#000 0%,#1a0800 100%)',
    'deep-dark':   '#080808',
    'dark-warm':   'linear-gradient(135deg,#0a0500 0%,#1c0e00 100%)',
    'charcoal':    '#1a1a1a',
  };

  function parseMarkup(raw, isItalic) {
    const lines = raw.split('\n');
    const lastIdx = lines.length - 1;
    return lines.map((line, i) => {
      const parsed = line.replace(/\{([^}]*)\}/g, '<span class="or">$1</span>');
      const isLast = i === lastIdx;
      const wrapped = isLast && isItalic ? `<em>${parsed}</em>` : parsed;
      return i < lastIdx ? wrapped + '<br/>' : wrapped;
    }).join('');
  }

  if (data['l-headline']) {
    const h1 = document.querySelector('.hero h1');
    if (h1) h1.innerHTML = parseMarkup(data['l-headline'], data['l-italic'] !== false);
  }
  if (data['l-fontsize']) {
    const h1 = document.querySelector('.hero h1');
    if (h1) h1.style.fontSize = FONT_SIZE_CSS[data['l-fontsize']] || '';
  }
  if (data['l-bg']) {
    const hero = document.querySelector('.hero');
    if (hero) hero.style.background = BG_CSS[data['l-bg']] || '';
  }
  const eyebrowEl = document.querySelector('.hero .eyebrow');
  if (eyebrowEl && data['l-show-eyebrow'] === false) eyebrowEl.style.display = 'none';
  const pillarsEl = document.querySelector('.hero__pillars');
  if (pillarsEl && data['l-show-pillars'] === false) pillarsEl.style.display = 'none';
  const trustEl = document.querySelector('.hero__trust');
  if (trustEl && data['l-show-trust'] === false) trustEl.style.display = 'none';
  const ghostBtn = document.querySelector('.hero__ctas .btn--ghost');
  if (ghostBtn && data['l-show-ghost-btn'] === false) ghostBtn.style.display = 'none';

  // ── Layout extras ──
  if (data['l-align']) {
    const h1 = document.querySelector('.hero h1');
    const heroInner = document.querySelector('.hero__inner');
    if (h1) h1.style.textAlign = data['l-align'];
    if (heroInner) heroInner.style.alignItems = data['l-align'] === 'center' ? 'center' : 'flex-start';
  }
  if (data['l-mark-bg'] === false) {
    document.querySelectorAll('.hero__mark, .hero-mark').forEach(el => el.style.display = 'none');
  }
  if (data['l-wide-spacing'] === true) {
    const h1 = document.querySelector('.hero h1');
    if (h1) h1.style.letterSpacing = '0.08em';
  }

  // ── Números layout ──
  if (data['n-layout']) {
    const grid = document.querySelector('.numeros__grid');
    if (grid) {
      grid.style.display = 'flex';
      grid.style.flexWrap = 'wrap';
      grid.style.justifyContent = 'center';
      if (data['n-layout'] === 'row') {
        grid.style.flexDirection = 'row';
      } else {
        grid.style.flexDirection = 'row';
        grid.style.flexWrap = 'wrap';
      }
    }
  }

  // ── Solutions style ──
  if (data['s-style']) {
    document.querySelectorAll('.sol-card').forEach(card => {
      card.classList.remove('sol-card--bordered', 'sol-card--minimal');
      if (data['s-style'] === 'bordered') card.classList.add('sol-card--bordered');
      if (data['s-style'] === 'minimal')  card.classList.add('sol-card--minimal');
    });
  }

  // ── Clients format ──
  if (data['c-fmt']) {
    const grid = document.querySelector('.resultados__grid');
    if (grid) {
      grid.classList.remove('res-grid--list', 'res-grid--compact');
      if (data['c-fmt'] === 'list')    grid.classList.add('res-grid--list');
      if (data['c-fmt'] === 'compact') grid.classList.add('res-grid--compact');
    }
  }

  // ── Founders style ──
  if (data['f-style']) {
    document.querySelectorAll('.fund-card').forEach(card => {
      card.classList.remove('fund-card--left', 'fund-card--minimal');
      if (data['f-style'] === 'left')    card.classList.add('fund-card--left');
      if (data['f-style'] === 'minimal') card.classList.add('fund-card--minimal');
    });
  }

  // Contact
  if (data['ct-title']) {
    const el = document.querySelector('.cta-final h2');
    if (el) el.innerHTML = data['ct-title'];
  }
  if (data['ct-sub']) setText('.cta-final__inner > p', data['ct-sub']);
  if (data['ct-wabtn']) {
    const btn = document.querySelector('.cta-final__actions .btn--pulse');
    if (btn) { const svg = btn.querySelector('svg'); btn.textContent = data['ct-wabtn']; if (svg) btn.prepend(svg); }
  }
  if (data['ct-igbtn']) setText('.cta-final__actions .btn--ghost', data['ct-igbtn']);
})();

// ── NAV: scroll effect ──────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── NAV: mobile hamburger ───────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav__links a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  })
);

// ── REVEAL ON SCROLL ────────────────────────
const revealTargets = document.querySelectorAll(
  '.numero-item, .sol-card, .res-card, .fund-card, .pq-card, .faq-item, .sobre__media, .sobre__text'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...(entry.target.parentElement?.children ?? [])];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('in'), idx * 80);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION ───────────────────────
const counters = document.querySelectorAll('.numero-val[data-target]');

function animateCount(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1600;
  const start    = performance.now();

  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = eased * target;
    el.textContent = prefix + (Number.isInteger(target) ? Math.floor(val) : val.toFixed(0)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCount(entry.target);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ── FAQ ACCORDION ───────────────────────────
document.querySelectorAll('.faq-item__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.faq-item');
    const isOpen  = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (if was closed)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── ACTIVE NAV HIGHLIGHT ────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a:not(.btn)');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--or)' : '';
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
