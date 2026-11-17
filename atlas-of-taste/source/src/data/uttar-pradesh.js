// Photos are read straight from the uttar-pradesh/ folder next to this source folder (the originals, not copies).
import taj from '../../../uttar-pradesh/uttar-pradesh-taj-mahal-arch.jpg'
import ghat from '../../../uttar-pradesh/uttar-pradesh-varanasi-ghat-sunset.jpg'
import malt from '../../../uttar-pradesh/uttar-pradesh-malted-barley-hands.webp'
import thali from '../../../uttar-pradesh/uttar-pradesh-thali.jpg'
import barleyBowl from '../../../uttar-pradesh/uttar-pradesh-barley-bowl.jpg'
import bottles from '../../../uttar-pradesh/uttar-pradesh-rampur-bottles.jpeg'
import barleySack from '../../../uttar-pradesh/uttar-pradesh-barley-sack-beer.webp'
import rampur from '../../../uttar-pradesh/uttar-pradesh-rampur-glass.jpeg'

// Uttar Pradesh, stop 08. Copy from the book (pages 38 to 41).
export default {
  slug: 'uttar-pradesh', stop: 8, total: 12, dry: false, flip: true, glass: 'tumbler',
  ink: '#7A1424',
  storyTop: '10vh', storyH: '72vh', storyFocus: '50% 100%', // story photo: higher, taller and cropped low so the whole bottle shows
  images: { h1: taj, h2: ghat, h3: malt, tile: thali, t1: barleyBowl, t2: bottles, big: barleySack, story: rampur },
  arrival: {
    script: `उत्तर प्रदेश`, script2: `اتر پردیش`, lang: 'hi', nativeLang: 'Hindi', english: 'Uttar Pradesh', pron: 'UT-tar pra-DESH',
    langSentence: `Two scripts, one spoken tongue.`,
    greeting: { script: `आदाब`, script2: `آداب`, translit: 'Adaab', meaning: 'The Lucknow greeting, said with a raised hand.' },
  },
  ingredient: {
    title: ['Jau', 'Malted barley'],
    body: `Barley grain is soaked until it sprouts, then dried, ground, mashed, fermented and distilled in copper pot stills. Aged in oak through the north Indian summers and winters, the spirit takes on colour and spice faster than it would in Scotland.`,
    season: 'Season: distilled year round',
  },
  story: {
    lead: ['An industrial story,', 'documented and local'], tail: 'rather than', circled: 'folk.',
    parts: [
      [`Rampur Distillery was set up in 1943 in Rampur, a town in western Uttar Pradesh.`, 17],
      [` In 1972 G. N. Khaitan bought the loss-making plant from Vishnu Hari Dalmia for Rs 1.6 million, and a malt spirit plant followed in 1991.`, 17],
      [` The company, now Radico Khaitan, bottles Rampur Indian single malt. This is an industrial story, documented and local rather than folk. Its tadkas come from an older craft: Kannauj, a few hours away, has distilled flowers into scent in copper stills for centuries.`, 18],
    ],
  },
  order: {
    drink: { name: 'Rampur Indian single malt', strength: 'Bottled at about 43% ABV or higher, by expression.', pouredAs: `Itself. Rampur single malt is widely exported.` },
    zeroProof: { name: 'Banaras thandai', body: `Varanasi’s thandai is offered to Kashi Vishwanath at Mahashivratri and Holi: a paste of nuts, seeds, fennel, pepper, cardamom, saffron and rose stirred into chilled milk. Banaras Thandai holds a GI tag. Ours has no bhang.` },
    tadkas: [
      { name: 'Kewra jal', body: `One spritz of food-grade screwpine water over the glass, a nod to Kannauj’s copper stills.` },
      { name: 'Chandi vark', body: `A small square of edible silver leaf laid on the surface, as on the sweets of Lucknow.` },
    ],
    chakhna: { name: 'Galouti kebab', body: `Minced-meat patties so soft they melt on the tongue, from the kitchens of Lucknow.` },
  },
}
