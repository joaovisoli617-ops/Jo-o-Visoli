/* =============================================
   GRUPO AMPLIA — MAIN SCRIPT
   ============================================= */

// ── NAV: scroll effect ───────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── NAV: mobile hamburger ────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav__links');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ── SCROLL FADE-IN ───────────────────────────
const fadeEls = document.querySelectorAll(
  '.conquistas__stat, .solucao-card, .cliente-card, .fundador-card, .sobre__text, .sobre__card'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ── STAT COUNTER ANIMATION ───────────────────
function animateCounter(el, target, suffix, duration = 1800) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.dataset.count;
    const suffix = el.dataset.suffix || '';
    animateCounter(el, parseFloat(raw), suffix);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

// Tag stat numbers with data attributes
const statDefs = [
  { selector: '.conquistas__stat:nth-child(1) .stat-number', count: 500, suffix: 'mil+', prefix: 'R$' },
  { selector: '.conquistas__stat:nth-child(2) .stat-number', count: 14,  suffix: ' meses' },
  { selector: '.conquistas__stat:nth-child(3) .stat-number', count: 60,  suffix: '%' },
  { selector: '.conquistas__stat:nth-child(4) .stat-number', count: 8,   suffix: '+' },
];

statDefs.forEach(({ selector, count, suffix, prefix = '' }) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.dataset.count  = count;
  el.dataset.suffix = suffix;
  el.dataset.prefix = prefix;
  statObserver.observe(el);
});

// ── SMOOTH ACTIVE NAV ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a:not(.btn)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${id}`
        ? 'var(--orange)'
        : '';
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
