// Photos are read straight from the west-bengal/ folder next to this source folder (the originals, not copies).
import river from '../../../west-bengal/west-bengal-river-sunrise.jpg'
import tiger from '../../../west-bengal/west-bengal-tiger-ruins.jpg'
import tapper from '../../../west-bengal/west-bengal-date-palm-tapper.webp'
import jaggery from '../../../west-bengal/west-bengal-date-jaggery.jpg'
import gurSweets from '../../../west-bengal/west-bengal-nolen-gur-sweets.jpg'
import jhalmuri from '../../../west-bengal/west-bengal-jhalmuri.jpg'
import rickshaws from '../../../west-bengal/west-bengal-rickshaws-street.jpg'
import punch from '../../../west-bengal/west-bengal-punch.jpg'

// West Bengal, stop 04. Copy from the book (pages 22 to 25).
export default {
  slug: 'west-bengal', stop: 4, total: 12, dry: false, flip: true, glass: 'tumbler',
  ink: '#8E4E14',
  images: { h1: river, h2: tapper, h3: tiger, tile: rickshaws, t1: gurSweets, t2: jaggery, big: jhalmuri, story: punch },
  arrival: {
    script: `পশ্চিমবঙ্গ`, lang: 'bn', nativeLang: 'Bengali', english: 'West Bengal', pron: 'POSH-chim BON-go',
    langSentence: `The language is Bengali.`,
    greeting: { script: `নমস্কার`, translit: 'Nomoshkar', meaning: 'Hello.' },
  },
  ingredient: {
    title: ['Nolen gur', 'Date-palm jaggery'],
    body: `In the cold months, tappers cut the khejur, the date palm, and collect its sap overnight. Boiled down in wide pans, it becomes nolen gur: soft, smoky and caramel-dark. Bengal’s winter sweets taste of it.`,
    season: 'Season: winter, roughly November to February',
  },
  story: {
    lead: ['Punch was a', 'company drink,'], tail: 'not a', circled: 'village one.',
    parts: [
      [`The word punch first appears in English in a 1632 letter from Robert Addams, an East India Company man, to Thomas Colley, a factor heading for Bengal.`, 8],
      [` The drink is said to take its name from panch, five, for its five parts: spirit, water, sugar, citrus and spice. The spirit was arrack.`, 10],
      [` Punch was a company drink, not a village one, mixed by traders far from home. This glass gives it back to Bengal with the region’s own sugar, nolen gur, boiled from date-palm sap and praised in medieval Sanskrit verse.`, 9],
    ],
  },
  order: {
    drink: { name: 'Bengal Punch', pouredAs: `Batavia arrack. Which arrack Bengal’s traders drank is not recorded; Batavia arrack, distilled from sugarcane and red rice, keeps the base apart from Kerala’s palm toddy.` },
    zeroProof: { name: 'Aam pora shorbot', body: `Bengal’s summer relief: green mangoes charred over flame until smoky and soft, stirred with black salt, sugar and green chilli. A dusting of bhaja moshla, toasted cumin, is the common finish.` },
    tadkas: [
      { name: 'Gondhoraj lebu', body: `A twist of peel or a little zest. Bengal’s perfumed lime smells of lime and mandarin at once.` },
      { name: 'Nolen gur', body: `A fine grating over the top, so the first sip smells of the date palm.` },
    ],
    chakhna: { name: 'Jhalmuri', body: `Puffed rice tossed with mustard oil and whatever the seller has to hand, sold in paper cones on trains and street corners.` },
  },
}
