// Builds every page and writes it one level up, next to this folder:
//   ../index.html, ../goa/index.html, ../karnataka/index.html ...  plus a shared ../assets/ folder.
// Each page is a small HTML file that links its JS, CSS, fonts and photos from ../assets/ (about 10 KB of HTML
// per page instead of 30 MB with everything inlined). The script is a classic deferred <script>, not a module,
// so the pages still open by double-click from the Finder as well as on GitHub Pages.
// Photos are shrunk after the build (max 1800px wide) if `sharp` is installed; the originals are never touched.
//   npm run build          all pages
//   node scripts/build-site.mjs goa   one page (any slug, or "mix" / "passport")
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { mkdtempSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { states } from '../src/data/states.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const site = path.resolve(root, '..')
const assets = path.join(site, 'assets')
const only = process.argv[2]
const pages = only ? [`${only}/index.html`] : ['index.html', 'mix/index.html', 'passport/index.html', ...states.map((s) => `${s.slug}/index.html`)]

if (!only) rmSync(assets, { recursive: true, force: true })   // full build: drop old hashed files so nothing stale piles up
mkdirSync(assets, { recursive: true })

for (const page of pages) {
  const out = mkdtempSync(path.join(tmpdir(), 'mitti-'))
  await build({
    root, configFile: false, logLevel: 'warn', base: './',
    plugins: [react()],
    build: {
      outDir: out, emptyOutDir: true, assetsInlineLimit: 4096, cssCodeSplit: false,
      rollupOptions: {
        input: path.join(root, page),
        output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'assets/[name]-[hash].js', assetFileNames: 'assets/[name]-[hash][extname]' },
      },
    },
  })
  for (const f of readdirSync(path.join(out, 'assets'))) copyFileSync(path.join(out, 'assets', f), path.join(assets, f))

  // Point the page at ../assets/ (or ./assets/ on the home page), and make the script a plain deferred one.
  const prefix = page.includes('/') ? '../' : './'
  const html = readFileSync(path.join(out, page), 'utf8')
    .replace(/<script type="module" crossorigin /g, '<script defer ')
    .replace(/ crossorigin(="[^"]*")?/g, '')
    .replace(/(src|href)="(?:\.\.?\/)*assets\//g, `$1="${prefix}assets/`)
  const dest = path.join(site, page)
  mkdirSync(path.dirname(dest), { recursive: true })
  writeFileSync(dest, html)
  console.log('wrote', path.relative(site, dest), `${(html.length / 1024).toFixed(1)} KB`)
}

// Shrink the photos in ../assets (copies only). Skipped quietly if sharp is not installed.
let sharp = null
try { sharp = (await import('sharp')).default } catch { console.log('sharp not installed: photos left at full size (run npm install)') }
if (sharp) {
  let before = 0, after = 0
  for (const f of readdirSync(assets)) {
    const ext = path.extname(f).toLowerCase()
    if (!['.jpg', '.jpeg', '.webp', '.png'].includes(ext) || f.startsWith('logo')) continue
    const file = path.join(assets, f), size = statSync(file).size
    if (size < 150 * 1024) continue
    const img = sharp(file).rotate().resize({ width: 1800, withoutEnlargement: true })
    const buf = await (ext === '.webp' ? img.webp({ quality: 78 }) : ext === '.png' ? img.png({ compressionLevel: 9 }) : img.jpeg({ quality: 80, mozjpeg: true })).toBuffer()
    before += size
    if (buf.length < size * 0.95) { writeFileSync(file, buf); after += buf.length } else after += size
  }
  console.log(`photos: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`)
}
