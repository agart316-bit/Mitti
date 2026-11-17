import Header from './Header.jsx'
import Letters from './Letters.jsx'
import { states } from '../data/states.js'

// Placeholder for a state whose page is not built yet. Same header, same type, same grid.
export default function Stub({ state, base }) {
  const next = states[state.stop] // the array is in route order, so index = stop number
  return (
    <div className="page">
      <section className="hero stub">
        <Header base={base} current={state.slug} />
        <h1 className="hero-title"><span className="row">{state.name.toLowerCase()}</span></h1>
        <p className="cap soft stub-note">Stop {String(state.stop).padStart(2, '0')} of 12. This page is coming soon.</p>
        {next && <a className="next stub-next" href={`${base}${next.slug}/index.html`}><span className="cap soft">Next stop {String(next.stop).padStart(2, '0')}</span><span className="next-name">{next.name.toLowerCase()}</span></a>}
      </section>
    </div>
  )
}
