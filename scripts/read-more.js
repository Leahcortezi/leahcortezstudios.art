/**
 * Read More functionality for work page descriptions
 * Automatically truncates long descriptions and adds a toggle button
 */
(function() {
    'use strict';

    function initReadMore() {
        const workDescriptions = document.querySelectorAll('.work-description');
        
        workDescriptions.forEach(description => {
            // Skip if already initialized
            if (description.dataset.readMoreInit === 'true') return;
            description.dataset.readMoreInit = 'true';
            
            const h2 = description.querySelector('h2');
            const paragraphs = description.querySelectorAll('p');
            
            if (paragraphs.length === 0) return;
            
            // Calculate total text length
            let totalLength = 0;
            paragraphs.forEach(p => totalLength += p.textContent.length);
            
            // Only add read more if content is long enough (more than ~400 chars)
            if (totalLength < 400) return;
            
            // Check if there's already a wrapper
            if (description.querySelector('.description-content')) return;
            
            // Wrap content in a container (skip h2)
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'description-content';
            
            // Move all content after h2 into wrapper
            const children = Array.from(description.children);
            let foundH2 = false;
            
            children.forEach(child => {
                if (child.tagName === 'H2') {
                    foundH2 = true;
                    return;
                }
                if (foundH2 && child.className !== 'read-more-btn') {
                    contentWrapper.appendChild(child);
                }
            });
            
            description.appendChild(contentWrapper);
            
            // Create read more button
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.setAttribute('aria-expanded', 'false');
            
            // Add truncated class
            description.classList.add('truncated');
            
            // Toggle functionality
            readMoreBtn.addEventListener('click', function() {
                const isExpanded = description.classList.contains('expanded');
                
                if (isExpanded) {
                    description.classList.remove('expanded');
                    description.classList.add('truncated');
                    this.textContent = 'Read More';
                    this.classList.remove('expanded');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    description.classList.remove('truncated');
                    description.classList.add('expanded');
                    this.textContent = 'Read Less';
                    this.classList.add('expanded');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
            
            description.appendChild(readMoreBtn);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReadMore);
    } else {
        initReadMore();
    }
})();
