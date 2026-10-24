/* Photo stories shown on the site.
   To add a story: export each photo as WebP in the sizes listed in README.md, put it in /images,
   add its entry to PHOTOS, then add a project to PROJECTS. No HTML changes are needed.

   Only group photos that come from the same event. Never invent places, dates or names:
   add them to a project only after Tal confirms them. */

window.PHOTOS = {
  'water-portrait':      { portrait: true,
    alt: { he: 'החתן מנשק את מצח הכלה, אור שקיעה מאחוריהם', en: 'The groom kisses the bride on the forehead, low sun behind them' } },
  'water-aisle':         { alt: { he: 'המעבר בין הכיסאות הריקים והנרות, הזוג מתחבק מתחת לחופה', en: 'The aisle between empty chairs and candles, the couple embracing under the chuppah' } },
  'water-low-angle':     { alt: { he: 'מבט מלמטה על הזוג מתחת לבד החופה, בין העמודים', en: 'A low view of the couple under the chuppah canopy, between the columns' } },
  'water-embrace':       { alt: { he: 'הזוג מתחבק בין עמודים לבנים, עצים ומים מאחוריהם', en: 'The couple embracing between white columns, trees and water behind them' } },
  'grove-chuppah-crowd': { alt: { he: 'חופה מוארת בלילה בין עצי אקליפטוס, מצולמת מאחורי שורות של אורחים', en: 'A lit chuppah at night among eucalyptus trees, seen from behind rows of guests' } },
  'grove-chuppah-bw':    { alt: { he: 'בשחור־לבן: החופה בלילה, המשפחה סביב הזוג וצלם בקצה הפריים', en: 'Black and white: the chuppah at night, family around the couple, a photographer at the edge of the frame' } },
  'grove-setup':         { alt: { he: 'חבל עם תמונות של הזוג תלוי על הדשא, ומאחוריו החופה והכיסאות לפני שהאורחים מגיעים', en: 'A line of the couple’s photos strung across the lawn, the chuppah and empty chairs behind it before the guests arrive' } },
  'dancefloor-dj':       { alt: { he: 'הכלה וחברים ליד עמדת הדי־ג׳יי עם ידיים באוויר, מול קהל רוקד ואלומות אור כחולות', en: 'The bride and friends at the DJ booth with hands raised, facing a dancing crowd and blue beams of light' } },
  'dancefloor-blue':     { alt: { he: 'רחבת ריקודים באור כחול, אנשים רוקדים בצללית מתחת לפנסי במה', en: 'A dance floor in blue light, people dancing in silhouette under stage lights' } }
};

/* layout per photo: tall | full | wide | wide-end | pair-a | pair-b */
window.PROJECTS = [
  {
    id: 'by-the-water',
    kind: { he: 'סיפור · חתונה', en: 'Story · Wedding' },
    title: { he: 'ליד המים', en: 'By the water' },
    note: { he: 'יש רגעים שלא צריכים הרבה מילים. רק אור נכון, מבט אחד, וכל מה שקורה ביניהם.',
            en: 'Some moments don’t need many words. Just the right light, a single glance, and everything that happens in between.' },
    thumb: 'water-embrace',
    photos: [
      { name: 'water-portrait', layout: 'tall' },
      { name: 'water-aisle', layout: 'full' },
      { name: 'water-low-angle', layout: 'pair-a' },
      { name: 'water-embrace', layout: 'pair-b' }
    ]
  },
  {
    id: 'moments',
    kind: { he: 'מבחר · חתונות ואירועים', en: 'Selection · Weddings and events' },
    title: { he: 'רגעים', en: 'Moments' },
    note: { he: 'תמונות בודדות מכמה אירועים. כל אחת עומדת בפני עצמה.',
            en: 'Single frames from several events. Each one stands on its own.' },
    thumb: 'grove-chuppah-bw',
    photos: [
      { name: 'grove-chuppah-bw', layout: 'full' },
      { name: 'grove-setup', layout: 'pair-a' },
      { name: 'dancefloor-dj', layout: 'pair-b' },
      { name: 'dancefloor-blue', layout: 'wide-end' },
      { name: 'grove-chuppah-crowd', layout: 'wide' }
    ]
  }
];
