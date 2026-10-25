/* Every photograph on the site, by a stable id (the file name stem in /images).
   One entry per photo; categories, stories and the home page refer to photos by this id,
   so the same image file can appear in several places without being copied.

   Each entry:
     portrait: true        vertical photo (files at 600, 1000, 1400 wide); otherwise landscape (400, 800, 1400, 2000)
     w, h                  real proportions when they are not 3:2 (landscape) or 2:3 (portrait)
     alt: { he, en }       what happens in the photo, in both languages. Required.

   New photos: run tools/add-photos.py (see README.md); it writes the image files and prints entries to paste here. */

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
  'fest-stage-wide':     { alt: { he: 'במה גדולה בלילה, להקה באור כחול ועשן, קהל צפוף בצללית ומסכים משני הצדדים', en: 'A big stage at night, a band in blue light and haze, a packed crowd in silhouette and screens on both sides' } },
  'fest-reach-bw':       { alt: { he: 'בשחור־לבן: זמר מושיט יד אל הקהל, ידיים נמתחות אליו ואור חזק מאחור', en: 'Black and white: a singer reaches toward the crowd, hands stretching back to him, strong light behind' } },
  'fest-bow':            { portrait: true,
    alt: { he: 'זמר מתכופף עם המיקרופון בקצה הבמה, שערו מואר מאחור באור צהוב', en: 'A singer bends over the microphone at the edge of the stage, his hair backlit in yellow' } },
  'fest-crowd-faces':    { alt: { he: 'קהל צפוף בלילה מול הבמה, פנים מסתכלות קדימה, מכולות מאחור', en: 'A dense crowd at night facing the stage, faces looking forward, shipping containers behind' } },
  'fest-runway-bw':      { portrait: true,
    alt: { he: 'בשחור־לבן: זמר עומד על מסלול רשת מתכת, מצולם מגובה הרצפה, אורות במה מאחוריו', en: 'Black and white: a singer on a metal-grate runway, shot from floor level, stage lights behind him' } },
  'fest-sequins-up':     { portrait: true,
    alt: { he: 'זמר במכנסי פאייטים מרים יד על המסלול, מצולם מלמטה, אורות כחולים ולהקה ברקע', en: 'A singer in sequinned trousers raises a hand on the runway, shot from below, blue lights and band behind' } },
  'fest-phones':         { alt: { he: 'אלפי פנסי טלפון דולקים בקהל בחושך, זמר עומד על המסלול בתוך הערפל', en: 'Thousands of phone lights in the dark crowd, a singer standing on the runway in the haze' } },
  'fest-guitar-sun':     { alt: { he: 'גיטריסט שר בחולצה משובצת באור שמש נמוך, עצים כהים ברקע', en: 'A guitarist sings in a checked shirt in low sunlight, dark trees behind' } },
  'fest-shirtless':      { alt: { he: 'זמר בלי חולצה שר בעיניים עצומות, אורות סגולים וירוקים מסביבו', en: 'A shirtless singer sings with eyes closed, purple and green light around him' } },
  'fest-runway-day':     { alt: { he: 'זמר במשקפי שמש שר על המסלול ביום, קונסטרוקציית במה ענקית מעליו', en: 'A singer in sunglasses on the runway in daylight, a huge stage rig above him' } },
  'fest-horns':          { alt: { he: 'בשחור־לבן: יד מקועקעת מורמת בתנועת רוק מעל הקהל', en: 'Black and white: a tattooed arm raised in the rock salute above the crowd' } },
  'fest-barrier':        { alt: { he: 'צעירים צמודים למחסום באור כחול, צועקים ומראים תנועות רוק', en: 'Young fans pressed against the barrier in blue light, shouting and throwing rock salutes' } },
  'fest-sunflower':      { alt: { he: 'להקה על הבמה מבעד לפרח כתום מחוץ לפוקוס, אורות צבעוניים ורצפת רשת', en: 'A band on stage seen past an out-of-focus orange flower, coloured lights and a grated floor' } },
  'fest-sequins-blue':   { alt: { he: 'זמר במכנסי פאייטים רחבים על המסלול באור כחול, פסנתרן בקצה הבמה', en: 'A singer in wide sequinned trousers on the runway in blue light, a pianist at the edge of the stage' } },
  'dancefloor-blue':     { alt: { he: 'רחבת ריקודים באור כחול, אנשים רוקדים בצללית מתחת לפנסי במה', en: 'A dance floor in blue light, people dancing in silhouette under stage lights' } }
};
