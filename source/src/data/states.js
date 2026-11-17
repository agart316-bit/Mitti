// All 12 stops in route order. Used by the header dropdown, the next-stop link and the build script.
// `script` is the state's name in its own script (filled in as each page is built).
export const states = [
  { slug: 'goa',           stop: 1,  name: 'Goa' },
  { slug: 'karnataka',     stop: 2,  name: 'Karnataka' },
  { slug: 'kerala',        stop: 3,  name: 'Kerala' },
  { slug: 'west-bengal',   stop: 4,  name: 'West Bengal' },
  { slug: 'bihar',         stop: 5,  name: 'Bihar' },
  { slug: 'sikkim',        stop: 6,  name: 'Sikkim' },
  { slug: 'assam',         stop: 7,  name: 'Assam' },
  { slug: 'uttar-pradesh', stop: 8,  name: 'Uttar Pradesh' },
  { slug: 'uttarakhand',   stop: 9,  name: 'Uttarakhand' },
  { slug: 'madhya-pradesh',stop: 10, name: 'Madhya Pradesh' },
  { slug: 'rajasthan',     stop: 11, name: 'Rajasthan' },
  { slug: 'gujarat',       stop: 12, name: 'Gujarat' },
]
export const bySlug = Object.fromEntries(states.map((s) => [s.slug, s]))
