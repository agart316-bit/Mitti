// Photos are read straight from the madhya-pradesh/ folder next to this source folder (the originals, not copies).
import meadow from '../../../madhya-pradesh/madhya-pradesh-meadow-landscape.jpeg'
import valley from '../../../madhya-pradesh/madhya-pradesh-pachmarhi-valley.jpg'
import orchha from '../../../madhya-pradesh/madhya-pradesh-orchha-palace.jpg'
import potatoes from '../../../madhya-pradesh/madhya-pradesh-spiced-potatoes.jpg'
import flowers from '../../../madhya-pradesh/madhya-pradesh-night-flowers.jpg'
import flowersDark from '../../../madhya-pradesh/madhya-pradesh-night-flowers-dark.jpg'
import mahua from '../../../madhya-pradesh/madhya-pradesh-mahua-flowers.jpg'
import mond from '../../../madhya-pradesh/madhya-pradesh-mond-mahua-bottle.jpeg'
// Madhya Pradesh, stop 10. Copy from the book (pages 46 to 49).
export default {
  slug: 'madhya-pradesh', stop: 10, total: 12, dry: false, flip: true, glass: 'tumbler',
  ink: '#8A5A10',
  images: { h1: meadow, h2: valley, h3: orchha, tile: potatoes, t1: flowers, t2: flowersDark, big: mahua, story: mond },
  arrival: {
    script: `मध्य प्रदेश`, lang: 'hi', nativeLang: 'Hindi', english: 'Madhya Pradesh', pron: 'MUDH-ya pra-DESH',
    langSentence: `The language is Hindi.`,
    greeting: { script: `राम राम`, translit: 'Ram Ram', meaning: 'The everyday village hello.' },
  },
  ingredient: {
    title: ['Mahua', 'The night flower'],
    body: `The mahua tree drops its pale, fleshy flowers in the dark. Before sunrise, families sweep them up from the forest floor, dry them in the sun, and ferment and distil them. The result is one of the very few spirits made from a flower.`,
    season: 'Season: flowers fall roughly March to April',
  },
  story: {
    lead: ['Mahua liquor was', 'outlawed in'], tail: 'its own', circled: 'forests.',
    parts: [
      [`Under the Bombay Abkari Act of 1878 and the Mhowra Act of 1892, mahua liquor was outlawed in its own forests.`, 23],
      [` It stayed a village drink, distilled quietly, for more than a century. In 2022 Madhya Pradesh notified it as a heritage liquor that only tribal self-help groups may distil, with at least half of each group made up of women.`, 23],
      [` Two brands followed in 2023: Mond, from the Bhilala of Kavcha in Alirajpur, and Mohulo, from the Gond of Bhaka Mal in Dindori.`, 23],
    ],
  },
  order: {
    drink: { name: 'Mahua, Mond or Mohulo', strength: 'A distilled spirit.', pouredAs: `DesmondJi Mahua Spirit in India, or Mah abroad, a French-distilled mahua made with Indian flowers since 2021. Mond and Mohulo are sold only in Madhya Pradesh.` },
    zeroProof: { name: 'Indori shikanji', body: `Not a lemonade at all: Indore’s shikanji is milk and mattha reduced for twelve hours with saffron, cardamom, mace, nutmeg and raisins, then served cold, a Sarafa staple credited to Nagori Mishthan Bhandar.` },
    tadkas: [
      { name: 'Chironji', body: `Toasted charoli seeds crushed onto half the rim, small, sweet and almond-like.` },
      { name: 'Khus', body: `A dash of vetiver syrup, green and cooling, stirred in or floated. Sold as khus sharbat.` },
    ],
    chakhna: { name: 'Ratlami garadu', body: `Fried purple yam from Ratlam, soft inside and crisp outside, a winter street snack. It received a GI tag in June 2026.`, pouredAs: `Ube or taro.` },
  },
}
