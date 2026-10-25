/* Language switch (Hebrew default, English), shared photo markup, and rendering of the project index and pages. */
(function () {
  var root = document.documentElement;
  var params = new URLSearchParams(location.search);

  function stored() { try { return localStorage.getItem('lang'); } catch (e) { return null; } }
  function store(l) { try { localStorage.setItem('lang', l); } catch (e) {} }

  var Site = window.Site = {
    lang: params.get('lang') === 'en' || params.get('lang') === 'he' ? params.get('lang') : (stored() === 'en' ? 'en' : 'he'),
    renderers: [],
    t: function (o) { return o ? o[Site.lang] : ''; },
    esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); },
    /* links keep the language even where localStorage is unavailable */
    href: function (path) {
      if (Site.lang === 'he') return path;
      var hash = path.indexOf('#') > -1 ? path.slice(path.indexOf('#')) : '';
      var base = hash ? path.slice(0, path.indexOf('#')) : path;
      return base + (base.indexOf('?') > -1 ? '&' : '?') + 'lang=en' + hash;
    },
    img: function (name, sizes, eager) {
      var p = window.PHOTOS[name];
      var ws = p.portrait ? [600, 1000, 1400] : [400, 800, 1400, 2000];
      var w = p.w || (p.portrait ? 1000 : 1500), h = p.h || (p.portrait ? 1500 : 1000);
      var srcset = ws.map(function (x) { return 'images/' + name + '-' + x + '.webp ' + x + 'w'; }).join(', ');
      return '<img src="images/' + name + '-' + ws[ws.length - 2] + '.webp" srcset="' + srcset + '" sizes="' + sizes +
        '" width="' + w + '" height="' + h + '" ' + (eager ? 'fetchpriority="high"' : 'loading="lazy"') +
        ' decoding="async" alt="' + Site.esc(Site.t(p.alt)) + '">';
    },
    count: function (n) { return Site.lang === 'he' ? n + ' תמונות' : n + ' photographs'; }
  };

  var statics, labels, alts, keep;
  function collect() {
    statics = document.querySelectorAll('[data-en]');
    labels = document.querySelectorAll('[data-en-label]');
    alts = document.querySelectorAll('img[data-en-alt]');
    keep = document.querySelectorAll('a[data-href]');
    statics.forEach(function (n) { if (n.dataset.he == null) n.dataset.he = n.textContent; });
    labels.forEach(function (n) { if (n.dataset.heLabel == null) n.dataset.heLabel = n.getAttribute('aria-label'); });
    alts.forEach(function (n) { if (n.dataset.heAlt == null) n.dataset.heAlt = n.alt; });
  }

  function apply() {
    var he = Site.lang === 'he';
    root.lang = Site.lang;
    root.dir = he ? 'rtl' : 'ltr';
    statics.forEach(function (n) { n.textContent = he ? n.dataset.he : n.dataset.en; });
    labels.forEach(function (n) { n.setAttribute('aria-label', he ? n.dataset.heLabel : n.dataset.enLabel); });
    alts.forEach(function (n) { n.alt = he ? n.dataset.heAlt : n.dataset.enAlt; });
    keep.forEach(function (a) { a.href = Site.href(a.dataset.href); });
    Site.renderers.forEach(function (f) { f(); });
    var b = document.getElementById('lang');
    if (b) {
      b.textContent = he ? 'EN' : 'עב';
      b.setAttribute('aria-label', he ? 'Switch to English' : 'מעבר לעברית');
      b.setAttribute('lang', he ? 'en' : 'he');
    }
  }

  Site.start = function () {
    collect();
    apply();
    var b = document.getElementById('lang');
    if (b) b.addEventListener('click', function () {
      Site.lang = Site.lang === 'he' ? 'en' : 'he';
      store(Site.lang);
      if (params.has('lang')) {
        params.set('lang', Site.lang);
        history.replaceState(null, '', location.pathname + '?' + params.toString() + location.hash);
      }
      apply();
    });
  };

  /* ---------- collage: rows of photos at their own proportions, heights equal within a row ---------- */
  function ratio(name) { var p = window.PHOTOS[name]; return p.w ? p.w / p.h : (p.portrait ? 2 / 3 : 1.5); }
  Site.collage = function (names, rows, eager) {
    rows = rows && rows.length ? rows : [2, 3];
    var out = '', i = 0, r = 0;
    while (i < names.length) {
      var n = Math.min(rows[r % rows.length], names.length - i), row = names.slice(i, i + n);
      var total = row.reduce(function (a, x) { return a + ratio(x); }, 0);
      out += '<div class="crow n' + n + '">' + row.map(function (x, k) {
        var share = Math.round(ratio(x) / total * 100);
        return '<figure style="flex-grow:' + ratio(x).toFixed(3) + '"><div class="photo">' +
          Site.img(x, '(min-width:1240px) ' + Math.round(12.4 * share) + 'px, (min-width:700px) ' + share + 'vw, ' + (n === 3 && k === 0 ? 100 : 50) + 'vw', eager && i === 0 && k === 0) +
          '</div></figure>';
      }).join('') + '</div>';
      i += n; r++;
    }
    return out;
  };
  /* categories that have photos; for weddings, only the chapters that have photos */
  function cats() {
    return window.CATEGORIES.map(function (c) {
      if (!c.chapters) return c.photos.length ? c : null;
      var ch = c.chapters.filter(function (x) { return x.photos.length; });
      return ch.length ? { id: c.id, title: c.title, chapters: ch } : null;
    }).filter(Boolean);
  }
  /* every page-able unit: wedding chapters and the plain categories, in page order */
  function units() {
    var out = [];
    cats().forEach(function (c) {
      if (c.chapters) c.chapters.forEach(function (x, k) { out.push({ unit: x, parent: c, no: k + 1 }); });
      else out.push({ unit: c });
    });
    return out;
  }
  function two(n) { return String(n).padStart(2, '0'); }
  function moreLink(u) {
    var many = u.photos.length > 5, he = Site.lang === 'he';
    return '<a class="more" href="' + Site.href('project.html?id=' + u.id) + '">' +
      (he ? (many ? 'לכל ' + u.photos.length + ' התמונות ←' : 'לפרק המלא ←') : (many ? 'All ' + u.photos.length + ' photographs →' : 'Open →')) + '</a>';
  }
  function block(u, no, level) {
    return '<section class="chapter" id="' + u.id + '" aria-labelledby="h-' + u.id + '"><header>' +
      (no ? '<span class="no">' + two(no) + '</span>' : '') +
      '<h' + level + ' id="h-' + u.id + '">' + Site.t(u.title) + '</h' + level + '>' + moreLink(u) +
      '</header><div class="collage">' + Site.collage(u.photos.slice(0, 5), u.rows) + '</div></section>';
  }

  /* ---------- home: cover lines, index, and the categories with their collages ---------- */
  Site.home = function () {
    var list = document.getElementById('contents-list');
    var lines = document.getElementById('cover-lines');
    var box = document.getElementById('chapters');
    Site.renderers.push(function () {
      document.title = Site.lang === 'he' ? 'טל אור ספוזניקוב · צילום' : 'Tal Or Sapozhnikov · Photography';
      var cs = cats();
      if (list) list.innerHTML = cs.map(function (c) {
        var count = c.chapters ? c.chapters.reduce(function (a, x) { return a + x.photos.length; }, 0) : c.photos.length;
        var sub = c.chapters ? '<ol class="sub">' + c.chapters.map(function (x, k) {
          return '<li><a href="#' + x.id + '"><span class="no">' + two(k + 1) + '</span><span class="t">' + Site.t(x.title) + '</span><span class="m">' + Site.count(x.photos.length) + '</span></a></li>';
        }).join('') + '</ol>' : '';
        return '<li class="cat"><a href="#cat-' + c.id + '"><span class="t">' + Site.t(c.title) + '</span><span class="m">' + Site.count(count) + '</span></a>' + sub + '</li>';
      }).join('');
      if (lines) lines.innerHTML = cs.map(function (c) {
        return '<li><a href="#cat-' + c.id + '"><span>' + Site.t(c.title) + '</span></a>' +
          (c.chapters ? '<small>' + c.chapters.map(function (x) { return Site.t(x.title); }).join(' · ') + '</small>' : '') + '</li>';
      }).join('');
      if (box) box.innerHTML = cs.map(function (c) {
        if (!c.chapters) return '<div class="category" id="cat-' + c.id + '">' + block(c, 0, 2) + '</div>';
        return '<div class="category" id="cat-' + c.id + '"><header class="cat-head"><h2>' + Site.t(c.title) + '</h2>' +
          '<p>' + (Site.lang === 'he' ? 'לפי רגעים ביום, מהביוטי ועד הרחבה.' : 'By moments of the day, from getting ready to the dance floor.') + '</p></header>' +
          c.chapters.map(function (x, k) { return block(x, k + 1, 3); }).join('') + '</div>';
      }).join('');
    });
  };

  /* ---------- chapter or category page ---------- */
  Site.project = function () {
    var id = params.get('id');
    var all = units();
    var i = all.findIndex(function (e) { return e.unit.id === id; });
    var head = document.getElementById('p-head'), gal = document.getElementById('gallery'), next = document.getElementById('next'), miss = document.getElementById('missing');
    if (i < 0) { head.hidden = true; gal.hidden = true; next.hidden = true; miss.hidden = false; return; }
    var e = all[i], c = e.unit, n = all[(i + 1) % all.length].unit;
    Site.renderers.push(function () {
      document.title = Site.t(c.title) + ' · ' + (Site.lang === 'he' ? 'טל אור ספוזניקוב' : 'Tal Or Sapozhnikov');
      head.innerHTML = (e.parent ? '<span class="kicker">' + Site.t(e.parent.title) + ' · ' + two(e.no) + '</span>' : '') + '<h1>' + Site.t(c.title) + '</h1>' +
        '<span class="count">' + Site.count(c.photos.length) + '</span>';
      gal.innerHTML = '<div class="collage">' + Site.collage(c.photos, c.rows, true) + '</div>';
      next.hidden = all.length < 2;
      next.querySelector('a').href = Site.href('project.html?id=' + n.id);
      next.querySelector('.t').textContent = Site.t(n.title);
    });
  };
})();
