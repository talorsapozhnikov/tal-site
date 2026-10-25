/* ---------- Stories ----------
   One assignment told as a photo story: a wedding evening, a concert, a festival, a production, an event.
   Stories appear in the archive under their category and open at project.html?story=<id>.

   {
     id: 'shore-evening',             stable, lowercase, never changes once published (it is the URL)
     category: 'weddings',            weddings | events | concerts | festivals | productions
     published: false,                false = draft: hidden everywhere and not opened publicly
     featured: false,                 true = listed first in its category
     title: { he: '', en: '' },
     intro: { he: '', en: '' },       optional, one or two sentences
     date: '2026-06',                 optional, only when Tal has confirmed it (YYYY or YYYY-MM)
     place: { he: '', en: '' },       optional, only when Tal has confirmed it and the clients agree
     cover: 'photo-id',               shown on the archive card
     photos: ['photo-id', ...],       every photo in the story, in order
     layout: [ { row: [...] }, ... ]  optional; same blocks as categories.js
   }

   Describe only what was photographed: a story of the evening is not "the whole wedding".
   Never invent names, dates or places. Drafts can be previewed locally with &preview=1. */

window.STORIES = [];
