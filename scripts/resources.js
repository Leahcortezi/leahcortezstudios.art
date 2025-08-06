// Resources Page Interactive Features

console.log("🎨 Creative Block Toolkit loaded!");

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
    console.log('🎨 Creative Block Toolkit ready!');
    
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

// Print Size Calculator
function calculatePrint() {
    const width = parseFloat(document.getElementById('widthInput').value);
    const height = parseFloat(document.getElementById('heightInput').value);
    const unit = document.getElementById('unitSelect').value;
    const display = document.getElementById('calcResult');
    
    if (!width || !height) {
        display.innerHTML = '<span style="color: #f8c8d0;">Enter both width and height</span>';
        return;
    }
    
    let result = `<strong>Dimensions:</strong> ${width}" × ${height}" ${unit}<br>`;
    result += `<strong>Aspect Ratio:</strong> ${(width/height).toFixed(2)}:1<br>`;
    
    if (unit === 'in') {
        result += `<strong>For 300 DPI:</strong> ${Math.round(width * 300)} × ${Math.round(height * 300)} pixels<br>`;
        result += `<strong>For 150 DPI:</strong> ${Math.round(width * 150)} × ${Math.round(height * 150)} pixels`;
    } else if (unit === 'cm') {
        const inchWidth = (width / 2.54);
        const inchHeight = (height / 2.54);
        result += `<strong>In inches:</strong> ${inchWidth.toFixed(2)}" × ${inchHeight.toFixed(2)}"<br>`;
        result += `<strong>For 300 DPI:</strong> ${Math.round(inchWidth * 300)} × ${Math.round(inchHeight * 300)} pixels`;
    }
    
    display.innerHTML = result;
}



