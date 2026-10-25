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
  'shore-silhouette':    { portrait: true,
    alt: { he: 'צללית של הזוג מול הים, השמש נוצצת על המים מאחוריהם', en: 'The couple in silhouette facing each other, sun glittering on the sea behind them' } },
  'grove-laugh':         { portrait: true,
    alt: { he: 'הכלה צוחקת ומביטה אחורה אל החתן שמחבק אותה, עצים ירוקים ברקע', en: 'The bride laughing as she looks back at the groom holding her, green trees behind' } },
  'water-cheek':         { alt: { he: 'החתן מנשק את לחי הכלה, היא מחייכת למצלמה, המים והעצים מאחור', en: 'The groom kisses the bride\u2019s cheek as she smiles toward the camera, water and trees behind' } },
  'grove-ring':          { alt: { he: 'החתן עונד את הטבעת לכלה מתחת לחופה, המשפחה מוחאת כפיים סביבם', en: 'The groom slips the ring onto the bride\u2019s finger under the chuppah, family clapping around them' } },
  'grove-glass':         { portrait: true,
    alt: { he: 'החתן מרים רגל לשבור את הכוס, הכלה והמשפחה מאחוריו', en: 'The groom lifts his foot to break the glass, the bride and family behind him' } },
  'grove-family-laugh':  { alt: { he: 'הכלה מחזיקה את פני החתן בשתי ידיים, המשפחה וילד קטן צוחקים סביבם', en: 'The bride holds the groom\u2019s face in both hands while the family and a small boy laugh around them' } },
  'first-dance':         { alt: { he: 'הזוג מחובק בריקוד, אלומות אור ועשן, האורחים מסביב בצללית', en: 'The couple holding each other in a slow dance, beams of light and haze, guests in silhouette around them' } },
  'dancefloor-yellow':   { alt: { he: 'הכלה רוקדת עם ידיים למעלה מול החתן שמוחא כפיים, הכול באור צהוב', en: 'The bride dancing with her arms up as the groom claps, everything in yellow light' } },
  'dancefloor-lift':     { alt: { he: 'החתן מורם על כתפיים מעל קהל רוקד, אלומות סגולות וכחולות', en: 'The groom lifted on shoulders above a dancing crowd, purple and blue beams of light' } },
  'dancefloor-amber':    { alt: { he: 'מבט מעמדת הדי־ג׳יי על רחבה מלאה, אלומות אור כתומות ולבנות', en: 'From behind the DJ booth, a full dance floor under orange and white beams' } },
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
        photos: ['grove-ring', 'shore-kiss', 'shore-chuppah-bw', 'grove-glass', 'shore-crowd', 'grove-chuppah-bw', 'water-aisle', 'grove-chuppah-crowd'] },
      { id: 'couple', title: { he: 'הזוג', en: 'The two of them' },
        photos: ['shore-silhouette', 'water-cheek', 'shore-blur', 'water-portrait', 'shore-dip', 'shore-portrait', 'water-embrace', 'water-low-angle'] },
      { id: 'family', title: { he: 'משפחה', en: 'Family' }, photos: [] },
      { id: 'dance', title: { he: 'רחבה', en: 'Dance floor' },
        photos: ['first-dance', 'dancefloor-yellow', 'dancefloor-lift', 'dancefloor-amber', 'dancefloor-dj', 'dancefloor-blue'] },
      { id: 'laughter', title: { he: 'צחוק', en: 'Laughter' },
        photos: ['grove-laugh', 'grove-family-laugh'] }
    ] },
  { id: 'events', title: { he: 'אירועים', en: 'Events' }, photos: [] },
  { id: 'concerts', title: { he: 'הופעות', en: 'Concerts' }, photos: [] },
  { id: 'festivals', title: { he: 'פסטיבלים', en: 'Festivals' }, photos: [] },
  { id: 'productions', title: { he: 'הפקות', en: 'Productions' }, photos: [] }
];
