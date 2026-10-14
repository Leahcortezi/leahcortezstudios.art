#!/usr/bin/env node
/*
  build-site.js: generates the Work page and every project page from data.
  No dependencies. Run from anywhere:

      node scripts/build-site.js            # Work page + every project page
      node scripts/build-site.js Threads    # only projects whose folder contains "Threads"

  Reads
    scripts/gallery-order.json                      the order of all projects (first = newest)
    collections/design/<folder>/case-study.json     one per project

  Writes
    collections/design/<folder>/index.html          the project page
    collections/index.html                          the Work grid + filter pills

  The Home page (index.html) is written by hand. See design_handoff_portfolio_v2/README.md.

  To add a project:
    1. Create collections/design/<new>/ with images/cs/... and a case-study.json
    2. Add "<new>" to the TOP of scripts/gallery-order.json
    3. node scripts/build-site.js
*/
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DESIGN = path.join(ROOT, 'collections', 'design');
const SITE = 'https://leahcortezstudios.art';
const YEAR = new Date().getFullYear();

/* ---------- helpers ---------- */

const has = (v) => typeof v === 'string' ? v.trim() !== '' : v != null;
const pad = (n) => String(n).padStart(2, '0');
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Surendra has no curly quotes, so text set in it uses straight ones.
const md = (t) => esc(t).replace(/\*([^*]+)\*/g, '<em>$1</em>');
const straight = (s) => String(s == null ? '' : s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
const isVideo = (u) => /\.(mp4|webm|mov)([?#]|$)/i.test(u || '');
const strip = (t) => String(t || '').replace(/^\s*\d+\s*[\u2014\u2013-]\s*/, '');
const safeDecode = (s) => { try { return decodeURIComponent(s); } catch (e) { return s; } };
// "a b/c%20d" -> "a%20b/c%20d" (each segment decoded then encoded, so input may be either form)
const enc = (p) => p.split('/').map((s) => (s === '..' || s === '.' || s === '' ? s : encodeURIComponent(safeDecode(s)))).join('/');

function ratioParts(r) {
  const m = String(r || '').match(/^\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

function imageSize(file) {
  let buf;
  try { buf = fs.readFileSync(file); } catch (e) { return null; }
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m === 0xff) { i++; continue; }
      if (m === 0x01 || (m >= 0xd0 && m <= 0xd9)) { i += 2; continue; }
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

const cssVersion = (() => {
  try { return crypto.createHash('md5').update(fs.readFileSync(path.join(ROOT, 'css', 'v2.css'))).digest('hex').slice(0, 8); }
  catch (e) { return '1'; }
})();

const warnings = [];
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

/* ---------- shared page shell ---------- */

function pageHead({ title, desc, root, url, image }) {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `  <title>${esc(title)}</title>`,
    has(desc) ? `  <meta name="description" content="${esc(desc)}">` : '',
    `  <meta property="og:title" content="${esc(title)}">`,
    has(desc) ? `  <meta property="og:description" content="${esc(desc)}">` : '',
    '  <meta property="og:type" content="website">',
    url ? `  <meta property="og:url" content="${esc(url)}">` : '',
    image ? `  <meta property="og:image" content="${esc(image)}">` : '',
    `  <link rel="icon" href="${root}icons/favicon.ico">`,
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..500&family=DM+Mono:wght@400;500&display=swap">',
    `  <link rel="stylesheet" href="${root}css/v2.css?v=${cssVersion}">`,
    '</head>',
  ].filter(Boolean).join('\n');
}

function header(root, current) {
  const li = (href, label, key) => `        <li><a href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `  <header class="lc-header">
    <div class="lc-header-in">
      <a class="lc-brand" href="${root}index.html" aria-label="Leah Cortez, home">
        <span class="lc-mark" aria-hidden="true"></span>
        <span class="lc-brand-name">Leah Cortez Studios</span>
      </a>
      <nav class="lc-nav" aria-label="Main">
        <ul class="nav-links lc-nav-links">
${li(root + 'index.html', 'Home', 'home')}
${li(root + 'bio/index.html', 'About', 'about')}
${li(root + 'collections/index.html', 'Work', 'work')}
${li('#contact', 'Contact', 'contact')}
        </ul>
        <span class="lc-status"><span class="lc-pulse" aria-hidden="true"></span>Open to internships</span>
        <button type="button" class="hamburger lc-burger" aria-label="Open navigation menu"><span aria-hidden="true"></span></button>
      </nav>
    </div>
  </header>`;
}

function contactAndFooter() {
  return `  <section id="contact" class="lc-contact">
    <p class="lc-label">Open to internships + freelance</p>
    <h2>Hiring a design intern?</h2>
    <div class="lc-contact-row">
      <a class="lc-email" href="mailto:contact@leahcortezstudios.art">contact@leahcortezstudios.art</a>
      <p class="lc-contact-line">Or have a project in mind? Tell me a little about it. I usually reply within 2\u20134 days.</p>
    </div>
    <div class="lc-pills">
      <a class="lc-pill" href="https://www.instagram.com/leahcortez.art" target="_blank" rel="noopener">Instagram</a>
      <a class="lc-pill" href="https://www.behance.net/leahcortez1" target="_blank" rel="noopener">Behance</a>
    </div>
  </section>

  <footer class="lc-footer">
    <div class="lc-footer-in">
      <div class="lc-footer-brand">
        <span class="lc-mark lc-mark--sm" aria-hidden="true"></span>
        <span class="lc-footer-text">Leah Cortez \u00A9 ${YEAR}</span>
      </div>
      <span class="lc-footer-text">Headings set in Surendra, a typeface I designed.</span>
      <a class="lc-totop" href="#top">Back to top</a>
    </div>
  </footer>`;
}

const scripts = (root) => `<script src="${root}scripts/main.js" defer></script>\n<script src="${root}scripts/v2.js" defer></script>`;

/* ---------- project page ---------- */

function renderProject(slug, d, order, all) {
  const dir = path.join(DESIGN, slug);
  const root = '../../../';
  const where = slug;
  const idx = order.indexOf(slug);
  const prevSlug = order[(idx - 1 + order.length) % order.length];
  const nextSlug = order[(idx + 1) % order.length];
  const prevTitle = (all[prevSlug] && all[prevSlug].title) || 'Previous';
  const nextTitle = (all[nextSlug] && all[nextSlug].title) || 'Next project';
  const projHref = (s) => `${root}collections/design/${enc(s)}/index.html`;

  const url = (src) => {
    if (!has(src)) return '';
    if (/^(https?:)?\/\//.test(src)) return src;
    if (!fs.existsSync(path.join(dir, safeDecode(src)))) warn(where, `file not found: ${src}`);
    return enc(src);
  };
  const ratioOf = (item) => {
    const p = ratioParts(item.ratio);
    if (p) return p;
    if (has(item.src) && !isVideo(item.src)) {
      const s = imageSize(path.join(dir, safeDecode(item.src)));
      if (s) return [s.w, s.h];
    }
    return [3, 2];
  };
  const alt = (item, label) => { if (!has(item.alt)) warn(where, `missing alt text on ${label}`); return esc(item.alt || ''); };

  let fig = 0;
  const F = (c) => `Fig. ${pad(++fig)}${has(c) ? ' \u2014 ' + c : ''}`;

  // ----- hero
  const hero = d.hero || {};
  if (!has(hero.src)) warn(where, 'hero.src is missing');
  const hp = ratioParts(hero.ratio) || [16, 9];
  const wide = hp[0] / hp[1] >= 1.45;
  const heroStyle = `--ar: ${wide ? hp[0] + ' / ' + hp[1] : '16 / 9'}; --fit: ${wide ? 'cover' : 'contain'}; --pos: ${esc(hero.pos || '50% 50%')}`;
  let heroMedia = '';
  if (has(hero.src)) {
    heroMedia = isVideo(hero.src)
      ? `<video src="${url(hero.src)}"${has(hero.poster) ? ` poster="${url(hero.poster)}"` : ''} autoplay muted loop playsinline preload="metadata" aria-label="${alt(hero, 'hero')}" data-lc-hero></video>`
      : `<img src="${url(hero.src)}" alt="${alt(hero, 'hero')}" fetchpriority="high">`;
  }
  const meta = (d.meta || []).filter(([k, v]) => k !== 'Year' && has(v));
  const metaHtml = meta.length
    ? `\n      <dl class="lc-credits">\n${meta.map(([k, v]) => `        <div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n')}\n      </dl>`
    : '';

  const headerBlock = `    <header class="lc-proj-head">
      <div class="lc-runhead lc-label">
        <a class="all-work" href="${root}collections/index.html">[ \u2190 All work ]</a>
        <span>Case study No. ${pad(idx + 1)}</span>
        <span>${esc([d.categoryFull || d.category, d.year].filter(has).join(' \u00B7 '))}</span>
      </div>
      <h1 class="lc-title">${esc(straight(d.title))}</h1>
      <figure class="lc-hero">
        <div class="lc-hero-frame" style="${heroStyle}">
          ${heroMedia}
        </div>
      </figure>
      <div class="lc-g12 lc-deck-grid">
        <p class="lc-deck">${md(straight(d.summary || ''))}</p>${metaHtml}
      </div>
    </header>`;

  // ----- 01 the story
  const ov = d.overview || {};
  const HEADS = { challenge: 'The brief', solution: 'The idea', outcome: 'The result' };
  const fd = Array.isArray(d.finalDesign) ? d.finalDesign.filter(has) : [];
  const ovText = Array.isArray(ov.text) ? ov.text.filter(has) : [];
  const dels = Array.isArray(d.deliverables) ? d.deliverables.filter(has) : [];
  const newStyle = ovText.length > 0;
  const keys = newStyle ? ['text'] : ['challenge', 'solution', 'outcome'].filter((k) => has(ov[k]));
  const qb = (d.blocks || []).find((b) => b.type === 'quote');
  const lastFd = fd.length ? fd[fd.length - 1] : '';
  const pull = qb ? qb.text : (has(d.pull) ? d.pull : (newStyle ? (lastFd.split(/(?<=[.!?])\s+/)[0] || d.summary) : (ov.outcome || d.summary || '')));
  const secHead = (no, label) => `<div class="lc-sechead"><span>${no} \u2014 ${esc(label)}</span><span>${esc(straight(d.title))}</span></div>`;

  let storyHtml = '';
  if (keys.length) {
    const paras = newStyle ? ([
      `          <div class="lc-para">\n            <span class="lc-para-head">Overview</span>\n${ovText.map((t, i) => `            <p>${i === 0 ? `<span class="lc-dropcap">${esc(Array.from(t)[0])}</span>${md(Array.from(t).slice(1).join(''))}` : md(t)}</p>`).join('\n')}\n          </div>`,
      dels.length ? `          <div class="lc-para">\n            <span class="lc-para-head">Deliverables</span>\n            <ul class="lc-list">\n${dels.map((t) => `              <li>${md(t)}</li>`).join('\n')}\n            </ul>\n          </div>` : ''
    ].filter(Boolean).join('\n')) : keys.map((k, i) => {
      let body;
      if (i === 0) {
        const chars = Array.from(ov[k]);
        body = `<span class="lc-dropcap">${esc(chars[0])}</span>${esc(chars.slice(1).join(''))}`;
      } else body = esc(ov[k]);
      return `          <div class="lc-para">\n            <span class="lc-para-head">${HEADS[k]}</span>\n            <p>${body}</p>\n          </div>`;
    }).join('\n');
    storyHtml = `    <section class="lc-sec">
      ${secHead('01', 'The story')}
      <div class="lc-g12 lc-story-grid">
        <div class="lc-story-body">
${paras}
        </div>
        <aside class="lc-pull">
          <p class="lc-pull-text">"${esc(straight(pull))}"</p>${qb && has(qb.label) ? `\n          <p class="lc-pull-by">${esc(qb.label)}</p>` : ''}
        </aside>
      </div>
    </section>`;
  }

  // ----- blocks
  let sec = keys.length ? 1 : 0;
  let side = 'right';
  const DEF = { story: 'Story', feature: 'Final', gallery: 'Gallery', process: 'Process' };
  const blockHtml = (d.blocks || []).filter((b) => b.type !== 'quote').map((b) => {
    sec += 1;
    const no = pad(sec);
    const label = strip(b.label) || DEF[b.type] || '';
    const head = secHead(no, label);

    if (b.type === 'story') {
      const sd = b.imageSide || side;
      side = sd === 'right' ? 'left' : 'right';
      const [w, h] = ratioOf(b);
      const textCol = sd === 'right' ? '1 / span 4' : '9 / span 4';
      const figCol = sd === 'right' ? '6 / span 7' : '1 / span 7';
      const copy = [has(b.heading) ? `          <h2 class="lc-h2">${esc(straight(b.heading))}</h2>` : '', has(b.body) ? `          <p class="lc-body">${esc(b.body)}</p>` : ''].filter(Boolean).join('\n');
      if (!has(b.src)) warn(where, `story "${label}" has no image`);
      return `    <section class="lc-sec">
      ${head}
      <div class="lc-g12 lc-block-grid">
        <div class="lc-block-copy" style="--col: ${textCol}; --row: 1; --align: ${sd === 'right' ? 'start' : 'end'}">
${copy}
        </div>
        <figure class="lc-fig" style="--col: ${figCol}; --row: 1">
          <div class="lc-fig-frame" style="--ar: ${w} / ${h}"><img src="${url(b.src)}" alt="${alt(b, 'story "' + label + '"')}" loading="lazy"></div>
          <figcaption class="lc-cap">${esc(F(b.caption))}</figcaption>
        </figure>
      </div>
    </section>`;
    }

    if (b.type === 'process') {
      const st = b.steps || [];
      const k = st.length;
      const figs = st.map((x, j) => {
        let col = '1 / -1', row = 'auto', big = false;
        if (k === 3) { if (j === 0) { col = '1 / span 7'; row = '1 / span 2'; big = true; } else { col = '8 / span 5'; row = String(j); } }
        else if (k === 2) { col = j === 0 ? '1 / span 6' : '7 / span 6'; row = '1'; }
        else if (k > 3) col = `span ${k === 4 ? 3 : 4}`;
        const cap = F([x.title, x.caption].filter(has).join(', '));
        return `        <figure class="lc-fig" style="--col: ${col}; --row: ${row}">
          <div class="lc-fig-frame${big ? ' lc-fig-frame--fill' : ''}" style="--ar: 4 / 3"><img src="${url(x.src)}" alt="${alt(x, 'process step ' + (j + 1))}" loading="lazy"></div>
          <figcaption class="lc-cap">${esc(cap)}</figcaption>
        </figure>`;
      }).join('\n');
      return `    <section class="lc-sec">
      ${head}${has(b.heading) ? `\n      <h2 class="lc-h2 lc-h2--lg">${esc(straight(b.heading))}</h2>` : ''}
      <div class="lc-g12 lc-process">
${figs}
      </div>
    </section>`;
    }

    if (b.type === 'feature') {
      return `    <section class="lc-feature">
      <div class="lc-wrap">${head}</div>
      <div class="lc-feature-media"><img src="${url(b.src)}" alt="${alt(b, 'feature "' + label + '"')}" loading="lazy"></div>
      <div class="lc-feature-cap lc-cap">${esc(F(b.caption))}</div>
    </section>`;
    }

    if (b.type === 'gallery') {
      const items = b.items || [];
      const figs = items.map((it, j) => {
        const [w, h] = ratioOf(it);
        const grow = parseFloat((w / h).toFixed(3));
        return `        <figure class="lc-fig" style="--grow: ${grow}${items.length === 1 ? '; --max: 960px' : ''}">
          <div class="lc-fig-frame" style="--ar: ${w} / ${h}"><img src="${url(it.src)}" alt="${alt(it, 'gallery item ' + (j + 1))}" loading="lazy"></div>
          <figcaption class="lc-cap">${esc(F(it.caption))}</figcaption>
        </figure>`;
      }).join('\n');
      return `    <section class="lc-sec">
      ${head}${has(b.heading) ? `\n      <h2 class="lc-h2 lc-h2--lg">${esc(straight(b.heading))}</h2>` : ''}
      <div class="lc-gallery">
${figs}
      </div>
    </section>`;
    }

    warn(where, `unknown block type "${b.type}"`);
    return '';
  }).filter(Boolean).join('\n\n');

  let finalHtml = '';
  if (fd.length) {
    sec += 1;
    finalHtml = `    <section class="lc-sec">
      ${secHead(pad(sec), 'Final design')}
      <div class="lc-g12">
        <div class="lc-final">
${fd.map((t) => `          <p class="lc-body">${md(t)}</p>`).join('\n')}
        </div>
      </div>
    </section>`;
  }

  const nextHtml = `    <nav class="lc-next" aria-label="More work">
      <div class="lc-sechead">
        <a class="lc-textlink prev-work" href="${projHref(prevSlug)}">[ \u2190 ${esc(prevTitle)} ]</a>
        <a class="lc-textlink all-work" href="${root}collections/index.html">[ All work ]</a>
      </div>
      <a class="lc-next-link next-work" href="${projHref(nextSlug)}">
        <span class="lc-label">Next story \u2192</span>
        <span class="lc-next-title">${esc(straight(nextTitle))}</span>
      </a>
    </nav>`;

  const ogImage = has(hero.poster) ? hero.poster : (!isVideo(hero.src) ? hero.src : '');
  const html = [
    pageHead({
      title: `${d.title} \u00B7 Leah Cortez`, desc: String(d.summary || '').replace(/\*/g, ''), root,
      url: `${SITE}/collections/design/${enc(slug)}/`,
      image: ogImage && !/^\.\./.test(ogImage) ? `${SITE}/collections/design/${enc(slug)}/${enc(ogImage)}` : '',
    }),
    '<body class="v2">',
    '<div id="top" class="lc-page">',
    header(root, 'work'),
    '',
    '  <main>',
    '  <article>',
    headerBlock,
    storyHtml,
    blockHtml,
    finalHtml,
    nextHtml,
    '  </article>',
    '  </main>',
    '',
    contactAndFooter(),
    '</div>',
    scripts(root),
    '</body>',
    '</html>',
    '',
  ].filter((x) => x !== '').join('\n\n');

  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

/* ---------- work page ---------- */

function renderWork(order, all) {
  const root = '../';
  const list = order.map((slug, i) => ({ slug, i, d: all[slug] }));
  const tags = [];
  list.forEach(({ d }) => (d.tags || []).forEach((t) => { if (!tags.includes(t)) tags.push(t); }));
  const years = list.map(({ d }) => Number(d.year)).filter(Boolean);
  const summary = `${list.length} projects \u00B7 ${Math.min(...years)}\u2013${Math.max(...years)}`;

  const filters = ['All', ...tags].map((t, i) => {
    const n = t === 'All' ? list.length : list.filter(({ d }) => (d.tags || []).includes(t)).length;
    return `        <button type="button" class="lc-filter" data-filter="${esc(t)}" aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(t)}<span>${n}</span></button>`;
  }).join('\n');

  const cards = list.map(({ slug, i, d }) => {
    const c = d.card || {};
    const src = c.src || (d.hero && d.hero.src) || '';
    const img = enc(path.posix.join('design', slug, safeDecode(src)));
    if (!fs.existsSync(path.join(ROOT, 'collections', safeDecode(img)))) warn(slug, `card image not found: ${src}`);
    return `      <a class="lc-card" href="design/${enc(slug)}/index.html" data-tags="${esc((d.tags || []).join('|'))}">
        <span class="lc-card-media"><img src="${img}" alt="${esc((d.hero && d.hero.alt) || '')}" loading="lazy" style="--pos: ${esc(c.pos || '50% 50%')}"></span>
        <span class="lc-card-body">
          <span class="lc-card-meta"><span>${pad(i + 1)}</span><span>${esc(c.disc || d.category)}, ${esc(d.year)}</span></span>
          <span class="lc-card-title">${esc(straight(d.title))}</span>${has(c.teaser) ? `\n          <span class="lc-card-line">${esc(c.teaser)}</span>` : ''}
          <span class="lc-card-go">[ View project \u2197 ]</span>
        </span>
      </a>`;
  }).join('\n');

  const html = [
    pageHead({
      title: 'Work \u00B7 Leah Cortez',
      desc: 'Selected work by Leah Cortez: identities, packaging, publications, posters and one typeface.',
      root, url: `${SITE}/collections/`,
    }),
    '<body class="v2">',
    '<div id="top" class="lc-page">',
    header(root, 'work'),
    `  <main>
    <section class="lc-work">
      <h1 class="lc-bigtitle"><span>All</span><span class="lc-rule" aria-hidden="true"></span><span>work</span></h1>
      <div class="lc-intro">
        <p>Identities, packaging, publications, posters and one typeface.</p>
        <p>${summary}</p>
      </div>
      <div class="lc-filters" role="group" aria-label="Filter by discipline" data-lc-filters>
${filters}
      </div>
      <div class="lc-grid" data-lc-grid>
${cards}
      </div>
      <a class="lc-outside" href="../bio/index.html#studio">
        <span class="lc-outside-copy">
          <span class="lc-label">Outside the brief</span>
          <span class="lc-outside-title">I also draw, print and build things.</span>
        </span>
        <span class="lc-label lc-outside-go">[ See my studio work ]</span>
      </a>
    </section>
  </main>`,
    contactAndFooter(),
    '</div>',
    scripts(root),
    '</body>',
    '</html>',
    '',
  ].join('\n\n');

  fs.writeFileSync(path.join(ROOT, 'collections', 'index.html'), html);
}

/* ---------- main ---------- */

function main() {
  const filter = process.argv[2];
  const order = JSON.parse(fs.readFileSync(path.join(__dirname, 'gallery-order.json'), 'utf8'));
  const all = {};
  order.forEach((slug) => {
    const f = path.join(DESIGN, slug, 'case-study.json');
    if (!fs.existsSync(f)) { warn(slug, 'listed in gallery-order.json but has no case-study.json'); return; }
    try { all[slug] = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { warn(slug, 'case-study.json is not valid JSON: ' + e.message); }
  });
  fs.readdirSync(DESIGN).forEach((slug) => {
    if (fs.existsSync(path.join(DESIGN, slug, 'case-study.json')) && !order.includes(slug)) warn(slug, 'has a case-study.json but is not in gallery-order.json');
  });
  const live = order.filter((s) => all[s]);

  let built = 0;
  live.forEach((slug) => {
    if (filter && !slug.includes(filter)) return;
    renderProject(slug, all[slug], live, all);
    built += 1;
  });
  if (!filter) renderWork(live, all);

  console.log(`Built ${built} project page(s)${filter ? '' : ' and the Work page'}.`);
  if (warnings.length) {
    console.log('\nCheck these:');
    warnings.forEach((w) => console.log('  - ' + w));
  }
}

main();
