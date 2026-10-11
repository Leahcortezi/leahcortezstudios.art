#!/usr/bin/env node
/*
  build-case-studies.js

  Walks collections/**\/case-study.json and writes the sibling index.html using the
  case-study v2 block markup (css/case-study-v2.css). No npm dependencies.

  Usage:
    node scripts/build-case-studies.js              build every case-study.json
    node scripts/build-case-studies.js Threads      build only paths containing "Threads"

  Data format and writing rules: docs/CASE-STUDY-GUIDE.md.

  Rules this script follows:
  - Every field is optional except "title". A missing field renders nothing (no fallback copy).
  - Keys starting with "_" (e.g. "_todo") are notes for you and are never rendered.
  - A block with no "src" but a "placeholder" string renders a labelled placeholder frame, and
    the page links css/case-study-v2-placeholders.css. Swap in "src" later and it disappears.
  - Media type is picked by extension: .mp4/.webm/.mov become <video>, everything else <img>.
  - Prev/next links are computed from scripts/gallery-order.json (wraps around).
  - Missing alt text or missing files produce warnings, not failures.
*/
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const collectionsRoot = path.join(repoRoot, 'collections');
const galleryOrder = JSON.parse(fs.readFileSync(path.join(__dirname, 'gallery-order.json'), 'utf8'));
const warnings = [];

/* ---------- helpers ---------- */

const posix = (p) => p.split(path.sep).join('/');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => escText(s).replace(/"/g, '&quot;');
const encodeUrl = (p) =>
  p.split('/').map((seg) => (seg === '..' || seg === '.' ? seg : encodeURIComponent(seg))).join('/');
const has = (v) => typeof v === 'string' && v.trim() !== '';
const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || '');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === 'case-study.json') acc.push(full);
  }
  return acc;
}

// Reads pixel size from a JPEG or PNG header (no dependencies).
function imageSize(file) {
  let buf;
  try {
    buf = fs.readFileSync(file);
  } catch (e) {
    return null;
  }
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m === 0xff) { i++; continue; }
      if (m === 0x01 || (m >= 0xd0 && m <= 0xd9)) { i += 2; continue; }
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

function firstSentence(text) {
  const m = text.match(/^[\s\S]*?[.!?](?=\s|$)/);
  return (m ? m[0] : text).trim();
}

/* ---------- media ---------- */

function ratioFor(ctx, item) {
  if (has(item.ratio)) return item.ratio.replace(/\s*\/\s*/, ' / ');
  if (has(item.src) && !isVideo(item.src)) {
    const size = imageSize(path.join(ctx.pageDir, item.src));
    if (size) return `${size.w} / ${size.h}`;
  }
  return isVideo(item.src) ? '16 / 9' : '3 / 2';
}

function growFor(ratio) {
  const [w, h] = ratio.split('/').map(Number);
  return String(parseFloat((w / h).toFixed(3)));
}

