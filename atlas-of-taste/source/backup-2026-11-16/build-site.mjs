// Builds every page into a self-contained HTML file and writes it one level up, next to this folder:
//   ../index.html, ../goa/index.html, ../karnataka/index.html ...
// Each file has its CSS, JS, fonts and logo inlined, so it opens by double-click (no server needed).
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath } from 'node:url'
import { mkdtempSync, mkdirSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { states } from '../src/data/states.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const site = path.resolve(root, '..')
const pages = ['index.html', ...states.map((s) => `${s.slug}/index.html`)]

for (const page of pages) {
  const out = mkdtempSync(path.join(tmpdir(), 'mitti-'))
  await build({
    root, configFile: false, logLevel: 'warn',
    plugins: [react(), viteSingleFile()],
    build: { outDir: out, emptyOutDir: true, assetsInlineLimit: 100000000, rollupOptions: { input: path.join(root, page) } },
  })
  const dest = path.join(site, page)
  mkdirSync(path.dirname(dest), { recursive: true })
  copyFileSync(path.join(out, page), dest)
  console.log('wrote', path.relative(site, dest))
}
