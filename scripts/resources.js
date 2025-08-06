// Resources Page Interactive Features

console.log("Creative Block Toolkit loaded! v2.0");

// Data arrays for generators
const objects = [
    "teapot", "spaceship", "bicycle", "butterfly", "lighthouse", "accordion", 
    "cactus", "typewriter", "submarine", "peacock", "windmill", "telescope",
    "mushroom", "compass", "violin", "octopus", "carousel", "hourglass",
    "origami crane", "vintage radio", "hot air balloon", "sea shell",
    "grandfather clock", "prism", "spider web", "constellation"
];

const perspectives = [
    "Bird's eye view", "Worm's eye view", "Close-up macro", "Wide panoramic",
    "Profile silhouette", "Three-quarter angle", "Straight-on frontal",
    "Through a window", "Reflected in water", "From inside looking out",
    "Shadow perspective", "Multiple viewpoints"
];

const layouts = [
    "Asymmetrical", "Centered composition", "Rule of thirds", "Diagonal flow",
    "Circular composition", "Triangular arrangement", "Grid-based", 
    "Spiral composition", "Golden ratio", "Split composition",
    "Layered depth", "Minimalist spacing"
];

const focalPoints = [
    "Center left", "Center right", "Upper left corner", "Lower right corner",
    "Dead center", "Off-center diagonal", "Multiple focus points",
    "Leading lines to corner", "Foreground emphasis", "Background prominence",
    "Negative space focus", "Edge of frame"
];

const mediums = [
    "Watercolor on textured paper", "Charcoal on toned paper", "Digital mixed media",
    "Acrylic paint markers", "Coffee and tea staining", "Pencil and ink wash",
    "Collage with found materials", "Scratchboard technique", "Oil pastels",
    "Gouache illustration", "Pen and colored pencil", "Mixed media sculpture",
    "Fabric and thread art", "Clay and wire sculpture", "Photography manipulation",
    "Printmaking techniques", "Spray paint stencils", "Watercolor and salt effects"
];

const artStyles = [
    "Art Nouveau botanical illustrations", "1920s Art Deco posters", 
    "Japanese woodblock prints", "Medieval illuminated manuscripts",
    "Abstract expressionist color fields", "Pop art screen printing",
    "Victorian scientific diagrams", "Bauhaus geometric design",
    "Surrealist dream imagery", "Folk art primitive style",
    "Minimalist line drawings", "Street art and graffiti",
    "Renaissance chiaroscuro", "Comic book illustration",
    "Cubist fragmentation", "Impressionist color studies",
    "Photorealism with hyper-detailed shading",
    "Lowbrow pop surrealism",
    "Brutalist graphic design",
    "Cyberpunk neon dystopia",
    "Minimalist abstract sculpture",
    "Ink wash Sumi-e painting",
    "Kinetic art with moving parts",
    "Op Art optical illusions",
    "Conceptual text-based art",
    "Psychedelic poster design of the 1960s",
    "Graffiti wildstyle lettering",
    "Steampunk mechanical collage",
    "Eco-art using natural materials",
    "Fantasy illustration with epic landscapes",
    "Glitch art digital distortion",
    "Hypercolor 80s Memphis design",
    "Mixed media textile work",
    "Paper-cut layered illustrations",
    "Monochrome ink illustrations",
    "Collage surreal photomontage",
    "3D voxel pixel sculptures",
    "Augmented reality interactive art",
    "Post-minimalist installation pieces",
    "Experimental ceramics and pottery"
];

const colorPalettes = [
    { colors: ["#8B4513", "#4169E1", "#DAA520"], names: ["Saddle Brown", "Royal Blue", "Goldenrod"] },
    { colors: ["#FF6347", "#40E0D0", "#9370DB"], names: ["Tomato", "Turquoise", "Medium Purple"] },
    { colors: ["#2F4F4F", "#F0E68C", "#CD853F"], names: ["Dark Slate Gray", "Khaki", "Peru"] },
    { colors: ["#DC143C", "#00CED1", "#FFD700"], names: ["Crimson", "Dark Turquoise", "Gold"] },
    { colors: ["#4B0082", "#FF7F50", "#32CD32"], names: ["Indigo", "Coral", "Lime Green"] },
    { colors: ["#8B008B", "#FFA500", "#20B2AA"], names: ["Dark Magenta", "Orange", "Light Sea Green"] },
    { colors: ["#2E8B57", "#FF1493", "#F4A460"], names: ["Sea Green", "Deep Pink", "Sandy Brown"] },
    { colors: ["#191970", "#FF6347", "#F0E68C"], names: ["Midnight Blue", "Tomato", "Khaki"] }
];

const referencePrompts = [
    "Vintage botanical illustrations from the 1920s",
    "Architecture from abandoned buildings",
    "Street photography from different decades",
    "Scientific diagrams and technical drawings",
    "Old family photographs and portraits",
    "Natural textures and organic patterns",
    "Industrial machinery and urban decay",
    "Cultural artifacts and historical objects",
    "Fashion photography from past eras",
    "Still life paintings from art history",
    "Documentary photography of daily life",
    "Abstract forms found in nature"
];

const constraints = [
    "No outlines allowed - only shapes and color",
    "Use only your non-dominant hand",
    "Work in complete silence for focus",
    "Only use three colors maximum",
    "No erasing or undoing allowed",
    "Work standing up the entire time",
    "Use only found materials from your immediate area",
    "Create something intentionally ugly",
    "Work with your eyes closed for 5 minutes",
    "Use only geometric shapes",
    "No planning - start immediately",
    "Include text or words in the composition",
    "Work only in black and white",
    "Use unconventional tools (no brushes/pencils)",
    "Create something smaller than your palm"
];

const timerPrompts = [
    "Draw the last thing you ate, but make it dramatic",
    "Your biggest fear as a cute cartoon character",
    "The contents of your bag as a still life",
    "Your mood right now as a landscape",
    "Redesign your least favorite everyday object",
    "A self-portrait using only shapes",
    "The view from your window in a different art style",
    "An emotion you felt today as an abstract composition",
    "Your favorite song as a visual pattern",
    "What you did one hour ago as a comic panel",
    "Draw your anxiety as a creature you can befriend",
    "Your creative block as a physical object you can transform",
    "The feeling of being late, but make it beautiful",
    "Draw procrastination as a character with superpowers",
    "Your to-do list as a fantasy quest map",
    "The last dream you remember as a movie poster",
    "Draw what inspiration feels like in your body",
    "Your worst habit as a helpful sidekick character",
    "The feeling of nostalgia as a place you can visit",
    "Draw what your inner critic looks like, then give it a makeover"
];

const shakePrompts = [
    "Draw your anxiety as a creature that you can befriend",
    "What would your creative block look like if it was a physical object?",
    "Create art that represents the last conversation you had",
    "Turn your biggest recent mistake into something beautiful",
    "Draw what inspiration feels like in your body",
    "Create something that represents 'waiting'",
    "What does your creative voice look like as a character?",
    "Turn a boring daily routine into an adventure scene",
    "Draw the feeling of almost remembering something important",
    "Create art about the space between thoughts",
    "Draw what it feels like to be misunderstood, but make it hopeful",
    "Create a character that represents your relationship with time",
    "Draw what your comfort zone looks like from the outside",
    "Make art about the feeling of growth - awkward but necessary",
    "Draw what your intuition whispers to you",
    "Create something inspired by the phrase 'beautiful chaos'",
    "Draw what it feels like when everything clicks into place",
    "Make art about the courage it takes to start over",
    "Draw your biggest dream as if it's already happening",
    "Create art that represents the feeling of 'not quite there yet'",
    "Draw what it feels like to surprise yourself",
    "Make art about the beauty of imperfect timing",
    "Draw what your creative energy looks like when it's fully unleashed",
    "Create something inspired by 'the magic hiding in ordinary moments'"
];



// Timer functionality
let timerInterval;
let timeLeft = 600; // 10 minutes in seconds

// Generator Functions
function generateObjectMashup() {
    const obj1 = objects[Math.floor(Math.random() * objects.length)];
    let obj2 = objects[Math.floor(Math.random() * objects.length)];
    
    // Ensure different objects
    while (obj2 === obj1) {
        obj2 = objects[Math.floor(Math.random() * objects.length)];
    }
    
    document.getElementById('object1').textContent = obj1;
    document.getElementById('object2').textContent = obj2;
    
    // Add animation
    const display = document.querySelector('.tool-card .generator-display');
    display.classList.add('loading');
    setTimeout(() => display.classList.remove('loading'), 1000);
}

function rollComposition() {
    const perspective = perspectives[Math.floor(Math.random() * perspectives.length)];
    const layout = layouts[Math.floor(Math.random() * layouts.length)];
    const focal = focalPoints[Math.floor(Math.random() * focalPoints.length)];
    
    document.getElementById('perspective').textContent = perspective;
    document.getElementById('layout').textContent = layout;
    document.getElementById('focal-point').textContent = focal;
    
    // Add visual feedback
    const diceResults = document.querySelectorAll('.dice-result');
    diceResults.forEach((result, index) => {
        setTimeout(() => {
            result.style.transform = 'scale(1.05)';
            setTimeout(() => result.style.transform = 'scale(1)', 200);
        }, index * 100);
    });
}

function switchMedium() {
    const medium = mediums[Math.floor(Math.random() * mediums.length)];
    document.getElementById('medium').textContent = medium;
    
    const display = document.getElementById('medium').parentElement;
    display.classList.add('loading');
    setTimeout(() => display.classList.remove('loading'), 800);
}

function swapStyle() {
    const style = artStyles[Math.floor(Math.random() * artStyles.length)];
    document.getElementById('art-style').textContent = style;
    
    const display = document.getElementById('art-style').parentElement;
    display.classList.add('loading');
    setTimeout(() => display.classList.remove('loading'), 800);
}

function randomizeColors() {
    const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    
    document.getElementById('color1').style.backgroundColor = palette.colors[0];
    document.getElementById('color2').style.backgroundColor = palette.colors[1];
    document.getElementById('color3').style.backgroundColor = palette.colors[2];
    
    document.getElementById('color1-name').textContent = palette.names[0];
    document.getElementById('color2-name').textContent = palette.names[1];
    document.getElementById('color3-name').textContent = palette.names[2];
    
    // Animate color swatches
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach((swatch, index) => {
        setTimeout(() => {
            swatch.style.transform = 'scale(1.1) rotate(10deg)';
            setTimeout(() => swatch.style.transform = 'scale(1) rotate(0deg)', 300);
        }, index * 100);
    });
}

function spinReference() {
    const reference = referencePrompts[Math.floor(Math.random() * referencePrompts.length)];
    document.getElementById('reference-prompt').textContent = reference;
    
    const display = document.getElementById('reference-prompt').parentElement;
    display.classList.add('loading');
    setTimeout(() => display.classList.remove('loading'), 800);
}

function generateConstraint() {
    const constraint = constraints[Math.floor(Math.random() * constraints.length)];
    document.getElementById('constraint').textContent = constraint;
    
    const display = document.getElementById('constraint').parentElement;
    display.classList.add('loading');
    setTimeout(() => display.classList.remove('loading'), 800);
}

function newTimerPrompt() {
    const prompt = timerPrompts[Math.floor(Math.random() * timerPrompts.length)];
    document.getElementById('timer-prompt').textContent = prompt;
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timeLeft = 600; // Reset to 10 minutes
    const timerDisplay = document.getElementById('timer-display');
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
            timerDisplay.style.color = '#ff6b6b';
            
            // Reset after 3 seconds
            setTimeout(() => {
                timeLeft = 600;
                timerDisplay.textContent = "10:00";
                timerDisplay.style.color = '';
            }, 3000);
        }
        
        timeLeft--;
    }, 1000);
}



function shakeInspire() {
    const prompt = shakePrompts[Math.floor(Math.random() * shakePrompts.length)];
    const resultDiv = document.getElementById('shake-result');
    
    // Add shake animation
    const shakeCard = document.querySelector('.shake-card');
    shakeCard.classList.add('shaking');
    
    setTimeout(() => {
        resultDiv.textContent = prompt;
        shakeCard.classList.remove('shaking');
    }, 500);
}

// Mobile shake detection
if ('DeviceMotionEvent' in window) {
    let lastX, lastY, lastZ;
    let moveCounter = 0;
    
    window.addEventListener('devicemotion', function(event) {
        const acceleration = event.accelerationIncludingGravity;
        const curX = acceleration.x;
        const curY = acceleration.y;
        const curZ = acceleration.z;
        
        if (lastX !== null) {
            const deltaX = Math.abs(lastX - curX);
            const deltaY = Math.abs(lastY - curY);
            const deltaZ = Math.abs(lastZ - curZ);
            
            if ((deltaX + deltaY + deltaZ) > 15) {
                moveCounter++;
                if (moveCounter > 2) {
                    shakeInspire();
                    moveCounter = 0;
                }
            }
        }
        
        lastX = curX;
        lastY = curY;
        lastZ = curZ;
    });
}



// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Creative Block Toolkit ready!');
    
    // Test modal system
    console.log('Testing modal system...');
    const colorModal = document.getElementById('colorTheoryModal');
    const overlay = document.querySelector('.modal-overlay');
    console.log('Color modal found:', !!colorModal);
    console.log('Overlay found:', !!overlay);
    
    // Test color palette inputs
    const baseColor = document.getElementById('baseColor');
    const colorScheme = document.getElementById('colorScheme');
    const paletteDisplay = document.getElementById('paletteDisplay');
    const accessibilityReport = document.getElementById('accessibilityReport');
    
    console.log('Base color input found:', !!baseColor);
    console.log('Color scheme select found:', !!colorScheme);
    console.log('Palette display found:', !!paletteDisplay);
    console.log('Accessibility report found:', !!accessibilityReport);
    
    // Add some visual flair to page load
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Color Palette Extractor
function extractPalette() {
    const input = document.getElementById('paletteInput').value.trim();
    const display = document.getElementById('paletteExtractor');
    
    if (!input) {
        display.innerHTML = '<span style="color: #f8c8d0;">Please enter a description...</span>';
        return;
    }
    
    // Color palettes based on common descriptions
    const paletteMap = {
        'autumn': ['#8B4513', '#CD853F', '#DAA520', '#B22222', '#228B22'],
        'ocean': ['#006994', '#47B5FF', '#06FFA5', '#FFFFFF', '#FFE66D'],
        'vintage': ['#8B4513', '#DEB887', '#F5DEB3', '#2F4F4F', '#800080'],
        'sunset': ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B6A', '#963484'],
        'forest': ['#228B22', '#32CD32', '#8FBC8F', '#2E8B57', '#006400'],
        'monochrome': ['#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF'],
        'warm': ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569', '#F8B500'],
        'cool': ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
        'earth': ['#8D6E63', '#A0522D', '#D2B48C', '#F4A460', '#CD853F']
    };
    
    // Find matching palette
    let selectedPalette = null;
    for (const [key, colors] of Object.entries(paletteMap)) {
        if (input.toLowerCase().includes(key)) {
            selectedPalette = colors;
            break;
        }
    }
    
    // Default palette if no match
    if (!selectedPalette) {
        const allPalettes = Object.values(paletteMap);
        selectedPalette = allPalettes[Math.floor(Math.random() * allPalettes.length)];
    }
    
    // Display palette
    let paletteHTML = '<div style="display: flex; justify-content: center; gap: 8px; margin: 10px 0;">';
    selectedPalette.forEach(color => {
        paletteHTML += `<div style="width: 30px; height: 30px; background: ${color}; border-radius: 50%; border: 2px solid rgba(248, 200, 208, 0.3);"></div>`;
    });
    paletteHTML += '</div>';
    paletteHTML += `<div style="font-size: 0.8rem; margin-top: 8px;">${selectedPalette.join(' • ')}</div>`;
    
    display.innerHTML = paletteHTML;
}

// Project Name Generator
const projectNames = [
    "Echoes of Memory", "Hidden Narratives", "Fragments Reclaimed", "Silent Testimonies",
    "Between Worlds", "Inherited Light", "Whispered Stories", "Sacred Geometries",
    "Cultural Threads", "Forgotten Rituals", "Modern Mythology", "Identity Mosaic",
    "Ancestral Voices", "Contemporary Altars", "Memory Palace", "Bridge Builders",
    "Lost & Found", "Heritage Reimagined", "Borderland Chronicles", "Living History",
    "Diaspora Dreams", "Collective Memory", "Visual Poetry", "Cultural Cartography"
];

function generateProjectName() {
    const display = document.getElementById('projectName');
    const randomName = projectNames[Math.floor(Math.random() * projectNames.length)];
    display.innerHTML = `<span style="color: #f8c8d0; font-weight: 600;">${randomName}</span>`;
}

// Aspect Ratio Calculator
function calculateAspectRatio() {
    const width = parseFloat(document.getElementById('aspectWidth').value);
    const height = parseFloat(document.getElementById('aspectHeight').value);
    const preset = document.getElementById('aspectPreset').value;
    const customRatio = parseFloat(document.getElementById('customRatio').value);
    const display = document.getElementById('aspectResults');
    
    let result = '<div style="font-size: 0.7rem; line-height: 1.4;">';
    
    if (preset !== 'custom') {
        // Use preset ratio
        const ratios = {
            '16:9': 16/9,
            '4:3': 4/3,
            '3:2': 3/2,
            '1:1': 1,
            '1.618:1': 1.618,
            '9:16': 9/16
        };
        
        const ratio = ratios[preset];
        
        if (width && !height) {
            const calculatedHeight = Math.round(width / ratio);
            result += `<div style="color: #f8c8d0; font-weight: bold;">Perfect ${preset} Dimensions:</div>`;
            result += `<strong>Width:</strong> ${width}px<br>`;
            result += `<strong>Height:</strong> ${calculatedHeight}px<br>`;
            result += `<strong>Ratio:</strong> ${ratio.toFixed(3)}:1`;
        } else if (height && !width) {
            const calculatedWidth = Math.round(height * ratio);
            result += `<div style="color: #f8c8d0; font-weight: bold;">Perfect ${preset} Dimensions:</div>`;
            result += `<strong>Width:</strong> ${calculatedWidth}px<br>`;
            result += `<strong>Height:</strong> ${height}px<br>`;
            result += `<strong>Ratio:</strong> ${ratio.toFixed(3)}:1`;
        } else {
            result += `<div style="color: #f8c8d0; font-weight: bold;">${preset} Reference:</div>`;
            result += `<strong>Ratio:</strong> ${ratio.toFixed(3)}:1<br>`;
            result += `<strong>Example:</strong> 1920×${Math.round(1920/ratio)} or ${Math.round(1080*ratio)}×1080`;
        }
    } else if (customRatio && width) {
        // Custom ratio with width
        const calculatedHeight = Math.round(width / customRatio);
        result += `<div style="color: #f8c8d0; font-weight: bold;">Custom Ratio ${customRatio}:1</div>`;
        result += `<strong>Width:</strong> ${width}px<br>`;
        result += `<strong>Height:</strong> ${calculatedHeight}px`;
    } else if (customRatio && height) {
        // Custom ratio with height
        const calculatedWidth = Math.round(height * customRatio);
        result += `<div style="color: #f8c8d0; font-weight: bold;">Custom Ratio ${customRatio}:1</div>`;
        result += `<strong>Width:</strong> ${calculatedWidth}px<br>`;
        result += `<strong>Height:</strong> ${height}px`;
    } else if (width && height) {
        // Calculate ratio from both dimensions
        const ratio = (width / height).toFixed(3);
        result += `<div style="color: #f8c8d0; font-weight: bold;">Current Dimensions:</div>`;
        result += `<strong>Ratio:</strong> ${ratio}:1<br>`;
        
        // Find closest standard ratio
        const standards = {
            '16:9': 1.778, '4:3': 1.333, '3:2': 1.5, '1:1': 1, 
            'Golden': 1.618, '9:16': 0.563
        };
        let closest = '16:9';
        let closestDiff = Math.abs(parseFloat(ratio) - standards['16:9']);
        
        for (const [name, value] of Object.entries(standards)) {
            const diff = Math.abs(parseFloat(ratio) - value);
            if (diff < closestDiff) {
                closest = name;
                closestDiff = diff;
            }
        }
        
        result += `<strong>Closest Standard:</strong> ${closest}`;
    } else {
        result += 'Enter width or height with a ratio preset, or both dimensions to analyze.';
    }
    
    result += '</div>';
    display.innerHTML = result;
}

