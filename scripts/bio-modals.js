/*
  Bio Page Modal Functionality
  ---
  This script handles the modal lightbox functionality for the bio page buttons
*/

document.addEventListener('DOMContentLoaded', function() {
    // Get all bio buttons
    const bioButtons = document.querySelectorAll('.bio-button');
    
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close');
    
    // Add click event listeners to bio buttons
    bioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') + '-modal';
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Add click event listeners to close buttons
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') + '-modal';
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                // Restore body scroll
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                // Restore body scroll
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    // Restore body scroll
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});
