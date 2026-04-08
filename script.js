/* ============================================================
   GRUPO AMPLIA — SCRIPT v2
   ============================================================ */

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
