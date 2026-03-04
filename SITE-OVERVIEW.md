# Leah Cortez Studios — Complete Site Overview

## About the Artist
**Leah Cortez** — Graphic designer and visual artist based in Corpus Christi, Texas.
- **Education:** BFA Communication Design, Texas A&M University-Corpus Christi (TAMUCC), Class of 2028
- **Website:** leahcortezstudios.art
- **Instagram:** @leahcortez.art
- **Behance:** behance.net/leahcortez1
- **Shopify Store:** leah-cortez-shop.myshopify.com

---

## Site Structure

### Main Pages
| Page | Path | Description |
|------|------|-------------|
| Home | `/index.html` | Hero section, featured works, latest project, bio preview |
| Bio | `/bio/index.html` | Artist statement, how I work, available for commissions |
| Work (Portfolio) | `/collections/index.html` | Masonry grid gallery with category + year filters |
| CV | `/cv/index.html` | Resume/curriculum vitae |
| Contact | `/contact/index.html` | Contact form |
| Commissions | `/commissions/index.html` | Services carousel, pricing info, process |
| Card | `/card.html` | Link-in-bio style page (Portfolio, Commissions, Shop, Instagram) |

---

## Design System

### Color Palette
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Black | `#000000` | `--color-background` | Backgrounds, nav, footer |
| Warm Gold | `#7e1c2e` | `--color-primary-accent` | Accents, buttons, links, borders |
| Pink | `#f8c8d0` | `--color-secondary-accent` | Highlights, hover states |
| White | `#ffffff` | `--color-text` | Body text on dark backgrounds |

### Typography
| Font | CSS Variable | Usage |
|------|--------------|-------|
| Playfair Display | `--font-headings` | Main headings, logo, titles |
| Inter | `--font-body` | Body text, paragraphs |
| IBM Plex Mono | `--font-accent` | Meta info, dates, dimensions, captions |

### Font Sizes
- h1: 3rem (48px)
- h2: 2rem (32px)
- h3: 1.5rem (24px)
- Body: 1rem (16px)
- Meta/Small: 0.875rem (14px)

---

## Portfolio Categories

### 1. Illustration (4 pieces)
| Title | Year | Path |
|-------|------|------|
| Abuela's Altar | 2025 | `/collections/illustration/abuelas-altar/` |
| Anointed Gaze | 2022 | `/collections/illustration/anointed-gaze/` |
| Heaven on Fire | 2022 | `/collections/illustration/heaven-on-fire/` |
| Inheritance | 2025 | `/collections/illustration/inheritance/` |

**Format:** Medium, Year, Dimensions + Project Overview

### 2. Printmaking (4 pieces)
| Title | Year | Dimensions | Technique |
|-------|------|------------|-----------|
| Reliquary Heart | 2025 | 9" × 12" | Linocut |
| The Living Room | 2025 | 11" × 13" | Etching |
| Unbecoming | 2025 | 5" × 7" | Reduction Linocut |
| The Unholy Gaze | 2025 | 7.5" × 10" | Aquatint Etching |

**Format:** Medium, Year, Dimensions + Project Overview

### 3. Objects (4 pieces)
| Title | Year | Path |
|-------|------|------|
| Abyss Bloom | 2025 | `/collections/objects/abyss-bloom/` |
| Feathers Along the Bend | 2025 | `/collections/objects/feathers-along-the-bend/` |
| Gnaw | 2025 | `/collections/objects/gnaw/` |
| Unraveling | 2025 | `/collections/objects/unraveling/` |

**Format:** Medium, Year, Dimensions + Project Overview

### 4. Design (8 pieces in gallery)
| Title | Course | Year | Path |
|-------|--------|------|------|
| Static + Animated Logotype (Threads) | Typography II | 2026 | `/collections/design/Threads/` |
| Brand Identity (City Reliquary) | Design Concepts | 2026 | `/collections/design/City Reliquary/` |
| Designer Tribute Zine + Poster | Design History | 2025 | `/collections/design/contemporary-contexts-zine/` |
| Editorial Spreads | Design Technology | 2025 | `/collections/design/editorial-spread/` |
| Disappearing Species | Design Technology | 2025 | `/collections/design/endangered-species-poster/` |
| Snack Packaging (Insane Grain) | Design Concepts | 2025 | `/collections/design/insane-grain-packaging/` |
| Double-Sided Poster | Typography I | 2024 | `/collections/design/double-sided-poster/` |
| Themed Playing Card Design | Design Concepts | 2024 | `/collections/design/themed-playing-card-design/` |

**Format:** Course/Class, Year + Concept/Design Approach/Result

---

## Page Templates

### Fine Art Work Page (Illustration, Printmaking, Objects)
```html
<div class="work-meta">
    <span class="meta-item"><strong>Medium:</strong> [technique]</span>
    <span class="meta-item"><strong>Year:</strong> [year]</span>
    <span class="meta-item"><strong>Dimensions:</strong> [size]</span>
</div>
<div class="work-description">
    <h2>Project Overview</h2>
    <p>[description]</p>
</div>
```

