const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const collectionsRoot = path.join(repoRoot, 'collections');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (/index.*\.html$/i.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function findMatchingClose(html, openIndex) {
  const openTag = html.indexOf('<div', openIndex);
  if (openTag !== openIndex) return -1;
  let depth = 0;
  let i = openIndex;
  while (i < html.length) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) return -1;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
      continue;
    }
    depth--;
    i = nextClose + 6;
    if (depth === 0) return i;
  }
  return -1;
}

function extractBlock(html, className) {
  const needle = `class="${className}"`;
  const start = html.indexOf(needle);
  if (start === -1) return null;
  const openStart = html.lastIndexOf('<div', start);
  if (openStart === -1) return null;
  const openEnd = html.indexOf('>', start);
  const closeEnd = findMatchingClose(html, openStart);
  if (openEnd === -1 || closeEnd === -1) return null;
  return {
    start: openStart,
    end: closeEnd,
    inner: html.slice(openEnd + 1, closeEnd - 6),
    full: html.slice(openStart, closeEnd),
  };
}

function removeRanges(html, ranges) {
  return ranges
    .sort((a, b) => b.start - a.start)
    .reduce((acc, range) => acc.slice(0, range.start) + acc.slice(range.end), html);
}

function stripFirstParagraph(html) {
  const match = html.match(/<p[^>]*>[\s\S]*?<\/p>/i);
  if (!match) return { intro: '', body: html.trim() };
  const intro = match[0];
  const body = html.replace(intro, '').trim();
  return { intro, body };
}

function textFromHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleCase(input) {
  return input
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

function relToCollectionsIndex(filePath) {
  const rel = path.relative(path.dirname(filePath), path.join(collectionsRoot, 'index.html'));
  return rel.split(path.sep).join('/');
}

function relToRepoRoot(filePath) {
  return path.relative(path.dirname(filePath), repoRoot).split(path.sep).join('/');
}

function categoryFromPath(filePath) {
  const parts = filePath.split(path.sep);
  const collectionsIndex = parts.indexOf('collections');
  if (collectionsIndex === -1) return 'Work';
  const category = parts[collectionsIndex + 1] || 'Work';
  return titleCase(category);
}

function extractYear(metaHtml, headHtml) {
  const match = metaHtml.match(/<span class="meta-value"[^>]*>([^<]*)<\/span>/i);
  if (match && /\d{4}/.test(match[1])) return match[1].match(/\d{4}/)[0];
  const yearMatch = headHtml.match(/(?:20\d{2})/);
  return yearMatch ? yearMatch[0] : '';
}

function extractMetaHtml(detailsHtml) {
  const metaBlock = extractBlock(detailsHtml, 'work-meta');
  return metaBlock ? metaBlock.inner.trim() : '';
}

function removeBlocks(detailsHtml) {
  const ranges = [];

  const h1Match = detailsHtml.match(/<h1[\s\S]*?<\/h1>\s*/i);
  if (h1Match) {
    const start = detailsHtml.indexOf(h1Match[0]);
    ranges.push({ start, end: start + h1Match[0].length });
  }

  const metaBlock = extractBlock(detailsHtml, 'work-meta');
  if (metaBlock) ranges.push({ start: metaBlock.start, end: metaBlock.end });

  const navBlock = extractBlock(detailsHtml, 'work-navigation');
  if (navBlock) ranges.push({ start: navBlock.start, end: navBlock.end });

  return removeRanges(detailsHtml, ranges).trim();
}

function buildTemplate({ navHtml, breadcrumbHtml, mainTitle, kicker, intro, metaHtml, mediaHtml, contentHtml, navLinksHtml, footerHtml, scriptsHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${''}
    <link rel="stylesheet" href="../../../css/styles.css">
    <link rel="stylesheet" href="../../../css/work.css">
</head>
<body>
${navHtml}
${breadcrumbHtml}
    <main class="case-study-page">
        <section class="case-study-back-link">
            <a href="${navLinksHtml.backHref}">← WORK</a>
        </section>

        <header class="case-study-hero">
            <p class="case-study-kicker">${kicker}</p>
            <h1>${mainTitle}</h1>
            ${intro ? `<p class="case-study-intro">${intro}</p>` : ''}
            ${metaHtml ? `<div class="case-study-meta-grid"><div class="work-meta">${metaHtml}</div></div>` : ''}
        </header>

        <figure class="case-study-media">
            ${mediaHtml}
        </figure>

        <section class="case-study-content">
            ${contentHtml}
        </section>

        ${navLinksHtml.html}
    </main>
${footerHtml}
${scriptsHtml}
</body>
</html>`;
}

function buildStandardNav(filePath) {
  const root = relToRepoRoot(filePath);
  return `<nav>
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
}

function buildStandardBreadcrumb(filePath, category, title) {
  const collectionsBack = relToCollectionsIndex(filePath);
  return `<div class="breadcrumb">
    <a href="${relToRepoRoot(filePath)}/index.html">Home</a> > <a href="${collectionsBack}">Portfolio</a> > <span>${category}</span> > <span>${title}</span>
  </div>`;
}

function buildPlaceholderPage(filePath) {
  const category = categoryFromPath(filePath);
  const title = titleCase(path.basename(path.dirname(filePath)));
  const root = relToRepoRoot(filePath);
  const navLinksHtml = {
  html: `<nav class="case-study-next"><a href="${relToCollectionsIndex(filePath)}" class="all-work">Back to Portfolio</a></nav>`,
  backHref: relToCollectionsIndex(filePath),
  };

  return buildTemplate({
  navHtml: buildStandardNav(filePath),
  breadcrumbHtml: buildStandardBreadcrumb(filePath, category, title),
  mainTitle: title,
  kicker: `Case Study · ${category} · Placeholder`,
  intro: 'This project page is a placeholder while the final artwork, documentation, and image assets are prepared.',
  metaHtml: '',
  mediaHtml: `<div class="case-study-placeholder">
          <span>Image placeholder</span>
          <p>Placeholder imagery will be added here.</p>
        </div>`,
  contentHtml: `<div class="work-description">
          <h2>Project Overview</h2>
          <p>This page is reserved for the finished case study and will be updated with project-specific text and visuals.</p>
        </div>`,
  navLinksHtml,
  footerHtml: `<footer class="main-footer"><div class="footer-content">
      <img src="${root}/images/logo/logo3.png" alt="Leah Cortez Studios logo" class="footer-logo" loading="lazy">
      <p class="copyright">Leah Cortez © <span id="copyright-year">2026</span></p><script>document.getElementById("copyright-year").textContent = new Date().getFullYear();</script>
    </div></footer>`,
  scriptsHtml: '',
  });
}

function rebuildPage(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  if (html.trim().length === 0) {
    return { skipped: false, content: buildPlaceholderPage(filePath) };
  }
  if (!html.includes('class="work-container"') || !html.includes('class="work-details-column"')) {
    return { skipped: true, reason: 'no standard work-container' };
  }

  const imageBlock = extractBlock(html, 'work-image-column');
  const detailsBlock = extractBlock(html, 'work-details-column');
  if (!imageBlock || !detailsBlock) {
    return { skipped: true, reason: 'missing core blocks' };
  }

  const navBlock = extractBlock(html, 'work-navigation');
  const navHtml = navBlock ? navBlock.inner.trim() : '';
  const navLinksHtml = {
    html: navHtml ? `<nav class="case-study-next">${navHtml}</nav>` : '',
    backHref: relToCollectionsIndex(filePath),
  };

  const footerMatch = html.match(/<footer class="main-footer">([\s\S]*?)<\/footer>/i);
  const footerHtml = footerMatch ? `<footer class="main-footer">${footerMatch[1].trim()}</footer>` : '';

  const scriptsMatch = html.match(/(<script src=[\s\S]*?<\/script>\s*)+$/i);
  const scriptsHtml = scriptsMatch ? scriptsMatch[0].trim() : '';

  const h1Match = detailsBlock.inner.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const mainTitle = h1Match ? textFromHtml(h1Match[1]) : path.basename(path.dirname(filePath));

  const metaHtml = extractMetaHtml(detailsBlock.inner);
  const { intro, body } = stripFirstParagraph(removeBlocks(detailsBlock.inner));
  const introText = intro ? textFromHtml(intro) : '';

  const headDescMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  const fallbackIntro = headDescMatch ? headDescMatch[1] : '';
  const finalIntro = introText || fallbackIntro;

  const year = extractYear(metaHtml, html);
  const category = categoryFromPath(filePath);
  const kicker = ['Case Study', category, year].filter(Boolean).join(' · ');

  const rebuilt = buildTemplate({
    navHtml: html.match(/<nav>[\s\S]*?<\/nav>/i)?.[0] || '',
    breadcrumbHtml: html.match(/<div class="breadcrumb">[\s\S]*?<\/div>/i)?.[0] || '',
    mainTitle,
    kicker,
    intro: finalIntro,
    metaHtml,
    mediaHtml: imageBlock.inner.trim(),
    contentHtml: body,
    navLinksHtml,
    footerHtml,
    scriptsHtml,
  });

  return { skipped: false, content: rebuilt };
}

function main() {
  const files = walk(collectionsRoot)
    .filter((file) => file.endsWith('.html'))
    .filter((file) => path.relative(collectionsRoot, file) !== 'index.html');

  let processed = 0;
  let skipped = 0;
  const skippedFiles = [];

  for (const file of files) {
    const result = rebuildPage(file);
    if (result.skipped) {
      skipped++;
      skippedFiles.push(`${path.relative(repoRoot, file)} :: ${result.reason}`);
      continue;
    }
    fs.writeFileSync(file, result.content, 'utf8');
    processed++;
  }

  console.log(`Processed ${processed} pages.`);
  console.log(`Skipped ${skipped} pages.`);
  if (skippedFiles.length) {
    console.log('Skipped files:');
    for (const line of skippedFiles) console.log(`- ${line}`);
  }
}

main();
