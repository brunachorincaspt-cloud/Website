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
  const empty = document.getElementById('emptyFilter');
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
      let shown = 0;
      frames.forEach(frame => {
        // A tile can belong to several categories: data-cat="styling content"
        const cats = (frame.dataset.cat || '').split(/\s+/);
        const match = filter === 'all' || cats.includes(filter);
        frame.classList.toggle('show', match);
        if (match) shown++;
      });
      // A category with nothing in it should say so, not look broken.
      if (empty) empty.hidden = shown > 0;
    });
  });
}

/* ---------- LOOPING CLIPS ON THE GRID ---------- */
/* Silent previews play only while on screen, so a phone isn't decoding five
   films at once or spending data on tiles nobody has scrolled to. */
(function initGridClips(){
  const clips = document.querySelectorAll('.frame video');
  if (!clips.length) return;

  // Someone who asked for less motion gets the still frame instead.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (!('IntersectionObserver' in window)) {
    clips.forEach(v => v.play().catch(() => {}));   // older browsers: just play
    return;
  }

  const seen = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        // A browser may still refuse; the poster frame stays, which is fine.
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { rootMargin: '100px' });

  clips.forEach(v => seen.observe(v));
})();
