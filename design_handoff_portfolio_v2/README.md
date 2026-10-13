# Handoff: Portfolio v2 (Home, Work, Project pages)

Repo: `Leahcortezi/leahcortezstudios.art` (branch `main`). It's a static site on GitHub Pages with global CSS in `css/`, a few vanilla JS files in `scripts/`, and Node build scripts. There's no framework and no npm dependencies.

## Overview

This is a redesign of three parts of Leah Cortez's graphic design portfolio. It's aimed at studios hiring interns and juniors, professors, and freelance clients.

1. **Home** (`index.html`): a "scrapbook" homepage. A giant pink name on black over a stack of polaroids that cycle through the work, a strip of label-maker tags, a stepped "Selected ___ Work" section over a pink starburst, an About folder with tabs, an editorial Surendra type specimen with a live tester, and a "Pinned up" board with professor quotes and a tear-off contact flyer.
2. **Work** (`collections/index.html`): a simple, uniform grid of every project on black, with discipline filters. It is meant to be easy to add work to.
3. **Project / case study** (`collections/design/<folder>/index.html`): an editorial, magazine-style page on black, built from that project's `case-study.json`. Five projects open with a looping MP4 hero.

The **About** page (`bio/index.html`) is not part of this handoff. Leave it as it is for now.

This package **replaces the visual design** in `design_handoff_case_study_template/`, which was cards on black with a pink Overview band. It **keeps that handoff's data idea**: one `case-study.json` per project, `scripts/gallery-order.json` for ordering, and a Node generator. The schema has a few additions, listed below.

## About the design files

The files in `design/` are **design references built in HTML**. They're prototypes that show the intended look and behaviour, not production code to copy. They run on a design-tool runtime (`support.js`), use inline styles everywhere, and use `{{ }}` template holes with a JS logic class. **None of that belongs in the site.**

The task is to **recreate these designs in the site's existing environment**: plain static HTML, a class-based stylesheet in `css/`, small vanilla JS files, and a Node generator in `scripts/`. Every exact value (colour, size, spacing, easing) is inline in the prototype markup, so when this README and the prototype disagree, **the prototype's inline values win**.

**To preview the prototypes:**
1. Copy `data/` over the repo root. It mirrors repo paths.
2. Copy the four files from `design/` into the repo root. They use repo-relative asset paths.
3. Serve the repo root over HTTP, for example `npx serve .`. The project page uses `fetch()`.
4. Open `Home.dc.html`. Project pages open as `Project.dc.html?p=<folder>`.

Home has a bottom-left switcher (1a / 1b / 2a). **Ship 2a "Scrapbook" only.** 1a and 1b are earlier explorations.

## Fidelity

**High-fidelity.** Colours, type, spacing, layout and interactions are final. Recreate them exactly.

## Design tokens

| Token | Value | Use |
|---|---|---|
| Black | `#000000` | Page background, hero plates |
| Board black | `#111111` (+ grain) | Home "Pinned up" section |
| Pink | `#f8c8d0` | Display type on black, labels on black, rules, pills, pink sections |
| Starburst pink | `#f3b2bf` | Home starburst only |
| Burgundy | `#7e1c2e` | Labels and hover on light grounds, drop caps on light grounds |
| Cream paper | `#f3ece2` (+ grain) | Home "Selected work" section |
| Folder cream / tab | `#f1e8da` / `#d7c9b5` | Home About folder |
| Index card | `#f7f1e8`, header line `#e9a3b1`, rules `rgba(126,28,46,.16)` every 32px | Home quotes |
| Text on black | `#fff`; secondary `rgba(255,255,255,.78)`; captions `rgba(255,255,255,.64)`; running heads `rgba(255,255,255,.6)` | |
| Rules on black | strong `rgba(248,200,208,.55)`; hairline `rgba(248,200,208,.24)` | |
| Text / rules on light | `#000`; secondary `rgba(0,0,0,.66)` | |
| Grain | `images/grain.svg` (in `assets/`) as `background-image` over a `background-color` | Paper, pink and board textures |

