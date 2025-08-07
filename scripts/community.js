/**
 * Community Garden JavaScript
 * Handles artwork submissions, gallery display, and interactions
 */

// Community data storage (in a real app, this would connect to a backend)
let communityArtworks = [];
let submissionCount = 0;

// Monthly Art Challenges - Updates automatically on the 1st of each month
const monthlyArtChallenges = [
    {
        title: "New Beginnings",
        description: "Create artwork that represents fresh starts, transformation, or rebirth. Explore themes of renewal and growth.",
        theme: "Renewal, transformation, new perspectives",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 0 // January
    },
    {
        title: "Love & Connection",
        description: "Express the many forms of love - romantic, familial, self-love, or love for your community and culture.",
        theme: "Love, relationships, emotional bonds",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions", 
        month: 1 // February
    },
    {
        title: "Cultural Roots",
        description: "Create artwork that explores your cultural heritage and identity. Use mixed media, symbolism, or personal narratives to express your roots.",
        theme: "Cultural identity, heritage, family stories",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 2 // March
    },
    {
        title: "Spring Awakening",
        description: "Capture the energy of spring renewal through art. Focus on growth, blooming, and the awakening of nature.",
        theme: "Growth, renewal, nature's awakening",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 3 // April
    },
    {
        title: "Mother Earth",
        description: "Honor the earth and our relationship with nature. Create pieces that celebrate or raise awareness about environmental themes.",
        theme: "Nature, environment, earth connection",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 4 // May
    },
    {
        title: "Summer Dreams",
        description: "Explore the warmth and energy of summer through your art. Capture memories, dreams, or the feeling of endless possibilities.",
        theme: "Summer energy, dreams, warm memories",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 5 // June
    },
    {
        title: "Freedom & Independence",
        description: "Create artwork that explores personal freedom, independence, or liberation from constraints.",
        theme: "Freedom, independence, breaking barriers",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 6 // July
    },
    {
        title: "Harvest Reflections",
        description: "Reflect on the fruits of your labor, personal growth, or life's abundance through artistic expression.",
        theme: "Harvest, abundance, reflection",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 7 // August
    },
    {
        title: "Back to Roots",
        description: "As autumn arrives, create art that connects you to your foundations, traditions, or ancestral wisdom.",
        theme: "Traditions, ancestral wisdom, foundations",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 8 // September
    },
    {
        title: "Transformation",
        description: "Capture the changing season and personal transformations. Explore themes of change and metamorphosis.",
        theme: "Change, metamorphosis, personal growth",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 9 // October
    },
    {
        title: "Gratitude & Reflection",
        description: "Create artwork that expresses gratitude and reflection on the year's journey and blessings.",
        theme: "Gratitude, reflection, thankfulness",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 10 // November
    },
    {
        title: "Year's End Magic",
        description: "Celebrate the magic of endings and new beginnings. Create art that captures the spirit of the year's close.",
        theme: "Endings, new beginnings, year-end magic",
        medium: "Any (digital, traditional, mixed media)",
        size: "No restrictions",
        month: 11 // December
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhanced features
    initPathwaySelector();
    initResourceTabs();
    initWeeklyProgress();
    initLearningPathways();
    initChallengeAnalytics();
    initEnhancedInspiration();
    initTechniquePicker();
    initInspirationCarousel();
    initCommunityPrompts();
});

// Enhanced Inspiration Carousel
function initInspirationCarousel() {
    const carousel = document.querySelector('.inspiration-cards');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');
    
    if (!carousel) return;
    
    let currentSlide = 0;
    const cards = document.querySelectorAll('.inspiration-card');
    const totalCards = cards.length;
    
    // Create carousel data for demo
    const inspirationData = [
        {
            title: "Abuela's Wisdom",
            artist: "Maria Santos",
            technique: "Photo Collage",
            description: "Layering family photographs with traditional patterns to show generational connection.",
            prompt: "Combine old family photos with cultural symbols from your heritage"
        },
        {
            title: "Dual Heritage",
            artist: "Alex Chen-Rodriguez",
            technique: "Mixed Media",
            description: "Using split compositions to represent navigating between two cultures.",
            prompt: "Create a visual representation of your multicultural identity"
        },
        {
            title: "Migration Story",
            artist: "Fatima Al-Zahra",
            technique: "Digital Collage",
            description: "Mapping personal journey through symbolic landscapes and objects.",
            prompt: "Tell your family's migration story through symbolic imagery"
        }
    ];
    
    function updateCarousel() {
        cards.forEach((card, index) => {
            card.style.display = index === currentSlide ? 'block' : 'none';
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update featured card
        cards.forEach(card => card.classList.remove('featured'));
        if (cards[currentSlide]) {
            cards[currentSlide].classList.add('featured');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalCards;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalCards) % totalCards;
        updateCarousel();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-rotate every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize
    updateCarousel();
}

// Interactive Technique Picker
function initTechniquePicker() {
    const techniqueOptions = document.querySelectorAll('.technique-option');
    const selectBtns = document.querySelectorAll('.select-technique-btn');
    
    // Add hover effects and selection handling
    techniqueOptions.forEach((option, index) => {
        const btn = option.querySelector('.select-technique-btn');
        
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                selectTechnique(option, index);
            });
        }
        
        // Add interactive hover effects
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'translateY(-8px)';
        });
        
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'translateY(0)';
        });
    });
}

