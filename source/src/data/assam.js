// Photos are read straight from the assam/ folder next to this source folder (the originals, not copies).
import river from '../../../assam/assam-river-valley.jpg'
import pickers from '../../../assam/assam-tea-pickers.jpg'
import terraces from '../../../assam/assam-tea-terraces.jpg'
import pitha from '../../../assam/assam-ghila-pitha.jpeg'
import riceLeaf from '../../../assam/assam-rice-banana-leaf.jpg'
import bottles from '../../../assam/assam-judima-bottles.jpg'
import stickyRice from '../../../assam/assam-bamboo-sticky-rice.jpg'
import glasses from '../../../assam/assam-judima-glasses.jpeg'

// Assam, stop 07. Copy from the book (pages 34 to 37).
export default {
  slug: 'assam', stop: 7, total: 12, dry: false, glass: 'tumbler',
  ink: '#A33B1B',
  images: { h1: river, h2: pickers, h3: terraces, tile: pitha, t1: riceLeaf, t2: glasses, big: stickyRice, story: bottles },
  arrival: {
    script: `অসম`, lang: 'as', nativeLang: 'Assamese', english: 'Assam', pron: 'OH-khom',
    langSentence: `The language is Assamese; judima belongs to the Dimasa people.`,
    greeting: { script: `নমস্কাৰ`, translit: 'Nomoskar', meaning: 'Hello.' },
  },
  ingredient: {
    title: ['Bora saul', 'Sticky rice'],
    body: `A glutinous rice that turns soft and clinging when cooked. Assam steams it for festival breakfasts and grinds it for pitha. In the hills of Dima Hasao, the Dimasa ferment it with forest herbs into a sweet, amber wine.`,
    season: 'Season: harvested in late autumn',
  },
  story: {
    lead: ['The first drink from', 'Northeast India to get'], tail: 'a', circled: 'GI tag.',
    parts: [
      [`The Dimasa people of Dima Hasao brew judima from sticky rice and forest herbs. It takes about a week to make, tastes sweet, and can keep for years.`, 16],
      [` In September 2021, after documentation by Assam Agricultural University, the Dimasa group YADEM and Gauhati University’s Uttam Baithari, judima became the first drink from Northeast India to receive a Geographical Indication tag.`, 16],
      [` Across the region, every community has its own rice brew and its own starter cake; judima is the one now protected by name.`, 15],
    ],
  },
  order: {
    drink: { name: 'Judima, Dimasa sticky-rice wine', strength: 'A sweet rice wine.', pouredAs: `Drinking-grade Chinese huangjiu (Shaoxing) or a sweet nigori sake. Judima is homemade and not sold commercially.` },
    zeroProof: { name: 'Laal saah', body: `Assam’s red tea: black tea brewed strong and served hot without milk, sweetened with sugar or honey, at roadside saah dukans. Tea was found growing wild in Assam in 1823.` },
    tadkas: [
      { name: 'Phalap', body: `A few leaves of Singpho smoked tea, steeped in the cup for a minute or smouldered under the glass for aroma.` },
      { name: 'Outenga, elephant apple', body: `One thin, sour slice on the rim.` },
    ],
    chakhna: { name: 'Ghila pitha', body: `Small fried rice-flour and jaggery cakes, made for Bihu and eaten with tea.` },
  },
}
