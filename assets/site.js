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
    signature();
    var b = document.getElementById('lang');
    if (b) {
      b.textContent = he ? 'EN' : 'עב';
      b.setAttribute('aria-label', he ? 'Switch to English' : 'מעבר לעברית');
      b.setAttribute('lang', he ? 'en' : 'he');
    }
  }

  /* the signature s: wrap each Latin s in display headings so CSS can draw it wide, like the logo */
  function signature() {
    document.querySelectorAll('h1, h2, h3, .card .t, .next .t, .mast .alt').forEach(function (el) {
      if (el.querySelector('.sig-s')) return;
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
      while (walker.nextNode()) if (/[sS]/.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
      nodes.forEach(function (t) {
        var frag = document.createDocumentFragment();
        t.nodeValue.split(/([sS])/).forEach(function (part) {
          if (!part) return;
          if (part === 's' || part === 'S') { var sp = document.createElement('span'); sp.className = 'sig-s'; sp.textContent = part; frag.appendChild(sp); }
          else frag.appendChild(document.createTextNode(part));
        });
        t.parentNode.replaceChild(frag, t);
      });
    });
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

  /* ---------- photo rows: photos at their own proportions, heights equal within a row ---------- */
  function ratio(name) { var p = window.PHOTOS[name]; return p.w ? p.w / p.h : (p.portrait ? 2 / 3 : 1.5); }
  function fig(name, sizes, eager) { return '<figure><div class="photo">' + Site.img(name, sizes, eager) + '</div></figure>'; }
  function eqRow(row, cls, eager) {
    var total = row.reduce(function (a, x) { return a + ratio(x); }, 0);
    return '<div class="crow n' + row.length + (cls ? ' ' + cls : '') + '">' + row.map(function (x, k) {
      var share = Math.round(ratio(x) / total * 100);
      return '<figure style="flex-grow:' + ratio(x).toFixed(3) + '"><div class="photo">' +
        Site.img(x, '(min-width:1240px) ' + Math.round(12.4 * share) + 'px, (min-width:700px) ' + share + 'vw, ' + (row.length === 3 && k === 0 ? 100 : 50) + 'vw', eager && k === 0) +
        '</div></figure>';
    }).join('') + '</div>';
  }
  /* fallback: automatic rows of 2, then 3 */
  Site.collage = function (names, rows, eager) {
    rows = rows && rows.length ? rows : [2, 3];
    var out = '', i = 0, r = 0;
    while (i < names.length) {
      var n = Math.min(rows[r % rows.length], names.length - i);
      out += eqRow(names.slice(i, i + n), '', eager && i === 0);
      i += n; r++;
    }
    return out;
  };

  /* ---------- editorial blocks (see assets/projects.js) ---------- */
  function blockNames(b) { return [].concat(b.full || [], b.wide || [], b.solo || [], b.pair || [], b.row || []); }
  function block(b, eager) {
    if (b.full) return '<div class="b full">' + fig(b.full, '(min-width:1240px) 1240px, 100vw', eager) + '</div>';
    if (b.wide) return '<div class="b wide ' + (b.align || 'start') + '">' + fig(b.wide, '(min-width:1240px) 930px, (min-width:700px) 75vw, 100vw', eager) + '</div>';
    if (b.solo) return '<div class="b solo ' + (b.align || 'center') + '">' + fig(b.solo, '(min-width:1240px) 520px, (min-width:700px) 42vw, 72vw', eager) + '</div>';
    if (b.pair && b.offset) return '<div class="b offset">' + fig(b.pair[0], '(min-width:1240px) 720px, (min-width:700px) 58vw, 100vw', eager) +
      fig(b.pair[1], '(min-width:1240px) 410px, (min-width:700px) 33vw, 75vw') + '</div>';
    if (b.pair) return '<div class="b">' + eqRow(b.pair, '', eager) + '</div>';
    if (b.row) return '<div class="b">' + eqRow(b.row, '', eager) + '</div>';
    return '';
  }
  Site.sequence = function (layout, photos, eager) {
    var used = [], out = '';
    (layout || []).forEach(function (b, k) { out += block(b, eager && k === 0); used = used.concat(blockNames(b)); });
    var rest = (photos || []).filter(function (n) { return used.indexOf(n) < 0; });
    if (rest.length) out += '<div class="b">' + Site.collage(rest, null, eager && !layout) + '</div>';
    return '<div class="seq">' + out + '</div>';
  };

  /* categories that have photos; for weddings, only the chapters that have photos */
  function cats() {
    return window.CATEGORIES.map(function (c) {
      if (!c.chapters) return c.photos.length ? c : null;
      var ch = c.chapters.filter(function (x) { return x.photos.length; });
      return ch.length ? { id: c.id, title: c.title, chapters: ch } : null;
    }).filter(Boolean);
  }
  function countOf(c) { return c.chapters ? c.chapters.reduce(function (a, x) { return a + x.photos.length; }, 0) : c.photos.length; }
  function two(n) { return String(n).padStart(2, '0'); }
  var NAME = { he: 'טל אור ספוזניקוב', en: 'Tal Or Sapozhnikov' };

  function setMeta(title, desc) {
    document.title = title;
    [['name', 'description'], ['property', 'og:description']].forEach(function (m) {
      var el = document.querySelector('meta[' + m[0] + '="' + m[1] + '"]'); if (el) el.setAttribute('content', desc);
    });
    var og = document.querySelector('meta[property="og:title"]'); if (og) og.setAttribute('content', title);
  }

  /* ---------- home: selected work, then the archive ---------- */
  Site.home = function () {
    var sel = document.getElementById('selected-seq');
    var arch = document.getElementById('archive-list');
    Site.renderers.push(function () {
      var he = Site.lang === 'he';
      setMeta(he ? 'טל אור ספוזניקוב · צילום' : 'Tal Or Sapozhnikov · Photography',
        he ? 'טל אור ספוזניקוב, צלם דוקומנטרי. חתונות, אירועים, הופעות, פסטיבלים והפקות. רגעים אמיתיים, סיפורים דרך העדשה.'
           : 'Tal Or Sapozhnikov, documentary photographer. Weddings, events, concerts, festivals and productions. Real moments, stories through the lens.');
      if (sel) sel.innerHTML = Site.sequence(window.SELECTED, []);
      if (arch) arch.innerHTML = cats().map(function (c) {
        var items = c.chapters || [c];
        return '<section class="cat" aria-labelledby="cat-' + c.id + '"><header>' +
          '<h3 id="cat-' + c.id + '">' + Site.t(c.title) + '</h3><span class="m">' + Site.count(countOf(c)) + '</span>' +
          '<a class="more" href="' + Site.href('project.html?id=' + c.id) + '">' + (he ? 'הכול ברצף ←' : 'View all →') + '</a></header>' +
          '<ol class="cards">' + items.map(function (x, k) {
            return '<li><a class="card" href="' + Site.href('project.html?id=' + x.id) + '">' +
              '<div class="photo">' + Site.img(x.cover || x.photos[0], '(min-width:1240px) 300px, (min-width:700px) 24vw, 50vw') + '</div>' +
              '<span class="no">' + two(k + 1) + '</span><span class="t">' + Site.t(x.title) + '</span><span class="m">' + Site.count(x.photos.length) + '</span></a></li>';
          }).join('') + '</ol></section>';
      }).join('');
    });
  };

  /* ---------- project page: a chapter, a plain category, or a whole category with its chapters ---------- */
  Site.project = function () {
    var id = params.get('id');
    var list = [];
    cats().forEach(function (c) {
      list.push({ unit: c, isCat: true });
      if (c.chapters) c.chapters.forEach(function (x, k) { list.push({ unit: x, parent: c, no: k + 1 }); });
    });
    var e = list.filter(function (x) { return x.unit.id === id; })[0];
    var head = document.getElementById('p-head'), gal = document.getElementById('gallery'), next = document.getElementById('next'), miss = document.getElementById('missing');
    if (!e) { head.hidden = true; gal.hidden = true; next.hidden = true; miss.hidden = false;
      Site.renderers.push(function () { setMeta((Site.lang === 'he' ? 'לא נמצא · ' : 'Not found · ') + NAME[Site.lang], ''); }); return; }
    var u = e.unit;
    var siblings = e.parent ? e.parent.chapters : null;
    var n = siblings ? siblings[(siblings.indexOf(u) + 1) % siblings.length] : null;
    Site.renderers.push(function () {
      var he = Site.lang === 'he', total = countOf(u);
      var where = e.parent ? Site.t(u.title) + ' · ' + Site.t(e.parent.title) : Site.t(u.title);
      setMeta(where + ' · ' + NAME[Site.lang],
        he ? where + '. צילום דוקומנטרי של טל אור ספוזניקוב, ' + Site.count(total) + '.'
           : where + '. Documentary photography by Tal Or Sapozhnikov, ' + Site.count(total) + '.');
      head.innerHTML = (e.parent ? '<span class="kicker">' + Site.t(e.parent.title) + ' · ' + two(e.no) + '</span>' : '<span class="kicker">' + (he ? 'ארכיון' : 'Archive') + '</span>') +
        '<h1>' + Site.t(u.title) + '</h1><span class="count">' + Site.count(total) + '</span>';
      if (u.chapters) {
        gal.innerHTML = u.chapters.map(function (x, k) {
          return '<section class="chapter" aria-labelledby="h-' + x.id + '"><header><span class="no">' + two(k + 1) + '</span>' +
            '<h2 id="h-' + x.id + '">' + Site.t(x.title) + '</h2><a class="more" href="' + Site.href('project.html?id=' + x.id) + '">' + (he ? 'לפרק ←' : 'Open →') + '</a></header>' +
            Site.sequence(x.layout, x.photos, k === 0) + '</section>';
        }).join('');
      } else {
        gal.innerHTML = Site.sequence(u.layout, u.photos, true);
      }
      next.hidden = !n || n === u;
      if (n) {
        next.querySelector('a').href = Site.href('project.html?id=' + n.id);
        next.querySelector('.t').textContent = Site.t(n.title);
      }
    });
  };
})();