function selectTechnique(optionElement, index) {
    const difficulty = optionElement.dataset.difficulty;
    const techniques = optionElement.querySelectorAll('.tech-tag');
    const techList = Array.from(techniques).map(tech => tech.textContent);
    
    // Visual feedback
    optionElement.style.background = 'rgba(248, 200, 208, 0.15)';
    optionElement.style.borderColor = 'var(--color-primary-accent)';
    
    // Store selection in localStorage
    const selection = {
        difficulty: difficulty,
        techniques: techList,
        timestamp: new Date().toISOString(),
        optionIndex: index
    };
    
    localStorage.setItem('selectedTechnique', JSON.stringify(selection));
    
    // Show confirmation
    showTechniqueConfirmation(selection);
    
    // Track analytics
    trackTechniqueSelection(selection);
}

function showTechniqueConfirmation(selection) {
    const confirmationHTML = `
        <div class="technique-confirmation" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(18, 18, 18, 0.95);
            border: 2px solid var(--color-primary-accent);
            border-radius: 20px;
            padding: 2rem;
            z-index: 1000;
            text-align: center;
            max-width: 400px;
        ">
            <h4 style="color: var(--color-primary-accent); margin-bottom: 1rem;">
                Technique Selected!
            </h4>
            <p style="color: var(--color-text); margin-bottom: 1.5rem;">
                You've chosen the <strong>${selection.difficulty}</strong> level path.
                Your techniques: ${selection.techniques.join(', ')}
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: var(--color-primary-accent);
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 25px;
                cursor: pointer;
                font-family: var(--font-accent);
                text-transform: uppercase;
                letter-spacing: 1px;
            ">
                Start Creating!
            </button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        const confirmation = document.querySelector('.technique-confirmation');
        if (confirmation) confirmation.remove();
    }, 5000);
}

// Community Inspiration Prompts
function initCommunityPrompts() {
    const promptTags = document.querySelectorAll('.prompt-tag');
    
    promptTags.forEach(tag => {
        tag.addEventListener('click', () => {
            selectPrompt(tag);
        });
    });
}

function selectPrompt(tagElement) {
    const prompt = tagElement.textContent;
    
    // Visual feedback
    tagElement.style.background = 'var(--color-primary-accent)';
    tagElement.style.color = 'white';
    
    // Store selection
    const promptSelection = {
        prompt: prompt,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('selectedPrompt', JSON.stringify(promptSelection));
    
    // Show in action
    showPromptInAction(prompt);
    
    // Reset after 2 seconds
    setTimeout(() => {
        tagElement.style.background = '';
        tagElement.style.color = '';
    }, 2000);
}

function showPromptInAction(prompt) {
    const actionDiv = document.createElement('div');
    actionDiv.className = 'prompt-action';
    actionDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--color-primary-accent);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: slideInUp 0.3s ease;
    `;
    
    actionDiv.innerHTML = `
        <strong>Inspiration Selected:</strong><br>
        "${prompt}"
    `;
    
    document.body.appendChild(actionDiv);
    
    setTimeout(() => {
        actionDiv.remove();
    }, 4000);
}

// Enhanced Inspiration Features
function initEnhancedInspiration() {
    // Initialize preview gallery
    initPreviewGallery();
    
    // Initialize technique steps interaction
    initTechniqueSteps();
    
    // Initialize inspiration card interactions
    initInspirationCards();
}

function initPreviewGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainPreview = document.querySelector('.preview-image.main');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Visual feedback
            thumbnails.forEach(t => t.style.background = 'rgba(18, 18, 18, 0.6)');
            thumb.style.background = 'rgba(248, 200, 208, 0.2)';
            
            // Update main preview (would normally load different image)
            if (mainPreview) {
                const placeholder = mainPreview.querySelector('.placeholder-preview');
                if (placeholder) {
                    placeholder.style.background = 'linear-gradient(135deg, rgba(248, 200, 208, 0.2), rgba(126, 28, 46, 0.2))';
                    
                    setTimeout(() => {
                        placeholder.style.background = '';
                    }, 1000);
                }
            }
        });
    });
}