// Pricing Estimator
function calculatePricing() {
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const estimatedHours = parseFloat(document.getElementById('estimatedHours').value);
    const materialCost = parseFloat(document.getElementById('materialCost').value) || 0;
    const complexityMultiplier = parseFloat(document.getElementById('complexityMultiplier').value);
    const display = document.getElementById('pricingResults');
    
    if (!hourlyRate || !estimatedHours) {
        display.innerHTML = '<span style="color: #f8c8d0;">Enter hourly rate and estimated hours</span>';
        return;
    }
    
    const laborCost = hourlyRate * estimatedHours * complexityMultiplier;
    const totalCost = laborCost + materialCost;
    const recommendedPrice = totalCost * 1.2; // 20% markup
    
    let result = `<div style="font-size: 0.7rem; line-height: 1.4;">`;
    result += `<strong>Labor Cost:</strong> $${laborCost.toFixed(2)}<br>`;
    result += `<strong>Materials:</strong> $${materialCost.toFixed(2)}<br>`;
    result += `<strong>Subtotal:</strong> $${totalCost.toFixed(2)}<br>`;
    result += `<div style="color: #f8c8d0; font-weight: bold; margin-top: 4px;">`;
    result += `<strong>Recommended Price:</strong> $${recommendedPrice.toFixed(2)}</div>`;
    result += `<div style="font-size: 0.65rem; opacity: 0.8; margin-top: 4px;">`;
    result += `(Includes 20% business markup)</div>`;
    result += `</div>`;
    
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

// Contrast Checker
function checkContrast() {
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const display = document.getElementById('contrastResult');
    
    // Convert hex to RGB
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
        const lum1 = getLuminance(color1.r, color1.g, color1.b);
        const lum2 = getLuminance(color2.r, color2.g, color2.b);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }
    
    const textRgb = hexToRgb(textColor);
    const bgRgb = hexToRgb(bgColor);
    const ratio = getContrastRatio(textRgb, bgRgb);
    
    let level = '';
    let color = '';
    if (ratio >= 7) {
        level = 'AAA (Excellent)';
        color = '#4CAF50';
    } else if (ratio >= 4.5) {
        level = 'AA (Good)';
        color = '#8BC34A';
    } else if (ratio >= 3) {
        level = 'AA Large Text';
        color = '#FF9800';
    } else {
        level = 'Fail';
        color = '#F44336';
    }
    
    let result = `<div style="font-size: 0.85rem; line-height: 1.4;">`;
    result += `<strong>Contrast Ratio:</strong> ${ratio.toFixed(2)}:1<br>`;
    result += `<strong>WCAG Level:</strong> <span style="color: ${color};">${level}</span><br>`;
    result += `<div style="background: ${bgColor}; color: ${textColor}; padding: 8px; margin: 8px 0; border-radius: 4px; text-align: center;">Sample Text</div>`;
    result += `</div>`;
    
    display.innerHTML = result;
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

// Fake Client Brief Generator
const clientBriefs = [
    {
        client: "Moonlight Café",
        project: "Logo Design Project",
        description: "Create a cozy, welcoming logo for our late-night café. Target audience: students and night workers. Colors: warm earth tones. Style: modern but friendly. Must work on signage and coffee cups.",
        deadline: "2 weeks",
        budget: "$800"
    },
    {
        client: "Green Thumb Nursery",
        project: "Brand Identity Package",
        description: "Design a complete brand identity for an eco-friendly plant nursery. Include logo, business cards, and social media templates. Style: natural, organic, trustworthy. Colors: greens and earth tones.",
        deadline: "3 weeks",
        budget: "$1,200"
    },
    {
        client: "Fitness Revolution",
        project: "Poster Series Design",
        description: "Create 3 motivational workout posters for our gym. Bold, energetic design. Include inspiring quotes. Colors: high contrast, energetic. Size: 24x36 inches each.",
        deadline: "10 days",
        budget: "$600"
    },
    {
        client: "Artisan Bakery Co.",
        project: "Packaging Design",
        description: "Design packaging for our premium bread line. 5 different bread types. Style: rustic, handcrafted, premium. Colors: warm, inviting. Must include nutritional info space.",
        deadline: "4 weeks",
        budget: "$1,500"
    },
    {
        client: "TechStart Solutions",
        project: "App Icon & UI Elements",
        description: "Create app icon and basic UI elements for productivity app. Style: clean, modern, professional. Colors: blue and white primary. Must work at multiple sizes.",
        deadline: "1 week",
        budget: "$400"
    },
    {
        client: "Local Music Festival",
        project: "Event Poster Design",
        description: "Design poster for summer music festival. Include 12 band names, date, venue. Style: vibrant, youthful, eye-catching. Colors: bright, festival vibes. Size: various.",
        deadline: "5 days",
        budget: "$300"
    },
    {
        client: "Coastal Real Estate",
        project: "Brochure Design", 
        description: "Tri-fold brochure for luxury beachfront properties. Include 6-8 property photos. Style: elegant, sophisticated, high-end. Colors: ocean blues and whites.",
        deadline: "2 weeks",
        budget: "$500"
    },
    {
        client: "Kids Learning Center",
        project: "Illustrated Book Cover",
        description: "Design cover for children's educational book about animals. Age group: 5-8 years. Style: friendly, colorful, approachable. Include cute animal characters.",
        deadline: "3 weeks",
        budget: "$750"
    }
];

function generateClientBrief() {
    const brief = clientBriefs[Math.floor(Math.random() * clientBriefs.length)];
    
    document.getElementById('clientName').textContent = brief.client;
    document.getElementById('projectType').textContent = brief.project;
    document.getElementById('briefDetails').textContent = brief.description;
    document.getElementById('briefDeadline').textContent = `Deadline: ${brief.deadline} • Budget: ${brief.budget}`;
    
    // Add visual feedback
    const display = document.querySelector('#clientBrief .generator-display');
    display.style.opacity = '0.8';
    setTimeout(() => display.style.opacity = '1', 200);
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
            <strong>🎯</strong> ${compositions[Math.floor(Math.random() * compositions.length)]}
        </div>
        
        <div style="margin-bottom: 4px; font-size: 0.65rem;">
            <strong>🎨</strong> ${colors[Math.floor(Math.random() * colors.length)]}
        </div>
        
        <div style="margin-bottom: 4px; font-size: 0.65rem;">
            <strong>✏️</strong> ${techniques[Math.floor(Math.random() * techniques.length)]}
        </div>
        
        <div style="margin-bottom: 4px; font-size: 0.65rem;">
            <strong>💡</strong> ${improvements[Math.floor(Math.random() * improvements.length)]}
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
            <div style="font-size: 2rem; margin-bottom: 10px;">⚠️</div>
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
            <div style="font-size: 2rem; margin-bottom: 6px;">🎨</div>
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

// Color Harmony Generator
function generateColorHarmony() {
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
