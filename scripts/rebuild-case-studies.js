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

function extractTagInner(html, tagName, className) {
  const pattern = new RegExp(`<${tagName}[^>]*class="${className}"[^>]*>([\\s\\S]*?)<\/${tagName}>`, 'i');
  const match = html.match(pattern);
  return match ? match[1].trim() : '';
}

function extractCaseStudyMedia(html) {
  return extractTagInner(html, 'figure', 'case-study-media');
}

function extractCaseStudyContent(html) {
  const workDescription = extractTagInner(html, 'div', 'work-description');
  if (workDescription) return workDescription;
  const projectDescription = extractTagInner(html, 'div', 'project-description');
  if (projectDescription) return projectDescription;
  const contentSection = extractTagInner(html, 'div', 'content-section');
  if (contentSection) return contentSection;
  return extractTagInner(html, 'section', 'case-study-content');
}

function buildPlaceholderTile(heading, body, modifier = '') {
  return `<article class="case-study-tile ${modifier}" aria-label="${heading}">
          <span class="case-study-tile-heading">${heading}</span>
          <div class="case-study-placeholder${modifier === 'is-large' ? ' case-study-placeholder--large' : ' case-study-placeholder--small'}">
            <span>${heading} placeholder</span>
            <p>${body}</p>
          </div>
        </article>`;
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

function buildTemplate({ navHtml, breadcrumbHtml, mainTitle, kicker, intro, metaHtml, mediaHtml, contentHtml, navLinksHtml, footerHtml, scriptsHtml, scriptBase }) {
  const standardScripts = `
<script src="${scriptBase}/scripts/main.js" defer></script>
<script src="${scriptBase}/scripts/page-enhancements.js" defer></script>`;
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
          <div class="case-study-hero-copy">
            <h1>${mainTitle}</h1>
            ${intro ? `<p class="case-study-intro">${intro}</p>` : ''}
          </div>
          <div class="case-study-hero-media">
            ${mediaHtml}
          </div>
          ${metaHtml ? `<div class="case-study-meta-grid"><div class="work-meta">${metaHtml}</div></div>` : ''}
        </header>

        <section class="case-study-section case-study-brief">
          <div class="case-study-section-header">
            <p class="case-study-section-label">Brief</p>
            <h2>Project Brief</h2>
          </div>
          <div class="case-study-section-body">
            ${intro ? `<p>${intro}</p>` : '<p>Add the short project brief here.</p>'}
          </div>
        </section>

        <section class="case-study-section">
          <div class="case-study-section-header">
            <p class="case-study-section-label">Research</p>
            <h2>Research</h2>
          </div>
          <div class="case-study-placeholder-grid case-study-placeholder-grid--two">
            ${buildPlaceholderTile('Research Image 1', 'Add moodboard, reference, or research imagery here.')}
            ${buildPlaceholderTile('Research Image 2', 'Add a second reference image or comparative source here.')}
          </div>
        </section>

        <section class="case-study-section">
          <div class="case-study-section-header">
            <p class="case-study-section-label">Sketches</p>
            <h2>Sketches and Early Iterations</h2>
          </div>
          <div class="case-study-placeholder-grid case-study-placeholder-grid--three">
            ${buildPlaceholderTile('Sketch 1', 'Add thumbnail sketches or early composition studies here.')}
            ${buildPlaceholderTile('Sketch 2', 'Add rough layout or variation studies here.')}
            ${buildPlaceholderTile('Sketch 3', 'Add another early iteration or refinement here.')}
          </div>
        </section>

        <section class="case-study-section">
          <div class="case-study-section-header">
            <p class="case-study-section-label">Concept</p>
            <h2>Concept Development</h2>
          </div>
          <div class="case-study-concept-media">
            <div class="case-study-placeholder case-study-placeholder--hero">
              <span>Concept development image</span>
              <p>Add one key concept image or process frame here.</p>
            </div>
          </div>
        </section>

        <section class="case-study-section case-study-details">
          <div class="case-study-section-header">
            <p class="case-study-section-label">Details</p>
            <h2>Details and Application</h2>
          </div>
          <div class="case-study-placeholder-grid case-study-placeholder-grid--application">
            ${buildPlaceholderTile('Application 1', 'Add an application, mockup, or detail image here.', 'is-large')}
            ${buildPlaceholderTile('Application 2', 'Add a supporting square application image here.')}
            ${buildPlaceholderTile('Application 3', 'Add a supporting square application image here.')}
            ${buildPlaceholderTile('Application 4', 'Add a supporting square application image here.')}
            ${buildPlaceholderTile('Application 5', 'Add a supporting square application image here.')}
          </div>
          ${contentHtml ? `${contentHtml}` : ''}
        </section>

        ${navLinksHtml.html}
    </main>
${footerHtml}
    ${standardScripts}
${scriptsHtml}
</body>
</html>`;
}

function injectStandardScripts(html, filePath) {
  if (html.includes('main.js') && html.includes('page-enhancements.js')) {
    return html;
  }

  const scriptBase = relToRepoRoot(filePath);
  const standardScripts = `
<script src="${scriptBase}/scripts/main.js" defer></script>
<script src="${scriptBase}/scripts/page-enhancements.js" defer></script>`;
  if (html.includes('</body>')) {
    return html.replace('</body>', `${standardScripts}
</body>`);
  }
  return `${html}${standardScripts}`;
}

function normalizeCaseStudyPage(html, filePath) {
  const category = categoryFromPath(filePath);
  const title = titleCase(path.basename(path.dirname(filePath)));
  const navHtml = buildStandardNav(filePath);
  const breadcrumbHtml = buildStandardBreadcrumb(filePath, category, title);
  const withNav = html.replace(/<nav>[\s\S]*?<\/nav>/i, navHtml);
  const withBreadcrumb = withNav.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/i, breadcrumbHtml);

  const headerMatch = withBreadcrumb.match(/<header class="case-study-hero">([\s\S]*?)<\/header>/i);
  const headerInner = headerMatch ? headerMatch[1] : '';
  const kicker = headerInner.match(/<p class="case-study-kicker">([\s\S]*?)<\/p>/i)?.[1].trim() || `Case Study · ${category}`;
  const mainTitle = headerInner.match(/<h1>([\s\S]*?)<\/h1>/i)?.[1].trim() || title;
  const intro = headerInner.match(/<p class="case-study-intro">([\s\S]*?)<\/p>/i)?.[1].trim() || '';
  const metaHtml = headerInner.match(/<div class="case-study-meta-grid">[\s\S]*?<div class="work-meta">([\s\S]*?)<\/div>\s*<\/div>/i)?.[1].trim() || '';
  const mediaHtml = '<div class="case-study-placeholder case-study-placeholder--hero"><span>Hero image placeholder</span><p>Add the main hero image, a still, or a process visual here.</p></div>';
  const contentHtml = extractCaseStudyContent(withBreadcrumb) || '';
  let rewritten = withBreadcrumb;
  if (headerMatch) {
  const newHeader = `<header class="case-study-hero">
      <p class="case-study-kicker">${kicker}</p>
      <div class="case-study-hero-copy">
        <h1>${mainTitle}</h1>
        ${intro ? `<p class="case-study-intro">${intro}</p>` : ''}
      </div>
      <div class="case-study-hero-media">
        ${mediaHtml}
      </div>
      ${metaHtml ? `<div class="case-study-meta-grid"><div class="work-meta">${metaHtml}</div></div>` : ''}
    </header>`;
  rewritten = rewritten.replace(headerMatch[0], newHeader);
  }

  const replacement = buildTemplate({
    navHtml,
    breadcrumbHtml,
    mainTitle: headerMatch ? headerMatch[1].match(/<h1>([\s\S]*?)<\/h1>/i)?.[1].trim() || title : title,
    kicker: headerMatch ? headerMatch[1].match(/<p class="case-study-kicker">([\s\S]*?)<\/p>/i)?.[1].trim() || `Case Study · ${category}` : `Case Study · ${category}`,
    intro,
    metaHtml,
    mediaHtml,
    contentHtml: contentHtml || `<div class="case-study-section-body case-study-details-copy">
            <p>Add the project notes, final reflections, and outcome details here.</p>
          </div>`,
    navLinksHtml: {
      html: html.match(/<nav class="case-study-next">[\s\S]*?<\/nav>/i)?.[0] || '',
      backHref: relToCollectionsIndex(filePath),
    },
    footerHtml: html.match(/<footer class="main-footer">[\s\S]*?<\/footer>/i)?.[0] || '',
    scriptBase: relToRepoRoot(filePath),
    scriptsHtml: html.match(/(<script src=[\s\S]*?)<\/body>/i)?.[1] ? '' : '',
  });

  return injectStandardScripts(replacement, filePath);
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
  scriptBase: root,
  scriptsHtml: '',
  });
}

function rebuildPage(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  if (html.trim().length === 0) {
    return { skipped: false, content: buildPlaceholderPage(filePath) };
  }
  if (html.includes('class="case-study-page"')) {
    const normalized = normalizeCaseStudyPage(html, filePath);
    return normalized ? { skipped: false, content: normalized } : { skipped: true, reason: 'already updated case-study page' };
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
    scriptBase: relToRepoRoot(filePath),
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