function initTechniqueSteps() {
    const steps = document.querySelectorAll('.technique-step');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            expandTechniqueStep(step, index);
        });
        
        // Mini resource buttons
        const resourceBtns = step.querySelectorAll('.mini-resource-btn');
        resourceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                showResourceModal(btn.textContent);
            });
        });
    });
}

function expandTechniqueStep(stepElement, index) {
    const isExpanded = stepElement.classList.contains('expanded');
    
    // Collapse all steps
    document.querySelectorAll('.technique-step').forEach(step => {
        step.classList.remove('expanded');
        step.style.background = '';
    });
    
    if (!isExpanded) {
        stepElement.classList.add('expanded');
        stepElement.style.background = 'rgba(248, 200, 208, 0.1)';
        
        // Add expanded content
        showStepDetails(stepElement, index);
    }
}

function showStepDetails(stepElement, index) {
    const stepDetails = [
        {
            title: "Photo Preparation",
            details: "Select meaningful family photos and scan at high resolution. Consider the emotional weight and visual composition of each image.",
            tips: ["Use photos with good contrast", "Consider black and white conversions", "Keep originals safe"]
        },
        {
            title: "Cultural Research",
            details: "Research traditional patterns, symbols, and colors from your cultural background. Document their meanings and significance.",
            tips: ["Interview family members", "Visit cultural centers", "Research online archives"]
        },
        {
            title: "Layering Techniques",
            details: "Learn digital and physical layering methods to combine photos with cultural elements seamlessly.",
            tips: ["Start with low opacity", "Use blend modes", "Consider texture overlays"]
        }
    ];
    
    const detail = stepDetails[index];
    if (detail) {
        const existingDetails = stepElement.querySelector('.step-details');
        if (existingDetails) existingDetails.remove();
        
        const detailsHTML = `
            <div class="step-details" style="
                margin-top: 1rem;
                padding: 1rem;
                background: rgba(18, 18, 18, 0.6);
                border-radius: 10px;
                border-left: 3px solid var(--color-primary-accent);
            ">
                <p style="margin-bottom: 1rem; font-style: italic;">${detail.details}</p>
                <h6 style="color: var(--color-primary-accent); margin-bottom: 0.5rem;">Pro Tips:</h6>
                <ul style="margin: 0; padding-left: 1.5rem;">
                    ${detail.tips.map(tip => `<li style="margin-bottom: 0.3rem; color: var(--color-text);">${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        
        stepElement.querySelector('.step-content').insertAdjacentHTML('beforeend', detailsHTML);
    }
}

function initInspirationCards() {
    const cards = document.querySelectorAll('.inspiration-card');
    
    cards.forEach(card => {
        const actionBtns = card.querySelectorAll('.inspiration-btn');
        
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.textContent.toLowerCase();
                handleInspirationAction(action, card);
            });
        });
    });
}

function handleInspirationAction(action, cardElement) {
    const cardTitle = cardElement.querySelector('h6').textContent;
    
    switch(action) {
        case 'try technique':
            showTechniqueGuide(cardTitle);
            break;
        case 'save inspiration':
            saveInspiration(cardTitle);
            break;
        case 'view process':
            showArtistProcess(cardTitle);
            break;
        default:
            console.log(`Action: ${action} for ${cardTitle}`);
    }
}