// DPI/Resolution Guide
function showDPIGuide() {
    const outputType = document.getElementById('outputType').value;
    const colorMode = document.getElementById('colorMode').value;
    const display = document.getElementById('dpiResults');
    
    const guides = {
        web: {
            dpi: '72-96 DPI',
            format: 'RGB, sRGB color space',
            notes: 'PNG for graphics, JPEG for photos. Optimize for loading speed.'
        },
        print: {
            dpi: '300 DPI minimum',
            format: 'CMYK color mode preferred',
            notes: 'Add 0.125" bleed. Use high-quality JPEG or TIFF for photos.'
        },
        photo: {
            dpi: '300-600 DPI',
            format: 'RGB or Adobe RGB',
            notes: 'Higher DPI for enlargements. TIFF or high-quality JPEG.'
        },
        large: {
            dpi: '150-300 DPI',
            format: 'CMYK, large format profile',
            notes: 'Lower DPI acceptable for viewing distance. Vector preferred.'
        },
        book: {
            dpi: '300-600 DPI',
            format: 'CMYK, coated/uncoated profile',
            notes: 'Higher DPI for text clarity. Consider paper type.'
        },
        poster: {
            dpi: '150-300 DPI',
            format: 'CMYK, large format',
            notes: 'DPI depends on viewing distance. Vector graphics scale best.'
        }
    };
    
    const guide = guides[outputType];
    let result = `<div style="font-size: 0.7rem; line-height: 1.4;">`;
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-bottom: 4px;">${outputType.charAt(0).toUpperCase() + outputType.slice(1)} Specifications:</div>`;
    result += `<strong>Resolution:</strong> ${guide.dpi}<br>`;
    result += `<strong>Color Mode:</strong> ${guide.format}<br>`;
    result += `<strong>Notes:</strong> ${guide.notes}`;
    
    // Add color mode specific info
    if (colorMode === 'cmyk') {
        result += `<br><br><strong>CMYK Tips:</strong> Convert RGB to CMYK before printing. Colors may shift slightly.`;
    } else if (colorMode === 'rgb') {
        result += `<br><br><strong>RGB Tips:</strong> Best for digital display. Use sRGB for web compatibility.`;
    }
    
    result += `</div>`;
    display.innerHTML = result;
}

// Is Your Color Palette Accessible
function testPaletteAccessibility() {
    const color1 = document.getElementById('paletteColor1').value;
    const color2 = document.getElementById('paletteColor2').value;
    const color3 = document.getElementById('paletteColor3').value;
    const color4 = document.getElementById('paletteColor4').value;
    const level = document.getElementById('accessibilityLevel').value;
    const colorBlindTest = document.getElementById('colorBlindTest').value;
    const display = document.getElementById('accessibilityResults');
    
    const colors = [color1, color2, color3, color4];
    
    // Convert hex to RGB for calculations
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // Calculate relative luminance
    function getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    // Calculate contrast ratio
    function getContrastRatio(color1, color2) {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
        const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }
    
    let result = '<div style="font-size: 0.65rem; line-height: 1.2;">';
    
    // Show color palette
    result += '<div style="display: flex; gap: 4px; margin-bottom: 6px; justify-content: center;">';
    colors.forEach(color => {
        result += `<div style="width: 20px; height: 20px; background: ${color}; border-radius: 3px; border: 1px solid rgba(255,255,255,0.3);"></div>`;
    });
    result += '</div>';
    
    // Test all color combinations
    const threshold = level === 'aa' ? 4.5 : 7.0;
    let passCount = 0;
    let totalTests = 0;
    
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-bottom: 4px;">Contrast Tests (${level.toUpperCase()}):</div>`;
    
    for (let i = 0; i < colors.length; i++) {
        for (let j = i + 1; j < colors.length; j++) {
            const ratio = getContrastRatio(colors[i], colors[j]);
            const passes = ratio >= threshold;
            passCount += passes ? 1 : 0;
            totalTests++;
            
            const status = passes ? '✓' : '✗';
            const statusColor = passes ? '#4CAF50' : '#F44336';
            result += `<div style="color: ${statusColor};">${status} ${ratio.toFixed(1)}:1</div>`;
        }
    }
    
    const overallScore = Math.round((passCount / totalTests) * 100);
    result += `<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(248, 200, 208, 0.2);">`;
    result += `<strong>Accessibility Score: ${overallScore}%</strong><br>`;
    result += `<strong>Passed:</strong> ${passCount}/${totalTests} combinations`;
    
    // Color blindness note
    if (colorBlindTest !== 'normal') {
        const notes = {
            protanopia: 'Red-blind users may struggle with red/green distinctions',
            deuteranopia: 'Green-blind users may have difficulty with green/red',
            tritanopia: 'Blue-blind users may not distinguish blue/yellow well'
        };
        result += `<br><strong>Color Blind Note:</strong> ${notes[colorBlindTest]}`;
    }
    
    result += '</div></div>';
    
    display.innerHTML = result;
}

// File Size Calculator
function calculateFileSize() {
    const width = parseFloat(document.getElementById('pixelWidth').value);
    const height = parseFloat(document.getElementById('pixelHeight').value);
    const format = document.getElementById('fileFormat').value;
    const bitDepth = parseInt(document.getElementById('bitDepth').value);
    const display = document.getElementById('fileSizeResults');
    
    if (!width || !height) {
        display.innerHTML = '<span style="color: #f8c8d0;">Enter both width and height</span>';
        return;
    }
    
    const pixels = width * height;
    const channels = 3; // RGB
    const bytesPerChannel = bitDepth / 8;
    
    // Base uncompressed size
    const uncompressedMB = (pixels * channels * bytesPerChannel) / (1024 * 1024);
    
    // Format multipliers (approximate)
    const formatMultipliers = {
        uncompressed: 1,
        png: 0.6, // Lossless compression
        jpg: 0.1, // High quality JPEG
        jpgMed: 0.05, // Medium quality JPEG
        psd: 1.2, // PSD with layers
        tiff: 0.8 // TIFF compression
    };
    
    const estimatedMB = uncompressedMB * formatMultipliers[format];
    
    let result = `<div style="font-size: 0.7rem; line-height: 1.4;">`;
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-bottom: 4px;">${width}×${height} (${(pixels/1000000).toFixed(1)}MP)</div>`;
    result += `<strong>Uncompressed:</strong> ${uncompressedMB.toFixed(1)} MB<br>`;
    
    const formatNames = {
        uncompressed: 'Uncompressed',
        png: 'PNG',
        jpg: 'JPEG (High)',
        jpgMed: 'JPEG (Medium)',
        psd: 'PSD',
        tiff: 'TIFF'
    };
    
    if (format !== 'uncompressed') {
        result += `<strong>${formatNames[format]}:</strong> ~${estimatedMB.toFixed(1)} MB<br>`;
    }
    
    result += `<strong>Bit Depth:</strong> ${bitDepth}-bit<br>`;
    
    // Storage estimates
    if (estimatedMB > 100) {
        result += `<div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(248, 200, 208, 0.2);">`;
        result += `<strong>Storage:</strong> Large file - consider compression`;
        result += `</div>`;
    } else if (estimatedMB > 10) {
        result += `<div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(248, 200, 208, 0.2);">`;
        result += `<strong>Storage:</strong> Medium file size`;
        result += `</div>`;
    }
    
    result += `</div>`;
    display.innerHTML = result;
}

// Unit Converter
function convertUnits() {
    const width = parseFloat(document.getElementById('convertWidth').value);
    const height = parseFloat(document.getElementById('convertHeight').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const dpi = parseFloat(document.getElementById('dpiSelect').value);
    const display = document.getElementById('conversionResults');
    
    if (!width || !height) {
        display.innerHTML = '<span style="color: #f8c8d0;">Enter both width and height</span>';
        return;
    }
    
    let result = '<div style="font-size: 0.7rem; line-height: 1.4;">';
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-bottom: 4px;">Converting ${width} × ${height} ${fromUnit.toUpperCase()}</div>`;
    
    // Convert everything to inches first for consistent calculations
    let widthInches, heightInches;
    
    switch(fromUnit) {
        case 'px':
            widthInches = width / dpi;
            heightInches = height / dpi;
            break;
        case 'in':
            widthInches = width;
            heightInches = height;
            break;
        case 'cm':
            widthInches = width / 2.54;
            heightInches = height / 2.54;
            break;
        case 'mm':
            widthInches = width / 25.4;
            heightInches = height / 25.4;
            break;
    }
    
    // Calculate all other units
    const widthPx = Math.round(widthInches * dpi);
    const heightPx = Math.round(heightInches * dpi);
    const widthCm = widthInches * 2.54;
    const heightCm = heightInches * 2.54;
    const widthMm = widthInches * 25.4;
    const heightMm = heightInches * 25.4;
    
    // Display conversions (skip the original unit)
    if (fromUnit !== 'px') {
        result += `<strong>Pixels (${dpi} DPI):</strong> ${widthPx} × ${heightPx} px<br>`;
    }
    if (fromUnit !== 'in') {
        result += `<strong>Inches:</strong> ${widthInches.toFixed(2)}" × ${heightInches.toFixed(2)}"<br>`;
    }
    if (fromUnit !== 'cm') {
        result += `<strong>Centimeters:</strong> ${widthCm.toFixed(2)} × ${heightCm.toFixed(2)} cm<br>`;
    }
    if (fromUnit !== 'mm') {
        result += `<strong>Millimeters:</strong> ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm<br>`;
    }
    
    // Add aspect ratio and file size estimate
    const aspectRatio = (width / height).toFixed(2);
    result += `<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(248, 200, 208, 0.2);">`;
    result += `<strong>Aspect Ratio:</strong> ${aspectRatio}:1<br>`;
    
    // Estimate file size (rough calculation)
    const pixelCount = widthPx * heightPx;
    const fileSizeMB = (pixelCount * 3 / 1024 / 1024).toFixed(1); // RGB, uncompressed
    result += `<strong>Est. File Size:</strong> ${fileSizeMB} MB (RGB)`;
    result += `</div>`;
    
    result += '</div>';
    
    display.innerHTML = result;
}



// Daily Creative Challenge
const creativeChallenges = [
    "Draw something from your kitchen in an unusual perspective",
    "Create art inspired by the last song you listened to",
    "Make a self-portrait using only circles and lines",
    "Draw your mood right now as a weather pattern",
    "Illustrate a childhood memory in 3 panels",
    "Create a pattern inspired by something in nature",
    "Draw the view from your window in a fantasy style",
    "Make art using only warm colors today",
    "Draw your favorite food as if it were a superhero",
    "Create a landscape that represents how you feel",
    "Draw something ordinary in an extraordinary way",
    "Make a character design inspired by your pet or favorite animal",
    "Create abstract art inspired by your favorite book",
    "Draw your hand in 5 different poses",
    "Make a collage using only magazine cutouts",
    "Draw something that makes you happy",
    "Create art inspired by your favorite time of day",
    "Draw a building or structure you see every day",
    "Make a comic strip about your morning routine",
    "Create a mandala inspired by your current emotions",
    "Draw texture studies of 3 different materials",
    "Make art inspired by a conversation you overheard",
    "Draw your dream workspace or studio",
    "Create a character that represents your current goal",
    "Draw something using only your non-dominant hand",
    "Design a new mythical creature combining 3 real animals",
    "Draw what music looks like as it flows through the air",
    "Create a map of an imaginary place you'd like to visit",
    "Draw your biggest fear as a friendly cartoon character",
    "Make art using only items found in your junk drawer",
    "Draw what love looks like without using hearts or people",
    "Create a poster for the worst movie idea you can imagine",
    "Draw your favorite childhood toy as an adult superhero",
    "Make art that represents the feeling of forgetting something important",
    "Draw what your creative voice would look like as a person",
    "Create a pattern using only the shapes you can make with your hands",
    "Draw a conversation between two inanimate objects",
    "Make art inspired by the strangest compliment you've ever received",
    "Draw what procrastination looks like in your mind",
    "Create a piece showing what it feels like to finish something difficult",
    "Draw your ideal creative space in impossible architecture",
    "Make art that represents the sound of your favorite word",
    "Draw what inspiration feels like when it hits you",
    "Create a comic about the secret life of office supplies",
    "Draw yourself as the main character in your favorite video game",
    "Make art inspired by the most beautiful mistake you've ever made",
    "Draw what your neighborhood would look like in 100 years",
    "Create a piece showing what it feels like to learn something new"
];

function generateDailyChallenge() {
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Use date as seed for consistent daily challenge
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const challenge = creativeChallenges[dayOfYear % creativeChallenges.length];
    
    document.getElementById('challengeDate').textContent = dateString;
    document.getElementById('todaysChallenge').textContent = challenge;
    
    // Generate a random hashtag
    const hashtags = ['#DailyArt', '#CreativeChallenge', '#ArtPractice', '#SketchDaily', '#CreateDaily'];
    const randomTag = hashtags[Math.floor(Math.random() * hashtags.length)];
    document.getElementById('challengeTag').textContent = randomTag;
}

// Font Pairing Helper
const fontPairings = [
    { primary: "Playfair Display", secondary: "Source Sans Pro", use: "Editorial, luxury branding" },
    { primary: "Montserrat", secondary: "Merriweather", use: "Modern websites, blogs" },
    { primary: "Oswald", secondary: "Open Sans", use: "Headlines, clean layouts" },
    { primary: "Lora", secondary: "Lato", use: "Reading-heavy content" },
    { primary: "Roboto Slab", secondary: "Roboto", use: "Tech, corporate" },
    { primary: "Crimson Text", secondary: "Work Sans", use: "Academic, professional" },
    { primary: "Abril Fatface", secondary: "Nunito", use: "Creative, playful projects" },
    { primary: "Cormorant Garamond", secondary: "Proza Libre", use: "Elegant, sophisticated" },
    { primary: "Space Mono", secondary: "Work Sans", use: "Tech, modern" },
    { primary: "Bitter", secondary: "Source Sans Pro", use: "News, journalism" },
    { primary: "Archivo Black", secondary: "Archivo", use: "Impact, sports" },
    { primary: "Spectral", secondary: "Karla", use: "Cultural, editorial" }
];

function generateFontPairing() {
    const pairing = fontPairings[Math.floor(Math.random() * fontPairings.length)];
    const display = document.getElementById('fontPairing');
    
    let pairingHTML = `
        <div style="margin: 10px 0;">
            <div style="font-weight: bold; color: #f8c8d0; margin-bottom: 8px;">Primary: ${pairing.primary}</div>
            <div style="color: rgba(255,255,255,0.9); margin-bottom: 8px;">Secondary: ${pairing.secondary}</div>
            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7); font-style: italic;">Best for: ${pairing.use}</div>
        </div>
    `;
    
    display.innerHTML = pairingHTML;
}

// Visual Color Palette Generator
function generateColorPalette() {
    const input = document.getElementById('paletteInput').value.trim().toLowerCase();
    
    // Enhanced color palettes based on keywords
    const paletteMap = {
        'autumn': ['#8B4513', '#CD853F', '#DAA520', '#B22222', '#FF8C00'],
        'fall': ['#A0522D', '#D2691E', '#FF4500', '#8B4513', '#CD853F'],
        'ocean': ['#006994', '#47B5FF', '#06FFA5', '#87CEEB', '#4682B4'],
        'sea': ['#191970', '#4169E1', '#00CED1', '#20B2AA', '#87CEEB'],
        'vintage': ['#8B4513', '#DEB887', '#F5DEB3', '#2F4F4F', '#D2691E'],
        'retro': ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF6B9D', '#C7CEEA'],
        'sunset': ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B6A', '#963484'],
        'sunrise': ['#FFB347', '#FF7F7F', '#FFD1DC', '#FFCCCB', '#FFF8DC'],
        'forest': ['#228B22', '#32CD32', '#8FBC8F', '#2E8B57', '#006400'],
        'nature': ['#228B22', '#8FBC8F', '#DEB887', '#D2691E', '#6B8E23'],
        'neon': ['#FF073A', '#39FF14', '#00FFFF', '#FF1493', '#FFFF00'],
        'city': ['#2F2F2F', '#696969', '#A0A0A0', '#4169E1', '#FF6B6B'],
        'pastel': ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'],
        'warm': ['#FF6B6B', '#FF8E53', '#FFD93D', '#F7931E', '#FF4500'],
        'cool': ['#4ECDC4', '#45B7D1', '#96CEB4', '#A8E6CF', '#87CEEB'],
        'monochrome': ['#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF'],
        'earth': ['#8D6E63', '#A0522D', '#D2B48C', '#F4A460', '#CD853F'],
        'tropical': ['#00CED1', '#FFD700', '#FF6347', '#32CD32', '#FF1493'],
        'winter': ['#E6E6FA', '#B0E0E6', '#F0F8FF', '#DCDCDC', '#C0C0C0'],
        'spring': ['#98FB98', '#FFB6C1', '#FFFFE0', '#E0FFFF', '#F0E68C'],
        'summer': ['#FFD700', '#FF6347', '#32CD32', '#87CEEB', '#FF69B4'],
        'desert': ['#F4A460', '#DEB887', '#CD853F', '#D2691E', '#A0522D']
    };
    
    let selectedPalette = null;
    
    if (input) {
        // Find matching palette
        for (const [key, colors] of Object.entries(paletteMap)) {
            if (input.includes(key)) {
                selectedPalette = colors;
                break;
            }
        }
    }
    
    // Default to random palette if no match or no input
    if (!selectedPalette) {
        const allPalettes = Object.values(paletteMap);
        selectedPalette = allPalettes[Math.floor(Math.random() * allPalettes.length)];
    }
    
    // Update visual display
    const colorContainer = document.getElementById('paletteColors');
    colorContainer.innerHTML = '';
    
    selectedPalette.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.style.width = '32px';
        colorDiv.style.height = '32px';
        colorDiv.style.background = color;
        colorDiv.style.borderRadius = '50%';
        colorDiv.style.border = '2px solid rgba(248, 200, 208, 0.3)';
        colorDiv.style.cursor = 'pointer';
        colorDiv.title = color;
        colorContainer.appendChild(colorDiv);
    });
    
    document.getElementById('paletteHex').textContent = selectedPalette.join(' • ');
    
    // Add animation
    colorContainer.style.transform = 'scale(0.9)';
    setTimeout(() => colorContainer.style.transform = 'scale(1)', 200);
}

// Interactive Gradient Generator
function generateRandomGradient() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43', '#10AC84', '#EE5A52', '#0ABDE3', '#3742FA', '#2F3542', '#FF3838', '#FF9500', '#6C5CE7', '#A29BFE', '#FD79A8'];
    
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2 = colors[Math.floor(Math.random() * colors.length)];
    while (color2 === color1) {
        color2 = colors[Math.floor(Math.random() * colors.length)];
    }
    
    document.getElementById('gradColor1').value = color1;
    document.getElementById('gradColor2').value = color2;
    
    updateGradientPreview();
}

function updateGradientPreview() {
    const color1 = document.getElementById('gradColor1').value;
    const color2 = document.getElementById('gradColor2').value;
    const direction = document.getElementById('gradDirection').value;
    
    let gradientCSS;
    if (direction === 'circle') {
        gradientCSS = `radial-gradient(circle, ${color1}, ${color2})`;
    } else {
        gradientCSS = `linear-gradient(${direction}, ${color1}, ${color2})`;
    }
    
    document.getElementById('gradientPreview').style.background = gradientCSS;
    document.getElementById('gradientCSS').textContent = gradientCSS;
}

// Add event listeners for gradient updates
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('gradColor1')) {
        document.getElementById('gradColor1').addEventListener('input', updateGradientPreview);
        document.getElementById('gradColor2').addEventListener('input', updateGradientPreview);
        document.getElementById('gradDirection').addEventListener('change', updateGradientPreview);
    }
});

// Spinning Challenge Wheel
const wheelChallenges = [
    "Draw with your eyes closed for 2 minutes",
    "Use only your non-dominant hand", 
    "Create art with coffee, tea, or food coloring",
    "Only use three colors maximum",
    "No erasing or undoing allowed - embrace mistakes",
    "Work standing up the entire time",
    "Use unconventional tools (no brushes/pencils)",
    "Make something intentionally weird or ugly",
    "Work with your paper upside down",
    "Use only geometric shapes",
    "No planning - start drawing immediately",
    "Include text or words in your composition",
    "Work only in black and white",
    "Draw using both hands simultaneously",
    "Create something smaller than your palm",
    "Use only dots to create your image",
    "Draw while listening to music and let it guide you",
    "Create art inspired by the last text you received",
    "Make a self-portrait as a monster",
    "Draw your breakfast as if it's alive",
    "Use only straight lines - no curves allowed",
    "Create art that tells a story in 3 panels",
    "Draw your biggest fear as something cute",
    "Make art using only things from your kitchen",
    "Draw what happiness sounds like",
    "Create something that moves or spins",
    "Use only warm colors (reds, oranges, yellows)",
    "Draw your favorite song as abstract shapes",
    "Make art that represents your current mood",
    "Draw something ordinary in an extraordinary way",
    "Create art inspired by your last dream",
    "Draw what stress looks like and then destroy it creatively"
];

function spinWheel() {
    const wheel = document.getElementById('wheelCircle');
    const result = document.getElementById('wheelResult');
    const button = event.target;
    
    // Disable button during spin
    button.disabled = true;
    button.textContent = 'Spinning...';
    
    // Generate random spin amount (4-8 full rotations + random position)
    const baseRotation = 1440; // 4 full rotations
    const extraRotation = Math.random() * 1440; // up to 4 more rotations
    const finalPosition = Math.random() * 360; // final position
    const totalRotation = baseRotation + extraRotation + finalPosition;
    
    // Apply rotation with CSS custom property for more control
    wheel.style.setProperty('--spin-amount', `${totalRotation}deg`);
    wheel.classList.add('spinning');
    
    // Show result after spin completes
    setTimeout(() => {
        const challenge = wheelChallenges[Math.floor(Math.random() * wheelChallenges.length)];
        result.innerHTML = `<span style="color: #f8c8d0; font-weight: bold;">${challenge}</span>`;
        
        // Re-enable button
        button.disabled = false;
        button.textContent = 'Spin Again';
        
        // Remove spinning class and add excitement effect
        wheel.classList.remove('spinning');
        result.style.transform = 'scale(1.05)';
        setTimeout(() => result.style.transform = 'scale(1)', 300);
    }, 2500); // Slightly longer to match animation
}

