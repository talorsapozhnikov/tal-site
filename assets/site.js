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

  /* ---------- home: cover lines and contents, from PROJECTS ---------- */
  Site.home = function () {
    var list = document.getElementById('contents-list');
    var lines = document.getElementById('cover-lines');
    Site.renderers.push(function () {
      document.title = Site.lang === 'he' ? 'טל אור ספוזניקוב · צילום' : 'Tal Or Sapozhnikov · Photography';
      if (list) list.innerHTML = window.PROJECTS.map(function (p) {
        return '<li><a href="' + Site.href('project.html?id=' + p.id) + '">' +
          '<span class="k kicker">' + Site.t(p.kind) + '</span>' +
          '<span class="t">' + Site.t(p.title) + '</span>' +
          '<span class="m">' + Site.count(p.photos.length) + '</span>' +
          '<span class="thumb">' + Site.img(p.thumb, '150px') + '</span></a></li>';
      }).join('');
      if (lines) lines.innerHTML = window.PROJECTS.map(function (p) {
        return '<li><a href="' + Site.href('project.html?id=' + p.id) + '"><small>' + Site.t(p.kind) + '</small><span>' + Site.t(p.title) + '</span></a></li>';
      }).join('');
    });
  };

  /* ---------- project page ---------- */
  Site.project = function () {
    var id = params.get('id');
    var all = window.PROJECTS;
    var i = all.findIndex(function (p) { return p.id === id; });
    var head = document.getElementById('p-head'), gal = document.getElementById('gallery'), next = document.getElementById('next'), miss = document.getElementById('missing');
    if (i < 0) { head.hidden = true; gal.hidden = true; next.hidden = true; miss.hidden = false; return; }
    var p = all[i], n = all[(i + 1) % all.length];
    var sizes = {
      tall: '(min-width:760px) 50vw, 100vw', full: '(min-width:1280px) 1240px, 100vw', wide: '(min-width:760px) 75vw, 100vw',
      'wide-end': '(min-width:760px) 75vw, 100vw', 'pair-a': '(min-width:760px) 58vw, 100vw', 'pair-b': '(min-width:760px) 33vw, 75vw'
    };
    Site.renderers.push(function () {
      document.title = Site.t(p.title) + ' · ' + (Site.lang === 'he' ? 'טל אור ספוזניקוב' : 'Tal Or Sapozhnikov');
      head.innerHTML = '<span class="kicker">' + Site.t(p.kind) + '</span><h1>' + Site.t(p.title) + '</h1>' +
        '<span class="count">' + Site.count(p.photos.length) + '</span>' + (p.note ? '<p class="note">' + Site.t(p.note) + '</p>' : '');
      gal.innerHTML = p.photos.map(function (ph, k) {
        return '<figure class="' + ph.layout + '"><div class="photo">' + Site.img(ph.name, sizes[ph.layout], k === 0) + '</div></figure>';
      }).join('');
      next.hidden = all.length < 2;
      next.querySelector('a').href = Site.href('project.html?id=' + n.id);
      next.querySelector('.t').textContent = Site.t(n.title);
    });
  };
})();
