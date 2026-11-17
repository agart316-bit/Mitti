import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Letters from './Letters.jsx'
import { states } from '../data/states.js'
import { detailed } from '../data/pages.js'
gsap.registerPlugin(ScrollTrigger)

const R = 520 // disc radius in design px; the wheel is drawn at 1040 and scaled to fit
const MAX = 2
// English gloss shown under each tadka on the wheel.
const TR = {
  'Phalap': 'smoked Singpho tea',
  'Outenga, elephant apple': 'sour elephant apple',
  'Shahi litchi': 'royal lychee',
  'Magahi paan': 'betel leaf',
  'Goan sea salt': 'a pinch of salt',
  'Lemon sliver': 'thin lemon slice',
  'Roasted jeeru': 'roasted cumin',
  'Hing vaghar': 'asafoetida in ghee',
  'Coorg coffee': 'roasted coffee beans',
  'Fresh ginger': 'ginger coin',
  'Curry leaf': 'bruised curry leaf',
  'Malabar black pepper': 'cracked black pepper',
  'Chironji': 'charoli seeds',
  'Khus': 'vetiver syrup',
  'Pushkar rose': 'rose petal',
  'Ker': 'desert caper berry',
  'Large cardamom': 'black cardamom pod',
  'Timur': 'Himalayan pepper',
  'Kewra jal': 'screwpine water',
  'Chandi vark': 'edible silver leaf',
  'Malta peel': 'hill orange peel',
  'Jakhiya': 'wild mustard seed',
  'Gondhoraj lebu': 'fragrant Bengal lime',
  'Nolen gur': 'date palm jaggery',
}
const pad = (n) => String(n).padStart(2, '0')
const short = (t) => t.split(',')[0]
const polar = (r, a) => [R + r * Math.sin((a * Math.PI) / 180), R - r * Math.cos((a * Math.PI) / 180)]
// Ring rotation that puts item i under the marker at 12 o'clock, and the item currently there.
const angleFor = (i, n) => -((i + 0.5) * 360) / n
const idxAt = (theta, n) => { const k = Math.round(-theta / (360 / n) - 0.5); return ((k % n) + n) % n }
const snap = (theta, n) => { const s = 360 / n; return -(Math.round(-theta / s - 0.5) + 0.5) * s }

// Line-art glasses, one per shape used in the state data.
const GLASS = {
  coupe: <><path d="M8 10h44c0 16-9 26-22 26S8 26 8 10z" /><path d="M30 36v28M18 66h24" /></>,
  wine: <><path d="M14 6h32c2 20-6 34-16 34S12 26 14 6z" /><path d="M30 40v26M18 68h24" /></>,
  tumbler: <><path d="M12 12h36l-4 54H16z" /><path d="M14 30h32" /></>,
  tall: <><path d="M18 4h24l-3 64H21z" /><path d="M20 24h20" /></>,
}