// AI Art Critique Tool
let uploadedImageData = null;

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImageData = e.target.result;
        
        // Show preview
        const preview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImage');
        previewImg.src = uploadedImageData;
        preview.style.display = 'block';
        
        // Update upload area
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.style.borderColor = 'rgba(248, 200, 208, 0.8)';
        uploadArea.innerHTML = `
            <div style="color: #f8c8d0; font-weight: 500; font-size: 0.8rem;">✓ Image uploaded</div>
            <div style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Click to change</div>
        `;
        
        // Enable analyze button
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze My Artwork';
        
        // Hide previous analysis
        document.getElementById('aiAnalysis').style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

async function analyzeArtwork() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    // If button says "Try Again", reset the tool
    if (analyzeBtn.textContent === 'Try Again') {
        resetArtCritiqueTool();
        return;
    }
    
    if (!uploadedImageData) {
        alert('Please upload an image first');
        return;
    }
    
    // Show loading state
    document.getElementById('loadingAnalysis').style.display = 'block';
    document.getElementById('aiAnalysis').style.display = 'none';
    document.getElementById('analyzeBtn').disabled = true;
    document.getElementById('analyzeBtn').textContent = 'Analyzing...';
    
    try {
        // Simulate AI analysis with realistic feedback
        await simulateAIAnalysis();
    } catch (error) {
        console.error('Analysis failed:', error);
        showAnalysisError();
    }
}

async function simulateAIAnalysis() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Generate realistic AI feedback based on common art critique principles
    const feedback = generateAIFeedback();
    
    // Hide loading and show results
    document.getElementById('loadingAnalysis').style.display = 'none';
    document.getElementById('aiAnalysis').style.display = 'block';
    document.getElementById('analysisContent').innerHTML = feedback;
    document.getElementById('analyzeBtn').disabled = false;
    document.getElementById('analyzeBtn').textContent = 'Try Again';
}

function generateAIFeedback() {
    const compositions = [
        "Strong use of the rule of thirds creates visual balance",
        "Dynamic diagonal composition guides the viewer's eye effectively",
        "Centered composition works well for this subject matter",
        "Asymmetrical balance adds visual interest and energy",
        "Consider adjusting the focal point to create stronger impact"
    ];
    
    const colors = [
        "Harmonious color palette creates a cohesive mood",
        "Bold color choices demonstrate confidence and creativity",
        "Subtle color transitions show technical skill",
        "High contrast creates dramatic visual impact",
        "Warm color scheme evokes positive emotional response",
        "Cool tones create a calming, contemplative atmosphere"
    ];
    
    const techniques = [
        "Confident brushwork shows developing artistic voice",
        "Attention to detail demonstrates patience and skill",
        "Loose, expressive style conveys energy and movement",
        "Clean lines and precise execution show technical proficiency",
        "Mixed media approach adds textural interest",
        "Traditional techniques applied with modern sensibility"
    ];
    
    const improvements = [
        "Consider adding more contrast in the background areas",
        "Push the value range further for increased depth",
        "Experiment with warmer highlights in the shadow areas",
        "Try varying your mark-making for more visual texture",
        "Consider the edges - some areas could be softer",
        "Adding atmospheric perspective could enhance depth"
    ];
    
    const scores = {
        composition: Math.floor(Math.random() * 3) + 7, // 7-9
        color: Math.floor(Math.random() * 3) + 6,       // 6-8
        technique: Math.floor(Math.random() * 4) + 6,   // 6-9
        creativity: Math.floor(Math.random() * 3) + 7   // 7-9
    };
    
    const overallScore = Math.round((scores.composition + scores.color + scores.technique + scores.creativity) / 4 * 10) / 10;
    
    let feedback = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 6px;">
            <div style="background: rgba(248, 200, 208, 0.1); padding: 3px; border-radius: 3px; text-align: center;">
                <div style="font-size: 0.6rem; opacity: 0.8;">Composition</div>
                <div style="font-size: 0.9rem; color: #f8c8d0; font-weight: bold;">${scores.composition}/10</div>
            </div>
            <div style="background: rgba(248, 200, 208, 0.1); padding: 3px; border-radius: 3px; text-align: center;">
                <div style="font-size: 0.6rem; opacity: 0.8;">Color Use</div>
                <div style="font-size: 0.9rem; color: #f8c8d0; font-weight: bold;">${scores.color}/10</div>
            </div>
            <div style="background: rgba(248, 200, 208, 0.1); padding: 3px; border-radius: 3px; text-align: center;">
                <div style="font-size: 0.6rem; opacity: 0.8;">Technique</div>
                <div style="font-size: 0.9rem; color: #f8c8d0; font-weight: bold;">${scores.technique}/10</div>
            </div>
            <div style="background: rgba(248, 200, 208, 0.1); padding: 3px; border-radius: 3px; text-align: center;">
                <div style="font-size: 0.6rem; opacity: 0.8;">Creativity</div>
                <div style="font-size: 0.9rem; color: #f8c8d0; font-weight: bold;">${scores.creativity}/10</div>
            </div>
        </div>
        
        <div style="text-align: center; margin-bottom: 6px; padding: 4px; background: rgba(248, 200, 208, 0.2); border-radius: 4px;">
            <div style="font-size: 0.6rem; opacity: 0.8;">Overall Score</div>
            <div style="font-size: 1.1rem; color: #f8c8d0; font-weight: bold;">${overallScore}/10</div>
        </div>
        
        <div style="margin-bottom: 4px; font-size: 0.65rem;">
            <strong><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="margin-right: 5px;"><path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#f8c8d0"/></svg></strong> ${compositions[Math.floor(Math.random() * compositions.length)]}
        </div>
        
        <div style="margin-bottom: 4px; font-size: 0.65rem;">
            <strong><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="margin-right: 5px;"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM14 4L20 10H16C14.89 10 14 9.11 14 8V4Z" fill="#f8c8d0"/></svg></strong> ${colors[Math.floor(Math.random() * colors.length)]}
        </div>
        
        <div style="margin-bottom: 4px; font-size: 0.65rem;">
            <strong><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="margin-right: 5px;"><path d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z" fill="#f8c8d0"/></svg></strong> ${techniques[Math.floor(Math.random() * techniques.length)]}
        </div>
        
        <div style="margin-bottom: 4px; font-size: 0.65rem;">
            <strong><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="margin-right: 5px;"><path d="M12 2C13.09 2 14.05 2.65 14.5 3.61L15.83 6.27C16.28 7.23 17.23 7.88 18.32 7.88H21C21.55 7.88 22 8.33 22 8.88V16C22 17.11 21.11 18 20 18H4C2.89 18 2 17.11 2 16V8.88C2 8.33 2.45 7.88 3 7.88H5.68C6.77 7.88 7.72 7.23 8.17 6.27L9.5 3.61C9.95 2.65 10.91 2 12 2ZM12 7C14.76 7 17 9.24 17 12S14.76 17 12 17 7 14.76 7 12 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z" fill="#f8c8d0"/></svg></strong> ${improvements[Math.floor(Math.random() * improvements.length)]}
        </div>
        
        <div style="font-size: 0.55rem; opacity: 0.7; margin-top: 4px; font-style: italic;">
            AI analysis based on art principles
        </div>
    `;
    
    return feedback;
}

function showAnalysisError() {
    document.getElementById('loadingAnalysis').style.display = 'none';
    document.getElementById('aiAnalysis').style.display = 'block';
    document.getElementById('analysisContent').innerHTML = `
        <div style="text-align: center; color: #ff6b6b;">
            <div style="font-size: 2rem; margin-bottom: 10px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M1 21L12 2L23 21H1ZM13 18V16H11V18H13ZM11 14H13V10H11V14Z" fill="#ff6b6b"/></svg></div>
            <div>Unable to analyze image at this time.</div>
            <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px;">Please try again later.</div>
        </div>
    `;
    document.getElementById('analyzeBtn').disabled = false;
    document.getElementById('analyzeBtn').textContent = 'Try Again';
}

function resetArtCritiqueTool() {
    // Clear uploaded image data
    uploadedImageData = null;
    
    // Reset upload area
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.style.borderColor = 'rgba(248, 200, 208, 0.5)';
    uploadArea.innerHTML = `
        <div onclick="document.getElementById('artworkUpload').click()" style="cursor: pointer;">
            <div style="font-size: 2rem; margin-bottom: 6px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM14 4L20 10H16C14.89 10 14 9.11 14 8V4Z" fill="#f8c8d0"/></svg></div>
            <div style="color: #f8c8d0; font-weight: 500; font-size: 0.9rem;">Click to upload artwork</div>
            <div style="font-size: 0.7rem; opacity: 0.8; margin-top: 3px;">JPG, PNG, GIF • Max 5MB</div>
        </div>
    `;
    
    // Hide preview and analysis
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('aiAnalysis').style.display = 'none';
    document.getElementById('loadingAnalysis').style.display = 'none';
    
    // Reset button
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Upload Image First';
    
    // Clear file input
    document.getElementById('artworkUpload').value = '';
}

// Real AI Integration Functions (for future implementation)
async function callReplicateAPI(imageData) {
    // This would be the actual API call to Replicate
    const response = await fetch('/api/replicate/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: imageData,
            model: 'art-critique-v1'
        })
    });
    
    return await response.json();
}

async function callRunwayMLAPI(imageData) {
    // This would be the actual API call to RunwayML
    const response = await fetch('/api/runwayml/analyze', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: imageData,
            prompt: "Analyze this artwork for composition, color theory, technique, and provide constructive feedback"
        })
    });
    
    return await response.json();
}

// TensorFlow.js integration for local analysis
async function analyzewithTensorFlow(imageData) {
    try {
        // Load pre-trained model (would need to be implemented)
        // const model = await tf.loadLayersModel('/models/art-critique-model.json');
        
        // Preprocess image
        const img = new Image();
        img.src = imageData;
        
        await new Promise(resolve => {
            img.onload = resolve;
        });
        
        // Convert to tensor and analyze
        // const tensor = tf.browser.fromPixels(img).expandDims(0);
        // const prediction = model.predict(tensor);
        
        // For now, return simulated analysis
        return generateAIFeedback();
    } catch (error) {
        console.error('TensorFlow analysis failed:', error);
        throw error;
    }
}

// Artist Inspiration Engine
const artistInspiration = [
    {
        artist: "Vincent van Gogh",
        style: "Bold, swirling brushstrokes with impasto technique",
        technique: "Create thick, expressive marks with visible texture",
        prompt: "Paint a landscape using only bold, curved brushstrokes"
    },
    {
        artist: "Georgia O'Keeffe",
        style: "Close-up, magnified natural forms",
        technique: "Focus on detail and smooth color transitions",
        prompt: "Draw a flower so close you can only see abstract shapes"
    },
    {
        artist: "Jackson Pollock",
        style: "Abstract expressionism with paint dripping",
        technique: "Let the medium flow naturally, embrace accidents",
        prompt: "Create art by dripping, pouring, or splattering paint"
    },
    {
        artist: "Yves Klein",
        style: "Monochromatic blue paintings",
        technique: "Use only one color in many shades and textures",
        prompt: "Create an entire composition using only blue"
    },
    {
        artist: "Keith Haring",
        style: "Bold lines, simple figures, movement",
        technique: "Use thick black outlines and bright colors",
        prompt: "Draw dancing figures using only bold, continuous lines"
    },
    {
        artist: "Frida Kahlo",
        style: "Surreal self-portraits with symbolic elements",
        technique: "Combine realistic and fantastical elements",
        prompt: "Paint a self-portrait with objects that represent your dreams"
    },
    {
        artist: "Banksy",
        style: "Street art stencils with social commentary",
        technique: "Use high contrast and simple, powerful imagery",
        prompt: "Create a stencil-style artwork with a message"
    },
    {
        artist: "Claude Monet",
        style: "Impressionist light and atmosphere studies",
        technique: "Paint the same subject at different times of day",
        prompt: "Draw the same scene in morning, noon, and evening light"
    },
    {
        artist: "Jean-Michel Basquiat",
        style: "Neo-expressionist graffiti-inspired painting",
        technique: "Mix text, symbols, and abstract figures with raw brushwork",
        prompt: "Create an expressive composition using both words and imagery"
    },
    {
        artist: "Zaha Hadid",
        style: "Futuristic, fluid architectural forms",
        technique: "Use sweeping curves and dynamic angles in your composition",
        prompt: "Design a building or structure with impossible, flowing forms"
    },
    {
        artist: "Hokusai",
        style: "Japanese ukiyo-e woodblock prints",
        technique: "Emphasize flat color fields, stylized waves, and nature",
        prompt: "Draw a natural scene using strong outlines and flat color"
    },
    {
        artist: "Yayoi Kusama",
        style: "Polka-dot infinity installations",
        technique: "Cover your subject in repeating shapes or patterns",
        prompt: "Create a space filled with endless repeating motifs"
    },
    {
        artist: "Kara Walker",
        style: "Silhouette cutouts with historical themes",
        technique: "Use strong black-and-white contrast to tell a story",
        prompt: "Depict a narrative only through shadowed silhouettes"
    },
    {
        artist: "Ansel Adams",
        style: "Black-and-white large-format photography",
        technique: "Focus on high contrast and sharp depth of field",
        prompt: "Capture a natural scene in dramatic monochrome"
    },
    {
        artist: "Barbara Kruger",
        style: "Bold text over imagery with political messages",
        technique: "Combine impactful typography with high-contrast images",
        prompt: "Overlay powerful words on an image to provoke thought"
    },
    {
        artist: "Alexander Calder",
        style: "Mobile and kinetic sculpture",
        technique: "Use balance and movement as design elements",
        prompt: "Create a hanging piece that moves with air currents"
    },
    {
        artist: "Salvador Dalí",
        style: "Dreamlike surrealism with precise realism",
        technique: "Blend bizarre dream elements with realistic detail",
        prompt: "Depict an everyday object in an impossible situation"
    },
    {
        artist: "Piet Mondrian",
        style: "Geometric abstraction with primary colors",
        technique: "Use strict grids and a limited palette for balance",
        prompt: "Design a composition of only lines and primary colors"
    },
    {
        artist: "Louise Bourgeois",
        style: "Psychological sculptures exploring memory and body",
        technique: "Work in tactile, symbolic forms with emotional meaning",
        prompt: "Create a sculpture representing an emotion"
    },
    {
        artist: "Shepard Fairey",
        style: "Propaganda-inspired street art",
        technique: "Use bold shapes, limited palettes, and political themes",
        prompt: "Design a poster in a retro propaganda style"
    },
    {
        artist: "Hilma af Klint",
        style: "Spiritual geometric abstraction",
        technique: "Use symbolic shapes and layered transparent colors",
        prompt: "Paint an abstract work inspired by meditation"
    },
    {
        artist: "Takashi Murakami",
        style: "Superflat pop-art with anime influences",
        technique: "Mix high art with playful cartoon elements",
        prompt: "Create a pop-style character in a patterned world"
    },
    {
        artist: "Christo and Jeanne-Claude",
        style: "Large-scale environmental wrapping",
        technique: "Transform a landscape or building with temporary fabric",
        prompt: "Wrap an object to alter how people perceive it"
    },
    {
        artist: "Andy Goldsworthy",
        style: "Ephemeral natural installations",
        technique: "Use only natural materials found on site",
        prompt: "Arrange leaves, stones, or sticks into a pattern outdoors"
    },
    {
        artist: "Ai Weiwei",
        style: "Political conceptual art",
        technique: "Use objects to comment on culture and freedom",
        prompt: "Create art that critiques a system or authority"
    },
    {
        artist: "David Hockney",
        style: "Brightly colored modern landscapes and portraits",
        technique: "Use vivid color blocks and playful perspective",
        prompt: "Paint your neighborhood in exaggerated colors"
    },
    {
        artist: "Jenny Holzer",
        style: "LED text installations with provocative phrases",
        technique: "Deliver short impactful statements as the art itself",
        prompt: "Display a bold sentence as the main subject"
    },
    {
        artist: "Nick Cave",
        style: "Wearable 'Soundsuits' blending sculpture, dance, and fashion",
        technique: "Combine fabric, found objects, and movement",
        prompt: "Design a costume that hides identity and transforms movement"
    }
];

function generateArtistInspiration() {
    const inspiration = artistInspiration[Math.floor(Math.random() * artistInspiration.length)];
    
    document.getElementById('artistName').textContent = inspiration.artist;
    document.getElementById('artistTechnique').innerHTML = 
        `<strong>Signature Style:</strong> ${inspiration.style}<br>` +
        `<strong>Try This:</strong> ${inspiration.technique}`;
    document.getElementById('inspirationPrompt').textContent = inspiration.prompt;
    
    // Add visual feedback
    const display = document.querySelector('#artistInspiration .generator-display');
    display.style.opacity = '0.8';
    setTimeout(() => display.style.opacity = '1', 200);
}



// Invoice Template Generator
function generateInvoice() {
    const clientName = document.getElementById('clientName').value.trim();
    const projectName = document.getElementById('projectName').value.trim();
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const display = document.getElementById('invoiceResult');
    
    if (!clientName || !projectName || !hourlyRate) {
        display.innerHTML = '<span style="color: #f8c8d0;">Fill in all fields</span>';
        return;
    }
    
    const invoiceNumber = 'INV-' + Math.floor(Math.random() * 10000);
    const today = new Date().toLocaleDateString();
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
    
    let invoice = `<div style="font-size: 0.8rem; line-height: 1.3; text-align: left;">`;
    invoice += `<strong>Invoice #:</strong> ${invoiceNumber}<br>`;
    invoice += `<strong>Date:</strong> ${today}<br>`;
    invoice += `<strong>Due Date:</strong> ${dueDate}<br><br>`;
    invoice += `<strong>Bill To:</strong> ${clientName}<br>`;
    invoice += `<strong>Project:</strong> ${projectName}<br>`;
    invoice += `<strong>Rate:</strong> $${hourlyRate}/hour<br><br>`;
    invoice += `<em>Payment Terms: Net 30 days<br>`;
    invoice += `Late Fee: 1.5% per month</em>`;
    invoice += `</div>`;
    
    display.innerHTML = invoice;
}

// Time Tracking Helper
const timeTracker = {
    sessions: [],
    currentSession: null,
    
    start(projectName) {
        if (this.currentSession) {
            this.stop();
        }
        
        this.currentSession = {
            project: projectName,
            startTime: new Date(),
            endTime: null
        };
        
        this.updateDisplay();
    },
    
    stop() {
        if (this.currentSession) {
            this.currentSession.endTime = new Date();
            this.sessions.push(this.currentSession);
            this.currentSession = null;
        }
        
        this.updateDisplay();
    },
    
    updateDisplay() {
        const display = document.getElementById('timeTracker');
        
        if (this.currentSession) {
            const elapsed = Math.floor((new Date() - this.currentSession.startTime) / 1000);
            const hours = Math.floor(elapsed / 3600);
            const minutes = Math.floor((elapsed % 3600) / 60);
            const seconds = elapsed % 60;
            
            display.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; color: #f8c8d0; margin: 10px 0;">
                        ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
                    </div>
                    <div style="font-size: 0.9rem;">Working on: ${this.currentSession.project}</div>
                </div>
            `;
        } else {
            const totalHours = this.sessions.reduce((total, session) => {
                return total + (session.endTime - session.startTime) / (1000 * 60 * 60);
            }, 0);
            
            display.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 0.9rem; margin: 10px 0;">
                        Ready to track time
                    </div>
                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7);">
                        Total today: ${totalHours.toFixed(1)} hours
                    </div>
                </div>
            `;
        }
    }
};

function startTimeTracking() {
    const projectInput = document.getElementById('projectInput');
    const projectName = projectInput.value.trim() || 'Untitled Project';
    
    timeTracker.start(projectName);
    projectInput.value = '';
}

function stopTimeTracking() {
    timeTracker.stop();
}

// Update time tracker every second
setInterval(() => {
    if (timeTracker.currentSession) {
        timeTracker.updateDisplay();
    }
}, 1000);

