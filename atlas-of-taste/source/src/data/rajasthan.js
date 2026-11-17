// Photos are read straight from the rajasthan/ folder next to this source folder (the originals, not copies).
import jal from '../../../rajasthan/rajasthan-jal-mahal-sunset.jpg'
import samode from '../../../rajasthan/rajasthan-samode-arches.jpg'
import window_ from '../../../rajasthan/rajasthan-saffron-window.jpg'
import sev from '../../../rajasthan/rajasthan-sev-bhujia.jpeg'
import dish from '../../../rajasthan/rajasthan-saffron-brass-dish.jpg'
import thali from '../../../rajasthan/rajasthan-thali.jpeg'
import hand from '../../../rajasthan/rajasthan-saffron-hand.webp'
import bottle from '../../../rajasthan/rajasthan-kesar-kasturi-bottle.webp'
// Rajasthan, stop 11. Copy from the book (pages 50 to 53).
export default {
  slug: 'rajasthan', stop: 11, total: 12, dry: false, glass: 'coupe',
  ink: '#ad440b',
  images: { h1: jal, h2: samode, h3: window_, tile: sev, t1: dish, t2: thali, big: hand, story: bottle },
  arrival: {
    script: `राजस्थान`, lang: 'hi', nativeLang: 'Hindi', english: 'Rajasthan', pron: 'RAA-jus-thaan',
    langSentence: `The languages are Rajasthani, Marwari and Hindi.`,
    greeting: { script: `खम्मा घणी`, translit: 'Khamma ghani', meaning: 'The courtly Marwari greeting.' },
  },
  ingredient: {
    title: ['Kesar', 'Saffron'],
    body: `The dried red threads of a crocus flower, picked by hand, about 150 flowers to a gram. No saffron grows in the Thar. In royal Rajasthan, owning it was the point: a spirit steeped in saffron told every guest how rich the house was.`,
    season: 'Season: imported; the crocus flowers in autumn',
  },
  story: {
    lead: ['Poured at weddings', 'as the munawwar piyala,'], tail: 'the guest’s cup of', circled: 'request.',
    parts: [
      [`Rajasthan’s royal physicians once steeped herbs and spices in fierce spirit as medicine. Kesar Kasturi was made for the Jodhpur royal family with saffron and musk, until the 1972 Wildlife Protection Act took the musk out.`, 27],
      [` The Rajasthan Excise Act of 1950 stripped royal families of their distilling licences, and the recipes went quiet. On 9 July 1998 the Heritage Liquor Act brought them back as a legal category.`, 27],
      [` At weddings and gatherings it is still poured as the munawwar piyala, the guest’s cup of request.`, 27],
    ],
  },
  order: {
    drink: { name: 'Royal Kesar Kasturi, munawwar piyala', strength: 'A strong heritage liquor; take it slowly.', pouredAs: `Royal Kesar Kasturi where it can be bought. Its availability outside Rajasthan is not confirmed. If needed, the bar infuses a neutral grain spirit with saffron and a little honey, and says so.` },
    zeroProof: { name: 'Rai ki kanji', body: `Red mustard seed, fennel and chilli left to sour in water for a day, the sharp liquid that soaks Rajasthan’s kanji vada. One Rajasthani family has served it at Holi and Diwali for 70 years.` },
    tadkas: [
      { name: 'Pushkar rose', body: `A single petal floated, or a smear of gulkand, rose-petal preserve, on the cup’s rim. Rose is a named ingredient of Rajasthan’s heritage liquors.` },
      { name: 'Ker', body: `A pickled desert caper berry on a pick, served beside the cup like an olive. This pairing is the book’s own invention.` },
    ],
    chakhna: { name: 'Bikaneri bhujia', body: `Fine, crisp sev from Bikaner, made with moth-bean flour, which gives it its bite. Most bars buy it packaged.` },
  },
}
