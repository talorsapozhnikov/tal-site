/* Full-screen photo viewer.
   Any <button class="zoom" data-photo="id"> opens it. Navigation stays inside the nearest
   [data-gallery], so a wedding photo never leads into festival photos.
   Keyboard: arrows, Escape, Tab stays inside. Touch: swipe sideways to move, swipe down to close.
   The browser Back button closes the viewer instead of leaving the page. */
(function () {
  var box, img, counter, btnClose, btnPrev, btnNext, status;
  var list = [], index = 0, opener = null, open = false, pushed = false;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function L(he, en) { return window.Site && Site.lang === 'en' ? en : he; }
  function rtl() { return document.documentElement.dir === 'rtl'; }

  function icon(d) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }

  function build() {
    box = document.createElement('div');
    box.className = 'lb';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<div class="lb-stage"><img class="lb-img" alt="" decoding="async"></div>' +
      '<p class="lb-status" role="status"></p>' +
      '<div class="lb-bar"><span class="lb-count" aria-live="polite"></span>' +
      '<button type="button" class="lb-btn lb-close">' + icon('M6 6l12 12M18 6L6 18') + '</button></div>' +
      '<button type="button" class="lb-btn lb-side lb-prev">' + icon('M15 5l-7 7 7 7') + '</button>' +
      '<button type="button" class="lb-btn lb-side lb-next">' + icon('M9 5l7 7-7 7') + '</button>';
    document.body.appendChild(box);
    img = box.querySelector('.lb-img');
    counter = box.querySelector('.lb-count');
    status = box.querySelector('.lb-status');
    btnClose = box.querySelector('.lb-close');
    btnPrev = box.querySelector('.lb-prev');
    btnNext = box.querySelector('.lb-next');

    btnClose.addEventListener('click', function () { close(); });
    btnPrev.addEventListener('click', function () { go(-1); });
    btnNext.addEventListener('click', function () { go(1); });
    box.addEventListener('click', function (e) {
      if (moved) { moved = false; return; }
      if (e.target === box || e.target.classList.contains('lb-stage')) close();
    });
    box.addEventListener('keydown', onKey);
    img.addEventListener('error', function () {
      if (img.dataset.state === 'full') { img.dataset.state = 'failed'; img.hidden = true; status.textContent = L('לא הצלחנו לטעון את התמונה.', 'This photograph could not be loaded.'); }
    });
    swipe();
  }

  /* ---------- open / close ---------- */
  function openAt(button) {
    var gallery = button.closest('[data-gallery]');
    var buttons = gallery ? gallery.querySelectorAll('button.zoom') : [button];
    list = Array.prototype.map.call(buttons, function (b) { return { name: b.dataset.photo, el: b }; });
    index = Math.max(0, list.findIndex(function (x) { return x.el === button; }));
    opener = button;
    if (!box) build();
    labels();
    box.hidden = false;
    document.documentElement.classList.add('lb-open');
    open = true;
    show(0);
    requestAnimationFrame(function () { box.classList.add('on'); });
    btnClose.focus({ preventScroll: true });
    try { history.pushState({ lightbox: true }, ''); pushed = true; } catch (e) { pushed = false; }
  }
  function close(fromHistory) {
    if (!open) return;
    open = false;
    box.classList.remove('on');
    var done = function () {
      box.hidden = true;
      img.removeAttribute('src'); img.removeAttribute('srcset');
      document.documentElement.classList.remove('lb-open');
      if (opener) opener.focus({ preventScroll: true });
    };
    if (reduce) done(); else setTimeout(done, 280);
    if (pushed && !fromHistory) { pushed = false; history.back(); }
    pushed = false;
  }
  window.addEventListener('popstate', function () { if (open) { pushed = false; close(true); } });

  /* ---------- showing a photo ---------- */
  function labels() {
    box.setAttribute('aria-label', L('צפייה בתמונות', 'Photo viewer'));
    btnClose.setAttribute('aria-label', L('סגירה', 'Close'));
    btnPrev.setAttribute('aria-label', L('התמונה הקודמת', 'Previous photograph'));
    btnNext.setAttribute('aria-label', L('התמונה הבאה', 'Next photograph'));
  }
  function show(step) {
    var item = list[index], p = window.PHOTOS[item.name];
    var thumb = item.el.querySelector('img');
    status.textContent = '';
    img.hidden = false;
    img.style.transform = '';
    img.style.opacity = '';
    if (!reduce && step) { img.classList.remove('fade'); void img.offsetWidth; img.classList.add('fade'); }
    /* show the already-loaded thumbnail at once, then swap in a large file chosen for this screen */
    img.dataset.state = 'thumb';
    img.removeAttribute('srcset');
    if (thumb && thumb.currentSrc) img.src = thumb.currentSrc;
    img.alt = p ? Site.t(p.alt) : '';
    var r = Site.ratio(item.name);
    img.style.aspectRatio = String(r);
    var sizes = 'min(100vw, ' + Math.round(100 * r) + 'vh)';
    var full = new Image();
    full.sizes = sizes;
    full.srcset = Site.srcset(item.name);
    full.decoding = 'async';
    full.onload = function () {
      if (!open || list[index] !== item) return;
      img.dataset.state = 'full';
      img.sizes = sizes; img.srcset = full.srcset; img.src = full.currentSrc || Site.largest(item.name);
      preload(index + 1); preload(index - 1);
    };
    full.onerror = function () {
      if (!open || list[index] !== item) return;
      if (!thumb || !thumb.currentSrc || !thumb.naturalWidth) { img.dataset.state = 'failed'; img.hidden = true; status.textContent = L('לא הצלחנו לטעון את התמונה.', 'This photograph could not be loaded.'); }
    };
    counter.textContent = (index + 1) + ' / ' + list.length;
    var single = list.length < 2;
    btnPrev.hidden = single; btnNext.hidden = single;
  }
  function preload(i) {
    if (i < 0 || i >= list.length) return;
    var name = list[i].name, r = Site.ratio(name), pre = new Image();
    pre.sizes = 'min(100vw, ' + Math.round(100 * r) + 'vh)';
    pre.srcset = Site.srcset(name);
  }
  function go(step) {
    if (list.length < 2) return;
    index = (index + step + list.length) % list.length;
    show(step);
  }

  /* ---------- keyboard ---------- */
  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(rtl() ? -1 : 1); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(rtl() ? 1 : -1); return; }
    if (e.key === 'Tab') {
      var f = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.hidden; });
      var at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  }

  /* ---------- touch ---------- */
  var moved = false;
  function swipe() {
    var stage = box.querySelector('.lb-stage'), pts = {}, sx = 0, sy = 0, dx = 0, dy = 0, axis = null, active = false;
    stage.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      pts[e.pointerId] = true;
      if (Object.keys(pts).length > 1) { active = false; reset(); return; }   /* pinch: leave it to the browser */
      active = true; axis = null; sx = e.clientX; sy = e.clientY; dx = dy = 0;
    });
    stage.addEventListener('pointermove', function (e) {
      if (!active) return;
      dx = e.clientX - sx; dy = e.clientY - sy;
      if (!axis && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axis === 'x' && list.length > 1) img.style.transform = 'translateX(' + dx + 'px)';
      if (axis === 'y' && dy > 0) { img.style.transform = 'translateY(' + dy + 'px)'; img.style.opacity = String(Math.max(.4, 1 - dy / 600)); }
    });
    function end(e) {
      delete pts[e.pointerId];
      if (!active) return;
      active = false;
      if (axis) moved = true;
      if (axis === 'x' && Math.abs(dx) > 60 && list.length > 1) { var forward = dx < 0; go((forward ? 1 : -1) * (rtl() ? -1 : 1)); }
      else if (axis === 'y' && dy > 110) { close(); }
      else reset();
    }
    function reset() { img.style.transform = ''; img.style.opacity = ''; }
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', function (e) { delete pts[e.pointerId]; active = false; reset(); });
  }

  window.Lightbox = {
    init: function () {
      document.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('button.zoom');
        if (b) { e.preventDefault(); openAt(b); }
      });
    }
  };
})();