export default function Mix({ base }) {
  const root = useRef(null)
  const disc = useRef(null)
  const ringEl = useRef({ o: null, i: null })
  const rot = useRef({ o: 0, i: 0 })
  const tween = useRef({ o: null, i: null })
  const drag = useRef(null)
  const [glass, setGlass] = useState(0)    // glass at the marker (the chosen glass)
  const [focus, setFocus] = useState(0)    // tadka at the marker
  const [picked, setPicked] = useState([]) // chosen tadkas (indexes)
  const [saved, setSaved] = useState(false)
  const [k, setK] = useState(1)

  // 22 glasses: every state's main drink, plus its zero-proof where there is one. Dry states pour their zero-proof as the main drink.
  const glasses = useMemo(() => states.flatMap((st) => {
    const d = detailed[st.slug], o = d.order
    const out = [{ slug: st.slug, state: st.name, stop: st.stop, name: o.drink.name, zp: !!d.dry, shape: d.glass || 'tumbler' }]
    if (o.zeroProof) out.push({ slug: st.slug, state: st.name, stop: st.stop, name: o.zeroProof.name, zp: true, shape: d.glass || 'tumbler' })
    return out
  }), [])
  const tadkas = useMemo(() => states.flatMap((st) => detailed[st.slug].order.tadkas.map((t) => ({ slug: st.slug, stop: st.stop, name: t.name }))), [])
  const N = { o: glasses.length, i: tadkas.length }
  const g = glasses[glass], gn = short(g.name)
  const chosen = picked.map((i) => tadkas[i])
  const ft = tadkas[focus], ftOn = picked.includes(focus)

  useEffect(() => {
    const fit = () => setK(Math.min(1, (window.innerWidth * (window.innerWidth < 900 ? 0.96 : 0.86)) / 1040))
    fit(); window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  // Apply a rotation to one ring and keep the glass / tadka at the marker in step with it.
  const setRot = (w, theta) => {
    rot.current[w] = theta
    gsap.set(ringEl.current[w], { rotation: theta })
    const idx = idxAt(theta, N[w])
    if (w === 'o') setGlass((c) => { if (c !== idx) setSaved(false); return idx })
    else setFocus(idx)
  }
  // Glide a ring to a target angle; the proxy drives setRot so the centre updates while it moves.
  const glide = (w, target, ease = 'back.out(1.3)', dur) => {
    tween.current[w] && tween.current[w].kill()
    const p = { v: rot.current[w] }
    const d = dur || Math.min(1.5, Math.max(0.55, 0.45 + Math.abs(target - p.v) / 360))
    tween.current[w] = gsap.to(p, { v: target, duration: d, ease, onUpdate: () => setRot(w, p.v) })
  }
  // Nearest way round to bring item i under the marker.
  const spinTo = (w, i, ease) => {
    const base = angleFor(i, N[w]), cur = rot.current[w]
    glide(w, base + 360 * Math.round((cur - base) / 360), ease)
  }
  const step = (w, dir) => glide(w, snap(rot.current[w], N[w]) - dir * (360 / N[w]), 'back.out(1.6)', 0.5)
  const toggleTadka = (i) => {
    setSaved(false)
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.length < MAX ? [...p, i] : p))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chs = gsap.utils.toArray('.mx-title .ch'), n = chs.length, W = window.innerWidth
      const tl = gsap.timeline()
      tl.from('.hdr', { opacity: 0, duration: 1 }, 0.2)
        .from('.mx-sub, .mx-count', { opacity: 0, y: 14, duration: 1, stagger: 0.12, ease: 'power2.out' }, 0.9)
      chs.forEach((el, i) => {
        const u = i / (n - 1) - 0.5
        tl.from(el, { x: u * W * 0.85, y: 320 * (4 * u * u) - 150, rotation: u * 130, opacity: 0, duration: 1.8, ease: 'expo.out' }, 0.15 + i * 0.035)
      })
      gsap.utils.toArray('.fade').forEach((el) =>
        gsap.fromTo(el, { opacity: 0.12 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 60%', scrub: true } }))
    }, root)
    // The rings arrive spinning in opposite directions and settle on the first glass and tadka.
    gsap.set(ringEl.current.o, { rotation: angleFor(0, N.o) - 200 })
    gsap.set(ringEl.current.i, { rotation: angleFor(0, N.i) + 260 })
    rot.current = { o: angleFor(0, N.o) - 200, i: angleFor(0, N.i) + 260 }
    const t1 = setTimeout(() => { glide('o', angleFor(0, N.o), 'expo.out', 2.6); glide('i', angleFor(0, N.i), 'expo.out', 3) }, 350)
    return () => { clearTimeout(t1); ctx.revert(); tween.current.o && tween.current.o.kill(); tween.current.i && tween.current.i.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Drag: grab the outer band to spin glasses, the inner band to spin tadkas. Let go and it coasts, then snaps to the nearest item.
  const polarOf = (e) => {
    const r = disc.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2)
    return { ang: (Math.atan2(dy, dx) * 180) / Math.PI, rad: (Math.hypot(dx, dy) / (r.width / 2)) * R }
  }
  const onDown = (e) => {
    if (e.button > 0) return
    const { ang, rad } = polarOf(e)
    const w = rad > 400 && rad <= R ? 'o' : rad > 250 && rad <= 400 ? 'i' : null
    if (!w) return
    tween.current[w] && tween.current[w].kill()
    drag.current = { w, last: ang, x: e.clientX, y: e.clientY, moved: false, s: [] }
    disc.current.classList.add('drag')
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }
  const onMove = (e) => {
    const d = drag.current; if (!d) return
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) d.moved = true
    if (!d.moved) return
    const { ang } = polarOf(e)
    let delta = ang - d.last; if (delta > 180) delta -= 360; if (delta < -180) delta += 360
    d.last = ang
    const now = performance.now(); d.s.push({ t: now, v: delta }); d.s = d.s.filter((x) => now - x.t < 110)
    setRot(d.w, rot.current[d.w] + delta)
  }
  const onUp = (e) => {
    const d = drag.current; drag.current = null
    window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onUp)
    disc.current && disc.current.classList.remove('drag')
    if (!d) return
    if (!d.moved) { // a tap: spin to that label, or toggle it when it is already under the marker
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const lab = el && el.closest && el.closest('.mx-lab')
      if (lab) activate(lab.dataset.ring, +lab.dataset.i)
      return
    }
    const dt = d.s.length > 1 ? d.s[d.s.length - 1].t - d.s[0].t : 0
    const vel = dt > 8 ? d.s.reduce((a, x) => a + x.v, 0) / Math.max(dt, 16) : 0 // deg per ms
    glide(d.w, snap(rot.current[d.w] + vel * 260, N[d.w]), 'power3.out')
  }
  const activate = (w, i) => {
    if (w === 'o') { spinTo('o', i); return }
    if (i === idxAt(rot.current.i, N.i)) toggleTadka(i); else spinTo('i', i)
  }
  const onKey = (e) => {
    if (e.target !== disc.current) return
    const map = { ArrowRight: ['o', 1], ArrowLeft: ['o', -1], ArrowDown: ['i', 1], ArrowUp: ['i', -1] }
    if (map[e.key]) { e.preventDefault(); step(...map[e.key]) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTadka(focus) }
  }

  const save = () => {
    try {
      const all = JSON.parse(localStorage.getItem('mitti-passport') || '[]')
      all.push({ glass: g.name, state: g.state, tadkas: chosen.map((t) => t.name), at: Date.now() })
      localStorage.setItem('mitti-passport', JSON.stringify(all))
    } catch (e) { /* storage can be blocked; the button still confirms */ }
    setSaved(true)
  }

  const ring = (w, items, r, wd, rotOff, isOn, isFocus, dim, render) => (
    <div className="mx-ring" ref={(el) => { ringEl.current[w] = el }}>
      {items.map((it, i) => {
        const a = ((i + 0.5) / items.length) * 360
        const [x, y] = polar(r, a)
        const f = isFocus(i)
        return (
          <button key={i} type="button" data-ring={w} data-i={i} tabIndex={-1}
            className={`mx-lab${isOn(i) ? ' on' : ''}${f ? ' focus' : ''}${dim(i) ? ' dim' : ''}`}
            style={{ left: x, top: y, width: wd, transform: `translate(-50%,-50%) rotate(${a + rotOff}deg)${f ? ' scale(1.12)' : ''}`, animationDelay: `${(0.6 + i * 0.02).toFixed(2)}s` }}
            onClick={(e) => { if (e.detail === 0) activate(w, i) }} aria-pressed={isOn(i)}><span className="in">{render(it)}</span></button>
        )
      })}
    </div>
  )

  return (
    <div ref={root} className="page mix-page">
      <section className="mx-hero">
        <Header base={base} active="mix" />
        <h1 className="mx-title" aria-label="mix a glass"><span className="row" aria-hidden><Letters text="mix a glass" /></span></h1>
        <p className="cap mx-sub">Spin the outer ring to pick a glass, the inner ring to add up to two tadkas.</p>
        <p className="cap mx-count">{gn}<span> · </span>{picked.length} of {MAX} tadkas</p>

        <div className="mx-stage" style={{ height: 1040 * k }}>
          <div ref={disc} className="mx-disc" style={{ transform: `translateX(-50%) scale(${k})` }} tabIndex={0} role="group"
            aria-label="Drag the outer ring to choose a glass and the inner ring to choose tadkas. Arrow left and right turn the glasses, up and down turn the tadkas, enter adds a tadka."
            onPointerDown={onDown} onKeyDown={onKey}>
            <svg viewBox="0 0 1040 1040" aria-hidden>
              <circle cx="520" cy="520" r="520" fill="#901f3d" />
              <circle cx="520" cy="520" r="400" fill="#4a0f14" />
              <circle cx="520" cy="520" r="250" fill="#2d0302" />
              <polygon points="513,2 527,2 520,14" fill="#f3e6d3" />
              <polygon points="513,104 527,104 520,116" fill="#f3e6d3" />
            </svg>
            {ring('o', glasses, 452, 118, 0, (i) => i === glass, (i) => i === glass, () => false, (it) => (
              <><span className="s">{it.state}</span><span className="n">{short(it.name)}</span>{it.zp && <span className="s">zero-proof</span>}</>
            ))}
            {ring('i', tadkas, 322, 132, -90, (i) => picked.includes(i), (i) => i === focus, (i) => picked.length >= MAX && !picked.includes(i) && i !== focus, (it) => (
              <><span className="n">{it.name}</span>{TR[it.name] && <span className="s">{TR[it.name]}</span>}</>
            ))}
            <div className="mx-centre">
              <p className="s">your glass</p>
              <svg viewBox="0 0 60 72" className="mx-glass" aria-hidden>{GLASS[g.shape] || GLASS.tumbler}</svg>
              <p className="mx-gname">{gn}</p>
              <p className="mx-tlist">{chosen.length ? chosen.map((t) => t.name).join(' + ') : 'No tadkas yet.'}</p>
              <button type="button" className="mx-add" disabled={!ftOn && picked.length >= MAX} onClick={() => toggleTadka(focus)}>
                {ftOn ? `remove ${ft.name}` : picked.length >= MAX ? 'two tadkas chosen' : `add ${ft.name}`}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-ctas">
          {saved
            ? <a className="btn-solid" href={`${base}passport/index.html`}>see it in your passport</a>
            : <button type="button" className="btn-solid" onClick={save}>save to passport</button>}
          <a className="btn-line" href={`${base}${g.slug}/index.html`}>read about {gn}</a>
        </div>
      </section>
      <Footer base={base} />
    </div>
  )
}
