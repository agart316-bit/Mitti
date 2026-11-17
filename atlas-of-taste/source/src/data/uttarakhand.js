// Photos are read straight from the uttarakhand/ folder next to this source folder (the originals, not copies).
import peak from '../../../uttarakhand/uttarakhand-rhododendron-peak.jpg'
import nainital from '../../../uttarakhand/uttarakhand-nainital-lake.jpg'
import hills from '../../../uttarakhand/uttarakhand-flower-hills.jpg'
import gutke from '../../../uttarakhand/uttarakhand-aloo-gutke.jpeg'
import thali from '../../../uttarakhand/uttarakhand-thali.jpg'
import cocktails from '../../../uttarakhand/uttarakhand-red-cocktails.jpeg'
import bloom from '../../../uttarakhand/uttarakhand-rhododendron-bloom.jpg'
import squash from '../../../uttarakhand/uttarakhand-buransh-squash.jpg'

// Uttarakhand, stop 09. Copy from the book (pages 42 to 45).
export default {
  slug: 'uttarakhand', stop: 9, total: 12, dry: false, glass: 'wine',
  ink: '#B82A18',
  images: { h1: peak, h2: nainital, h3: hills, tile: gutke, t1: thali, t2: cocktails, big: bloom, story: squash },
  arrival: {
    script: `उत्तराखण्ड`, lang: 'hi', nativeLang: 'Hindi', english: 'Uttarakhand', pron: 'ut-ta-RAA-khand',
    langSentence: `The languages are Garhwali, Kumaoni and Hindi.`,
    greeting: { script: 'Sewa lagau', roman: true, lang: 'en', translit: 'Garhwali', meaning: 'A respectful hello to elders. In Kumaoni, pailag.' },
  },
  ingredient: {
    title: ['Buransh', 'Rhododendron'],
    body: `In spring the hillsides of Garhwal and Kumaon turn red with Rhododendron arboreum, the tree rhododendron. Its petals are picked, pressed and cooked into a sweet-sour juice that hill families keep in bottles for the hot months.`,
    season: 'Season: blooms roughly March to April',
  },
  story: {
    lead: ['The flower is old;', 'the wine is'], tail: 'barely', circled: 'two years old.',
    parts: [
      [`Buransh is the flower Uttarakhand presses into juice and syrup, bottled commercially and stirred into sharbat at home.`, 21],
      [` Wine is the new chapter. The state’s excise policy backed its first wine production unit at Kotdwar, reported in December 2024, naming buransh flowers alongside malta, apple, pear and galgal as wine fruits.`, 20],
      [` The flower is old; the wine is barely two years old. This stop is honest about that: it pours a tradition of the hills in its newest form.`, null],
    ],
  },
  order: {
    drink: { name: 'Buransh wine', strength: 'Wine strength.', pouredAs: `Dry rosé lengthened with bottled buransh squash. Buransh wine is unlikely to be sold outside the state.` },
    zeroProof: { name: 'Buransh sharbat', body: `The hills’ summer cooler, made from rhododendron petals boiled with lemon and sugar in the February to April bloom. It is the old form of the flower behind this state’s new wine.` },
    tadkas: [
      { name: 'Malta peel', body: `A twist of the hill orange, named with buransh as a state wine fruit.` },
      { name: 'Jakhiya', body: `A pinch of toasted wild-mustard seed on the rim, the crackle of every Garhwali tempering.` },
    ],
    chakhna: { name: 'Aloo ke gutke with bhang ke beej chutney', body: `Hill-style potato cubes tempered with jakhiya, served with a sharp chutney of toasted hemp seed. The seeds contain no intoxicant.` },
  },
}
