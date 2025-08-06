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

// Reference Image Analyzer
function analyzeReferenceImage() {
    const input = document.getElementById('referenceImageInput');
    const file = input.files[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;
        document.getElementById('previewImage').src = imgSrc;
        document.getElementById('analysisResults').style.display = 'block';
        
        // Simulate analysis
        setTimeout(() => {
            displayImageAnalysis(imgSrc);
        }, 1000);
    };
    
    reader.readAsDataURL(file);
}

function displayImageAnalysis(imgSrc) {
    // Simulate color extraction
    const colors = ['#8B4513', '#228B22', '#4169E1', '#FFD700', '#DC143C'];
    
    document.getElementById('colorPalette').innerHTML = colors.map(color => `
        <div style="background: ${color}; height: 40px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem; font-weight: bold;">
            ${color}
        </div>
    `).join('');
    
    document.getElementById('compositionAnalysis').innerHTML = `
        <strong>🎯 Focal Point:</strong> Upper third, following rule of thirds<br>
        <strong>📐 Balance:</strong> Asymmetrical, creates visual interest<br>
        <strong>↗️ Leading Lines:</strong> Diagonal elements guide the eye<br>
        <strong>🌈 Color Harmony:</strong> Complementary scheme creates contrast
    `;
    
    document.getElementById('lightingAnalysis').innerHTML = `
        <strong>☀️ Light Source:</strong> Natural, soft directional light<br>
        <strong>🌡️ Color Temperature:</strong> Warm (3200K-4000K)<br>
        <strong>🎭 Contrast:</strong> Medium contrast with soft shadows<br>
        <strong>📍 Direction:</strong> Upper left, creates depth and dimension
    `;
    
    document.getElementById('artistTips').innerHTML = `
        <strong>🎨 Technique Tips:</strong><br>
        • Use warm undertones to match the lighting mood<br>
        • Pay attention to reflected light in shadow areas<br>
        • Consider the atmospheric perspective for depth<br>
        <strong>🎭 Mood Suggestions:</strong><br>
        • Emphasize the golden hour warmth<br>
        • Use soft edges to maintain the gentle feeling
    `;
}

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
