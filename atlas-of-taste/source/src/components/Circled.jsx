import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Hand-drawn ring around the last word plus an arrow, drawn on as it scrolls into view ("AND SO, SHE DID.").
export default function Circled({ lead, tail, circled }) {
  const wrap = useRef(null)
  useEffect(() => {
    const els = wrap.current.querySelectorAll('.stroke')
    els.forEach((p) => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }) })
    const t = gsap.to(els, { strokeDashoffset: 0, duration: 1, stagger: 0.4, ease: 'power2.inOut',
      scrollTrigger: { trigger: wrap.current, start: 'top 75%' } })
    return () => { t.scrollTrigger?.kill(); t.kill() }
  }, [])
  return (
    <p className="circled" ref={wrap}>
      <svg className="c-arrow" viewBox="0 0 40 34" aria-hidden><path className="stroke" d="M3 3 C 10 14, 18 22, 33 28 M33 28 L 24 27 M33 28 L 29 20" /></svg>
      {lead.map((l) => <span key={l} className="c-line">{l}</span>)}
      <span className="c-line">{tail} <span className="c-ring-wrap">{circled}
        <svg className="c-ring" viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden>
          <path className="stroke" d="M 60 4 C 24 3, 4 14, 6 27 C 8 41, 38 48, 66 46 C 98 44, 118 34, 114 21 C 110 9, 84 4, 50 6" />
        </svg>
      </span></span>
    </p>
  )
}
