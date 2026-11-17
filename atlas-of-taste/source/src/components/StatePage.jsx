import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Ph from './Ph.jsx'
import Header from './Header.jsx'
import { states } from '../data/states.js'
import Letters from './Letters.jsx'
import ArcTitle from './ArcTitle.jsx'
import Circled from './Circled.jsx'
gsap.registerPlugin(ScrollTrigger)

function Speaker() { return <svg viewBox="0 0 24 24" aria-hidden><path d="M3 9v6h4l5 4V5L7 9H3z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg> }
// Footnote numbers in the story text point at sources that are not shown on the page. Flip to true to show them.
const SHOW_FOOTNOTES = false

// Four glass outlines for the cocktail illustration slot (placeholders until the real drawings arrive).
const GLASSES = {
  coupe: <><ellipse cx="100" cy="72" rx="58" ry="11" /><path d="M42 72 C44 128 92 140 100 142 C108 140 156 128 158 72" /><path d="M52 92 C70 104 130 80 148 92" /><path d="M100 142 V228" /><ellipse cx="100" cy="232" rx="42" ry="9" /><circle cx="150" cy="60" r="16" /><path d="M150 44 V76 M134 60 H166" /></>,
  wine: <><ellipse cx="100" cy="64" rx="40" ry="8" /><path d="M60 64 C56 124 82 152 100 152 C118 152 144 124 140 64" /><path d="M64 100 C84 110 118 90 138 100" /><path d="M100 152 V228" /><ellipse cx="100" cy="232" rx="40" ry="9" /></>,
  tumbler: <><ellipse cx="100" cy="104" rx="52" ry="9" /><path d="M48 104 L58 232 C58 242 142 242 142 232 L152 104" /><path d="M52 150 C80 160 120 140 148 150" /><rect x="76" y="168" width="22" height="22" rx="3" /><rect x="104" y="180" width="20" height="20" rx="3" /></>,
  tall: <><ellipse cx="100" cy="56" rx="36" ry="7" /><path d="M64 56 L72 236 C72 246 128 246 128 236 L136 56" /><path d="M68 110 C88 120 112 100 132 110" /><path d="M112 16 L104 150" /></>,
}
const pad = (n) => String(n).padStart(2, '0')
const hear = (base, slug, kind) => { new Audio(`${base}audio/${slug}-${kind}.mp3`).play().catch(() => {}) } // recordings come later

export default function StatePage({ state: s, base }) {
  const root = useRef(null), ingImg = useRef(null)
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
          <h1 className="hero-title" style={{ fontSize: `min(${titleSize}vw, ${(30 / (1.05 * words.length)).toFixed(1)}vh)` }}>
            {words.map((w) => <span className="row" key={w}><Letters text={w.toLowerCase()} /></span>)}
          </h1>
          <div className="txt entry">
            <div className="entry-head">
              <button className="spk" onClick={() => hear(base, s.slug, 'name')} aria-label="Hear the name"><Speaker /></button>
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
                <button className="spk sm" onClick={() => hear(base, s.slug, 'greeting')} aria-label="Hear the greeting"><Speaker /></button>
                <mark lang={a.greeting.lang || nameLang} className={a.greeting.roman ? undefined : 'deva'}>{a.greeting.script}</mark>{a.greeting.script2 && <> <mark lang="ur" className="deva">{a.greeting.script2}</mark></>} ({a.greeting.translit}): {a.greeting.meaning}
              </li>
            </ul>
          </div>
          <Ph tone={rot(['sand', 'rose', 'mono'], 3)} label={P.tile} src={I.tile}  className="img tile" />
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
      <section id="order" className={`scene order${s.dry ? ' dry' : ''}`}>
        <h2 className="hero-title o-title"><span className="row">the</span><span className="row">order</span></h2>

        {/* Cocktail illustration slot. Swap the placeholder glass for your drawing. */}
        <figure className="cocktail">
          <svg viewBox="0 0 200 270" aria-hidden>{GLASSES[s.glass || 'coupe']}</svg>
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
