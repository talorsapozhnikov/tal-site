/* Scroll reveal: photos, cards and headings rise slightly and fade in as they enter the screen.
   Loaded after Site.home() / Site.project() have built the galleries; a MutationObserver also
   picks up anything rendered later. Content is only hidden once this script is running
   (html.motion-ready), so without JavaScript, without IntersectionObserver, or with reduced
   motion everything is simply visible. The cover photo is never animated. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  /* headings move as one piece; photos and cards move one by one */
  var HEADS = '.sec-head, .p-head, .sel-group > header, .cat > header, .cat > .sub-h, .chapter > header, .next';
  var UNITS = '.seq figure, .cards > li';
  var STEP = 70, MAX_STEPS = 3;   /* a short stagger inside one row, never a slow chain */

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });

  /* position within its own row: 0, 70, 140 or 210 ms */
  function delay(el) {
    var row = el.closest('.crow, .cards, .b');
    if (!row) return 0;
    var units = Array.prototype.filter.call(row.children, function (c) { return c.tagName === 'FIGURE' || c.tagName === 'LI'; });
    var i = units.indexOf(el);
    return Math.max(0, Math.min(i, MAX_STEPS)) * STEP;
  }

  function prepare(el) {
    if (el.classList.contains('reveal') || el.closest('.cover-photo, .lb')) return;
    el.classList.add('reveal');
    var d = delay(el);
    if (d) el.style.setProperty('--reveal-delay', d + 'ms');
    /* already scrolled past (e.g. returning with Back): show at once, no animation */
    if (el.getBoundingClientRect().bottom < 0) { el.classList.add('is-visible'); return; }
    io.observe(el);
  }

  function scan(scope) {
    if (scope.matches && (scope.matches(HEADS) || scope.matches(UNITS))) prepare(scope);
    if (scope.querySelectorAll) scope.querySelectorAll(HEADS + ', ' + UNITS).forEach(prepare);
  }

  root.classList.add('motion-ready');
  scan(document);

  /* galleries rendered after this point are picked up too */
  var queued = [], pending = false;
  new MutationObserver(function (records) {
    records.forEach(function (r) { r.addedNodes.forEach(function (n) { if (n.nodeType === 1) queued.push(n); }); });
    if (pending || !queued.length) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; var q = queued; queued = []; q.forEach(scan); });
  }).observe(document.body, { childList: true, subtree: true });
})();
