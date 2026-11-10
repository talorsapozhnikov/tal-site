/* The experience layer, loaded last and only adding to what already works:
   1. The dark room: while the selected work fills the middle of the screen, the whole page dims
      to a warm dark, then returns to paper. Without JavaScript the section is simply dark.
   2. A quiet "View" cursor over photographs, on devices with a precise pointer only.
   Always: the sticky top bar hides while scrolling down and returns when scrolling up.
   Reduced motion: the room stays a plain dark section and the normal cursor is kept. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* full-screen photographs measure the page without the scrollbar, so nothing is cut at the edge */
  function sbw() { root.style.setProperty('--sbw', (window.innerWidth - root.clientWidth) + 'px'); }
  sbw(); window.addEventListener('resize', sbw);

  /* the top bar steps aside while scrolling down to read, and comes back on the way up */
  var last = window.scrollY, ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY, d = y - last;
      root.classList.toggle('bar-scrolled', y > 8);
      if (y < 120 || d < -6) root.classList.remove('bar-hidden');
      else if (d > 6 && !root.classList.contains('lb-open')) root.classList.add('bar-hidden');
      last = y;
    });
  }, { passive: true });
  /* keyboard users always see the bar when they move into it */
  document.addEventListener('focusin', function (e) { if (e.target.closest && e.target.closest('.bar')) root.classList.remove('bar-hidden'); });

  if (reduce) return;
  function L(he, en) { return window.Site && Site.lang === 'en' ? en : he; }

  /* ---------- 1. the dark room ---------- */
  var room = document.getElementById('selected');
  var meta = document.querySelector('meta[name="theme-color"]');
  if (room && 'IntersectionObserver' in window) {
    root.classList.add('room-js');
    new IntersectionObserver(function (entries) {
      var on = entries[0].isIntersecting;
      root.classList.toggle('dark-room', on);
      if (meta) meta.setAttribute('content', on ? '#221a14' : '#f6f6f3');
    }, { rootMargin: '-50% 0px -50% 0px' }).observe(room);
  }

  /* ---------- 2. the cursor ---------- */
  if (!(window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches)) return;
  var dot = document.createElement('div');
  dot.className = 'cursor';
  dot.setAttribute('aria-hidden', 'true');
  dot.innerHTML = '<span></span>';
  document.body.appendChild(dot);
  var label = dot.firstChild, x = -100, y = -100, cx = -100, cy = -100, shown = false, raf = 0;
  root.classList.add('cursor-js');

  function loop() {
    cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
    dot.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
    raf = (Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3) ? requestAnimationFrame(loop) : 0;
  }
  function show(text) {
    label.textContent = text;
    if (!shown) { cx = x; cy = y; shown = true; dot.classList.add('on'); }
  }
  function hide() { if (shown) { shown = false; dot.classList.remove('on'); } }

  document.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    var t = e.target.closest && e.target.closest('button.zoom, a.card');
    if (t && !root.classList.contains('lb-open')) show(t.tagName === 'A' ? L('פתיחה', 'Open') : L('צפייה', 'View'));
    else hide();
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.addEventListener('pointerleave', hide);
  document.addEventListener('click', hide);
})();
