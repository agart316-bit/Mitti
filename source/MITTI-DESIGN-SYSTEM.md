# mitti

A candlelit bar menu you can walk through: twelve Indian states, twelve drinks, one cellar. The site reads like a menu book left open on a dark wooden table: warm paper pages, deep wine bands, lowercase serif headlines, and a typewriter voice for everything else.

This file is the brand book. `build-guide.md` (the next section) turns it into a change list for the current React build.

## Principles

1. **Paper and cellar, in turns.** The page alternates warm paper bands with deep cellar bands. Never more than two paper bands in a row, never two cellar bands in a row. This rhythm is the whole mood; it replaces the flat white page and the all-plum home page.
2. **The state owns its page.** Each state page takes one ink (`state-*` tokens) for headlines, rings and the order block. House pages (home, Mix a glass, Plan a visit, Passport) use `wisteria` on paper and `blossom` on cellar.
3. **Lowercase serif, uppercase mono.** Chandira is always lowercase and always big. DejaVu Sans Mono carries every other word, mostly uppercase. Nothing in between: no bold, no italics, no third face (Mukta only renders native scripts).
4. **Hand-drawn over UI.** Rings, arcs, arrows and cartouche frames are thin 1 to 1.5px strokes, like a pen mark on a menu. No icons from a set, no cards with shadows, no rounded panels.
5. **Photos are rooms, not thumbnails.** Big, square-cornered, often bleeding to an edge or cropped into an arch. Grain on top. Every image fits fully on screen at once.

## Color

