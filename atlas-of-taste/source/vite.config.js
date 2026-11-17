// `npm run dev` serves this folder (open /index.html, /goa/index.html ...).
// `npm run build` writes the finished, double-clickable pages one level up (see scripts/build-site.mjs).
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], server: { fs: { allow: ['..'] } } }) // allow dev server to read ../goa photos