/*
  Returns a full <div class="cs-media …">…</div>.
  o.indent    leading whitespace of the div
  o.ratio     CSS ratio string, e.g. "864 / 604" (sets --ratio inline)
  o.extra     extra class on the div
  o.priority  true for the hero image (fetchpriority=high, no lazy loading)
*/
function renderMedia(ctx, item, o = {}) {
  const ind = o.indent || '';
  const classes = ['cs-media'];
  if (o.extra) classes.push(o.extra);
  if (item.fit === 'contain') classes.push('cs-media--contain');
  const style = o.ratio ? ` style="--ratio: ${o.ratio}"` : '';

  if (!has(item.src)) {
    ctx.placeholders++;
    classes.push('cs-media--placeholder');
    const label = has(item.placeholder) ? item.placeholder : 'Image coming soon';
    return [
      `${ind}<div class="${classes.join(' ')}"${style} role="img" aria-label="${escAttr('Placeholder: ' + label)}">`,
      `${ind}  <span>${escText(label)}</span>`,
      `${ind}</div>`,
    ].join('\n');
  }

  if (!fs.existsSync(path.join(ctx.pageDir, item.src))) ctx.warn(`file not found: ${item.src}`);
  const url = encodeUrl(item.src);
  let inner;

  if (isVideo(item.src)) {
    const ext = path.extname(item.src).slice(1).toLowerCase();
    const type = ext === 'mov' ? 'video/quicktime' : ext === 'webm' ? 'video/webm' : 'video/mp4';
    const lines = [];
    if (ext === 'mov') {
      const mp4 = item.src.replace(/\.mov$/i, '.mp4');
      if (fs.existsSync(path.join(ctx.pageDir, mp4))) {
        lines.push(`${ind}    <source src="${encodeUrl(mp4)}" type="video/mp4">`);
      }
    }
    lines.push(`${ind}    <source src="${url}" type="${type}">`);
    const poster = has(item.poster) ? ` poster="${encodeUrl(item.poster)}"` : '';
    const label = has(item.alt) ? ` aria-label="${escAttr(item.alt)}"` : '';
    inner = [
      `${ind}  <video autoplay muted loop playsinline preload="metadata"${poster}${label}>`,
      ...lines,
      `${ind}  </video>`,
    ].join('\n');
  } else {
    if (!has(item.alt)) ctx.warn(`missing alt text: ${item.src}`);
    const load = o.priority ? 'fetchpriority="high"' : 'loading="lazy"';
    inner = `${ind}  <img src="${url}" alt="${escAttr(item.alt || '')}" ${load}>`;
  }

  return `${ind}<div class="${classes.join(' ')}"${style}>\n${inner}\n${ind}</div>`;
}

/* ---------- blocks ---------- */

function renderMeta(meta, indent) {
  const rows = (meta || []).filter((p) => Array.isArray(p) && has(p[0]) && has(p[1]));
  if (!rows.length) return '';
  return [
    `${indent}<dl class="cs-meta">`,
    ...rows.map(([k, v]) => `${indent}  <div><dt>${escText(k)}</dt><dd>${escText(v)}</dd></div>`),
    `${indent}</dl>`,
  ].join('\n');
}

function kickerText(d) {
  return ['Case study', d.category, d.year].filter(has).join(' · ');
}

function renderHero(ctx, d) {
  const hero = d.hero || {};
  const wide = hero.layout === 'wide';
  const back = `    <a class="cs-back" href="${ctx.collectionsIndex}">← Work</a>`;

  if (wide) {
    const meta = renderMeta(d.meta, '    ');
    return [
      '  <!-- Hero · wide -->',
      '  <header class="cs-hero cs-hero--wide cs-wrap">',
      back,
      '    <div class="cs-hero-top">',
      '      <div class="cs-hero-intro">',
      `        <p class="cs-kicker">${escText(kickerText(d))}</p>`,
      `        <h1 class="cs-title">${escText(d.title)}</h1>`,
      '      </div>',
      has(d.summary) ? `      <p class="cs-lead">${escText(d.summary)}</p>` : '',
      '    </div>',
      meta,
      renderMedia(ctx, hero, { indent: '    ', extra: 'cs-hero-wide-media', priority: true }),
      '  </header>',
    ].filter(Boolean).join('\n');
  }

  const meta = renderMeta(d.meta, '        ');
  return [
    '  <!-- Hero · split -->',
    '  <header class="cs-hero cs-hero--split cs-wrap">',
    back,
    '    <div class="cs-hero-grid">',
    '      <div class="cs-hero-copy">',
    '        <div class="cs-hero-intro">',
    `          <p class="cs-kicker">${escText(kickerText(d))}</p>`,
    `          <h1 class="cs-title">${escText(d.title)}</h1>`,
    has(d.summary) ? `          <p class="cs-lead">${escText(d.summary)}</p>` : '',
    '        </div>',
    meta,
    '      </div>',
    '      <div class="cs-hero-media">',
    renderMedia(ctx, hero, { indent: '        ', priority: true }),
    '      </div>',
    '    </div>',
    '  </header>',
  ].filter(Boolean).join('\n');
}

