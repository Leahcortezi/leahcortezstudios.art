# Leah Cortez Studios — Complete Site Overview
**Last Updated:** March 28, 2026

---

## About the Artist

**Leah Cortez** — Chicana artist and designer from Corpus Christi, South Texas.

- **Education:** BFA Communication Design, Texas A&M University–Corpus Christi (TAMUCC), graduating 2028
- **Website:** leahcortezstudios.art
- **Instagram:** @leahcortez.art
- **Behance:** behance.net/leahcortez1

### Artist Statement (from Bio Page)
> I'm Leah Cortez, a Chicana artist and BFA Communication Design student at Texas A&M University–Corpus Christi, graduating in 2028. Creating has always felt like my purpose. When I was little I didn't just play pretend, I made props, designed costumes, and gave every game its own identity. I didn't know it then, but I was already a designer.
>
> Growing up in South Texas, my Mexican heritage, Catholic upbringing, and the streets of downtown Corpus Christi influence everything I make. My personal work explores questions I can't stop thinking about—identity, religion, mental illness, and the uncomfortable or uncanny. I work across graphic design, printmaking, illustration, and mixed media. My work isn't made to please, it's made to linger.

### About This Archive (from Bio Page)
> This archive is a collection of my favorite pieces and a record of how my work continues to grow. I wanted a space where I could share the work that feels most honest to me without the pressure of trying to impress anyone.
>
> Everything here is personally curated. The work is raw, real, and reflective of different moments in my creative life. I see this archive as something that will continue to grow alongside me as I keep experimenting, collaborating, and creating new experiences.

---

## Site Concept

This site is a **Personal Archive**, not a traditional portfolio. The branding emphasizes:
- **Hero text:** "A Personal Archive"
- **Subtitle:** "Not a curated portfolio. Art, design, and everything in between."
- **Tone:** Personal, honest, reflective — not trying to impress anyone

---

## Site Structure

### Main Pages
| Page | Path | Description |
|------|------|-------------|
| Home | `/index.html` | Hero ("A Personal Archive"), Featured section, Recent Addition, About the Artist preview |
| Bio | `/bio/index.html` | Full bio + "About This Archive" section |
| Archive | `/collections/index.html` | Masonry grid gallery with category + year filters |
| CV | `/cv/index.html` | Resume/curriculum vitae |
| Contact | `/contact/index.html` | Contact form |
| Card | `/card.html` | Link-in-bio page (Archive, Behance, Instagram only — no Shop or Commissions) |

