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
    console.log('Community Garden loaded');
    initializeCommunityGarden();
    loadCommunityStats();
    updateMonthlyChallenge();
    updatePastChallenges();
    updateChallengeTimer();
    checkForMonthlyUpdate();
    
    // Check for monthly updates daily
    setInterval(checkForMonthlyUpdate, 1000 * 60 * 60 * 24); // Check every 24 hours
});

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
