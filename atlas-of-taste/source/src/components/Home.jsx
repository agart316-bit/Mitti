import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Letters from './Letters.jsx'
import { states } from '../data/states.js'
import { stateShapes, outline } from '../data/india-map.js'
// Hero photos come straight from the state folders, same as the state pages.
import coast from '../../../goa/goa-beach-sunset.webp'
import sarbath from '../../../kerala/kerala-kulukki-sarbath.jpg'
import terraces from '../../../assam/assam-tea-terraces.jpg'
// The bar, from the home folder (compressed copies of the originals).
import barWide from '../../../home/bar-wide.webp'
import dining from '../../../home/dining-room.webp'
import counter from '../../../home/counter-cocktails.webp'
import table from '../../../home/table-spread.webp'
import lounge from '../../../home/lounge-stools.webp'
gsap.registerPlugin(ScrollTrigger)

// Built to match the "mitti, all pages" canvas (Main.dc.html) in pixels: a 1440px column with 120px side margins.
const MAP = {
  goa:              { id: 'ga', x: 122.9, y: 511.8 },
  karnataka:        { id: 'ka', x: 167,   y: 525.6 },
  kerala:           { id: 'kl', x: 171.9, y: 617.1 },
  'west-bengal':    { id: 'wb', x: 413.8, y: 320.8 },
  bihar:            { id: 'br', x: 364.6, y: 280.2 },
  sikkim:           { id: 'sk', x: 424.7, y: 236,   script: 'सिक्किम' },
  assam:            { id: 'as', x: 515.9, y: 264.4 },
  'uttar-pradesh':  { id: 'up', x: 258.8, y: 250.6 },
  uttarakhand:      { id: 'ut', x: 230.5, y: 173.9 },
  'madhya-pradesh': { id: 'mp', x: 211.6, y: 329.3 },
  rajasthan:        { id: 'rj', x: 118.5, y: 258.6 },
  gujarat:          { id: 'gj', x: 71.6,  y: 348.8 },
}
const pad = (n) => String(n).padStart(2, '0')
const TITLE = ['kos kos par', 'badle paani,', 'chaar kos par', 'baani.']
const rows = states.map((s) => ({ ...s, ...MAP[s.slug], d: stateShapes[MAP[s.slug].id] }))
const FIG = 'home-fig'
const openReserve = () => window.dispatchEvent(new Event('mitti-reserve'))

