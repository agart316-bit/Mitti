// Passport storage, shared by the Passport page and anything that earns a stamp.
// Stamps live in this browser only: { 'goa': '7 Nov 2026', ... }. To stamp a state from another page, call earnStamp('goa').
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const read = (key, fallback) => { try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback } catch (e) { return fallback } }
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) { /* storage can be blocked */ } }

export const fmtDate = (d = new Date()) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`

export const loadStamps = () => read('mitti-stamps', {})
export const saveStamps = (s) => write('mitti-stamps', s)
export const loadPlaced = () => read('mitti-stamp-pages', {})
export const savePlaced = (p) => write('mitti-stamp-pages', p)
// Saved glasses are written by the Mix page under this key (the name is historical).
export const loadGlasses = () => read('mitti-passport', [])
export const saveGlasses = (g) => write('mitti-passport', g)

export const earnStamp = (slug) => {
  const s = loadStamps()
  if (!s[slug]) { s[slug] = fmtDate(); saveStamps(s) }
}

// Clearing the passport also drops the saved glasses and the reservation, as the page says.
export const clearAll = () => {
  try { ['mitti-stamps', 'mitti-stamp-pages', 'mitti-passport', 'mitti-reservations'].forEach((k) => localStorage.removeItem(k)) } catch (e) { /* ignore */ }
}
