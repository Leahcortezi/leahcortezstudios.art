/**
 * Portfolio Scroll Position Memory
 * Remembers scroll position when clicking "Back to Portfolio"
 * but not when using prev/next navigation
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'portfolio_scroll_position';
    const PORTFOLIO_PATH = '/collections/index.html';

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

    // On work pages: save scroll position when clicking "Back to Portfolio"
    function setupBackToPortfolioLinks() {
        const backLinks = document.querySelectorAll('.work-navigation .all-work');
        
        backLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Get the referrer scroll position if we came from portfolio
                const referrer = document.referrer;
                
                if (referrer && referrer.includes('/collections/')) {
                    // We came from portfolio, so we want to go back to where we were
                    // Use history.back() instead of following the link
                    e.preventDefault();
                    history.back();
                }
                // If we didn't come from portfolio (e.g., direct link, search), 
                // let the normal link behavior happen (goes to top of portfolio)
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
