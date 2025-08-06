/**
 * Artist Resources & Creative Tools JavaScript
 * Clean version with only essential functions
 */

// Function availability checks
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎨 Artist Resources loaded");
});

// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');
    
    if (modal && overlay) {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close button functionality
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }
        
        // Click outside to close
        overlay.onclick = closeModal;
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.resource-modal');
    const overlay = document.querySelector('.modal-overlay');
    
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    document.body.style.overflow = '';
}

// Drying Time Calculator
function calculateDryingTime() {
    const medium = document.getElementById('dryingMedium').value;
    const thickness = document.getElementById('paintThickness').value;
    const temperature = parseInt(document.getElementById('temperature').value);
    const humidity = parseInt(document.getElementById('humidity').value);
    const airflow = document.getElementById('airflow').value;
    const surface = document.getElementById('surface').value;
    
    const dryingTimes = calculateDryingEstimate(medium, thickness, temperature, humidity, airflow, surface);
    
    document.getElementById('dryingResults').style.display = 'block';
    document.getElementById('dryingContent').innerHTML = `
        <div style="margin-bottom: 8px;"><strong>Touch Dry:</strong> ${dryingTimes.touchDry}</div>
        <div style="margin-bottom: 8px;"><strong>Recoat Time:</strong> ${dryingTimes.recoat}</div>
        <div style="margin-bottom: 8px;"><strong>Fully Cured:</strong> ${dryingTimes.fullyCured}</div>
        <div style="font-size: 0.65rem; opacity: 0.8; margin-top: 6px;">${dryingTimes.notes}</div>
    `;
}

function calculateDryingEstimate(medium, thickness, temperature, humidity, airflow, surface) {
    const baseTimes = {
        'oil': { touch: 24, recoat: 168, cure: 8760 }, // hours
        'acrylic': { touch: 0.5, recoat: 2, cure: 720 },
        'watercolor': { touch: 0.25, recoat: 1, cure: 24 },
        'gouache': { touch: 0.5, recoat: 2, cure: 48 },
        'tempera': { touch: 0.5, recoat: 2, cure: 168 },
        'encaustic': { touch: 0.1, recoat: 0.5, cure: 24 }
    };
    
    const base = baseTimes[medium] || baseTimes['acrylic'];
    
    // Thickness multiplier
    const thicknessMultiplier = {
        'thin': 1,
        'medium': 1.5,
        'thick': 3,
        'heavy': 5
    };
    
    // Temperature factor (70°F = 1.0)
    const tempFactor = temperature < 60 ? 2 : temperature > 80 ? 0.7 : 1;
    
    // Humidity factor (45% = 1.0)
    const humidityFactor = humidity > 70 ? 1.5 : humidity < 30 ? 0.8 : 1;
    
    // Airflow factor
    const airflowFactor = {
        'still': 1.2,
        'gentle': 1,
        'fan': 0.7
    };
    
    // Surface factor
    const surfaceFactor = {
        'canvas': 1,
        'paper': 0.9,
        'wood': 1.1,
        'metal': 1.3,
        'plastic': 1.2
    };
    
    const multiplier = thicknessMultiplier[thickness] * tempFactor * humidityFactor * airflowFactor[airflow] * surfaceFactor[surface];
    
    const touchDry = base.touch * multiplier;
    const recoat = base.recoat * multiplier;
    const fullyCured = base.cure * multiplier;
    
    return {
        touchDry: formatTime(touchDry),
        recoat: formatTime(recoat),
        fullyCured: formatTime(fullyCured),
        notes: getEnvironmentNotes(temperature, humidity, airflow)
    };
}

function formatTime(hours) {
    if (hours < 1) {
        return `${Math.round(hours * 60)} minutes`;
    } else if (hours < 24) {
        return `${Math.round(hours)} hours`;
    } else if (hours < 168) {
        return `${Math.round(hours / 24)} days`;
    } else {
        return `${Math.round(hours / 168)} weeks`;
    }
}

function getEnvironmentNotes(temp, humidity, airflow) {
    let notes = [];
    
    if (temp < 60) notes.push("Cold temperatures slow drying significantly");
    if (temp > 85) notes.push("High heat may cause cracking or uneven drying");
    if (humidity > 70) notes.push("High humidity extends drying time");
    if (humidity < 30) notes.push("Low humidity may cause rapid surface drying");
    if (airflow === 'fan') notes.push("Good ventilation speeds drying");
    
    return notes.length > 0 ? notes.join('. ') + '.' : 'Ideal drying conditions.';
}

// 3D Unit Converter
function calculate3DConversion() {
    const length = parseFloat(document.getElementById('3dLength').value);
    const width = parseFloat(document.getElementById('3dWidth').value);
    const height = parseFloat(document.getElementById('3dHeight').value);
    const fromUnit = document.getElementById('3dFromUnit').value;
    const materialType = document.getElementById('materialType').value;
    
    if (!length || !width || !height) {
        document.getElementById('3dResults').textContent = 'Please enter all dimensions';
        return;
    }
    
    const volume = length * width * height;
    const conversions = calculateUnitConversions(volume, fromUnit);
    const materialInfo = getMaterialInfo(volume, fromUnit, materialType);
    
    document.getElementById('3dResults').innerHTML = `
        <div style="margin-bottom: 8px;"><strong>Volume:</strong> ${volume.toFixed(2)} ${fromUnit}³</div>
        <div style="margin-bottom: 8px;"><strong>Conversions:</strong></div>
        <div style="font-size: 0.65rem; margin-left: 10px; margin-bottom: 6px;">
            ${conversions.join('<br>')}
        </div>
        ${materialInfo ? `<div style="margin-top: 8px;"><strong>Material Estimate:</strong><br><span style="font-size: 0.65rem;">${materialInfo}</span></div>` : ''}
    `;
}

