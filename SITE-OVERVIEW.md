# Leah Cortez Studios — Site Overview
**Last updated:** October 14, 2026

## About
**Leah Cortez** — Chicana artist and designer from Corpus Christi, South Texas. BFA Communication Design student at Texas A&M University–Corpus Christi (graduating 2028).

- Site: leahcortezstudios.art (GitHub Pages, repo `Leahcortezi/leahcortezstudios.art`, branch `main`, `CNAME` set)
- Instagram: @leahcortez.art
- Behance: behance.net/leahcortez1
- Contact: contact@leahcortezstudios.art

The site is a design-focused portfolio, with a personal, scrapbook-style look.

## Pages
| Page | Path | Notes |
|------|------|-------|
| Home | `/index.html` | "Home 2a Scrapbook": hero with polaroid stack, pink marquee, Selected work, About folder tabs, Pinned up, footer |
| Work | `/collections/index.html` | Generated grid of 11 projects with filters |
| Project pages | `/collections/design/<slug>/index.html` | Generated from `case-study.json` |
| About | `/bio/index.html` | Built from the About handoff (hero, facts, story, how I work, professor quotes, "Outside the brief", contact) |
| Contact | `/contact/index.html`, `thanks.html` | FormSubmit form to contact@leahcortezstudios.art |
| Card | `/card.html` | Link-in-bio (Portfolio, Behance, Instagram) |
| 404 | `/404.html` | |

The pages from the Home, Work, project and About redesign use `css/v2.css`, `scripts/v2.js` and `body.v2`. Home also loads `scripts/home.js`. Contact and Card still use the older stylesheets.

## Design system (v2)
- Colors: pink `#f8c8d0`, burgundy `#7e1c2e`, cream `#f3ece2`, rose `#f3b2bf`, black background
- Fonts: Surendra (custom typeface, `assets/Surendra-Regular.woff2`) for display, DM Sans for text, DM Mono for labels
- CSS classes use the `lc-` prefix
- Pre-colored brand assets: `images/logo/logo3-pink.png`, `icons/starburst-pink.svg`, `icons/starburst-rose.svg`, `icons/flower-pink.svg`
- Home marquee: Surendra words (Identity, Packaging, Editorial, Type, Posters) with a starburst between each, scrolling left

## Projects (11, in `scripts/gallery-order.json`)
| Order | Project | Slug | Category |
|---|---|---|---|
| 1 | Insane Grain | `insane-grain-packaging` | Packaging |
| 2 | Surendra | `custom-typeface-specimen-poster` | Type |
| 3 | City Reliquary | `City Reliquary` | Identity |
| 4 | Alien Invasion or Sleep Paralysis? | `editorial-spread` | Editorial |
| 5 | Threads | `Threads` | Identity |
| 6 | Space Age | `space-age-wine-packaging` | Packaging |
| 7 | Designer Tribute Zine | `contemporary-contexts-zine` | Editorial |
| 8 | Gulliver's Travels | `paperback-full-cover` | Book cover |
| 9 | Billy Joel Tribute Booklet | `band-tribute-booklet` | Editorial |
| 10 | Historical Poster Styles | `historical-posters` | Posters |
| 11 | Disappearing Species | `endangered-species-poster` | Poster |

`themed-playing-card-design` (Scientific Revolution Deck) is still on disk but removed from the gallery order, so it is not on the site.

The Work filters are Packaging, Type & posters, Identity, Editorial and Illustration. The nav links are Work, About and Contact.

## How project pages are built
1. Edit `collections/design/<slug>/case-study.json`. It holds the title, meta, `card` (thumbnail `src` and `pos`) and `blocks`.
2. Run `node scripts/build-site.js [filter]`. This rewrites each project's `index.html` and `collections/index.html`.
3. Block types: `story` (heading, body, src, ratio, imageSide), `feature` (full-bleed), `gallery` (contained items, max 960px when single), `process`, `quote`.
4. Project images are resized copies in `collections/design/<slug>/images/cs/`. If you edit a source image in `collection/<folder>/`, copy it again.
5. Hero videos are referenced from `collection/…` (Surendra `Hero1.mp4`, City Reliquary `Hero.mp4`, Billy Joel `booklet.mp4`).
6. Thumbnails are `images/cs/thumb.jpg`, all 4:3 (1400×1050) with subjects scaled to a similar size.

Home references thumbnails directly in `index.html` (hero polaroids, Selected work). If a thumbnail changes name, update those too.

## Key files
- `css/v2.css` — all styles for the redesigned pages
- `scripts/build-site.js` — generator for project pages and the Work page
- `scripts/gallery-order.json` — project order
- `scripts/v2.js` — shared behavior (nav, filters, reveal); `scripts/home.js` — Home hero and marquee
- `scripts/main.js` — older shared script (skips floating icons on `.v2` pages)
- `scripts/build-case-studies.js`, `rebuild-case-studies.js`, `css/case-study-v2*.css` — older, unused
- `sitemap.xml`, `robots.txt`, `CNAME` — deployment and SEO

## Housekeeping
- The repo root has handoff folders, zips, `Case study layout design/`, `docs/` and `{}.tmp`. These are not part of the site.
- `sitemap.xml` was not updated as part of the redesign. Check it against the current pages.
- Some Threads source images (e.g. `mockup2.jpg`) are very large, around 10 MB.
- Changes made after commit b2aeeb1 have not been committed.