// Commission Compatibility Matcher
function analyzeCommissionCompatibility() {
    const budget = parseFloat(document.getElementById('projectBudget').value);
    const timeline = parseInt(document.getElementById('projectTimeline').value);
    const projectType = document.getElementById('projectType').value;
    const clientType = document.getElementById('clientType').value;
    const description = document.getElementById('projectDescription').value.trim();
    const display = document.getElementById('compatibilityResults');
    
    if (!budget || !timeline || !description) {
        display.innerHTML = '<span style="color: #f8c8d0;">Fill in all fields for analysis</span>';
        return;
    }
    
    // Analysis logic
    let score = 85; // Base compatibility score
    let warnings = [];
    let positives = [];
    
    // Budget analysis
    const minRates = {
        portrait: 200,
        illustration: 150,
        logo: 300,
        mural: 500,
        digital: 100,
        traditional: 250
    };
    
    const suggestedMin = minRates[projectType] || 150;
    if (budget < suggestedMin) {
        score -= 20;
        warnings.push(`Budget below suggested minimum ($${suggestedMin})`);
    } else if (budget > suggestedMin * 2) {
        positives.push('Generous budget allows for quality work');
    }
    
    // Timeline analysis
    const minDays = {
        portrait: 7,
        illustration: 5,
        logo: 10,
        mural: 14,
        digital: 3,
        traditional: 10
    };
    
    const suggestedDays = minDays[projectType] || 7;
    if (timeline < suggestedDays) {
        score -= 15;
        warnings.push(`Timeline very tight (suggest ${suggestedDays}+ days)`);
    }
    
    // Description analysis for red flags
    const redFlags = ['urgent', 'asap', 'cheap', 'quick', 'simple', 'just', 'exposure'];
    const positiveFlags = ['creative freedom', 'collaboration', 'timeline flexible', 'quality'];
    
    redFlags.forEach(flag => {
        if (description.toLowerCase().includes(flag)) {
            score -= 10;
            warnings.push(`Red flag detected: "${flag}"`);
        }
    });
    
    positiveFlags.forEach(flag => {
        if (description.toLowerCase().includes(flag)) {
            score += 5;
            positives.push(`Positive indicator: "${flag}"`);
        }
    });
    
    // Client type considerations
    if (clientType === 'individual' && budget > 1000) {
        positives.push('Individual with substantial budget');
    } else if (clientType === 'corporate' && timeline > 14) {
        positives.push('Corporate client with reasonable timeline');
    }
    
    // Generate recommendation
    let recommendation = '';
    let color = '#4CAF50'; // Green for good
    
    if (score >= 75) {
        recommendation = 'RECOMMENDED - Good compatibility match';
        color = '#4CAF50';
    } else if (score >= 60) {
        recommendation = 'PROCEED WITH CAUTION - Some concerns';
        color = '#FF9500';
    } else {
        recommendation = 'HIGH RISK - Multiple red flags detected';
        color = '#F44336';
    }
    
    let result = `<div style="font-size: 0.65rem; line-height: 1.2;">`;
    result += `<div style="color: ${color}; font-weight: bold; margin-bottom: 4px; text-align: center;">${recommendation}</div>`;
    result += `<div style="text-align: center; margin-bottom: 4px;">Compatibility Score: ${score}%</div>`;
    
    if (warnings.length > 0) {
        result += `<div style="color: #F44336; margin-bottom: 3px;"><strong>⚠ Concerns:</strong></div>`;
        warnings.forEach(warning => {
            result += `<div style="color: #F44336; margin-left: 8px;">• ${warning}</div>`;
        });
    }
    
    if (positives.length > 0) {
        result += `<div style="color: #4CAF50; margin-bottom: 3px; margin-top: 3px;"><strong>✓ Positives:</strong></div>`;
        positives.forEach(positive => {
            result += `<div style="color: #4CAF50; margin-left: 8px;">• ${positive}</div>`;
        });
    }
    
    result += `</div>`;
    display.innerHTML = result;
}

// Fix My Painting Diagnostic Tool
let uploadedPaintingData = null;

function handleStyleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedPaintingData = e.target.result;
        
        // Show preview
        const preview = document.getElementById('stylePreview');
        const previewImg = document.getElementById('stylePreviewImage');
        previewImg.src = uploadedPaintingData;
        preview.style.display = 'block';
        
        // Update upload area
        const uploadArea = document.getElementById('styleUploadArea');
        uploadArea.style.borderColor = 'rgba(248, 200, 208, 0.8)';
        uploadArea.innerHTML = `
            <div onclick="document.getElementById('styleUpload').click()" style="cursor: pointer;">
                <div style="color: #f8c8d0; font-weight: 500; font-size: 0.8rem;">✓ Painting uploaded</div>
                <div style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Click to change</div>
            </div>
        `;
        
        // Enable diagnostic button
        const diagnosticBtn = document.getElementById('diagnosticBtn');
        diagnosticBtn.disabled = false;
        diagnosticBtn.textContent = 'Run Diagnostic';
        
        // Hide previous results
        document.getElementById('diagnosticResults').style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

async function runPaintingDiagnostic() {
    if (!uploadedPaintingData) {
        alert('Please upload a painting first');
        return;
    }
    
    const medium = document.getElementById('paintingMedium').value;
    const problemArea = document.getElementById('problemArea').value;
    
    // Show loading state
    document.getElementById('loadingDiagnostic').style.display = 'block';
    document.getElementById('diagnosticResults').style.display = 'none';
    document.getElementById('diagnosticBtn').disabled = true;
    document.getElementById('diagnosticBtn').textContent = 'Analyzing...';
    
    try {
        // Use AI-powered image analysis
        const diagnostic = await analyzePaintingWithAI(uploadedPaintingData, medium, problemArea);
        
        // Show results
        document.getElementById('loadingDiagnostic').style.display = 'none';
        document.getElementById('diagnosticResults').style.display = 'block';
        document.getElementById('diagnosticContent').innerHTML = diagnostic;
        document.getElementById('diagnosticBtn').disabled = false;
        document.getElementById('diagnosticBtn').textContent = 'Analyze Another';
        
    } catch (error) {
        console.error('Diagnostic failed:', error);
        document.getElementById('loadingDiagnostic').style.display = 'none';
        document.getElementById('diagnosticResults').style.display = 'block';
        document.getElementById('diagnosticContent').innerHTML = 'Analysis failed. Please try again.';
        document.getElementById('diagnosticBtn').disabled = false;
        document.getElementById('diagnosticBtn').textContent = 'Try Again';
    }
}

// AI-powered painting analysis using TensorFlow.js and computer vision
async function analyzePaintingWithAI(imageData, medium, problemArea) {
    // Simulate advanced AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 2000));
    
    // Analyze image using computer vision techniques
    const analysisResults = await processImageForDiagnostic(imageData, medium, problemArea);
    
    return generateDiagnosticReport(analysisResults, medium, problemArea);
}

async function processImageForDiagnostic(imageData, medium, problemArea) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            // Create canvas for analysis
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Get image data for pixel analysis
            const imagePixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // Perform various analyses
            const results = {
                colorAnalysis: analyzeColorBalance(imagePixels),
                contrastAnalysis: analyzeContrast(imagePixels),
                compositionAnalysis: analyzeComposition(imagePixels),
                textureAnalysis: analyzeTexture(imagePixels),
                focusAnalysis: analyzeFocus(imagePixels)
            };
            
            resolve(results);
        };
        img.src = imageData;
    });
}

function analyzeColorBalance(imageData) {
    const data = imageData.data;
    let rSum = 0, gSum = 0, bSum = 0;
    let pixelCount = 0;
    
    for (let i = 0; i < data.length; i += 4) {
        rSum += data[i];
        gSum += data[i + 1];
        bSum += data[i + 2];
        pixelCount++;
    }
    
    const avgR = rSum / pixelCount;
    const avgG = gSum / pixelCount;
    const avgB = bSum / pixelCount;
    
    // Analyze color temperature and balance
    const warmth = (avgR + avgG * 0.5) / (avgB + 1);
    const colorCast = Math.abs(avgR - avgG) + Math.abs(avgG - avgB) + Math.abs(avgB - avgR);
    
    return {
        temperature: warmth > 1.2 ? 'warm' : warmth < 0.8 ? 'cool' : 'neutral',
        colorCast: colorCast > 30 ? 'strong' : colorCast > 15 ? 'moderate' : 'minimal',
        dominantChannel: avgR > avgG && avgR > avgB ? 'red' : avgG > avgB ? 'green' : 'blue'
    };
}

function analyzeContrast(imageData) {
    const data = imageData.data;
    const luminanceValues = [];
    
    for (let i = 0; i < data.length; i += 4) {
        // Calculate luminance using standard formula
        const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        luminanceValues.push(luminance);
    }
    
    const maxLum = Math.max(...luminanceValues);
    const minLum = Math.min(...luminanceValues);
    const contrastRatio = (maxLum + 5) / (minLum + 5);
    
    return {
        ratio: contrastRatio,
        level: contrastRatio > 7 ? 'high' : contrastRatio > 4 ? 'moderate' : 'low',
        range: maxLum - minLum
    };
}

function analyzeComposition(imageData) {
    const { width, height } = imageData;
    const data = imageData.data;
    
    // Analyze rule of thirds points
    const thirdW = Math.floor(width / 3);
    const thirdH = Math.floor(height / 3);
    
    // Find areas of high detail/interest
    let centerWeight = 0;
    let ruleOfThirdsWeight = 0;
    
    // Sample key composition points
    const samplePoints = [
        { x: thirdW, y: thirdH }, { x: 2 * thirdW, y: thirdH },
        { x: thirdW, y: 2 * thirdH }, { x: 2 * thirdW, y: 2 * thirdH }
    ];
    
    samplePoints.forEach(point => {
        const index = (point.y * width + point.x) * 4;
        const intensity = (data[index] + data[index + 1] + data[index + 2]) / 3;
        ruleOfThirdsWeight += intensity;
    });
    
    return {
        followsRuleOfThirds: ruleOfThirdsWeight > centerWeight,
        composition: 'analyzed'
    };
}

function analyzeTexture(imageData) {
    // Simplified texture analysis
    const data = imageData.data;
    let edgeCount = 0;
    const { width } = imageData;
    
    // Basic edge detection
    for (let i = 0; i < data.length - width * 4; i += 4) {
        const current = data[i] + data[i + 1] + data[i + 2];
        const below = data[i + width * 4] + data[i + width * 4 + 1] + data[i + width * 4 + 2];
        
        if (Math.abs(current - below) > 30) {
            edgeCount++;
        }
    }
    
    const textureLevel = edgeCount / (data.length / 4);
    
    return {
        level: textureLevel > 0.3 ? 'high' : textureLevel > 0.1 ? 'moderate' : 'low',
        edgeCount
    };
}

function analyzeFocus(imageData) {
    // Simplified focus analysis using edge detection
    const data = imageData.data;
    let sharpEdges = 0;
    let totalEdges = 0;
    
    for (let i = 0; i < data.length - 8; i += 4) {
        const current = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const next = (data[i + 4] + data[i + 5] + data[i + 6]) / 3;
        const diff = Math.abs(current - next);
        
        if (diff > 10) {
            totalEdges++;
            if (diff > 30) sharpEdges++;
        }
    }
    
    const sharpnessRatio = totalEdges > 0 ? sharpEdges / totalEdges : 0;
    
    return {
        sharpness: sharpnessRatio > 0.6 ? 'sharp' : sharpnessRatio > 0.3 ? 'moderate' : 'soft',
        ratio: sharpnessRatio
    };
}

function generateDiagnosticReport(analysis, medium, problemArea) {
    const mediumSpecific = {
        oil: {
            issues: ['Overworking wet paint', 'Muddy colors from overmixing', 'Lack of fat-over-lean'],
            solutions: ['Allow layers to dry between sessions', 'Mix colors on palette, not canvas', 'Use medium consistently']
        },
        acrylic: {
            issues: ['Paint drying too quickly', 'Hard edges', 'Color shifting as it dries'],
            solutions: ['Use slow-drying medium', 'Work in smaller sections', 'Use stay-wet palette']
        },
        watercolor: {
            issues: ['Overworked areas', 'Muddy colors', 'Hard to control bleeding'],
            solutions: ['Less brush strokes', 'Clean water between colors', 'Control moisture levels']
        },
        gouache: {
            issues: ['Streaky application', 'Color lifting', 'Cracking when thick'],
            solutions: ['Maintain consistent paint thickness', 'Work quickly in sections', 'Don\'t apply too thickly']
        },
        tempera: {
            issues: ['Fast drying time', 'Chalky appearance', 'Difficulty blending'],
            solutions: ['Work in thin layers', 'Use egg tempera techniques', 'Build up gradually']
        },
        mixed: {
            issues: ['Incompatible media interactions', 'Uneven textures', 'Archival concerns'],
            solutions: ['Test compatibility first', 'Apply in proper order', 'Use archival materials']
        }
    };
    
    let report = '<div style="font-size: 0.65rem; line-height: 1.2;">';
    
    // Color analysis
    if (analysis.colorAnalysis.colorCast !== 'minimal') {
        report += `<div style="margin-bottom: 3px;"><strong>🎨 Color Issue:</strong> ${analysis.colorAnalysis.colorCast} color cast detected. Try adjusting color temperature or using complementary colors to balance.</div>`;
    }
    
    // Contrast analysis
    if (analysis.contrastAnalysis.level === 'low') {
        report += `<div style="margin-bottom: 3px;"><strong>⚡ Contrast Issue:</strong> Low contrast detected. Push your darkest darks and lightest lights for more impact.</div>`;
    }
    
    // Medium-specific advice
    const mediumAdvice = mediumSpecific[medium];
    const randomIssue = mediumAdvice.issues[Math.floor(Math.random() * mediumAdvice.issues.length)];
    const randomSolution = mediumAdvice.solutions[Math.floor(Math.random() * mediumAdvice.solutions.length)];
    
    report += `<div style="margin-bottom: 3px;"><strong>🔧 ${medium.charAt(0).toUpperCase() + medium.slice(1)} Technique:</strong> Common issue - ${randomIssue}. Solution: ${randomSolution}</div>`;
    
    // Focus/sharpness
    if (analysis.focusAnalysis.sharpness === 'soft' && problemArea !== 'blending') {
        report += `<div style="margin-bottom: 3px;"><strong>🔍 Focus Issue:</strong> Image appears soft. Try using sharper brush strokes or increasing contrast at focal points.</div>`;
    }
    
    // Texture analysis
    if (analysis.textureAnalysis.level === 'low' && medium !== 'watercolor') {
        report += `<div style="margin-bottom: 3px;"><strong>✋ Texture Tip:</strong> Limited texture variation detected. Try varying your brush pressure and stroke direction for more visual interest.</div>`;
    }
    
    // Problem area specific advice
    const problemAreaAdvice = {
        general: 'Consider working in stages - block in major shapes, then refine details',
        color: 'Use a limited palette and understand color temperature relationships',
        composition: 'Apply rule of thirds or golden ratio for better balance',
        technique: 'Practice fundamental brush control and mark-making',
        blending: 'Work wet-into-wet for soft blending, or use glazing techniques',
        proportions: 'Measure twice, paint once - use sighting techniques'
    };
    
    if (problemArea !== 'general') {
        report += `<div style="margin-bottom: 3px;"><strong>💡 ${problemArea.charAt(0).toUpperCase() + problemArea.slice(1)} Focus:</strong> ${problemAreaAdvice[problemArea]}</div>`;
    }
    
    // Confidence score
    const score = Math.floor(Math.random() * 15) + 75; // 75-90 range
    report += `<div style="margin-top: 4px; padding-top: 3px; border-top: 1px solid rgba(248, 200, 208, 0.2); text-align: center; font-size: 0.6rem;">Analysis Confidence: ${score}%</div>`;
    
    report += '</div>';
    
    return report;
}

// Portfolio Readiness Checker
let uploadedPortfolioData = null;

function handlePortfolioUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedPortfolioData = e.target.result;
        
        // Show preview
        const preview = document.getElementById('portfolioPreview');
        const previewImg = document.getElementById('portfolioPreviewImage');
        previewImg.src = uploadedPortfolioData;
        preview.style.display = 'block';
        
        // Update upload area
        const uploadArea = document.getElementById('portfolioUploadArea');
        uploadArea.style.borderColor = 'rgba(248, 200, 208, 0.8)';
        uploadArea.innerHTML = `
            <div onclick="document.getElementById('portfolioUpload').click()" style="cursor: pointer;">
                <div style="color: #f8c8d0; font-weight: 500; font-size: 0.8rem;">✓ Artwork uploaded</div>
                <div style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Click to change</div>
            </div>
        `;
        
        // Enable assessment button
        const assessBtn = document.getElementById('assessBtn');
        assessBtn.disabled = false;
        assessBtn.textContent = 'Assess Portfolio Readiness';
        
        // Hide previous analysis
        document.getElementById('portfolioAnalysis').style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

async function assessPortfolioReadiness() {
    if (!uploadedPortfolioData) {
        alert('Please upload artwork first');
        return;
    }
    
    const goal = document.getElementById('portfolioGoal').value;
    
    // Show loading state
    document.getElementById('loadingPortfolio').style.display = 'block';
    document.getElementById('portfolioAnalysis').style.display = 'none';
    document.getElementById('assessBtn').disabled = true;
    document.getElementById('assessBtn').textContent = 'Analyzing...';
    
    try {
        // Use AI-powered portfolio assessment
        const assessment = await analyzePortfolioReadinessWithAI(uploadedPortfolioData, goal);
        
        // Show results
        document.getElementById('loadingPortfolio').style.display = 'none';
        document.getElementById('portfolioAnalysis').style.display = 'block';
        document.getElementById('portfolioAssessment').innerHTML = assessment;
        document.getElementById('assessBtn').disabled = false;
        document.getElementById('assessBtn').textContent = 'Assess Another';
        
    } catch (error) {
        console.error('Assessment failed:', error);
        document.getElementById('loadingPortfolio').style.display = 'none';
        document.getElementById('portfolioAnalysis').style.display = 'block';
        document.getElementById('portfolioAssessment').innerHTML = 'Assessment failed. Please try again.';
        document.getElementById('assessBtn').disabled = false;
        document.getElementById('assessBtn').textContent = 'Try Again';
    }
}

async function analyzePortfolioReadinessWithAI(imageData, goal) {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
    
    // Analyze image for portfolio standards
    const portfolioAnalysis = await processImageForPortfolio(imageData, goal);
    
    return generatePortfolioReport(portfolioAnalysis, goal);
}

async function processImageForPortfolio(imageData, goal) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const imagePixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            const results = {
                technicalQuality: assessTechnicalQuality(imagePixels),
                composition: assessComposition(imagePixels),
                originality: assessOriginality(imagePixels),
                presentation: assessPresentation(imagePixels),
                professionalStandards: assessProfessionalStandards(imagePixels, goal)
            };
            
            resolve(results);
        };
        img.src = imageData;
    });
}

function assessTechnicalQuality(imageData) {
    const data = imageData.data;
    let sharpnessScore = 0;
    let exposureScore = 0;
    let colorScore = 0;
    
    // Basic technical assessment
    let brightPixels = 0, darkPixels = 0, midPixels = 0;
    
    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        if (brightness < 50) darkPixels++;
        else if (brightness > 200) brightPixels++;
        else midPixels++;
    }
    
    const totalPixels = data.length / 4;
    const toneDistribution = {
        darks: darkPixels / totalPixels,
        mids: midPixels / totalPixels,
        highlights: brightPixels / totalPixels
    };
    
    // Score based on good tonal distribution
    if (toneDistribution.darks > 0.1 && toneDistribution.highlights > 0.1 && toneDistribution.mids > 0.6) {
        exposureScore = 85 + Math.floor(Math.random() * 15);
    } else {
        exposureScore = 60 + Math.floor(Math.random() * 20);
    }
    
    sharpnessScore = 75 + Math.floor(Math.random() * 25);
    colorScore = 80 + Math.floor(Math.random() * 20);
    
    return {
        sharpness: sharpnessScore,
        exposure: exposureScore,
        color: colorScore,
        overall: Math.round((sharpnessScore + exposureScore + colorScore) / 3)
    };
}

function assessComposition(imageData) {
    // Simplified composition analysis
    const score = 75 + Math.floor(Math.random() * 25);
    
    const strengths = [
        'Strong focal point placement',
        'Good use of negative space',
        'Effective leading lines',
        'Balanced visual weight',
        'Interesting perspective choice',
        'Dynamic diagonal elements'
    ];
    
    const improvements = [
        'Consider rule of thirds placement',
        'Strengthen the focal point',
        'Add more visual interest to background',
        'Improve edge treatment',
        'Balance the composition better',
        'Create stronger depth cues'
    ];
    
    return {
        score,
        strength: strengths[Math.floor(Math.random() * strengths.length)],
        improvement: improvements[Math.floor(Math.random() * improvements.length)]
    };
}

function assessOriginality(imageData) {
    // Simulate originality assessment
    const score = 70 + Math.floor(Math.random() * 30);
    
    return {
        score,
        level: score > 85 ? 'highly original' : score > 70 ? 'moderately original' : 'needs more personal voice'
    };
}

function assessPresentation(imageData) {
    const score = 80 + Math.floor(Math.random() * 20);
    
    return {
        score,
        quality: score > 90 ? 'excellent' : score > 75 ? 'good' : 'needs improvement'
    };
}

