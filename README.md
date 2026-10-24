# Tal Or Sapozhnikov · Photography

Personal photography portfolio of Tal Or Sapozhnikov (טל אור ספוזניקוב). Hebrew by default, with a full English version.

Live (GitHub Pages, from `main`): https://talorsapozhnikov.github.io/tal-site/

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home: masthead, cover, contents, feature, about, contact |
| `project.html` | One template for every photo story, opened as `project.html?id=<project id>` |
| `assets/site.css` | All styles |
| `assets/site.js` | Language switch, photo markup, rendering of the contents and story pages |
| `assets/projects.js` | The photos and stories (the only file to edit when adding work) |
| `images/` | Photographs as WebP, in several widths |

No build step and no dependencies: open `index.html` or serve the folder with any static server.

## Adding a story

1. Export each photo as WebP without metadata (no EXIF, no GPS):
   - landscape: widths 400, 800, 1400, 2000 → `images/<name>-400.webp` … `-2000.webp`
   - portrait: widths 600, 1000, 1400 → `images/<name>-600.webp` … `-1400.webp`
2. In `assets/projects.js`, add each photo to `PHOTOS` with Hebrew and English alt text (`portrait: true` for vertical photos).
3. Add the story to `PROJECTS`: `id`, `kind`, `title`, optional `note`, `thumb`, and `photos` with a layout for each (`tall`, `full`, `wide`, `wide-end`, `pair-a`, `pair-b`).

The new story then appears in the contents list and on the cover automatically.

## History

Earlier design explorations were removed from `main`. They are kept on the branch `archive/design-drafts`.