function renderOverview(d) {
  const o = d.overview || {};
  // optional custom labels: overview.items = [{ label, text }]
  const items = (Array.isArray(o.items)
    ? o.items.map((i) => [i.label, i.text])
    : [['Challenge', o.challenge], ['Solution', o.solution], ['Outcome', o.outcome]]
  ).filter(([, t]) => has(t));
  if (!items.length) return '';
  return [
    '  <!-- Overview -->',
    '  <section class="cs-overview" aria-labelledby="cs-overview-title">',
    '    <div class="cs-wrap">',
    '      <h2 class="cs-overview-label" id="cs-overview-title">Overview</h2>',
    '      <div class="cs-overview-grid">',
    ...items.map(([h, t]) => [
      '        <div class="cs-overview-item">',
      `          <h3>${h}</h3>`,
      `          <p>${escText(t)}</p>`,
      '        </div>',
    ].join('\n')),
    '      </div>',
    '    </div>',
    '  </section>',
  ].join('\n');
}

function renderStory(ctx, b, side) {
  const copyLines = [
    has(b.label) ? `        <p class="cs-label">${escText(b.label)}</p>` : '',
    has(b.heading) ? `        <h2 class="cs-h2">${escText(b.heading)}</h2>` : '',
    has(b.body) ? `        <p class="cs-body">${escText(b.body)}</p>` : '',
  ].filter(Boolean);
  const copy = copyLines.length
    ? ['      <div class="cs-story-copy">', ...copyLines, '      </div>'].join('\n')
    : '';
  const figure = [
    '      <figure class="cs-story-figure">',
    renderMedia(ctx, b, { indent: '        ', ratio: ratioFor(ctx, b) }),
    has(b.caption) ? `        <figcaption class="cs-caption">${escText(b.caption)}</figcaption>` : '',
    '      </figure>',
  ].filter(Boolean).join('\n');
  const parts = side === 'left' ? [figure, copy] : [copy, figure];
  return [
    `  <!-- Story · image ${side} -->`,
    `  <section class="cs-block cs-story cs-story--image-${side} cs-wrap">`,
    '    <div class="cs-story-grid">',
    ...parts.filter(Boolean),
    '    </div>',
    '  </section>',
  ].join('\n');
}

function renderFeature(ctx, b) {
  const caption = has(b.label) || has(b.caption)
    ? [
        '      <figcaption class="cs-feature-caption cs-wrap">',
        has(b.label) ? `        <span class="cs-label">${escText(b.label)}</span>` : '',
        has(b.caption) ? `        <span class="cs-feature-caption-text">${escText(b.caption)}</span>` : '',
        '      </figcaption>',
      ].filter(Boolean).join('\n')
    : '';
  return [
    '  <!-- Feature · full-bleed -->',
    '  <section class="cs-block cs-feature">',
    '    <figure>',
    renderMedia(ctx, b, { indent: '      ' }),
    caption,
    '    </figure>',
    '  </section>',
  ].filter(Boolean).join('\n');
}

function blockHead(b, indent) {
  if (!has(b.label) && !has(b.heading)) return '';
  return [
    `${indent}<div class="cs-block-head">`,
    has(b.label) ? `${indent}  <p class="cs-label">${escText(b.label)}</p>` : '',
    has(b.heading) ? `${indent}  <h2 class="cs-h2">${escText(b.heading)}</h2>` : '',
    `${indent}</div>`,
  ].filter(Boolean).join('\n');
}

function renderGallery(ctx, b) {
  const items = (b.items || []).filter((it) => has(it.src) || has(it.placeholder));
  if (!items.length) return '';
  const grid = b.layout === 'grid';
  const figures = items.map((it) => {
    const ratio = ratioFor(ctx, it);
    return [
      `      <figure class="cs-gallery-item"${grid ? '' : ` style="--grow: ${growFor(ratio)}"`}>`,
      renderMedia(ctx, it, { indent: '        ', ratio: grid ? null : ratio }),
      has(it.caption) ? `        <figcaption class="cs-caption">${escText(it.caption)}</figcaption>` : '',
      '      </figure>',
    ].filter(Boolean).join('\n');
  });
  return [
    grid ? '  <!-- Gallery · grid -->' : `  <!-- Gallery · justified ${items.length}-up -->`,
    `  <section class="cs-block cs-gallery${grid ? ' cs-gallery--grid' : ''} cs-wrap">`,
    blockHead(b, '    '),
    '    <div class="cs-gallery-row">',
    ...figures,
    '    </div>',
    '  </section>',
  ].filter(Boolean).join('\n');
}