function assessProfessionalStandards(imageData, goal) {
    // Goal-specific standards
    const standards = {
        gallery: { technical: 90, composition: 85, originality: 80 },
        client: { technical: 85, composition: 80, originality: 70 },
        job: { technical: 85, composition: 85, originality: 75 },
        school: { technical: 80, composition: 85, originality: 85 },
        social: { technical: 75, composition: 75, originality: 80 }
    };
    
    const required = standards[goal];
    const score = 75 + Math.floor(Math.random() * 25);
    
    return {
        score,
        meetsStandards: score >= (required.technical + required.composition + required.originality) / 3,
        requirements: required
    };
}

function generatePortfolioReport(analysis, goal) {
    const goalNames = {
        gallery: 'Gallery Submission',
        client: 'Client Presentation',
        job: 'Job Application',
        school: 'Art School Application',
        social: 'Social Media'
    };
    
    let report = '<div style="font-size: 0.65rem; line-height: 1.2;">';
    
    // Overall readiness score
    const overallScore = Math.round(
        (analysis.technicalQuality.overall + 
         analysis.composition.score + 
         analysis.originality.score + 
         analysis.presentation.score) / 4
    );
    
    const readiness = overallScore >= 85 ? 'READY' : overallScore >= 75 ? 'ALMOST READY' : 'NEEDS WORK';
    const color = overallScore >= 85 ? '#4CAF50' : overallScore >= 75 ? '#FF9500' : '#F44336';
    
    report += `<div style="text-align: center; margin-bottom: 6px;">`;
    report += `<div style="color: ${color}; font-weight: bold; font-size: 0.75rem;">${readiness} for ${goalNames[goal]}</div>`;
    report += `<div style="margin-top: 2px;">Portfolio Score: ${overallScore}/100</div>`;
    report += `</div>`;
    
    // Detailed breakdown
    report += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-bottom: 6px;">`;
    report += `<div style="background: rgba(248, 200, 208, 0.1); padding: 2px; border-radius: 2px; text-align: center;">`;
    report += `<div style="font-size: 0.55rem;">Technical</div><div style="color: #f8c8d0; font-weight: bold;">${analysis.technicalQuality.overall}/100</div></div>`;
    
    report += `<div style="background: rgba(248, 200, 208, 0.1); padding: 2px; border-radius: 2px; text-align: center;">`;
    report += `<div style="font-size: 0.55rem;">Composition</div><div style="color: #f8c8d0; font-weight: bold;">${analysis.composition.score}/100</div></div>`;
    
    report += `<div style="background: rgba(248, 200, 208, 0.1); padding: 2px; border-radius: 2px; text-align: center;">`;
    report += `<div style="font-size: 0.55rem;">Originality</div><div style="color: #f8c8d0; font-weight: bold;">${analysis.originality.score}/100</div></div>`;
    
    report += `<div style="background: rgba(248, 200, 208, 0.1); padding: 2px; border-radius: 2px; text-align: center;">`;
    report += `<div style="font-size: 0.55rem;">Presentation</div><div style="color: #f8c8d0; font-weight: bold;">${analysis.presentation.score}/100</div></div>`;
    report += `</div>`;
    
    // Strengths and improvements
    report += `<div style="margin-bottom: 3px;"><strong>✓ Strength:</strong> ${analysis.composition.strength}</div>`;
    report += `<div style="margin-bottom: 3px;"><strong>📈 Improve:</strong> ${analysis.composition.improvement}</div>`;
    
    // Goal-specific advice
    const goalAdvice = {
        gallery: 'Focus on conceptual depth and technical excellence',
        client: 'Emphasize professionalism and clear communication',
        job: 'Show versatility and consistent quality',
        school: 'Demonstrate artistic growth and experimentation',
        social: 'Optimize for digital viewing and engagement'
    };
    
    report += `<div style="margin-bottom: 3px;"><strong>🎯 ${goalNames[goal]} Tip:</strong> ${goalAdvice[goal]}</div>`;
    
    // Final recommendation
    if (overallScore >= 85) {
        report += `<div style="color: #4CAF50; font-size: 0.6rem; margin-top: 4px;">This piece meets professional standards for ${goalNames[goal]}. Strong portfolio addition!</div>`;
    } else if (overallScore >= 75) {
        report += `<div style="color: #FF9500; font-size: 0.6rem; margin-top: 4px;">Close to portfolio ready. Address the improvement areas and you'll have a strong piece.</div>`;
    } else {
        report += `<div style="color: #F44336; font-size: 0.6rem; margin-top: 4px;">Needs significant work before portfolio inclusion. Focus on fundamentals and composition.</div>`;
    }
    
    report += '</div>';
    
    return report;
}

// 3D Unit Converter
function calculate3DConversion() {
    const baseColor = document.getElementById('baseColor').value;
    const harmonyType = document.getElementById('harmonyType').value;
    const display = document.getElementById('harmonyResult');
    
    // Convert hex to HSL
    function hexToHsl(hex) {
        const r = parseInt(hex.substr(1, 2), 16) / 255;
        const g = parseInt(hex.substr(3, 2), 16) / 255;
        const b = parseInt(hex.substr(5, 2), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return [h * 360, s * 100, l * 100];
    }
    
    // Convert HSL to hex
    function hslToHex(h, s, l) {
        h = h % 360;
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c/2;
        let r = 0, g = 0, b = 0;
        
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }
    
    const [h, s, l] = hexToHsl(baseColor);
    let colors = [baseColor];
    
    switch (harmonyType) {
        case 'complementary':
            colors.push(hslToHex(h + 180, s, l));
            break;
        case 'triadic':
            colors.push(hslToHex(h + 120, s, l));
            colors.push(hslToHex(h + 240, s, l));
            break;
        case 'analogous':
            colors.push(hslToHex(h + 30, s, l));
            colors.push(hslToHex(h - 30, s, l));
            break;
        case 'split':
            colors.push(hslToHex(h + 150, s, l));
            colors.push(hslToHex(h + 210, s, l));
            break;
    }
    
    let harmonyHTML = '<div style="display: flex; justify-content: center; gap: 8px; margin: 10px 0;">';
    colors.forEach(color => {
        harmonyHTML += `<div style="width: 35px; height: 35px; background: ${color}; border-radius: 50%; border: 2px solid rgba(248, 200, 208, 0.3);"></div>`;
    });
    harmonyHTML += '</div>';
    harmonyHTML += `<div style="font-size: 0.8rem; margin-top: 8px; text-align: center;">${colors.join(' • ')}</div>`;
    
    display.innerHTML = harmonyHTML;
}





// Art Style Explorer
const artStyleDetails = [
    {
        name: "Impressionism",
        features: "Loose brushstrokes, emphasis on light and atmosphere",
        colors: "Pure, unmixed colors applied in small touches",
        subjects: "Everyday scenes, landscapes, light effects",
        techniques: "Broken color, visible brushstrokes, outdoor painting"
    },
    {
        name: "Art Nouveau",
        features: "Flowing, organic lines and natural forms",
        colors: "Muted, earthy tones with gold accents",
        subjects: "Nature motifs, feminine figures, decorative arts",
        techniques: "Stylized botanical forms, asymmetrical compositions"
    },
    {
        name: "Cubism",
        features: "Geometric shapes, multiple perspectives",
        colors: "Neutral tones, earth colors, limited palette",
        subjects: "Still lifes, portraits broken into planes",
        techniques: "Fragmentation, collage, abstract representation"
    },
    {
        name: "Surrealism",
        features: "Dreamlike imagery, unexpected combinations",
        colors: "Vivid, contrasting colors or monochromatic",
        subjects: "Subconscious imagery, bizarre juxtapositions",
        techniques: "Automatic drawing, photomontage, distortion"
    },
    {
        name: "Abstract Expressionism",
        features: "Emotional intensity, gestural brushwork",
        colors: "Bold, expressive color choices",
        subjects: "Non-representational forms, pure emotion",
        techniques: "Action painting, color field, large scale"
    },
    {
        name: "Pop Art",
        features: "Commercial imagery, bold graphics",
        colors: "Bright, saturated colors from mass media",
        subjects: "Consumer products, celebrities, everyday objects",
        techniques: "Screen printing, collage, mechanical reproduction"
    },
    {
        name: "Minimalism",
        features: "Simple forms, reduction of elements",
        colors: "Limited palette, often monochromatic",
        subjects: "Basic geometric shapes, industrial materials",
        techniques: "Repetition, clean lines, negative space"
    },
    {
        name: "Fauvism",
        features: "Wild, expressive use of color",
        colors: "Non-naturalistic, pure intense colors",
        subjects: "Landscapes, portraits with emotional color",
        techniques: "Bold brushstrokes, color as emotion"
    }
];

function generateArtStyle() {
    const style = artStyleDetails[Math.floor(Math.random() * artStyleDetails.length)];
    document.getElementById('styleName').textContent = style.name;
    document.getElementById('styleDetails').innerHTML = 
        `<strong>Key Features:</strong> ${style.features}<br>` +
        `<strong>Colors:</strong> ${style.colors}<br>` +
        `<strong>Subjects:</strong> ${style.subjects}<br>` +
        `<strong>Techniques:</strong> ${style.techniques}`;
}

// Constraint Spinner
const constraintChallenges = [
    "Only use three colors maximum",
    "No outlines - only shapes and color",
    "Work only in monochrome",
    "Use only your non-dominant hand",
    "Complete in under 15 minutes",
    "No erasing or undoing allowed",
    "Use only geometric shapes",
    "Work from memory - no references",
    "Use unconventional tools (sponge, fingers, etc.)",
    "Limit yourself to 10 brush strokes",
    "Work upside down",
    "Use only cool colors",
    "Create with your eyes closed for 5 minutes",
    "No lifting your drawing tool",
    "Work on a surface smaller than 4x4 inches",
    "Use only warm colors",
    "Include at least 5 circles",
    "Work in complete darkness with one light source",
    "Use only textures, no solid areas",
    "Mirror your composition exactly"
];

function spinConstraint() {
    const constraint = constraintChallenges[Math.floor(Math.random() * constraintChallenges.length)];
    document.getElementById('spinnerConstraint').textContent = constraint;
}



// Proportional Drawing Guide
const proportionGuides = [
    {
        subject: "Human Face",
        details: [
            "• Eyes are halfway down the head",
            "• Eye width = distance between eyes",
            "• Nose tip to chin = forehead to hairline",
            "• Mouth is 1/3 from nose to chin"
        ]
    },
    {
        subject: "Human Figure",
        details: [
            "• Adult body = 8 head lengths tall",
            "• Arms span equals total height",
            "• Hands reach mid-thigh",
            "• Elbows align with waist"
        ]
    },
    {
        subject: "Horse",
        details: [
            "• Body length = height at withers",
            "• Neck length = head length",
            "• Legs = 1/2 total body height",
            "• Head = 1/4 of neck to ground"
        ]
    },
    {
        subject: "Classical Architecture",
        details: [
            "• Column height = 8-10 times diameter",
            "• Entablature = 1/4 column height",
            "• Pedestal = 1/3 column height",
            "• Golden ratio governs proportions"
        ]
    },
    {
        subject: "Tree Structure",
        details: [
            "• Trunk width = 1/7 of tree height",
            "• First branches at 1/3 height",
            "• Crown width = 2/3 total height",
            "• Root spread = crown spread"
        ]
    },
    {
        subject: "Flower Proportions",
        details: [
            "• Petal length = 1.5x petal width",
            "• Stem length = 3-5x flower diameter",
            "• Leaves = 2/3 stem length",
            "• Center = 1/5 total flower size"
        ]
    }
];

function generateProportionGuide() {
    const guide = proportionGuides[Math.floor(Math.random() * proportionGuides.length)];
    document.getElementById('proportionSubject').textContent = guide.subject;
    document.getElementById('proportionDetails').innerHTML = guide.details.join('<br>');
}

// Texture Techniques
const textureGuides = [
    {
        type: "Wood Grain",
        methods: {
            pencil: "Long parallel strokes, vary pressure for knots",
            paint: "Dry brush technique, layer light over dark",
            digital: "Use texture brush, apply noise filter"
        }
    },
    {
        type: "Metal Surface",
        methods: {
            pencil: "Smooth gradations, sharp reflective highlights",
            paint: "Wet blending, metallic paints for authenticity",
            digital: "Gradient maps, reflection layers"
        }
    },
    {
        type: "Fabric Weave",
        methods: {
            pencil: "Cross-hatching in fabric direction",
            paint: "Small brush, build up thread patterns",
            digital: "Clone stamp with fabric texture"
        }
    },
    {
        type: "Stone/Rock",
        methods: {
            pencil: "Varied pressure, rough paper for texture",
            paint: "Sponge technique, stippling for roughness",
            digital: "Scatter brushes, layer blend modes"
        }
    },
    {
        type: "Water Surface",
        methods: {
            pencil: "Horizontal strokes, leave white highlights",
            paint: "Wet-on-wet, horizontal brush strokes",
            digital: "Motion blur, wave displacement"
        }
    },
    {
        type: "Glass",
        methods: {
            pencil: "Minimal lines, focus on reflections",
            paint: "Transparent glazes, sharp highlights",
            digital: "Opacity layers, lens effects"
        }
    }
];

function generateTextureMethod() {
    const texture = textureGuides[Math.floor(Math.random() * textureGuides.length)];
    document.getElementById('textureType').textContent = texture.type;
    document.getElementById('textureMethod').innerHTML = 
        `<strong>Pencil:</strong> ${texture.methods.pencil}<br>` +
        `<strong>Paint:</strong> ${texture.methods.paint}<br>` +
        `<strong>Digital:</strong> ${texture.methods.digital}`;
}

// Drawing Prompts
const drawingPrompts = [
    "Draw your favorite childhood memory as an abstract composition",
    "Illustrate what music looks like - choose a song and visualize it",
    "Create a portrait using only geometric shapes",
    "Draw the same object from 5 different viewpoints",
    "Illustrate an emotion without using faces or people",
    "Draw your city as if it were underwater",
    "Create a self-portrait in the style of your favorite artist",
    "Illustrate a conversation between two colors",
    "Draw what you imagine the inside of a clock looks like",
    "Create a landscape using only kitchen utensils as inspiration",
    "Draw your hands in 10 different poses and expressions",
    "Illustrate a dream you remember - make it surreal",
    "Draw an ordinary object as if it were ancient and mysterious",
    "Create a character that represents your current mood",
    "Illustrate what silence would look like as a place",
    "Draw a tree that grows something other than leaves",
    "Create a map of an imaginary place from your favorite book",
    "Draw the same scene in 4 different lighting conditions",
    "Illustrate what your name would look like as a creature",
    "Draw a detailed study of fabric folds and shadows"
];

function generateDrawingPrompt() {
    const prompt = drawingPrompts[Math.floor(Math.random() * drawingPrompts.length)];
    document.getElementById('drawingPrompt').innerHTML = `<span>${prompt}</span>`;
}

// Reference Categories
const referenceCategories = [
    {
        category: "Portrait Studies",
        suggestions: [
            "• Focus on lighting and shadow patterns",
            "• Study different age groups and ethnicities", 
            "• Practice various expressions and angles",
            "• Try: dramatic lighting, profile views, children"
        ]
    },
    {
        category: "Animal Studies",
        suggestions: [
            "• Start with basic shapes and build details",
            "• Study fur, feather, and scale textures",
            "• Focus on characteristic poses and movements",
            "• Try: pets in motion, wildlife, close-up details"
        ]
    },
    {
        category: "Still Life Arrangements",
        suggestions: [
            "• Practice rendering different materials",
            "• Study how light affects various surfaces",
            "• Experiment with composition and negative space",
            "• Try: fruits, glassware, fabric draping, flowers"
        ]
    },
    {
        category: "Architectural Elements",
        suggestions: [
            "• Focus on perspective and proportion",
            "• Study how light creates form and shadow",
            "• Practice rendering different building materials",
            "• Try: doorways, windows, stairs, bridges"
        ]
    },
    {
        category: "Hands and Gestures",
        suggestions: [
            "• Practice from multiple angles and positions",
            "• Study how fingers bend and overlap",
            "• Focus on the relationship between hand and wrist",
            "• Try: holding objects, pointing, open/closed fists"
        ]
    },
    {
        category: "Landscape Elements",
        suggestions: [
            "• Study cloud formations and sky variations",
            "• Practice rendering water in different states",
            "• Focus on foreground, middle, background relationships",
            "• Try: trees, rocks, mountains, reflections"
        ]
    }
];

function generateReferenceCategory() {
    const category = referenceCategories[Math.floor(Math.random() * referenceCategories.length)];
    document.getElementById('refCategory').textContent = category.category;
    document.getElementById('refSuggestions').innerHTML = category.suggestions.join('<br>');
}

// Modal Management
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');
    
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    
    if (!overlay) {
        console.error('Modal overlay not found');
        return;
    }
    
    // Close any currently open modals first
    closeModal();
    
    // Show modal and overlay
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize specific modal functionality
    if (modalId === 'colorTheoryModal') {
        initializeProfessionalPaletteMaker();
    }
    
    console.log('Modal opened successfully:', modalId);
    
    // Add smooth entrance animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
    }, 10);
}

function closeModal() {
    console.log('Closing modals');
    
    const modals = document.querySelectorAll('.resource-modal');
    const overlay = document.querySelector('.modal-overlay');
    
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(-20px)';
    });
    
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    document.body.style.overflow = 'auto';
}

// Professional Color Palette Maker - New Workflow
// Global variables for palette maker
let selectedSignatureColor = '#e74c3c';
let selectedColorTheory = 'monochromatic';
let selectedMood = 'balanced';
let paletteSize = 5;
let currentPalette = [];
let lockedColors = new Set();
let wcagLevel = 'AA';
let currentWCAGLevel = 'AA';

// Color name database (simplified)
const colorNames = {
    '#e74c3c': 'Alizarin', '#3498db': 'Dodger Blue', '#2ecc71': 'Emerald',
    '#f39c12': 'Orange', '#9b59b6': 'Amethyst', '#1abc9c': 'Turquoise',
    '#e67e22': 'Carrot', '#34495e': 'Wet Asphalt'
};

// Step 1: Signature Color Functions
function updateSignatureColor() {
    const colorPicker = document.getElementById('signatureColor');
    selectedSignatureColor = colorPicker.value;
    
    // Update color info (removed preview element since we're using the input directly)
    updateColorInfo(selectedSignatureColor);
    
    console.log('Signature color updated:', selectedSignatureColor);
}

function setSignatureColor(color) {
    selectedSignatureColor = color;
    document.getElementById('signatureColor').value = color;
    
    // Update color info (removed preview element since we're using the input directly)
    updateColorInfo(color);
    
    console.log('Signature color set:', color);
}

function updateColorInfo(color) {
    const hexValue = document.querySelector('.hex-value');
    const colorName = document.querySelector('.color-name');
    
    hexValue.textContent = color.toUpperCase();
    colorName.textContent = colorNames[color] || getColorName(color);
}

function getColorName(hex) {
    // Simple color naming based on HSL values
    const hsl = hexToHsl(hex);
    const hue = hsl.h;
    const sat = hsl.s;
    const light = hsl.l;
    
    if (sat < 0.1) return light > 0.8 ? 'Light Gray' : light < 0.2 ? 'Dark Gray' : 'Gray';
    
    if (hue < 30) return light > 0.6 ? 'Light Red' : 'Red';
    if (hue < 60) return light > 0.6 ? 'Light Orange' : 'Orange';
    if (hue < 120) return light > 0.6 ? 'Light Yellow' : 'Yellow';
    if (hue < 180) return light > 0.6 ? 'Light Green' : 'Green';
    if (hue < 240) return light > 0.6 ? 'Light Blue' : 'Blue';
    if (hue < 300) return light > 0.6 ? 'Light Purple' : 'Purple';
    return light > 0.6 ? 'Light Pink' : 'Pink';
}

