// Photos are read straight from the karnataka/ folder next to this source folder (the originals, not copies).
import landscape from '../../../karnataka/karnataka-landscape.jpg'
import basket from '../../../karnataka/karnataka-gooseberry-basket.jpg'
import bowl from '../../../karnataka/karnataka-gooseberry-bowl.jpg'
import plate from '../../../karnataka/karnataka-gooseberry-plate.jpg'
import wineJar from '../../../karnataka/karnataka-wine-jar.jpg'
import winePortrait from '../../../karnataka/karnataka-wine-jar-portrait.webp'
import kadlekai from '../../../karnataka/karnataka-congress-kadlekai.jpg'

// Karnataka, stop 02. Copy from the book (pages 14 to 17).
export default {
  slug: 'karnataka', stop: 2, total: 12, dry: false, flip: true, glass: 'wine',
  ink: '#6B3A1E',
  images: { h1: landscape, h2: winePortrait, h3: plate, tile: kadlekai, t1: bowl, big: basket, story: wineJar }, // t2 has no photo yet
  arrival: {
    script: `ಕರ್ನಾಟಕ`, lang: 'kn', nativeLang: 'Kannada', english: 'Karnataka', pron: 'kar-NAA-ta-ka',
    langSentence: `The language is Kannada; in Kodagu, Kodava takk.`,
    greeting: { script: `ನಮಸ್ಕಾರ`, translit: 'Namaskara', meaning: 'Hello.' },
  },
  ingredient: {
    title: ['Nellikai', 'Indian gooseberry'],
    body: `A hard, pale green fruit so sour it makes the mouth pucker, then turns sweet on the tongue. In the coffee hills of Kodagu, Kodava households drop it into jars with sugar and spice and let the season turn it into wine.`,
    season: 'Season: winter, roughly November to February',
  },
  story: {
    lead: ['Karnataka banned', 'arrack in 2007:'], tail: 'the home jar', circled: 'carried on.',
    parts: [
      [`In Kodagu, or Coorg, Kodava families turn whatever the season brings into wine: gooseberry, betel leaf, ginger, pepper, coffee, rice and banana all go into the jar.`, 3],
      [` Pouring a glass for a guest is old hospitality, and bottles travel as gifts. In 2020 the Deccan Herald called year-round fruit wine part of Kodava heritage, and reported that about 1,000 women in the district now make it for income, most without the labels the rules require.`, 4],
      [` Karnataka banned arrack in 2007;`, 5], [` the home jar carried on.`, null],
    ],
  },
  order: {
    drink: { name: 'Kodava gooseberry wine', strength: 'Homemade fruit wine, typically wine strength.', pouredAs: `A dry gooseberry country wine, or the bar’s own licensed batch. Kodava wine is sold informally in Coorg and is not exported.` },
    zeroProof: { name: 'Bellada panaka', body: `Jaggery water spiced with black pepper, dry ginger and cardamom and lifted with lemon, the drink Karnataka offers as prasada on Rama Navami, closing the Chaitra Navratri that opens with Ugadi.` },
    tadkas: [
      { name: 'Coorg coffee', body: `Two or three cracked roasted beans on top. Coffee is one of the fruits of the Kodava wine jar.` },
      { name: 'Fresh ginger', body: `A thin coin in the glass or a few drops of juice. Ginger also goes into the jar.` },
    ],
    chakhna: { name: 'Congress kadlekai', body: `Roasted, split peanuts tossed with spice, a Bengaluru bar staple.` },
  },
}