function renderProcess(ctx, b) {
  const steps = (b.steps || []).filter((s) => has(s.src) || has(s.placeholder));
  if (!steps.length) return '';
  return [
    '  <!-- Process strip -->',
    '  <section class="cs-block cs-process cs-wrap">',
    blockHead(b, '    '),
    '    <ol class="cs-process-list">',
    ...steps.map((s, i) => {
      const text = [s.title, s.caption].filter(has).join(' — ');
      return [
        '      <li class="cs-process-step">',
        renderMedia(ctx, s, { indent: '        ' }),
        '        <div class="cs-process-meta">',
        `          <span class="cs-process-num">${String(i + 1).padStart(2, '0')}</span>`,
        text ? `          <span class="cs-process-text">${escText(text)}</span>` : '',
        '        </div>',
        '      </li>',
      ].filter(Boolean).join('\n');
    }),
    '    </ol>',
    '  </section>',
  ].filter(Boolean).join('\n');
}

function renderMotion(ctx, b) {
  if (!has(b.src) && !has(b.placeholder)) return '';
  const head = has(b.label) || has(b.heading)
    ? [
        '    <div class="cs-block-head cs-block-head--split">',
        '      <div>',
        has(b.label) ? `        <p class="cs-label">${escText(b.label)}</p>` : '',
        has(b.heading) ? `        <h2 class="cs-h2">${escText(b.heading)}</h2>` : '',
        '      </div>',
        has(b.body) ? `      <p class="cs-body">${escText(b.body)}</p>` : '',
        '    </div>',
      ].filter(Boolean).join('\n')
    : '';
  return [
    '  <!-- Motion -->',
    '  <section class="cs-block cs-motion cs-wrap">',
    head,
    '    <figure class="cs-motion-figure">',
    renderMedia(ctx, b, { indent: '      ' }),
    has(b.caption) ? `      <figcaption class="cs-caption">${escText(b.caption)}</figcaption>` : '',
    '    </figure>',
    '  </section>',
  ].filter(Boolean).join('\n');
}

function renderBlocks(ctx, blocks) {
  const out = [];
  let prevStorySide = null;
  for (const b of blocks || []) {
    let html = '';
    if (b.type === 'story') {
      const side = b.imageSide || (prevStorySide === 'right' ? 'left' : 'right');
      prevStorySide = side;
      html = renderStory(ctx, b, side);
    } else {
      prevStorySide = null;
      if (b.type === 'feature') html = renderFeature(ctx, b);
      else if (b.type === 'gallery') html = renderGallery(ctx, b);
      else if (b.type === 'process') html = renderProcess(ctx, b);
      else if (b.type === 'motion') html = renderMotion(ctx, b);
      else ctx.warn(`unknown block type: ${b.type}`);
    }
    if (html) out.push(html);
  }
  return out;
}

/* ---------- next / prev ---------- */

function linkTo(ctx, repoPath) {
  return encodeUrl(posix(path.relative(ctx.pageDir, path.join(repoRoot, repoPath))));
}

function renderNext(ctx, d) {
  const me = posix(path.relative(repoRoot, ctx.pageFile));
  const i = galleryOrder.indexOf(me);
  let prev = d.prev ? encodeUrl(d.prev) : null;
  let next = d.next ? encodeUrl(d.next) : null;
  if (i !== -1) {
    if (!prev) prev = linkTo(ctx, galleryOrder[(i - 1 + galleryOrder.length) % galleryOrder.length]);
    if (!next) next = linkTo(ctx, galleryOrder[(i + 1) % galleryOrder.length]);
  } else if (!prev && !next) {
    ctx.warn('not in scripts/gallery-order.json, so no previous/next links');
  }
  return [
    '  <!-- Next -->',
    '  <nav class="cs-next cs-wrap" aria-label="More work">',
    '    <div class="cs-next-row">',
    prev ? `      <a href="${prev}" class="prev-work">← Previous work</a>` : '',
    `      <a href="${ctx.collectionsIndex}" class="all-work">Back to portfolio</a>`,
    next ? `      <a href="${next}" class="next-work">Next work →</a>` : '',
    '    </div>',
    '  </nav>',
  ].filter(Boolean).join('\n');
}

