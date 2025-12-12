/**
 * Read More functionality for work page descriptions
 * Automatically truncates long descriptions and adds a toggle button
 */
(function() {
    'use strict';

    function initReadMore() {
        const workDescriptions = document.querySelectorAll('.work-description');
        
        workDescriptions.forEach(description => {
            const h2 = description.querySelector('h2');
            const paragraphs = description.querySelectorAll('p');
            
            if (paragraphs.length === 0) return;
            
            // Calculate total text length
            let totalLength = 0;
            paragraphs.forEach(p => totalLength += p.textContent.length);
            
            // Only add read more if content is long enough (more than ~200 chars)
            if (totalLength < 250) return;
            
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
                if (foundH2) {
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
                    readMoreBtn.textContent = 'Read More';
                    readMoreBtn.classList.remove('expanded');
                    readMoreBtn.setAttribute('aria-expanded', 'false');
                } else {
                    description.classList.remove('truncated');
                    description.classList.add('expanded');
                    readMoreBtn.textContent = 'Read Less';
                    readMoreBtn.classList.add('expanded');
                    readMoreBtn.setAttribute('aria-expanded', 'true');
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
