# Tal Or Sapozhnikov · Photography

Personal photography portfolio of Tal Or Sapozhnikov (טל אור ספוזניקוב). Hebrew by default, with a full English version.

Live (GitHub Pages, from `main`): https://talorsapozhnikov.github.io/tal-site/

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home: masthead and cover photo, selected work, archive, about, contact |
| `project.html` | One template for every category and chapter, opened as `project.html?id=<id>` |
| `assets/site.css` | All styles |
| `assets/site.js` | Language switch, photo markup, layout blocks, rendering of the home sections and pages, page titles |
| `assets/projects.js` | `PHOTOS`, `SELECTED` and `CATEGORIES` (the only file to edit when adding work) |
| `images/` | Photographs as WebP, in several widths |

No build step and no dependencies: open `index.html` or serve the folder with any static server.

## Adding photos

Top-level categories are weddings, events, concerts, festivals and productions. Weddings are split into chapters by moment of the day (getting ready, reception, chuppah, the couple, family, dance floor), not by wedding.

1. Export each photo as WebP without metadata (no EXIF, no GPS):
   - landscape: widths 400, 800, 1400, 2000 → `images/<name>-400.webp` … `-2000.webp`
   - portrait: widths 600, 1000, 1400 → `images/<name>-600.webp` … `-1400.webp`
2. In `assets/projects.js`, add each photo to `PHOTOS` with Hebrew and English alt text (`portrait: true` for vertical photos, plus `w`/`h` if it isn't 2:3).
3. Add the photo's name to `photos` of a category (or, for weddings, a chapter) in `CATEGORIES`.
4. Optional: place it in that chapter's `layout`, and in `SELECTED` if it belongs in the curated sequence on the home page.

### Layout blocks

Every photo keeps its own proportions; nothing is cropped or stretched.

| Block | Result |
|---|---|
| `{ full: 'a' }` | one photo across the page |
| `{ wide: 'a', align: 'start'\|'end' }` | three quarters wide, air on one side |
| `{ solo: 'a', align: 'start'\|'center'\|'end' }` | a vertical photo alone with space around it |
| `{ pair: ['a','b'] }` | two photos side by side, equal height |
| `{ pair: ['a','b'], offset: true }` | a large photo and a smaller one set lower beside it |
| `{ row: ['a','b','c'] }` | three photos side by side, equal height |

Photos in `photos` but not in `layout` are added at the end in automatic rows. A category or chapter with no photos stays hidden.

## History

Earlier design explorations were removed from `main`. They are kept on the branch `archive/design-drafts`.
