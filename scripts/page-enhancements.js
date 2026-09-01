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
    // ========================================
    // APPLICATION GRID FIX (JS fallback)
    // Ensures the large application tile is first and spans two rows on wide screens.
    // Some rebuilt pages can vary in DOM ordering; this enforces the intended layout.
    // ========================================
    function initApplicationGridFix() {
        const debounce = (fn, wait = 100) => {
            let t;
            return (...args) => {
                clearTimeout(t);
                t = setTimeout(() => fn.apply(this, args), wait);
            };
        };

        document.querySelectorAll('.case-study-application-layout').forEach((layout) => {
            const stack = layout.querySelector('.case-study-application-stack');
            // Prefer explicit large tile, otherwise take the first tile
            const large = layout.querySelector('.case-study-tile.is-large') || layout.querySelector('.case-study-tile');
            if (!large || !stack) return;

            // Move the large tile before the stack if it's not already the first column
            if (layout.firstElementChild !== large) {
                layout.insertBefore(large, stack);
            }

            const applyGrid = () => {
                if (window.innerWidth >= 960) {
                    large.style.gridRow = '1 / span 2';
                    // ensure stack rows have a minimum so the large tile matches height
                    stack.style.gridAutoRows = 'minmax(240px, auto)';
                } else {
                    large.style.gridRow = '';
                    stack.style.gridAutoRows = '';
                }
            };

            applyGrid();
            window.addEventListener('resize', debounce(applyGrid, 120));
        });
    }

    // ========================================
    // INITIALIZE
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initScrollProgress();
            initPageTransitions();
            initApplicationGridFix();
        });
    } else {
        initScrollProgress();
        initPageTransitions();
        initApplicationGridFix();
    }
})();
