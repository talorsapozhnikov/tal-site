/* The site is organised by moments of the day, not by wedding.
   To add photos: export each as WebP in the sizes listed in README.md, put it in /images,
   add it to PHOTOS, then list its name in a chapter below. No HTML changes are needed.
   Never invent places, dates or names. */

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

/* Top-level categories, in this order. A category with no photos is hidden.
   Weddings are split into chapters by moment of the day; other categories hold their photos directly.
   The first 5 photos of a chapter (or category) make its collage on the home page; all appear on its own page.
   rows: how many photos sit in each collage row, repeated (default [2, 3]). */
window.CATEGORIES = [
  { id: 'weddings', title: { he: 'חתונות', en: 'Weddings' },
    chapters: [
      { id: 'beauty', title: { he: 'ביוטי', en: 'Getting ready' }, photos: [] },
      { id: 'reception', title: { he: 'קבלת פנים', en: 'Reception' }, rows: [3],
        photos: ['grove-setup', 'shore-band', 'sea-bottle'] },
      { id: 'chuppah', title: { he: 'חופה', en: 'Chuppah' },
        photos: ['shore-crowd', 'shore-kiss', 'grove-chuppah-bw', 'shore-chuppah-bw', 'water-aisle', 'grove-chuppah-crowd'] },
      { id: 'couple', title: { he: 'הזוג', en: 'The two of them' },
        photos: ['water-portrait', 'shore-dip', 'shore-blur', 'shore-portrait', 'water-embrace', 'water-low-angle'] },
      { id: 'family', title: { he: 'משפחה', en: 'Family' }, photos: [] },
      { id: 'dance', title: { he: 'רחבה', en: 'Dance floor' },
        photos: ['dancefloor-dj', 'dancefloor-blue'] },
      { id: 'laughter', title: { he: 'צחוק', en: 'Laughter' }, photos: [] }
    ] },
  { id: 'events', title: { he: 'אירועים', en: 'Events' }, photos: [] },
  { id: 'concerts', title: { he: 'הופעות', en: 'Concerts' }, photos: [] },
  { id: 'festivals', title: { he: 'פסטיבלים', en: 'Festivals' }, photos: [] },
  { id: 'productions', title: { he: 'הפקות', en: 'Productions' }, photos: [] }
];
