// Master list of all portfolio work pieces (only what's in the gallery)
const allWorks = [
    // Illustration
    { title: "Abuela's Altar", path: "collections/illustration/abuelas-altar/index.html", category: "illustration" },
    { title: "Anointed Gaze", path: "collections/illustration/anointed-gaze/index.html", category: "illustration" },
    { title: "Heaven on Fire", path: "collections/illustration/heaven-on-fire/index.html", category: "illustration" },
    { title: "Inheritance", path: "collections/illustration/inheritance/index.html", category: "illustration" },
    
    // Printmaking
    { title: "Reliquary Heart", path: "collections/printmaking/reliquary-heart/index.html", category: "printmaking" },
    { title: "The Living Room", path: "collections/printmaking/the-living-room/index.html", category: "printmaking" },
    { title: "Unbecoming", path: "collections/printmaking/unbecoming/index.html", category: "printmaking" },
    { title: "The Unholy Gaze", path: "collections/printmaking/the-unholy-gaze/index.html", category: "printmaking" },
    
    // Objects
    { title: "Abyss Bloom", path: "collections/objects/abyss-bloom/index.html", category: "objects" },
    { title: "Feathers Along the Bend", path: "collections/objects/feathers-along-the-bend/index.html", category: "objects" },
    { title: "Gnaw", path: "collections/objects/gnaw/index.html", category: "objects" },
    { title: "Unraveling", path: "collections/objects/unraveling/index.html", category: "objects" },
    
    // Design
    { title: "Endangered Species Poster", path: "collections/design/endangered-species-poster/index.html", category: "design" },
    { title: "Insane Grain Packaging", path: "collections/design/insane-grain-packaging/index.html", category: "design" },
    { title: "Contemporary Contexts Zine", path: "collections/design/contemporary-contexts-zine/index.html", category: "design" },
    { title: "Editorial Spread", path: "collections/design/editorial-spread/index.html", category: "design" },
    { title: "Constructivism Movement Study", path: "collections/design/constructivism/index-case-study.html", category: "design" },
    { title: "Dada Movement Study", path: "collections/design/dada/index-case-study.html", category: "design" },
    { title: "Grunge Movement Study", path: "collections/design/grunge/index-case-study.html", category: "design" },
    { title: "Double-Sided Poster", path: "collections/design/double-sided-poster/index-case-study.html", category: "design" },
    { title: "Futurism Movement Study", path: "collections/design/futurism/index-case-study.html", category: "design" },
    { title: "Modernism Movement Study", path: "collections/design/modernism/index-case-study.html", category: "design" },
    { title: "Typographic Interpretation", path: "collections/design/typographic-interpretation/index-case-study.html", category: "design" },
    { title: "Reductive Symbols", path: "collections/design/reductive-symbols/index-case-study.html", category: "design" }
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
    
    // Create a daily seed based ONLY on the current date
    // This ensures the same order for ALL works throughout the day
    const today = new Date().toDateString();
    const seed = today.split('').reduce((a, b) => {
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
        // Keep consistent "Previous Work" text - only update href
    }
    
    if (nextLink) {
        nextLink.href = navLinks.next.path;
        // Keep consistent "Next Work" text - only update href
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
