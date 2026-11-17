// Photos are read straight from the gujarat/ folder next to this source folder (the originals, not copies).
import ghat from '../../../gujarat/gujarat-gomti-ghat-dwarka.jpeg'
import fort from '../../../gujarat/gujarat-rann-sunset-fort.jpg'
import camel from '../../../gujarat/gujarat-rann-camel-cart.jpg'
import fafda from '../../../gujarat/gujarat-jalebi-fafda.jpeg'
import dahi from '../../../gujarat/gujarat-dahi-cup.jpeg'
import pots from '../../../gujarat/gujarat-clay-pots-chaas.jpg'
import shrikhand from '../../../gujarat/gujarat-shrikhand-bowl.jpg'
import chaas from '../../../gujarat/gujarat-masala-chaas-glass.jpg'
// Gujarat, stop 12, a dry state. Copy from the book (pages 54 to 57). The main drink is already zero-proof.
export default {
  slug: 'gujarat', stop: 12, total: 12, dry: true, dryNote: 'Dry state since 1960.', flip: true, glass: 'tall',
  ink: '#666510',
  storyTop: '10vh', storyH: '72vh', storyFocus: '50% 55%',
  images: { h1: ghat, h2: fort, h3: camel, tile: fafda, t1: dahi, t2: pots, big: shrikhand, story: chaas },
  arrival: {
    script: `ગુજરાત`, lang: 'gu', nativeLang: 'Gujarati', english: 'Gujarat', pron: 'GOO-ja-raat',
    langSentence: `The language is Gujarati.`,
    greeting: { script: `કેમ છો`, translit: 'Kem cho', meaning: 'How are you?' },
  },
  ingredient: {
    title: ['Dahi', 'Yogurt'],
    body: `Churn yogurt with plenty of water and it becomes chaas, the thin buttermilk poured after every Gujarati meal. The last step is the vaghar: spice sizzled in hot ghee and poured over, the moment a tadka is named for.`,
    season: 'Season: year round',
  },
  story: {
    lead: ['Gujarat was', 'born'], tail: '', circled: 'dry.',
    parts: [
      [`Gujarat was born dry. The Bombay Prohibition Act of 1949 carried over when Bombay State split into Gujarat and Maharashtra in 1960,`, 28],
      [` and drinking still needs a permit, with prison terms of three months to five years.`, 28],
      [` GIFT City, the financial district near Gandhinagar, won a wine-and-dine exemption in 2023,`, 29], [` widened in December 2025.`, 30],
      [` The rest of the state pours chaas. So the last stop on the route closes as every Gujarati lunch does: with a cold glass of buttermilk and a hot vaghar poured over the top.`, null],
    ],
  },
  order: {
    drink: { name: 'Masala chaas', pouredAs: `Itself. Everything is sold in Indian grocers.` },
    tadkas: [
      { name: 'Roasted jeeru', body: `Ground roasted cumin dusted over the top, the only cumin in the book.` },
      { name: 'Hing vaghar', body: `The pinch of asafoetida sizzled in ghee and poured over, the most literal tadka on the route.` },
    ],
    chakhna: { name: 'Fafda-jalebi', body: `Crisp gram-flour strips eaten with hot, syrupy jalebi, a pairing Gujarat is known for.` },
  },
}
