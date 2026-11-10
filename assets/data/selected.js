/* Selected work on the home page: one group per category, never mixed.
   A group whose category has nothing public is hidden. Blocks are the same as in a layout
   (see categories.js); each group opens with one photograph across the whole screen ({ full }). Every photo here must also belong to that category or one of its published stories. */

window.SELECTED = [
  { category: 'weddings', blocks: [
    { full: 'first-dance' },
    { row: ['grove-family-laugh', 'shore-silhouette', 'shore-kiss'] },
    { row: ['grove-glass', 'dancefloor-yellow'] },
    { row: ['shore-band', 'sea-bottle', 'water-cheek'] }
  ] },
  { category: 'festivals', blocks: [
    { full: 'fest-stage-wide' },
    { row: ['fest-bow', 'fest-phones', 'fest-runway-bw'] },
    { row: ['fest-reach-bw', 'fest-barrier'] },
    { row: ['fest-sequins-up', 'fest-guitar-sun', 'fest-horns'] }
  ] }
];
