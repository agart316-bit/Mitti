import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Ph from './Ph.jsx'
import Header from './Header.jsx'
import { states } from '../data/states.js'
import Letters from './Letters.jsx'
import ArcTitle from './ArcTitle.jsx'
import Circled from './Circled.jsx'
import { stampImg } from '../stampimgs.js'
import { glassImg } from '../glassimgs.js'
gsap.registerPlugin(ScrollTrigger)

// Footnote numbers in the story text point at sources that are not shown on the page. Flip to true to show them.
const SHOW_FOOTNOTES = false

const pad = (n) => String(n).padStart(2, '0')

export default function StatePage({ state: s, base }) {
  const root = useRef(null), ingImg = useRef(null)
  const orderRef = useRef(null)

  // The order block lays its columns out absolutely, so its height can't follow the copy by itself.
  // Measure the lowest column and stretch the block to fit (never shorter than the 94vh design height), so no text is cut off.
  useEffect(() => {
    const sec = orderRef.current
    if (!sec) return
    const fit = () => {
      sec.style.minHeight = ''
      if (window.innerWidth < 900) return // phone/tablet layout is flat and already grows with its content
      let bottom = 0
      sec.querySelectorAll('.o-col').forEach((c) => { bottom = Math.max(bottom, c.offsetTop + c.offsetHeight) })
      const need = Math.ceil(bottom + window.innerHeight * 0.08) // breathing room under the last line
      if (need > sec.offsetHeight) sec.style.minHeight = need + 'px'
    }
    fit()
    const ro = new ResizeObserver(fit)
    sec.querySelectorAll('.o-col').forEach((c) => ro.observe(c))
    window.addEventListener('resize', fit)
    document.fonts?.ready.then(fit)
    return () => { ro.disconnect(); window.removeEventListener('resize', fit) }
  }, [s.slug])
  const prev = states[s.stop - 2] || states[states.length - 1] // the first stop loops back to the last
  const next = states[s.stop] || states[0] // registry is in route order, so index = stop number; the last stop loops to the first
  const a = s.arrival, ing = s.ingredient, st = s.story, o = s.order
  const I = s.images || {}                                         // real photos by slot name (h1, h2, h3, tile, t1, t2, big, story); missing = placeholder
  const rot = (arr, k) => arr[(k + s.stop - 1) % arr.length]     // rotate placeholder tones so pages differ
  // Placeholder photo captions. Override any of them in the state's data file with `photos: { h1: '...' }`.
  const P = { h1: `Photo: ${a.english} landscape`, h2: `Illustration: ${ing.title[1].toLowerCase()}`, h3: `Photo: ${o.drink.name}`, tile: `Photo: ${o.chakhna.name}`,
    t1: `Photo: ${ing.title[1].toLowerCase()}, close up`, t2: `Photo: ${ing.title[0]}`, big: `Photo: ${ing.title[1].toLowerCase()}, ${a.english}`, story: `Photo: ${o.drink.name}`, ...(s.photos || {}) }
  // Title is the state name, one word per line, sized so the longest word fits the space between the collage and the text.
  const words = a.english.split(' '), longest = Math.max(...words.map((w) => w.length))
  const titleSize = Math.min(13, 38 / (0.55 * longest))
  const nameLang = a.lang || 'en'

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // 1. Intro: title letters arrive along a wide arc and settle; the collage fades up behind them.
      const chs = gsap.utils.toArray('.hero-title .ch'), n = chs.length
      const W = window.innerWidth
      const tl = gsap.timeline()
      tl.from('.hdr, .vert', { opacity: 0, duration: 1 }, 0.2)
        .from('.hero .img', { opacity: 0, scale: 1.04, duration: 1.4, stagger: 0.15, ease: 'power2.out' }, 0)
        .from('.hero .txt', { opacity: 0, y: 14, duration: 1, stagger: 0.12, ease: 'power2.out' }, 0.9)
      chs.forEach((el, i) => {
        const u = i / (n - 1) - 0.5
        tl.from(el, { x: u * W * 0.85, y: 320 * (4 * u * u) - 150, rotation: u * 130, opacity: 0, duration: 1.8, ease: 'expo.out' }, 0.15 + i * 0.035)
      })

      mm.add('(min-width: 900px)', () => {
        // 2. Columns drift at different speeds as the hero scrolls away.
        const drift = { '.hero .i1': -60, '.hero .i2': -150, '.hero .i3': -110, '.hero .hero-title': -80, '.hero .lead': -130, '.hero .soft': -160, '.hero .tile': -260 }
        Object.entries(drift).forEach(([sel, y]) => gsap.to(sel, { y, ease: 'none',
          scrollTrigger: { trigger: '#arrival', start: 'top top', end: 'bottom top', scrub: 0.7 } }))
        gsap.to('.hero-fade', { opacity: 0.08, ease: 'none', scrollTrigger: { trigger: '#arrival', start: '55% top', end: 'bottom 20%', scrub: true } })
        gsap.utils.toArray('[data-shift]').forEach((el) => {
          const d = parseFloat(el.dataset.shift)
          gsap.fromTo(el, { y: d }, { y: -d, ease: 'none',
            scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
        })
      })
      // 3. Big photos wake up from a washed-out state as they arrive.
      gsap.utils.toArray('.wake').forEach((el) =>
        gsap.fromTo(el, { opacity: 0.18, filter: 'grayscale(1) contrast(.8)' }, { opacity: 1, filter: 'grayscale(0) contrast(1)', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true } }))
      gsap.utils.toArray('.fade').forEach((el) =>
        gsap.fromTo(el, { opacity: 0.12 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 60%', scrub: true } }))
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className={`page${s.flip ? ' flip' : ''}`} style={{ '--ink': s.ink, }}>
      {/* ---------- 1. ARRIVAL ---------- */}
      <section id="arrival" className="hero">
        <Header base={base} current={s.slug} />
        <p className="vert">Stop {pad(s.stop)} of {s.total} · {a.english}</p>

        <div className="hero-fade">
          <Ph tone={rot(['sand', 'rose', 'mono'], 0)} label={P.h1} src={I.h1}  className="img i1" />
          <Ph tone={rot(['sand', 'rose', 'mono'], 1)} label={P.h2} src={I.h2}  className="img i2" />
          <Ph tone={rot(['sand', 'rose', 'mono'], 2)} label={P.h3} src={I.h3}  className="img i3" />
          <h1 className="hero-title" style={{ fontSize: `min(${titleSize}vw, ${(30 / (1.05 * words.length)).toFixed(1)}vh)`, '--tl': longest }}>
            {words.map((w) => <span className="row" key={w}><Letters text={w.toLowerCase()} /></span>)}
          </h1>
          <div className="txt entry">
            <div className="entry-head">
              <div>
                <div className="headword">{a.english.toLowerCase()}</div>
                <div className="pron">/{a.pron}/</div>
              </div>
            </div>
            <p className="def">
              <mark>{a.english}</mark> is stop {pad(s.stop)} of {s.total}. In {a.nativeLang} it is <mark lang={nameLang} className="deva">{a.script}</mark>
              {a.script2 && <> and, in Urdu, <mark lang="ur" className="deva">{a.script2}</mark></>}
              {a.nativeRespelling && <> ({a.nativeRespelling})</>}. {a.langSentence}{s.dryNote && <> {s.dryNote}</>}
            </p>
            <h3 className="entry-sub">Greeting</h3>
            <ul>
              <li>
                <mark lang={a.greeting.lang || nameLang} className={a.greeting.roman ? undefined : 'deva'}>{a.greeting.script}</mark>{a.greeting.script2 && <> <mark lang="ur" className="deva">{a.greeting.script2}</mark></>} ({a.greeting.translit}): {a.greeting.meaning}
              </li>
            </ul>
          </div>
          <Ph tone={rot(['sand', 'rose', 'mono'], 3)} label={P.tile} src={I.tile}  className="img tile" />
          {stampImg[s.slug] && <img className="tile-stamp" src={stampImg[s.slug]} alt={`${a.english} stamp`} />}
        </div>
      </section>

      {/* ---------- 2. INGREDIENT ---------- */}
      <section id="ingredient" className="scene ingredient">
        <div className="col-l">
          <div className="col-text">
            <p className="cap soft eyebrow fade">Ingredient</p>
            <p className="cap lead fade">{ing.body}</p>
            <p className="cap soft fade">{ing.season}</p>
          </div>
          <div className="col-thumbs">
            <Ph tone={rot(['sand', 'rose', 'mono'], 0)} label={P.t1} src={I.t1}  className="thumb ing-t1" />
            <Ph tone={rot(['rose', 'mono', 'sand'], 1)} label={P.t2} src={I.t2}  className="thumb ing-t2" />
          </div>
        </div>
        <div className="bigimg wake" ref={ingImg}>
          <Ph tone={rot(['dark', 'mono'], 0)} label={P.big} src={I.big}  className="fill" />
          <ArcTitle lines={ing.title} trigger={ingImg} />
        </div>
      </section>

      {/* ---------- 3. STORY ---------- */}
      <section id="story" className="scene story">
        <Circled lead={st.lead} tail={st.tail} circled={st.circled} />
        <div className="col-l">
          <div className="col-text"><p className="cap soft eyebrow fade">Story</p>
          <p className="cap lead fade story-p">{st.parts.map(([t, fn], i) => <span key={i}>{t}{SHOW_FOOTNOTES && fn && <sup>{fn}</sup>}</span>)}</p></div>
        </div>
        <div className="bigimg wake wide" style={s.storyTop || s.storyH ? { top: s.storyTop, height: s.storyH } : undefined}>
          <Ph tone={rot(['mono', 'dark', 'sand'], 0)} label={P.story} src={I.story} focus={s.storyFocus} className="fill" />
        </div>
      </section>

      {/* ---------- 4. ORDER ---------- */}
      <section id="order" ref={orderRef} className={`scene order${s.dry ? ' dry' : ''}`}>
        <h2 className="hero-title o-title"><span className="row">the</span><span className="row">order</span></h2>

        {/* Cocktail illustration: one drawn glass per state (src/assets/glasses). */}
        <figure className="cocktail">
          <img src={glassImg[s.slug]} alt={`${o.drink.name}, illustrated`} width="600" height="800" />
          <figcaption className="cocktail-name">{o.drink.name}</figcaption>
        </figure>

        <div className="o-col oc1">
          <p className="cap soft eyebrow">{s.dry ? 'The drink, zero-proof' : 'The drink'}</p>
          <p className="o-name">{o.drink.name}</p>
          {o.drink.strength && <p className="cap soft">{o.drink.strength}</p>}
          <p className="cap soft"><b>Poured here as:</b> {o.drink.pouredAs}</p>
        </div>
        {!s.dry && (
          <div className="o-col oc2">
            <p className="cap soft eyebrow">Zero-proof</p>
            <p className="o-name">{o.zeroProof.name}</p>
            <p className="cap soft">{o.zeroProof.body}</p>
          </div>
        )}
        <div className="o-col oc3">
          <p className="cap soft eyebrow">Two tadkas</p>
          {o.tadkas.map((t) => <div key={t.name}><p className="o-name sm">{t.name}</p><p className="cap soft">{t.body}</p></div>)}
          <p className="cap soft">Either one finishes either glass.</p>
        </div>
        <div className="o-col oc4">
          <p className="cap soft eyebrow">Chakhna</p>
          <p className="o-name">{o.chakhna.name}</p>
          <p className="cap soft">{o.chakhna.body}</p>
          {o.chakhna.pouredAs && <p className="cap soft"><b>Served here as:</b> {o.chakhna.pouredAs}</p>}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="foot">
        {prev && (
          <a className="prev" href={`${base}${prev.slug}/index.html`}>
            <span className="cap soft">{`Previous stop ${pad(prev.stop)}`}</span>
            <span className="next-name">{prev.name.toLowerCase()}</span>
            <svg viewBox="0 0 60 20" aria-hidden><path d="M58 10 H4 M14 3 L4 10 L14 17" /></svg>
          </a>
        )}
        {next && (
          <a className="next" href={`${base}${next.slug}/index.html`}>
            <span className="cap soft">{s.stop === s.total ? 'Back to the start' : `Next stop ${pad(next.stop)}`}</span>
            <span className="next-name">{next.name.toLowerCase()}</span>
            <svg viewBox="0 0 60 20" aria-hidden><path d="M2 10 H56 M46 3 L56 10 L46 17" /></svg>
          </a>
        )}
      </footer>
    </div>
  )
}