The palette comes from the logo: `cellar` (#2d0302) is its ground, `wisteria` (#901f3d) its bloom. `paper` replaces white everywhere.

| Use | Paper band | Cellar band |
| --- | --- | --- |
| Ground | `paper` | `cellar` |
| Panels, placeholders, fields | `paper-deep` | `cellar-raised` |
| Body text | `cellar` | `cream` |
| Labels, pronunciations | `text-soft` #6e5a55 | `text-soft` #c9a9a0 |
| Headlines, rings, active state | `wisteria` (house) or the state ink | `blossom` (house) or `cream` |
| Rules, outlined buttons | `hairline` | `hairline` |

Rules:

- `wisteria` is never text on `cellar` (2.2:1). On dark, use `blossom` or `cream`.
- `blossom` and `blush` are never text colors on paper (under 2:1).
- `blush` is one panel per page at most: a soft card sitting over a photo (Plan a visit, a quote). It is the "fun" note, so it stays rare.
- The state order block is the state ink as ground with `cream` text. All twelve inks pass 4.7:1 with cream after two fixes: Bihar is now #8a5b07 and Rajasthan #ad440b (both were 4.4:1).
- State page body text stays the existing mix: `color-mix(in srgb, var(--ink) 55%, #2d0302)`, now mixed toward `cellar` instead of #1D1D00.

## Typography

| Style | Face | Size (1440 frame) | Web value | Case |
| --- | --- | --- | --- | --- |
| display-xl | Chandira | 180 / 0.9 | clamp(64px, 13vw, 220px) | lowercase |
| display-l | Chandira | 100 / 0.95 | clamp(48px, 7vw, 120px) | lowercase |
| display-m | Chandira | 56 / 1 | clamp(32px, 4.4vw, 72px) | lowercase |
| headword | Chandira | 44 / 1.1 | clamp(30px, 3.4vw, 56px) | lowercase |
| title-s | Chandira | 28 / 1.1 | clamp(22px, 1.9vw, 32px) | lowercase |
| body | DejaVu Mono | 15 / 1.6 | clamp(13px, 1.02vw, 17px) | sentence |
| caption | DejaVu Mono | 13 / 1.55 | clamp(12px, .95vw, 16px) | UPPERCASE |
| label | DejaVu Mono | 11 / 1.4, +0.1em | 11px | UPPERCASE |
| button | DejaVu Mono | 12 / 1, +0.08em | 12px | UPPERCASE |
| script | Mukta 400 | 20 / 1.45 | 1.25em of its line | native |

**The headline pairing.** The references mix roman and italic caps ("an ODE to the APERITIVO"). Chandira has one style and stays lowercase, so where that contrast is wanted, set a mono uppercase label inline with the serif, baseline-aligned. Optional; not used on state heroes.

**Eyebrows.** Every section label (INGREDIENT, STORY, STOP 01 OF 12) is a label style preceded by a 32px hairline and a 12px gap, like "—— PHILOSOPHY" in the Maison Rouge reference.

## Layout

- 12-column grid, unchanged: margin 1.7vw, gutter 1.2vw, column 6.95vw (`--c1`…`--c12`, `--s1`…`--s8`). Text columns are always 3 wide.
- Bands are full-bleed; content inside them sits on the grid. Band padding is `space-10` (120px) on desktop and `space-9` (96px) on mobile.
- The home page keeps its 1440 column with 120px side margins.
- Corners are square (`radius-0`). Only buttons and nav pills are round (`radius-pill`), and only images crop into arches (`radius-arch`).

## Imagery

- **Grain** on every photo and placeholder: the existing SVG noise at 28% multiply on paper, 18% screen on cellar.
- **Arch crop** for one hero image per house page and for the cocktail illustration frame: `border-radius: 50% 50% 0 0 / 40% 40% 0 0`.
- **Quote band**: a full-bleed photo with a `scrim` (72% cellar) and a display-m line in cream, centered. One per page at most.
- **Wake**: images start desaturated at low opacity and warm up as they scroll in (already in the build). Keep it.
- Placeholder tones become `paper-deep` (light), `blush` (rose) and `cellar-raised` (dark). Drop the sand, rose and grey gradients.

## Ornament

The ring is the motif. It already lives in the nav (active link) and the story section (circled word). Extend it, do not add new ones:

- **Ring**: an ellipse, 1px, `accent` stroke, `vector-effect: non-scaling-stroke`, slightly off-axis (rotate -3deg) so it looks hand-drawn.
- **Cartouche**: a large hairline ellipse framing the footer wordmark and pull quotes (the oval in the Fruit in Frost reference). 1px `hairline` stroke, never filled.
- **Arrow**: a thin hand-drawn arrow (existing `.c-arrow`) or the → glyph after a button label. No chevrons, no icon fonts.

## Motion

- Ease: `cubic-bezier(.22,1,.36,1)` for UI (dropdown, modal, button hover), 0.35s.
- Arrival: header fades in, photos fade and scale from 1.04, title letters land along an arc (GSAP `expo.out`, 1.8s). Keep on every page, home included.
- Scroll: `wake` on images, `fade` on caption blocks, drifting columns on state pages.
- `prefers-reduced-motion: reduce`: no arc arrival, no drift; fades only.

## Voice

- Headlines are short and lowercase: a place, a drink, a proverb. "the order", "mix a glass", "kos kos par badle paani".
- Captions are uppercase mono and read like menu notes: factual, a little wry, no exclamation marks.
- Native script appears beside its English, never instead of it.
- No prices, no recipes or methods on the web.
- The name is always "mitti", lowercase. The words "The Atlas of Taste" never appear.

## Don't

- No #fff grounds, no pure black.
- No bold or italic, no letter-spaced Chandira, no uppercase Chandira.
- No drop shadows except `shadow-pop` on floating layers.
- No rounded cards, no tinted-fill buttons as the main action, no gradients beyond photo scrims.
- No all-plum pages. Plum is Goa's ink, not the house color.

- No marquees or scrolling tickers.

---

# Build guide: applying mitti to the current build

How the design system maps onto the React build. Applied to the site on Nov 16, 2026; use it to keep new pages and edits consistent.

## Context for Claude

- Project: `source/` (Vite + React + GSAP). Styles: `src/styles.css`. Components: `src/components/*.jsx`. State data: `src/data/<state>.js`. Build: `scripts/build-site.mjs` writes one self-contained `index.html` per folder at the project root.
- This is a restyle: colors, type details, buttons, ornaments, and two new pieces (eyebrow, quote band). Layout geometry and the 12-column grid stay as they are.
- Keep all three fonts and their files. Chandira stays lowercase everywhere.
- After the edits, rebuild, open the home page, Goa, Bihar and Mix at 1440px and 390px, and check: no white grounds left, every text pair from the color table passes 4.5:1, nothing overlaps.

## 1. Tokens: replace the top of `styles.css`

Replace the `:root,.page{…}` line and the token part of the `:root{…}` line (keep every `--m`, `--g`, `--cw`, `--c*`, `--s*` grid variable exactly as is) with:

```css
:root{
 /* brand */
 --cellar:#2d0302; --cellar-raised:#4a0f14; --wisteria:#901f3d; --blossom:#d9a3b0;
 --paper:#f4ece1; --paper-deep:#eadccb; --blush:#e8ccc6; --cream:#f3e6d3;
 --text-soft:#6e5a55; --hairline:rgba(45,3,2,.22); --scrim:rgba(45,3,2,.72); --error:#a3221a;
 --shadow-pop:0 16px 40px rgba(45,3,2,.18);
 --ease:cubic-bezier(.22,1,.36,1);
 /* fonts (unchanged) */
 --head:'Chandira',serif; --body:'DejaVu Sans Mono',monospace; --deva:'Mukta','Kannada MN','Noto Sans Kannada',sans-serif;
 /* page defaults: house pages */
 --bg:var(--paper); --ink:var(--wisteria); --on:var(--cream);
}
:root,.page{--b:var(--ink);--bd:color-mix(in srgb,var(--ink) 55%,var(--cellar));--soft:var(--text-soft);--line:var(--hairline);}
/* any dark band */
.band-dark,.order,.ft{--bg:var(--cellar);--text-soft:#c9a9a0;--hairline:rgba(243,230,211,.3);--soft:var(--text-soft);--line:var(--hairline)}
:focus-visible{outline:2px solid var(--b);outline-offset:3px}
.band-dark :focus-visible,.order :focus-visible,.ft :focus-visible{outline-color:var(--cream)}
```

Then search the whole file and swap every hard-coded value:

| Find | Replace with |
| --- | --- |
| `#fff` / `#ffffff` used as a background | `var(--paper)` |
| `#fff` used as text on dark (`.ft`, `.mx-*`, `.btn-solid`, figcaption) | `var(--cream)` |
| `#5E1B3C` (house plum on home, mix, reserve, buttons, footer) | `var(--wisteria)` for text and strokes; `var(--cellar)` for large dark grounds |
| `rgba(94,27,60,.88)` | `var(--wisteria)` |
| `rgba(94,27,60,.08)` `.1` `.12` `.14` `.2` | `var(--paper-deep)` for fills; `var(--hairline)` for borders |
| `#3A1522`, `#2E0F1D`, `#1D1D00` | `var(--cellar)` |
| `#EFE2C8` | `var(--cream)` |
| `#7A1424` in `.hdr` | `var(--wisteria)` |
| `#B3261E` | `var(--error)` |
| `rgba(58,21,34,.55)` (modal backdrop) | `var(--scrim)` |
| `box-shadow:0 1vw 2vw rgba(29,29,0,.1)` and the `.rv-fab` shadow | `var(--shadow-pop)` |
| `cubic-bezier(.22,1,.36,1)` | `var(--ease)` |

## 2. State inks (`src/data/*.js`)

Only two change. Everything else keeps its ink.

- `bihar.js`: `ink: '#946308'` → `ink: '#8a5b07'`
- `rajasthan.js`: `ink: '#B84A0C'` → `ink: '#ad440b'`

## 3. Header (`.hdr`, `Header.jsx`)

- Background: `color-mix(in srgb, var(--paper) 82%, transparent)` with the existing 10px blur; bottom border `1px solid var(--hairline)`.
- Remove the header's own `--ink:#7A1424` reset and set `--ink:var(--wisteria)` so the header is always house-colored, also on state pages.
- Nav links: caption style, uppercase. Active link keeps the ellipse ring; give the ring `transform:rotate(-3deg)` and stroke `var(--b)`.
- Dropdown `.dd-panel`: background `var(--paper)`, `box-shadow:var(--shadow-pop)`, `border:1px solid var(--hairline)`, square corners. Hover row: `var(--paper-deep)`.

## 4. Buttons (replace `.btn-solid`, `.btn-soft`, `.hm-btn`)

One family, three variants, all pills:

```css
.btn{display:inline-flex;align-items:center;gap:.8em;min-height:48px;padding:0 1.8em;border-radius:999px;
 font:400 12px/1 var(--body);letter-spacing:.08em;text-transform:uppercase;text-decoration:none;cursor:pointer;
 transition:background .35s var(--ease),color .35s var(--ease),border-color .35s var(--ease)}
.btn::after{content:'→'}
.btn-solid{background:var(--b);color:var(--cream);border:1px solid var(--b)}
.btn-solid:hover{background:var(--cellar);border-color:var(--cellar)}
.btn-line{background:transparent;color:var(--b);border:1px solid var(--hairline)}
.btn-line:hover{border-color:var(--b)}
.band-dark .btn-solid,.order .btn-solid,.ft .btn-solid{background:var(--cream);color:var(--cellar);border-color:var(--cream)}
.band-dark .btn-line,.order .btn-line,.ft .btn-line{color:var(--cream)}
.btn:disabled{opacity:.4;cursor:default}
```

Map: `.btn-solid` and `.hm-btn.solid` → `btn btn-solid`; `.btn-soft` and `.hm-btn` → `btn btn-line`. One solid button per view; everything else is line. The close button `.rv-x` becomes a 44px circle, `btn-line` style, no arrow.

## 5. Eyebrow labels (new, small)

Every section label (`.cap.soft` used as "Ingredient", "Story", `.hm-room .lbl`, "Stop 01 of 12"):

```css
.eyebrow{display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--soft)}
.eyebrow::before{content:'';width:32px;height:1px;background:currentColor}
```

## 6. State pages (`StatePage.jsx`)

- Page ground becomes `paper` automatically through `--bg`. Keep `style={{'--ink': s.ink}}`.
- Photo placeholders: `.ph-sand{--g:var(--paper-deep)}`, `.ph-rose{--g:var(--blush)}`, `.ph-mono{--g:var(--paper-deep);filter:grayscale(1)}`, `.ph-dark{--g:var(--cellar-raised)}`. Labels on light tones: `var(--cellar)`; on dark: `var(--cream)`.
- Order block (`.order`): keep `background:var(--ink)`; set `--b`, `--bd` and `color` to `var(--cream)` and `--soft` to `color-mix(in srgb,var(--cream) 78%,transparent)`. Frame the cocktail illustration in an arch: `.cocktail{border:1px solid var(--line);border-radius:50% 50% 0 0/40% 40% 0 0}`.
- Speaker button `.spk`: square stays, background `var(--b)`, icon `var(--cream)`; hover `var(--cellar)`.
- `.entry mark`: background `color-mix(in srgb,var(--ink) 14%,transparent)`, unchanged otherwise.
- Footer `.foot`: on state pages, end with a cellar band, `border-top:none`, next-stop name in `cream`, arrow stroke `var(--blossom)`.

## 7. Home (`Home.jsx`, `.hm-*`)

The home page should feel like the state pages: loose, layered, moving, not a formal plum page.

- Keep the home page on its 1440 column with 120px side margins; do not move it onto the 12-column grid.
- Band order: hero (paper) → map (cellar) → "the room" photos (paper) → quote band (photo + scrim) → CTA (paper) → footer (cellar).
- Hero title `.hm-title`: `var(--wisteria)`, display-xl. Proverb `.hm-proverb`: Mukta, `var(--cellar)`.
- Map band `.hm-mapsec`: background `var(--cellar)`. State shapes rest at `var(--cellar-raised)` with a `var(--hairline)` stroke, hover fill `var(--blossom)` with `filter:drop-shadow(0 0 18px rgba(217,163,176,.55))` for the glow. Tooltip `.hm-tip`: background `var(--cream)`, text `var(--cellar)`, square corners.
- One blush panel max: put the intro text `.hm-txt` on a `blush` panel overlapping the third hero photo (Malva's "Spend the evening with us" card), padding 32px.
- CTA keeps its heading; buttons become one `btn-solid` and one `btn-line`.

## 8. Mix a glass, Reserve, Passport

- Mix (`.mx-*`): stays on paper. Disc rings: outer `wisteria`, middle `cellar-raised`, centre `cellar`; ring labels `var(--cream)`; selected label `background:var(--cream);color:var(--cellar)`; glass stroke `var(--blossom)`.
- Reserve modal: backdrop `var(--scrim)`; box `var(--paper)`, square, `shadow-pop`. Fields lose their tinted fill: `background:transparent;border:0;border-bottom:1px solid var(--hairline)`; focus `border-bottom-color:var(--wisteria)`. Checked pass `.rv-chk.on`: `var(--cellar)` ground, `var(--cream)` text. Floating `.rv-fab`: `btn btn-solid` + `shadow-pop`.
- Passport (when built): paper ground, one stamp grid on `paper-deep`, stamps in each state's ink.

## 9. New components

**Quote band**

```css
.quote-band{position:relative;min-height:70vh;display:grid;place-items:center;text-align:center;color:var(--cream);overflow:hidden}
.quote-band img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.quote-band::before{content:'';position:absolute;inset:0;background:var(--scrim);z-index:1}
.quote-band blockquote{position:relative;z-index:2;max-width:var(--s8);font:400 clamp(32px,4.4vw,72px)/1 var(--head);text-transform:lowercase;letter-spacing:-.02em}
```

**Cartouche** (footer wordmark, pull quotes): an absolutely positioned SVG `<ellipse>` behind the text, `fill:none;stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke`, inset -8% horizontally, -20% vertically.

## 10. Footer (`Footer.jsx`, `.ft`)

- Background `var(--cellar)`, text `var(--cream)`, labels `#c9a9a0`.
- Wordmark `mitti` in display-l, `var(--blossom)`, inside a cartouche.
- Hairline `var(--hairline)` between the top row and the credit line.

## 11. Mobile (under 900px)

- Keep the current stacking rules. Band padding becomes 96px top and bottom, 6vw sides.
- Quote band min-height 60vh.
- Buttons stay 48px tall and go full width inside forms.

## Done means

- No `#fff`, `#5E1B3C` outside `goa.js`, `rgba(94,27,60…)` or `#1D1D00` left in `styles.css`.
- Every page alternates paper and cellar bands.
- All buttons are `btn btn-solid` or `btn btn-line`.
- Bihar and Rajasthan use the new inks.
- Reduced motion turns off the arc arrival and drift.

---

Live design system (tokens, components, previews): https://claude.ai/artifact/31UDHsEUTQHXyQqQhkDpAg
