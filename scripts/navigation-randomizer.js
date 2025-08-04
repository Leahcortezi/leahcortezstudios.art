// Master list of all portfolio work pieces
const allWorks = [
    // Design Work
    {
        title: "Double-Sided Poster",
        path: "collections/design/double-sided-poster/index.html",
        category: "design"
    },
    {
        title: "Elements and Principles Book Cover",
        path: "collections/design/elements-and-principles-book-cover/index.html",
        category: "design"
    },
    {
        title: "Flag Design",
        path: "collections/design/flag-design/index.html",
        category: "design"
    },
    {
        title: "Letter as Form",
        path: "collections/design/letter-as-form/index.html",
        category: "design"
    },
    {
        title: "Reductive Photo Solutions",
        path: "collections/design/reductive-photo-solutions/index.html",
        category: "design"
    },
    {
        title: "Reductive Symbols",
        path: "collections/design/reductive-symbols/index.html",
        category: "design"
    },
    {
        title: "Themed Playing Card Design",
        path: "collections/design/themed-playing-card-design/index.html",
        category: "design"
    },
    {
        title: "Typographic Interpretation",
        path: "collections/design/typographic-interpretation/index.html",
        category: "design"
    },
    
    // Personal Work (only include existing files)
    {
        title: "Anointed Gaze",
        path: "collections/personal/anointed-gaze/index.html",
        category: "personal"
    },
    {
        title: "Heaven on Fire",
        path: "collections/personal/heaven-on-fire/index.html",
        category: "personal"
    },
    {
        title: "Inheritance",
        path: "collections/personal/inheritance/index.html",
        category: "personal"
    },
    
    // Studio Work (only include existing files)
    {
        title: "Abuela's Altar",
        path: "collections/studio/abuelas-altar/index.html",
        category: "studio"
    },
    {
        title: "Abyss Bloom",
        path: "collections/studio/abyss-bloom/index.html",
        category: "studio"
    },
    {
        title: "Collected Remains",
        path: "collections/studio/collected-remains/index.html",
        category: "studio"
    },
    {
        title: "Feathers Along the Bend",
        path: "collections/studio/feathers-along-the-bend/index.html",
        category: "studio"
    },
    {
        title: "Gnaw",
        path: "collections/studio/gnaw/index.html",
        category: "studio"
    },
    {
        title: "Unraveling",
        path: "collections/studio/unraveling/index.html",
        category: "studio"
    }
];

// Function to shuffle array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to get current work info from URL
function getCurrentWork() {
    const currentPath = window.location.pathname;
    
    // Extract the relevant part of the path starting from collections/
    const pathMatch = currentPath.match(/\/collections\/(.+)/);
    if (!pathMatch) return null;
    
    const relativePath = 'collections/' + pathMatch[1];
    
    return allWorks.find(work => work.path === relativePath);
}

// Function to create a seeded random number for consistent daily randomization
function createSeededRandom(seed) {
    return function() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

// Function to get navigation links
function getNavigationLinks() {
    const currentWork = getCurrentWork();
    if (!currentWork) return null;
    
    // Create a daily seed based on the current date and current work
    const today = new Date().toDateString();
    const seedString = today + currentWork.path;
    const seed = seedString.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    // Use seeded random to shuffle works consistently
    const seededRandom = createSeededRandom(Math.abs(seed));
    const shuffledWorks = [...allWorks];
    
    // Fisher-Yates shuffle with seeded random
    for (let i = shuffledWorks.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom() * (i + 1));
        [shuffledWorks[i], shuffledWorks[j]] = [shuffledWorks[j], shuffledWorks[i]];
    }
    
    // Find current work index in shuffled array
    const currentIndex = shuffledWorks.findIndex(work => work.path === currentWork.path);
    
    // Calculate previous and next indices (wrapping around)
    const prevIndex = currentIndex === 0 ? shuffledWorks.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === shuffledWorks.length - 1 ? 0 : currentIndex + 1;
    
    const prevWork = shuffledWorks[prevIndex];
    const nextWork = shuffledWorks[nextIndex];
    
    // Calculate relative paths from current work to target works
    function getRelativePath(fromPath, toPath) {
        // Count directory depth of current file
        const fromParts = fromPath.split('/');
        const toParts = toPath.split('/');
        
        // Calculate how many levels to go up
        const levelsUp = fromParts.length - 1; // -1 because last part is filename
        
        // Build relative path
        const upPath = '../'.repeat(levelsUp);
        return upPath + toPath;
    }
    
    return {
        prev: {
            title: prevWork.title,
            path: getRelativePath(currentWork.path, prevWork.path),
            category: prevWork.category
        },
        next: {
            title: nextWork.title,
            path: getRelativePath(currentWork.path, nextWork.path),
            category: nextWork.category
        }
    };
}

// Function to update navigation links on page
function updateNavigationLinks() {
    const navLinks = getNavigationLinks();
    if (!navLinks) return;
    
    // Find navigation elements and update them
    const prevLink = document.querySelector('.work-navigation .prev-work, .nav-link.prev');
    const nextLink = document.querySelector('.work-navigation .next-work, .nav-link.next');
    
    if (prevLink) {
        prevLink.href = navLinks.prev.path;
        // Update text content while preserving arrow
        if (prevLink.innerHTML.includes('&larr;')) {
            prevLink.innerHTML = `&larr; ${navLinks.prev.title}`;
        } else if (prevLink.textContent.includes('←')) {
            prevLink.innerHTML = `← ${navLinks.prev.title}`;
        } else {
            prevLink.textContent = `← ${navLinks.prev.title}`;
        }
    }
    
    if (nextLink) {
        nextLink.href = navLinks.next.path;
        // Update text content while preserving arrow
        if (nextLink.innerHTML.includes('&rarr;')) {
            nextLink.innerHTML = `${navLinks.next.title} &rarr;`;
        } else if (nextLink.textContent.includes('→')) {
            nextLink.innerHTML = `${navLinks.next.title} →`;
        } else {
            nextLink.textContent = `${navLinks.next.title} →`;
        }
    }
    
    console.log('Navigation updated:', {
        current: getCurrentWork()?.title,
        prev: navLinks.prev.title,
        next: navLinks.next.title
    });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationLinks();
});

// Export functions for potential use elsewhere
window.NavigationRandomizer = {
    getAllWorks: () => allWorks,
    getCurrentWork,
    getNavigationLinks,
    updateNavigationLinks
};
