import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import { states } from '../data/states.js'

const pad = (n) => String(n).padStart(2, '0')

// Site-wide header: logo (home), "mitti", and four links. "Map" opens a dropdown of every state.
// `base` is the path back to the site root from the current page ('./' on the home page, '../' inside a state folder).
export default function Header({ base, current, dark, active }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const timer = useRef(0)
  const hover = () => matchMedia('(hover:hover)').matches
  // Hover opens at once and closes after a short grace period, so the pointer can travel from "Map" into the list.
  const enter = () => { if (!hover()) return; clearTimeout(timer.current); setOpen(true) }
  const leave = () => { if (!hover()) return; clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 180) }
  useEffect(() => {
    const close = (e) => { if (!box.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', esc)
    return () => { clearTimeout(timer.current); document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc) }
  }, [])
  const link = (path) => `${base}${path}`
  const onState = !!current   // a state page belongs to the Map

  return (
    <header className={`hdr${dark ? ' hdr-dark' : ''}`}>
      <a className="logo" href={link('index.html')}><img src={logo} alt="mitti, home" /></a>
      <div className="hdr-mid">
        <a className="hdr-title" href={link('index.html')}>mitti</a>
        <nav>
          <div className={`dd${open ? ' open' : ''}`} ref={box} onMouseEnter={enter} onMouseLeave={leave}>
            <button className={onState ? 'on' : ''} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((o) => (hover() ? true : !o))}>
              Map
              <svg className="caret" viewBox="0 0 10 6" aria-hidden><path d="M1 1l4 4 4-4" /></svg>
              {onState && <svg className="ring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden><ellipse cx="50" cy="20" rx="48" ry="17" /></svg>}
            </button>
            {/* Always rendered so it can fade in and out; `.dd.open` makes it visible and clickable. */}
            <ul className="dd-panel" role="menu" aria-hidden={!open}>
              {states.map((s) => (
                <li key={s.slug} role="none">
                  <a role="menuitem" tabIndex={open ? 0 : -1} href={link(`${s.slug}/index.html`)} className={s.slug === current ? 'here' : ''}>
                    <span className="n">{pad(s.stop)}</span>{s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a href={link('mix/index.html')} className={active === 'mix' ? 'on' : ''}>
            Mix a glass
            {active === 'mix' && <svg className="ring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden><ellipse cx="50" cy="20" rx="48" ry="17" /></svg>}
          </a>
          <a href={link('visit/index.html')} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('mitti-reserve')) }}>Plan a visit</a>
          <a href={link('passport/index.html')} className={active === 'passport' ? 'on' : ''}>
            Passport
            {active === 'passport' && <svg className="ring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden><ellipse cx="50" cy="20" rx="48" ry="17" /></svg>}
          </a>
        </nav>
      </div>
      <span />
    </header>
  )
}