function showTechniqueGuide(artworkTitle) {
    const guideHTML = `
        <div class="technique-guide-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        ">
            <div style="
                background: rgba(18, 18, 18, 0.95);
                border: 2px solid var(--color-primary-accent);
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h3 style="color: var(--color-primary-accent); margin-bottom: 1rem;">
                    Technique Guide: ${artworkTitle}
                </h3>
                <div style="color: var(--color-text); line-height: 1.6;">
                    <p>This technique combines traditional photo collage with cultural storytelling...</p>
                    <h4 style="color: var(--color-primary-accent); margin: 1.5rem 0 1rem;">Materials Needed:</h4>
                    <ul style="margin-bottom: 1.5rem;">
                        <li>Family photographs</li>
                        <li>Cultural pattern references</li>
                        <li>Digital editing software or physical materials</li>
                    </ul>
                    <h4 style="color: var(--color-primary-accent); margin: 1.5rem 0 1rem;">Step by Step:</h4>
                    <ol>
                        <li style="margin-bottom: 0.5rem;">Gather meaningful family photographs</li>
                        <li style="margin-bottom: 0.5rem;">Research traditional patterns from your culture</li>
                        <li style="margin-bottom: 0.5rem;">Create composition sketches</li>
                        <li style="margin-bottom: 0.5rem;">Layer elements with intentional meaning</li>
                    </ol>
                </div>
                <button onclick="this.closest('.technique-guide-modal').remove()" style="
                    background: var(--color-primary-accent);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    cursor: pointer;
                    margin-top: 1.5rem;
                    width: 100%;
                    font-family: var(--font-accent);
                    text-transform: uppercase;
                ">
                    Close Guide
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', guideHTML);
}

function saveInspiration(artworkTitle) {
    const saved = JSON.parse(localStorage.getItem('savedInspiration') || '[]');
    const inspiration = {
        title: artworkTitle,
        savedAt: new Date().toISOString()
    };
    
    saved.push(inspiration);
    localStorage.setItem('savedInspiration', JSON.stringify(saved));
    
    // Show confirmation
    showNotification(`"${artworkTitle}" saved to your inspiration board!`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-primary-accent);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showResourceModal(resourceType) {
    const modalHTML = `
        <div class="resource-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        ">
            <div style="
                background: rgba(18, 18, 18, 0.95);
                border: 2px solid var(--color-primary-accent);
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
            ">
                <h3 style="color: var(--color-primary-accent); margin-bottom: 1rem;">
                    ${resourceType} Resources
                </h3>
                <p style="color: var(--color-text); margin-bottom: 1.5rem;">
                    Here you'll find curated resources for ${resourceType.toLowerCase()}, including tutorials, 
                    tools, and community examples.
                </p>
                <button onclick="this.closest('.resource-modal').remove()" style="
                    background: var(--color-primary-accent);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    cursor: pointer;
                    width: 100%;
                    font-family: var(--font-accent);
                    text-transform: uppercase;
                ">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Analytics for enhanced features
function trackTechniqueSelection(selection) {
    const analytics = JSON.parse(localStorage.getItem('challengeAnalytics') || '{}');
    
    if (!analytics.techniqueSelections) {
        analytics.techniqueSelections = [];
    }
    
    analytics.techniqueSelections.push(selection);
    localStorage.setItem('challengeAnalytics', JSON.stringify(analytics));
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

/**
 * Update the monthly art challenge based on current month
 */
function updateMonthlyChallenge() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentChallenge = monthlyArtChallenges[currentMonth];
    
    if (!currentChallenge) return;
    
    // Update challenge title
    const titleElement = document.querySelector('.challenge-header h3');
    if (titleElement) {
        titleElement.textContent = `Current Challenge: "${currentChallenge.title}"`;
    }
    
    // Update challenge description
    const descriptionElement = document.querySelector('.challenge-content p');
    if (descriptionElement) {
        descriptionElement.textContent = currentChallenge.description;
    }
    
    // Update challenge details
    const details = document.querySelectorAll('.detail');
    if (details.length >= 3) {
        details[0].innerHTML = `<strong>Medium:</strong> ${currentChallenge.medium}`;
        details[1].innerHTML = `<strong>Size:</strong> ${currentChallenge.size}`;
        details[2].innerHTML = `<strong>Theme:</strong> ${currentChallenge.theme}`;
    }
}

/**
 * Update the challenge timer to show days remaining in current month
 */
function updateChallengeTimer() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Get the first day of next month
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    
    // Calculate time difference
    const timeDiff = nextMonth - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    // Update timer display
    const timerElement = document.getElementById('timeLeft');
    if (timerElement) {
        if (daysLeft === 1) {
            timerElement.textContent = '1 day left';
        } else {
            timerElement.textContent = `${daysLeft} days left`;
        }
    }
    
    // Set up daily updates
    setTimeout(updateChallengeTimer, 1000 * 60 * 60 * 24); // Update every 24 hours
}

/**
 * Get challenge for specific month (useful for past challenges display)
 */
function getChallengeForMonth(monthIndex) {
    return monthlyArtChallenges[monthIndex];
}

/**
 * Populate past challenges display
 */
function updatePastChallenges() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const pastChallengesGrid = document.getElementById('pastChallengesGrid');
    
    if (!pastChallengesGrid) return;
    
    // Clear existing content
    pastChallengesGrid.innerHTML = '';
    
    // Get the last 3 months (excluding current month)
    const pastMonths = [];
    for (let i = 1; i <= 3; i++) {
        let monthIndex = currentMonth - i;
        let year = currentDate.getFullYear();
        
        // Handle year wrap-around
        if (monthIndex < 0) {
            monthIndex += 12;
            year--;
        }
        
        pastMonths.push({
            challenge: monthlyArtChallenges[monthIndex],
            monthIndex: monthIndex,
            year: year
        });
    }
    
    // Create cards for past challenges
    pastMonths.forEach((item, index) => {
        const challenge = item.challenge;
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        // Generate random participant count for demo
        const participantCount = Math.floor(Math.random() * 50) + 30;
        
        const card = document.createElement('div');
        card.className = 'challenge-card';
        card.innerHTML = `
            <h4>${challenge.title}</h4>
            <p>${challenge.description.substring(0, 80)}${challenge.description.length > 80 ? '...' : ''}</p>
            <small style="color: var(--color-primary-accent); font-size: 0.75rem; opacity: 0.8;">${monthNames[item.monthIndex]} ${item.year}</small>
            <span class="participants">${participantCount} participants</span>
        `;
        
        pastChallengesGrid.appendChild(card);
    });
}

