import { states } from '../data/states.js'

// The one moving ornament: the twelve stops scrolling between two hairlines. Decorative, so hidden from screen readers.
export default function Marquee({ items = states.map((s) => s.name.toLowerCase()) }) {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">{row.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  )
}