/* ---------- page ---------- */

function buildPage(jsonFile) {
  const pageDir = path.dirname(jsonFile);
  const rel = posix(path.relative(repoRoot, pageDir));
  const ctx = {
    pageDir,
    pageFile: path.join(pageDir, 'index.html'),
    collectionsIndex: posix(path.relative(pageDir, path.join(collectionsRoot, 'index.html'))),
    placeholders: 0,
    warn: (msg) => warnings.push(`${rel}: ${msg}`),
  };
  const root = posix(path.relative(pageDir, repoRoot));

  let d;
  try {
    d = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  } catch (e) {
    warnings.push(`${rel}: invalid JSON (${e.message})`);
    return null;
  }
  if (!has(d.title)) {
    warnings.push(`${rel}: "title" is required, skipped`);
    return null;
  }

  const sections = [renderHero(ctx, d), renderOverview(d), ...renderBlocks(ctx, d.blocks), renderNext(ctx, d)]
    .filter(Boolean)
    .join('\n\n');

  const head = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '    <meta charset="UTF-8">',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `    <title>${escText(d.title)} · Leah Cortez</title>`,
    has(d.summary) ? `    <meta name="description" content="${escAttr(firstSentence(d.summary))}">` : '',
    `    <link rel="icon" href="${root}/icons/favicon.ico">`,
    `    <link rel="stylesheet" href="${root}/css/styles.css">`,
    `    <link rel="stylesheet" href="${root}/css/work.css">`,
    `    <link rel="stylesheet" href="${root}/css/case-study-v2.css">`,
    ctx.placeholders > 0 ? `    <link rel="stylesheet" href="${root}/css/case-study-v2-placeholders.css">` : '',
    '</head>',
  ].filter(Boolean);

  // placeholders are only known after the sections render, so the head is assembled last
  const nav = `<body>
<nav>
    <div class="nav-container">
      <a href="${root}/index.html" class="logo">
        <img src="${root}/images/logo/logotype.png" alt="Leah Cortez Studios home" class="logo-img" loading="lazy">
      </a>
      <div class="nav-menu">
        <ul class="nav-links">
          <li><a href="${root}/index.html">HOME</a></li>
          <li><a href="${root}/bio/index.html">ABOUT</a></li>
          <li><a href="${root}/collections/index.html">WORK</a></li>
          <li><a href="${root}/contact/index.html">CONTACT</a></li>
        </ul>
      </div>
      <div class="hamburger">
        <img src="${root}/icons/flower.svg" alt="Open navigation menu" class="hamburger-icon" loading="lazy">
      </div>
    </div>
  </nav>`;

  const footer = `<footer class="main-footer"><div class="footer-content">
            <img src="${root}/images/logo/logo3.png" alt="Leah Cortez Studios logo" class="footer-logo" loading="lazy">
            <p class="copyright">Leah Cortez © <span id="copyright-year">2026</span></p><script>document.getElementById("copyright-year").textContent = new Date().getFullYear();</script>
        </div></footer>`;

  const html = `${head.join('\n')}
${nav}

<main class="case-study-page cs-page">

${sections}

</main>

${footer}

<script src="${root}/scripts/main.js" defer></script>
<script src="${root}/scripts/page-enhancements.js" defer></script>
</body>
</html>
`;

  return { html, ctx, rel };
}

function main() {
  const filter = process.argv[2];
  const files = walk(collectionsRoot).filter((f) => !filter || f.includes(filter)).sort();
  if (!files.length) {
    console.log('No case-study.json files found.');
    return;
  }
  const report = [];
  let built = 0;
  for (const f of files) {
    const result = buildPage(f);
    if (!result) continue;
    fs.writeFileSync(result.ctx.pageFile, result.html, 'utf8');
    built++;
    if (result.ctx.placeholders) report.push(`  ${result.rel}: ${result.ctx.placeholders} placeholder(s)`);
  }
  console.log(`Built ${built} case study page(s).`);
  if (report.length) {
    console.log('\nPlaceholders still to fill:');
    report.forEach((l) => console.log(l));
  }
  if (warnings.length) {
    console.log('\nWarnings:');
    warnings.forEach((w) => console.log(`  ${w}`));
  }
}

main();