function calculateUnitConversions(volume, fromUnit) {
    const conversions = [];
    
    if (fromUnit === 'in') {
        conversions.push(`${(volume * 16.387).toFixed(2)} cm³`);
        conversions.push(`${(volume / 61024).toFixed(4)} ft³`);
    } else if (fromUnit === 'cm') {
        conversions.push(`${(volume / 16.387).toFixed(2)} in³`);
        conversions.push(`${(volume / 1000000).toFixed(6)} m³`);
    } else if (fromUnit === 'ft') {
        conversions.push(`${(volume * 61024).toFixed(0)} in³`);
        conversions.push(`${(volume * 28316.8).toFixed(0)} cm³`);
    }
    
    return conversions;
}

function getMaterialInfo(volume, unit, material) {
    if (material === 'none') return null;
    
    const materialData = {
        'pla': { density: 1.24, price: 25, unit: 'kg' },
        'abs': { density: 1.05, price: 30, unit: 'kg' },
        'resin': { density: 1.1, price: 50, unit: 'L' },
        'clay': { density: 1.8, price: 15, unit: 'kg' }
    };
    
    const mat = materialData[material];
    if (!mat) return null;
    
    // Convert volume to cm³ for calculations
    let volumeCm3 = volume;
    if (unit === 'in') volumeCm3 *= 16.387;
    if (unit === 'ft') volumeCm3 *= 28316.8;
    if (unit === 'mm') volumeCm3 /= 1000;
    
    const weight = (volumeCm3 / 1000) * mat.density; // kg
    const cost = weight * mat.price;
    
    return `Approx. ${weight.toFixed(2)} ${mat.unit}, Est. cost: $${cost.toFixed(2)}`;
}

// Commission Compatibility Matcher
function analyzeCommissionCompatibility() {
    const budget = parseFloat(document.getElementById('projectBudget').value);
    const timeline = parseInt(document.getElementById('projectTimeline').value);
    const projectType = document.getElementById('projectType').value;
    const clientType = document.getElementById('clientType').value;
    const description = document.getElementById('projectDescription').value;
    
    const analysis = analyzeCommission(budget, timeline, projectType, clientType, description);
    
    document.getElementById('compatibilityResults').innerHTML = `
        <div style="color: ${analysis.score > 7 ? '#4CAF50' : analysis.score > 4 ? '#ff9800' : '#f44336'}; font-weight: 600; margin-bottom: 4px;">
            Compatibility Score: ${analysis.score}/10
        </div>
        <div style="font-size: 0.6rem; line-height: 1.1;">
            ${analysis.feedback.join('<br><br>')}
        </div>
    `;
}

function analyzeCommission(budget, timeline, projectType, clientType, description) {
    let score = 5; // Base score
    let feedback = [];
    
    // Budget analysis
    const typicalRates = {
        'portrait': { min: 200, max: 2000, timePerDay: 2 },
        'illustration': { min: 150, max: 1500, timePerDay: 1.5 },
        'logo': { min: 300, max: 3000, timePerDay: 3 },
        'mural': { min: 500, max: 10000, timePerDay: 0.5 },
        'digital': { min: 100, max: 1000, timePerDay: 2 },
        'traditional': { min: 200, max: 3000, timePerDay: 1 }
    };
    
    const typical = typicalRates[projectType];
    const suggestedRate = timeline * typical.timePerDay * 150; // $150/hour
    
    if (budget >= typical.min && budget <= typical.max) {
        score += 2;
        feedback.push(`✅ Budget ${budget} is within typical range ($${typical.min}-$${typical.max})`);
    } else if (budget < typical.min) {
        score -= 2;
        feedback.push(`⚠️ Budget ${budget} is below typical range. Consider $${typical.min}+ for quality work`);
    } else {
        score += 1;
        feedback.push(`💰 Budget ${budget} is above typical range - great opportunity!`);
    }
    
    // Timeline analysis
    const minDays = projectType === 'logo' ? 7 : projectType === 'portrait' ? 14 : 10;
    if (timeline >= minDays) {
        score += 2;
        feedback.push(`✅ Timeline of ${timeline} days allows for quality work`);
    } else {
        score -= 2;
        feedback.push(`⚠️ Timeline ${timeline} days may be too rushed for quality ${projectType}`);
    }
    
    // Client type analysis
    const clientRisk = {
        'individual': { risk: 2, note: 'Personal projects, ensure clear communication' },
        'small-business': { risk: 1, note: 'Usually professional, good repeat potential' },
        'corporate': { risk: 0, note: 'Professional process, reliable payment' },
        'nonprofit': { risk: 1, note: 'Meaningful work, may offer portfolio value' }
    };
    
    score += (3 - clientRisk[clientType].risk);
    feedback.push(`📋 ${clientRisk[clientType].note}`);
    
    // Description analysis
    const redFlags = ['cheap', 'quick', 'simple', 'just need', 'expose', 'portfolio piece'];
    const greenFlags = ['professional', 'quality', 'deadline', 'reference', 'brief'];
    
    const descLower = description.toLowerCase();
    const redCount = redFlags.filter(flag => descLower.includes(flag)).length;
    const greenCount = greenFlags.filter(flag => descLower.includes(flag)).length;
    
    if (redCount > greenCount) {
        score -= 1;
        feedback.push(`🚩 Description contains potential red flags - clarify expectations`);
    } else if (greenCount > 0) {
        score += 1;
        feedback.push(`✅ Professional language in description is encouraging`);
    }
    
    return {
        score: Math.max(0, Math.min(10, score)),
        feedback: feedback
    };
}

// Color Theory Modal Functions
function setSignatureColor(color) {
    document.getElementById('signatureColor').value = color;
    updateSignatureColor();
}

function updateSignatureColor() {
    const color = document.getElementById('signatureColor').value;
    const info = document.getElementById('signatureColorInfo');
    info.innerHTML = `
        <span class="hex-value">${color}</span>
        <span class="color-name">${getColorName(color)}</span>
    `;
}

