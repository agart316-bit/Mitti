import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Ph from './Ph.jsx'
import logo from '../assets/logo.png'
import { states } from '../data/states.js'
import { detailed } from '../data/pages.js'
import { viewBox, stateShapes, outline } from '../data/india-map.js'

const pad = (n) => String(n).padStart(2, '0')
// Which shape in the map file belongs to which state page.
const SHAPE = { goa: 'ga', karnataka: 'ka', kerala: 'kl', 'west-bengal': 'wb', bihar: 'br', sikkim: 'sk', assam: 'as',
  'uttar-pradesh': 'up', uttarakhand: 'ut', 'madhya-pradesh': 'mp', rajasthan: 'rj', gujarat: 'gj' }
const GROUND = '#5E1B3C' // Goa plum

export default function Home({ base }) {
  const [hover, setHover] = useState(null)
  useEffect(() => {
    const prev = [document.body.style.background, document.documentElement.style.background]
    document.body.style.background = GROUND; document.documentElement.style.background = GROUND
    return () => { document.body.style.background = prev[0]; document.documentElement.style.background = prev[1] }
  }, [])

  // Everything the hover panel shows comes from the state data files, so it never drifts from the state pages.
  const rows = states.map((s) => {
    const d = detailed[s.slug]
    return { ...s, shape: stateShapes[SHAPE[s.slug]], script: d.arrival.script, lang: d.arrival.lang, dry: d.dry,
      drink: d.order.drink.name, zeroProof: d.dry ? `dry state, so the main glass is zero-proof` : d.order.zeroProof?.name, chakhna: d.order.chakhna.name }
  })
  const act = rows.find((r) => r.slug === hover)

  return (
    <div className="page home-page">
      <section className="hm-hero">
        <Header base={base} dark />
        <p className="cap soft hm-eyebrow">a saying told across north india</p>
        <h1 className="hm-quote">kos kos par badle paani, chaar kos par baani.</h1>
        <div className="hm-sub">
          <p className="deva hm-deva" lang="hi">कोस कोस पर बदले पानी, चार कोस पर बानी</p>
          <div>
            <p className="hm-trans">every few miles the water changes. a little further, so does the language.</p>
            <p className="cap soft">a kos is an old measure of distance, about three kilometres. mitti is a bar that travels india one state, one drink and one small plate at a time.</p>
          </div>
        </div>
      </section>

      <section className="hm-map" id="map">
        <p className="cap soft">the route / twelve stops</p>
        <h2 className="hm-h2">one loop around india.</h2>
        <div className="hm-info" aria-live="polite">
          {act ? (
            <>
              <p className="cap soft">stop {pad(act.stop)} / 12 &middot; {act.name}</p>
              <p className="deva hm-script" lang={act.lang}>{act.script}</p>
              <dl className="hm-facts">
                <div><dt className="cap soft">pours</dt><dd className="cap">{act.drink}</dd></div>
                <div><dt className="cap soft">zero-proof</dt><dd className="cap">{act.zeroProof}</dd></div>
                <div><dt className="cap soft">with</dt><dd className="cap">{act.chakhna}</dd></div>
              </dl>
            </>
          ) : (
            <>
              <p className="hm-prompt">hover a state to start.</p>
              <p className="cap soft hm-promptsub">each state pours one drink with one small plate. dry states pour zero-proof, and the menu says why.</p>
            </>
          )}
        </div>
        <svg className={`hm-svg${hover ? ' has-hover' : ''}`} viewBox={viewBox} role="group" aria-label="Map of India with the twelve mitti states">
          <g>
            {outline.map((o) => <path key={o.id} d={o.d} className="hm-ot" />)}
            {rows.map((r) => (
              <a key={r.slug} href={`${base}${r.slug}/index.html`} aria-label={`${r.name}, stop ${pad(r.stop)}`}
                className={`hm-st${hover === r.slug ? ' on' : ''}`}
                onMouseEnter={() => setHover(r.slug)} onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.slug)} onBlur={() => setHover(null)}>
                <path d={r.shape} />
              </a>
            ))}
          </g>
        </svg>
      </section>

      <section className="hm-room" id="about">
        <div className="hm-room-head">
          <h2 className="hm-h2">the room.</h2>
          <p className="cap soft">photography of the bar goes here. each slot is a placeholder: pass a <code>src</code> to swap in the real photo.</p>
        </div>
        <div className="hm-photos">
          <Ph className="hm-p1" tone="wine" label="Photo 01: the bar, from the door" />
          <Ph className="hm-p2" tone="berry" label="Photo 02: the back shelf" />
          <Ph className="hm-p3" tone="blush" label="Photo 03: a glass, close" />
          <Ph className="hm-p4" tone="wine" label="Photo 04: the room, full" />
          <Ph className="hm-p5" tone="berry" label="Photo 05: the chakhna" />
        </div>
      </section>

      <footer className="hm-foot">
        <a className="hm-foot-logo" href="./index.html"><img src={logo} alt="" /><span>mitti</span></a>
        <nav className="cap">
          <a href="#map">map</a>
          <a href={`${base}mix/index.html`}>mix a glass</a>
          <a href={`${base}visit/index.html`}>plan a visit</a>
          <a href={`${base}passport/index.html`}>passport</a>
        </nav>
      </footer>
    </div>
  )
}
