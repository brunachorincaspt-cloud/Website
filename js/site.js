/* =========================================================
   Bruna Chorincas — shared behaviour
   Loaded by every page. Each page calls only what it needs.
   ========================================================= */

/* ---------- MOBILE MENU (every page) ---------- */
(function initNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });

  // Close the drawer after tapping a link.
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
      toggle.focus();
    }
  });
})();

/* ---------- HEADER STATE ON SCROLL (pages that scroll) ---------- */
function initScrollHeader(){
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const startsOnHero = header.classList.contains('on-hero');
  const update = () => {
    const past = window.scrollY > 40;
    if (startsOnHero) header.classList.toggle('on-hero', !past);
    header.classList.toggle('scrolled', past || !startsOnHero);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- HERO SLIDESHOW (home page) ---------- */
function initHeroSlideshow(interval = 5000){
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, interval);
}

/* ---------- GALLERY FILTERS (portfolio page) ---------- */
function initFilters(){
  const buttons = document.querySelectorAll('.filters button');
  const frames = document.querySelectorAll('.grid .frame');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      frames.forEach(frame => {
        // A tile can belong to several categories: data-cat="styling content"
        const cats = (frame.dataset.cat || '').split(/\s+/);
        frame.classList.toggle('show', filter === 'all' || cats.includes(filter));
      });
    });
  });
}