function getColorName(hex) {
    const colorNames = {
        '#e74c3c': 'Alizarin',
        '#3498db': 'Blue',
        '#2ecc71': 'Emerald',
        '#f39c12': 'Orange',
        '#9b59b6': 'Purple',
        '#1abc9c': 'Turquoise',
        '#e67e22': 'Carrot',
        '#34495e': 'Wet Asphalt'
    };
    return colorNames[hex] || 'Custom Color';
}

function selectColorTheory(theory) {
    document.querySelectorAll('.theory-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-theory="${theory}"]`).classList.add('active');
}

function selectMood(mood) {
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
}

function updatePaletteSize() {
    const size = document.getElementById('paletteSize').value;
    document.getElementById('sizeValue').textContent = `${size} colors`;
}

function generateBasePalette() {
    // Placeholder for palette generation
    alert('Palette generation coming soon!');
}

function randomizeTintsShades() {
    // Placeholder for randomization
    alert('Randomization coming soon!');
}

function lockAllColors() {
    // Placeholder for locking
    alert('Lock functionality coming soon!');
}

function unlockAllColors() {
    // Placeholder for unlocking
    alert('Unlock functionality coming soon!');
}

function setWCAGLevel(level) {
    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function exportPalette(format) {
    alert(`Export to ${format} coming soon!`);
}

// Reference Image Analyzer (Replaced with Art Supply Calculator)
function selectProjectType(type) {
    document.querySelectorAll('.project-type-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'rgba(248, 200, 208, 0.1)';
        btn.style.borderColor = 'rgba(248, 200, 208, 0.2)';
    });
    
    const selectedBtn = document.querySelector(`[data-type="${type}"]`);
    selectedBtn.classList.add('active');
    selectedBtn.style.background = 'rgba(248, 200, 208, 0.2)';
    selectedBtn.style.borderColor = 'rgba(248, 200, 208, 0.3)';
    
    // Show/hide relevant sections based on project type
    const paintSection = document.getElementById('paintSection');
    const canvasSection = document.getElementById('canvasSection');
    
    if (type === 'painting') {
        paintSection.style.display = 'block';
        canvasSection.style.display = 'block';
    } else if (type === 'drawing') {
        paintSection.style.display = 'none';
        canvasSection.style.display = 'block';
    } else {
        paintSection.style.display = 'none';
        canvasSection.style.display = 'block';
    }
}

function calculateSupplies() {
    const width = parseFloat(document.getElementById('projectWidth').value);
    const height = parseFloat(document.getElementById('projectHeight').value);
    const pieces = parseInt(document.getElementById('numberOfPieces').value) || 1;
    const paintType = document.getElementById('paintType').value;
    const coverage = document.getElementById('coverageStyle').value;
    
    if (!width || !height) {
        alert('Please enter project dimensions');
        return;
    }
    
    const totalArea = width * height * pieces; // square inches
    const calculations = calculateArtSupplies(totalArea, paintType, coverage, pieces);
    
    document.getElementById('supplyResults').style.display = 'block';
    document.getElementById('supplyBreakdown').innerHTML = calculations.breakdown;
    document.getElementById('savingTips').innerHTML = calculations.tips;
}

function calculateArtSupplies(totalArea, paintType, coverage, pieces) {
    // Canvas/Surface calculations
    const canvasArea = totalArea;
    const canvasCost = calculateCanvasCost(canvasArea);
    
    // Paint calculations
    const paintNeeded = calculatePaintAmount(totalArea, paintType, coverage);
    
    // Brush recommendations
    const brushes = getBrushRecommendations(totalArea, paintType);
    
    // Other supplies
    const otherSupplies = getOtherSupplies(paintType);
    
    const breakdown = `
        <div style="margin-bottom: 15px;">
            <strong>🎨 Canvas/Surface:</strong><br>
            • ${canvasArea.toFixed(1)} square inches total<br>
            • ${pieces} piece${pieces > 1 ? 's' : ''} needed<br>
            • Estimated cost: $${canvasCost.toFixed(2)}
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong>🌈 Paint Needed:</strong><br>
            ${paintNeeded.details.map(detail => `• ${detail}`).join('<br>')}
            <br>• Total estimated cost: $${paintNeeded.cost.toFixed(2)}
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong>🖌️ Recommended Brushes:</strong><br>
            ${brushes.map(brush => `• ${brush}`).join('<br>')}
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong>📦 Other Supplies:</strong><br>
            ${otherSupplies.map(supply => `• ${supply}`).join('<br>')}
        </div>
        
        <div style="background: rgba(248, 200, 208, 0.1); padding: 10px; border-radius: 4px; margin-top: 15px;">
            <strong>💰 Total Estimated Cost: $${(canvasCost + paintNeeded.cost).toFixed(2)}</strong><br>
            <span style="font-size: 0.8rem; opacity: 0.9;">*Not including brushes and other supplies</span>
        </div>
    `;
    
    const tips = getSavingTips(paintType, totalArea);
    
    return { breakdown, tips };
}

function calculateCanvasCost(area) {
    // Rough estimates based on common canvas prices
    const costPerSqInch = 0.15; // $0.15 per square inch for decent quality
    return area * costPerSqInch;
}

function calculatePaintAmount(area, paintType, coverage) {
    const coverageRates = {
        'acrylic': {
            'light': 400,   // sq inches per fl oz
            'medium': 300,
            'heavy': 200
        },
        'oil': {
            'light': 350,
            'medium': 250,
            'heavy': 150
        },
        'watercolor': {
            'light': 600,
            'medium': 400,
            'heavy': 300
        },
        'gouache': {
            'light': 500,
            'medium': 350,
            'heavy': 250
        },
        'tempera': {
            'light': 450,
            'medium': 300,
            'heavy': 200
        }
    };
    
    const rate = coverageRates[paintType][coverage];
    const flOzNeeded = area / rate;
    
    const paintPrices = {
        'acrylic': 3.50,    // per fl oz
        'oil': 8.00,
        'watercolor': 5.00,
        'gouache': 4.50,
        'tempera': 2.00
    };
    
    const cost = flOzNeeded * paintPrices[paintType];
    
    const details = [
        `${flOzNeeded.toFixed(1)} fl oz of ${paintType} paint needed`,
        `Based on ${coverage} coverage style`,
        `Covers approximately ${rate} sq inches per fl oz`
    ];
    
    return { details, cost };
}

function getBrushRecommendations(area, paintType) {
    const brushes = [];
    
    if (area < 100) {
        brushes.push('Small detail brushes (#2, #4, #6)');
        brushes.push('1/4" or 1/2" flat brush for small areas');
    } else if (area < 400) {
        brushes.push('Medium brushes (#6, #8, #10)');
        brushes.push('1/2" and 3/4" flat brushes');
        brushes.push('Small detail brush for fine work');
    } else {
        brushes.push('Large brushes (#10, #12, #14)');
        brushes.push('1" and 2" flat brushes for coverage');
        brushes.push('Medium round brush for details');
    }
    
    if (paintType === 'watercolor') {
        brushes.push('Natural hair brushes work best for watercolor');
    } else if (paintType === 'acrylic') {
        brushes.push('Synthetic brushes are perfect for acrylic');
    }
    
    return brushes;
}

function getOtherSupplies(paintType) {
    const common = [
        'Palette or disposable palette paper',
        'Water container (2 jars for clean/dirty water)',
        'Paper towels or cloth rags',
        'Pencil for initial sketching'
    ];
    
    if (paintType === 'acrylic') {
        return [...common, 'Acrylic medium (optional)', 'Spray bottle to keep paint moist'];
    } else if (paintType === 'oil') {
        return [...common, 'Turpentine or odorless mineral spirits', 'Linseed oil or painting medium'];
    } else if (paintType === 'watercolor') {
        return [...common, 'Natural sponge', 'Masking tape for clean edges'];
    }
    
    return common;
}

function getSavingTips(paintType, area) {
    const tips = [
        '🛒 <strong>Buy in bulk:</strong> Larger tubes/bottles cost less per ounce',
        '🎨 <strong>Start with primary colors:</strong> Red, blue, yellow, plus white and black can mix most colors',
        '🖌️ <strong>Take care of brushes:</strong> Clean them properly to make them last longer',
        '📦 <strong>Student vs. Artist grade:</strong> Student grade is fine for practice and learning'
    ];
    
    if (paintType === 'acrylic') {
        tips.push('💧 <strong>Keep acrylic moist:</strong> Use a spray bottle and airtight palette to prevent waste');
    } else if (paintType === 'oil') {
        tips.push('⏰ <strong>Oil paints stay workable:</strong> You can work on the same painting over several days');
    } else if (paintType === 'watercolor') {
        tips.push('💧 <strong>Watercolor reactivates:</strong> Even dried paint can be reused with water');
    }
    
    if (area > 400) {
        tips.push('📏 <strong>For large projects:</strong> Consider buying paint in larger containers or tubes');
    }
    
    return tips.join('<br><br>');
}

// Art Supply Calculator functions (see above)

function exportExtractedPalette() {
    alert('Palette export coming soon!');
}

// Print Specifications Calculator
function calculatePrintSpecs() {
    const printType = document.getElementById('printType').value;
    const width = parseFloat(document.getElementById('printWidth').value);
    const height = parseFloat(document.getElementById('printHeight').value);
    const dpi = parseInt(document.getElementById('printDPI').value);
    
    if (!width || !height || !dpi) {
        document.getElementById('printSpecsResult').innerHTML = 
            '<div class="spec-info">Please enter all dimensions and DPI values</div>';
        return;
    }
    
    const pixelWidth = Math.round(width * dpi);
    const pixelHeight = Math.round(height * dpi);
    const fileSize = Math.round((pixelWidth * pixelHeight * 3) / 1024 / 1024); // MB estimate
    
    const recommendations = getPrintRecommendations(printType);
    
    document.getElementById('printSpecsResult').innerHTML = `
        <div class="spec-info">
            <div style="margin-bottom: 10px;"><strong>Dimensions:</strong> ${width}" × ${height}"</div>
            <div style="margin-bottom: 10px;"><strong>Pixel Size:</strong> ${pixelWidth} × ${pixelHeight} pixels</div>
            <div style="margin-bottom: 10px;"><strong>Estimated File Size:</strong> ~${fileSize} MB</div>
            <div style="margin-bottom: 10px;"><strong>Color Mode:</strong> CMYK for print</div>
            <div style="margin-bottom: 10px;"><strong>Bleed:</strong> Add 0.125" all sides</div>
        </div>
    `;
    
    document.getElementById('printTips').innerHTML = `
        <h4>Tips for ${printType}:</h4>
        <ul>
            ${recommendations.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
    `;
}

function getPrintRecommendations(type) {
    const tips = {
        'poster': [
            'Use high contrast for visibility from distance',
            'Ensure text is readable at final size',
            'Consider paper stock for durability'
        ],
        'business-card': [
            'Keep important info away from edges',
            'Use readable fonts (minimum 8pt)',
            'Consider special finishes like UV coating'
        ],
        'brochure': [
            'Plan fold lines carefully',
            'Use consistent margins',
            'Test print on similar paper first'
        ],
        'book': [
            'Add gutter space for binding',
            'Use book-appropriate fonts',
            'Consider paper opacity for double-sided printing'
        ],
        'magazine': [
            'Design for saddle-stitched or perfect binding',
            'Account for page creep in layouts',
            'Use appropriate paper weight'
        ],
        'packaging': [
            'Consider die-cut requirements',
            'Use food-safe inks if applicable',
            'Test structural integrity'
        ]
    };
    
    return tips[type] || ['Follow general print guidelines', 'Test print before final production'];
}

// Paper Size Guide
const paperSizes = {
    us: {
        letter: { name: "Letter", width: 8.5, height: 11, unit: "inches", uses: "Documents, letters, basic printing" },
        legal: { name: "Legal", width: 8.5, height: 14, unit: "inches", uses: "Legal documents, contracts" },
        tabloid: { name: "Tabloid", width: 11, height: 17, unit: "inches", uses: "Posters, small artwork, brochures" },
        ledger: { name: "Ledger", width: 17, height: 11, unit: "inches", uses: "Spreadsheets, wide documents" }
    },
    iso: {
        a4: { name: "A4", width: 210, height: 297, unit: "mm", uses: "International standard, documents" },
        a3: { name: "A3", width: 297, height: 420, unit: "mm", uses: "Drawings, posters, presentations" },
        a5: { name: "A5", width: 148, height: 210, unit: "mm", uses: "Notebooks, greeting cards" },
        a6: { name: "A6", width: 105, height: 148, unit: "mm", uses: "Postcards, small notes" }
    },
    art: {
        bristol: { name: "Bristol Board", width: 22, height: 30, unit: "inches", uses: "Illustration, detailed drawings" },
        watercolor: { name: "Watercolor Paper", width: 18, height: 24, unit: "inches", uses: "Watercolor painting" },
        canvas: { name: "Canvas Board", width: 16, height: 20, unit: "inches", uses: "Oil and acrylic painting" }
    },
    photo: {
        "4x6": { name: "4×6", width: 4, height: 6, unit: "inches", uses: "Standard photos, snapshots" },
        "5x7": { name: "5×7", width: 5, height: 7, unit: "inches", uses: "Portrait photos, frames" },
        "8x10": { name: "8×10", width: 8, height: 10, unit: "inches", uses: "Formal portraits, wall art" },
        "11x14": { name: "11×14", width: 11, height: 14, unit: "inches", uses: "Large prints, matted photos" }
    }
};

function updatePaperSizes() {
    const category = document.getElementById('paperCategory').value;
    const sizeSelect = document.getElementById('specificSize');
    
    sizeSelect.innerHTML = '';
    
    Object.keys(paperSizes[category]).forEach(key => {
        const size = paperSizes[category][key];
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${size.name} (${size.width}${size.unit === 'mm' ? 'mm' : '"'} × ${size.height}${size.unit === 'mm' ? 'mm' : '"'})`;
        sizeSelect.appendChild(option);
    });
}

function showPaperInfo() {
    const category = document.getElementById('paperCategory').value;
    const sizeKey = document.getElementById('specificSize').value;
    const size = paperSizes[category][sizeKey];
    
    if (!size) return;
    
    const content = document.getElementById('paperSizeContent');
    
    let dimensionsText = '';
    if (size.unit === 'mm') {
        const widthIn = (size.width / 25.4).toFixed(1);
        const heightIn = (size.height / 25.4).toFixed(1);
        dimensionsText = `${size.width}mm × ${size.height}mm (${widthIn}" × ${heightIn}")`;
    } else {
        const widthMm = (size.width * 25.4).toFixed(0);
        const heightMm = (size.height * 25.4).toFixed(0);
        dimensionsText = `${size.width}" × ${size.height}" (${widthMm}mm × ${heightMm}mm)`;
    }
    
    const area = size.unit === 'mm' ? 
        ((size.width * size.height) / 645.16).toFixed(1) + ' sq in' :
        (size.width * size.height).toFixed(1) + ' sq in';
    
    content.innerHTML = `
        <div style="margin-bottom: 8px;">
            <strong>${size.name}</strong><br>
            <span style="color: #f8c8d0;">Dimensions:</span> ${dimensionsText}<br>
            <span style="color: #f8c8d0;">Area:</span> ${area}<br>
            <span style="color: #f8c8d0;">Best for:</span> ${size.uses}
        </div>
    `;
}

// Frame Calculator
function calculateFrameSize() {
    const width = parseFloat(document.getElementById('artworkWidth').value);
    const height = parseFloat(document.getElementById('artworkHeight').value);
    const matWidth = parseFloat(document.getElementById('matWidth').value);
    const units = document.getElementById('units').value;
    
    if (!width || !height) {
        alert('Please enter both width and height for your artwork');
        return;
    }
    
    const frameWidth = width + (matWidth * 2);
    const frameHeight = height + (matWidth * 2);
    
    const results = document.getElementById('frameResults');
    const content = document.getElementById('frameContent');
    
    const unitSymbol = units === 'inches' ? '"' : 'cm';
    
    let conversionText = '';
    if (units === 'inches') {
        const frameCmW = (frameWidth * 2.54).toFixed(1);
        const frameCmH = (frameHeight * 2.54).toFixed(1);
        conversionText = ` (${frameCmW}cm × ${frameCmH}cm)`;
    } else {
        const frameInW = (frameWidth / 2.54).toFixed(1);
        const frameInH = (frameHeight / 2.54).toFixed(1);
        conversionText = ` (${frameInW}" × ${frameInH}")`;
    }
    
    const matInfo = matWidth === 0 ? 'No mat needed' : `${matWidth}${unitSymbol} mat border all around`;
    
    // Standard frame sizes for recommendations
    const standardSizes = units === 'inches' ? 
        ['5×7', '8×10', '11×14', '16×20', '18×24', '24×36'] :
        ['13×18', '20×25', '28×36', '41×51', '46×61', '61×91'];
    
    const currentSize = `${frameWidth}×${frameHeight}`;
    const isStandard = standardSizes.some(size => {
        const [w, h] = size.split('×').map(Number);
        return Math.abs(w - frameWidth) < 0.5 && Math.abs(h - frameHeight) < 0.5;
    });
    
    content.innerHTML = `
        <div style="margin-bottom: 8px;">
            <strong>Frame Size Needed:</strong> ${frameWidth}${unitSymbol} × ${frameHeight}${unitSymbol}${conversionText}<br>
            <strong>Mat:</strong> ${matInfo}<br>
            <strong>Standard Size:</strong> ${isStandard ? 'Yes - easy to find!' : 'Custom size needed'}<br>
            ${!isStandard ? `<span style="color: #f8c8d0;">Closest standard:</span> ${findClosestStandardSize(frameWidth, frameHeight, units)}<br>` : ''}
            <span style="color: #f8c8d0;">Shopping tip:</span> Look for frames that fit ${frameWidth}${unitSymbol} × ${frameHeight}${unitSymbol} artwork
        </div>
    `;
    
    results.style.display = 'block';
}

function findClosestStandardSize(width, height, units) {
    const standards = units === 'inches' ? 
        [[5,7], [8,10], [11,14], [16,20], [18,24], [24,36]] :
        [[13,18], [20,25], [28,36], [41,51], [46,61], [61,91]];
    
    let closest = standards[0];
    let minDiff = Math.abs(width - closest[0]) + Math.abs(height - closest[1]);
    
    standards.forEach(size => {
        const diff = Math.abs(width - size[0]) + Math.abs(height - size[1]);
        if (diff < minDiff) {
            minDiff = diff;
            closest = size;
        }
    });
    
    const unitSymbol = units === 'inches' ? '"' : 'cm';
    return `${closest[0]}${unitSymbol} × ${closest[1]}${unitSymbol}`;
}

// Font Pairing Helper
const fontPairings = {
    modern: {
        poster: [
            { header: "Helvetica Neue", body: "Open Sans", note: "Clean, professional, highly readable" },
            { header: "Montserrat", body: "Source Sans Pro", note: "Modern geometric with excellent legibility" },
            { header: "Roboto", body: "Lato", note: "Friendly tech aesthetic, works great for digital" }
        ],
        logo: [
            { header: "Futura", body: "Avenir", note: "Geometric precision, timeless appeal" },
            { header: "Proxima Nova", body: "Museo Sans", note: "Balanced modern look with personality" }
        ],
        website: [
            { header: "Inter", body: "System UI", note: "Optimized for screens, excellent readability" },
            { header: "Poppins", body: "Nunito", note: "Friendly and approachable for web use" }
        ],
        presentation: [
            { header: "Montserrat", body: "Open Sans", note: "Great contrast between bold headers and readable body" },
            { header: "Roboto Condensed", body: "Roboto", note: "Same family, different weights for hierarchy" }
        ],
        invitation: [
            { header: "Quicksand", body: "Karla", note: "Modern but warm, perfect for contemporary events" }
        ]
    },
    classic: {
        poster: [
            { header: "Trajan Pro", body: "Minion Pro", note: "Classical elegance with excellent readability" },
            { header: "Optima", body: "Palatino", note: "Timeless sophistication" }
        ],
        logo: [
            { header: "Times New Roman", body: "Georgia", note: "Traditional authority and trust" },
            { header: "Garamond", body: "Sabon", note: "Elegant old-style serifs" }
        ],
        website: [
            { header: "Playfair Display", body: "Source Serif Pro", note: "Elegant serif combination for traditional feel" }
        ],
        presentation: [
            { header: "Georgia", body: "Verdana", note: "Professional and readable in any size" }
        ],
        invitation: [
            { header: "Baskerville", body: "Caslon", note: "Refined elegance for formal occasions" }
        ]
    },
    playful: {
        poster: [
            { header: "Fredoka One", body: "Nunito", note: "Fun and bouncy for kid-friendly designs" },
            { header: "Pacifico", body: "Open Sans", note: "Casual script with clean supporting text" }
        ],
        logo: [
            { header: "Comfortaa", body: "Quicksand", note: "Rounded and friendly geometric shapes" }
        ],
        website: [
            { header: "Baloo", body: "Nunito", note: "Playful headers with readable body text" }
        ],
        invitation: [
            { header: "Dancing Script", body: "Lato", note: "Celebratory script with clean support" }
        ]
    },
    professional: {
        poster: [
            { header: "Myriad Pro", body: "Minion Pro", note: "Corporate standard, highly professional" }
        ],
        logo: [
            { header: "Helvetica", body: "Univers", note: "Classic corporate identity choice" }
        ],
        website: [
            { header: "Source Sans Pro", body: "PT Sans", note: "Professional web-optimized fonts" }
        ],
        presentation: [
            { header: "Calibri", body: "Segoe UI", note: "Microsoft standard, familiar and professional" }
        ]
    },
    artistic: {
        poster: [
            { header: "Bebas Neue", body: "Open Sans", note: "Bold artistic headers with readable support" }
        ],
        logo: [
            { header: "Amatic SC", body: "Josefin Sans", note: "Hand-drawn feel with artistic flair" }
        ],
        invitation: [
            { header: "Great Vibes", body: "Libre Baskerville", note: "Artistic script with classic support" }
        ]
    }
};

function generateFontPairs() {
    const style = document.getElementById('designStyle').value;
    const project = document.getElementById('projectType').value;
    const content = document.getElementById('fontPairContent');
    
    const pairs = fontPairings[style] && fontPairings[style][project] 
        ? fontPairings[style][project] 
        : fontPairings.modern.poster;
    
    if (pairs.length === 0) {
        content.innerHTML = `<em>No specific recommendations for ${style} ${project} - try the Modern style for versatile options</em>`;
        return;
    }
    
    let html = '';
    pairs.forEach((pair, index) => {
        html += `
            <div style="margin-bottom: 12px; padding: 8px; background: rgba(248, 200, 208, 0.1); border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 4px;">Option ${index + 1}:</div>
                <div style="margin-bottom: 2px;"><strong>Header:</strong> ${pair.header}</div>
                <div style="margin-bottom: 2px;"><strong>Body:</strong> ${pair.body}</div>
                <div style="font-size: 0.65rem; color: #f8c8d0; font-style: italic;">${pair.note}</div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// Layout Composition Guide
const layoutAdvice = {
    'text-heavy': {
        inform: {
            portrait: "Use clear hierarchy with headers, subheaders, and body text. Consider 2-column layout for easy scanning.",
            landscape: "Create columns to break up text. Use generous white space and clear section divisions.",
            square: "Center-align main content with good margins. Use bullet points and short paragraphs."
        },
        sell: {
            portrait: "Lead with benefits, use testimonials as visual breaks. Keep paragraphs short and scannable.",
            landscape: "Create visual flow from problem to solution. Use before/after comparisons.",
            square: "Focus on one key message. Use compelling headlines and minimal but powerful text."
        }
    },
    'image-heavy': {
        inspire: {
            portrait: "Use full-bleed images with minimal text overlay. Create emotional impact through visuals.",
            landscape: "Gallery-style layout with consistent spacing. Let images tell the story.",
            square: "Single powerful image with small accent text. Perfect for social media impact."
        },
        entertain: {
            portrait: "Comic-book style panels or sequential storytelling through images.",
            landscape: "Panoramic or cinematic layouts. Use images to create narrative flow.",
            square: "Meme-style format or single impactful visual joke."
        }
    },
    'balanced': {
        inform: {
            portrait: "Alternate text and image sections. Use images to support and illustrate key points.",
            landscape: "Side-by-side text and visuals. Create clear left-to-right reading flow.",
            square: "Central image with text wrapped around or clearly separated sections."
        }
    },
    'minimal': {
        sell: {
            portrait: "Lots of white space, single powerful image, minimal compelling text.",
            landscape: "Asymmetrical layout with strong focal point and plenty of breathing room.",
            square: "Center everything. Use negative space as a design element."
        }
    }
};

function generateLayoutAdvice() {
    const content = document.getElementById('contentType').value;
    const goal = document.getElementById('layoutGoal').value;
    const format = document.getElementById('layoutFormat').value;
    const audience = document.getElementById('audienceType').value;
    
    const results = document.getElementById('layoutResults');
    const contentDiv = document.getElementById('layoutContent');
    
    let advice = '';
    
    // Get specific advice based on content type and goal
    if (layoutAdvice[content] && layoutAdvice[content][goal] && layoutAdvice[content][goal][format]) {
        advice = layoutAdvice[content][goal][format];
    } else {
        // Fallback advice based on format
        if (format === 'portrait') {
            advice = "Vertical layout works well for reading flow. Place most important content in upper third. Use clear hierarchy from top to bottom.";
        } else if (format === 'landscape') {
            advice = "Horizontal layout allows for side-by-side comparisons. Use left-to-right reading pattern. Great for before/after content.";
        } else {
            advice = "Square format works best with centered, balanced compositions. Perfect for social media. Focus on single key message.";
        }
    }
    
    // Add audience-specific advice
    let audienceAdvice = '';
    switch (audience) {
        case 'business':
            audienceAdvice = "Use professional fonts, conservative colors, and clear information hierarchy.";
            break;
        case 'youth':
            audienceAdvice = "Bold colors, dynamic layouts, and modern typography work well. Don't be afraid of asymmetry.";
            break;
        case 'seniors':
            audienceAdvice = "Larger text, high contrast, simple layouts, and familiar design patterns.";
            break;
        case 'creative':
            audienceAdvice = "Experiment with unconventional layouts, artistic typography, and creative use of space.";
            break;
        default:
            audienceAdvice = "Keep it simple and accessible. Use familiar patterns and clear visual hierarchy.";
    }
    
    contentDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
            <strong>Layout Suggestion:</strong><br>
            ${advice}
        </div>
        <div style="margin-bottom: 10px;">
            <strong>For Your Audience:</strong><br>
            ${audienceAdvice}
        </div>
        <div style="background: rgba(248, 200, 208, 0.1); padding: 8px; border-radius: 4px; font-size: 0.65rem;">
            <strong>Quick Tips:</strong><br>
            • Rule of thirds: Place important elements along imaginary grid lines<br>
            • White space is your friend - don't fill every inch<br>
            • Create visual hierarchy with size, color, and positioning<br>
            • Align elements for a clean, professional look
        </div>
    `;
    
    results.style.display = 'block';
}

// Design Decision Helper Functions
function generateDesignRecommendations() {
    console.log('generateDesignRecommendations called');
    
    const projectType = document.getElementById('designProjectType');
    const audience = document.getElementById('designAudience');
    const mood = document.getElementById('designMood');
    const resultsDiv = document.getElementById('designRecommendations');
    
    if (!projectType || !audience || !mood || !resultsDiv) {
        console.error('Missing required elements for design recommendations');
        return;
    }
    
    const projectTypeValue = projectType.value;
    const audienceValue = audience.value;
    const moodValue = mood.value;
    
    console.log('Values:', projectTypeValue, audienceValue, moodValue);
    
    // Show results section
    resultsDiv.style.display = 'block';
    
    // Generate color recommendations
    generateColorRecommendations(projectTypeValue, audienceValue, moodValue);
    
    // Generate typography recommendations
    generateTypographyRecommendations(projectTypeValue, audienceValue, moodValue);
    
    // Generate layout recommendations
    generateLayoutRecommendations(projectTypeValue, audienceValue, moodValue);
    
    // Generate general tips
    generateDesignTips(projectTypeValue, audienceValue, moodValue);
}

function generateColorRecommendations(projectType, audience, mood) {
    console.log('generateColorRecommendations called with:', projectType, audience, mood);
    
    const colorSchemes = {
        trustworthy: { colors: ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D'], description: "Professional blues and warm accents build trust" },
        friendly: { colors: ['#F79F79', '#F7931E', '#FFD23F', '#06A77D'], description: "Warm oranges and friendly greens create approachability" },
        exciting: { colors: ['#FF006E', '#FFBE0B', '#8338EC', '#3A86FF'], description: "High-energy colors that demand attention" },
        calm: { colors: ['#8ECAE6', '#219EBC', '#023047', '#FFB3BA'], description: "Soothing blues and soft pastels for tranquility" },
        luxurious: { colors: ['#2D3748', '#805AD5', '#D69E2E', '#F7FAFC'], description: "Rich purples and gold accents suggest premium quality" },
        fun: { colors: ['#FF8A80', '#FFD54F', '#81C784', '#64B5F6'], description: "Bright, playful colors that spark joy" },
        serious: { colors: ['#2D3748', '#4A5568', '#718096', '#A0AEC0'], description: "Sophisticated grays convey authority and professionalism" },
        creative: { colors: ['#E53E3E', '#DD6B20', '#38B2AC', '#805AD5'], description: "Bold, artistic palette that inspires creativity" }
    };
    
    const scheme = colorSchemes[mood] || colorSchemes.trustworthy;
    
    const colorRecommendationsDiv = document.getElementById('colorRecommendations');
    const colorSwatchesDiv = document.getElementById('colorSwatches');
    
    if (!colorRecommendationsDiv || !colorSwatchesDiv) {
        console.error('Color recommendation elements not found');
        return;
    }
    
    colorRecommendationsDiv.innerHTML = `
        <p><strong>Recommended palette:</strong> ${scheme.description}</p>
        <p><strong>Usage tips:</strong> Use the darkest color for text, brightest for accents, and middle tones for backgrounds or secondary elements.</p>
    `;
    
    // Generate color swatches
    const swatchesHtml = scheme.colors.map(color => 
        `<div style="width: 60px; height: 60px; background: ${color}; border-radius: 8px; display: flex; align-items: flex-end; justify-content: center; color: white; font-size: 0.7rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); padding: 4px; box-sizing: border-box;">${color}</div>`
    ).join('');
    
    colorSwatchesDiv.innerHTML = swatchesHtml;
    console.log('Color recommendations generated successfully');
}

function generateTypographyRecommendations(projectType, audience, mood) {
    console.log('generateTypographyRecommendations called');
    
    const typographyDiv = document.getElementById('typographyRecommendations');
    if (!typographyDiv) {
        console.error('Typography recommendations element not found');
        return;
    }
    
    let recommendations = '';
    
    if (projectType === 'logo') {
        recommendations = "Choose a unique, memorable font that reflects your brand personality. Avoid overly decorative fonts for logos that need to work at small sizes.";
    } else if (projectType === 'website') {
        recommendations = "Use web-safe fonts like Inter, Open Sans, or system fonts. Pair a distinctive header font with a highly readable body font.";
    } else if (projectType === 'poster') {
        recommendations = "Bold, large fonts for headers that can be read from a distance. Ensure good contrast between text and background.";
    } else {
        recommendations = "Choose fonts that match your project's mood and ensure good readability for your audience.";
    }
    
    if (audience === 'seniors') {
        recommendations += " Use larger font sizes (minimum 14pt) and high contrast for better readability.";
    } else if (audience === 'youth') {
        recommendations += " Modern, trendy fonts work well, but ensure they're still readable.";
    }
    
    if (mood === 'fun') {
        recommendations += " Consider playful, rounded fonts, but use them sparingly for headers only.";
    } else if (mood === 'serious') {
        recommendations += " Stick to classic, conservative fonts like Times New Roman, Helvetica, or Georgia.";
    }
    
    typographyDiv.innerHTML = `
        <p>${recommendations}</p>
        <p><strong>Font pairing tip:</strong> Combine a decorative header font with a simple, readable body font. Never use more than 2-3 font families in one design.</p>
    `;
    console.log('Typography recommendations generated successfully');
}

function generateLayoutRecommendations(projectType, audience, mood) {
    console.log('generateLayoutRecommendations called');
    
    const layoutDiv = document.getElementById('layoutRecommendations');
    if (!layoutDiv) {
        console.error('Layout recommendations element not found');
        return;
    }
    
    let layoutTips = '';
    
    if (projectType === 'logo') {
        layoutTips = "Keep it simple and scalable. Your logo should work at any size from business card to billboard.";
    } else if (projectType === 'poster') {
        layoutTips = "Create a clear visual hierarchy. Most important information should be largest and positioned prominently.";
    } else if (projectType === 'website') {
        layoutTips = "Use familiar web patterns: header, navigation, main content, sidebar, footer. Prioritize mobile responsiveness.";
    } else {
        layoutTips = "Focus on clear hierarchy, good spacing, and logical flow of information.";
    }
    
    layoutDiv.innerHTML = `
        <p>${layoutTips}</p>
        <p><strong>Universal principles:</strong></p>
        <ul>
            <li>Use the rule of thirds for balanced compositions</li>
            <li>Align elements to create clean, organized layouts</li>
            <li>Use white space effectively - don't cram everything together</li>
            <li>Create visual hierarchy with size, color, and positioning</li>
        </ul>
    `;
    console.log('Layout recommendations generated successfully');
}

function generateDesignTips(projectType, audience, mood) {
    console.log('generateDesignTips called');
    
    const tipsDiv = document.getElementById('designTips');
    if (!tipsDiv) {
        console.error('Design tips element not found');
        return;
    }
    
    const tips = [
        "Less is more - don't try to include everything in one design",
        "Consistency is key - use the same fonts, colors, and spacing throughout",
        "Test your design at different sizes to ensure it works everywhere",
        "Get feedback from people in your target audience",
        "Look at successful designs in your category for inspiration",
        "Ensure good contrast for accessibility - your design should be readable by everyone"
    ];
    
    const shuffledTips = tips.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    tipsDiv.innerHTML = `
        <ul>
            ${shuffledTips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
        <p><strong>Remember:</strong> Great design serves your audience and achieves your goals. When in doubt, prioritize clarity and usability over decoration.</p>
    `;
    console.log('Design tips generated successfully');
}
