// Photos are read straight from the goa/ folder next to this source folder (the originals, not copies).
import coast from '../../../goa/goa-beach-sunset.webp'
import boat from '../../../goa/goa-backwater-boat.webp'
import tavern from '../../../goa/goa-tavern-night-street.webp'
import huts from '../../../goa/goa-beach-huts-palms.webp'
import bowl from '../../../goa/goa-cashews-bowl-amber-glasses.webp'
import cashewPile from '../../../goa/goa-cashew-apple-pile.jpg'
import cashewHands from '../../../goa/goa-cashew-apples-in-hands.webp'
import feni from '../../../goa/goa-feni-bottle-glass.jpeg'

// One state = one object. Copy comes from the book copy (pages 10 to 13).
// No recipes or methods on the web, so ingredient lists and steps are left out on purpose.
export default {
  slug: 'goa', stop: 1, total: 12, dry: false,
  ink: '#5E1B3C', glass: 'coupe',
  photos: { h1: 'Photo: Goan coast', h2: 'Illustration: cashew apple', h3: 'Photo: tavern, back room', tile: 'Photo: Limca', t1: 'Photo: cashew apples, ripe', t2: 'Photo: cashew nut on the fruit', big: 'Photo: cashew orchard, Goa', story: 'Photo: feni still, copper' },
  images: { h1: coast, h2: boat, h3: tavern, tile: huts, t1: bowl, t2: cashewPile, big: cashewHands, story: feni },
  arrival: {
    script: 'गोंय', lang: 'kok', nativeLang: 'Konkani', nativeRespelling: 'goy', english: 'Goa', pron: 'GOH-uh', // pron = how the English name is said; nativeRespelling = the Konkani name
    langSentence: 'The language is Konkani, written in Devanagari and Roman.',
    greeting: { script: 'देव बरें करूं', translit: 'Dev borem korum', meaning: '“God bless you,” the Konkani thank you.' },
  },
  ingredient: {
    title: ['Kaju', 'Cashew apple'],
    body: 'The cashew nut hangs beneath a soft, swollen fruit, the cashew apple. In Goa the apples are trodden or pressed, the juice is left to ferment, and the first distillation becomes urrak. The Portuguese brought the tree from Brazil.',
    season: 'Season: March to May',
  },
  story: {
    lead: ['Regulars once asked', 'in a whisper:'], tail: 'Urraca', circled: 'asa?',
    // [text, footnote]
    parts: [
      ['Urrak is the first distillation of fermented cashew-apple juice, made during the March to May harvest and drunk young for a season of about 15 weeks.', 1],
      [' Whatever is not drunk is distilled again into feni. Feni won a Geographical Indication tag in 2009 and was named a heritage spirit in 2016,', 2],
      [' yet the Goa Excise Act still has no provision for selling urrak.', 1],
      [' It is a drink of taverns and back rooms, poured over ice with Limca, salt and a squeeze of lemon.', null],
    ],
    sources: [
      { n: 1, text: 'GOYA, Hansel Vaz on the uraq season', url: 'https://www.goya.in/blog/uraq-season-feni-goa' },
      { n: 2, text: 'Wikipedia, Feni', url: 'https://en.wikipedia.org/wiki/Feni_(liquor)' },
    ],
  },
  order: {
    drink: { name: 'Urrak with Limca', strength: 'Urrak is roughly 15 to 35% ABV; sources disagree.', pouredAs: 'Young, unaged cashew feni, when urrak is out of season or out of reach.' },
    zeroProof: { name: 'Solkadhi', body: 'The Konkan coast’s purple-pink cooler: sun-dried kokum rind soaked and squeezed into thin coconut milk, sharpened with garlic and green chilli. Goans drink it with rice or after a meal to cool the body.' },
    tadkas: [
      { name: 'Goan sea salt', body: 'A tiny pinch over the top, as in the tavern serve.' },
      { name: 'Lemon sliver', body: 'One thin slice in the glass, the documented garnish.' },
    ],
    chakhna: { name: 'Chorizo pao', body: 'Spiced Goan pork sausage, crumbled and fried, stuffed into a soft bread roll.', pouredAs: 'Spicy Portuguese chouriço.' },
  },
}
