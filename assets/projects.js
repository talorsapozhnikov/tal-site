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
  'shore-crowd':         { alt: { he: 'אורחים מתאספים סביב חופה על שפת הים בשקיעה, מבנה אבן עתיק ברקע', en: 'Guests gathering around a chuppah at the edge of the sea at sunset, an old stone building behind' } },
  'shore-portrait':      { portrait: true, w: 1000, h: 1500,
    alt: { he: 'הזוג מתחבק על חוף סלעי, השמש בוהקת מעליהם', en: 'The couple embracing on a rocky shore, the sun flaring above them' } },
  'shore-kiss':          { alt: { he: 'החתן והכלה מתנשקים במעבר, אורחים מצלמים בטלפונים ואב מביט מהצד', en: 'The bride and groom kiss in the aisle while guests film on their phones and a father looks on' } },
  'shore-band':          { alt: { he: 'זמרת מנגנת בקלידים אדומים על החוף, מתופף ונגן מאחוריה והים ברקע', en: 'A singer at a red keyboard on the beach, a drummer and musician behind her and the sea beyond' } },
  'shore-chuppah-bw':    { alt: { he: 'בשחור־לבן: הזוג מתחת לחופה מול הים, האורחים עומדים סביב', en: 'Black and white: the couple under the chuppah facing the sea, guests standing around' } },
  'shore-blur':          { alt: { he: 'הזוג מחובק מחוץ לפוקוס, הגלים חדים מאחוריהם', en: 'The couple holding each other out of focus, the waves sharp behind them' } },
  'shore-dip':           { alt: { he: 'החתן מטה את הכלה לאחור על החוף, אור נגדי מהים', en: 'The groom dips the bride back on the shore, the sea backlit behind them' } },
  'sea-bottle':          { portrait: true, w: 1000, h: 1500,
    alt: { he: 'הים בשקיעה, ממוסגר בין דמות ובקבוק מחוץ לפוקוס', en: 'The sea at sunset, framed between a blurred figure and a bottle' } },
  'dancefloor-blue':     { alt: { he: 'רחבת ריקודים באור כחול, אנשים רוקדים בצללית מתחת לפנסי במה', en: 'A dance floor in blue light, people dancing in silhouette under stage lights' } }
};

/* layout per photo: tall | full | wide | wide-end | pair-a | pair-b */
window.PROJECTS = [
  {
    id: 'on-the-shore',
    kind: { he: 'סיפור · חתונה', en: 'Story · Wedding' },
    title: { he: 'על החוף', en: 'On the shore' },
    thumb: 'shore-chuppah-bw',
    photos: [
      { name: 'shore-crowd', layout: 'full' },
      { name: 'shore-portrait', layout: 'tall' },
      { name: 'shore-kiss', layout: 'pair-a' },
      { name: 'shore-band', layout: 'pair-b' },
      { name: 'shore-chuppah-bw', layout: 'full' },
      { name: 'shore-blur', layout: 'wide-end' },
      { name: 'shore-dip', layout: 'wide' }
    ]
  },
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
    kind: { he: 'מבחר', en: 'Selection' },
    title: { he: 'רגעים', en: 'Moments' },
    note: { he: 'תמונות בודדות. כל אחת עומדת בפני עצמה.',
            en: 'Single frames. Each one stands on its own.' },
    thumb: 'grove-chuppah-bw',
    photos: [
      { name: 'grove-chuppah-bw', layout: 'full' },
      { name: 'grove-setup', layout: 'pair-a' },
      { name: 'sea-bottle', layout: 'pair-b' },
      { name: 'dancefloor-dj', layout: 'wide-end' },
      { name: 'dancefloor-blue', layout: 'wide' },
      { name: 'grove-chuppah-crowd', layout: 'wide-end' }
    ]
  }
];