/**
 * Check if it's the first day of the month and update challenge if needed
 */
function checkForMonthlyUpdate() {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    
    // Check if it's the first day of the month
    if (dayOfMonth === 1) {
        // Check if we've already updated for this month
        const lastUpdate = localStorage.getItem('lastChallengeUpdate');
        const currentMonthYear = `${currentDate.getMonth()}-${currentDate.getFullYear()}`;
        
        if (lastUpdate !== currentMonthYear) {
            // Update the challenge
            updateMonthlyChallenge();
            updatePastChallenges();
            
            // Store that we've updated for this month
            localStorage.setItem('lastChallengeUpdate', currentMonthYear);
            
            // Show notification about new challenge
            setTimeout(() => {
                showNotification('🎨 New monthly art challenge is now available!');
            }, 2000);
            
            // Add visual indicator to challenge section
            addNewChallengeIndicator();
        }
    }
}

/**
 * Add visual indicator for new challenge
 */
function addNewChallengeIndicator() {
    const challengeHeader = document.querySelector('.challenge-header h3');
    if (challengeHeader && !challengeHeader.querySelector('.new-badge')) {
        const badge = document.createElement('span');
        badge.className = 'new-badge';
        badge.textContent = 'NEW!';
        badge.style.cssText = `
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: bold;
            margin-left: 10px;
            animation: pulse 2s ease-in-out infinite;
        `;
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
        
        challengeHeader.appendChild(badge);
        
        // Remove badge after 7 days
        setTimeout(() => {
            if (badge.parentNode) {
                badge.remove();
            }
        }, 7 * 24 * 60 * 60 * 1000);
    }
}

/**
 * Manual function to preview next month's challenge (for testing)
 */
function previewNextChallenge() {
    const currentDate = new Date();
    const nextMonth = (currentDate.getMonth() + 1) % 12;
    const nextChallenge = monthlyArtChallenges[nextMonth];
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    alert(`Next Challenge (${monthNames[nextMonth]}): "${nextChallenge.title}"\n\n${nextChallenge.description}`);
}

/**
 * Initialize the community garden functionality
 */
function initializeCommunityGarden() {
    // Set up form submission
    const form = document.getElementById('artSubmissionForm');
    if (form) {
        form.addEventListener('submit', handleArtSubmission);
    }
    
    // Load any existing artwork from localStorage
    loadExistingArtwork();
    
    // Update stats display
    updateStats();
}

/**
 * Handle artwork submission form
 */
function handleArtSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const submission = {
        id: Date.now(), // Simple ID generation
        artistName: formData.get('artistName'),
        instagramHandle: formData.get('instagramHandle'),
        artworkTitle: formData.get('artworkTitle'),
        artworkDescription: formData.get('artworkDescription'),
        artMedium: formData.get('artMedium'),
        submissionDate: new Date().toISOString(),
        approved: false // Would be reviewed before display in real app
    };
    
    // Handle image file
    const imageFile = formData.get('artworkImage');
    if (imageFile && imageFile.size > 0) {
        // In a real app, you'd upload to a server
        // For demo purposes, we'll create a local URL
        const reader = new FileReader();
        reader.onload = function(e) {
            submission.imageUrl = e.target.result;
            processSubmission(submission);
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Handle submission without image
        processSubmission(submission);
    }
}

/**
 * Process the artwork submission
 */
function processSubmission(submission) {
    // Add to our local storage (in real app, send to server)
    communityArtworks.push(submission);
    saveToLocalStorage();
    
    // Show success message
    showSubmissionSuccess();
    
    // Reset form
    document.getElementById('artSubmissionForm').reset();
    clearImagePreview();
    
    // Update stats
    updateStats();
    
    // For demo purposes, auto-approve and display
    setTimeout(() => {
        submission.approved = true;
        displayNewArtwork(submission);
        showNotification('Your artwork has been planted in our garden!');
    }, 2000);
}

/**
 * Show submission success message
 */
function showSubmissionSuccess() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="btn-icon">🌱</span> Planting Your Art...';
    submitBtn.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn-icon">✅</span> Successfully Planted!';
    }, 1500);
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = 'linear-gradient(45deg, #f8c8d0, #7e1c2e)';
        submitBtn.disabled = false;
    }, 4000);
}

