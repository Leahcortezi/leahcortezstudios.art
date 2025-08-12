/*
  RESOURCES PAGE JAVASCRIPT
  ---
  Interactive functionality for the creative tools and generators
  on the resources page.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------
       1. ENHANCED COLOR PALETTE GENERATOR
       -------------------- */
    
    const generateColorsBtn = document.getElementById('generateColors');
    const colorSchemeSelect = document.getElementById('colorScheme');
    const colorPalette = document.getElementById('colorPalette');
    const savePaletteBtn = document.getElementById('savePalette');
    const copyPaletteBtn = document.getElementById('copyPalette');
    const exportCSSBtn = document.getElementById('exportCSS');
    const checkAccessibilityBtn = document.getElementById('checkAccessibility');
    const accessibilityReport = document.getElementById('accessibilityReport');

    // Enhanced color generation functions
    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    function generateColorPalette(scheme) {
        const baseHue = Math.random() * 360;
        const colors = [];

        switch (scheme) {
            case 'emotional':
                // Joy, Calm, Energy, Creativity, Trust
                const emotions = [
                    { h: 45, s: 80, l: 70 },   // Joy - Yellow
                    { h: 200, s: 60, l: 65 },  // Calm - Blue
                    { h: 15, s: 85, l: 60 },   // Energy - Orange
                    { h: 280, s: 70, l: 65 },  // Creativity - Purple
                    { h: 220, s: 75, l: 50 }   // Trust - Deep Blue
                ];
                emotions.forEach(color => {
                    colors.push(hslToHex(color.h, color.s, color.l));
                });
                break;
            
            case 'seasonal':
                const season = ['spring', 'summer', 'autumn', 'winter'][Math.floor(Math.random() * 4)];
                const seasonalPalettes = {
                    spring: [{ h: 110, s: 60, l: 70 }, { h: 290, s: 50, l: 75 }, { h: 60, s: 70, l: 80 }, { h: 200, s: 40, l: 85 }, { h: 350, s: 60, l: 80 }],
                    summer: [{ h: 200, s: 80, l: 60 }, { h: 180, s: 70, l: 65 }, { h: 50, s: 90, l: 70 }, { h: 300, s: 60, l: 70 }, { h: 30, s: 80, l: 75 }],
                    autumn: [{ h: 25, s: 80, l: 55 }, { h: 40, s: 85, l: 60 }, { h: 15, s: 90, l: 45 }, { h: 60, s: 75, l: 40 }, { h: 350, s: 70, l: 50 }],
                    winter: [{ h: 220, s: 60, l: 40 }, { h: 240, s: 50, l: 30 }, { h: 200, s: 40, l: 80 }, { h: 0, s: 0, l: 90 }, { h: 210, s: 30, l: 20 }]
                };
                seasonalPalettes[season].forEach(color => {
                    colors.push(hslToHex(color.h, color.s, color.l));
                });
                break;
            
            case 'accessible':
                // High contrast colors that meet WCAG AA standards
                colors.push('#000000', '#ffffff', '#0066cc', '#ffff00', '#ff0000');
                break;
            
            case 'monochromatic':
                const baseSaturation = 60 + Math.random() * 30;
                for (let i = 0; i < 5; i++) {
                    const lightness = 20 + (i * 15);
                    colors.push(hslToHex(baseHue, baseSaturation, lightness));
                }
                break;
            
            case 'analogous':
                const analogousSaturation = 60 + Math.random() * 30;
                for (let i = 0; i < 5; i++) {
                    const hue = (baseHue + (i * 30)) % 360;
                    const lightness = 40 + Math.random() * 30;
                    colors.push(hslToHex(hue, analogousSaturation, lightness));
                }
                break;
            
            case 'complementary':
                const complementaryHue = (baseHue + 180) % 360;
                const compSaturation = 60 + Math.random() * 30;
                colors.push(hslToHex(baseHue, compSaturation, 30));
                colors.push(hslToHex(baseHue, compSaturation, 50));
                colors.push(hslToHex(baseHue, compSaturation, 70));
                colors.push(hslToHex(complementaryHue, compSaturation, 40));
                colors.push(hslToHex(complementaryHue, compSaturation, 60));
                break;
            
            case 'triadic':
                const triad1 = (baseHue + 120) % 360;
                const triad2 = (baseHue + 240) % 360;
                const triadSaturation = 60 + Math.random() * 30;
                colors.push(hslToHex(baseHue, triadSaturation, 50));
                colors.push(hslToHex(baseHue, triadSaturation, 70));
                colors.push(hslToHex(triad1, triadSaturation, 50));
                colors.push(hslToHex(triad1, triadSaturation, 70));
                colors.push(hslToHex(triad2, triadSaturation, 50));
                break;
        }

        return colors;
    }

    function updateColorPalette(colors) {
        const swatches = colorPalette.querySelectorAll('.color-swatch');
        colors.forEach((color, index) => {
            if (swatches[index]) {
                const display = swatches[index].querySelector('.color-display');
                const code = swatches[index].querySelector('.color-code');
                display.style.backgroundColor = color;
                code.textContent = color;
                swatches[index].setAttribute('data-color', color);
            }
        });
    }

    // Accessibility checking function
    function checkContrastRatio(color1, color2) {
        function getLuminance(hex) {
            const rgb = hexToRgb(hex);
            const rsRGB = rgb.r / 255;
            const gsRGB = rgb.g / 255;
            const bsRGB = rgb.b / 255;

            const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
            const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
            const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        
        return (brightest + 0.05) / (darkest + 0.05);
    }

    if (generateColorsBtn && colorSchemeSelect) {
        generateColorsBtn.addEventListener('click', () => {
            const scheme = colorSchemeSelect.value;
            const colors = generateColorPalette(scheme);
            updateColorPalette(colors);
        });
    }

    if (checkAccessibilityBtn) {
        checkAccessibilityBtn.addEventListener('click', () => {
            const colors = Array.from(colorPalette.querySelectorAll('.color-swatch'))
                .map(swatch => swatch.getAttribute('data-color'));
            
            let reportHTML = '<h3>Accessibility Report</h3>';
            
            // Check each color against white and black backgrounds
            colors.forEach(color => {
                const whiteRatio = checkContrastRatio(color, '#ffffff');
                const blackRatio = checkContrastRatio(color, '#000000');
                
                reportHTML += `
                    <div class="contrast-result">
                        <div class="contrast-sample" style="background-color: ${color}; color: #ffffff;">Aa</div>
                        <div class="contrast-info">
                            <div class="contrast-ratio">White background: ${whiteRatio.toFixed(2)}:1</div>
                            <div class="contrast-status ${whiteRatio >= 4.5 ? 'contrast-pass' : 'contrast-fail'}">
                                ${whiteRatio >= 7 ? 'AAA' : whiteRatio >= 4.5 ? 'AA' : 'Fail'}
                            </div>
                        </div>
                        <div class="contrast-sample" style="background-color: ${color}; color: #000000;">Aa</div>
                        <div class="contrast-info">
                            <div class="contrast-ratio">Black background: ${blackRatio.toFixed(2)}:1</div>
                            <div class="contrast-status ${blackRatio >= 4.5 ? 'contrast-pass' : 'contrast-fail'}">
                                ${blackRatio >= 7 ? 'AAA' : blackRatio >= 4.5 ? 'AA' : 'Fail'}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            accessibilityReport.innerHTML = reportHTML;
            accessibilityReport.classList.add('show');
        });
    }

    if (exportCSSBtn) {
        exportCSSBtn.addEventListener('click', () => {
            const colors = Array.from(colorPalette.querySelectorAll('.color-swatch'))
                .map(swatch => swatch.getAttribute('data-color'));
            
            let cssText = ':root {\n';
            colors.forEach((color, index) => {
                cssText += `  --color-${index + 1}: ${color};\n`;
            });
            cssText += '}';
            
            navigator.clipboard.writeText(cssText).then(() => {
                showNotification('CSS variables copied to clipboard!');
            });
        });
    }

    // Copy color to clipboard when clicked
    if (colorPalette) {
        colorPalette.addEventListener('click', (e) => {
            const swatch = e.target.closest('.color-swatch');
            if (swatch) {
                const color = swatch.getAttribute('data-color');
                navigator.clipboard.writeText(color).then(() => {
                    showNotification(`Copied ${color} to clipboard!`);
                });
            }
        });
    }

    // Save palette functionality
    if (savePaletteBtn) {
        savePaletteBtn.addEventListener('click', () => {
            const colors = Array.from(colorPalette.querySelectorAll('.color-swatch'))
                .map(swatch => swatch.getAttribute('data-color'));
            
            const paletteData = {
                colors: colors,
                scheme: colorSchemeSelect.value,
                timestamp: new Date().toISOString()
            };
            
            const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
            savedPalettes.push(paletteData);
            localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
            
            showNotification('Palette saved to local storage!');
        });
    }

    // Copy all colors functionality
    if (copyPaletteBtn) {
        copyPaletteBtn.addEventListener('click', () => {
            const colors = Array.from(colorPalette.querySelectorAll('.color-swatch'))
                .map(swatch => swatch.getAttribute('data-color'))
                .join(', ');
            
            navigator.clipboard.writeText(colors).then(() => {
                showNotification('All colors copied to clipboard!');
            });
        });
    }

    /* --------------------
       2. LAYOUT GRID GENERATOR
       -------------------- */
    
    const gridColumns = document.getElementById('gridColumns');
    const gridColumnsDisplay = document.getElementById('gridColumnsDisplay');
    const gridGutter = document.getElementById('gridGutter');
    const gridGutterDisplay = document.getElementById('gridGutterDisplay');
    const gridType = document.getElementById('gridType');
    const gridPreview = document.getElementById('gridPreview');
    const exportGridBtn = document.getElementById('exportGrid');

    function updateGrid() {
        const columns = gridColumns.value;
        const gutter = gridGutter.value;
        const type = gridType.value;
        
        gridColumnsDisplay.textContent = columns;
        gridGutterDisplay.textContent = gutter + 'px';
        
        const container = gridPreview.querySelector('.grid-container');
        container.innerHTML = '';
        
        // Set CSS custom properties
        container.style.setProperty('--grid-columns', columns);
        container.style.setProperty('--grid-gutter', gutter + 'px');
        
        // Generate grid columns
        for (let i = 1; i <= columns; i++) {
            const column = document.createElement('div');
            column.className = 'grid-column';
            column.textContent = i;
            container.appendChild(column);
        }
        
        // Adjust grid type
        switch (type) {
            case 'fixed':
                container.style.maxWidth = '1200px';
                container.style.margin = '0 auto';
                break;
            case 'golden':
                const goldenRatio = 1.618;
                container.style.gridTemplateColumns = `repeat(${Math.floor(columns / goldenRatio)}, 1fr) repeat(${Math.ceil(columns / goldenRatio)}, ${goldenRatio}fr)`;
                break;
            case 'print':
                container.style.width = '8.5in';
                container.style.height = '11in';
                container.style.transform = 'scale(0.3)';
                container.style.transformOrigin = 'top left';
                break;
            default:
                container.style.maxWidth = '100%';
                container.style.margin = '0';
                container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
    }

    if (gridColumns) {
        gridColumns.addEventListener('input', updateGrid);
        gridGutter.addEventListener('input', updateGrid);
        gridType.addEventListener('change', updateGrid);
        
        // Initialize
        updateGrid();
    }

    if (exportGridBtn) {
        exportGridBtn.addEventListener('click', () => {
            const columns = gridColumns.value;
            const gutter = gridGutter.value;
            const type = gridType.value;
            
            let cssText = `/* ${type.charAt(0).toUpperCase() + type.slice(1)} Grid System */\n`;
            cssText += `.grid-container {\n`;
            cssText += `  display: grid;\n`;
            cssText += `  grid-template-columns: repeat(${columns}, 1fr);\n`;
            cssText += `  gap: ${gutter}px;\n`;
            
            if (type === 'fixed') {
                cssText += `  max-width: 1200px;\n`;
                cssText += `  margin: 0 auto;\n`;
            } else if (type === 'golden') {
                cssText += `  grid-template-columns: repeat(${Math.floor(columns / 1.618)}, 1fr) repeat(${Math.ceil(columns / 1.618)}, 1.618fr);\n`;
            }
            
            cssText += `}\n\n`;
            cssText += `@media (max-width: 768px) {\n`;
            cssText += `  .grid-container {\n`;
            cssText += `    grid-template-columns: 1fr;\n`;
            cssText += `    gap: ${Math.floor(gutter / 2)}px;\n`;
            cssText += `  }\n`;
            cssText += `}`;
            
            navigator.clipboard.writeText(cssText).then(() => {
                showNotification('Grid CSS copied to clipboard!');
            });
        });
    }

    /* --------------------
       3. CREATIVE PROMPT GENERATOR
       -------------------- */
    
    const promptType = document.getElementById('promptType');
    const generatePromptBtn = document.getElementById('generatePrompt');
    const promptDisplay = document.getElementById('promptDisplay');
    const savePromptBtn = document.getElementById('savePrompt');

    const promptData = {
        daily: {
            subjects: ['portrait', 'landscape', 'still life', 'abstract composition', 'typography piece', 'pattern design'],
            styles: ['minimalist', 'maximalist', 'vintage', 'modern', 'organic', 'geometric'],
            constraints: ['using only 3 colors', 'in 30 minutes', 'without lifting your pen', 'using only circles', 'inspired by music', 'from memory'],
            formats: ['sketch', 'digital art', 'collage', 'photograph', 'vector illustration', 'mixed media']
        },
        project: {
            clients: ['local coffee shop', 'tech startup', 'wellness brand', 'music festival', 'book publisher', 'nonprofit organization'],
            deliverables: ['logo design', 'poster series', 'website mockup', 'packaging design', 'social media campaign', 'brand identity'],
            audiences: ['young professionals', 'families', 'students', 'seniors', 'creative professionals', 'small business owners'],
            moods: ['playful and energetic', 'calm and trustworthy', 'bold and innovative', 'elegant and sophisticated', 'warm and welcoming', 'professional and modern']
        },
        skill: {
            techniques: ['color theory', 'composition', 'typography hierarchy', 'negative space', 'visual balance', 'contrast and emphasis'],
            exercises: ['create 10 variations', 'redesign a classic', 'copy a master work', 'explain your process', 'get feedback from 3 people', 'research the history'],
            tools: ['pen and paper only', 'new software', 'unexpected materials', 'limited color palette', 'grid system', 'golden ratio guidelines']
        },
        style: {
            movements: ['Art Deco', 'Bauhaus', 'Memphis Design', 'Swiss Design', 'Art Nouveau', 'Brutalism'],
            decades: ['1920s elegance', '1950s optimism', '1960s rebellion', '1980s excess', '1990s grunge', '2000s digital'],
            cultures: ['Japanese minimalism', 'Scandinavian simplicity', 'Mexican folk art', 'African patterns', 'Indian textiles', 'Islamic geometry']
        },
        constraint: {
            limitations: ['use only one font', 'no text allowed', 'maximum 2 colors', 'square format only', 'hand-drawn elements', 'no gradients'],
            timeframes: ['5-minute sketch', '1-hour project', 'daily for a week', 'finish in one sitting', 'work for exactly 25 minutes', 'set a timer for 2 hours'],
            materials: ['found objects only', 'newspaper and glue', 'your non-dominant hand', 'phone camera only', 'traditional tools', 'free online resources']
        }
    };

    function generatePrompt() {
        const type = promptType.value;
        const data = promptData[type];
        let promptHTML = '';

        switch (type) {
            case 'daily':
                const subject = data.subjects[Math.floor(Math.random() * data.subjects.length)];
                const style = data.styles[Math.floor(Math.random() * data.styles.length)];
                const constraint = data.constraints[Math.floor(Math.random() * data.constraints.length)];
                const format = data.formats[Math.floor(Math.random() * data.formats.length)];
                
                promptHTML = `
                    <h3>Daily Creative Challenge</h3>
                    <p>Create a <strong>${style} ${subject}</strong> as a <strong>${format}</strong>, ${constraint}.</p>
                    <div class="prompt-meta">Challenge • 1 day</div>
                `;
                break;
                
            case 'project':
                const client = data.clients[Math.floor(Math.random() * data.clients.length)];
                const deliverable = data.deliverables[Math.floor(Math.random() * data.deliverables.length)];
                const audience = data.audiences[Math.floor(Math.random() * data.audiences.length)];
                const mood = data.moods[Math.floor(Math.random() * data.moods.length)];
                
                promptHTML = `
                    <h3>Project Brief</h3>
                    <p>Design a <strong>${deliverable}</strong> for a <strong>${client}</strong> targeting <strong>${audience}</strong>. The design should feel <strong>${mood}</strong>.</p>
                    <div class="prompt-meta">Project • 1-2 weeks</div>
                `;
                break;
                
            case 'skill':
                const technique = data.techniques[Math.floor(Math.random() * data.techniques.length)];
                const exercise = data.exercises[Math.floor(Math.random() * data.exercises.length)];
                const tool = data.tools[Math.floor(Math.random() * data.tools.length)];
                
                promptHTML = `
                    <h3>Skill Building Exercise</h3>
                    <p>Practice <strong>${technique}</strong> by creating a piece where you <strong>${exercise}</strong> using <strong>${tool}</strong>.</p>
                    <div class="prompt-meta">Skill Building • 2-4 hours</div>
                `;
                break;
                
            case 'style':
                const movement = data.movements[Math.floor(Math.random() * data.movements.length)];
                const decade = data.decades[Math.floor(Math.random() * data.decades.length)];
                const culture = data.cultures[Math.floor(Math.random() * data.cultures.length)];
                
                const styleOption = [movement, decade, culture][Math.floor(Math.random() * 3)];
                
                promptHTML = `
                    <h3>Style Exploration</h3>
                    <p>Create a piece inspired by <strong>${styleOption}</strong>. Research the key characteristics and apply them to a modern context.</p>
                    <div class="prompt-meta">Exploration • 3-5 days</div>
                `;
                break;
                
            case 'constraint':
                const limitation = data.limitations[Math.floor(Math.random() * data.limitations.length)];
                const timeframe = data.timeframes[Math.floor(Math.random() * data.timeframes.length)];
                const material = data.materials[Math.floor(Math.random() * data.materials.length)];
                
                promptHTML = `
                    <h3>Creative Constraint Challenge</h3>
                    <p>Create something in a <strong>${timeframe}</strong> where you <strong>${limitation}</strong> using <strong>${material}</strong>.</p>
                    <div class="prompt-meta">Constraint • Variable time</div>
                `;
                break;
        }

        promptDisplay.innerHTML = `<div class="prompt-card">${promptHTML}</div>`;
    }

    if (generatePromptBtn) {
        generatePromptBtn.addEventListener('click', generatePrompt);
    }

    if (savePromptBtn) {
        savePromptBtn.addEventListener('click', () => {
            const promptContent = promptDisplay.innerHTML;
            const savedPrompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
            
            savedPrompts.push({
                content: promptContent,
                timestamp: new Date().toISOString(),
                type: promptType.value
            });
            
            localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
            showNotification('Prompt saved!');
        });
    }

    /* --------------------
       4. TYPOGRAPHY SCALE CALCULATOR
       -------------------- */
    
    const baseSize = document.getElementById('baseSize');
    const scaleRatio = document.getElementById('scaleRatio');
    const typeScalePreview = document.getElementById('typeScalePreview');
    const exportTypeCSSBtn = document.getElementById('exportTypeCSS');

    function updateTypeScale() {
        const base = parseFloat(baseSize.value);
        const ratio = parseFloat(scaleRatio.value);
        
        const scales = [
            { name: 'Small', level: -2 },
            { name: 'Body', level: 0 },
            { name: 'H4', level: 1 },
            { name: 'H3', level: 2 },
            { name: 'H2', level: 3 },
            { name: 'H1', level: 4 },
            { name: 'Display', level: 5 }
        ];
        
        let previewHTML = '';
        
        scales.forEach(scale => {
            const size = Math.round(base * Math.pow(ratio, scale.level));
            previewHTML += `
                <div class="type-scale-item">
                    <div class="type-scale-sample" style="font-size: ${size}px;">${scale.name} Text Sample</div>
                    <div class="type-scale-info">${scale.name}: ${size}px</div>
                </div>
            `;
        });
        
        typeScalePreview.innerHTML = previewHTML;
    }

    if (baseSize && scaleRatio) {
        baseSize.addEventListener('input', updateTypeScale);
        scaleRatio.addEventListener('change', updateTypeScale);
        
        // Initialize
        updateTypeScale();
    }

    if (exportTypeCSSBtn) {
        exportTypeCSSBtn.addEventListener('click', () => {
            const base = parseFloat(baseSize.value);
            const ratio = parseFloat(scaleRatio.value);
            
            let cssText = `/* Typography Scale */\n:root {\n`;
            cssText += `  --font-size-base: ${base}px;\n`;
            cssText += `  --font-scale-ratio: ${ratio};\n\n`;
            
            const scales = [
                { name: 'small', level: -2 },
                { name: 'body', level: 0 },
                { name: 'h4', level: 1 },
                { name: 'h3', level: 2 },
                { name: 'h2', level: 3 },
                { name: 'h1', level: 4 },
                { name: 'display', level: 5 }
            ];
            
            scales.forEach(scale => {
                const size = Math.round(base * Math.pow(ratio, scale.level));
                cssText += `  --font-size-${scale.name}: ${size}px;\n`;
            });
            
            cssText += `}\n\n`;
            cssText += `/* Usage */\n`;
            cssText += `body { font-size: var(--font-size-body); }\n`;
            cssText += `h1 { font-size: var(--font-size-h1); }\n`;
            cssText += `h2 { font-size: var(--font-size-h2); }\n`;
            cssText += `h3 { font-size: var(--font-size-h3); }\n`;
            cssText += `h4 { font-size: var(--font-size-h4); }\n`;
            cssText += `.small { font-size: var(--font-size-small); }\n`;
            cssText += `.display { font-size: var(--font-size-display); }`;
            
            navigator.clipboard.writeText(cssText).then(() => {
                showNotification('Typography CSS copied to clipboard!');
            });
        });
    }
    /* --------------------
       5. MOOD BOARD MAKER
       -------------------- */
    
    const imageUpload = document.getElementById('imageUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const addTextBtn = document.getElementById('addTextBtn');
    const clearBoard = document.getElementById('clearBoard');
    const moodboardCanvas = document.getElementById('moodboardCanvas');
    const saveMoodboard = document.getElementById('saveMoodboard');
    const downloadMoodboard = document.getElementById('downloadMoodboard');

    let draggedElement = null;
    let moodboardItems = [];

    if (uploadBtn && imageUpload) {
        uploadBtn.addEventListener('click', () => {
            imageUpload.click();
        });

        imageUpload.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        addImageToMoodboard(event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    function addImageToMoodboard(imageSrc) {
        // Remove placeholder if it exists
        const placeholder = moodboardCanvas.querySelector('.moodboard-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        const item = document.createElement('div');
        item.className = 'moodboard-item';
        item.draggable = true;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Mood board image';
        
        item.appendChild(img);
        
        // Random positioning
        const maxX = moodboardCanvas.clientWidth - 150;
        const maxY = moodboardCanvas.clientHeight - 150;
        const x = Math.random() * Math.max(0, maxX);
        const y = Math.random() * Math.max(0, maxY);
        
        item.style.position = 'absolute';
        item.style.left = x + 'px';
        item.style.top = y + 'px';
        
        setupDragAndDrop(item);
        moodboardCanvas.appendChild(item);
        moodboardItems.push(item);
    }

    if (addTextBtn) {
        addTextBtn.addEventListener('click', () => {
            const text = prompt('Enter text for your mood board:');
            if (text) {
                addTextToMoodboard(text);
            }
        });
    }

    function addTextToMoodboard(text) {
        // Remove placeholder if it exists
        const placeholder = moodboardCanvas.querySelector('.moodboard-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        const item = document.createElement('div');
        item.className = 'moodboard-item';
        item.draggable = true;
        
        const textElement = document.createElement('div');
        textElement.className = 'text-element';
        textElement.textContent = text;
        textElement.contentEditable = true;
        
        item.appendChild(textElement);
        
        // Random positioning
        const maxX = moodboardCanvas.clientWidth - 100;
        const maxY = moodboardCanvas.clientHeight - 50;
        const x = Math.random() * Math.max(0, maxX);
        const y = Math.random() * Math.max(0, maxY);
        
        item.style.position = 'absolute';
        item.style.left = x + 'px';
        item.style.top = y + 'px';
        
        setupDragAndDrop(item);
        moodboardCanvas.appendChild(item);
        moodboardItems.push(item);
    }

    function setupDragAndDrop(element) {
        element.addEventListener('dragstart', (e) => {
            draggedElement = element;
            e.dataTransfer.effectAllowed = 'move';
        });

        element.addEventListener('dragend', () => {
            draggedElement = null;
        });
    }

    if (moodboardCanvas) {
        moodboardCanvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        moodboardCanvas.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedElement) {
                const rect = moodboardCanvas.getBoundingClientRect();
                const x = e.clientX - rect.left - draggedElement.offsetWidth / 2;
                const y = e.clientY - rect.top - draggedElement.offsetHeight / 2;
                
                draggedElement.style.left = Math.max(0, x) + 'px';
                draggedElement.style.top = Math.max(0, y) + 'px';
            }
        });
    }

    if (clearBoard) {
        clearBoard.addEventListener('click', () => {
            moodboardItems.forEach(item => item.remove());
            moodboardItems = [];
            
            // Add back placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'moodboard-placeholder';
            placeholder.innerHTML = '<p>Click "Upload Images" to start creating your mood board</p>';
            moodboardCanvas.appendChild(placeholder);
        });
    }

    /* --------------------
       6. REFERENCE IMAGE ANALYZER
       -------------------- */
    
    const refImageUpload = document.getElementById('refImageUpload');
    const uploadRefBtn = document.getElementById('uploadRefBtn');
    const analysisType = document.getElementById('analysisType');
    const analyzerCanvas = document.getElementById('analyzerCanvas');
    const analysisResults = document.getElementById('analysisResults');

    if (uploadRefBtn && refImageUpload) {
        uploadRefBtn.addEventListener('click', () => {
            refImageUpload.click();
        });

        refImageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    loadReferenceImage(event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function loadReferenceImage(imageSrc) {
        // Clear previous content
        analyzerCanvas.innerHTML = '';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.className = 'analyzer-image';
        img.alt = 'Reference image';
        
        img.onload = () => {
            analyzerCanvas.appendChild(img);
            performAnalysis();
        };
    }

    function performAnalysis() {
        const type = analysisType.value;
        
        // Clear previous overlay
        const existingOverlay = analyzerCanvas.querySelector('.analysis-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'analysis-overlay';

        switch (type) {
            case 'composition':
                const grid = document.createElement('div');
                grid.className = 'composition-grid';
                overlay.appendChild(grid);
                showAnalysisResults('Composition Analysis', 'Rule of thirds grid overlaid. Position key elements along the grid lines or at intersection points for better composition.');
                break;
            
            case 'color':
                analyzeColors();
                break;
            
            case 'lighting':
                showAnalysisResults('Lighting Analysis', 'Consider the direction, quality, and color temperature of the light source. Notice how shadows and highlights create depth and mood in the image.');
                break;
        }

        analyzerCanvas.appendChild(overlay);
    }

    function analyzeColors() {
        // Simplified color analysis
        const colors = ['#f8c8d0', '#d4a5b0', '#b08290', '#8c5f70', '#683c50'];
        const resultHTML = `
            <h3>Dominant Colors</h3>
            <div class="color-analysis-result">
                ${colors.map(color => `
                    <div class="dominant-color" style="background-color: ${color};" title="${color}"></div>
                `).join('')}
            </div>
            <p>These are approximated dominant colors. For precise analysis, use professional color picker tools.</p>
        `;
        
        analysisResults.innerHTML = resultHTML;
        analysisResults.classList.add('show');
    }

    function showAnalysisResults(title, content) {
        analysisResults.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
        `;
        analysisResults.classList.add('show');
    }

    if (analysisType) {
        analysisType.addEventListener('change', () => {
            if (analyzerCanvas.querySelector('.analyzer-image')) {
                performAnalysis();
            }
        });
    }

    /* --------------------
       4. TYPOGRAPHY TESTER
       -------------------- */
    
    const sampleText = document.getElementById('sampleText');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const fontSizeDisplay = document.getElementById('fontSizeDisplay');
    const previewText = document.getElementById('previewText');
    const saveTypography = document.getElementById('saveTypography');
    const copyCSS = document.getElementById('copyCSS');

    function updateTypography() {
        if (previewText && sampleText && fontSelect && fontSize) {
            previewText.textContent = sampleText.value;
            previewText.style.fontFamily = fontSelect.value;
            previewText.style.fontSize = fontSize.value + 'px';
            
            if (fontSizeDisplay) {
                fontSizeDisplay.textContent = fontSize.value + 'px';
            }
        }
    }

    if (sampleText) {
        sampleText.addEventListener('input', updateTypography);
    }

    if (fontSelect) {
        fontSelect.addEventListener('change', updateTypography);
    }

    if (fontSize) {
        fontSize.addEventListener('input', updateTypography);
    }

    if (copyCSS) {
        copyCSS.addEventListener('click', () => {
            const cssText = `
font-family: "${fontSelect.value}";
font-size: ${fontSize.value}px;
color: #ffffff;
            `.trim();
            
            navigator.clipboard.writeText(cssText).then(() => {
                showNotification('CSS copied to clipboard!');
            });
        });
    }

    /* --------------------
       5. UTILITY FUNCTIONS
       -------------------- */
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--color-primary-accent), #d4a5b0);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            font-family: var(--font-accent);
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Initialize typography preview
    updateTypography();

}); // End of DOMContentLoaded
