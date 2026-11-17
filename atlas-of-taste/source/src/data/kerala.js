// Photos are read straight from the kerala/ folder next to this source folder (the originals, not copies).
import houseboat from '../../../kerala/kerala-houseboat-backwaters.jpg'
import teaHills from '../../../kerala/kerala-tea-hills.jpg'
import palm from '../../../kerala/kerala-coconut-palm.jpg'
import palmFlower from '../../../kerala/kerala-coconut-palm-flower.jpg'
import toddyPots from '../../../kerala/kerala-toddy-pots.jpeg'
import toddyBottle from '../../../kerala/kerala-toddy-bottle-snacks.jpg'
import meal from '../../../kerala/kerala-meal-spread-landscape.jpg'
import kulukki from '../../../kerala/kerala-kulukki-sarbath.jpg'

// Kerala, stop 03. Copy from the book (pages 18 to 21).
export default {
  slug: 'kerala', stop: 3, total: 12, dry: false, glass: 'tumbler',
  ink: '#4F5C14',
  images: { h1: houseboat, h2: teaHills, h3: palm, tile: toddyBottle, t1: palmFlower, t2: kulukki, big: meal, story: toddyPots },
  arrival: {
    script: `കേരളം`, lang: 'ml', nativeLang: 'Malayalam', english: 'Kerala', pron: 'KAY-ra-lum',
    langSentence: `The language is Malayalam.`,
    greeting: { script: `നമസ്കാരം`, translit: 'Namaskaram', meaning: 'Hello.' },
  },
  ingredient: {
    title: ['Thengu', 'Coconut palm flower'],
    body: `Before a coconut forms, the palm sends out a closed flower stalk. A tapper climbs at dawn, slices its tip and ties on a pot. The sap that drips in is sweet. By afternoon, wild yeast has made it kallu.`,
    season: 'Season: tapped year round',
  },
  story: {
    lead: ['Kerala cracked down', 'on alcohol in 2015.'], tail: 'Toddy was', circled: 'spared.',
    parts: [
      [`About 30,000 tappers climb Kerala’s coconut palms and slice the flower stalks into terracotta pots, where wild yeast turns the sap into kallu within hours.`, 6],
      [` By the next day it is vinegar, so it is never bottled or sent far. It is poured at the kallu shaap, the toddy shop, from reused bottles, next to fish fried hot enough to make you drink more. Historian J. Devika notes that men and women shared toddy shops until the 1940s.`, 6],
      [` When Kerala cracked down on alcohol in 2015, toddy was spared as an indigenous drink.`, 7],
    ],
  },
  order: {
    drink: { name: 'Kallu, coconut toddy', strength: 'About 3 to 6% ABV, rising as it ferments.', pouredAs: `Bottled Sri Lankan or West African palm wine, or a makgeolli and coconut water stand-in. Fresh toddy cannot travel.` },
    zeroProof: { name: 'Kulukki sarbath', body: `Kerala’s shaken lemonade: lemon, sugar, a pinch of salt and green chilli shaken hard for half a minute in a lidded tumbler, sold at roadside stalls across the state.` },
    tadkas: [
      { name: 'Curry leaf', body: `One leaf, bruised between the fingers and floated, from the toddy-shop kitchen.` },
      { name: 'Malabar black pepper', body: `One fresh crack over the top. Tellicherry pepper is Malabar pepper.` },
    ],
    chakhna: { name: 'Karimeen pollichathu with kappa', body: `Pearl spot fish wrapped in banana leaf and fried in coconut oil, with tapioca.`, pouredAs: `Pompano or tilapia in place of karimeen.` },
  },
}
