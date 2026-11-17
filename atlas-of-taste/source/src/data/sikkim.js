// Photos are read straight from the sikkim/ folder next to this source folder (the originals, not copies).
import yak from '../../../sikkim/sikkim-yak-frozen-lake.jpg'
import monastery from '../../../sikkim/sikkim-monastery-mountains.jpg'
import millet from '../../../sikkim/sikkim-millet-plant.jpeg'
import churpi from '../../../sikkim/sikkim-churpi.jpeg'
import hanging from '../../../sikkim/sikkim-finger-millet-hanging.jpg'
import tin from '../../../sikkim/sikkim-millet-mash-tin.jpeg'
import dosa from '../../../sikkim/sikkim-ragi-dosa.jpg'
import tongba from '../../../sikkim/sikkim-tongba-cups.jpeg'

// Sikkim, stop 06. Copy from the book (pages 30 to 33).
export default {
  slug: 'sikkim', stop: 6, total: 12, dry: false, flip: true, glass: 'tall',
  ink: '#5A3B4A',
  images: { h1: yak, h2: monastery, h3: millet, tile: churpi, t1: tin, t2: dosa, big: hanging, story: tongba },
  arrival: {
    script: `सिक्किम`, lang: 'ne', nativeLang: 'Nepali', english: 'Sikkim', pron: 'SIK-kim',
    langSentence: `The languages are Nepali, Lepcha, Bhutia and Limbu.`,
    greeting: { script: `नमस्ते`, translit: 'Namaste', meaning: 'Hello. In Lepcha, khamri.' },
  },
  ingredient: {
    title: ['Kodo', 'Finger millet'],
    body: `A tiny, rust-brown grain that grows on steep terraces where rice will not. Boiled, cooled and mixed with marcha, a dry starter cake of rice and wild herbs, it ferments for days into the mash for chhang.`,
    season: 'Season: harvested in autumn',
  },
  story: {
    lead: ['A few drops go', 'to the deity'], tail: '', circled: 'first.',
    parts: [
      [`The Lepchas call it chi and offer it to the gods; the Limbus call it tongba.`, 13],
      [` Boiled finger millet is fermented with marcha, a dried starter cake of rice and wild herbs,`, 14],
      [` then packed into a bamboo vessel and drowned in warm water. Through the evening the host keeps topping it up, and a few drops go to the deity first.`, 13],
      [` Lepcha legend says a cockroach was sent to steal the first yeast from Matli Mu, the goddess of earthquakes and wine.`, 13],
    ],
  },
  order: {
    drink: { name: 'Chhang, tongba', strength: 'A low-alcohol millet beer, lighter with each refill.', pouredAs: `Unfiltered makgeolli, warmed, or a craft millet or sorghum beer. Tongba is not sold commercially.` },
    zeroProof: { name: 'Su cha, butter tea', body: `Butter tea is poured by Sikkim’s Bhutia on religious and social occasions: black tea boiled dark, salted and churned with butter. Ours is brewed with Temi, the estate the last Chogyal planted in 1969.` },
    tadkas: [
      { name: 'Large cardamom', body: `One smoky black pod dropped into the vessel. Sikkim grows more of it than almost anywhere.` },
      { name: 'Timur', body: `A few cracked Himalayan peppercorns over the top, for a citrus tingle on the lips.` },
    ],
    chakhna: { name: 'Churpi', body: `Hard, chewy cheese of the high Himalaya, made from cow or yak milk and dried until it can be held in the mouth for an hour.`, pouredAs: `Aged pecorino or parmesan shards.` },
  },
}