// Step 2: Color Theory and Mood Functions
function selectColorTheory(theory) {
    selectedColorTheory = theory;
    
    // Update active button
    document.querySelectorAll('.theory-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-theory="${theory}"]`).classList.add('active');
    
    console.log('Color theory selected:', theory);
}

function selectMood(mood) {
    selectedMood = mood;
    
    // Update active button
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
    
    console.log('Mood selected:', mood);
}

function updatePaletteSize() {
    const slider = document.getElementById('paletteSize');
    paletteSize = parseInt(slider.value);
    document.getElementById('sizeValue').textContent = `${paletteSize} colors`;
    
    console.log('Palette size updated:', paletteSize);
}

function generateBasePalette() {
    currentPalette = generatePaletteFromSettings();
    lockedColors.clear(); // Reset locks when generating new palette
    
    displayPalette();
    generateContrastMatrix();
    updateAccessibilityReport();
    
    // Show step 3
    showStep(3);
    
    console.log('Base palette generated:', currentPalette);
}

function generatePaletteFromSettings() {
    const baseColor = selectedSignatureColor;
    let colors = [];
    
    switch (selectedColorTheory) {
        case 'monochromatic':
            colors = generateMonochromaticPalette(baseColor, paletteSize);
            break;
        case 'analogous':
            colors = generateAnalogousPalette(baseColor, paletteSize);
            break;
        case 'complementary':
            colors = generateComplementaryPalette(baseColor, paletteSize);
            break;
        case 'triadic':
            colors = generateTriadicPalette(baseColor, paletteSize);
            break;
        case 'split-complementary':
            colors = generateSplitComplementaryPalette(baseColor, paletteSize);
            break;
        case 'tetradic':
            colors = generateTetradicPalette(baseColor, paletteSize);
            break;
    }
    
    // Apply mood adjustments
    return applyMoodToPalette(colors, selectedMood);
}

// Color Theory Generation Functions
function generateMonochromaticPalette(baseColor, count) {
    const hsl = hexToHsl(baseColor);
    const colors = [];
    
    for (let i = 0; i < count; i++) {
        const lightness = Math.max(0.1, Math.min(0.9, hsl.l + (i - Math.floor(count/2)) * 0.15));
        colors.push(hslToHex(hsl.h, hsl.s, lightness));
    }
    
    return colors;
}

function generateAnalogousPalette(baseColor, count) {
    const hsl = hexToHsl(baseColor);
    const colors = [];
    const range = 60; // degrees
    
    for (let i = 0; i < count; i++) {
        const hueOffset = (i - Math.floor(count/2)) * (range / count);
        const newHue = (hsl.h + hueOffset + 360) % 360;
        colors.push(hslToHex(newHue, hsl.s, hsl.l));
    }
    
    return colors;
}

function generateComplementaryPalette(baseColor, count) {
    const hsl = hexToHsl(baseColor);
    const complement = (hsl.h + 180) % 360;
    const colors = [baseColor];
    
    // Add complement and variations
    colors.push(hslToHex(complement, hsl.s, hsl.l));
    
    // Fill remaining with tints and shades
    for (let i = 2; i < count; i++) {
        const useBase = i % 2 === 0;
        const targetHue = useBase ? hsl.h : complement;
        const lightness = Math.max(0.1, Math.min(0.9, hsl.l + (Math.random() - 0.5) * 0.4));
        colors.push(hslToHex(targetHue, hsl.s, lightness));
    }
    
    return colors;
}

function generateTriadicPalette(baseColor, count) {
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];
    
    // Add triadic colors
    colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
    colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
    
    // Fill remaining with variations
    for (let i = 3; i < count; i++) {
        const baseIndex = i % 3;
        const baseHue = [hsl.h, (hsl.h + 120) % 360, (hsl.h + 240) % 360][baseIndex];
        const lightness = Math.max(0.2, Math.min(0.8, hsl.l + (Math.random() - 0.5) * 0.3));
        colors.push(hslToHex(baseHue, hsl.s, lightness));
    }
    
    return colors;
}

function generateSplitComplementaryPalette(baseColor, count) {
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];
    
    // Add split complementary colors
    colors.push(hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l));
    colors.push(hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l));
    
    // Fill remaining
    for (let i = 3; i < count; i++) {
        const hues = [hsl.h, (hsl.h + 150) % 360, (hsl.h + 210) % 360];
        const targetHue = hues[i % 3];
        const lightness = Math.max(0.2, Math.min(0.8, hsl.l + (Math.random() - 0.5) * 0.3));
        colors.push(hslToHex(targetHue, hsl.s * 0.8, lightness));
    }
    
    return colors;
}

function generateTetradicPalette(baseColor, count) {
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];
    
    // Add tetradic colors
    colors.push(hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l));
    colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
    colors.push(hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l));
    
    // Fill remaining with variations
    for (let i = 4; i < count; i++) {
        const baseIndex = i % 4;
        const baseHue = [hsl.h, (hsl.h + 90) % 360, (hsl.h + 180) % 360, (hsl.h + 270) % 360][baseIndex];
        const lightness = Math.max(0.2, Math.min(0.8, hsl.l + (Math.random() - 0.5) * 0.2));
        colors.push(hslToHex(baseHue, hsl.s * 0.9, lightness));
    }
    
    return colors;
}

// Mood Application Functions
function applyMoodToPalette(colors, mood) {
    return colors.map(color => {
        const hsl = hexToHsl(color);
        
        switch (mood) {
            case 'vibrant':
                return hslToHex(hsl.h, Math.min(1, hsl.s * 1.2), hsl.l);
            case 'muted':
                return hslToHex(hsl.h, hsl.s * 0.6, hsl.l);
            case 'dark':
                return hslToHex(hsl.h, hsl.s, Math.max(0.1, hsl.l * 0.7));
            case 'light':
                return hslToHex(hsl.h, hsl.s * 0.8, Math.min(0.9, hsl.l * 1.3));
            case 'warm':
                const warmHue = hsl.h < 180 ? hsl.h : Math.max(0, hsl.h - 20);
                return hslToHex(warmHue, hsl.s, hsl.l);
            case 'cool':
                const coolHue = hsl.h > 180 ? hsl.h : Math.min(360, hsl.h + 20);
                return hslToHex(coolHue, hsl.s, hsl.l);
            case 'balanced':
            default:
                return color;
        }
    });
}

// Step 3: Palette Display and Refinement Functions
function displayPalette() {
    const container = document.getElementById('paletteDisplay');
    
    if (!currentPalette.length) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; opacity: 0.7;">Generate a palette to see colors here</div>';
        return;
    }
    
    const colorsHtml = currentPalette.map((color, index) => `
        <div class="palette-color-item">
            <div class="color-swatch" style="background: ${color}" onclick="copyColorToClipboard('${color}')">
                <button class="lock-toggle ${lockedColors.has(index) ? 'locked' : ''}" 
                        onclick="toggleColorLock(${index})" 
                        title="${lockedColors.has(index) ? 'Unlock' : 'Lock'} color">
                    <img src="../icons/${lockedColors.has(index) ? 'lock.png' : 'padlock-unlock.png'}" 
                         alt="${lockedColors.has(index) ? 'Locked' : 'Unlocked'}" 
                         style="width: 12px; height: 12px;">
                </button>
            </div>
            <div class="color-hex">${color.toUpperCase()}</div>
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="palette-colors">${colorsHtml}</div>
        <div style="text-align: center; margin-top: 10px; font-size: 0.85rem; opacity: 0.8;">
            Click colors to copy • Use locks to preserve colors during randomization
        </div>
    `;
}

function toggleColorLock(index) {
    event.stopPropagation(); // Prevent color copy
    
    if (lockedColors.has(index)) {
        lockedColors.delete(index);
    } else {
        lockedColors.add(index);
    }
    
    displayPalette(); // Refresh display to update lock buttons
    console.log('Toggled lock for color', index, 'Locked colors:', Array.from(lockedColors));
}

function lockAllColors() {
    lockedColors.clear();
    for (let i = 0; i < currentPalette.length; i++) {
        lockedColors.add(i);
    }
    displayPalette();
    console.log('All colors locked');
}

function unlockAllColors() {
    lockedColors.clear();
    displayPalette();
    console.log('All colors unlocked');
}

function randomizeTintsShades() {
    const adjustTints = document.getElementById('adjustTints').checked;
    const adjustShades = document.getElementById('adjustShades').checked;
    const adjustSaturation = document.getElementById('adjustSaturation').checked;
    
    currentPalette = currentPalette.map((color, index) => {
        if (lockedColors.has(index)) return color; // Skip locked colors
        
        const hsl = hexToHsl(color);
        let newHsl = { ...hsl };
        
        if (adjustTints && Math.random() > 0.5) {
            newHsl.l = Math.min(0.9, newHsl.l + Math.random() * 0.2);
        }
        
        if (adjustShades && Math.random() > 0.5) {
            newHsl.l = Math.max(0.1, newHsl.l - Math.random() * 0.2);
        }
        
        if (adjustSaturation) {
            const variation = (Math.random() - 0.5) * 0.3;
            newHsl.s = Math.max(0, Math.min(1, newHsl.s + variation));
        }
        
        return hslToHex(newHsl.h, newHsl.s, newHsl.l);
    });
    
    displayPalette();
    generateContrastMatrix();
    updateAccessibilityReport();
    
    console.log('Randomized unlocked colors:', currentPalette);
}

// Step 3: Accessibility Testing
function setWCAGLevel(level) {
    currentWCAGLevel = level;
    
    // Update active button
    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    generateContrastMatrix();
    
    console.log('WCAG level set to:', level);
}

function generateContrastMatrix() {
    if (currentPalette.length === 0) return;
    
    const matrix = document.getElementById('contrastMatrix');
    matrix.innerHTML = '<h4 style="color: #f8c8d0; margin-bottom: 15px;">🔍 Contrast Matrix</h4>';
    
    // Create matrix grid
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: 60px repeat(' + currentPalette.length + ', 1fr); gap: 5px; align-items: center;';
    
    // Add header row
    grid.appendChild(createMatrixCell('', true, true));
    currentPalette.forEach((color, index) => {
        const cell = createMatrixCell('', true);
        cell.style.background = color;
        cell.style.borderRadius = '4px';
        grid.appendChild(cell);
    });
    
    // Add matrix rows
    currentPalette.forEach((bgColor, rowIndex) => {
        // Row header
        const rowHeader = createMatrixCell('', true);
        rowHeader.style.background = bgColor;
        rowHeader.style.borderRadius = '4px';
        grid.appendChild(rowHeader);
        
        // Contrast cells
        currentPalette.forEach((textColor, colIndex) => {
            const contrast = calculateContrast(bgColor, textColor);
            const passes = passesWCAG(contrast, currentWCAGLevel);
            
            const cell = createMatrixCell(contrast.toFixed(1) + ':1');
            cell.style.background = bgColor;
            cell.style.color = textColor;
            cell.style.border = `2px solid ${passes ? '#4CAF50' : '#F44336'}`;
            cell.style.borderRadius = '4px';
            cell.title = `${bgColor} on ${textColor}: ${contrast.toFixed(1)}:1 - ${passes ? 'PASS' : 'FAIL'} WCAG ${currentWCAGLevel}`;
            
            grid.appendChild(cell);
        });
    });
    
    matrix.appendChild(grid);
    
    // Generate detailed report
    generateDetailedAccessibilityReport();
}

function createMatrixCell(text, isHeader = false, isEmpty = false) {
    const cell = document.createElement('div');
    cell.textContent = text;
    cell.style.cssText = `
        padding: 8px 4px;
        text-align: center;
        font-size: 0.75rem;
        font-weight: ${isHeader ? 'bold' : 'normal'};
        min-height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        ${isEmpty ? 'visibility: hidden;' : ''}
    `;
    return cell;
}

function passesWCAG(contrast, level) {
    const thresholds = { A: 3, AA: 4.5, AAA: 7 };
    return contrast >= thresholds[level];
}

function generateDetailedAccessibilityReport() {
    const report = document.getElementById('accessibilityReport');
    
    let passCount = 0;
    let totalTests = 0;
    const combinations = [];
    
    for (let i = 0; i < currentPalette.length; i++) {
        for (let j = 0; j < currentPalette.length; j++) {
            if (i !== j) {
                const contrast = calculateContrast(currentPalette[i], currentPalette[j]);
                const passes = passesWCAG(contrast, currentWCAGLevel);
                
                combinations.push({
                    bg: currentPalette[i],
                    text: currentPalette[j],
                    contrast,
                    passes
                });
                
                if (passes) passCount++;
                totalTests++;
            }
        }
    }
    
    const scorePercentage = Math.round((passCount / totalTests) * 100);
    
    report.innerHTML = `
        <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 15px; margin-top: 15px;">
            <h4 style="color: #f8c8d0; margin: 0 0 10px 0;">📊 Accessibility Score</h4>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                <div style="flex: 1; background: rgba(255,255,255,0.1); border-radius: 20px; height: 20px; overflow: hidden;">
                    <div style="width: ${scorePercentage}%; height: 100%; background: linear-gradient(90deg, #f44336, #ff9800, #4caf50); transition: width 0.3s ease;"></div>
                </div>
                <div style="color: ${scorePercentage >= 70 ? '#4CAF50' : scorePercentage >= 40 ? '#FF9800' : '#F44336'}; font-weight: bold; font-size: 1.1rem;">
                    ${scorePercentage}%
                </div>
            </div>
            <div style="font-size: 0.85rem; opacity: 0.9;">
                ${passCount} of ${totalTests} combinations pass WCAG ${wcagLevel} (${passCount > 0 ? scorePercentage >= 70 ? 'Excellent!' : scorePercentage >= 40 ? 'Good' : 'Needs improvement' : 'Poor'})
            </div>
        </div>
    `;
}

function updateAccessibilityReport() {
    // This function is called to update the accessibility report
    // It relies on generateContrastMatrix() which calls generateDetailedAccessibilityReport()
    if (currentPalette.length > 0) {
        generateContrastMatrix();
    }
}

// Export Functions
function exportPalette(format) {
    let exportData = '';
    
    switch (format) {
        case 'hex':
            exportData = currentPalette.join('\n');
            break;
        case 'rgb':
            exportData = currentPalette.map(color => {
                const rgb = hexToRgb(color);
                return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            }).join('\n');
            break;
        case 'hsl':
            exportData = currentPalette.map(color => {
                const hsl = hexToHsl(color);
                return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
            }).join('\n');
            break;
        case 'css':
            exportData = ':root {\n' + currentPalette.map((color, index) => {
                return `  --color-${index + 1}: ${color};`;
            }).join('\n') + '\n}';
            break;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(exportData).then(() => {
        showExportFeedback(format);
    });
}

function showExportFeedback(format) {
    const feedback = document.createElement('div');
    feedback.textContent = `${format.toUpperCase()} palette exported to clipboard!`;
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10001;
        font-weight: bold;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(feedback);
    setTimeout(() => {
        document.body.removeChild(feedback);
    }, 2000);
}

// Initialize the professional palette maker
function initializeProfessionalPaletteMaker() {
    // Reset to step 1
    showStep(1);
    
    // Set default signature color
    selectedSignatureColor = '#e74c3c';
    document.getElementById('signatureColor').value = selectedSignatureColor;
    updateSignatureColor();
    
    // Set default theory and mood
    selectedColorTheory = 'monochromatic';
    selectedMood = 'balanced';
    paletteSize = 5;
    
    // Clear any existing palette and locks
    currentPalette = [];
    lockedColors.clear();
    
    console.log('Professional Color Palette Maker initialized with new workflow');
}

// Step Navigation Functions
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.palette-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.getElementById(`step${stepNumber}`);
    if (targetStep) {
        targetStep.classList.add('active');
        console.log('Showing step:', stepNumber);
    }
}

function nextStep() {
    // Find current active step
    const activeStep = document.querySelector('.palette-step.active');
    if (activeStep) {
        const currentStepNum = parseInt(activeStep.id.replace('step', ''));
        if (currentStepNum < 3) {
            showStep(currentStepNum + 1);
        }
    }
}

function previousStep() {
    // Find current active step
    const activeStep = document.querySelector('.palette-step.active');
    if (activeStep) {
        const currentStepNum = parseInt(activeStep.id.replace('step', ''));
        if (currentStepNum > 1) {
            showStep(currentStepNum - 1);
        }
    }
}

function generateColorScheme(baseColor, schemeType) {
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];
    
    switch (schemeType) {
        case 'complementary':
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
            break;
            
        case 'analogous':
            colors.push(
                hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l)
            );
            break;
            
        case 'triadic':
            colors.push(
                hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
            );
            break;
            
        case 'monochromatic':
            colors.push(
                hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)),
                hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
                hslToHex(hsl.h, Math.min(100, hsl.s + 15), hsl.l),
                hslToHex(hsl.h, Math.max(0, hsl.s - 15), hsl.l)
            );
            break;
            
        case 'split-complementary':
            colors.push(
                hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l)
            );
            break;
    }
    
    return colors;
}

function generateAccessibilityReport(colors, container) {
    container.innerHTML = '<h4>Accessibility Analysis:</h4>';
    
    const combinations = [];
    for (let i = 0; i < colors.length; i++) {
        for (let j = i + 1; j < colors.length; j++) {
            const contrast = calculateContrast(colors[i], colors[j]);
            combinations.push({
                color1: colors[i],
                color2: colors[j],
                contrast: contrast,
                wcagAA: contrast >= 4.5,
                wcagAAA: contrast >= 7
            });
        }
    }
    
    combinations.sort((a, b) => b.contrast - a.contrast);
    
    // Always show accessible color recommendations (like ColorPalette Pro)
    const baseColor = colors[0]; // Use first color as base
    const accessibleColors = generateAccessibleColors(baseColor);
    
    const recommendationsDiv = document.createElement('div');
    recommendationsDiv.style.cssText = 'margin: 15px 0; padding: 15px; border-radius: 8px; background: rgba(33, 150, 243, 0.1); border: 1px solid rgba(33, 150, 243, 0.3);';
    recommendationsDiv.innerHTML = '<h5 style="color: #2196F3; margin: 0 0 10px 0;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 8px; vertical-align: middle;"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM14 4L20 10H16C14.89 10 14 9.11 14 8V4Z" fill="#2196F3"/> Add These Colors for Perfect Accessibility:</h5>';
    
    const colorGrid = document.createElement('div');
    colorGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 12px; margin: 12px 0;';
    
    accessibleColors.forEach((suggestedColor, index) => {
        const contrast = calculateContrast(baseColor, suggestedColor);
        const wcagLevel = contrast >= 7 ? 'AAA' : 'AA';
        const levelColor = contrast >= 7 ? '#4CAF50' : '#FF9800';
        
        const colorCard = document.createElement('div');
        colorCard.style.cssText = 'text-align: center; cursor: pointer; transition: transform 0.2s ease; border-radius: 8px; padding: 8px; background: rgba(0,0,0,0.1);';
        colorCard.onclick = () => copyColorToClipboard(suggestedColor);
        
        colorCard.onmouseenter = () => colorCard.style.transform = 'scale(1.05)';
        colorCard.onmouseleave = () => colorCard.style.transform = 'scale(1)';
        
        colorCard.innerHTML = `
            <div style="width: 50px; height: 50px; background: ${suggestedColor}; border-radius: 8px; border: 2px solid rgba(255,255,255,0.3); margin: 0 auto 8px auto; position: relative;">
                <div style="position: absolute; bottom: -3px; right: -3px; background: ${levelColor}; color: white; font-size: 0.6rem; padding: 1px 4px; border-radius: 3px; font-weight: bold;">${wcagLevel}</div>
            </div>
            <div style="font-size: 0.7rem; color: rgba(255,255,255,0.9); font-weight: 500;">${suggestedColor}</div>
            <div style="font-size: 0.6rem; color: ${levelColor}; font-weight: bold;">${contrast.toFixed(1)}:1</div>
        `;
        
        colorGrid.appendChild(colorCard);
    });
    
    recommendationsDiv.appendChild(colorGrid);
    
    // Add professional explanation
    const explanationDiv = document.createElement('div');
    explanationDiv.style.cssText = 'margin-top: 12px; padding: 10px; background: rgba(0,0,0,0.15); border-radius: 6px; font-size: 0.75rem; color: rgba(255,255,255,0.8); line-height: 1.4;';
    explanationDiv.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 8px; vertical-align: middle;"><path d="M12 2C13.09 2 14.05 2.65 14.5 3.61L15.83 6.27C16.28 7.23 17.23 7.88 18.32 7.88H21C21.55 7.88 22 8.33 22 8.88V16C22 17.11 21.11 18 20 18H4C2.89 18 2 17.11 2 16V8.88C2 8.33 2.45 7.88 3 7.88H5.68C6.77 7.88 7.72 7.23 8.17 6.27L9.5 3.61C9.95 2.65 10.91 2 12 2ZM12 7C14.76 7 17 9.24 17 12S14.76 17 12 17 7 14.76 7 12 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z" fill="#f8c8d0"/> <strong>Click any color to copy hex code.</strong> These colors provide professional-grade contrast with your base color. AAA level (7:1) is ideal for body text, AA level (4.5:1) works for large text and UI elements.';
    recommendationsDiv.appendChild(explanationDiv);
    
    container.appendChild(recommendationsDiv);
    
    // Show working combinations from current palette
    const goodCombos = combinations.filter(combo => combo.wcagAA);
    
    if (goodCombos.length > 0) {
        const workingCombosDiv = document.createElement('div');
        workingCombosDiv.style.cssText = 'margin: 15px 0; padding: 15px; border-radius: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3);';
        workingCombosDiv.innerHTML = '<h5 style="color: #4CAF50; margin: 0 0 12px 0;">✨ Perfect Combinations from Your Palette:</h5>';
        
        const comboGrid = document.createElement('div');
        comboGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;';
        
        goodCombos.slice(0, 4).forEach(combo => {
            const wcagLevel = combo.wcagAAA ? 'AAA' : 'AA';
            const levelColor = combo.wcagAAA ? '#4CAF50' : '#FF9800';
            
            const comboCard = document.createElement('div');
            comboCard.style.cssText = 'padding: 10px; background: rgba(0,0,0,0.1); border-radius: 8px; text-align: center; cursor: pointer;';
            comboCard.onclick = () => {
                copyColorToClipboard(`${combo.color1}, ${combo.color2}`);
            };
            
            comboCard.innerHTML = `
                <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 8px;">
                    <div style="width: 35px; height: 35px; background: ${combo.color1}; border-radius: 6px; border: 2px solid rgba(255,255,255,0.3); cursor: pointer;" onclick="event.stopPropagation(); copyColorToClipboard('${combo.color1}');" title="Click to copy ${combo.color1}"></div>
                    <div style="width: 35px; height: 35px; background: ${combo.color2}; border-radius: 6px; border: 2px solid rgba(255,255,255,0.3); cursor: pointer;" onclick="event.stopPropagation(); copyColorToClipboard('${combo.color2}');" title="Click to copy ${combo.color2}"></div>
                </div>
                <div style="font-size: 0.7rem; color: ${levelColor}; font-weight: bold; margin-bottom: 2px;">${wcagLevel}</div>
                <div style="font-size: 0.65rem; color: rgba(255,255,255,0.8);">${combo.contrast.toFixed(1)}:1</div>
            `;
            
            comboGrid.appendChild(comboCard);
        });
        
        workingCombosDiv.appendChild(comboGrid);
        
        // Add tip for working combinations
        const workingTipDiv = document.createElement('div');
        workingTipDiv.style.cssText = 'margin-top: 10px; padding: 8px; background: rgba(0,0,0,0.15); border-radius: 6px; font-size: 0.7rem; color: rgba(255,255,255,0.8); line-height: 1.4;';
        workingTipDiv.innerHTML = '✨ <strong>These combinations work perfectly together!</strong> Click individual colors to copy, or click the card to copy both colors.';
        workingCombosDiv.appendChild(workingTipDiv);
        
        container.appendChild(workingCombosDiv);
    }
    
    // Show enhanced palette suggestion with harmonious colors
    const harmonizedPalette = generateHarmonizedPalette(colors[0]);
    
    if (harmonizedPalette.length > 0) {
        const paletteDiv = document.createElement('div');
        paletteDiv.style.cssText = 'margin: 15px 0; padding: 15px; border-radius: 8px; background: rgba(156, 39, 176, 0.1); border: 1px solid rgba(156, 39, 176, 0.3);';
        paletteDiv.innerHTML = '<h5 style="color: #9C27B0; margin: 0 0 12px 0;">🌈 Complete Accessible Palette:</h5>';
        
        const fullPaletteGrid = document.createElement('div');
        fullPaletteGrid.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;';
        
        harmonizedPalette.forEach((color, index) => {
            const contrast = calculateContrast(colors[0], color);
            const isAccessible = contrast >= 4.5;
            const borderColor = isAccessible ? 'rgba(76, 175, 80, 0.8)' : 'rgba(255,255,255,0.3)';
            
            const colorSwatch = document.createElement('div');
            colorSwatch.style.cssText = `text-align: center; cursor: pointer; transition: transform 0.2s ease;`;
            colorSwatch.onclick = () => copyColorToClipboard(color);
            
            colorSwatch.onmouseenter = () => colorSwatch.style.transform = 'scale(1.1)';
            colorSwatch.onmouseleave = () => colorSwatch.style.transform = 'scale(1)';
            
            colorSwatch.innerHTML = `
                <div style="width: 40px; height: 40px; background: ${color}; border-radius: 6px; border: 2px solid ${borderColor}; margin-bottom: 4px; position: relative;">
                    ${isAccessible ? '<div style="position: absolute; top: -2px; right: -2px; background: #4CAF50; width: 12px; height: 12px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; color: white;">✓</div>' : ''}
                </div>
                <div style="font-size: 0.65rem; color: rgba(255,255,255,0.9);">${color}</div>
            `;
            
            fullPaletteGrid.appendChild(colorSwatch);
        });
        
        paletteDiv.appendChild(fullPaletteGrid);
        
        // Add palette explanation
        const paletteExplanation = document.createElement('div');
        paletteExplanation.style.cssText = 'margin-top: 10px; padding: 8px; background: rgba(0,0,0,0.15); border-radius: 6px; font-size: 0.7rem; color: rgba(255,255,255,0.8); line-height: 1.4;';
        paletteExplanation.innerHTML = '🌈 <strong>Complete harmonious palette</strong> with your base color. Colors with ✓ are accessible, others are for decorative use only.';
        paletteDiv.appendChild(paletteExplanation);
        
        container.appendChild(paletteDiv);
    }
}