**Fonts**
- **Surendra** (`assets/Surendra-Regular.woff2`, Leah's own typeface, weight 400): all display type. It has **no** curly quotes, en/em dashes, `@ # + * · •`, arrows or accented letters, so use straight quotes in Surendra text. Keep the dash and middot characters in DM Mono or DM Sans.
- **DM Sans** (Google, 400–700): body text.
- **DM Mono** (Google, 400/500): all small labels, captions, running heads, buttons and tags. Add `family=DM+Mono:wght@400;500` to the Google Fonts link.

**Type scale**
- Display: Home name `16.6cqw/.8`; "Selected ___ Work" and "All ___ Work" `10.4cqw/.9`; "Surendra" `21.41cqw/.8`. The `cqw` values are relative to the 1360px content container, so set `container-type: inline-size` on it.
- Project title `clamp(60px,11vw,176px)/.86`.
- h2 `clamp(36px,4.4vw,68px)/.95`.
- Standfirst `clamp(28px,3vw,44px)/1.12`.
- Body DM Sans `17px/1.7`.
- Labels DM Mono `500 12px/1.3`, letter-spacing `.08em`, uppercase.
- Captions DM Mono `500 11.5px/1.5`, letter-spacing `.04em`.

**Layout**
- Content container: max-width 1360px, side padding `clamp(20px,4vw,56px)`.
- Block spacing: `clamp(88px,10vw,152px)`.
- Radius: 0 on all media; 999px on pills only.

## Shared components

**Header (every page).**
- Sticky, black, 72px tall, `1px solid rgba(248,200,208,.24)` bottom border.
- Left: the logo mark `images/logo/logo3.png`, used as a CSS mask filled `#f8c8d0` at 28×36. Next to it, "Leah Cortez Studios" in DM Mono 12px pink (≥760px only).
- Nav, in this order: **Home, About, Work, Contact** (Contact goes to `#contact`).
  - Links: Surendra `clamp(13px,1.2vw,17px)`, uppercase, `.06em`.
  - Inactive links have pink left and right borders only (1.5px, radius 999), which reads as "( Work )". Padding `8px 14px`, or `6px 8px` under 760px.
  - The current page is a filled pink pill with black text.
  - Hover: 2px underline, offset 6px.
- At ≥980px, a status pill "Open to internships": 1px border `rgba(248,200,208,.45)`, DM Sans 600 11px `.14em`, with a 7px pink dot pulsing opacity 1 → .2 → 1 over 2.4s.
- Below 760px, use the site's existing hamburger behaviour.

**Contact (Work and Project pages).**
- Black background, top hairline.
- Label "Open to internships + freelance", then h2 "Hiring a design intern?" in pink Surendra `clamp(48px,7.2vw,120px)/.92`.
- Email `contact@leahcortezstudios.art` in DM Mono, underlined.
- Line: "Or have a project in mind? Tell me a little about it. I usually reply within 2–4 days."
- Pills: Instagram, Behance (pink outline) and Resume ↗ (filled pink).
- Pill hover: burgundy background, `translateY(-2px)`, `.3s ease`.

**Footer.** Top hairline. Logo mark 24×32, "Leah Cortez © 2026", "Headings set in Surendra, a typeface I designed.", and "Back to top".

## Screens

### 1. Home (`design/Home.dc.html`, direction 2a)

Top to bottom:

1. **Hero** (black, overflow hidden).
   - "Leah Cortez" centred, nowrap, pink Surendra at `16.6cqw`.
   - Below it, centred, a stack of three polaroids, `min(400px,62cqw)` wide, starting just below the name's baseline.
   - **Front polaroid:** `#fbfaf6`, padding `12px 12px 0`, square image, caption strip `clamp(72px,6.8cqw,86px)` tall. The strip holds the title (Surendra), "discipline, year" (DM Mono 10.5px) and a counter "01 / 06".
   - It is a link to that project. Its rotation changes per slide: `[-2.2, 1.6, -1.2, 2.2, -1.6, 1.1]` deg, over `.7s cubic-bezier(.2,.7,.2,1)`. Images crossfade over `.6s`.
   - **Two back polaroids** show the next two projects, at `translate(-30%,7%) rotate(-8deg)` and `translate(30%,4%) rotate(7deg)`.
   - A CSS paper clip (silver `#cfcfd6` 3px wire loops) sits over the front polaroid's top edge.
   - Corner labels "Graphic designer" and "Portfolio 2026" sit at the bottom (DM Mono 12px white). Under 760px they move to a row above the name.
   - The six projects cycled: Insane Grain, Surendra, City Reliquary, Alien Invasion, Threads, Space Age.
2. **Label-maker strip.**
   - Pink and grain, 2px black rules top and bottom.
   - Four black "embossed tape" tags, centred and wrapping: **Graphic designer · BFA Communication Design, class of 2028 · Corpus Christi, Texas · Open to internships + freelance**.
   - Tag style: gradient `#2a2a2a → #111 → #0a0a0a`, pink DM Mono `clamp(12px,1.1vw,15px)` with `.16em` tracking. Rotations −2°, 1.5°, −1° and 2°.
3. **Selected ___ Work** (`#work`, cream paper).
   - Heading "SELECTED ____ WORK" with a black rule between the words.
   - Four projects in a stepped row: margin-tops `12cqw / 0 / 5.5cqw / 14cqw` at 4 columns (≥1000px), `9cqw / 0` alternating at 2 columns (≥640px), none at 1 column.
   - Each project has a label stack: number, Surendra title, "disc, year", "[ View project ↗ ]". Below it, a 4:3 image.
   - Hover: title turns burgundy, the image lifts 6px and zooms to 1.05.
   - Behind everything, `icons/starburst.svg` as a mask filled `#f3b2bf`, `84cqw` wide, centred, `bottom:-40cqw`, rotating 360° over 180s linear (still under reduced motion).
   - Footer row: "Also in the archive: Threads, Space Age, Designer Tribute Zine, Gulliver's Travels" and a black pill "All 12 projects".
4. **About folder** (`#about`, black background).
   - A cream folder with three tabs: **About me / How I work / What I do**.
   - Tabs are trapezoids (`perspective(90px) rotateX(9deg)`, radius 18 18 0 0), at 3% / 37% / 71% left, 26% wide.
   - The active tab is `#f1e8da`, top 22px, 50px tall. Inactive tabs are `#d7c9b5`, top 0, 72px tall, behind the folder body. Transition `.35s`.
   - **About me:**
     - `images/me.jpg` in a pink mat (`#f3b3c0`, rotated −3°) held by a CSS binder clip, captioned "Me, First Holy Communion".
     - Beside it, a "About me · Corpus Christi, Texas" label row, then "Hi, I'm Leah." in Surendra `clamp(64px,8.4vw,136px)/.84`.
     - Two paragraphs; the first starts with a burgundy Surendra drop cap.
     - A facts list: Studying / Graduating / Based in / Open to.
     - "[ More about me ]".
   - **How I work:** "From a feeling to a system.", four numbered steps (Research, Experiment, Build a language, Refine), and a David Shields quote.
   - **What I do:** four disciplines with links to their projects, "By hand" and "Also" lists, and a Resume pill.
5. **Surendra** (pink and grain).
   - Label row: Typeface · Surendra Regular · Drawn from wood + metal type · 2026.
   - A giant full-width "Surendra".
   - "You're reading it right now." next to a short paragraph.
   - "Type anything": a borderless input in Surendra `clamp(64px,13vw,210px)`, default "Made to linger", burgundy caret.
   - The character set, and a "See the specimen ↗" pill.
6. **Pinned up** (`#contact`, `#111` and grain).
   - "Pinned up" in pink Surendra.
   - Three index cards with pink tape and short professor quotes, from Joe Peña, David Shields and Ian Manseau. The prototype has the exact copy.
   - A pink flyer with a black push pin: "Hiring a design intern?", the email, and four **tear-off tabs** (Email, Instagram, Behance, Resume) with vertical text.
7. **Footer.**

### 2. Work (`design/Work.dc.html`)

- Black page.
- "ALL ____ WORK" in pink.
- "Identities, packaging, publications, posters and one typeface." beside an auto summary, "12 projects · 2024–2026", computed from the data.
- **Filter pills**, built automatically from every project's `tags`, with "All" first and a count on each. Style: DM Mono, 1.5px pink outline; the selected pill is filled pink.
- **Grid:** `repeat(auto-fill, minmax(min(100%,320px), 1fr))`, which gives 3 / 2 / 1 columns. Gap `clamp(48px,5vw,72px) clamp(16px,2vw,28px)`.
- **Card:** 4:3 cover image, "No. · disc, year" row, pink Surendra title, one-line teaser, "[ View project ↗ ]".
- Card hover: the title turns white, the image lifts 6px and zooms to 1.05.
- An "Outside the brief" link row to `bio/index.html#studio`, then Contact and the footer.

### 3. Project (`design/Project.dc.html`)

Black page. Everything comes from `case-study.json`. A field that's empty renders nothing.

1. **Running head:** a 2px pink rule over a 1px rule. It reads "[ ← All work ]" · "Case study No. NN" (position in `gallery-order.json`) · "Category · Year".
2. **Title:** pink Surendra `clamp(60px,11vw,176px)/.86`, balanced.
3. **Hero plate:** full container width, `#000` background.
   - **Video** if `hero.src` ends in `.mp4`, `.webm` or `.mov`: `autoplay muted loop playsinline`, `poster` = `hero.poster`, no controls.
   - Under `prefers-reduced-motion: reduce`, don't autoplay; show the poster.
   - **Frame ratio:** the media's own ratio if it's 1.45 or wider (`object-fit: cover`). Otherwise 16:9 with `object-fit: contain` on black. For videos, read `videoWidth/videoHeight` on `loadedmetadata`.
4. **Standfirst and credits** on a 12-column grid. `summary` in Surendra spans columns 1–8. The `meta` pairs sit in columns 10–12 (DM Mono pink label over a DM Sans value, hairlines between). Drop the "Year" pair, because the year is in the running head.
5. **01 — The story:** `overview` set as magazine copy across two CSS columns (one under 1000px).
   - Each part has a small pink DM Mono head: challenge → "The brief", solution → "The idea", outcome → "The result".
   - The first paragraph starts with a pink Surendra drop cap (`4.4em/.74`, floated).
   - Sidebar (columns 10–12): a pull quote in pink Surendra under a 2px pink rule. Use the project's `quote` block if there is one, with its `label` as the credit. Otherwise use the outcome.
6. **Blocks, in JSON order** (quote blocks are already used in the sidebar). Each block opens with a section head: "NN — Label" on the left and the project title on the right, over a 1px pink rule. Numbers continue from 02, and leading numbers in data labels are ignored.
   - **story:** heading and body in 4 columns, figure in 7, alternating sides.
   - **process:** with 3 steps, one large image (columns 1–7, both rows) beside two stacked; with 2 steps, a 6/6 split. Square-ish crops.
   - **feature:** full-bleed 2:1 image (min-height 320px).
   - **gallery:** a justified row where each item's `flex-grow` = width/height, so the row shares one height. Min-width 240px; a single item is capped at 960px.
   - Every figure gets a running caption: "Fig. 01 — caption".
7. **Next story:**
   - A rule row with "[ ← Previous title ]" and "[ All work ]".
   - "Next story →" with the next title in pink Surendra `clamp(56px,9vw,150px)`.
   - Order comes from `gallery-order.json` and wraps around.
8. **Contact, footer.**

## Interactions & behaviour

- **Home polaroids:** advance every 3.4s. Pause on hover or focus, when the tab is hidden, and under reduced motion. The front polaroid links to the current project.
- **Folder tabs:** clicking a tab makes it active. Use `role="tablist"` / `tab` / `tabpanel` and `aria-selected`.
- **Type tester:** a live text input. That's all.
- **Tear-off tabs:**
  - On click, the tab animates `translateY(56px) rotate(-9deg | 11deg)` and fades to opacity 0 over `.55s cubic-bezier(.3,.6,.3,1)`, then comes back after 2.6s.
  - The link still fires: email opens in the same tab, the others in a new tab.
- **Work filters:** client-side show/hide. Numbers stay tied to each project's position in the full list.
- **Hover:** images lift 6px over `.5s cubic-bezier(.2,.7,.2,1)` and zoom over `1s`. Text colour transitions `.25s`. Pills lift 2px over `.3s`.
- **Responsive:** layouts are intrinsic (flex-wrap and auto-fit). The 12-column grids collapse to one column under 760px. Check at 1440, 1024, 768 and 390px.
- **Reduced motion:** stop autoplay, the starburst spin, the polaroid cycle and the pulse.

## Data: `case-study.json` (one per project)

Same as the schema in `design_handoff_case_study_template/README.md`, plus these additions:

```jsonc
{
  "title": "…", "category": "…", "year": "2025",
  "tags": ["Packaging"],                     // NEW: Work filters (a new tag makes a new filter)
  "card": { "src": "images/cs/hero.jpg", "pos": "50% 50%", "disc": "Packaging", "teaser": "…" },  // NEW: Work card
  "summary": "…",
  "meta": [["Role","…"],["Tools","…"],["Year","2025"],["Deliverables","…"]],
  "hero": { "src": "images/cs/hero.jpg" | "…/Hero.mp4", "poster": "…jpg", "alt": "…", "ratio": "1600/1066", "pos": "50% 50%" },  // NEW: video by extension + poster, pos
  "overview": { "challenge": "…", "solution": "…", "outcome": "…" },
  "blocks": [
    { "type": "story" | "feature" | "gallery" | "process", … },  // as before
    { "type": "quote", "label": "Why this topic", "text": "…" }  // NEW: becomes the story's pull quote
  ]
}
```

All paths are relative to the project folder. Process images and the MP4 heroes live under `collection/…` at the repo root, so they use `../../../collection/…`.

`data/` contains all 12 files plus `scripts/gallery-order.json`, ready to drop into the repo.

## Implementation plan

1. **CSS:** add `css/v2.css` with the tokens and components above, using `lc-` class prefixes. Link it after `styles.css`. Watch the global rules in `styles.css`:
   - `h1–h6` are pink `!important`.
   - Every `<nav>` is styled as the site bar.
   - `img { height:auto }`.
   - `p { margin-bottom:1rem }`, shrinking at ≤768px.
   Scope resets under a `.v2` body class, as the previous handoff did for `.cs-page`.
2. **Assets:** copy `assets/images/grain.svg` to `images/grain.svg`. Add DM Mono to the Google Fonts link. Everything else (images, icons, logo, Surendra) is already in the repo.
3. **Data:** copy `data/` over the repo root.
4. **Generator:** add `scripts/build-site.js` (Node, no dependencies). It reads `gallery-order.json` and every `case-study.json`, then writes:
   - `collections/design/<folder>/index.html` for each project, with `<title>{title} · Leah Cortez</title>` and `<meta name="description" content="{summary}">`;
   - `collections/index.html`, the Work grid with cards and filter pills.
   Prev/next links are computed at build time. Keep the `prev-work` / `next-work` classes so `main.js` arrow-key navigation still works.
5. **Guard the old generator:** `scripts/rebuild-case-studies.js` rewrites any page with `class="case-study-page"`. Make it skip folders that have a `case-study.json`.
6. **Home:** rebuild `index.html` as 2a by hand. Add `scripts/home.js` for the polaroid cycle, tabs and tear-off tabs. Point project links at `collections/design/<folder>/index.html`.
7. **Adding a project later:**
   1. Create `collections/design/<new>/` with `images/cs/…` and a `case-study.json`.
   2. Add `<new>` to the top of `gallery-order.json`.
   3. Run `node scripts/build-site.js`.
8. **Verify** at 1440, 1024, 768 and 390px. Also confirm keyboard focus on every link and pill, and that video heroes autoplay muted on iOS Safari (`playsinline`).

## Copy to confirm with Leah

- The project summaries and Challenge / Solution / Outcome lines were tightened from her live case study text. She should read every `case-study.json`.
- Insane Grain's "Role: Brand & packaging design" is a guess. Role and Tools only appear where her pages listed them.
- The playing card deck has no Outcome, because her page only had placeholder text there.
- The CV page uses `hello@leahcortezstudio.art`, which is missing the "s" in the domain. The new pages use `contact@leahcortezstudios.art`. Confirm which address is right. `og:url` on several pages has the same missing "s".

## Files in this bundle

- `design/Home.dc.html`, `design/Work.dc.html`, `design/Project.dc.html`: hi-fi prototypes, where every exact value is inline.
- `design/support.js`: the prototype runtime. Only needed to preview; don't ship it.
- `data/collections/design/*/case-study.json` (12) and `data/scripts/gallery-order.json`: production-ready content.
- `assets/images/grain.svg`: the paper grain texture (new).
- `screenshots/`: viewport captures at 924px wide, in scroll order.
  - `02–08-home.jpg`: Home 2a.
  - `02–04-work.jpg`: Work.
  - `02–08-project-insane-grain.jpg`: a project with an image hero.
  - `02–06-project-alien-invasion.jpg`: a project with a video hero, shown as its poster.
  These are a visual guide only, and they come from a DOM re-render. Where they disagree with the prototypes, the prototypes win.
