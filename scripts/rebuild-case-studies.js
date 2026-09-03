const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const collectionsRoot = path.join(repoRoot, 'collections');
const collectionAssetsRoot = path.join(repoRoot, 'collection');

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

function normalizeKey(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

function mediaPriority(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const priority = {
    '.mp4': 100,
    '.webm': 90,
    '.mov': 80,
    '.jpg': 70,
    '.jpeg': 69,
    '.png': 68,
    '.webp': 67,
    '.gif': 66,
  };
  return priority[ext] || 0;
}

function pickPreferredAsset(currentPath, candidatePath) {
  if (!currentPath) return candidatePath;
  return mediaPriority(candidatePath) > mediaPriority(currentPath) ? candidatePath : currentPath;
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

function encodePathFromRoot(absPath) {
  return path
    .relative(repoRoot, absPath)
    .split(path.sep)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function buildCollectionAssetsIndex() {
  const index = new Map();
  if (!fs.existsSync(collectionAssetsRoot)) return index;

  for (const entry of fs.readdirSync(collectionAssetsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const folderName = entry.name;
    const folderPath = path.join(collectionAssetsRoot, folderName);
    const assets = {
      hero: null,
      concept: null,
      research: [],
      sketches: [],
      applications: [],
    };

    for (const file of fs.readdirSync(folderPath, { withFileTypes: true })) {
      if (!file.isFile()) continue;
      const ext = path.extname(file.name).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov'].includes(ext)) continue;

      const filePath = path.join(folderPath, file.name);
      const token = path.basename(file.name, ext).toLowerCase();
      if (token.startsWith('hero')) assets.hero = pickPreferredAsset(assets.hero, filePath);
      if (token.startsWith('concept')) assets.concept = pickPreferredAsset(assets.concept, filePath);
      if (token.startsWith('research')) assets.research.push({ token, filePath });
      if (token.startsWith('sketch')) assets.sketches.push({ token, filePath });
      if (token.startsWith('application') || token.startsWith('app')) assets.applications.push({ token, filePath });
    }

    assets.research.sort((a, b) => a.token.localeCompare(b.token, undefined, { numeric: true }));
    assets.sketches.sort((a, b) => a.token.localeCompare(b.token, undefined, { numeric: true }));
    assets.applications.sort((a, b) => a.token.localeCompare(b.token, undefined, { numeric: true }));

    index.set(normalizeKey(folderName), { folderName, assets });
  }

  return index;
}

function makeImagePlaceholder(src, alt, size) {
  return `<div class="case-study-placeholder case-study-placeholder--${size}">
              <img src="${src}" alt="${alt}" loading="lazy" style="width:100%;height:100%;display:block;">
            </div>`;
}

function makeMediaPlaceholder(src, alt, size) {
  const cleanSrc = src.split('?')[0];
  const isVideo = /\.(mp4|webm|mov)$/i.test(cleanSrc);
  const ext = (cleanSrc.match(/\.([^.\/]+)$/)?.[1] || '').toLowerCase();
  let mediaTag;

  if (isVideo) {
    const mp4Companion = ext === 'mov' ? cleanSrc.replace(/\.mov$/i, '.mp4') : null;
    const currentType = ext === 'mov' ? 'video/quicktime' : ext === 'webm' ? 'video/webm' : 'video/mp4';
    const mp4Source = mp4Companion ? `<source src="${mp4Companion}" type="video/mp4">` : '';
    mediaTag = `<video autoplay muted loop playsinline controls preload="metadata" aria-label="${alt}" style="width:100%;height:100%;display:block;">\n                ${mp4Source}\n                <source src="${src}" type="${currentType}">\n              </video>`;
  } else {
    mediaTag = `<img src="${src}" alt="${alt}" loading="lazy" style="width:100%;height:100%;display:block;">`;
  }

  return `<div class="case-study-placeholder case-study-placeholder--${size} case-study-placeholder--media">
              ${mediaTag}
            </div>`;
}

function buildMediaTile(heading, src, alt, modifier = '') {
  const sizeClass = modifier === 'is-large' ? 'large' : 'small';
  return `<article class="case-study-tile has-media ${modifier}" aria-label="${heading}">
          <span class="case-study-tile-heading">${heading}</span>
          ${makeMediaPlaceholder(src, alt, sizeClass)}
        </article>`;
}

function replaceFirstBlockInSection(html, sectionLabel, blockClassPrefix, replacementMarkup) {
  const labelMarker = `<p class="case-study-section-label">${sectionLabel}</p>`;
  const labelIndex = html.indexOf(labelMarker);
  if (labelIndex === -1) return html;

  const sectionStart = html.lastIndexOf('<section', labelIndex);
  const sectionEnd = html.indexOf('</section>', labelIndex);
  if (sectionStart === -1 || sectionEnd === -1) return html;

  const sectionHtml = html.slice(sectionStart, sectionEnd + 10);
  const blockStart = sectionHtml.indexOf(blockClassPrefix);
  if (blockStart === -1) return html;

  const absoluteBlockStart = sectionStart + blockStart;
  const absoluteBlockEnd = findMatchingClose(html, absoluteBlockStart);
  if (absoluteBlockEnd === -1) return html;

  return `${html.slice(0, absoluteBlockStart)}${replacementMarkup}${html.slice(absoluteBlockEnd)}`;
}

function buildSectionMediaGrid(files, filePath, projectTitle, labelPrefix) {
  if (!files || files.length === 0) return '';
  const tiles = files.map((entry, index) => {
    const src = `${relToRepoRoot(filePath)}/${encodePathFromRoot(entry.filePath)}`;
    const heading = `${labelPrefix} ${index + 1}`;
    return buildMediaTile(heading, src, `${projectTitle} ${heading.toLowerCase()}`);
  }).join('\n            ');

  const singleClass = files.length === 1 ? ' case-study-placeholder-grid--single' : ' case-study-placeholder-grid--media';
  return `<div class="case-study-placeholder-grid${singleClass}">
            ${tiles}
          </div>`;
}

function buildApplicationLayoutFromAssets(files, filePath, projectTitle) {
  if (!files || files.length === 0) return '';

  const first = files[0];
  const firstSrc = `${relToRepoRoot(filePath)}/${encodePathFromRoot(first.filePath)}`;
  const large = buildMediaTile('Application 1', firstSrc, `${projectTitle} application 1`, 'is-large');

  if (files.length === 1) {
    return `<div class="case-study-application-layout has-media only-one">
          ${large}
        </div>`;
  }

  const rest = files.slice(1).map((entry, idx) => {
    const src = `${relToRepoRoot(filePath)}/${encodePathFromRoot(entry.filePath)}`;
    const number = idx + 2;
    return buildMediaTile(`Application ${number}`, src, `${projectTitle} application ${number}`);
  }).join('\n            ');

  return `<div class="case-study-application-layout has-media">
          ${large}
          <div class="case-study-application-stack">
            ${rest}
          </div>
        </div>`;
}

function injectCollectionAssets(html, filePath, projectTitle, collectionAssetsIndex) {
  if (!collectionAssetsIndex || !collectionAssetsIndex.size) return html;

  const key = normalizeKey(projectTitle);
  const match = collectionAssetsIndex.get(key);
  if (!match) return html;

  const { assets } = match;
  let injected = html;

  if (assets.hero) {
    const src = `${relToRepoRoot(filePath)}/${encodePathFromRoot(assets.hero)}`;
    const heroImage = makeMediaPlaceholder(src, `${projectTitle} hero image`, 'hero');
    injected = injected.replace(
      /(<div class="case-study-hero-media">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/header>)/i,
      `$1\n              ${heroImage}\n            $2`
    );
  }

  if (assets.research.length > 0) {
    const researchGrid = buildSectionMediaGrid(assets.research, filePath, projectTitle, 'Research');
    injected = replaceFirstBlockInSection(injected, 'Research', '<div class="case-study-placeholder-grid', researchGrid);
  }

  if (assets.sketches.length > 0) {
    const sketchesGrid = buildSectionMediaGrid(assets.sketches, filePath, projectTitle, 'Sketch');
    injected = replaceFirstBlockInSection(injected, 'Sketches', '<div class="case-study-placeholder-grid', sketchesGrid);
  }

  const conceptSource = assets.concept || assets.hero;
  if (conceptSource) {
    const src = `${relToRepoRoot(filePath)}/${encodePathFromRoot(conceptSource)}`;
    const conceptAlt = assets.concept ? `${projectTitle} concept development` : `${projectTitle} concept development (hero fallback)`;
    const conceptImage = makeMediaPlaceholder(src, conceptAlt, 'hero');
    injected = replaceFirstBlockInSection(injected, 'Concept', '<div class="case-study-placeholder case-study-placeholder--', conceptImage);
  }

  if (assets.applications.length > 0) {
    const appLayoutStart = injected.indexOf('<div class="case-study-application-layout">');
    if (appLayoutStart !== -1) {
      const appLayoutEnd = findMatchingClose(injected, appLayoutStart);
      if (appLayoutEnd !== -1) {
        const appLayout = buildApplicationLayoutFromAssets(assets.applications, filePath, projectTitle);
        injected = `${injected.slice(0, appLayoutStart)}${appLayout}${injected.slice(appLayoutEnd)}`;
      }
    }
  }

  return injected;
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

function extractTagInnerByClassToken(html, tagName, classToken) {
  const pattern = new RegExp(`<${tagName}[^>]*class="[^"]*${classToken}[^"]*"[^>]*>([\\s\\S]*?)<\/${tagName}>`, 'i');
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
  let detailsCopy = extractTagInnerByClassToken(html, 'div', 'case-study-details-copy');
  while (detailsCopy && detailsCopy.includes('case-study-details-copy')) {
    const nextCopy = extractTagInnerByClassToken(detailsCopy, 'div', 'case-study-details-copy');
    if (!nextCopy) break;
    detailsCopy = nextCopy;
  }
  if (detailsCopy) return detailsCopy;
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

function buildApplicationLayout() {
  return `<div class="case-study-application-layout">
          ${buildPlaceholderTile('Application 1', 'Add an application, mockup, or detail image here.', 'is-large')}
          <div class="case-study-application-stack">
            ${buildPlaceholderTile('Application 2', 'Add a supporting square application image here.')}
            ${buildPlaceholderTile('Application 3', 'Add a supporting square application image here.')}
            ${buildPlaceholderTile('Application 4', 'Add a supporting square application image here.')}
            ${buildPlaceholderTile('Application 5', 'Add a supporting square application image here.')}
          </div>
        </div>`;
}

function sectionCopy(sectionKey) {
  const copy = {
    brief: 'This project begins with a compact design brief that frames the audience, the visual problem, and the mood the final system should carry.',
    research: 'Research gathers references, tone, and context, translating outside cues into a clearer visual direction for the project.',
    sketches: 'Early iterations trace the movement from rough marks to more deliberate structure, revealing what to keep and what to refine.',
    concept: 'Concept development pulls the strongest signals together into a single direction with a more resolved mood and composition.',
    details: 'Details and application place the system into its final setting, where scale, texture, and presentation give the work its finish.',
  };
  return copy[sectionKey] || '';
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
            ${metaHtml ? `<div class="case-study-meta-grid"><div class="work-meta">${metaHtml}</div></div>` : ''}
          </div>
          <div class="case-study-hero-side">
            <div class="case-study-hero-media">
              ${mediaHtml}
            </div>
          </div>
        </header>

        <section class="case-study-section case-study-brief">
          <div class="case-study-section-header">
            <p class="case-study-section-label">Brief</p>
            <h2>Project Brief</h2>
          </div>
          <div class="case-study-section-body">
            <p>${sectionCopy('brief')}</p>
            ${intro ? `<p>${intro}</p>` : ''}
          </div>
        </section>

        <section class="case-study-section">
          <div class="case-study-section-header">
            <p class="case-study-section-label">Research</p>
            <h2>Research</h2>
          </div>
          <div class="case-study-section-body">
            <p>${sectionCopy('research')}</p>
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
          <div class="case-study-section-body">
            <p>${sectionCopy('sketches')}</p>
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
          <div class="case-study-section-body">
            <p>${sectionCopy('concept')}</p>
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
          <div class="case-study-section-body">
            <p>${sectionCopy('details')}</p>
          </div>
          ${buildApplicationLayout()}
          ${contentHtml ? `<div class="case-study-section-body case-study-details-copy">${contentHtml}</div>` : ''}
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

function normalizeCaseStudyPage(html, filePath, collectionAssetsIndex) {
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
        ${metaHtml ? `<div class="case-study-meta-grid"><div class="work-meta">${metaHtml}</div></div>` : ''}
      </div>
      <div class="case-study-hero-side">
        <div class="case-study-hero-media">
          ${mediaHtml}
        </div>
      </div>
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
    contentHtml: '',
    navLinksHtml: {
      html: html.match(/<nav class="case-study-next">[\s\S]*?<\/nav>/i)?.[0] || '',
      backHref: relToCollectionsIndex(filePath),
    },
    footerHtml: html.match(/<footer class="main-footer">[\s\S]*?<\/footer>/i)?.[0] || '',
    scriptBase: relToRepoRoot(filePath),
    scriptsHtml: html.match(/(<script src=[\s\S]*?)<\/body>/i)?.[1] ? '' : '',
  });

  const withScripts = injectStandardScripts(replacement, filePath);
  return injectCollectionAssets(withScripts, filePath, mainTitle, collectionAssetsIndex);
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

function rebuildPage(filePath, collectionAssetsIndex) {
  const html = fs.readFileSync(filePath, 'utf8');
  if (html.trim().length === 0) {
    return { skipped: false, content: buildPlaceholderPage(filePath) };
  }
  if (html.includes('class="case-study-page"')) {
    const normalized = normalizeCaseStudyPage(html, filePath, collectionAssetsIndex);
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

  return {
    skipped: false,
    content: injectCollectionAssets(rebuilt, filePath, mainTitle, collectionAssetsIndex),
  };
}

function main() {
  const collectionAssetsIndex = buildCollectionAssetsIndex();
  const files = walk(collectionsRoot)
    .filter((file) => file.endsWith('.html'))
    .filter((file) => path.relative(collectionsRoot, file) !== 'index.html');

  let processed = 0;
  let skipped = 0;
  const skippedFiles = [];

  for (const file of files) {
    const result = rebuildPage(file, collectionAssetsIndex);
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
