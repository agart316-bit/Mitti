import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Letters from './Letters.jsx'
import logo from '../assets/logo.png'
import { states } from '../data/states.js'
import { detailed } from '../data/pages.js'
import { stampImg } from '../stampimgs.js'
import { loadStamps, loadPlaced, savePlaced, loadGlasses, saveGlasses, clearAll } from '../stamps.js'

const pad = (n) => String(n).padStart(2, '0')

// One entry per state, in route order. Ink and native script come from each state's page data.
const STATES = states.map((s) => {
  const d = detailed[s.slug] || {}
  return { id: s.slug, num: pad(s.stop), name: s.name, color: d.ink || '#901f3d', script: d.arrival?.script || '' }
})
const byId = (id) => STATES.find((s) => s.id === id)
const byName = (name) => STATES.find((s) => s.name === name)

// Script size inside the stamp, tuned per name so long scripts still fit.
const SSIZE = { goa: 27, karnataka: 21, kerala: 25, 'west-bengal': 16, bihar: 26, sikkim: 21, assam: 29, 'uttar-pradesh': 14, uttarakhand: 16, 'madhya-pradesh': 14, rajasthan: 20, gujarat: 24 }
// Page areas in the 1200 x 800 drawing, and where stamps land when placed with the keyboard.
const BOX = { l: { x0: 52, x1: 600, y0: 54, y1: 730 }, r: { x0: 600, x1: 1148, y0: 54, y1: 730 } }
const SLOTS = [[0.3, 0.3], [0.72, 0.3], [0.3, 0.72], [0.72, 0.72], [0.5, 0.5], [0.5, 0.85]]

// One designed stamp (a portrait image, about 0.43 wide for every 1 tall).
function StampImg({ s, className }) {
  return <img className={className} src={stampImg[s.id]} alt="" draggable="false" />
}

// One page of the open passport: guilloche rosette, running head, the twelve inks as a strip, folio and serial.
function PageArt({ side, folio }) {
  const L = side === 'l'
  const x0 = L ? 76 : 626, cx = L ? 325 : 875
  return (
    <g>
      <rect x={x0} y="78" width="498" height="626" fill="url(#pp-wave)" opacity="0.55" />
      <rect x={x0} y="78" width="498" height="626" fill="none" stroke="rgba(144,31,61,.38)" strokeWidth="1" />
      <rect x={x0 + 6} y="84" width="486" height="614" fill="none" stroke="rgba(144,31,61,.26)" strokeWidth="0.7" strokeDasharray="2 3" />
      <image href={logo} x={cx - 100} y="240" width="200" height="320" opacity="0.13" preserveAspectRatio="xMidYMid meet" />
      {L ? <text x="98" y="122" fontSize="34" fill="#901f3d" className="pp-head">mitti</text> : <text x="1102" y="122" textAnchor="end" fontSize="34" fill="#901f3d" className="pp-head">mitti</text>}
      {L ? <text x="552" y="112" textAnchor="end" fontSize="13" letterSpacing="3" fill="#2d0302">VISAS &amp; ENTRIES</text> : <text x="648" y="112" fontSize="13" letterSpacing="3" fill="#2d0302">VISAS &amp; ENTRIES</text>}
      <line x1={x0 + 22} y1="136" x2={x0 + 476} y2="136" stroke="#901f3d" strokeOpacity="0.45" strokeWidth="1" />
      <use href="#pp-inks" x={x0 + 22} y="650" />
      <text x={cx} y="722" textAnchor="middle" fontSize="13" letterSpacing="4" fill="#2d0302">{folio}</text>
      <text transform={L ? 'translate(66 392) rotate(-90)' : 'translate(1134 392) rotate(90)'} textAnchor="middle" fontSize="10" letterSpacing="3" fill="#2d0302" fillOpacity="0.6">N° 0011 2742</text>
    </g>
  )
}

const OFFS = [[7.8, 9], [6.5, 7.5], [5.2, 6], [3.9, 4.5], [2.6, 3], [1.3, 1.5]]