### Homepage Sections
1. **Hero** — "A Personal Archive" title, italicized subtitle, "BROWSE ARCHIVE" button
2. **About the Artist** — Short bio preview with photo, "Read Full Bio →" link
3. **Featured** — 3 highlighted works (Abuela's Altar, Inheritance, The Unholy Gaze)
4. **Recent Addition** — Latest project showcase
5. **Recognition** — Testimonials carousel

---

## Design System

### Color Palette
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Black | `#000000` | `--color-background` | Site background |
| White | `#ffffff` | `--color-text` | Body text |
| Pink Blush | `#f8c8d0` | `--color-primary-accent` | Headings, links, buttons, icons |
| Darker Pink | `#e0b0b8` | `--color-secondary-accent` | Secondary elements, borders |
| Burgundy | `#7e1c2e` | (hover state) | Button/link hover color |

### Typography
| Font | Usage |
|------|-------|
| **Libre Baskerville** | Main headings, hero title, section titles |
| **IM Fell English** | Body text, paragraphs, bio text |
| **IBM Plex Mono** | Meta info, dates, dimensions, filter labels, captions |

### Font Sizes
- h1: 3rem (48px)
- h2: 2rem (32px)
- h3: 1.5rem (24px)
- Body: 1rem (16px)
- Meta/Small: 0.875rem (14px)

### Buttons
- **Default:** Pink (#f8c8d0) text/border on black background
- **Hover:** Burgundy (#7e1c2e) text/border
- **CTA Buttons:** Pink background, black text; hover inverts to burgundy

---

## Archive (Gallery)

### Filters
1. **Category Filter** (pill buttons): All Work, Design, Illustration, Printmaking, Sculpture
2. **Year Filter** (dropdown): All Years, 2026, 2025, 2024, Early Work

### Layout
- **Desktop:** 3-column masonry grid
- **Tablet:** 2-column masonry grid
- **Mobile:** 2-column CSS flexbox (no masonry)

### Current Gallery Order (20 pieces)
1. Abuela's Altar (Illustration, 2025)
2. Snack Packaging / Insane Grain (Design, 2025)
3. Inheritance (Illustration, 2025)
4. Editorial Spreads (Design, 2025)
5. The Unholy Gaze (Printmaking, 2025)
6. Designer Tribute Zine (Design, 2025)
7. Anointed Gaze (Illustration, 2022)
8. Threads (Design, 2026)
9. Reliquary Heart (Printmaking, 2025)
10. City Reliquary (Design, 2026)
11. Themed Playing Cards (Design, 2024)
12. Abyss Bloom (Sculpture, 2025)
13. Disappearing Species (Design, 2025)
14. The Living Room (Printmaking, 2025)
15. Heaven on Fire (Illustration, 2022)
16. Feathers Along the Bend (Sculpture, 2025)
17. Unbecoming (Printmaking, 2025)
18. Gnaw (Sculpture, 2025)
19. Unraveling (Sculpture, 2025)
20. Remnants (Sculpture, 2026)

**Note:** Double-Sided Poster was removed from the gallery.

---

## Portfolio Categories

### Illustration (4 pieces)
- Abuela's Altar (2025)
- Inheritance (2025)
- Anointed Gaze (2022)
- Heaven on Fire (2022)

### Printmaking (4 pieces)
- The Unholy Gaze (2025) — Aquatint Etching
- Reliquary Heart (2025) — Linocut
- The Living Room (2025) — Etching
- Unbecoming (2025) — Reduction Linocut

### Design (7 pieces)
- Threads / Static + Animated Logotype (2026)
- City Reliquary / Brand Identity (2026)
- Insane Grain / Snack Packaging (2025)
- Editorial Spreads (2025)
- Designer Tribute Zine (2025)
- Disappearing Species Poster (2025)
- Themed Playing Cards (2024)

### Sculpture (5 pieces)
- Abyss Bloom (2025)
- Gnaw (2025)
- Feathers Along the Bend (2025)
- Unraveling (2025)
- Remnants (2026) — Vermiculite and Cement

**Note:** Sculpture folder path is `collections/objects/` but displayed as "Sculpture" on site.

---

## Work Page Templates

### Fine Art (Illustration, Printmaking, Sculpture)
- **Meta:** Medium, Year, Dimensions
- **Content:** Project Overview paragraph

### Design Work
- **Meta:** Course/Class, Year
- **Content:** Concept → Design Approach → Result

---

## Navigation

### Main Nav
- Home → `index.html`
- Bio → `bio/index.html`
- Archive → `collections/index.html`
- CV → `cv/index.html`
- Contact → `contact/index.html`

### Breadcrumbs (work pages)
`Home > Archive > [Category] > [Title]`

### Work Navigation
- "Back to Archive" button
- Prev/Next navigation follows gallery order (defined in `navigation-randomizer.js`)

---

## Card Page (Link-in-Bio)

Links included:
1. **Archive** — "Explore my creative work"
2. **Behance** — "My portfolio" (behance.net/leahcortez1)
3. **Instagram** — @leahcortez.art

**Removed:** Shop, Commissions

---

## Key Files

### JavaScript
| File | Purpose |
|------|---------|
| `scripts/main.js` | Navigation, masonry, filtering, hamburger menu |
| `scripts/gallery-arrows.js` | Arrow navigation for multi-image galleries |
| `scripts/navigation-randomizer.js` | Prev/Next work navigation in order |
| `scripts/page-enhancements.js` | Scroll progress, page transitions |

### CSS
| File | Purpose |
|------|---------|
| `css/styles.css` | Global styles, typography, colors, nav, footer |
| `css/home.css` | Homepage-specific styles |
| `css/portfolio.css` | Gallery grid, filters |
| `css/work.css` | Individual work page layouts |
| `css/bio.css` | Bio page styles |

---

## External Integrations

- **Behance:** behance.net/leahcortez1
- **Instagram:** @leahcortez.art
- **Contact Form:** FormSubmit
- **Fonts:** Google Fonts (Libre Baskerville, IM Fell English, IBM Plex Mono)
- **Hosting:** GitHub Pages (Leahcortezi/leahcortezstudios.art)

---

## Footer

- **Logo:** `images/logo/logo3.png` (inverted white, 30px)
- **Copyright:** Leah Cortez © [year] — auto-updates via JavaScript

---

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| >1024px | Desktop (3-column masonry) |
| 769px–1024px | Tablet (2-column masonry) |
| ≤768px | Mobile (2-column flexbox) |
| ≤480px | Small mobile |

---

## Recent Updates (March 2026)

- **Site rebranded as "A Personal Archive"** — Changed all "Work" to "Archive", "Portfolio" references removed
- **Hero subtitle:** "Not a curated portfolio. Art, design, and everything in between."
- **Homepage sections:** "Featured" + "Recent Addition"
- **Bio completely rewritten** — Personal tone about South Texas, Mexican heritage, Catholic upbringing
- **"My work isn't made to please, it's made to linger."**
- **"About This Archive" section** — Explains the site as a curated personal collection
- **Gallery reordered** — Strongest work first, mixed mediums
- **Double-Sided Poster removed** from gallery
- **Card page updated** — Removed Shop/Commissions, added Behance

---

## AI Checklist Status (March 2026)

This section maps each suggestion from the external AI audit to current site status.

### Structure / Navigation

| Item | Status | Notes / What to Add |
|------|--------|---------------------|
| Custom 404 page | ✅ Implemented | `404.html` exists, branded styling, links back to Home/Archive/Contact. |
| Site search | ✅ Implemented | Archive page now includes keyword search input on `collections/index.html`, integrated with year/category filters. |
| CV page for broader audiences | ⚠️ Partial | CV is strong for academics; add a short “For Inquiries” block or one-page press sheet link for curators/clients. |

### SEO / Discoverability

| Item | Status | Notes / What to Add |
|------|--------|---------------------|
| Meta descriptions | ✅ Implemented (broadly) | Main pages and many archive/work pages include unique descriptions. Keep auditing new pages. |
| Open Graph tags | ✅ Implemented (broadly) | OG/Twitter tags are present on core pages and many work pages. |
| Image alt text | ⚠️ Partial | Most images include alt text; continue periodic audits for quality/consistency on newly added pages. |
| Unique page titles | ⚠️ Partial | Most pages are unique; update remaining generic labels (e.g., `Work | ...`, `Portfolio | ...`) to archive-first wording. |

### Content Gaps

| Item | Status | Notes / What to Add |
|------|--------|---------------------|
| Artist photo on homepage | ✅ Implemented | Home “About the Artist” preview includes `images/me.jpg`. |
| Testimonials visibility | ✅ Implemented | Recognition carousel includes 3 testimonials with arrows and dots. |
| Bio date/context line | ⚠️ Partial | Bio includes graduation timeline (2028); optionally add availability line (e.g., “available for select projects”). |
| Multi-image work documentation | ⚠️ Partial | Some works have multiple images; standardize 2–4 images (overall + detail + context) for key pieces. |

### Trust / Professionalism

| Item | Status | Notes / What to Add |
|------|--------|---------------------|
| Press/exhibition highlights visible | ⚠️ Partial | Exhibition history exists on CV; add 1–2 highlights on Home for faster trust signals. |
| Contact response-time expectation | ✅ Implemented | Contact page now states: “I typically respond within 2–4 days.” |
| FAQ / commission status | ✅ Implemented | Contact page now includes a dedicated FAQ section plus current commission availability note. |

### Technical

| Item | Status | Notes / What to Add |
|------|--------|---------------------|
| Image optimization/performance | ⚠️ Partial | Lazy loading is used; still beneficial to batch-optimize large originals and generate web-sized derivatives. |
| Analytics | ❌ Missing | Add GA4 or privacy-friendly Plausible to track traffic and page engagement. |
| Favicon | ✅ Implemented | `icons/favicon.ico` is linked on key pages. |
| Form confirmation flow | ✅ Implemented | Contact form now posts to FormSubmit and redirects to `contact/thanks.html`. |

### Priority Implementation Order

1. **Audience clarity:** Add “For Inquiries” section to CV and 1–2 exhibition highlights on Home.
2. **Growth tracking:** Add analytics.
3. **Performance pass:** Optimize archive/work images in batches.
- **Themed Playing Cards images** — Updated to PNG format
- **Copyright auto-updates** via JavaScript
- **Mobile fixes** — Year filter overflow, contact section styling, hero spacing