export default function Home({ base }) {
  const root = useRef(null)
  const [hover, setHover] = useState(null)
  const cur = rows.find((r) => r.slug === hover)
  const [last, setLast] = useState(null) // keeps the label in place while it fades out
  const shown = cur || rows.find((r) => r.slug === last) || rows[0]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Same arrival as the state pages: header fades in, photos fade in, title letters land along an arc.
      const chs = gsap.utils.toArray('.hm-title .ch'), n = chs.length, W = window.innerWidth
      const tl = gsap.timeline()
      tl.from('.hdr', { opacity: 0, duration: 1 }, 0.2)
        .from('.hm-hero figure', { opacity: 0, scale: 1.04, duration: 1.4, stagger: 0.15, ease: 'power2.out' }, 0)
        .from('.hm-hero .hm-txt', { opacity: 0, y: 14, duration: 1, ease: 'power2.out' }, 1)
      chs.forEach((el, i) => {
        const u = i / (n - 1) - 0.5
        tl.from(el, { x: u * W * 0.5, y: 320 * (4 * u * u) - 150, rotation: u * 130, opacity: 0, duration: 1.8, ease: 'expo.out' }, 0.15 + i * 0.03)
      })
      gsap.utils.toArray('.wake').forEach((el) =>
        gsap.fromTo(el, { opacity: 0.18, filter: 'grayscale(1) contrast(.8)' }, { opacity: 1, filter: 'grayscale(0) contrast(1)', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true } }))
      // The bar photos start zoomed in and settle back as you scroll past; the quote band does the same, slower.
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray('.hm-room figure img').forEach((img, i) =>
          gsap.fromTo(img, { scale: 1.3 - (i % 2) * 0.08 }, { scale: 1, ease: 'none',
            scrollTrigger: { trigger: img.closest('figure'), start: 'top 100%', end: 'bottom 35%', scrub: true } }))
        gsap.fromTo('.quote-band > img', { scale: 1.4 }, { scale: 1, ease: 'none',
          scrollTrigger: { trigger: '.quote-band', start: 'top 100%', end: 'bottom 40%', scrub: true } })
      }
      gsap.utils.toArray('.fade').forEach((el) =>
        gsap.fromTo(el, { opacity: 0.12 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 60%', scrub: true } }))
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="page home-page">
      <Header base={base} />

      <section className="hm-wrap">
        <div className="hm-hero">
          <p className="hm-proverb" lang="hi">कोस कोस पर बदले पानी,<br />चार कोस पर बानी</p>
          <figure style={{ left: 0, top: 150, width: 300, height: 420, opacity: 0.4 }}><img src={coast} alt="Goan coast at sunset" /><figcaption>goa</figcaption></figure>
          <figure style={{ right: 30, top: 20, width: 330, height: 330, mixBlendMode: 'multiply', opacity: 0.4 }}><img src={sarbath} alt="A glass of kulukki sarbath" /><figcaption>kerala</figcaption></figure>
          <figure style={{ left: 380, top: 640, width: 420, height: 280, opacity: 0.4 }}><img src={terraces} alt="Tea terraces in Assam" /><figcaption>assam</figcaption></figure>
          <h1 className="hm-title" aria-label={TITLE.join(' ')}>
            {TITLE.map((w) => <span className="row" key={w} aria-hidden><Letters text={w} /></span>)}
          </h1>
          <div className="hm-txt">
            <p className="a">Every few miles the water changes. A little further, so does the language.</p>
            <p className="b">mitti travels through twelve states, one drink and one small plate at a time.</p>
          </div>
        </div>
      </section>

      <section id="map" className="hm-mapsec">
        <div className="hm-mapin">
          <div className="hm-mapbox fade">
            <svg viewBox="0 0 612 676" width="100%" role="group" aria-label="Map of India with the twelve states on the route" style={{ display: 'block', overflow: 'visible' }}>
              {outline.filter((o) => o.id !== 'an').map((o) => <path key={o.id} d={o.d} fill="rgba(243,230,211,0.05)" stroke="rgba(243,230,211,0.3)" strokeWidth="0.5" />)}
              {rows.map((r) => (
                <a key={r.slug} href={`${base}${r.slug}/index.html`} aria-label={`${r.name}, stop ${pad(r.stop)}`}
                  onMouseEnter={() => { setHover(r.slug); setLast(r.slug) }} onMouseLeave={() => setHover(null)} onFocus={() => { setHover(r.slug); setLast(r.slug) }} onBlur={() => setHover(null)}>
                  <path d={r.d} stroke="#2d0302" strokeWidth="0.9" strokeLinejoin="round"
                    style={{ cursor: 'pointer', outline: 'none', transition: 'fill .9s ease, filter .9s ease',
                      fill: r.slug === hover ? '#d9a3b0' : `rgba(217,163,176,${hover ? 0.16 : 0.34})`,
                      filter: r.slug === hover
                        ? 'drop-shadow(0 0 6px rgba(243,230,211,.6)) drop-shadow(0 0 22px rgba(217,163,176,.55)) drop-shadow(0 0 46px rgba(144,31,61,.6))'
                        : 'drop-shadow(0 0 6px rgba(243,230,211,0)) drop-shadow(0 0 22px rgba(217,163,176,0)) drop-shadow(0 0 46px rgba(144,31,61,0))' }} />
                </a>
              ))}
            </svg>
            <div aria-hidden="true" className="hm-tip" style={{ left: `${shown.x / 612 * 100}%`, top: `${(shown.y - 14) / 676 * 100}%`, opacity: cur ? 1 : 0, transform: `translate(-50%, calc(-100% + ${cur ? 0 : 8}px))` }}>
              <span>{shown.name}</span>
            </div>
          </div>
          <p aria-live="polite" className="hm-cap">{cur ? `stop ${pad(cur.stop)} of 12` : 'hover a state'}</p>
        </div>
      </section>

      <section className="hm-room">
        <p className="lbl eyebrow fade">the room</p>
        <div className="stage">
          <figure className="wake" style={{ left: 0, top: 0, width: 620, height: 780 }}><div className="zm"><img src={dining} alt="Diners at candlelit tables in the main room" /></div></figure>
          <figure className="wake" style={{ left: 660, top: 60, width: 540, height: 330 }}><div className="zm"><img src={lounge} alt="Velvet stools along the lit bar counter" style={{ objectPosition: '50% 62%' }} /></div></figure>
          <figure className="wake" style={{ left: 660, top: 430, width: 250, height: 370 }}><div className="zm"><img src={counter} alt="A cocktail and small plates on the marble counter" style={{ objectPosition: '62% 50%' }} /></div></figure>
          <figure className="wake" style={{ left: 940, top: 430, width: 260, height: 300 }}><div className="zm"><img src={table} alt="Drinks and small plates laid out on a table" style={{ objectPosition: '50% 78%' }} /></div></figure>
        </div>
      </section>

      <section className="quote-band">
        <img src={barWide} alt="" />
        <figure className="fade">
          <svg className="cartouche" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden><ellipse cx="50" cy="25" rx="49" ry="24" /></svg>
          <blockquote>one drink and one small plate at a time.</blockquote>
          <figcaption>twelve states, one cellar</figcaption>
        </figure>
      </section>

      <section className="hm-cta">
        <h2 className="fade">where do you want<br />to be tonight?</h2>
        <div className="row">
          <button type="button" className="btn-solid" onClick={openReserve}>reserve a table</button>
          <a className="btn-line" href={`${base}goa/index.html`}>start at goa</a>
        </div>
      </section>

      <Footer base={base} />
    </div>
  )
}
