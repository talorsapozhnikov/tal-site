# Tal Or Sapozhnikov · Photography

Personal photography portfolio of Tal Or Sapozhnikov (טל אור ספוזניקוב). Hebrew by default, with a full English version.

Live (GitHub Pages, from `main`): https://talorsapozhnikov.github.io/tal-site/

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home: masthead, cover, contents, one collage per moment of the day, about, contact |
| `project.html` | One template for every chapter, opened as `project.html?id=<chapter id>` |
| `assets/site.css` | All styles |
| `assets/site.js` | Language switch, photo markup, collages, rendering of the contents and chapter pages |
| `assets/projects.js` | The photos and chapters (the only file to edit when adding work) |
| `images/` | Photographs as WebP, in several widths |

No build step and no dependencies: open `index.html` or serve the folder with any static server.

## Adding photos

The site is organised by moments of the day (getting ready, reception, chuppah, the couple, family, dance floor, laughter), not by wedding.

1. Export each photo as WebP without metadata (no EXIF, no GPS):
   - landscape: widths 400, 800, 1400, 2000 → `images/<name>-400.webp` … `-2000.webp`
   - portrait: widths 600, 1000, 1400 → `images/<name>-600.webp` … `-1400.webp`
2. In `assets/projects.js`, add each photo to `PHOTOS` with Hebrew and English alt text (`portrait: true` for vertical photos, plus `w`/`h` if it isn't 2:3).
3. Add the photo's name to a chapter in `CHAPTERS`. The order in the list is the order on the page; the first 5 form the home page collage.

A chapter with no photos stays hidden until it has some.

## History

Earlier design explorations were removed from `main`. They are kept on the branch `archive/design-drafts`.
