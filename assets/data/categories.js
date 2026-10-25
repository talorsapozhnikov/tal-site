/* ---------- Layout blocks ----------
   A layout is a list of blocks. Every photo keeps its own proportions; nothing is cropped.
     { row: ['a', 'b', 'c'] }               photos side by side at equal height (2 or 3 is best). The house style.
     { pair: ['a', 'b'] }                   same as a row of two
     { full: 'a' }                          one photo across the page
     { wide: 'a', align: 'start'|'end' }    three quarters wide
     { solo: 'a', align: 'start'|'center'|'end' }  a vertical photo alone
     { pair: ['a', 'b'], offset: true }     a large photo and a smaller one set lower beside it
   Photos listed in `photos` but missing from `layout` are added at the end in automatic rows.

   ---------- Categories ----------
   Curated galleries: the strongest photos from many assignments. Order here is the order on the site.
   A category or chapter with no photos (and no published stories) is hidden.
   Weddings are split into chapters by moment of the day; the chapters mix several weddings,
   so a chapter is never presented as one event. Individual events live in stories.js. */

window.CATEGORIES = [
  { id: 'weddings', title: { he: 'חתונות', en: 'Weddings' },
    chapters: [
      { id: 'beauty', title: { he: 'ביוטי', en: 'Getting ready' }, photos: [] },
      { id: 'reception', title: { he: 'קבלת פנים', en: 'Reception' }, cover: 'shore-band',
        photos: ['grove-setup', 'shore-band', 'sea-bottle'],
        layout: [
          { row: ['grove-setup', 'shore-band', 'sea-bottle'] }
        ] },
      { id: 'chuppah', title: { he: 'חופה', en: 'Chuppah' }, cover: 'grove-ring',
        photos: ['shore-crowd', 'shore-kiss', 'grove-glass', 'grove-ring', 'grove-family-laugh', 'grove-chuppah-bw', 'water-aisle', 'shore-chuppah-bw', 'grove-chuppah-crowd'],
        layout: [
          { row: ['shore-crowd', 'shore-kiss'] },
          { row: ['grove-ring', 'grove-glass', 'grove-family-laugh'] },
          { row: ['grove-chuppah-bw', 'shore-chuppah-bw'] },
          { row: ['water-aisle', 'grove-chuppah-crowd'] }
        ] },
      { id: 'couple', title: { he: 'הזוג', en: 'The two of them' }, cover: 'shore-dip',
        photos: ['shore-blur', 'shore-silhouette', 'grove-laugh', 'shore-dip', 'water-cheek', 'water-portrait', 'shore-portrait', 'water-embrace', 'water-low-angle'],
        layout: [
          { row: ['shore-blur', 'shore-silhouette', 'grove-laugh'] },
          { row: ['shore-dip', 'water-cheek', 'water-low-angle'] },
          { row: ['water-portrait', 'water-embrace', 'shore-portrait'] }
        ] },
      { id: 'family', title: { he: 'משפחה', en: 'Family' }, photos: [] },
      { id: 'dance', title: { he: 'רחבה', en: 'Dance floor' }, cover: 'dancefloor-lift',
        photos: ['first-dance', 'dancefloor-yellow', 'dancefloor-lift', 'dancefloor-amber', 'dancefloor-dj', 'dancefloor-blue'],
        layout: [
          { row: ['first-dance', 'dancefloor-yellow'] },
          { row: ['dancefloor-lift', 'dancefloor-amber'] },
          { row: ['dancefloor-dj', 'dancefloor-blue'] }
        ] }
    ] },
  { id: 'events', title: { he: 'אירועים', en: 'Events' }, photos: [] },
  { id: 'concerts', title: { he: 'הופעות', en: 'Concerts' }, photos: [] },
  { id: 'festivals', title: { he: 'פסטיבלים', en: 'Festivals' }, cover: 'fest-reach-bw',
    photos: ['fest-stage-wide', 'fest-reach-bw', 'fest-bow', 'fest-crowd-faces', 'fest-runway-bw', 'fest-sequins-up', 'fest-phones',
             'fest-guitar-sun', 'fest-shirtless', 'fest-runway-day', 'fest-horns', 'fest-barrier', 'fest-sunflower', 'fest-sequins-blue'],
    layout: [
      { row: ['fest-stage-wide', 'fest-crowd-faces'] },
      { row: ['fest-reach-bw', 'fest-bow', 'fest-runway-bw'] },
      { row: ['fest-phones', 'fest-sequins-up'] },
      { row: ['fest-guitar-sun', 'fest-shirtless', 'fest-sequins-blue'] },
      { row: ['fest-runway-day', 'fest-horns'] },
      { row: ['fest-barrier', 'fest-sunflower'] }
    ] },
  { id: 'productions', title: { he: 'הפקות', en: 'Productions' }, photos: [] }
];
