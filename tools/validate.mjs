#!/usr/bin/env node
/* Checks the site data before publishing. No dependencies: `node tools/validate.mjs`
   Exit code 1 when something would break the site; warnings are printed but do not fail. */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['photos', 'categories', 'stories', 'selected'];
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of files) vm.runInContext(readFileSync(join(root, 'assets/data', f + '.js'), 'utf8'), ctx, { filename: f + '.js' });
const { PHOTOS = {}, CATEGORIES = [], STORIES = [], SELECTED = [] } = ctx.window;

const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);
const names = b => [].concat(b.full || [], b.wide || [], b.solo || [], b.pair || [], b.row || []);
const bilingual = (o, where) => { if (!o || !String(o.he || '').trim() || !String(o.en || '').trim()) err(`${where}: needs both Hebrew and English`); };

/* duplicate photo ids: a repeated key in an object literal silently overwrites the first one */
const photoSrc = readFileSync(join(root, 'assets/data/photos.js'), 'utf8');
const keys = [...photoSrc.matchAll(/^\s*'([^']+)'\s*:/gm)].map(m => m[1]);
keys.filter((k, i) => keys.indexOf(k) !== i).forEach(k => err(`photos.js: photo id "${k}" is listed twice`));

for (const [id, p] of Object.entries(PHOTOS)) {
  if (!/^[a-z0-9-]+$/.test(id)) err(`photo "${id}": use lowercase letters, digits and hyphens only`);
  bilingual(p.alt, `photo "${id}" alt text`);
  for (const w of p.portrait ? [600, 1000, 1400] : [400, 800, 1400, 2000])
    if (!existsSync(join(root, 'images', `${id}-${w}.webp`))) err(`photo "${id}": missing images/${id}-${w}.webp`);
}

const ids = new Map();
const claim = (id, where) => { if (ids.has(id)) err(`id "${id}" is used by ${ids.get(id)} and ${where}`); else ids.set(id, where); };
const checkPhotos = (list, where) => (list || []).forEach(n => { if (!PHOTOS[n]) err(`${where}: unknown photo "${n}"`); });
const checkLayout = (u, where) => {
  if (!u.layout) return;
  const L = u.layout.flatMap(names);
  checkPhotos(L, where + ' layout');
  L.filter(n => !(u.photos || []).includes(n)).forEach(n => err(`${where}: layout uses "${n}" but it is not in photos`));
  L.filter((n, i) => L.indexOf(n) !== i).forEach(n => warn(`${where}: "${n}" appears twice in the layout`));
};
const catIds = CATEGORIES.map(c => c.id);
const used = new Set();

for (const c of CATEGORIES) {
  claim(c.id, `category "${c.id}"`);
  bilingual(c.title, `category "${c.id}" title`);
  for (const u of c.chapters || [c]) {
    const where = u === c ? `category "${c.id}"` : `chapter "${u.id}"`;
    if (u !== c) { claim(u.id, where); bilingual(u.title, `${where} title`); }
    checkPhotos(u.photos, where);
    (u.photos || []).forEach(n => used.add(n));
    checkLayout(u, where);
    if (u.cover && !(u.photos || []).includes(u.cover)) err(`${where}: cover "${u.cover}" is not in its photos`);
  }
}

const storyIds = new Set();
for (const s of STORIES) {
  const where = `story "${s.id}"`;
  if (!s.id || !/^[a-z0-9-]+$/.test(s.id)) err(`${where}: id must be lowercase letters, digits and hyphens`);
  if (storyIds.has(s.id)) err(`${where}: id is used twice`); storyIds.add(s.id);
  if (!catIds.includes(s.category)) err(`${where}: unknown category "${s.category}"`);
  if (typeof s.published !== 'boolean') err(`${where}: published must be true or false`);
  bilingual(s.title, `${where} title`);
  if (s.intro) bilingual(s.intro, `${where} intro`);
  if (s.place) bilingual(s.place, `${where} place`);
  if (s.date && !/^\d{4}(-\d{2})?$/.test(s.date)) err(`${where}: date must look like 2026 or 2026-06`);
  if (!s.photos || !s.photos.length) (s.published ? err : warn)(`${where}: has no photos`);
  checkPhotos(s.photos, where);
  (s.photos || []).forEach(n => used.add(n));
  checkLayout(s, where);
  if (!s.cover) warn(`${where}: no cover set, the first photo will be used`);
  else if (!(s.photos || []).includes(s.cover)) err(`${where}: cover "${s.cover}" is not in its photos`);
}

for (const g of SELECTED) {
  const where = `selected "${g.category}"`;
  const cat = CATEGORIES.find(c => c.id === g.category);
  if (!cat) { err(`${where}: unknown category`); continue; }
  const allowed = new Set([...(cat.chapters || [cat]).flatMap(u => u.photos || []),
    ...STORIES.filter(s => s.category === g.category).flatMap(s => s.photos || [])]);
  const L = (g.blocks || []).flatMap(names);
  checkPhotos(L, where);
  L.filter(n => PHOTOS[n] && !allowed.has(n)).forEach(n => err(`${where}: "${n}" belongs to another category; groups are never mixed`));
}

Object.keys(PHOTOS).filter(n => !used.has(n)).forEach(n => warn(`photo "${n}" is not used in any category or story`));

for (const w of warnings) console.log('warning  ' + w);
for (const e of errors) console.log('ERROR    ' + e);
const pub = STORIES.filter(s => s.published).length;
console.log(`\n${Object.keys(PHOTOS).length} photos · ${CATEGORIES.length} categories · ${STORIES.length} stories (${pub} published) · ${errors.length} errors · ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
