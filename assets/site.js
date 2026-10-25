/* Language switch (Hebrew default, English), photo markup, and rendering of the home page,
   category / chapter pages and story pages. Data lives in assets/data/*.js.

   Pages are rendered once, with both languages in the markup ([data-he] / [data-en] text,
   [data-he-alt] / [data-en-alt] on images). Switching language only swaps text in place,
   so photos are never rebuilt and the page does not jump. */
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
    }
  };

  /* ---------- bilingual markup helpers ---------- */
  /* a text element carrying both languages; the language switch swaps its text */
  function tx(o, tag, attrs) {
    tag = tag || 'span';
    return '<' + tag + (attrs ? ' ' + attrs : '') + ' data-he="' + Site.esc(o.he) + '" data-en="' + Site.esc(o.en) + '">' + Site.esc(o[Site.lang]) + '</' + tag + '>';
  }
  /* an internal link that keeps the language */
  function link(path, cls, inner) {
    return '<a' + (cls ? ' class="' + cls + '"' : '') + ' href="' + Site.href(path) + '" data-href="' + path + '">' + inner + '</a>';
  }
  function count(n) { return { he: n + ' תמונות', en: n + ' photographs' }; }
  function two(n) { return String(n).padStart(2, '0'); }
  var NAME = { he: 'טל אור ספוזניקוב', en: 'Tal Or Sapozhnikov' };

  /* ---------- photos ---------- */
  function widths(p) { return p.portrait ? [600, 1000, 1400] : [400, 800, 1400, 2000]; }
  function ratio(name) { var p = window.PHOTOS[name]; return p.w ? p.w / p.h : (p.portrait ? 2 / 3 : 1.5); }
  Site.ratio = ratio;
  Site.srcset = function (name) {
    return widths(window.PHOTOS[name]).map(function (x) { return 'images/' + name + '-' + x + '.webp ' + x + 'w'; }).join(', ');
  };
  Site.largest = function (name) { var ws = widths(window.PHOTOS[name]); return 'images/' + name + '-' + ws[ws.length - 1] + '.webp'; };
  Site.img = function (name, sizes, eager) {
    var p = window.PHOTOS[name];
    var ws = widths(p);
    var w = p.w || (p.portrait ? 1000 : 1500), h = p.h || (p.portrait ? 1500 : 1000);
    return '<img src="images/' + name + '-' + ws[ws.length - 2] + '.webp" srcset="' + Site.srcset(name) + '" sizes="' + sizes +
      '" width="' + w + '" height="' + h + '" ' + (eager ? 'fetchpriority="high"' : 'loading="lazy"') +
      ' decoding="async" alt="' + Site.esc(Site.t(p.alt)) + '" data-he-alt="' + Site.esc(p.alt.he) + '" data-en-alt="' + Site.esc(p.alt.en) + '">';
  };
  /* a photo the visitor can open full screen (see assets/lightbox.js) */
  function zoom(name, sizes, eager) {
    return '<button type="button" class="zoom" data-photo="' + name + '" aria-haspopup="dialog">' + Site.img(name, sizes, eager) + '</button>';
  }

  /* ---------- rows and editorial blocks ---------- */
  function fig(name, sizes, eager) { return '<figure><div class="photo">' + zoom(name, sizes, eager) + '</div></figure>'; }
  function eqRow(row, eager) {
    var total = row.reduce(function (a, x) { return a + ratio(x); }, 0);
    return '<div class="crow n' + row.length + '">' + row.map(function (x, k) {
      var share = Math.round(ratio(x) / total * 100);
      return '<figure style="flex-grow:' + ratio(x).toFixed(3) + '"><div class="photo">' +
        zoom(x, '(min-width:1240px) ' + Math.round(11.2 * share) + 'px, ' + share + 'vw', eager && k === 0) +
        '</div></figure>';
    }).join('') + '</div>';
  }
  /* fallback: automatic rows of 2, then 3 */
  function collage(names, eager) {
    var rows = [2, 3], out = '', i = 0, r = 0;
    while (i < names.length) {
      var n = Math.min(rows[r % rows.length], names.length - i);
      out += eqRow(names.slice(i, i + n), eager && i === 0);
      i += n; r++;
    }
    return out;
  }
  function blockNames(b) { return [].concat(b.full || [], b.wide || [], b.solo || [], b.pair || [], b.row || []); }
  Site.blockNames = blockNames;
  function block(b, eager) {
    if (b.full) return '<div class="b full">' + fig(b.full, '(min-width:1240px) 1120px, 100vw', eager) + '</div>';
    if (b.wide) return '<div class="b wide ' + (b.align || 'start') + '">' + fig(b.wide, '(min-width:1240px) 840px, (min-width:700px) 75vw, 100vw', eager) + '</div>';
    if (b.solo) return '<div class="b solo ' + (b.align || 'center') + '">' + fig(b.solo, '(min-width:1240px) 470px, (min-width:700px) 42vw, 72vw', eager) + '</div>';
    if (b.pair && b.offset) return '<div class="b offset">' + fig(b.pair[0], '(min-width:1240px) 650px, (min-width:700px) 58vw, 100vw', eager) +
      fig(b.pair[1], '(min-width:1240px) 370px, (min-width:700px) 33vw, 75vw') + '</div>';
    if (b.pair) return '<div class="b">' + eqRow(b.pair, eager) + '</div>';
    if (b.row) return '<div class="b">' + eqRow(b.row, eager) + '</div>';
    return '';
  }
  /* one gallery; the lightbox moves only between photos inside the same [data-gallery] */
  function sequence(layout, photos, gallery, eager) {
    var used = [], out = '';
    (layout || []).forEach(function (b, k) { out += block(b, eager && k === 0); used = used.concat(blockNames(b)); });
    var rest = (photos || []).filter(function (n) { return used.indexOf(n) < 0; });
    if (rest.length) out += '<div class="b">' + collage(rest, eager && !used.length) + '</div>';
    return '<div class="seq"' + (gallery ? ' data-gallery="' + gallery + '"' : '') + '>' + out + '</div>';
  }

  /* ---------- what is public ---------- */
  /* drafts can be opened on a local copy with &preview=1, never on the live site */
  var preview = params.get('preview') === '1' && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  function stories(catId) {
    return (window.STORIES || []).filter(function (s) {
      return s.published === true && (!catId || s.category === catId) && s.photos && s.photos.length;
    }).sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
  }
  /* categories with something to show; for weddings, only chapters that have photos */
  function cats() {
    return window.CATEGORIES.map(function (c) {
      var st = stories(c.id);
      if (c.chapters) {
        var ch = c.chapters.filter(function (x) { return x.photos.length; });
        return ch.length || st.length ? { id: c.id, title: c.title, chapters: ch, stories: st } : null;
      }
      return c.photos.length || st.length ? { id: c.id, title: c.title, photos: c.photos, layout: c.layout, cover: c.cover, stories: st } : null;
    }).filter(Boolean);
  }
  function countOf(c) { return c.chapters ? c.chapters.reduce(function (a, x) { return a + x.photos.length; }, 0) : (c.photos || []).length; }

  /* ---------- page metadata (crawlers that do not run JavaScript see the static tags in the HTML) ---------- */
  function setMeta(title, desc) {
    document.title = title;
    [['name', 'description'], ['property', 'og:description']].forEach(function (m) {
      var el = document.querySelector('meta[' + m[0] + '="' + m[1] + '"]'); if (el) el.setAttribute('content', desc);
    });
    var og = document.querySelector('meta[property="og:title"]'); if (og) og.setAttribute('content', title);
  }
  function setCanonical(path) {
    var c = document.querySelector('link[rel="canonical"]');
    if (!c) { c = document.createElement('link'); c.rel = 'canonical'; document.head.appendChild(c); }
    c.href = 'https://talorsapozhnikov.github.io/tal-site/' + path;
  }

  /* ---------- language switch ---------- */
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
  /* keep the element nearest the top of the screen in place while text changes length */
  function anchor() {
    var els = document.querySelectorAll('main h2, main h3, main figure, main p, .p-head, .cover-photo'), best = null;
    for (var i = 0; i < els.length; i++) {
      if (els[i].getBoundingClientRect().bottom > 0) { best = els[i]; break; }
    }
    if (!best || window.scrollY < 4) return function () {};
    var top = best.getBoundingClientRect().top;
    root.style.overflowAnchor = 'none';   /* one correction only: ours, not the browser's as well */
    return function () {
      var d = best.getBoundingClientRect().top - top;
      if (Math.abs(d) > 1) window.scrollTo({ top: window.scrollY + d, behavior: 'instant' });
      root.style.overflowAnchor = '';
    };
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

  /* the signature S: only in the masthead name, echoing the s of the tos logo.
     Other headings keep their natural letter spacing. */
  function signature() {
    document.querySelectorAll('.mast h1 > span').forEach(function (el) {
      if (el.querySelector('.sig-s') || !/S/.test(el.textContent)) return;
      el.innerHTML = Site.esc(el.textContent).replace(/S/g, '<span class="sig-s">S</span>');
    });
  }

  Site.start = function () {
    collect();
    apply();
    var b = document.getElementById('lang');
    if (b) b.addEventListener('click', function () {
      var keepPlace = anchor();
      Site.lang = Site.lang === 'he' ? 'en' : 'he';
      store(Site.lang);
      if (params.has('lang')) {
        params.set('lang', Site.lang);
        history.replaceState(history.state, '', location.pathname + '?' + params.toString() + location.hash);
      }
      apply();
      keepPlace();
    });
    /* a missing image file leaves its quiet placeholder instead of a broken-image icon, and is not offered in the viewer */
    document.addEventListener('error', function (e) {
      var t = e.target;
      if (t.tagName !== 'IMG' || !t.closest('.photo')) return;
      t.classList.add('broken');
      var z = t.closest('button.zoom'); if (z) { z.disabled = true; z.classList.remove('zoom'); }
    }, true);
    if (window.Lightbox) window.Lightbox.init();
  };

  /* ---------- home ---------- */
  function card(path, cover, no, title, n) {
    return '<li>' + link(path, 'card',
      '<div class="photo">' + Site.img(cover, '(min-width:1240px) 300px, (min-width:900px) 24vw, 50vw') + '</div>' +
      '<span class="no">' + (no ? two(no) : '') + '</span>' + tx(title, 'span', 'class="t"') + tx(count(n), 'span', 'class="m"')) + '</li>';
  }
  Site.home = function () {
    var sel = document.getElementById('selected-seq');
    var arch = document.getElementById('archive-list');
    var live = cats();
    if (sel) sel.innerHTML = window.SELECTED.map(function (g) {
      var c = live.filter(function (x) { return x.id === g.category; })[0];
      if (!c) return '';
      return '<section class="sel-group" aria-labelledby="sel-' + c.id + '"><header>' + tx(c.title, 'h3', 'id="sel-' + c.id + '"') +
        link('project.html?id=' + c.id, 'more', tx({ he: 'לכל ה' + c.title.he + ' ←', en: 'All ' + c.title.en.toLowerCase() + ' →' })) + '</header>' +
        sequence(g.blocks, [], 'selected-' + c.id) + '</section>';
    }).join('');
    if (arch) arch.innerHTML = live.map(function (c) {
      var n = countOf(c);
      var galleries = c.chapters
        ? c.chapters.map(function (x, k) { return card('project.html?id=' + x.id, x.cover || x.photos[0], k + 1, x.title, x.photos.length); }).join('')
        : (n ? card('project.html?id=' + c.id, c.cover || c.photos[0], 0, { he: 'מבחר', en: 'Selection' }, n) : '');
      var st = c.stories.length ? tx({ he: 'סיפורים', en: 'Stories' }, 'h4', 'class="sub-h"') + '<ol class="cards">' +
        c.stories.map(function (s) { return card('project.html?story=' + s.id, s.cover || s.photos[0], 0, s.title, s.photos.length); }).join('') + '</ol>' : '';
      return '<section class="cat" aria-labelledby="cat-' + c.id + '"><header>' + tx(c.title, 'h3', 'id="cat-' + c.id + '"') +
        (n ? tx(count(n), 'span', 'class="m"') + link('project.html?id=' + c.id, 'more', tx({ he: 'הכול ברצף ←', en: 'View all →' })) : '') + '</header>' +
        (galleries ? '<ol class="cards">' + galleries + '</ol>' : '') + st + '</section>';
    }).join('');
    Site.renderers.push(function () {
      var he = Site.lang === 'he';
      setMeta(he ? 'טל אור ספוזניקוב · צילום' : 'Tal Or Sapozhnikov · Photography',
        he ? 'טל אור ספוזניקוב, צלם דוקומנטרי. חתונות, אירועים, הופעות, פסטיבלים והפקות. רגעים אמיתיים, סיפורים דרך העדשה.'
           : 'Tal Or Sapozhnikov, documentary photographer. Weddings, events, concerts, festivals and productions. Real moments, stories through the lens.');
    });
  };

  /* ---------- inner pages: a category, a wedding chapter, or a story ---------- */
  function notFound() {
    document.getElementById('p-head').hidden = true;
    document.getElementById('gallery').hidden = true;
    document.getElementById('next').hidden = true;
    document.getElementById('missing').hidden = false;
    var r = document.createElement('meta'); r.name = 'robots'; r.content = 'noindex'; document.head.appendChild(r);
    Site.renderers.push(function () { setMeta((Site.lang === 'he' ? 'לא נמצא · ' : 'Not found · ') + NAME[Site.lang], ''); });
  }
  function setNext(kicker, target, path) {
    var next = document.getElementById('next');
    if (!target) { next.hidden = true; return; }
    next.hidden = false;
    next.innerHTML = link(path, '', tx(kicker, 'span', 'class="kicker"') + tx(target.title, 'span', 'class="t"'));
  }
  function fmtDate(d) {
    if (!d) return null;
    var p = String(d).split('-'), y = p[0], m = p[1] ? +p[1] : 0;
    var he = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    var en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return { he: m ? he[m - 1] + ' ' + y : y, en: m ? en[m - 1] + ' ' + y : y };
  }

  Site.project = function () {
    var head = document.getElementById('p-head'), gal = document.getElementById('gallery');
    var storyId = params.get('story');

    if (storyId) {
      var s = (window.STORIES || []).filter(function (x) { return x.id === storyId; })[0];
      if (!s || !s.photos || !s.photos.length || (s.published !== true && !preview)) return notFound();
      var cat = window.CATEGORIES.filter(function (c) { return c.id === s.category; })[0];
      var sibs = stories(s.category), i = sibs.indexOf(s);
      var nextStory = sibs.length > 1 && i > -1 ? sibs[(i + 1) % sibs.length] : null;
      var facts = [fmtDate(s.date), s.place].filter(Boolean);
      head.innerHTML = tx({ he: (cat ? cat.title.he : '') + ' · סיפור', en: (cat ? cat.title.en : '') + ' · Story' }, 'span', 'class="kicker"') +
        tx(s.title, 'h1') +
        (facts.length ? '<p class="facts">' + facts.map(function (f) { return tx(f); }).join('<span aria-hidden="true"> · </span>') + '</p>' : '') +
        (s.intro && s.intro.he ? tx(s.intro, 'p', 'class="intro"') : '') +
        tx(count(s.photos.length), 'span', 'class="count"') +
        (s.published !== true ? '<p class="draft-note">טיוטה · Draft preview</p>' : '');
      gal.innerHTML = sequence(s.layout, s.photos, 'story-' + s.id, true);
      setNext({ he: 'הסיפור הבא', en: 'Next story' }, nextStory, nextStory ? 'project.html?story=' + nextStory.id : '');
      setCanonical('project.html?story=' + s.id);
      Site.renderers.push(function () {
        var he = Site.lang === 'he', where = Site.t(s.title) + (cat ? ' · ' + Site.t(cat.title) : '');
        setMeta(where + ' · ' + NAME[Site.lang],
          (s.intro && s.intro[Site.lang]) || (he ? where + '. צילום דוקומנטרי של טל אור ספוזניקוב.' : where + '. Documentary photography by Tal Or Sapozhnikov.'));
      });
      return;
    }

    var id = params.get('id'), list = [];
    cats().forEach(function (c) {
      list.push({ unit: c });
      if (c.chapters) c.chapters.forEach(function (x, k) { list.push({ unit: x, parent: c, no: k + 1 }); });
    });
    var e = list.filter(function (x) { return x.unit.id === id; })[0];
    if (!e || !countOf(e.unit)) return notFound();
    var u = e.unit, total = countOf(u);
    var siblings = e.parent ? e.parent.chapters : null;
    var n = siblings && siblings.length > 1 ? siblings[(siblings.indexOf(u) + 1) % siblings.length] : null;
    head.innerHTML = (e.parent
        ? tx({ he: e.parent.title.he + ' · ' + two(e.no), en: e.parent.title.en + ' · ' + two(e.no) }, 'span', 'class="kicker"')
        : tx({ he: 'ארכיון', en: 'Archive' }, 'span', 'class="kicker"')) +
      tx(u.title, 'h1') + tx(count(total), 'span', 'class="count"');
    if (u.chapters) {
      /* the whole category is one gallery, so the viewer flows from chapter to chapter */
      gal.setAttribute('data-gallery', 'cat-' + u.id);
      gal.innerHTML = u.chapters.map(function (x, k) {
        return '<section class="chapter" aria-labelledby="h-' + x.id + '"><header><span class="no">' + two(k + 1) + '</span>' +
          tx(x.title, 'h2', 'id="h-' + x.id + '"') + link('project.html?id=' + x.id, 'more', tx({ he: 'לפרק ←', en: 'Open →' })) + '</header>' +
          sequence(x.layout, x.photos, null, k === 0) + '</section>';
      }).join('');
    } else {
      gal.innerHTML = sequence(u.layout, u.photos, 'cat-' + u.id, true);
    }
    setNext({ he: 'הפרק הבא', en: 'Next chapter' }, n, n ? 'project.html?id=' + n.id : '');
    setCanonical('project.html?id=' + u.id);
    Site.renderers.push(function () {
      var he = Site.lang === 'he';
      var where = e.parent ? Site.t(u.title) + ' · ' + Site.t(e.parent.title) : Site.t(u.title);
      var c = total + (he ? ' תמונות' : ' photographs');
      setMeta(where + ' · ' + NAME[Site.lang],
        he ? where + '. צילום דוקומנטרי של טל אור ספוזניקוב, ' + c + '.' : where + '. Documentary photography by Tal Or Sapozhnikov, ' + c + '.');
    });
  };
})();