### Design Work Page
```html
<div class="work-meta">
    <span class="meta-tag">[Course Name]</span>
    <span class="meta-tag">[Year]</span>
</div>
<div class="work-description">
    <h2>Concept</h2>
    <p>[problem statement and goals]</p>
    
    <h3>Design Approach</h3>
    <p>[process, research, execution]</p>
    
    <h3>Result</h3>
    <p>[outcome achieved]</p>
</div>
```

---

## Gallery Features

### Filters
1. **Category Filter** (buttons): All, Illustration, Printmaking, Objects, Design
2. **Year Filter** (dropdown): All Years, 2026, 2025, 2024, Early Work (2021-2022)

### Layout
- **Desktop:** 3-column masonry grid (Masonry.js)
- **Tablet:** 2-column masonry grid
- **Mobile:** 2-column CSS flexbox grid (no masonry)

### Image Galleries
- **Arrow Gallery:** Click-through carousel for multi-image works (uses `gallery-arrows.js`)
- Works with arrow galleries: City Reliquary, Threads, Zine, Editorial Spreads, Endangered Species, Insane Grain

---

## Key JavaScript Files

| File | Purpose |
|------|---------|
| `scripts/main.js` | Navigation, masonry init, filtering, hamburger menu |
| `scripts/gallery-arrows.js` | Arrow navigation for multi-image galleries |
| `scripts/navigation-randomizer.js` | Prev/Next work navigation in gallery order |
| `scripts/portfolio-scroll.js` | Back to Work button functionality |
| `scripts/read-more.js` | Expandable text sections |
| `scripts/page-enhancements.js` | Scroll progress bar, page transitions |

---

## CSS Files

| File | Purpose |
|------|---------|
| `css/styles.css` | Global styles, typography, colors, nav, footer |
| `css/portfolio.css` | Gallery/masonry grid, filters, responsive |
| `css/work.css` | Individual work page layouts |

---

## Navigation Structure

### Main Nav (all pages)
- Home → `index.html`
- Bio → `bio/index.html`
- Work → `collections/index.html`
- CV → `cv/index.html`
- Contact → `contact/index.html`

### Breadcrumbs (work pages)
`Home > Work > [Category] > [Title]`

### Work Navigation (prev/next)
Uses fixed gallery order defined in `scripts/navigation-randomizer.js`

---

## Current Gallery Order (20 pieces)

1. Abuela's Altar (Illustration)
2. Threads (Design)
3. Reliquary Heart (Printmaking)
4. City Reliquary (Design)
5. Anointed Gaze (Illustration)
6. Disappearing Species (Design)
7. The Living Room (Printmaking)
8. Insane Grain (Design)
9. Abyss Bloom (Objects)
10. Designer Tribute Zine (Design)
11. Editorial Spreads (Design)
12. Heaven on Fire (Illustration)
13. Inheritance (Illustration)
14. The Unholy Gaze (Printmaking)
15. Double-Sided Poster (Design)
16. Themed Playing Cards (Design)
17. Unbecoming (Printmaking)
18. Gnaw (Objects)
19. Feathers Along the Bend (Objects)
20. Unraveling (Objects)

---

## Commissions Page Services

1. **Illustration** — Custom digital and traditional illustration
2. **Printmaking** — Etching, aquatint, linocut, reduction prints
3. **Graphic Design** — Branding, editorial design, posters
4. **Charcoal Drawings** — Starting at $300 for 18×24"

---

## External Integrations

- **Shopify:** leah-cortez-shop.myshopify.com (linked from card.html)
- **Formspree/FormSubmit:** Contact form submission
- **Google Fonts:** Pirata One, IM Fell English, IBM Plex Mono
- **GitHub Pages:** Hosting (repo: Leahcortezi/leahcortezstudios.art)

---

## File Naming Conventions

- **Folders:** lowercase with hyphens (`abuelas-altar`, `city-reliquary`)
- **Images:** descriptive names (`mockup.jpg`, `final.jpg`, `design1.jpg`)
- **Design mockups:** `mockup.jpg` (used as gallery thumbnail with square aspect ratio)

---

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| >1024px | Desktop (3-column masonry) |
| 769px-1024px | Tablet (2-column masonry) |
| ≤768px | Mobile (2-column flexbox) |
| ≤480px | Small mobile |

---

## Footer

- **Logo:** `images/logo/logo3.png` (inverted to white via CSS filter)
- **Size:** 30px wide
- **Copyright:** Leah Cortez © 2025

---

## Recent Updates (March 2026)

- Changed "Portfolio" to "Work" across all navigation
- Added year filter dropdown to gallery
- Updated bio to reflect TAMUCC BFA Communication Design, Class of 2028
- Removed quiz from homepage
- Updated all design work to follow Concept/Design Approach/Result format
- Consolidated illustration/printmaking/objects to use Medium/Year/Dimensions + Project Overview
- Fixed mobile gallery to show 2-column flexbox layout (no masonry)
- Updated footer logo to logo3.png (inverted white, 30px)
- Removed historical posters, HUNCH, and Apology from gallery
- Added arrow galleries to multi-image design works
