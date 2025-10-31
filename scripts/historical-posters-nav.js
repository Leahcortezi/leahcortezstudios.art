// Historical Posters Navigation
document.addEventListener('DOMContentLoaded', function() {
    const historicalPosters = [
        'bauhaus',
        'constructivism',
        'dada',
        'futurism',
        'grunge',
        'modernism',
        'polish-school',
        'psychedelic'
    ];

    function getCurrentPoster() {
        const path = window.location.pathname;
        for (let poster of historicalPosters) {
            if (path.includes(poster)) {
                return poster;
            }
        }
        return null;
    }

    function setupNavigation() {
        const currentPoster = getCurrentPoster();
        if (!currentPoster) return;

        const currentIndex = historicalPosters.indexOf(currentPoster);
        const nav = document.createElement('nav');
        nav.className = 'case-study-navigation';
        
        const navContainer = document.createElement('div');
        navContainer.className = 'nav-container';

        // Previous link
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : historicalPosters.length - 1;
        const prevLink = document.createElement('a');
        prevLink.href = `../${historicalPosters[prevIndex]}/index.html`;
        prevLink.className = 'nav-link prev';
        prevLink.textContent = '← Previous';
        
        // Overview link
        const overviewLink = document.createElement('a');
        overviewLink.href = '../index.html';
        overviewLink.className = 'nav-link center';
        overviewLink.textContent = 'All Posters';
        
        // Next link
        const nextIndex = currentIndex < historicalPosters.length - 1 ? currentIndex + 1 : 0;
        const nextLink = document.createElement('a');
        nextLink.href = `../${historicalPosters[nextIndex]}/index.html`;
        nextLink.className = 'nav-link next';
        nextLink.textContent = 'Next →';

        navContainer.appendChild(prevLink);
        navContainer.appendChild(overviewLink);
        navContainer.appendChild(nextLink);
        nav.appendChild(navContainer);

        // Insert navigation at the end of the case study
        const caseStudyContent = document.querySelector('.case-study-page');
        if (caseStudyContent) {
            caseStudyContent.appendChild(nav);
        }
    }

    setupNavigation();
});