/**
 * Preview uploaded image
 */
function previewImage(input) {
    const preview = document.getElementById('imagePreview');
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Artwork preview" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 2px solid rgba(248, 200, 208, 0.3);">
                <p style="color: #f8c8d0; margin-top: 10px; font-size: 0.9rem;">✅ Image selected: ${file.name}</p>
            `;
        };
        reader.readAsDataURL(file);
        
        // Update upload area text
        const uploadArea = document.querySelector('.file-upload-area');
        uploadArea.style.borderColor = '#f8c8d0';
        uploadArea.style.background = 'rgba(248, 200, 208, 0.1)';
    }
}

/**
 * Clear image preview
 */
function clearImagePreview() {
    const preview = document.getElementById('imagePreview');
    const uploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('artworkImage');
    
    preview.innerHTML = '';
    uploadArea.style.borderColor = 'rgba(248, 200, 208, 0.4)';
    uploadArea.style.background = 'rgba(248, 200, 208, 0.02)';
    fileInput.value = '';
}

/**
 * Display new artwork in the gallery
 */
function displayNewArtwork(artwork) {
    const gallery = document.getElementById('communityGallery');
    
    // Remove sample cards if this is the first real artwork
    const sampleCards = gallery.querySelectorAll('.artwork-card.sample');
    if (communityArtworks.filter(art => art.approved).length === 1) {
        sampleCards.forEach(card => card.remove());
    }
    
    // Create artwork card
    const artworkCard = createArtworkCard(artwork);
    
    // Insert at the beginning of the gallery
    gallery.insertBefore(artworkCard, gallery.firstChild);
    
    // Add entrance animation
    setTimeout(() => {
        artworkCard.style.opacity = '1';
        artworkCard.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * Create artwork card HTML
 */
function createArtworkCard(artwork) {
    const card = document.createElement('div');
    card.className = 'artwork-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    
    const instagramLink = artwork.instagramHandle ? 
        `<a href="https://instagram.com/${artwork.instagramHandle.replace('@', '')}" target="_blank" class="artist-name instagram">@${artwork.instagramHandle.replace('@', '')}</a>` :
        `<p class="artist-name">${artwork.artistName}</p>`;
    
    card.innerHTML = `
        <div class="artwork-image">
            ${artwork.imageUrl ? 
                `<img src="${artwork.imageUrl}" alt="${artwork.artworkTitle}" loading="lazy">` :
                `<div class="placeholder-art">
                    <span class="art-icon">🎨</span>
                    <p>${artwork.artworkTitle}</p>
                </div>`
            }
        </div>
        <div class="artwork-info">
            <h4>${artwork.artworkTitle}</h4>
            ${instagramLink}
            <span class="art-medium">${artwork.artMedium}</span>
            ${artwork.artworkDescription ? `<p style="color: #aaa; font-size: 0.85rem; margin-top: 8px; line-height: 1.4;">${artwork.artworkDescription}</p>` : ''}
        </div>
    `;
    
    return card;
}

/**
 * Load existing artwork from localStorage
 */
function loadExistingArtwork() {
    const saved = localStorage.getItem('communityArtworks');
    if (saved) {
        communityArtworks = JSON.parse(saved);
        
        // Display approved artworks
        const approvedArtworks = communityArtworks.filter(art => art.approved);
        approvedArtworks.forEach(artwork => displayNewArtwork(artwork));
    }
}

/**
 * Save artworks to localStorage
 */
function saveToLocalStorage() {
    localStorage.setItem('communityArtworks', JSON.stringify(communityArtworks));
}

/**
 * Update community stats
 */
function updateStats() {
    const approvedArtworks = communityArtworks.filter(art => art.approved);
    const uniqueArtists = [...new Set(approvedArtworks.map(art => art.artistName))];
    const instagramConnections = approvedArtworks.filter(art => art.instagramHandle).length;
    
    // Animate numbers
    animateNumber('totalArtworks', approvedArtworks.length);
    animateNumber('totalArtists', uniqueArtists.length);
    animateNumber('totalConnections', instagramConnections);
}

/**
 * Animate number counting
 */
function animateNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentNumber = parseInt(element.textContent) || 0;
    const increment = targetNumber > currentNumber ? 1 : -1;
    
    if (currentNumber !== targetNumber) {
        const timer = setInterval(() => {
            const current = parseInt(element.textContent) || 0;
            if (current === targetNumber) {
                clearInterval(timer);
            } else {
                element.textContent = current + increment;
            }
        }, 100);
    }
}

/**
 * Load more artwork (placeholder for pagination)
 */
function loadMoreArtwork() {
    // In a real app, this would load more artwork from the server
    showNotification('🌻 All current artwork is displayed! Keep checking back for new additions.');
}

/**
 * Scroll to submission form
 */
function scrollToSubmission() {
    const submitSection = document.querySelector('.submit-section');
    if (submitSection) {
        submitSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add focus effect to the form
        setTimeout(() => {
            const form = document.querySelector('.submit-form-container');
            form.style.boxShadow = '0 0 20px rgba(248, 200, 208, 0.3)';
            setTimeout(() => {
                form.style.boxShadow = '';
            }, 2000);
        }, 500);
    }
}

/**
 * Show notification message
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #f8c8d0, #7e1c2e);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Load community stats (placeholder for real data)
 */
function loadCommunityStats() {
    // In a real app, this would fetch stats from the server
    // For now, we'll use localStorage data
    updateStats();
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommunityGarden);
} else {
    initializeCommunityGarden();
}

/**
 * Initialize Enhanced Challenge Features
 */
function initializeEnhancedFeatures() {
    // Initialize pathway selection
    initializePathwaySelector();
    
    // Initialize resource tabs
    initializeResourceTabs();
    
    // Initialize week progress tracking
    initializeWeekProgress();
    
    // Initialize learning tracking
    initializeLearningTracking();
}

/**
 * Initialize learning pathway selector
 */
function initializePathwaySelector() {
    const pathwayCards = document.querySelectorAll('.pathway-card');
    
    pathwayCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            pathwayCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            card.classList.add('active');
            
            // Save selection to localStorage
            const pathType = card.dataset.path;
            localStorage.setItem('selectedLearningPath', pathType);
            
            // Update resources based on selection
            updateResourcesForPath(pathType);
            
            // Show notification
            const pathName = card.querySelector('h5').textContent;
            showNotification(`🎯 Learning path updated: ${pathName}`);
        });
    });
    
    // Load saved pathway selection
    const savedPath = localStorage.getItem('selectedLearningPath');
    if (savedPath) {
        const savedCard = document.querySelector(`[data-path="${savedPath}"]`);
        if (savedCard) {
            pathwayCards.forEach(c => c.classList.remove('active'));
            savedCard.classList.add('active');
        }
    }
}

/**
 * Initialize resource tab functionality
 */
function initializeResourceTabs() {
    const resourceTabButtons = document.querySelectorAll('.resource-tab-btn');
    const resourceTabContents = document.querySelectorAll('.resource-tab-content');
    
    resourceTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            // Remove active class from all tabs
            resourceTabButtons.forEach(btn => btn.classList.remove('active'));
            resourceTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Track tab usage
            trackResourceTabUsage(tabName);
        });
    });
}

/**
 * Initialize week progress tracking
 */
function initializeWeekProgress() {
    const weekCards = document.querySelectorAll('.week-card');
    const currentWeek = getCurrentChallengeWeek();
    
    // Update progress dots based on current week
    weekCards.forEach((card, index) => {
        const weekNumber = index + 1;
        const progressDot = card.querySelector('.progress-dot');
        
        if (weekNumber <= currentWeek) {
            progressDot.classList.add('active');
        }
        
        // Add click handler for week card interaction
        card.addEventListener('click', () => {
            if (weekNumber <= currentWeek) {
                // Show week details or resources
                showWeekDetails(weekNumber);
            } else {
                showNotification(`🗓️ Week ${weekNumber} will unlock later in the month!`);
            }
        });
    });
}

/**
 * Get current week of the monthly challenge
 */
function getCurrentChallengeWeek() {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    
    // Calculate week based on day of month (roughly)
    if (dayOfMonth <= 7) return 1;
    if (dayOfMonth <= 14) return 2;
    if (dayOfMonth <= 21) return 3;
    return 4;
}

/**
 * Show week details modal or expand content
 */
function showWeekDetails(weekNumber) {
    const weekDetails = {
        1: {
            title: "Foundation Week",
            description: "Learn the basics of mixed media preparation and photo integration techniques.",
            resources: [
                "📺 Mixed Media Basics Tutorial (8 min)",
                "📖 Photo Transfer Techniques Guide",
                "💡 Setting Up Your Workspace Tips"
            ],
            assignment: "Practice photo transfer technique with one family photo"
        },
        2: {
            title: "Exploration Week", 
            description: "Experiment with different layering methods using your family photos.",
            resources: [
                "📺 Layering Methods Tutorial (12 min)",
                "🖼️ Family Photo Integration Examples",
                "💡 Color Harmony in Mixed Media"
            ],
            assignment: "Create 3 small test pieces using different layering approaches"
        },
        3: {
            title: "Integration Week",
            description: "Combine your learned techniques into a cohesive cultural narrative piece.",
            resources: [
                "📺 Storytelling Through Art (15 min)",
                "📖 Cultural Symbol Research Guide",
                "🎨 Composition Planning Worksheet"
            ],
            assignment: "Plan and start your final cultural roots artwork"
        },
        4: {
            title: "Final Challenge Week",
            description: "Complete your cultural roots artwork and prepare for submission.",
            resources: [
                "📺 Finishing Techniques (10 min)",
                "📸 Artwork Photography Tips",
                "📝 Artist Statement Template"
            ],
            assignment: "Complete and submit your Cultural Roots artwork"
        }
    };
    
    const week = weekDetails[weekNumber];
    if (week) {
        showNotification(`📚 Week ${weekNumber}: ${week.title} - ${week.description}`);
        
        // Could expand to show a modal with full week details
        console.log('Week details:', week);
    }
}

/**
 * Initialize learning progress tracking
 */
function initializeLearningTracking() {
    // Track video views
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoTitle = card.querySelector('h5').textContent;
            trackVideoView(videoTitle);
            
            // Add visual feedback
            card.style.background = 'rgba(248, 200, 208, 0.1)';
            setTimeout(() => {
                card.style.background = '';
            }, 2000);
        });
    });
    
    // Track resource downloads
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const resourceName = link.textContent;
            trackResourceAccess(resourceName);
            showNotification(`📚 Resource accessed: ${resourceName}`);
        });
    });
}

/**
 * Update resources based on selected learning path
 */
function updateResourcesForPath(pathType) {
    // This could dynamically update the resource tabs content
    // based on the selected learning path (traditional, digital, hybrid)
    console.log(`Updating resources for path: ${pathType}`);
    
    // Example: Update video recommendations
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid && pathType) {
        // Add path-specific class for styling
        videoGrid.className = `video-grid path-${pathType}`;
    }
}

/**
 * Track resource tab usage for analytics
 */
function trackResourceTabUsage(tabName) {
    const usage = JSON.parse(localStorage.getItem('resourceTabUsage') || '{}');
    usage[tabName] = (usage[tabName] || 0) + 1;
    localStorage.setItem('resourceTabUsage', JSON.stringify(usage));
    
    console.log(`Resource tab usage:`, usage);
}

/**
 * Track video views for progress tracking
 */
function trackVideoView(videoTitle) {
    const views = JSON.parse(localStorage.getItem('videoViews') || '[]');
    views.push({
        title: videoTitle,
        timestamp: new Date().toISOString(),
        challenge: 'Cultural Roots' // Current challenge
    });
    localStorage.setItem('videoViews', JSON.stringify(views));
    
    console.log(`Video viewed: ${videoTitle}`);
}

/**
 * Track resource access for learning analytics
 */
function trackResourceAccess(resourceName) {
    const accesses = JSON.parse(localStorage.getItem('resourceAccesses') || '[]');
    accesses.push({
        resource: resourceName,
        timestamp: new Date().toISOString(),
        challenge: 'Cultural Roots'
    });
    localStorage.setItem('resourceAccesses', JSON.stringify(accesses));
    
    console.log(`Resource accessed: ${resourceName}`);
}

/**
 * Get learning progress summary
 */
function getLearningProgress() {
    const videoViews = JSON.parse(localStorage.getItem('videoViews') || '[]');
    const resourceAccesses = JSON.parse(localStorage.getItem('resourceAccesses') || '[]');
    const selectedPath = localStorage.getItem('selectedLearningPath');
    
    return {
        videosWatched: videoViews.length,
        resourcesAccessed: resourceAccesses.length,
        learningPath: selectedPath,
        currentWeek: getCurrentChallengeWeek(),
        progressPercentage: Math.min((videoViews.length + resourceAccesses.length) * 10, 100)
    };
}

/**
 * Show learning progress to user
 */
function showLearningProgress() {
    const progress = getLearningProgress();
    const message = `
🎓 Your Learning Progress:
• Videos watched: ${progress.videosWatched}
• Resources accessed: ${progress.resourcesAccessed}
• Current week: ${progress.currentWeek}/4
• Learning path: ${progress.learningPath || 'Not selected'}
• Progress: ${progress.progressPercentage}%
    `;
    
    alert(message);
}

/**
 * Reset learning progress (for testing or new challenge)
 */
function resetLearningProgress() {
    localStorage.removeItem('videoViews');
    localStorage.removeItem('resourceAccesses');
    localStorage.removeItem('resourceTabUsage');
    localStorage.removeItem('selectedLearningPath');
    
    // Reset UI
    const pathwayCards = document.querySelectorAll('.pathway-card');
    pathwayCards.forEach(card => card.classList.remove('active'));
    
    const progressDots = document.querySelectorAll('.progress-dot');
    progressDots.forEach(dot => dot.classList.remove('active'));
    
    showNotification('🔄 Learning progress reset for new challenge!');
}
