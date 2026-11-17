import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Letters from './Letters.jsx'
gsap.registerPlugin(ScrollTrigger)

// Two-line caps title that starts bent along an arc and settles flat as you scroll ("STEPH WILSON").
export default function ArcTitle({ lines, trigger }) {
  const root = useRef(null)
  useEffect(() => {
    const rows = [...root.current.querySelectorAll('.arc-row')].map((r) => [...r.querySelectorAll('.ch')])
    const bend = (p) => rows.forEach((chs, r) => chs.forEach((el, i) => {
      const n = Math.max(chs.length - 1, 1), t = i / n
      if (r === 0) gsap.set(el, { rotation: -26 * p * (1 - t), y: 34 * p * (1 - t) * (1 - t), x: -10 * p * (1 - t) })      // line 1 climbs up to the right
      else gsap.set(el, { rotation: 50 * p * t * t, y: -16 * p * Math.sin(Math.PI * t * 0.9), x: 16 * p * t })               // line 2 rises and tips over
    }))
    bend(1)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      // Starts bending flat as the title enters, and is fully flat once the photo it sits on (`trigger`) is wholly on screen.
      const o = { p: 1 }
      gsap.to(o, { p: 0, ease: 'none', onUpdate: () => bend(o.p),
        scrollTrigger: { trigger: root.current, start: 'top bottom', endTrigger: trigger?.current || root.current, end: 'bottom bottom', scrub: 0.4 } })
    })
    mm.add('(max-width: 899px)', () => bend(0))
    return () => mm.revert()
  }, [trigger])
  return (
    <div className="arc-title" ref={root} aria-label={lines.join(' ')}>
      {lines.map((l) => <div key={l} className="arc-row"><Letters text={l.toLowerCase()} /></div>)}
    </div>
  )
}
