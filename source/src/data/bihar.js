// Photos are read straight from the bihar/ folder next to this source folder (the originals, not copies).
import arches from '../../../bihar/bihar-arches-sunset.webp'
import temple from '../../../bihar/bihar-temple-fields.jpg'
import chhath from '../../../bihar/bihar-chhath-offerings.jpg'
import makhana from '../../../bihar/bihar-makhana-jar.jpg'
import sattuFlour from '../../../bihar/bihar-sattu-flour.webp'
import ladoo from '../../../bihar/bihar-sattu-ladoo.jpg'
import sattuSet from '../../../bihar/bihar-sattu-drink-ingredients.jpg'
import sharbat from '../../../bihar/bihar-sattu-sharbat.jpg'

// Bihar, stop 05, a dry state. Copy from the book (pages 26 to 29). The main drink is already zero-proof.
export default {
  slug: 'bihar', stop: 5, total: 12, dry: true, dryNote: 'Dry state since April 2016.', glass: 'tall',
  ink: '#8a5b07',
  storyTop: '10vh', storyH: '72vh', storyFocus: '50% 74%', // story photo: higher and taller, cropped low so the three glasses show in full
  images: { h1: arches, h2: temple, h3: chhath, tile: makhana, t1: ladoo, t2: sattuFlour, big: sattuSet, story: sharbat },
  arrival: {
    script: `बिहार`, lang: 'hi', nativeLang: 'Hindi', english: 'Bihar', pron: 'bi-HAAR',
    langSentence: `The languages are Hindi, Bhojpuri, Maithili and Magahi.`,
    greeting: { script: `प्रणाम`, translit: 'Pranam', meaning: 'A respectful hello.' },
  },
  ingredient: {
    title: ['Sattu', 'Roasted gram flour'],
    body: `Whole chana is roasted in hot sand until it cracks, then ground to a fine, nutty flour. It keeps for months without spoiling, needs no cooking, and turns into a meal or a cold drink with only water, salt and lime.`,
    season: 'Season: year round; drunk most in the summer heat',
  },
  story: {
    lead: ['Bihar banned alcohol', 'in April 2016.'], tail: 'The glass holds', circled: 'sattu.',
    parts: [
      [`Sattu is the summer fuel of the Gangetic plain, carried as dry flour by labourers and travellers and whisked into water with salt and lime when the heat bites.`, null],
      [` In April 2016 Bihar banned the sale, purchase and drinking of alcohol across the state.`, 11],
      [` Through 2026, allies and opponents alike have called for the ban to be reviewed,`, 12], [` but Chief Minister Nitish Kumar has kept it.`, 11],
      [` So at this stop the glass holds the drink Bihar already had: a cold sattu sharbat.`, null],
    ],
  },
  order: {
    drink: { name: 'Sattu sharbat', pouredAs: `Packaged chana sattu from an Indian grocer. In a pinch, dry-roasted besan.` },
    tadkas: [
      { name: 'Shahi litchi', body: `A peeled Muzaffarpur lychee on a pick, or a spoon of lychee purée stirred through.` },
      { name: 'Magahi paan', body: `A strip of tender betel leaf, clapped between the palms to wake its scent and laid across the glass.` },
    ],
    chakhna: { name: 'Mithila makhana', body: `Fox nuts, the popped seeds of a water lily grown in the ponds of north Bihar, roasted in ghee.` },
  },
}
