/**
 * Portfolio Scroll Position Memory
 * Remembers scroll position when navigating between portfolio and work pages
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'portfolio_scroll_position';

    // On portfolio page: restore scroll position if coming back
    function restoreScrollPosition() {
        const currentPath = window.location.pathname;
        
        // Check if we're on the portfolio page
        if (currentPath.includes('/collections/index.html') || currentPath.endsWith('/collections/')) {
            const savedPosition = sessionStorage.getItem(STORAGE_KEY);
            
            if (savedPosition) {
                // Wait for page to render then scroll
                requestAnimationFrame(() => {
                    window.scrollTo(0, parseInt(savedPosition, 10));
                    // Clear after restoring so refreshes start at top
                    sessionStorage.removeItem(STORAGE_KEY);
                });
            }
        }
    }

    // On work pages: save scroll position and setup Back to Portfolio links
    function setupBackToPortfolioLinks() {
        const backLinks = document.querySelectorAll('.work-navigation .all-work');
        
        backLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Always navigate to the portfolio page - don't use history.back()
                // The href is already set correctly, just let it follow the link
                // Scroll position will be restored by restoreScrollPosition()
            });
        });
    }

    // Save scroll position on portfolio page before leaving
    function setupScrollSave() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/collections/index.html') || currentPath.endsWith('/collections/')) {
            // Save position whenever user clicks a project link
            document.querySelectorAll('.project-item a, .portfolio-item a, .work-item a').forEach(link => {
                link.addEventListener('click', function() {
                    sessionStorage.setItem(STORAGE_KEY, window.scrollY.toString());
                });
            });
            
            // Also save on any anchor click within the portfolio grid
            document.querySelectorAll('#portfolio a, .portfolio-grid a, .projects-container a').forEach(link => {
                link.addEventListener('click', function() {
                    sessionStorage.setItem(STORAGE_KEY, window.scrollY.toString());
                });
            });
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            restoreScrollPosition();
            setupBackToPortfolioLinks();
            setupScrollSave();
        });
    } else {
        restoreScrollPosition();
        setupBackToPortfolioLinks();
        setupScrollSave();
    }
})();
