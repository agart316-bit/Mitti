import { useEffect, useRef, useState } from 'react'

// Sticky "reserve a table" button + popup, mounted once on every page. Anything can open it with window.dispatchEvent(new Event('mitti-reserve')).
// There is no booking server yet: a request is saved in this browser and the guest sees a confirmation.
const TIMES = (() => { const t = []; for (let m = 17 * 60; m <= 22 * 60 + 30; m += 30) { const h = Math.floor(m / 60), mm = m % 60; t.push(`${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`) } return t })()
const today = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10) }
// The next 14 days for the date dropdown: value is YYYY-MM-DD, label reads like the sentence ("mon, nov 16").
const DAYS = () => Array.from({ length: 14 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i)
  const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toLowerCase()
  return { iso, label }
})
const SIZES = Array.from({ length: 12 }, (_, i) => i + 1)
const Caret = () => <svg className="rv-caret" viewBox="0 0 10 6" aria-hidden><path d="M1 1l4 4 4-4" /></svg>

// Inline dropdown for the sentence: the chosen value shows in Chandira, the open list in the body font.
// Keyboard: Enter/Space/Arrow opens, arrows move, Enter picks, Escape closes (without closing the popup).
function Pick({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrap = useRef(null), list = useRef(null), btn = useRef(null)
  const idx = Math.max(0, options.findIndex((o) => String(o.value) === String(value)))
  const id = useRef('pk' + Math.random().toString(36).slice(2, 8)).current
  useEffect(() => {
    if (!open) return
    setActive(idx)
    const away = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', away)
    requestAnimationFrame(() => list.current?.focus())
    return () => document.removeEventListener('pointerdown', away)
  }, [open])
  useEffect(() => { if (open) list.current?.querySelector(`#${id}-${active}`)?.scrollIntoView({ block: 'nearest' }) }, [active, open])
  const choose = (i) => { onChange(options[i].value); setOpen(false); btn.current?.focus() }
  const onBtnKey = (e) => { if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); setOpen(true) } }
  const onListKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(options.length - 1, a + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(options.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active) }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setOpen(false); btn.current?.focus() }
    else if (e.key === 'Tab') setOpen(false)
  }
  return (
    <span className="rv-sel" ref={wrap}>
      <button type="button" ref={btn} className="rv-pick" aria-haspopup="listbox" aria-expanded={open} aria-label={`${label}: ${options[idx]?.label}`}
        onClick={() => setOpen((o) => !o)} onKeyDown={onBtnKey}>
        {options[idx]?.label}<Caret />
      </button>
      {open && (
        <ul className="rv-list" role="listbox" aria-label={label} tabIndex={-1} ref={list} aria-activedescendant={`${id}-${active}`} onKeyDown={onListKey}>
          {options.map((o, i) => (
            <li key={o.value} id={`${id}-${i}`} role="option" aria-selected={i === idx}
              className={`${i === active ? 'act' : ''}${i === idx ? ' cur' : ''}`}
              onMouseEnter={() => setActive(i)} onClick={() => choose(i)}>{o.label}</li>
          ))}
        </ul>
      )}
    </span>
  )
}
const load = () => { try { return JSON.parse(localStorage.getItem('mitti-passport') || '[]') } catch (e) { return [] } }
const EMPTY = { date: '', time: '', size: 2, name: '', email: '', phone: '', notes: '' }

