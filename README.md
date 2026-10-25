# Tal Or Sapozhnikov · Photography

Personal photography portfolio of Tal Or Sapozhnikov (טל אור ספוזניקוב). Hebrew by default, with a full English version. Stills only.

Live (GitHub Pages, from `main`): https://talorsapozhnikov.github.io/tal-site/

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home: masthead, cover photo, selected work, archive, about, contact |
| `project.html` | One template for a category or wedding chapter (`?id=<id>`) and for a story (`?story=<id>`) |
| `assets/data/photos.js` | Every photo once, by id: proportions and alt text in both languages |
| `assets/data/categories.js` | Categories, wedding chapters and their layouts (with the list of layout blocks) |
| `assets/data/stories.js` | Individual assignments told as stories, with `published` and `featured` |
| `assets/data/selected.js` | Selected work on the home page, one group per category |
| `assets/site.js` | Language switch, photo markup, layout blocks, page rendering, page titles |
| `assets/lightbox.js` | Full-screen photo viewer |
| `assets/site.css` | All styles |
| `tools/add-photos.py` | Turns original photos into the WebP sizes the site uses, without metadata |
| `tools/validate.mjs` | Checks the data before publishing |
| `images/` | Photographs (WebP), logo, icons, `og-cover.jpg` share image |

No build step and no framework. To look at the site locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

Photos are referenced by id everywhere, so one image file can appear in a category, a story and the home page without copies.

## Two ways into the work

- **Category galleries** (`categories.js`): the strongest frames from many assignments. Weddings are split into chapters by moment of the day (getting ready, reception, chuppah, the couple, family, dance floor). Chapters mix several weddings and are never presented as one event.
- **Stories** (`stories.js`): one assignment as a sequence, such as one wedding evening, one concert or one festival. A story shows up under its category in the archive, opens at `project.html?story=<id>`, and links to the next published story in the same category.

Anything empty stays hidden: a category, a chapter or a story with no photos does not appear, and neither does a story with `published: false`.

## Adding work

### 1. Prepare the photos

```
python3 tools/add-photos.py ~/Desktop/selects/*.jpg --prefix shore-evening
```

This writes `images/shore-evening-01-400.webp` … at the widths the site needs (landscape 400/800/1400/2000, portrait 600/1000/1400), strips all metadata including GPS, and prints entries like this:

```
  'shore-evening-01':      {
    alt: { he: '', en: '' } },
```

Paste them into `assets/data/photos.js` and write the alt text in both languages: what happens in the photo, not "photo of". It needs Pillow (`pip install Pillow`).

### 2a. Add a wedding story

Add an object to `window.STORIES` in `assets/data/stories.js`:

```js
{
  id: 'shore-evening',
  category: 'weddings',
  published: false,
  featured: false,
  title: { he: 'ערב על החוף', en: 'An evening on the shore' },
  intro: { he: '...', en: '...' },          // optional
  cover: 'shore-evening-03',
  photos: ['shore-evening-01', 'shore-evening-02', 'shore-evening-03', 'shore-evening-04', 'shore-evening-05'],
  layout: [
    { row: ['shore-evening-01', 'shore-evening-02'] },
    { row: ['shore-evening-03', 'shore-evening-04', 'shore-evening-05'] }
  ]
}
```

Name only what was photographed. If the coverage runs from the reception to the end of the night, it is an evening, not "the whole wedding". Add `date` (`'2026-06'`) or `place` only when Tal has confirmed them and the couple agrees.

To see a draft before publishing, run the site locally and open `project.html?story=shore-evening&preview=1`. The preview flag works only on localhost, never on the live site. To publish, set `published: true`.

### 2b. Add a festival, concert, event or production story

Same object with `category: 'festivals'`, `'concerts'`, `'events'` or `'productions'`. The category appears on the site as soon as it has a published story or photos of its own.

### 3. Add photos to a category gallery

List the photo ids in that category's `photos` (or, for weddings, a chapter's) in `categories.js`, and place them in its `layout`. Any photo listed in `photos` but missing from `layout` is added at the end in automatic rows.

### 4. Feature photos on the home page

Add a block to that category's group in `assets/data/selected.js`. Each group holds only that category's photos (from the category gallery or its stories) and never mixes fields. Keep it short: the strongest frames, alternating close and wide, quiet and loud.

### 5. Check, then publish

```
node tools/validate.mjs
```

The check fails on missing image files, unknown or duplicate ids, broken category references, missing titles or alt text in either language, published stories with no photos, and selected-work groups that mix categories. Fix every ERROR. Warnings, such as an unused photo, are informational.

## Layout blocks

Every photo keeps its own proportions; nothing is cropped or stretched.

| Block | Result |
|---|---|
| `{ row: ['a','b','c'] }` | photos side by side at equal height (the house style; 2 or 3 per row) |
| `{ pair: ['a','b'] }` | a row of two |
| `{ full: 'a' }` | one photo across the page |
| `{ wide: 'a', align: 'start'\|'end' }` | three quarters wide |
| `{ solo: 'a', align: 'start'\|'center'\|'end' }` | a vertical photo alone |
| `{ pair: ['a','b'], offset: true }` | a large photo and a smaller one set lower beside it |

## The photo viewer

Every gallery photo is a button that opens `assets/lightbox.js`:
- Navigation stays inside the gallery the photo belongs to: a home-page group, a category page or a story.
- It loads a file sized for the screen, and the neighbours only after the current photo has loaded.
- Keyboard: Escape closes, the arrow keys move (mirrored in Hebrew), and Tab stays inside the viewer.
- Phones: swipe sideways to move, swipe down to close.
- The browser Back button closes the viewer.
- Focus returns to the photo that opened it.
- With reduced motion turned on, there are no transitions.

## Sharing previews

The home page has static Open Graph tags and `images/og-cover.jpg`. Inner pages set their own title, description and canonical link with JavaScript. Google reads those, but WhatsApp, Facebook and similar previews read only the static tags in `project.html`, so a shared story link shows the general site preview, not the story's own cover. Per-story previews would need a static HTML file per story.

## History

Earlier design explorations are kept on the branch `archive/design-drafts`.