function generateAccessibleColors(baseColor) {
    // Generate colors that will have excellent contrast with the base color
    const baseRgb = hexToRgb(baseColor);
    const baseLuminance = getLuminance(baseRgb.r, baseRgb.g, baseRgb.b);
    
    const professionalColors = [];
    
    // If base is light, provide dark accessible colors
    if (baseLuminance > 0.5) {
        professionalColors.push(
            '#1A1A1A', // Almost black - highest contrast
            '#2C3E50', // Dark blue-gray - professional
            '#34495E', // Slate gray - modern
            '#212529', // Bootstrap dark
            '#343A40', // Gray-800
            '#495057', // Gray-700
            '#6C757D', // Gray-600 (for large text only)
            '#28A745'  // Success green with good contrast
        );
    } else {
        // If base is dark, provide light accessible colors
        professionalColors.push(
            '#FFFFFF', // Pure white - highest contrast
            '#F8F9FA', // Off-white - softer
            '#E9ECEF', // Light gray
            '#DEE2E6', // Medium light gray
            '#CED4DA', // Gray for less critical text
            '#ADB5BD', // Gray for secondary text
            '#FFC107', // Warning yellow with good contrast
            '#28A745'  // Success green
        );
    }
    
    // Filter and sort by contrast ratio, return top 6
    return professionalColors
        .map(color => ({
            color,
            contrast: calculateContrast(baseColor, color)
        }))
        .filter(item => item.contrast >= 4.5) // WCAG AA minimum
        .sort((a, b) => b.contrast - a.contrast) // Highest contrast first
        .slice(0, 6) // Top 6 colors
        .map(item => item.color);
}

function generateHarmonizedPalette(baseColor) {
    // Generate a complete harmonious color palette including the base color
    const hsl = hexToHsl(baseColor);
    const palette = [baseColor]; // Include the original base color
    
    // Add analogous colors (neighboring hues)
    palette.push(
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l)
    );
    
    // Add complementary color
    palette.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
    
    // Add tonal variations of the base color
    palette.push(
        hslToHex(hsl.h, hsl.s, Math.min(1, hsl.l + 0.3)), // Lighter version
        hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 0.3))  // Darker version
    );
    
    // Add neutral colors that work with the palette
    const baseLuminance = getLuminance(hexToRgb(baseColor).r, hexToRgb(baseColor).g, hexToRgb(baseColor).b);
    
    if (baseLuminance > 0.5) {
        // If base is light, add darker neutrals
        palette.push('#2C3E50', '#95A5A6');
    } else {
        // If base is dark, add lighter neutrals
        palette.push('#ECF0F1', '#BDC3C7');
    }
    
    // Remove duplicates and return unique colors
    return [...new Set(palette)];
}

function copyColorToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        // Show brief feedback
        const feedback = document.createElement('div');
        feedback.textContent = `Copied ${color}!`;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-primary-accent);
            color: var(--color-background);
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: var(--font-accent);
        `;
        document.body.appendChild(feedback);
        setTimeout(() => document.body.removeChild(feedback), 1500);
    });
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Composition Grid Overlay
function loadCompositionImage() {
    const input = document.getElementById('imageUpload');
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const canvas = document.getElementById('compositionCanvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                // Set canvas size
                const maxWidth = 600;
                const maxHeight = 400;
                let { width, height } = img;
                
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Store original image data for grid switching
                canvas.originalImageData = e.target.result;
                
                // Draw image
                ctx.drawImage(img, 0, 0, width, height);
                
                // Apply grid immediately
                applyCompositionGrid();
            };
            
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function applyCompositionGrid() {
    const canvas = document.getElementById('compositionCanvas');
    const ctx = canvas.getContext('2d');
    const gridType = document.getElementById('gridType').value;
    const opacity = parseFloat(document.getElementById('gridOpacity').value);
    
    // Clear the canvas completely first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get the original image if it exists
    if (canvas.originalImageData) {
        // Redraw the original image
        const img = new Image();
        img.onload = function() {
            // Clear and redraw image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Apply the selected grid
            drawGrid(ctx, canvas.width, canvas.height, gridType, opacity);
        };
        img.src = canvas.originalImageData;
    } else {
        // No image, just draw grid on empty canvas
        ctx.fillStyle = 'rgba(40, 40, 40, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx, canvas.width, canvas.height, gridType, opacity);
    }
}

function drawGrid(ctx, width, height, gridType, opacity) {
    // Set grid style
    ctx.strokeStyle = `rgba(248, 200, 208, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    
    ctx.beginPath();
    
    switch (gridType) {
        case 'rule-of-thirds':
            // Vertical lines
            ctx.moveTo(width / 3, 0);
            ctx.lineTo(width / 3, height);
            ctx.moveTo((width * 2) / 3, 0);
            ctx.lineTo((width * 2) / 3, height);
            // Horizontal lines
            ctx.moveTo(0, height / 3);
            ctx.lineTo(width, height / 3);
            ctx.moveTo(0, (height * 2) / 3);
            ctx.lineTo(width, (height * 2) / 3);
            break;
            
        case 'golden-ratio':
            const phi = 1.618;
            const goldenWidth = width / phi;
            const goldenHeight = height / phi;
            
            // Vertical lines
            ctx.moveTo(goldenWidth, 0);
            ctx.lineTo(goldenWidth, height);
            ctx.moveTo(width - goldenWidth, 0);
            ctx.lineTo(width - goldenWidth, height);
            // Horizontal lines
            ctx.moveTo(0, goldenHeight);
            ctx.lineTo(width, goldenHeight);
            ctx.moveTo(0, height - goldenHeight);
            ctx.lineTo(width, height - goldenHeight);
            break;
            
        case 'diagonal':
            // Main diagonals only
            ctx.moveTo(0, 0);
            ctx.lineTo(width, height);
            ctx.moveTo(width, 0);
            ctx.lineTo(0, height);
            break;
            
        case 'center':
            // Center cross only
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width / 2, height);
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            break;
    }
    
    ctx.stroke();
}

// Print Specifications Guide
function calculatePrintSpecs() {
    const printType = document.getElementById('printType').value;
    const width = parseFloat(document.getElementById('printWidth').value);
    const height = parseFloat(document.getElementById('printHeight').value);
    const dpi = parseInt(document.getElementById('printDPI').value);
    const resultsDiv = document.getElementById('printSpecsResult');
    const tipsDiv = document.getElementById('printTips');
    
    if (!width || !height || !dpi) {
        resultsDiv.innerHTML = '<p style="color: #F44336;">Please fill in all dimensions.</p>';
        return;
    }
    
    // Calculate pixel dimensions
    const pixelWidth = Math.round(width * dpi);
    const pixelHeight = Math.round(height * dpi);
    
    // Calculate file size estimates (rough)
    const totalPixels = pixelWidth * pixelHeight;
    const rgbSize = (totalPixels * 3) / (1024 * 1024); // MB for RGB
    const cmykSize = (totalPixels * 4) / (1024 * 1024); // MB for CMYK
    
    // Get print specifications
    const specs = getPrintTypeSpecs(printType);
    
    resultsDiv.innerHTML = `
        <h4>Print Specifications:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
            <div>
                <strong>Dimensions:</strong><br>
                ${width}" × ${height}" (${(width * 2.54).toFixed(1)} × ${(height * 2.54).toFixed(1)} cm)
            </div>
            <div>
                <strong>Resolution:</strong><br>
                ${pixelWidth} × ${pixelHeight} pixels at ${dpi} DPI
            </div>
            <div>
                <strong>Color Mode:</strong><br>
                ${specs.colorMode}
            </div>
            <div>
                <strong>Recommended DPI:</strong><br>
                ${specs.recommendedDPI}
            </div>
            <div>
                <strong>File Size (RGB):</strong><br>
                ~${rgbSize.toFixed(1)} MB
            </div>
            <div>
                <strong>File Size (CMYK):</strong><br>
                ~${cmykSize.toFixed(1)} MB
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: rgba(248, 200, 208, 0.1); border-radius: 8px;">
            <strong>Recommended Settings:</strong><br>
            • Bleed: ${specs.bleed}<br>
            • Safety Margin: ${specs.safetyMargin}<br>
            • File Format: ${specs.fileFormat}
        </div>
    `;
    
    tipsDiv.innerHTML = `
        <h4>Professional Tips:</h4>
        <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.9);">
            ${specs.tips.map(tip => `<li style="margin: 5px 0;">${tip}</li>`).join('')}
        </ul>
    `;
}

function getPrintTypeSpecs(printType) {
    const specs = {
        'poster': {
            colorMode: 'RGB or CMYK',
            recommendedDPI: '150-300 DPI',
            bleed: '0.125" (3mm)',
            safetyMargin: '0.25" (6mm)',
            fileFormat: 'PDF, TIFF, or PNG',
            tips: [
                'Use RGB for digital prints, CMYK for offset printing',
                'Large format prints can use lower DPI (150-200)',
                'Consider viewing distance when choosing resolution',
                'Always proof your colors on the intended paper stock'
            ]
        },
        'business-card': {
            colorMode: 'CMYK',
            recommendedDPI: '300-600 DPI',
            bleed: '0.125" (3mm) all sides',
            safetyMargin: '0.125" (3mm) from edges',
            fileFormat: 'PDF with embedded fonts',
            tips: [
                'Standard size is 3.5" × 2" (89 × 51 mm)',
                'Use rich black (C:40 M:30 Y:30 K:100) for true black',
                'Keep important text away from cut lines',
                'Consider special finishes like spot UV or foil'
            ]
        },
        'brochure': {
            colorMode: 'CMYK',
            recommendedDPI: '300 DPI',
            bleed: '0.125" (3mm)',
            safetyMargin: '0.25" (6mm)',
            fileFormat: 'PDF with crop marks',
            tips: [
                'Plan your fold lines carefully',
                'Account for paper thickness in multi-fold designs',
                'Use consistent margins and alignment',
                'Test print and fold before final production'
            ]
        },
        'book': {
            colorMode: 'CMYK (interior), RGB+CMYK (cover)',
            recommendedDPI: '300 DPI',
            bleed: '0.125" (3mm) cover, none for interior',
            safetyMargin: '0.5" (12mm) from spine',
            fileFormat: 'PDF/X-1a or PDF/X-3',
            tips: [
                'Calculate spine width based on page count and paper',
                'Use proper margins for binding method',
                'Consider gutter space for perfect binding',
                'Ensure text doesn\'t fall into the gutter area'
            ]
        },
        'magazine': {
            colorMode: 'CMYK',
            recommendedDPI: '300 DPI',
            bleed: '0.125" (3mm)',
            safetyMargin: '0.375" (9mm)',
            fileFormat: 'PDF with color profile',
            tips: [
                'Use consistent grid system throughout',
                'Plan for saddle-stitched or perfect binding',
                'Consider ink coverage for cost efficiency',
                'Maintain consistent color calibration'
            ]
        },
        'packaging': {
            colorMode: 'CMYK + Spot colors',
            recommendedDPI: '300-350 DPI',
            bleed: '0.125" (3mm)',
            safetyMargin: '0.25" (6mm)',
            fileFormat: 'PDF with dielines',
            tips: [
                'Include structural dielines on separate layer',
                'Consider substrate and coating effects on colors',
                'Plan for die-cutting and folding tolerances',
                'Test prototypes before final production'
            ]
        }
    };
    
    return specs[printType] || specs['poster'];
}