export default function Reserve() {
  const [open, setOpen] = useState(false)
  const [f, setF] = useState(EMPTY)
  const [saved, setSaved] = useState([])
  const [pick, setPick] = useState([])
  const [err, setErr] = useState({})
  const [done, setDone] = useState(null)
  const [days, setDays] = useState(DAYS)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    const show = () => { const d = DAYS(); setDays(d); setF((p) => ({ ...p, date: p.date && d.some((x) => x.iso === p.date) ? p.date : d[0].iso, time: p.time || '8:00 pm' })); setSaved(load()); setPick([]); setDone(null); setErr({}); setPhoneOpen(false); setOpen(true) }
    window.addEventListener('mitti-reserve', show)
    if (location.hash === '#reserve') show() // the "Plan a visit" link opened in a new tab or without scripts lands here
    return () => window.removeEventListener('mitti-reserve', show)
  }, [])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', key)
    box.current && box.current.focus()
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', key) }
  }, [open])

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!f.date) x.date = 'Choose a date'
    if (!f.time) x.time = 'Choose a time'
    if (!f.name.trim()) x.name = 'Add your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Add a valid email'
    setErr(x)
    if (Object.keys(x).length) return
    const rec = { ...f, dateLabel: (days.find((d) => d.iso === f.date) || {}).label || f.date, drinks: pick.map((i) => saved[i]), at: Date.now() }
    try { const all = JSON.parse(localStorage.getItem('mitti-reservations') || '[]'); all.push(rec); localStorage.setItem('mitti-reservations', JSON.stringify(all)) } catch (e2) { /* storage blocked */ }
    setDone(rec)
  }
  const toggle = (i) => setPick((p) => (p.includes(i) ? p.filter((v) => v !== i) : [...p, i]))
  const close = () => setOpen(false)

  return (
    <>
      <button type="button" className="btn-solid rv-fab" onClick={() => window.dispatchEvent(new Event('mitti-reserve'))}>reserve a table</button>
      {open && (
        <div className="rv-back" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="rv-box" role="dialog" aria-modal="true" aria-labelledby="rv-h" tabIndex={-1} ref={box}>
            <button type="button" className="rv-x" onClick={close} aria-label="Close">×</button>
            {done ? (
              <div className="rv-done">
                <h2 id="rv-h">thank you, {done.name.split(' ')[0].toLowerCase()}.</h2>
                <p className="cap">Table for {done.size} on {done.dateLabel} at {done.time}.</p>
                {done.drinks.length > 0 && <p className="cap">{done.drinks.length} saved {done.drinks.length === 1 ? 'drink' : 'drinks'} attached.</p>}
                <p className="cap soft">We will confirm by email at {done.email}.</p>
                <button type="button" className="btn-solid" onClick={close}>close</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="eyebrow" id="rv-h">reserve a table</p>
                <p className="rv-sentence">
                  a table for{' '}
                  <Pick label="Guests" value={f.size} options={SIZES.map((n) => ({ value: n, label: String(n) }))} onChange={(v) => setF((p) => ({ ...p, size: Number(v) }))} />{' '}
                  on{' '}
                  <Pick label="Date" value={f.date} options={days.map((d) => ({ value: d.iso, label: d.label }))} onChange={(v) => setF((p) => ({ ...p, date: v }))} />{' '}
                  at{' '}
                  <Pick label="Time" value={f.time} options={TIMES.map((t) => ({ value: t, label: t }))} onChange={(v) => setF((p) => ({ ...p, time: v }))} />, under the name{' '}
                  <input className="rv-name" type="text" aria-label="Your name" autoComplete="name" placeholder="your name" value={f.name} onChange={set('name')} />.
                </p>
                {(err.name || err.date || err.time) && <p className="rv-err" role="alert">{err.name || err.date || err.time}</p>}
                {f.size > 8 && <p className="cap soft">For large groups we will email to confirm.</p>}
                <div className="rv-grid">
                  <label className="rv-f"><span className="eyebrow-s">we will confirm at</span>
                    <input type="email" autoComplete="email" placeholder="you@email.com" value={f.email} onChange={set('email')} />{err.email && <em>{err.email}</em>}</label>
                  <label className="rv-f"><span className="eyebrow-s">anything we should know</span>
                    <input type="text" placeholder="allergies, a celebration, seating" value={f.notes} onChange={set('notes')} /></label>
                  {phoneOpen && <label className="rv-f"><span className="eyebrow-s">phone</span><input type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} /></label>}
                </div>
                {saved.length > 0 && (
                  <fieldset className="rv-pass">
                    <legend className="eyebrow-s">have your saved mixes ready when you arrive</legend>
                    <div className="rv-stamps">
                      {saved.map((d, i) => (
                        <label key={i} className={`rv-chk${pick.includes(i) ? ' on' : ''}`}>
                          <input type="checkbox" checked={pick.includes(i)} onChange={() => toggle(i)} />
                          <span className="rv-stamp"><b>{[d.glass, ...(d.tadkas || [])].join(' + ').toLowerCase()}</b>{d.state && <small>{d.state}</small>}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
                <div className="rv-foot">
                  {phoneOpen ? <span /> : <span className="eyebrow-s">phone optional · <button type="button" className="rv-link" onClick={() => setPhoneOpen(true)}>add one</button></span>}
                  <button type="submit" className="btn-solid">request a table</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
