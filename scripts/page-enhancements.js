/**
 * Page Enhancements
 * - Scroll progress bar for work pages
 * - Page transition effects
 * - Enhanced UX features
 */
(function() {
    'use strict';

    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    function initScrollProgress() {
        // Only add to work pages (has .work-page class)
        if (!document.querySelector('.work-page, .case-study-page')) return;

        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.appendChild(progressBar);

        const progressFill = progressBar.querySelector('.scroll-progress-fill');

        // Update progress on scroll
        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressFill.style.width = progress + '%';
        }

        // Throttled scroll listener
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial update
        updateProgress();
    }

    // ========================================
    // PAGE TRANSITIONS
    // ========================================
    function initPageTransitions() {
        // Add fade-in class to body when page loads
        document.body.classList.add('page-loaded');

        // Handle internal link clicks for fade-out transition
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            
            // Skip if not a link, or external, or has special behavior
            if (!link) return;
            if (link.target === '_blank') return;
            if (link.href.startsWith('mailto:')) return;
            if (link.href.startsWith('tel:')) return;
            if (link.href.includes('#') && link.href.split('#')[0] === window.location.href.split('#')[0]) return;
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;

            // Check if it's an internal link
            const url = new URL(link.href, window.location.origin);
            if (url.origin !== window.location.origin) return;

            // Trigger fade out
            e.preventDefault();
            document.body.classList.add('page-leaving');

            // Navigate after animation
            setTimeout(function() {
                window.location.href = link.href;
            }, 200);
        });
    }

    // ========================================
    // INITIALIZE
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initScrollProgress();
            initPageTransitions();
        });
    } else {
        initScrollProgress();
        initPageTransitions();
    }
})();