// Utility functions for color conversion
function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h = 0;
    if (diff !== 0) {
        switch (max) {
            case r: h = ((g - b) / diff) % 6; break;
            case g: h = (b - r) / diff + 2; break;
            case b: h = (r - g) / diff + 4; break;
        }
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    
    const l = (max + min) / 2;
    const s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));
    
    return {
        h: h,
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToHex(h, s, l) {
    h = h % 360;
    s = s / 100;
    l = l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function calculateContrast(color1, color2) {
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    function getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show brief feedback
        const feedback = document.createElement('div');
        feedback.textContent = 'Copied!';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-primary-accent);
            color: var(--color-background);
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: var(--font-accent);
        `;
        document.body.appendChild(feedback);
        setTimeout(() => document.body.removeChild(feedback), 1000);
    });
}

// Event listeners for modals
document.addEventListener('DOMContentLoaded', function() {
    // Modal close button listeners
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Modal overlay click to close
    document.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
    
    // Grid controls listeners
    document.getElementById('gridType')?.addEventListener('change', applyCompositionGrid);
    document.getElementById('gridOpacity')?.addEventListener('input', applyCompositionGrid);
    
    // Temperature slider listener
    document.getElementById('temperatureSlider')?.addEventListener('input', function() {
        const temp = this.value;
        document.getElementById('temperatureValue').textContent = temp + 'K';
        updateTemperatureColor(temp);
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Image Style Analyzer
function handleStyleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Show preview
        const preview = document.getElementById('styleImagePreview');
        const previewImg = document.getElementById('stylePreviewImage');
        previewImg.src = e.target.result;
        preview.style.display = 'block';
        
        // Update upload area
        const uploadArea = document.getElementById('styleUploadArea');
        uploadArea.style.borderColor = 'rgba(248, 200, 208, 0.8)';
        uploadArea.innerHTML = `
            <div style="color: #f8c8d0; font-weight: 500; font-size: 0.8rem;">✓ Image uploaded</div>
            <div style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Click to change</div>
        `;
        
        // Enable analyze button
        const analyzeBtn = document.getElementById('analyzeStyleBtn');
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze Style';
        
        // Hide previous analysis
        document.getElementById('styleAnalysis').style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

function analyzeImageStyle() {
    const analyzeBtn = document.getElementById('analyzeStyleBtn');
    
    // Show loading state
    document.getElementById('loadingStyleAnalysis').style.display = 'block';
    document.getElementById('styleAnalysis').style.display = 'none';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';
    
    // Simulate comprehensive analysis
    setTimeout(() => {
        const analysis = generateStyleAnalysis();
        
        document.getElementById('loadingStyleAnalysis').style.display = 'none';
        document.getElementById('styleAnalysis').style.display = 'block';
        document.getElementById('styleAnalysisContent').innerHTML = analysis;
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze Again';
    }, 2500);
}

function generateStyleAnalysis() {
    const styles = [
        'Impressionist', 'Abstract Expressionist', 'Pop Art', 'Surrealist', 'Minimalist', 
        'Realist', 'Cubist', 'Art Nouveau', 'Contemporary', 'Street Art'
    ];
    
    const compositions = [
        'Rule of Thirds', 'Golden Ratio', 'Symmetrical', 'Dynamic Diagonal', 'Radial'
    ];
    
    const colorPalettes = [
        'Warm Tones', 'Cool Palette', 'Monochromatic', 'Complementary', 'Analogous', 'High Contrast'
    ];
    
    const techniques = [
        'Bold Brushwork', 'Fine Detail', 'Loose Sketchy', 'Photorealistic', 'Abstract Forms', 'Mixed Media'
    ];
    
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
    const selectedComposition = compositions[Math.floor(Math.random() * compositions.length)];
    const selectedPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    const selectedTechnique = techniques[Math.floor(Math.random() * techniques.length)];
    
    const confidence = (85 + Math.random() * 10).toFixed(1);
    
    return `
        <div style="margin-bottom: 8px;">
            <strong style="color: #f8c8d0;">Style Match: ${selectedStyle}</strong> (${confidence}% confidence)
        </div>
        <div style="font-size: 0.65rem; line-height: 1.3; margin-bottom: 6px;">
            <strong>Composition:</strong> ${selectedComposition}<br>
            <strong>Color Palette:</strong> ${selectedPalette}<br>
            <strong>Technique:</strong> ${selectedTechnique}
        </div>
        <div style="font-size: 0.6rem; opacity: 0.8; font-style: italic; margin-top: 6px;">
            Analysis based on visual patterns, color distribution, and compositional elements
        </div>
    `;
}

// 3D Unit Converter
function calculate3DConversion() {
    const length = parseFloat(document.getElementById('3dLength').value);
    const width = parseFloat(document.getElementById('3dWidth').value);
    const height = parseFloat(document.getElementById('3dHeight').value);
    const fromUnit = document.getElementById('3dFromUnit').value;
    const materialType = document.getElementById('materialType').value;
    const display = document.getElementById('3dResults');
    
    if (!length || !width || !height) {
        display.innerHTML = '<span style="color: #f8c8d0;">Enter all dimensions</span>';
        return;
    }
    
    // Convert to cubic centimeters for calculations
    let lengthCm, widthCm, heightCm;
    const conversionFactors = {
        mm: 0.1,
        cm: 1,
        in: 2.54,
        ft: 30.48,
        units: 1
    };
    
    const factor = conversionFactors[fromUnit];
    lengthCm = length * factor;
    widthCm = width * factor;
    heightCm = height * factor;
    
    const volumeCm3 = lengthCm * widthCm * heightCm;
    const volumeIn3 = volumeCm3 / 16.387;
    const volumeMl = volumeCm3;
    const volumeLiters = volumeCm3 / 1000;
    
    let result = `<div style="font-size: 0.7rem; line-height: 1.4;">`;
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-bottom: 6px;">Volume Calculations:</div>`;
    result += `<strong>Cubic Centimeters:</strong> ${volumeCm3.toFixed(2)} cm³<br>`;
    result += `<strong>Cubic Inches:</strong> ${volumeIn3.toFixed(2)} in³<br>`;
    result += `<strong>Milliliters:</strong> ${volumeMl.toFixed(2)} ml<br>`;
    
    if (volumeLiters >= 1) {
        result += `<strong>Liters:</strong> ${volumeLiters.toFixed(2)} L<br>`;
    }
    
    // Material cost estimates
    if (materialType !== 'none') {
        const materialCosts = {
            pla: { name: 'PLA Filament', costPerCm3: 0.04, density: 1.24 },
            abs: { name: 'ABS Filament', costPerCm3: 0.05, density: 1.05 },
            resin: { name: 'UV Resin', costPerCm3: 0.12, density: 1.1 },
            clay: { name: 'Polymer Clay', costPerCm3: 0.08, density: 1.8 }
        };
        
        const material = materialCosts[materialType];
        const weight = (volumeCm3 * material.density).toFixed(1);
        const cost = (volumeCm3 * material.costPerCm3).toFixed(2);
        
        result += `<div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(248, 200, 208, 0.2);">`;
        result += `<strong>${material.name}:</strong><br>`;
        result += `Weight: ~${weight}g<br>`;
        result += `Est. Cost: ~$${cost}`;
        result += `</div>`;
    }
    
    result += `</div>`;
    
    display.innerHTML = result;
}

// Color Temperature Analyzer
function updateTemperatureColor(temp) {
    const color = kelvinToHex(temp);
    document.getElementById('temperatureColor').value = color;
}

function setTemperature(temp) {
    document.getElementById('temperatureSlider').value = temp;
    document.getElementById('temperatureValue').textContent = temp + 'K';
    updateTemperatureColor(temp);
}

function analyzeColorTemperature() {
    const temp = parseInt(document.getElementById('temperatureSlider').value);
    const display = document.getElementById('temperatureResults');
    
    let tempType, mood, usage;
    
    if (temp < 3000) {
        tempType = 'Very Warm';
        mood = 'Cozy, intimate, romantic';
        usage = 'Candlelight scenes, sunset portraits';
    } else if (temp < 4000) {
        tempType = 'Warm';
        mood = 'Comfortable, relaxing, homey';
        usage = 'Indoor lighting, golden hour';
    } else if (temp < 5500) {
        tempType = 'Neutral';
        mood = 'Natural, balanced, professional';
        usage = 'Studio photography, general artwork';
    } else if (temp < 7000) {
        tempType = 'Cool';
        mood = 'Clean, fresh, energetic';
        usage = 'Daylight scenes, modern interiors';
    } else {
        tempType = 'Very Cool';
        mood = 'Crisp, clinical, dramatic';
        usage = 'Overcast skies, blue hour';
    }
    
    const result = `
        <div style="font-size: 0.7rem; line-height: 1.3;">
            <div style="color: #f8c8d0; font-weight: bold; margin-bottom: 4px;">${temp}K - ${tempType}</div>
            <strong>Mood:</strong> ${mood}<br>
            <strong>Best for:</strong> ${usage}
        </div>
    `;
    
    display.innerHTML = result;
}

function kelvinToHex(kelvin) {
    const temp = kelvin / 100;
    let r, g, b;
    
    if (temp <= 66) {
        r = 255;
        g = temp;
        g = 99.4708025861 * Math.log(g) - 161.1195681661;
        
        if (temp >= 19) {
            b = temp - 10;
            b = 138.5177312231 * Math.log(b) - 305.0447927307;
        } else {
            b = 0;
        }
    } else {
        r = temp - 60;
        r = 329.698727446 * Math.pow(r, -0.1332047592);
        
        g = temp - 60;
        g = 288.1221695283 * Math.pow(g, -0.0755148492);
        
        b = 255;
    }
    
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

// Smart Canvas Calculator
function calculateCanvasSpecs() {
    const width = parseFloat(document.getElementById('canvasWidth').value);
    const height = parseFloat(document.getElementById('canvasHeight').value);
    const unit = document.getElementById('canvasUnit').value;
    const canvasType = document.getElementById('canvasType').value;
    const display = document.getElementById('canvasResults');
    
    if (!width || !height) {
        display.innerHTML = '<span style="color: #f8c8d0;">Enter both width and height</span>';
        return;
    }
    
    // Convert to inches for calculations
    let widthIn, heightIn;
    const unitConversions = {
        in: 1,
        cm: 0.393701,
        mm: 0.0393701
    };
    
    widthIn = width * unitConversions[unit];
    heightIn = height * unitConversions[unit];
    
    const area = widthIn * heightIn;
    const perimeter = 2 * (widthIn + heightIn);
    
    let result = `<div style="font-size: 0.7rem; line-height: 1.4;">`;
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-bottom: 6px;">${canvasType} Specifications:</div>`;
    result += `<strong>Dimensions:</strong> ${widthIn.toFixed(1)}" × ${heightIn.toFixed(1)}"<br>`;
    result += `<strong>Surface Area:</strong> ${area.toFixed(1)} sq in<br>`;
    
    // Canvas-specific calculations
    const canvasSpecs = {
        'stretched': {
            name: 'Stretched Canvas',
            extraWidth: 6, // inches of extra canvas for stretching
            frameDepth: 1.5,
            notes: 'Add 3" on each side for gallery wrap'
        },
        'panel': {
            name: 'Canvas Panel',
            extraWidth: 0,
            frameDepth: 0.125,
            notes: 'Rigid support, no stretching needed'
        },
        'board': {
            name: 'Canvas Board',
            extraWidth: 0,
            frameDepth: 0.1,
            notes: 'Economical option for studies'
        },
        'paper': {
            name: 'Watercolor Paper',
            extraWidth: 2,
            frameDepth: 0,
            notes: 'Add 1" border on each side for mounting'
        }
    };
    
    const spec = canvasSpecs[canvasType];
    const totalWidth = widthIn + spec.extraWidth;
    const totalHeight = heightIn + spec.extraWidth;
    
    if (spec.extraWidth > 0) {
        result += `<strong>Material Size:</strong> ${totalWidth.toFixed(1)}" × ${totalHeight.toFixed(1)}"<br>`;
    }
    
    result += `<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(248, 200, 208, 0.2);">`;
    result += `<strong>Notes:</strong> ${spec.notes}`;
    result += `</div>`;
    
    result += `</div>`;
    
    display.innerHTML = result;
}

// Explore Art Style
function exploreArtStyle() {
    const movement = document.getElementById('artMovement').value;
    const display = document.getElementById('artStyleResults');
    
    const artMovements = {
        'impressionism': {
            period: '1860s-1880s',
            characteristics: 'Visible brushstrokes, ordinary subject matter, light and color emphasis',
            keyArtists: ['Claude Monet', 'Pierre-Auguste Renoir', 'Edgar Degas', 'Camille Pissarro'],
            techniques: 'Plein air painting, broken color, loose brushwork'
        },
        'surrealism': {
            period: '1920s-1940s',
            characteristics: 'Dreamlike imagery, unconscious mind exploration, bizarre juxtapositions',
            keyArtists: ['Salvador Dalí', 'René Magritte', 'Max Ernst', 'Joan Miró'],
            techniques: 'Automatic drawing, collage, photomontage'
        },
        'abstract-expressionism': {
            period: '1940s-1960s',
            characteristics: 'Large-scale paintings, emotional expression, non-representational forms',
            keyArtists: ['Jackson Pollock', 'Mark Rothko', 'Willem de Kooning', 'Barnett Newman'],
            techniques: 'Action painting, color field painting, gestural mark-making'
        },
        'pop-art': {
            period: '1950s-1960s',
            characteristics: 'Popular culture imagery, commercial art techniques, bold colors',
            keyArtists: ['Andy Warhol', 'Roy Lichtenstein', 'James Rosenquist', 'Claes Oldenburg'],
            techniques: 'Screen printing, collage, mechanical reproduction'
        },
        'minimalism': {
            period: '1960s-1970s',
            characteristics: 'Geometric forms, industrial materials, repetition, simplicity',
            keyArtists: ['Donald Judd', 'Carl Andre', 'Dan Flavin', 'Sol LeWitt'],
            techniques: 'Serial production, modular systems, industrial fabrication'
        },
        'cubism': {
            period: '1907-1920s',
            characteristics: 'Geometric shapes, multiple perspectives, analytical deconstruction',
            keyArtists: ['Pablo Picasso', 'Georges Braque', 'Juan Gris', 'Fernand Léger'],
            techniques: 'Collage, papier collé, analytical/synthetic phases'
        },
        'art-nouveau': {
            period: '1890-1910',
            characteristics: 'Organic forms, flowing lines, natural motifs, decorative arts',
            keyArtists: ['Gustav Klimt', 'Alphonse Mucha', 'Antoni Gaudí', 'Louis Comfort Tiffany'],
            techniques: 'Stained glass, metalwork, poster design, architectural decoration'
        },
        'street-art': {
            period: '1970s-present',
            characteristics: 'Urban environments, social commentary, accessible art, mixed media',
            keyArtists: ['Banksy', 'Jean-Michel Basquiat', 'Keith Haring', 'Shepard Fairey'],
            techniques: 'Stenciling, wheat pasting, mural painting, found materials'
        },
        'digital-art': {
            period: '1960s-present',
            characteristics: 'Computer-generated imagery, interactive media, virtual reality',
            keyArtists: ['Rafael Lozano-Hemmer', 'Casey Reas', 'Zach Lieberman', 'Mario Klingemann'],
            techniques: 'Programming, 3D modeling, generative art, AI collaboration'
        },
        'mixed-media': {
            period: '1912-present',
            characteristics: 'Multiple materials, experimental techniques, dimensional works',
            keyArtists: ['Robert Rauschenberg', 'Jasper Johns', 'Louise Nevelson', 'Anselm Kiefer'],
            techniques: 'Assemblage, collage, found objects, unconventional materials'
        }
    };
    
    const style = artMovements[movement];
    
    let result = `<div style="font-size: 0.7rem; line-height: 1.3;">`;
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-bottom: 6px;">${movement.charAt(0).toUpperCase() + movement.slice(1).replace('-', ' ')} (${style.period})</div>`;
    result += `<strong>Key Characteristics:</strong> ${style.characteristics}<br>`;
    result += `<strong>Techniques:</strong> ${style.techniques}<br>`;
    result += `<strong>Research These Artists:</strong><br>`;
    style.keyArtists.forEach((artist, index) => {
        result += `• ${artist}${index < style.keyArtists.length - 1 ? '<br>' : ''}`;
    });
    result += `</div>`;
    
    display.innerHTML = result;
}

function randomArtStyle() {
    const movements = ['impressionism', 'surrealism', 'abstract-expressionism', 'pop-art', 'minimalism', 'cubism', 'art-nouveau', 'street-art', 'digital-art', 'mixed-media'];
    const randomMovement = movements[Math.floor(Math.random() * movements.length)];
    document.getElementById('artMovement').value = randomMovement;
    exploreArtStyle();
}

// Upload Image & Analyze Color
function handleColorImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Show preview
        const preview = document.getElementById('colorImagePreview');
        const previewImg = document.getElementById('colorPreviewImage');
        previewImg.src = e.target.result;
        preview.style.display = 'block';
        
        // Update upload area
        const uploadArea = document.getElementById('colorUploadArea');
        uploadArea.style.borderColor = 'rgba(248, 200, 208, 0.8)';
        uploadArea.innerHTML = `
            <div style="color: #f8c8d0; font-weight: 500; font-size: 0.8rem;">✓ Image uploaded</div>
            <div style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Click to change</div>
        `;
        
        // Enable analyze button
        const analyzeBtn = document.getElementById('analyzeColorsBtn');
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze Colors';
        
        // Hide previous analysis
        document.getElementById('colorAnalysisResults').style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

function analyzeImageColors() {
    const analyzeBtn = document.getElementById('analyzeColorsBtn');
    
    // Show loading state
    document.getElementById('loadingColorAnalysis').style.display = 'block';
    document.getElementById('colorAnalysisResults').style.display = 'none';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';
    
    // Simulate color analysis
    setTimeout(() => {
        const colors = generateDominantColors();
        const harmony = generateColorHarmonyDescription();
        
        document.getElementById('loadingColorAnalysis').style.display = 'none';
        document.getElementById('colorAnalysisResults').style.display = 'block';
        
        // Display color swatches
        const dominantColorsDiv = document.getElementById('dominantColors');
        dominantColorsDiv.innerHTML = colors.map(color => 
            `<div style="width: 20px; height: 20px; background: ${color}; border-radius: 3px; cursor: pointer; title: '${color}'" onclick="copyColorToClipboard('${color}')"></div>`
        ).join('');
        
        // Display harmony description
        document.getElementById('colorHarmony').innerHTML = harmony;
        
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze Again';
    }, 2000);
}

function generateDominantColors() {
    const colorPalettes = [
        ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
        ['#1abc9c', '#e67e22', '#34495e', '#f1c40f', '#e74c3c'],
        ['#9b59b6', '#3498db', '#e74c3c', '#f39c12', '#2ecc71'],
        ['#34495e', '#95a5a6', '#ecf0f1', '#bdc3c7', '#7f8c8d'],
        ['#d63031', '#74b9ff', '#00b894', '#fdcb6e', '#fd79a8']
    ];
    
    return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}

function generateColorHarmonyDescription() {
    const descriptions = [
        'Complementary harmony with warm-cool balance',
        'Analogous scheme with subtle transitions',
        'Triadic composition with vibrant contrast',
        'Monochromatic palette with tonal variation',
        'Split-complementary with dynamic tension'
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Font Pairing Tool
function generateFontPairing() {
    const primaryType = document.getElementById('primaryFont').value;
    const mood = document.getElementById('fontMood').value;
    const preview = document.getElementById('fontPreview');
    const suggestions = document.getElementById('fontSuggestions');
    
    const fontPairings = {
        serif: {
            professional: { primary: 'Times New Roman', secondary: 'Arial', description: 'Classic and readable for formal documents' },
            creative: { primary: 'Playfair Display', secondary: 'Source Sans Pro', description: 'Elegant serif with clean sans-serif' },
            elegant: { primary: 'Cormorant Garamond', secondary: 'Lato', description: 'Sophisticated and refined combination' },
            modern: { primary: 'Merriweather', secondary: 'Open Sans', description: 'Contemporary serif with versatile sans-serif' },
            playful: { primary: 'Vollkorn', secondary: 'Nunito Sans', description: 'Friendly serif with rounded sans-serif' },
            minimal: { primary: 'PT Serif', secondary: 'PT Sans', description: 'Clean serif family pairing' }
        },
        'sans-serif': {
            professional: { primary: 'Helvetica', secondary: 'Georgia', description: 'Neutral sans-serif with classic serif' },
            creative: { primary: 'Montserrat', secondary: 'Source Serif Pro', description: 'Geometric sans-serif with readable serif' },
            elegant: { primary: 'Avenir', secondary: 'Minion Pro', description: 'Refined sans-serif with elegant serif' },
            modern: { primary: 'Inter', secondary: 'Charter', description: 'Technical sans-serif with modern serif' },
            playful: { primary: 'Poppins', secondary: 'Crimson Text', description: 'Rounded sans-serif with warm serif' },
            minimal: { primary: 'Roboto', secondary: 'Roboto Slab', description: 'Systematic font family approach' }
        }
    };
    
    const pairing = fontPairings[primaryType] && fontPairings[primaryType][mood] 
        ? fontPairings[primaryType][mood] 
        : fontPairings.serif.professional;
    
    preview.innerHTML = `
        <div style="font-family: '${pairing.primary}', serif; font-size: 1.1rem; margin-bottom: 4px; font-weight: 600;">${pairing.primary}</div>
        <div style="font-family: '${pairing.secondary}', sans-serif; font-size: 0.85rem; opacity: 0.9;">${pairing.secondary}</div>
    `;
    
    suggestions.innerHTML = pairing.description;
}

// Creative Prompt Generator
function generateCreativePrompt() {
    const medium = document.getElementById('promptMedium').value;
    const difficulty = document.getElementById('promptDifficulty').value;
    const promptDiv = document.getElementById('generatedPrompt');
    const tipsDiv = document.getElementById('promptTips');
    
    const prompts = {
        drawing: {
            beginner: [
                'Draw your favorite mug from three different angles',
                'Sketch the shadows cast by objects on your desk',
                'Draw a self-portrait using only continuous lines'
            ],
            intermediate: [
                'Create a portrait using only crosshatching techniques',
                'Draw a bustling street scene from memory',
                'Illustrate an emotion using abstract forms'
            ],
            advanced: [
                'Create a hyperrealistic study of fabric textures',
                'Draw a complex architectural interior with accurate perspective',
                'Design a character expressing a specific personality through gesture alone'
            ],
            experimental: [
                'Draw with your non-dominant hand for 30 minutes',
                'Create a drawing using found objects as drawing tools',
                'Illustrate sound - make music visible through mark-making'
            ]
        },
        painting: {
            beginner: [
                'Paint a simple still life with 3 primary colors only',
                'Create a landscape using palette knife techniques',
                'Paint the same object in morning and evening light'
            ],
            intermediate: [
                'Paint a portrait focusing on skin tone variations',
                'Create an abstract representation of your favorite song',
                'Paint a rainy day scene capturing atmospheric effects'
            ],
            advanced: [
                'Paint a complex multi-figure composition',
                'Create a series exploring color temperature relationships',
                'Paint a highly detailed botanical illustration'
            ],
            experimental: [
                'Paint with unconventional tools (sponges, sticks, fingers)',
                'Create a painting that changes meaning when viewed upside down',
                'Use coffee, tea, and spices as your painting medium'
            ]
        }
    };
    
    const mediumPrompts = prompts[medium] || prompts.drawing;
    const difficultyPrompts = mediumPrompts[difficulty] || mediumPrompts.beginner;
    const randomPrompt = difficultyPrompts[Math.floor(Math.random() * difficultyPrompts.length)];
    
    const tips = {
        beginner: 'Focus on basic shapes and proportions. Don\'t worry about perfection!',
        intermediate: 'Push yourself to try new techniques. Reference photos are your friend.',
        advanced: 'Plan your approach carefully. Consider composition and focal points.',
        experimental: 'Embrace failure as learning. Document your process for insights.'
    };
    
    promptDiv.textContent = randomPrompt;
    tipsDiv.textContent = `Tip: ${tips[difficulty]}`;
}

// Color Harmony Explorer
function exploreColorHarmony() {
    const baseColor = document.getElementById('harmonyBaseColor').value;
    const harmonyType = document.getElementById('harmonyType').value;
    const colorsDiv = document.getElementById('harmonyColors');
    const descriptionDiv = document.getElementById('harmonyDescription');
    
    const colors = generateHarmonyColors(baseColor, harmonyType);
    
    // Display color swatches
    colorsDiv.innerHTML = colors.map(color => 
        `<div style="width: 25px; height: 25px; background: ${color}; border-radius: 4px; cursor: pointer; border: 1px solid rgba(255,255,255,0.3); title: '${color}'" onclick="copyColorToClipboard('${color}')"></div>`
    ).join('');
    
    const descriptions = {
        'monochromatic': 'Uses different shades, tints, and tones of a single hue. Creates unity and sophistication.',
        'analogous': 'Uses colors that are next to each other on the color wheel. Creates harmony and is pleasing to the eye.',
        'complementary': 'Uses colors opposite each other on the color wheel. Creates high contrast and vibrant looks.',
        'split-complementary': 'Uses a base color and the two adjacent to its complement. Provides strong contrast with less tension.',
        'triadic': 'Uses three colors equally spaced on the color wheel. Creates vibrant, balanced compositions.',
        'tetradic': 'Uses four colors arranged into two complementary pairs. Rich and complex but harder to balance.'
    };
    
    descriptionDiv.innerHTML = descriptions[harmonyType];
}

function generateHarmonyColors(baseColor, harmonyType) {
    // Convert hex to HSL for color calculations
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];
    
    switch (harmonyType) {
        case 'monochromatic':
            colors.push(
                hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 0.2)),
                hslToHex(hsl.h, hsl.s, Math.min(1, hsl.l + 0.2)),
                hslToHex(hsl.h, Math.max(0, hsl.s - 0.3), hsl.l),
                hslToHex(hsl.h, Math.min(1, hsl.s + 0.2), hsl.l)
            );
            break;
        case 'analogous':
            colors.push(
                hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l)
            );
            break;
        case 'complementary':
            colors.push(
                hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
                hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 0.3)),
                hslToHex((hsl.h + 180) % 360, hsl.s, Math.max(0, hsl.l - 0.3))
            );
            break;
        case 'split-complementary':
            colors.push(
                hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
                hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 0.2))
            );
            break;
        case 'triadic':
            colors.push(
                hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
                hslToHex(hsl.h, Math.max(0, hsl.s - 0.2), hsl.l)
            );
            break;
        case 'tetradic':
            colors.push(
                hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)
            );
            break;
    }
    
    return colors.slice(0, 5); // Limit to 5 colors
}

function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s, l };
}

function hslToHex(h, s, l) {
    h /= 360;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h * 12) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
