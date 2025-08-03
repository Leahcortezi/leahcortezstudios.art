/*
  Bio Page Modal Functionality
  ---
  This script handles the modal lightbox functionality for the bio page buttons
  and the accordion functionality for the mediums modal
*/

document.addEventListener('DOMContentLoaded', function() {
    // Get all bio links
    const bioLinks = document.querySelectorAll('.bio-link');
    
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close');
    
    // Get all accordion headers
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Add click event listeners to bio links
    bioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
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
    
    // Accordion functionality
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            const allAccordionItems = document.querySelectorAll('.accordion-item');
            allAccordionItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // If this item wasn't active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
});