export default function Passport({ base }) {
  const root = useRef(null)
  const [stamps, setStamps] = useState({})
  const [placed, setPlaced] = useState({})
  const [glasses, setGlasses] = useState([])
  const [hand, setHand] = useState(null)
  const [seq, setSeq] = useState(0)

  // Read what this browser has saved. Done in an effect so the page renders first and never reads storage during build.
  useEffect(() => {
    const p = loadPlaced()
    setStamps(loadStamps()); setPlaced(p); setGlasses(loadGlasses())
    setSeq(Math.max(0, ...Object.values(p).map((v) => v.n || 0)))
  }, [])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from('.hdr', { opacity: 0, duration: 1 }, 0.2)
      if (reduce) { tl.from('.mx-title, .mx-sub, .mx-count', { opacity: 0, duration: 0.6 }, 0); return }
      tl.from('.pp-hero .mx-sub, .pp-hero .mx-count', { opacity: 0, y: 14, duration: 1, stagger: 0.12, ease: 'power2.out' }, 0.9)
      const chs = gsap.utils.toArray('.mx-title .ch'), n = chs.length, W = window.innerWidth
      chs.forEach((el, i) => {
        const u = i / (n - 1) - 0.5
        tl.from(el, { x: u * W * 0.85, y: 320 * (4 * u * u) - 150, rotation: u * 130, opacity: 0, duration: 1.8, ease: 'expo.out' }, 0.15 + i * 0.035)
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const earned = STATES.filter((s) => stamps[s.id])
  const count = earned.length
  const onPage = Object.keys(placed).filter((id) => stamps[id])

  const pickUp = (id) => {
    if (placed[id]) {
      const next = { ...placed }; delete next[id]
      setPlaced(next); savePlaced(next); setHand(id)
    } else setHand(hand === id ? null : id)
  }
  const press = (side, e) => {
    if (!hand) return
    const box = BOX[side]
    const rect = e.currentTarget.getBoundingClientRect()
    let x, y
    if (!e.detail || !rect.width) {
      const used = Object.values(placed).filter((p) => p.side === side).length
      const sl = SLOTS[used % SLOTS.length]
      x = box.x0 + sl[0] * (box.x1 - box.x0); y = box.y0 + sl[1] * (box.y1 - box.y0)
    } else {
      x = box.x0 + ((e.clientX - rect.left) / rect.width) * (box.x1 - box.x0)
      y = box.y0 + ((e.clientY - rect.top) / rect.height) * (box.y1 - box.y0)
    }
    const mx = 52, my = 116   // half the stamp's width and height in drawing units, so it stays on the page
    x = Math.max(box.x0 + mx, Math.min(box.x1 - mx, x)); y = Math.max(box.y0 + my, Math.min(box.y1 - my, y))
    const n = seq + 1
    const next = { ...placed, [hand]: { x, y, rot: (Math.random() * 2 - 1) * 16, side, n } }
    setPlaced(next); savePlaced(next); setHand(null); setSeq(n)
  }
  const liftAll = () => { setPlaced({}); savePlaced({}); setHand(null) }
  const removeGlass = (i) => { const next = glasses.filter((_, j) => j !== i); setGlasses(next); saveGlasses(next) }
  const clear = () => { clearAll(); setStamps({}); setPlaced({}); setGlasses([]); setHand(null); setSeq(0) }

  const hint = hand ? `press ${byId(hand).name} onto a page`
    : !count ? 'taste a state to earn your first stamp'
    : !onPage.length ? 'pick a stamp below, then press it onto a page'
    : `${onPage.length} of ${count} on the page. press one to move it`

  const placedList = useMemo(() => onPage.map((id) => ({ id, p: placed[id] })).sort((a, b) => a.p.n - b.p.n), [placed, stamps]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={root} className="page pp-page">
      {/* Filters and patterns used by the book and the stamps. Defined once, referenced by id. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
        <defs>
          <pattern id="pp-wave" width="40" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 Q10 -1 20 7 T40 7" fill="none" stroke="rgba(144,31,61,.2)" strokeWidth="0.7" /></pattern>
          <path id="pp-lp" d="M600 54H52V730H600Z" />
          <path id="pp-rp" d="M600 54H1148V730H600Z" />
          <g id="pp-rosette" fill="none" stroke="rgba(144,31,61,.28)" strokeWidth="0.7">
            {Array.from({ length: 18 }, (_, i) => <ellipse key={`a${i}`} rx="112" ry="38" transform={`rotate(${i * 10})`} />)}
            {Array.from({ length: 18 }, (_, i) => <ellipse key={`b${i}`} rx="66" ry="22" transform={`rotate(${5 + i * 10})`} />)}
            <circle r="112" /><circle r="30" />
          </g>
          <g id="pp-inks">
            {STATES.map((s, i) => <rect key={s.id} x={i * 37.83} y="0" width="37.9" height="6" fill={s.color} />)}
          </g>
          <filter id="pp-leather" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" result="n" /><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0  0 0 0 0 0.03  0 0 0 0.9 -0.3" result="g" /><feComposite in="g" in2="SourceGraphic" operator="in" /></filter>
          <filter id="pp-paper" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="2" result="n" /><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.25  0 0 0 0 0.3  0 0 0 0.5 -0.17" result="s" /><feComposite in="s" in2="SourceGraphic" operator="in" /></filter>
          <filter id="pp-ink" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" result="n" /><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  7 0 0 0 -1.2" result="holes" /><feComposite in="SourceGraphic" in2="holes" operator="in" result="speck" /><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="w" /><feDisplacementMap in="speck" in2="w" scale="2.4" xChannelSelector="R" yChannelSelector="G" /></filter>
        </defs>
      </svg>

      <section className="mx-hero pp-hero">
        <Header base={base} active="passport" />
        <h1 className="mx-title" aria-label="your passport"><span className="row" aria-hidden><Letters text="your passport" /></span></h1>
        <p className="cap mx-sub">One stamp for every state you taste.</p>
        <p className="cap mx-count" aria-live="polite">{hint}</p>
        {count === 0 && (
          <div className="pp-empty">
            <p>no stamps yet</p>
            <a className="btn-solid" href={`${base}goa/index.html`}>start at goa</a>
          </div>
        )}
      </section>

      <section className="band-dark pp-dark">
        <div className="pp-wrap pp-wrap-book">
          <div className="pp-book">
            <div className="pp-stage">
              <svg viewBox="0 0 1200 800" role="img" aria-label="An open mitti passport showing two visa pages">
                <rect x="32" y="34" width="1136" height="716" fill="#901f3d" />
                <rect x="32" y="34" width="1136" height="716" fill="#000" filter="url(#pp-leather)" />
                <rect x="46" y="48" width="1108" height="688" fill="none" stroke="#f3e6d3" strokeOpacity="0.28" strokeWidth="1" />
                <g>
                  {OFFS.map(([dx, dy], i) => <use key={`l${i}`} href="#pp-lp" transform={`translate(${-dx} ${dy})`} fill={i % 2 ? '#f4ece1' : '#eadccb'} stroke="rgba(45,3,2,.28)" strokeWidth="0.6" />)}
                  {OFFS.map(([dx, dy], i) => <use key={`r${i}`} href="#pp-rp" transform={`translate(${dx} ${dy})`} fill={i % 2 ? '#f4ece1' : '#eadccb'} stroke="rgba(45,3,2,.28)" strokeWidth="0.6" />)}
                  <use href="#pp-lp" fill="#f3e6d3" stroke="rgba(45,3,2,.4)" strokeWidth="0.8" />
                  <use href="#pp-rp" fill="#f3e6d3" stroke="rgba(45,3,2,.4)" strokeWidth="0.8" />
                  <use href="#pp-lp" fill="#fff" filter="url(#pp-paper)" />
                  <use href="#pp-rp" fill="#fff" filter="url(#pp-paper)" />
                </g>
                <g className="pp-mono"><PageArt side="l" folio="04" /><PageArt side="r" folio="05" /></g>
                <line x1="592" y1="54" x2="592" y2="730" stroke="#2d0302" strokeOpacity="0.12" strokeWidth="1" />
                <line x1="608" y1="54" x2="608" y2="730" stroke="#2d0302" strokeOpacity="0.12" strokeWidth="1" />
                <line x1="600" y1="54" x2="600" y2="730" stroke="#2d0302" strokeOpacity="0.4" strokeWidth="1.2" />
                <line x1="600" y1="64" x2="600" y2="720" stroke="#2d0302" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="14 12" strokeLinecap="round" />
              </svg>

              <button type="button" className="pp-pagehit" style={{ left: '4.3333%', top: '6.75%', width: '45.6667%', height: '84.5%' }} disabled={!hand} onClick={(e) => press('l', e)} aria-label="Press the selected stamp onto the left page" />
              <button type="button" className="pp-pagehit" style={{ left: '50%', top: '6.75%', width: '45.6667%', height: '84.5%' }} disabled={!hand} onClick={(e) => press('r', e)} aria-label="Press the selected stamp onto the right page" />

              {placedList.map(({ id, p }) => {
                const s = byId(id)
                return (
                  <button type="button" key={id} className="pp-stampbtn" onClick={() => pickUp(id)}
                    aria-label={`${s.name} stamp on the page. Press to pick it up and move it.`}
                    style={{ left: `${(p.x / 12).toFixed(3)}%`, top: `${(p.y / 8).toFixed(3)}%`, zIndex: 3 + p.n, transform: `translate(-50%,-50%) rotate(${p.rot.toFixed(1)}deg)`, pointerEvents: hand ? 'none' : 'auto' }}>
                    <StampImg s={s} className="pp-stampin" />
                  </button>
                )
              })}
            </div>
          </div>
          <div className="pp-tray">
            {STATES.map((s) => {
              const on = !!stamps[s.id], here = !!placed[s.id], inHand = hand === s.id
              return on ? (
                <button type="button" key={s.id} className={`pp-cell${inHand ? ' in' : ''}${here ? ' on' : ''}`} title={s.name} aria-pressed={inHand} onClick={() => pickUp(s.id)}
                  aria-label={inHand ? `${s.name} stamp, in hand. Press a page to place it.` : here ? `${s.name} stamp, on the page. Press to pick it up.` : `${s.name} stamp. Press to pick it up, then press a page to place it.`}>
                  <span className="st"><StampImg s={s} /></span>
                  <span>{s.num}</span>
                </button>
              ) : (
                <a key={s.id} className="pp-cell lock" href={`${base}${s.id}/index.html`} title={s.name} aria-label={`${s.name}, not yet tasted. Open the ${s.name} page.`}>
                  <svg className="st" viewBox="0 0 60 140" aria-hidden>
                    <rect x="2" y="2" width="56" height="136" rx="3" fill="none" stroke="#2d0302" strokeOpacity="0.6" strokeWidth="1.4" strokeDasharray="4 5" />
                    <text transform="translate(37 70) rotate(-90)" textAnchor="middle" fontSize={Math.min(SSIZE[s.id] || 20, 24)} fill="#6e5a55" lang="und" className="pp-scr">{s.script}</text>
                  </svg>
                  <span>{s.num}</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pp-glass-sec">
        <div className="pp-wrap">
          <p className="eyebrow">The glasses</p>
          <div className="pp-h2row">
            <h2 className="pp-h2">glasses you mixed</h2>
            <a className="btn-line pp-mixmore" href={`${base}mix/index.html`}>mix another</a>
          </div>
          <div className="pp-glasses">
            {glasses.length === 0 && <p className="pp-none">No glasses saved yet. <a href={`${base}mix/index.html`}>Mix one</a>.</p>}
            <ul>
              {glasses.map((g, i) => {
                const st = byName(g.state)
                return (
                  <li key={`${g.glass}-${g.at}-${i}`}>
                    <div>
                      <p className="pp-gname">{g.glass}</p>
                      <p>{g.tadkas && g.tadkas.length ? `with ${g.tadkas.join(' and ')}` : 'no tadkas'}</p>
                    </div>
                    <button type="button" className="btn-line no-arrow" onClick={() => removeGlass(i)} aria-label={`Remove ${g.glass}`}>remove</button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="pp-clear">
            <button type="button" className="btn-line no-arrow" onClick={clear}>clear passport</button>
            <p>Clearing removes your stamps, saved glasses and reservation from this device.</p>
          </div>
        </div>
      </section>

      <Footer base={base} />
    </div>
  )
}
