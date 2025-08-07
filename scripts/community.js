/**
 * Community Garden JavaScript
 * Handles artwork submissions, gallery display, and interactions
 */

// Community data storage (in a real app, this would connect to a backend)
let communityArtworks = [];
let submissionCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Community Garden loaded');
    initializeCommunityGarden();
    loadCommunityStats();
});

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
