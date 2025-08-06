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
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');
    
    if (modal && overlay) {
        console.log('Modal and overlay found');
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Force visibility and animation
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
        }, 10);
        
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
    } else {
        console.error('Modal or overlay not found:', { modal, overlay });
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.resource-modal');
    const overlay = document.querySelector('.modal-overlay');
    
    modals.forEach(modal => {
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
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

// Enhanced Mood-Based Color Generator with Text Analysis
const enhancedColorPalettes = {
    // Emotions & Moods
    peaceful: { colors: ['#87CEEB', '#E0F6FF', '#98FB98', '#F0FFF0', '#E6E6FA'], name: "Peaceful Serenity", desc: "Calming blues and gentle greens for tranquil moods" },
    energetic: { colors: ['#FF4500', '#FF6347', '#FFD700', '#FF1493', '#00FF00'], name: "Electric Energy", desc: "Bold, vibrant colors that pulse with life" },
    romantic: { colors: ['#FFB6C1', '#FFEAE5', '#F8BBD9', '#FFCCCB', '#E6B3BA'], name: "Romantic Blush", desc: "Soft pinks and warm tones for love and tenderness" },
    mysterious: { colors: ['#191970', '#483D8B', '#2F2F2F', '#8B008B', '#4B0082'], name: "Dark Mystery", desc: "Deep purples and shadows for enigmatic themes" },
    joyful: { colors: ['#FFD700', '#FF69B4', '#00CED1', '#ADFF2F', '#FF6347'], name: "Pure Joy", desc: "Bright, happy colors that spark delight" },
    melancholy: { colors: ['#4682B4', '#778899', '#B0C4DE', '#696969', '#A9A9A9'], name: "Gentle Sadness", desc: "Muted blues and grays for contemplative moods" },
    excited: { colors: ['#FF4500', '#FF1493', '#00FF7F', '#FFD700', '#FF6347'], name: "Electric Excitement", desc: "High-energy colors that vibrate with enthusiasm" },
    dreamy: { colors: ['#E6E6FA', '#F0E68C', '#DDA0DD', '#98FB98', '#87CEEB'], name: "Ethereal Dreams", desc: "Soft pastels for dreamlike, floating feelings" },
    confident: { colors: ['#B22222', '#DAA520', '#2E8B57', '#4B0082', '#FF8C00'], name: "Bold Confidence", desc: "Strong, assertive colors that command attention" },
    nostalgic: { colors: ['#D2691E', '#F4A460', '#DEB887', '#BC8F8F', '#CD853F'], name: "Warm Nostalgia", desc: "Vintage tones that evoke cherished memories" },

    // Nature & Environments
    ocean: { colors: ['#006994', '#20B2AA', '#40E0D0', '#87CEEB', '#4682B4'], name: "Ocean Depths", desc: "From deep sea to tropical shallows" },
    sunset: { colors: ['#FF6347', '#FF4500', '#FFD700', '#FF69B4', '#FF8C00'], name: "Golden Hour", desc: "Warm sunset colors from sky to horizon" },
    forest: { colors: ['#228B22', '#32CD32', '#8FBC8F', '#9ACD32', '#006400'], name: "Deep Woods", desc: "Rich forest greens and earthy undertones" },
    cosmic: { colors: ['#0B1426', '#483D8B', '#9400D3', '#4B0082', '#C71585'], name: "Starry Cosmos", desc: "Deep space purples with stellar highlights" },
    vintage: { colors: ['#8B4513', '#CD853F', '#D2691E', '#F4A460', '#DEB887'], name: "Antique Elegance", desc: "Classic vintage browns and warm patina" },
    tropical: { colors: ['#00FF7F', '#FF1493', '#FFD700', '#FF6347', '#00CED1'], name: "Paradise Found", desc: "Vibrant tropical colors of sun and sea" },
    desert: { colors: ['#F4A460', '#D2691E', '#CD853F', '#DEB887', '#BC8F8F'], name: "Desert Sands", desc: "Warm earth tones of arid landscapes" },
    arctic: { colors: ['#E0F6FF', '#B0E0E6', '#87CEEB', '#4682B4', '#F0F8FF'], name: "Frozen Beauty", desc: "Cool blues and whites of icy realms" },
    garden: { colors: ['#FF69B4', '#ADFF2F', '#9ACD32', '#FFB6C1', '#98FB98'], name: "Blooming Garden", desc: "Fresh florals and vibrant garden life" },
    cityscape: { colors: ['#696969', '#A9A9A9', '#FFD700', '#FF4500', '#4682B4'], name: "Urban Energy", desc: "Modern city colors of steel and neon" },

    // Seasons
    spring: { colors: ['#98FB98', '#FFB6C1', '#87CEEB', '#F0E68C', '#DDA0DD'], name: "Spring Awakening", desc: "Fresh pastels of new growth and renewal" },
    summer: { colors: ['#FF6347', '#FFD700', '#00CED1', '#32CD32', '#FF1493'], name: "Summer Vibrance", desc: "Bright, warm colors of peak season" },
    autumn: { colors: ['#CD853F', '#D2691E', '#B22222', '#DAA520', '#8B4513'], name: "Autumn Harvest", desc: "Rich colors of changing leaves and harvest" },
    winter: { colors: ['#E0E6F8', '#B0C4DE', '#4682B4', '#2F4F4F', '#708090'], name: "Winter Frost", desc: "Cool, crisp colors of snow and ice" },

    // Art Styles
    impressionist: { colors: ['#E6E6FA', '#FFB6C1', '#98FB98', '#F0E68C', '#87CEEB'], name: "Impressionist Light", desc: "Soft, luminous colors of the masters" },
    abstract: { colors: ['#FF0000', '#0000FF', '#FFFF00', '#FF1493', '#00FF00'], name: "Abstract Expression", desc: "Bold primaries for pure artistic expression" },
    minimalist: { colors: ['#FFFFFF', '#F5F5F5', '#E5E5E5', '#CCCCCC', '#999999'], name: "Clean Minimal", desc: "Subtle grays for elegant simplicity" },
    bohemian: { colors: ['#8B4513', '#DAA520', '#CD853F', '#9932CC', '#DC143C'], name: "Boho Chic", desc: "Rich earth tones with jewel accents" },
    gothic: { colors: ['#000000', '#8B0000', '#4B0082', '#2F2F2F', '#800080'], name: "Gothic Drama", desc: "Dark, dramatic colors for gothic romance" },
    retro: { colors: ['#FF6B35', '#F7931E', '#FFD23F', '#3CBCCF', '#FF006E'], name: "Retro Groove", desc: "Funky colors from decades past" },
    cyberpunk: { colors: ['#FF00FF', '#00FFFF', '#FF1493', '#7FFF00', '#9400D3'], name: "Neon Future", desc: "Electric colors of digital dreams" },
    pastel: { colors: ['#FFB3E6', '#B3E6FF', '#B3FFB3', '#FFFFB3', '#E6B3FF'], name: "Soft Pastels", desc: "Gentle, muted colors for delicate beauty" },

    // Color Theory Based
    monochromatic_blue: { colors: ['#000080', '#4169E1', '#6495ED', '#87CEEB', '#E6F3FF'], name: "Blue Harmony", desc: "Monochromatic blue from deep to light" },
    monochromatic_red: { colors: ['#8B0000', '#DC143C', '#FF6347', '#FFA07A', '#FFE4E1'], name: "Red Gradient", desc: "Warm reds from deep to blush" },
    complementary_warm: { colors: ['#FF4500', '#FF6347', '#FFD700', '#32CD32', '#228B22'], name: "Warm Contrast", desc: "Orange and green complementary harmony" },
    triadic_primary: { colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'], name: "Primary Triad", desc: "Classic red, blue, yellow with accents" },
    analogous_warm: { colors: ['#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00'], name: "Fire Warmth", desc: "Neighboring warm colors that flow together" },
    split_complement: { colors: ['#FF6347', '#32CD32', '#4169E1', '#FFD700', '#9932CC'], name: "Balanced Split", desc: "Sophisticated color relationships" },

    // Specific Objects & Themes
    coffee: { colors: ['#8B4513', '#A0522D', '#D2691E', '#F4A460', '#FFEFD5'], name: "Coffee House", desc: "Rich browns and cream like perfect coffee" },
    wine: { colors: ['#722F37', '#8B0000', '#DC143C', '#800080', '#4B0082'], name: "Wine Country", desc: "Deep burgundies and rich purples" },
    chocolate: { colors: ['#3C1810', '#8B4513', '#A0522D', '#D2691E', '#F4A460'], name: "Chocolate Dreams", desc: "Rich chocolate tones from dark to milk" },
    honey: { colors: ['#DAA520', '#FFD700', '#F0E68C', '#FFEFD5', '#FFF8DC'], name: "Golden Honey", desc: "Sweet golden tones like flowing honey" },
    lavender: { colors: ['#E6E6FA', '#DDA0DD', '#9370DB', '#8A2BE2', '#663399'], name: "Lavender Fields", desc: "Soothing purples of lavender blooms" },
    emerald: { colors: ['#006400', '#228B22', '#32CD32', '#90EE90', '#F0FFF0'], name: "Emerald Jewel", desc: "Precious green tones from deep to light" },
    sapphire: { colors: ['#003366', '#0047AB', '#4169E1', '#6495ED', '#E6F3FF'], name: "Sapphire Depths", desc: "Royal blues like precious gemstones" },
    rose: { colors: ['#8B0000', '#DC143C', '#FF69B4', '#FFB6C1', '#FFF0F5'], name: "Rose Garden", desc: "Romantic pinks and reds of blooming roses" },

    // Weather & Atmosphere
    storm: { colors: ['#2F4F4F', '#696969', '#4682B4', '#B0C4DE', '#E6E6FA'], name: "Storm Clouds", desc: "Dramatic grays and blues of stormy weather" },
    sunshine: { colors: ['#FFD700', '#FFA500', '#FF8C00', '#FFFF00', '#FFFACD'], name: "Bright Sunshine", desc: "Warm, glowing yellows of sunny days" },
    mist: { colors: ['#F5F5F5', '#E6E6FA', '#D3D3D3', '#B0C4DE', '#778899'], name: "Misty Morning", desc: "Soft grays and blues of foggy landscapes" },
    rainbow: { colors: ['#FF0000', '#FF8C00', '#FFFF00', '#00FF00', '#0000FF'], name: "Rainbow Bright", desc: "All colors of the spectrum in harmony" },

    // Architectural & Design
    modern: { colors: ['#000000', '#FFFFFF', '#808080', '#FF0000', '#0000FF'], name: "Modern Design", desc: "Clean, contemporary color scheme" },
    rustic: { colors: ['#8B4513', '#A0522D', '#D2691E', '#F4A460', '#DEB887'], name: "Rustic Charm", desc: "Natural wood tones and earth colors" },
    industrial: { colors: ['#2F4F4F', '#696969', '#A9A9A9', '#D3D3D3', '#F5F5F5'], name: "Industrial Steel", desc: "Metal grays and concrete tones" },
    luxury: { colors: ['#FFD700', '#FF1493', '#8B008B', '#000000', '#FFFFFF'], name: "Luxury Gold", desc: "Rich golds and premium accent colors" }
};

// Enhanced keyword detection with more words and phrases
const enhancedKeywords = {
    // Emotions
    peaceful: ['calm', 'serene', 'tranquil', 'peaceful', 'relaxing', 'soothing', 'gentle', 'quiet', 'meditation', 'zen', 'harmony', 'balance', 'still', 'restful'],
    energetic: ['energetic', 'bold', 'vibrant', 'exciting', 'dynamic', 'power', 'strong', 'intense', 'electric', 'explosive', 'active', 'fierce', 'alive', 'buzzing'],
    romantic: ['romantic', 'love', 'soft', 'dreamy', 'tender', 'sweet', 'intimate', 'passionate', 'delicate', 'feminine', 'graceful', 'heart', 'valentine', 'pink'],
    mysterious: ['mysterious', 'dark', 'moody', 'gothic', 'shadow', 'noir', 'enigmatic', 'secret', 'hidden', 'dramatic', 'intense', 'black', 'deep', 'unknown'],
    joyful: ['joyful', 'happy', 'bright', 'cheerful', 'uplifting', 'positive', 'sunny', 'smile', 'laugh', 'celebration', 'festival', 'party', 'fun', 'playful'],
    melancholy: ['sad', 'melancholy', 'blue', 'lonely', 'nostalgic', 'wistful', 'grey', 'rain', 'tears', 'sorrow', 'mournful', 'pensive', 'reflective'],
    excited: ['excited', 'thrilled', 'electric', 'pumped', 'hyper', 'energized', 'animated', 'exhilarated', 'elated', 'euphoric', 'ecstatic'],
    dreamy: ['dreamy', 'ethereal', 'floating', 'soft', 'misty', 'cloudy', 'magical', 'fantasy', 'surreal', 'whimsical', 'fairy', 'pastel'],
    confident: ['confident', 'bold', 'strong', 'powerful', 'assertive', 'dominant', 'commanding', 'fierce', 'warrior', 'leader', 'champion'],
    nostalgic: ['nostalgic', 'vintage', 'retro', 'old', 'antique', 'classic', 'memory', 'past', 'heritage', 'traditional', 'timeless'],

    // Nature & Environments
    ocean: ['ocean', 'sea', 'water', 'waves', 'beach', 'coral', 'marine', 'nautical', 'aqua', 'blue', 'teal', 'turquoise', 'underwater'],
    sunset: ['sunset', 'sunrise', 'golden hour', 'orange', 'warm', 'glow', 'horizon', 'twilight', 'dusk', 'amber', 'honey'],
    forest: ['forest', 'woods', 'trees', 'nature', 'green', 'leaves', 'jungle', 'woodland', 'moss', 'fern', 'pine', 'oak'],
    cosmic: ['space', 'cosmic', 'galaxy', 'stars', 'universe', 'nebula', 'purple', 'deep', 'void', 'celestial', 'astral'],
    tropical: ['tropical', 'paradise', 'palm', 'island', 'exotic', 'vibrant', 'colorful', 'lush', 'bright', 'hawaii'],
    desert: ['desert', 'sand', 'dune', 'arid', 'cactus', 'dry', 'brown', 'tan', 'beige', 'earth', 'southwestern'],
    arctic: ['arctic', 'ice', 'snow', 'frozen', 'cold', 'white', 'blue', 'crystal', 'glacier', 'polar', 'winter'],
    garden: ['garden', 'flowers', 'blooms', 'petals', 'botanical', 'floral', 'roses', 'spring', 'fresh', 'colorful'],
    storm: ['storm', 'thunder', 'lightning', 'rain', 'clouds', 'dramatic', 'gray', 'dark', 'moody', 'turbulent'],

    // Seasons
    spring: ['spring', 'fresh', 'new', 'growth', 'renewal', 'pastel', 'light', 'soft', 'blooming', 'awakening'],
    summer: ['summer', 'hot', 'bright', 'sunny', 'warm', 'vibrant', 'beach', 'vacation', 'tropical', 'intense'],
    autumn: ['autumn', 'fall', 'harvest', 'orange', 'red', 'brown', 'leaves', 'cozy', 'warm', 'rustic'],
    winter: ['winter', 'cold', 'snow', 'ice', 'blue', 'gray', 'white', 'crisp', 'frozen', 'cool'],

    // Objects & Themes
    coffee: ['coffee', 'cafe', 'brown', 'warm', 'cozy', 'espresso', 'latte', 'mocha', 'bean', 'roast'],
    wine: ['wine', 'burgundy', 'red', 'purple', 'grape', 'elegant', 'sophisticated', 'deep', 'rich'],
    chocolate: ['chocolate', 'brown', 'sweet', 'rich', 'cocoa', 'dark', 'milk', 'decadent', 'smooth'],
    honey: ['honey', 'golden', 'yellow', 'sweet', 'amber', 'warm', 'glow', 'natural', 'smooth'],
    rose: ['rose', 'pink', 'red', 'romantic', 'flower', 'petal', 'bloom', 'garden', 'love'],
    
    // Art Styles
    vintage: ['vintage', 'retro', 'old', 'classic', 'antique', 'aged', 'weathered', 'worn', 'nostalgic'],
    modern: ['modern', 'contemporary', 'clean', 'minimalist', 'simple', 'sleek', 'geometric', 'linear'],
    gothic: ['gothic', 'dark', 'dramatic', 'black', 'mysterious', 'ornate', 'medieval', 'architectural'],
    bohemian: ['bohemian', 'boho', 'artistic', 'eclectic', 'creative', 'free', 'colorful', 'textured'],
    cyberpunk: ['cyberpunk', 'neon', 'digital', 'futuristic', 'electric', 'bright', 'synthetic', 'urban']
};

function analyzeDescription() {
    const description = document.getElementById('pieceDescription').value.toLowerCase();
    const analysisDiv = document.getElementById('aiAnalysis');
    const contentDiv = document.getElementById('analysisContent');
    
    if (description.length < 8) {
        analysisDiv.style.display = 'none';
        return;
    }
    
    const analysis = performEnhancedTextAnalysis(description);
    if (analysis.detectedThemes.length > 0) {
        contentDiv.innerHTML = `
            <div style="margin-bottom: 4px;"><strong>Detected Themes:</strong> ${analysis.detectedThemes.join(', ')}</div>
            <div style="margin-bottom: 4px;"><strong>Color Mood:</strong> ${analysis.overallMood}</div>
            <div><strong>Best Match:</strong> ${analysis.bestMatch}</div>
        `;
        analysisDiv.style.display = 'block';
    } else {
        analysisDiv.style.display = 'none';
    }
}

function performEnhancedTextAnalysis(text) {
    const detectedThemes = [];
    const matchScores = {};
    
    // Check against all keywords in enhanced system
    for (const [theme, keywords] of Object.entries(enhancedKeywords)) {
        const matchCount = keywords.filter(keyword => text.includes(keyword)).length;
        if (matchCount > 0) {
            detectedThemes.push(theme);
            matchScores[theme] = matchCount;
        }
    }
    
    // Find best matching theme
    let bestMatch = 'peaceful'; // default
    let bestScore = 0;
    for (const [theme, score] of Object.entries(matchScores)) {
        if (score > bestScore) {
            bestScore = score;
            bestMatch = theme;
        }
    }
    
    // Determine overall mood
    let overallMood = 'balanced';
    if (detectedThemes.some(theme => ['energetic', 'excited', 'joyful'].includes(theme))) {
        overallMood = 'vibrant';
    } else if (detectedThemes.some(theme => ['peaceful', 'dreamy', 'melancholy'].includes(theme))) {
        overallMood = 'soft';
    } else if (detectedThemes.some(theme => ['mysterious', 'gothic', 'storm'].includes(theme))) {
        overallMood = 'dramatic';
    }
    
    return {
        detectedThemes,
        bestMatch,
        overallMood,
        matchScores
    };
}

function generateMoodColors() {
    const description = document.getElementById('pieceDescription').value;
    let selectedPalette;
    
    // Use description-based generation if there's meaningful text
    if (description && description.length > 8) {
        const analysis = performEnhancedTextAnalysis(description.toLowerCase());
        selectedPalette = enhancedColorPalettes[analysis.bestMatch] || enhancedColorPalettes.peaceful;
    } else {
        // Use a random inspiring palette if no description
        const paletteKeys = Object.keys(enhancedColorPalettes);
        const randomKey = paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
        selectedPalette = enhancedColorPalettes[randomKey];
    }
    
    // Generate final palette with some variation
    const baseColors = [...selectedPalette.colors];
    let finalColors = [];
    
    // Add the main colors with slight variations for interest
    for (let i = 0; i < Math.min(5, baseColors.length); i++) {
        if (Math.random() > 0.3) {
            finalColors.push(baseColors[i]);
        } else {
            finalColors.push(generateColorVariation(baseColors[i]));
        }
    }
    
    // Ensure we have 5 colors
    while (finalColors.length < 5) {
        const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
        finalColors.push(generateColorVariation(baseColor));
    }
    
    displayMoodColors(finalColors, selectedPalette);
}

function generateColorVariation(hexColor) {
    // Convert hex to HSL for easier manipulation
    const hsl = hexToHsl(hexColor);
    
    // Add small random variations
    const newHue = (hsl.h + (Math.random() * 30 - 15)) % 360;
    const newSaturation = Math.max(20, Math.min(100, hsl.s + (Math.random() * 20 - 10)));
    const newLightness = Math.max(15, Math.min(85, hsl.l + (Math.random() * 20 - 10)));
    
    return hslToHex(newHue, newSaturation, newLightness);
}

function generateCustomPalette(basePalette, analysis) {
    let colors = [...basePalette.baseColors];
    
    // Adjust colors based on temperature
    if (analysis.temperature === 'warm') {
        colors = colors.map(color => adjustColorTemperature(color, 'warm'));
    } else if (analysis.temperature === 'cool') {
        colors = colors.map(color => adjustColorTemperature(color, 'cool'));
    }
    
    return {
        colors: colors,
        name: basePalette.name,
        description: basePalette.description + ` (adjusted for ${analysis.temperature} temperature)`
    };
}

function adjustColorTemperature(hexColor, direction) {
    const hsl = hexToHsl(hexColor);
    
    if (direction === 'warm') {
        // Shift towards oranges/reds
        if (hsl.h > 180) hsl.h = Math.max(0, hsl.h - 20);
        else hsl.h = Math.min(60, hsl.h + 10);
    } else if (direction === 'cool') {
        // Shift towards blues/greens
        hsl.h = (hsl.h + 180) % 360;
        if (hsl.h > 240 || hsl.h < 120) {
            hsl.h = 180 + (hsl.h % 60);
        }
    }
    
    return hslToHex(hsl.h, hsl.s, hsl.l);
}

function adjustColorForHarmony(hexColor, harmonyType) {
    // Convert hex to HSL for easier manipulation
    const hsl = hexToHsl(hexColor);
    
    if (harmonyType === 'complementary') {
        hsl.h = (hsl.h + 180) % 360;
    } else if (harmonyType === 'analogous') {
        hsl.h = (hsl.h + (Math.random() * 60 - 30)) % 360;
    }
    
    return hslToHex(hsl.h, hsl.s, hsl.l);
}

function generateMonochromaticPalette(baseColor, count) {
    const hsl = hexToHsl(baseColor);
    const colors = [];
    
    for (let i = 0; i < count; i++) {
        const lightness = Math.max(10, Math.min(90, hsl.l + (i - count/2) * 15));
        colors.push(hslToHex(hsl.h, hsl.s, lightness));
    }
    
    return colors;
}

function generateHarmoniousColor(baseColor) {
    const hsl = hexToHsl(baseColor);
    const newHue = (hsl.h + (Math.random() * 60 - 30)) % 360;
    const newSaturation = Math.max(20, Math.min(100, hsl.s + (Math.random() * 40 - 20)));
    const newLightness = Math.max(20, Math.min(80, hsl.l + (Math.random() * 30 - 15)));
    
    return hslToHex(newHue, newSaturation, newLightness);
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
    
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

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

function displayMoodColors(colors, paletteInfo) {
    const resultsDiv = document.getElementById('moodColorResults');
    const swatchesDiv = document.getElementById('moodColorSwatches');
    const infoDiv = document.getElementById('moodColorInfo');
    
    // Create color swatches
    const swatchesHtml = colors.map((color, index) => 
        `<div style="width: 40px; height: 40px; background: ${color}; border-radius: 6px; border: 2px solid rgba(255,255,255,0.3); cursor: pointer; position: relative; margin-bottom: 4px;" 
              title="${color}" onclick="copyColorToClipboard('${color}')">
            <div style="position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%); font-size: 0.6rem; color: #f8c8d0; text-align: center; width: 50px;">${color}</div>
        </div>`
    ).join('');
    
    swatchesDiv.innerHTML = swatchesHtml;
    
    // Create color information
    infoDiv.innerHTML = `
        <div style="margin-bottom: 6px;"><strong>${paletteInfo.name}</strong></div>
        <div style="margin-bottom: 6px; font-style: italic;">${paletteInfo.description}</div>
        <div style="font-size: 0.6rem; color: #f8c8d0;">💡 Click any color to copy to clipboard</div>
    `;
    
    resultsDiv.style.display = 'block';
}

function copyColorToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        // Show a brief notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; 
            background: rgba(248, 200, 208, 0.9); color: black; 
            padding: 10px 15px; border-radius: 6px; 
            font-size: 0.8rem; z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.textContent = `Copied ${color}!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    }).catch(() => {
        alert(`Color ${color} copied to clipboard!`);
    });
}

// Enhanced Color Generator ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎨 Enhanced Color Generator with 50+ palettes loaded");
});

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

// Art Prompt Generator - Creative prompts for any medium
const artPrompts = {
    surreal: {
        simple: [
            "A clock melting like honey",
            "Trees growing upside down from clouds",
            "Fish swimming through air in a library",
            "A door floating in the middle of an ocean",
            "Stairs leading into a mirror",
            "Flowers blooming from old books",
            "A house made of crystallized music",
            "Rain falling upwards into the sky"
        ],
        detailed: [
            "A fever dream where gravity works sideways and people walk on walls while giant butterflies carry umbrellas",
            "An abandoned carnival where the rides are made of living coral and ticket stubs grow like leaves",
            "A cityscape where buildings breathe and windows blink like eyes, with rivers of liquid starlight flowing between streets",
            "A forest where each tree is a different season, connected by bridges made of solidified wind",
            "A library where books fly like birds and words physically fall from pages to carpet the floor in shifting meanings"
        ],
        epic: [
            "Create a massive dreamscape showing the moment when all human memories become visible as floating islands, each containing a different person's most vivid dream, connected by bridges of crystallized time",
            "Design an enormous surreal battlefield where abstract emotions fight as living creatures - Depression as a massive tar-black whale, Joy as golden lightning birds, Anxiety as swarms of geometric insects"
        ]
    },
    fantasy: {
        simple: [
            "A tiny dragon guarding a coffee cup",
            "Mushroom houses in a fairy village",
            "A magical staff growing flowers",
            "Crystal cave with floating gems",
            "Enchanted forest with glowing moss",
            "A phoenix rising from birthday candles",
            "Unicorn drinking from a rainbow pond",
            "Fairy lights that are actual tiny fairies"
        ],
        detailed: [
            "A steampunk fairy realm where mechanical butterflies pollinate gear-flowers and clockwork trees tick in rhythm",
            "An underwater wizard's tower where merfolk students learn to cast spells with bioluminescent sea creatures",
            "A floating sky city where dragon riders deliver mail and cloud shepherds herd storm systems",
            "A magical blacksmith's forge where they hammer shooting stars into armor and temper swords in moonbeams",
            "An enchanted greenhouse where each plant represents a different type of magic and they're all blooming at once"
        ],
        epic: [
            "Design the final battle between the last giant and an army of technological sprites in a world where magic and machinery have merged",
            "Create an epic scene of a cosmic dragon weaving new constellations while flying between planets, with star-dust trailing from its wings"
        ]
    },
    creature: {
        simple: [
            "A cat-octopus hybrid",
            "A bird with butterfly wings",
            "A dog with deer antlers",
            "A rabbit-dragon mix",
            "An owl with peacock feathers",
            "A fox with fish fins",
            "A bear with crystal spines",
            "A horse with moth wings"
        ],
        detailed: [
            "Combine a mantis shrimp with a peacock mantis - design a creature with the shrimp's powerful punching claws but the mantis's grace and the peacock's magnificent display",
            "Merge a polar bear with a jellyfish - create a translucent arctic creature that glows and floats through icy waters",
            "Blend a hummingbird with a chameleon - design a tiny creature that can change colors while hovering and has an impossibly long tongue",
            "Fuse a pangolin with a monarch butterfly - armored creature with beautiful wing patterns that migrates seasonally",
            "Cross a sea otter with a phoenix - aquatic creature that can ignite its waterproof fur for warmth and protection"
        ],
        epic: [
            "Design an ancient guardian creature that's part mountain, part dragon, part forest - show it awakening after centuries of slumber with trees growing from its back and waterfalls flowing from its eyes",
            "Create a cosmic leviathan that swims through space, part whale, part nebula, part crystalline structure, with galaxies visible through its translucent body"
        ]
    },
    scene: {
        simple: [
            "A cozy cottage during a thunderstorm",
            "A secret garden hidden behind a waterfall",
            "An old bookshop at midnight",
            "A picnic on a mountain peak",
            "A lighthouse during a meteor shower",
            "A train station in the clouds",
            "A campfire on an alien planet",
            "A greenhouse full of glowing plants"
        ],
        detailed: [
            "A bustling night market in a floating city, with vendors selling bottled starlight and customers browsing while riding on flying carpets",
            "An abandoned space station being reclaimed by alien plant life, with vines growing through broken windows and flowers blooming in zero gravity",
            "A massive tree house city where each branch holds a different dwelling and rope bridges connect them all under a canopy of golden leaves",
            "An underwater tea party where merfolk and sea creatures gather around a table made of coral with bubbles rising instead of steam",
            "A desert oasis that appears only during eclipses, where time moves differently and ancient travelers rest between dimensions"
        ],
        epic: [
            "Illustrate the moment when a dying star is reborn as a garden planet, showing the transformation from stellar explosion to the first life taking root",
            "Create a vast interdimensional marketplace where beings from different realities trade memories, dreams, and pieces of their worlds"
        ]
    },
    abstract: {
        simple: [
            "Emotions as geometric shapes",
            "Music visualized as flowing colors",
            "Time represented through texture",
            "Movement frozen in angular lines",
            "Silence depicted through negative space",
            "Energy flowing in spirals",
            "Growth shown through expanding patterns",
            "Chaos organized into harmony"
        ],
        detailed: [
            "Create a visual symphony where each instrument becomes a different type of mark-making - violins as flowing lines, drums as explosive textures, flutes as delicate dots",
            "Design an abstract representation of human consciousness with layers representing memory, emotion, thought, and instinct blending and separating",
            "Visualize the concept of time as a living entity that changes form - past as heavy textures, present as sharp lines, future as flowing gradients",
            "Abstract the feeling of falling in love using only complementary colors and geometric forms that seem to dance together",
            "Represent the four seasons as abstract forms that morph into each other in an endless cycle"
        ],
        epic: [
            "Create an enormous abstract piece representing the birth of the universe, from the initial void through explosion to the formation of matter and energy patterns",
            "Design a massive abstract representation of human evolution, showing the progression from simple to complex through purely visual elements"
        ]
    },
    portrait: {
        simple: [
            "A person made of seasonal elements",
            "Someone with galaxy eyes",
            "A character with flower hair",
            "Portrait using only geometric shapes",
            "Person dissolving into butterflies",
            "Face emerging from tree bark",
            "Character with constellation freckles",
            "Portrait reflected in water drops"
        ],
        detailed: [
            "A steampunk inventor whose goggles reflect their latest creation and whose hair is made of copper wire and small gears",
            "A sea witch whose hair flows like ocean currents and whose eyes contain tiny storm systems",
            "A forest guardian whose skin has bark texture and whose breath creates small plants and flowers",
            "A time traveler whose clothing shifts between different historical periods and whose eyes show glimpses of different eras",
            "A dream weaver whose fingers trail stardust and whose hair contains floating symbols and sleeping animals"
        ],
        epic: [
            "Portrait of the personification of Earth, showing the passage of geological time through their features - mountains in their bones, forests in their hair, oceans in their eyes",
            "Create a portrait of a cosmic being whose body contains entire solar systems, with planets orbiting within their silhouette"
        ]
    }
};

const mediumTips = {
    drawing: "Try different pencil weights for depth. Use cross-hatching for shadows and texture.",
    painting: "Layer colors while wet for blending, or let dry between layers for crisp edges.",
    digital: "Use layers for easy editing. Try different brushes to create unique textures.",
    sculpture: "Consider your material's properties. Think about how light will hit the surface.",
    'mixed-media': "Combine unexpected materials. Let each medium's strength enhance the others.",
    photography: "Use lighting to create mood. Consider composition and the story you're telling.",
    any: "Focus on the core idea first, then choose the medium that best expresses it."
};

function generateArtPrompt() {
    const medium = document.getElementById('promptMedium').value;
    const style = document.getElementById('promptStyle').value;
    const complexity = document.getElementById('promptComplexity').value;
    const mood = document.getElementById('promptMood').value;
    
    const resultsDiv = document.getElementById('promptResults');
    const contentDiv = document.getElementById('promptContent');
    const tipsDiv = document.getElementById('promptTips');
    
    let prompt = '';
    let moodModifier = '';
    
    // Get base prompt
    if (style === 'random') {
        // Pick random style and prompt
        const styles = Object.keys(artPrompts);
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const prompts = artPrompts[randomStyle][complexity];
        prompt = prompts[Math.floor(Math.random() * prompts.length)];
    } else {
        const prompts = artPrompts[style][complexity];
        prompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
    
    // Add mood modifier if not 'any'
    if (mood !== 'any') {
        switch (mood) {
            case 'dark':
                moodModifier = ' Render this with a dark, gothic atmosphere using deep shadows and mysterious lighting.';
                break;
            case 'whimsical':
                moodModifier = ' Give this a whimsical, playful feeling with bright colors and charming details.';
                break;
            case 'epic':
                moodModifier = ' Make this feel epic and heroic with dramatic lighting and grand scale.';
                break;
            case 'peaceful':
                moodModifier = ' Create a peaceful, serene mood with soft colors and gentle lighting.';
                break;
            case 'chaotic':
                moodModifier = ' Infuse this with chaotic energy using wild colors and dynamic movement.';
                break;
        }
    }
    
    // Special creature combinations for creature prompts
    if (style === 'creature' && complexity === 'simple') {
        const animals1 = ['cat', 'dog', 'bird', 'fish', 'rabbit', 'fox', 'bear', 'deer', 'wolf', 'owl', 'snake', 'turtle'];
        const animals2 = ['octopus', 'butterfly', 'dragon', 'phoenix', 'jellyfish', 'mantis', 'spider', 'moth', 'eel', 'gecko', 'peacock', 'pangolin'];
        const animal1 = animals1[Math.floor(Math.random() * animals1.length)];
        const animal2 = animals2[Math.floor(Math.random() * animals2.length)];
        prompt = `A ${animal1} with characteristics of a ${animal2}`;
    }
    
    // Get medium-specific tips
    const tips = mediumTips[medium] || mediumTips.any;
    
    contentDiv.innerHTML = `"${prompt}${moodModifier}"`;
    tipsDiv.innerHTML = `<strong>Medium Tips:</strong> ${tips}`;
    
    resultsDiv.style.display = 'block';
}

function generateLayoutAdvice() {
    // Legacy function - replaced by generateArtPrompt
    generateArtPrompt();
}

// Enhanced Design Decision Helper Functions
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
    
    // Generate all recommendation categories
    generateColorRecommendations(projectTypeValue, audienceValue, moodValue);
    generateTypographyRecommendations(projectTypeValue, audienceValue, moodValue);
    generateLayoutRecommendations(projectTypeValue, audienceValue, moodValue);
    generateDesignTips(projectTypeValue, audienceValue, moodValue);
    
    // Generate enhanced recommendation categories
    generateBrandingRecommendations(projectTypeValue, audienceValue, moodValue);
    generateUXRecommendations(projectTypeValue, audienceValue, moodValue);
    generateTechnicalRecommendations(projectTypeValue, audienceValue, moodValue);
    generateIndustryRecommendations(projectTypeValue, audienceValue, moodValue);
    generateTrendsRecommendations(projectTypeValue, audienceValue, moodValue);
}

// New Enhanced Recommendation Functions
function generateBrandingRecommendations(projectType, audience, mood) {
    console.log('generateBrandingRecommendations called');
    
    const brandingDiv = document.getElementById('brandingRecommendations');
    const brandingContent = document.getElementById('brandingContent');
    
    if (!brandingDiv || !brandingContent) {
        console.error('Branding recommendations elements not found');
        return;
    }
    
    const brandingAdvice = {
        logo: {
            professional: "Focus on simplicity and memorability. Your logo should work in one color and at any size. Consider how it will look on business cards and billboards.",
            casual: "Be more playful with your approach. Hand-drawn elements or friendly mascots can work well for casual brands.",
            youth: "Embrace bold colors and modern trends. Consider animated versions for digital use.",
            creative: "Let your artistic style shine through, but maintain versatility across different applications."
        },
        poster: {
            trustworthy: "Use established visual hierarchies and professional imagery. Include clear contact information and credentials.",
            exciting: "Create visual impact with dynamic compositions and high-contrast elements. Use action words and energetic layouts.",
            luxurious: "Emphasize quality through premium paper stocks, elegant typography, and sophisticated color palettes."
        },
        website: {
            professional: "Establish trust through clean layouts, professional photography, and clear navigation. Include testimonials and credentials prominently.",
            youth: "Use modern design patterns, social media integration, and mobile-first design approaches.",
            general: "Focus on user experience and accessibility. Ensure your brand personality comes through in micro-interactions and content tone."
        }
    };
    
    const advice = brandingAdvice[projectType]?.[audience] || brandingAdvice[projectType]?.[mood] || 
                  "Ensure consistent brand application across all touchpoints. Your visual identity should reflect your values and resonate with your target audience.";
    
    brandingContent.innerHTML = `
        <div style="margin-bottom: 15px;">
            <h4 style="color: #3498db; margin: 0 0 10px 0; font-size: 0.95rem;">Brand Identity Guidelines</h4>
            <p style="margin: 0 0 10px 0;">${advice}</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
                <h5 style="color: #f8c8d0; margin: 0 0 8px 0; font-size: 0.85rem;">Key Elements</h5>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.8rem; line-height: 1.5;">
                    <li>Consistent color usage across all materials</li>
                    <li>Typography that matches your brand voice</li>
                    <li>Imagery style that supports your message</li>
                    <li>Logo placement and sizing guidelines</li>
                </ul>
            </div>
            <div>
                <h5 style="color: #f8c8d0; margin: 0 0 8px 0; font-size: 0.85rem;">Brand Application</h5>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.8rem; line-height: 1.5;">
                    <li>Business cards and stationery</li>
                    <li>Digital presence (website, social media)</li>
                    <li>Marketing materials and packaging</li>
                    <li>Environmental graphics and signage</li>
                </ul>
            </div>
        </div>
    `;
    
    brandingDiv.style.display = 'block';
    console.log('Branding recommendations generated successfully');
}

function generateUXRecommendations(projectType, audience, mood) {
    console.log('generateUXRecommendations called');
    
    const uxDiv = document.getElementById('uxRecommendations');
    const uxContent = document.getElementById('uxContent');
    
    if (!uxDiv || !uxContent) {
        console.error('UX recommendations elements not found');
        return;
    }
    
    const uxGuidelines = {
        website: "Prioritize page load speed, mobile responsiveness, and intuitive navigation. Users should find what they need within 3 clicks.",
        presentation: "Design for readability from the back of the room. Use large fonts, high contrast, and minimal text per slide.",
        poster: "Create a clear visual hierarchy that guides the eye through the most important information first.",
        invitation: "Make essential details (date, time, location) immediately scannable. Consider how the design will look when printed.",
        social: "Optimize for each platform's specific dimensions and viewing contexts. Consider how it will look in feeds vs. stories.",
        packaging: "Balance shelf appeal with functional information. Consider the unboxing experience and sustainability."
    };
    
    const accessibilityTips = [
        "Ensure color contrast ratios meet WCAG guidelines (4.5:1 for normal text)",
        "Use alt text for images and descriptive link text",
        "Design for users with motor impairments - make clickable areas large enough",
        "Test with screen readers and keyboard navigation",
        "Avoid using color alone to convey important information",
        "Provide multiple ways to access the same information"
    ];
    
    const guidelines = uxGuidelines[projectType] || "Focus on user needs and test your design with real users for feedback.";
    const randomTips = accessibilityTips.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    uxContent.innerHTML = `
        <div style="margin-bottom: 15px;">
            <h4 style="color: #e67e22; margin: 0 0 10px 0; font-size: 0.95rem;">User Experience Guidelines</h4>
            <p style="margin: 0 0 15px 0;">${guidelines}</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h5 style="color: #f8c8d0; margin: 0 0 10px 0; font-size: 0.85rem;">♿ Accessibility Checklist</h5>
            <ul style="margin: 0; padding-left: 18px; font-size: 0.8rem; line-height: 1.5;">
                ${randomTips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
        <div style="background: rgba(230, 126, 34, 0.15); padding: 12px; border-radius: 6px; border-left: 3px solid #e67e22;">
            <p style="margin: 0; font-size: 0.8rem; font-style: italic;">
                💡 <strong>Remember:</strong> Good design is accessible design. When you design for people with disabilities, 
                you create better experiences for everyone.
            </p>
        </div>
    `;
    
    uxDiv.style.display = 'block';
    console.log('UX recommendations generated successfully');
}

function generateTechnicalRecommendations(projectType, audience, mood) {
    console.log('generateTechnicalRecommendations called');
    
    const techDiv = document.getElementById('technicalRecommendations');
    const techContent = document.getElementById('technicalContent');
    
    if (!techDiv || !techContent) {
        console.error('Technical recommendations elements not found');
        return;
    }
    
    const technicalSpecs = {
        logo: {
            formats: "Vector formats (AI, EPS, SVG) for scalability, PNG with transparency for web",
            resolution: "Vector-based for infinite scalability, 300 DPI minimum for print applications",
            colors: "CMYK for print, RGB for digital, Pantone colors for brand consistency"
        },
        poster: {
            formats: "High-resolution PDF for print, JPEG for digital sharing",
            resolution: "300 DPI for print, 72 DPI for digital display",
            dimensions: "Common sizes: 18x24\", 24x36\", A3, A2. Include 0.125\" bleed for print"
        },
        website: {
            formats: "WebP for modern browsers, JPEG fallbacks, SVG for icons",
            resolution: "Optimize images for web (under 1MB), use responsive images",
            performance: "Optimize for Core Web Vitals, use compression, implement lazy loading"
        },
        social: {
            formats: "JPEG or PNG for static posts, MP4 for videos, GIF for short animations",
            dimensions: "Platform-specific: Instagram 1080x1080, Facebook 1200x630, Twitter 1200x675",
            fileSize: "Keep under platform limits: Instagram 30MB, Facebook 25MB"
        }
    };
    
    const specs = technicalSpecs[projectType] || technicalSpecs.website;
    
    techContent.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
                <h5 style="color: #f8c8d0; margin: 0 0 8px 0; font-size: 0.85rem;">📁 File Formats</h5>
                <p style="margin: 0; font-size: 0.8rem; line-height: 1.4;">${specs.formats}</p>
            </div>
            <div>
                <h5 style="color: #f8c8d0; margin: 0 0 8px 0; font-size: 0.85rem;">🔍 Resolution & Quality</h5>
                <p style="margin: 0; font-size: 0.8rem; line-height: 1.4;">${specs.resolution}</p>
            </div>
        </div>
        <div style="margin-bottom: 15px;">
            <h5 style="color: #f8c8d0; margin: 0 0 8px 0; font-size: 0.85rem;">🎨 Color Management</h5>
            <p style="margin: 0; font-size: 0.8rem; line-height: 1.4;">${specs.colors || "Use consistent color profiles and consider viewing conditions"}</p>
        </div>
        <div style="background: rgba(46, 204, 113, 0.15); padding: 12px; border-radius: 6px; border-left: 3px solid #2ecc71;">
            <p style="margin: 0; font-size: 0.8rem; font-style: italic;">
                ⚙️ <strong>Pro Tip:</strong> Always save your original working files in the native application format. 
                Export multiple versions for different use cases, and maintain an organized file naming system.
            </p>
        </div>
    `;
    
    techDiv.style.display = 'block';
    console.log('Technical recommendations generated successfully');
}

function generateIndustryRecommendations(projectType, audience, mood) {
    console.log('generateIndustryRecommendations called');
    
    const industryDiv = document.getElementById('industryRecommendations');
    const industryContent = document.getElementById('industryContent');
    
    if (!industryDiv || !industryContent) {
        console.error('Industry recommendations elements not found');
        return;
    }
    
    const industryGuidelines = {
        professional: {
            healthcare: "Use calming colors, ensure HIPAA compliance in digital materials, prioritize accessibility",
            legal: "Conservative typography, high contrast for readability, formal tone in all communications",
            financial: "Emphasize security and trust, use professional imagery, include required disclaimers",
            education: "Consider diverse audiences, ensure readability at various education levels, include institutional branding"
        },
        creative: {
            entertainment: "Bold visuals, trend-aware design, consider motion graphics for digital applications",
            arts: "Let artistic vision lead, but maintain professional presentation for grants and exhibitions",
            fashion: "Emphasis on visual appeal, seasonal trends, high-quality photography essential",
            food: "Appetite appeal through color and imagery, consider cultural dietary restrictions in messaging"
        }
    };
    
    const audienceType = audience === 'professional' ? 'professional' : 'creative';
    const guidelines = industryGuidelines[audienceType];
    
    let content = '';
    if (guidelines) {
        const industries = Object.keys(guidelines);
        const randomIndustries = industries.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        content = `
            <div style="margin-bottom: 15px;">
                <h4 style="color: #9b59b6; margin: 0 0 10px 0; font-size: 0.95rem;">Industry-Specific Considerations</h4>
                ${randomIndustries.map(industry => `
                    <div style="margin-bottom: 12px;">
                        <h5 style="color: #f8c8d0; margin: 0 0 6px 0; font-size: 0.85rem; text-transform: capitalize;">
                            🏢 ${industry}
                        </h5>
                        <p style="margin: 0; font-size: 0.8rem; line-height: 1.4;">${guidelines[industry]}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    content += `
        <div style="margin-bottom: 15px;">
            <h5 style="color: #f8c8d0; margin: 0 0 8px 0; font-size: 0.85rem;">📋 General Best Practices</h5>
            <ul style="margin: 0; padding-left: 18px; font-size: 0.8rem; line-height: 1.5;">
                <li>Research your industry's visual standards and expectations</li>
                <li>Consider regulatory requirements and compliance needs</li>
                <li>Study successful competitors while maintaining your unique voice</li>
                <li>Adapt your design for industry-specific platforms and contexts</li>
            </ul>
        </div>
        <div style="background: rgba(155, 89, 182, 0.15); padding: 12px; border-radius: 6px; border-left: 3px solid #9b59b6;">
            <p style="margin: 0; font-size: 0.8rem; font-style: italic;">
                🏢 <strong>Industry Insight:</strong> Every industry has unwritten visual rules. 
                Understanding these conventions helps you know when to follow them and when to break them strategically.
            </p>
        </div>
    `;
    
    industryContent.innerHTML = content;
    industryDiv.style.display = 'block';
    console.log('Industry recommendations generated successfully');
}

function generateTrendsRecommendations(projectType, audience, mood) {
    console.log('generateTrendsRecommendations called');
    
    const trendsDiv = document.getElementById('trendsRecommendations');
    const trendsContent = document.getElementById('trendsContent');
    
    if (!trendsDiv || !trendsContent) {
        console.error('Trends recommendations elements not found');
        return;
    }
    
    const currentTrends = [
        {
            name: "Inclusive Design",
            description: "Designing for diverse abilities, cultures, and experiences from the start",
            application: "Use diverse imagery, ensure accessibility, consider cultural contexts"
        },
        {
            name: "Sustainable Design",
            description: "Environmentally conscious design choices and production methods",
            application: "Choose eco-friendly materials, optimize for digital delivery, consider lifecycle impact"
        },
        {
            name: "Authentic Photography",
            description: "Real, unfiltered images over stock photography and AI-generated content",
            application: "Invest in original photography, show real people and genuine moments"
        },
        {
            name: "Bold Typography",
            description: "Large, expressive fonts that make strong statements",
            application: "Use typography as a design element, experiment with font pairing, ensure readability"
        },
        {
            name: "Micro-Interactions",
            description: "Small animated details that enhance user experience",
            application: "Add subtle hover effects, loading animations, and feedback mechanisms"
        },
        {
            name: "Data Visualization",
            description: "Making complex information accessible through visual design",
            application: "Use charts, infographics, and interactive elements to explain data"
        },
        {
            name: "Retro Revival",
            description: "Nostalgic design elements from past decades with modern execution",
            application: "Incorporate vintage colors, retro typography, but keep functionality current"
        },
        {
            name: "Minimalist Maximalism",
            description: "Bold, expressive design within clean, organized layouts",
            application: "Use white space strategically, choose one bold element per design, maintain clarity"
        }
    ];
    
    const randomTrends = currentTrends.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    trendsContent.innerHTML = `
        <div style="margin-bottom: 15px;">
            <h4 style="color: #e74c3c; margin: 0 0 10px 0; font-size: 0.95rem;">🔥 Current Design Trends</h4>
            <p style="margin: 0 0 15px 0; font-size: 0.8rem;">
                Stay current with these trending approaches, but remember that timeless design principles always matter more than trends.
            </p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            ${randomTrends.map(trend => `
                <div style="background: rgba(231, 76, 60, 0.1); padding: 12px; border-radius: 6px;">
                    <h5 style="color: #f8c8d0; margin: 0 0 6px 0; font-size: 0.85rem;">${trend.name}</h5>
                    <p style="margin: 0 0 8px 0; font-size: 0.75rem; line-height: 1.4;">${trend.description}</p>
                    <p style="margin: 0; font-size: 0.7rem; font-style: italic; color: rgba(255,255,255,0.8);">
                        💡 ${trend.application}
                    </p>
                </div>
            `).join('')}
        </div>
        <div style="background: rgba(231, 76, 60, 0.15); padding: 12px; border-radius: 6px; border-left: 3px solid #e74c3c;">
            <p style="margin: 0; font-size: 0.8rem; font-style: italic;">
                🔥 <strong>Trend Strategy:</strong> Use trends to inspire and modernize your work, 
                but don't chase every trend. Focus on those that align with your brand and audience needs.
            </p>
        </div>
    `;
    
    trendsDiv.style.display = 'block';
    console.log('Trends recommendations generated successfully');
}

function generateColorRecommendations(projectType, audience, mood) {
    console.log('generateColorRecommendations called with:', projectType, audience, mood);
    
    // Enhanced color schemes with more variety and intelligence
    const colorSchemeDatabase = {
        // Mood-based palettes
        trustworthy: [
            { colors: ['#1E3A8A', '#3B82F6', '#60A5FA', '#DBEAFE'], name: "Corporate Blue", description: "Professional blues that build trust and reliability" },
            { colors: ['#064E3B', '#059669', '#34D399', '#ECFDF5'], name: "Financial Green", description: "Money-associated greens for financial and investment services" },
            { colors: ['#1F2937', '#4B5563', '#9CA3AF', '#F9FAFB'], name: "Executive Gray", description: "Sophisticated neutrals for executive and consulting brands" },
            { colors: ['#7C2D12', '#DC2626', '#F87171', '#FEE2E2'], name: "Heritage Red", description: "Traditional reds that convey stability and heritage" }
        ],
        friendly: [
            { colors: ['#FFF7ED', '#FDBA74', '#F97316', '#EA580C'], name: "Warm Orange", description: "Inviting oranges that create warmth and approachability" },
            { colors: ['#F0FDF4', '#86EFAC', '#22C55E', '#15803D'], name: "Fresh Green", description: "Natural greens that feel welcoming and organic" },
            { colors: ['#FFF1F2', '#FBBF24', '#F59E0B', '#D97706'], name: "Sunny Yellow", description: "Cheerful yellows that brighten and welcome" },
            { colors: ['#FDF2F8', '#F9A8D4', '#EC4899', '#BE185D'], name: "Gentle Pink", description: "Soft pinks that feel caring and approachable" }
        ],
        exciting: [
            { colors: ['#581C87', '#C026D3', '#E879F9', '#F5D0FE'], name: "Electric Purple", description: "High-energy purples that create excitement and innovation" },
            { colors: ['#7F1D1D', '#DC2626', '#F87171', '#FEE2E2'], name: "Bold Red", description: "Passionate reds that demand attention and action" },
            { colors: ['#166534', '#16A34A', '#4ADE80', '#DCFCE7'], name: "Vibrant Lime", description: "Electric greens that feel fresh and energetic" },
            { colors: ['#1E1B4B', '#4338CA', '#6366F1', '#E0E7FF'], name: "Dynamic Blue", description: "Energetic blues that suggest movement and progress" }
        ],
        calm: [
            { colors: ['#F0F9FF', '#7DD3FC', '#0EA5E9', '#0284C7'], name: "Ocean Breeze", description: "Peaceful blues like calm waters" },
            { colors: ['#F0FDF4', '#BBF7D0', '#4ADE80', '#22C55E'], name: "Sage Garden", description: "Tranquil greens inspired by nature" },
            { colors: ['#FDF4FF', '#DDD6FE', '#A78BFA', '#8B5CF6'], name: "Lavender Field", description: "Soothing purples that promote relaxation" },
            { colors: ['#FFFBEB', '#FDE68A', '#F59E0B', '#D97706'], name: "Sunset Glow", description: "Warm, comforting tones like a peaceful sunset" }
        ],
        luxurious: [
            { colors: ['#1C1917', '#A16207', '#EAB308', '#FEF3C7'], name: "Royal Gold", description: "Rich golds that suggest premium quality and exclusivity" },
            { colors: ['#581C87', '#7C3AED', '#A78BFA', '#EDE9FE'], name: "Imperial Purple", description: "Regal purples that convey luxury and sophistication" },
            { colors: ['#0C0A09', '#1C1917', '#78716C', '#F5F5F4'], name: "Platinum Elite", description: "Sophisticated metallics for high-end brands" },
            { colors: ['#450A0A', '#991B1B', '#DC2626', '#FEE2E2'], name: "Ruby Prestige", description: "Deep reds that suggest opulence and refinement" }
        ],
        fun: [
            { colors: ['#FFF7ED', '#FB923C', '#EA580C', '#C2410C'], name: "Playful Orange", description: "Energetic oranges that spark joy and creativity" },
            { colors: ['#F0F9FF', '#38BDF8', '#0EA5E9', '#0284C7'], name: "Splash Blue", description: "Refreshing blues that feel playful and free" },
            { colors: ['#FEFCE8', '#BEF264', '#65A30D', '#4D7C0F'], name: "Lime Pop", description: "Zesty greens that burst with energy" },
            { colors: ['#FDF2F8', '#F472B6', '#EC4899', '#BE185D'], name: "Bubblegum Pink", description: "Sweet pinks that feel youthful and fun" }
        ],
        serious: [
            { colors: ['#0F172A', '#334155', '#64748B', '#CBD5E1'], name: "Charcoal Professional", description: "Authoritative grays for serious business" },
            { colors: ['#1E1B4B', '#3730A3', '#4F46E5', '#C7D2FE'], name: "Navy Authority", description: "Deep blues that command respect" },
            { colors: ['#1C1917', '#44403C', '#78716C', '#E7E5E4'], name: "Stone Executive", description: "Refined earth tones for executive presence" },
            { colors: ['#450A0A', '#7F1D1D', '#991B1B', '#FECACA'], name: "Burgundy Power", description: "Deep reds that suggest strength and authority" }
        ],
        creative: [
            { colors: ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981'], name: "Artist Spectrum", description: "Bold, artistic colors that inspire creativity" },
            { colors: ['#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'], name: "Creative Burst", description: "Vibrant mix that sparks imagination" },
            { colors: ['#84CC16', '#F59E0B', '#EF4444', '#8B5CF6'], name: "Designer's Choice", description: "Dynamic palette for creative professionals" },
            { colors: ['#06B6D4', '#84CC16', '#F59E0B', '#EF4444'], name: "Innovation Flow", description: "Flowing colors that suggest creative thinking" }
        ]
    };
    
    // Project-specific palettes
    const projectSpecificPalettes = {
        logo: {
            tech: { colors: ['#1E293B', '#3B82F6', '#06B6D4', '#E2E8F0'], name: "Tech Innovation", description: "Modern blues for technology companies" },
            health: { colors: ['#064E3B', '#059669', '#A7F3D0', '#ECFDF5'], name: "Medical Trust", description: "Clean greens that suggest health and wellness" },
            food: { colors: ['#DC2626', '#F59E0B', '#65A30D', '#FEF3C7'], name: "Appetite Appeal", description: "Warm colors that stimulate appetite" }
        },
        website: {
            ecommerce: { colors: ['#1E40AF', '#3B82F6', '#DBEAFE', '#F8FAFC'], name: "E-commerce Blue", description: "Trustworthy blues for online shopping" },
            portfolio: { colors: ['#1F2937', '#6B7280', '#D1D5DB', '#F9FAFB'], name: "Portfolio Neutral", description: "Sophisticated grays that let content shine" },
            blog: { colors: ['#7C2D12', '#EA580C', '#FED7AA', '#FFFBEB'], name: "Editorial Warm", description: "Readable browns for content-focused sites" }
        },
        poster: {
            event: { colors: ['#7C2D12', '#DC2626', '#FBBF24', '#FEF3C7'], name: "Event Energy", description: "High-impact colors for event promotion" },
            music: { colors: ['#581C87', '#C026D3', '#F472B6', '#FAE8FF'], name: "Music Vibe", description: "Electric purples for music events" },
            art: { colors: ['#064E3B', '#10B981', '#6EE7B7', '#D1FAE5'], name: "Gallery Green", description: "Sophisticated greens for art exhibitions" }
        }
    };
    
    // Audience-specific adjustments
    const audienceAdjustments = {
        youth: "vibrant_high_contrast",
        seniors: "high_contrast_readable",
        professional: "conservative_trustworthy",
        creative: "bold_experimental"
    };
    
    // Get base palettes from mood
    let availablePalettes = colorSchemeDatabase[mood] || colorSchemeDatabase.trustworthy;
    
    // Add project-specific palettes if available
    if (projectSpecificPalettes[projectType]) {
        availablePalettes = [...availablePalettes, ...Object.values(projectSpecificPalettes[projectType])];
    }
    
    // Select multiple palettes for variety
    const selectedPalettes = availablePalettes.slice(0, 3);
    
    const colorRecommendationsDiv = document.getElementById('colorRecommendations');
    const colorSwatchesDiv = document.getElementById('colorSwatches');
    
    if (!colorRecommendationsDiv || !colorSwatchesDiv) {
        console.error('Color recommendation elements not found');
        return;
    }
    
    // Generate recommendations text
    const audienceNote = audience === 'seniors' ? 
        "<br><strong>Accessibility note:</strong> Using high contrast combinations for better readability." :
        audience === 'youth' ? 
        "<br><strong>Youth appeal:</strong> Bold, trendy colors that resonate with younger audiences." :
        "";
    
    colorRecommendationsDiv.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p style="margin-bottom: 10px;"><strong>Curated for your ${projectType} targeting ${audience} with a ${mood} mood:</strong></p>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8);">We've selected ${selectedPalettes.length} complementary palettes based on your preferences. Each palette includes 4 colors: primary, secondary, accent, and background.${audienceNote}</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h4 style="color: #f8c8d0; margin: 0 0 10px 0; font-size: 0.95rem;">Usage Guidelines</h4>
            <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; line-height: 1.5;">
                <li><strong>Primary (darkest):</strong> Main brand color, headers, important text</li>
                <li><strong>Secondary:</strong> Supporting elements, buttons, links</li>
                <li><strong>Accent (brightest):</strong> Call-to-action buttons, highlights</li>
                <li><strong>Background (lightest):</strong> Backgrounds, subtle elements</li>
            </ul>
        </div>
    `;
    
    // Generate color swatches for all selected palettes
    const paletteSwatchesHtml = selectedPalettes.map((palette, index) => `
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.1); border-radius: 8px;">
            <h5 style="color: #f8c8d0; margin: 0 0 8px 0; font-size: 0.9rem;">${palette.name}</h5>
            <p style="margin: 0 0 12px 0; font-size: 0.8rem; color: rgba(255,255,255,0.8);">${palette.description}</p>
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                ${palette.colors.map((color, colorIndex) => {
                    const labels = ['Primary', 'Secondary', 'Accent', 'Background'];
                    return `<div style="text-align: center;">
                        <div style="width: 50px; height: 50px; background: ${color}; border-radius: 6px; margin-bottom: 4px; border: 1px solid rgba(255,255,255,0.1);"></div>
                        <div style="font-size: 0.65rem; color: rgba(255,255,255,0.7); margin-bottom: 2px;">${labels[colorIndex]}</div>
                        <div style="font-size: 0.6rem; color: white; font-family: monospace;">${color}</div>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `).join('');
    
    colorSwatchesDiv.innerHTML = paletteSwatchesHtml;
    console.log('Enhanced color recommendations generated successfully');
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

// Quick Font Tips Generator
function generateFontTips() {
    console.log('Generating quick font tips...');
    
    const fontTips = [
        {
            category: "Sans-Serif Fonts",
            fonts: ["Helvetica", "Arial", "Open Sans", "Roboto", "Lato"],
            use: "Clean, modern, and highly readable. Perfect for websites, presentations, and contemporary designs."
        },
        {
            category: "Serif Fonts", 
            fonts: ["Times New Roman", "Georgia", "Baskerville", "Playfair Display", "Crimson Text"],
            use: "Traditional and elegant. Great for books, formal documents, and luxury branding."
        },
        {
            category: "Script Fonts",
            fonts: ["Pacifico", "Dancing Script", "Great Vibes", "Allura", "Sacramento"],
            use: "Decorative and personal. Use sparingly for headers, invitations, or artistic touches."
        },
        {
            category: "Display Fonts",
            fonts: ["Impact", "Bebas Neue", "Oswald", "Anton", "Fredoka One"],
            use: "Bold and attention-grabbing. Perfect for headlines, posters, and making a statement."
        }
    ];
    
    const generalTips = [
        "Never use more than 2-3 different fonts in one design",
        "Ensure good contrast between text and background",
        "Test readability at different sizes and distances",
        "Consider your audience - formal vs. casual contexts",
        "Sans-serif fonts work better for digital screens",
        "Serif fonts can enhance readability in long text blocks"
    ];
    
    const randomCategory = fontTips[Math.floor(Math.random() * fontTips.length)];
    const randomTips = generalTips.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Create a simple alert with the tips
    const message = `🔤 FONT RECOMMENDATION: ${randomCategory.category}

✨ Try these fonts: ${randomCategory.fonts.slice(0, 3).join(', ')}

📖 Best for: ${randomCategory.use}

💡 Quick Tips:
${randomTips.map(tip => `• ${tip}`).join('\n')}

🎨 Pro Tip: Always prioritize readability over style!`;
    
    alert(message);
    console.log('Font tips generated successfully');
}
