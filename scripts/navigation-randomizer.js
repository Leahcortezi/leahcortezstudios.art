// Gallery order - matches collections/index.html order exactly
const galleryOrder = [
    "collections/illustration/abuelas-altar/index.html",
    "collections/design/Threads/index.html",
    "collections/printmaking/reliquary-heart/index.html",
    "collections/design/City Reliquary/index.html",
    "collections/illustration/anointed-gaze/index.html",
    "collections/design/endangered-species-poster/index.html",
    "collections/printmaking/the-living-room/index.html",
    "collections/design/insane-grain-packaging/index.html",
    "collections/objects/abyss-bloom/index.html",
    "collections/design/contemporary-contexts-zine/index.html",
    "collections/illustration/heaven-on-fire/index.html",
    "collections/illustration/inheritance/index.html",
    "collections/printmaking/unbecoming/index.html",
    "collections/printmaking/the-unholy-gaze/index.html",
    "collections/objects/feathers-along-the-bend/index.html",
    "collections/design/constructivism/index-case-study.html",
    "collections/design/dada/index-case-study.html",
    "collections/design/grunge/index-case-study.html",
    "collections/design/double-sided-poster/index-case-study.html",
    "collections/design/editorial-spread/index.html",
    "collections/design/themed-playing-card-design/index-case-study.html",
    "collections/design/futurism/index-case-study.html",
    "collections/design/modernism/index-case-study.html",
    "collections/objects/gnaw/index.html",
    "collections/design/typographic-interpretation/index-case-study.html",
    "collections/objects/unraveling/index.html",
    "collections/design/reductive-symbols/index-case-study.html"
];

// Function to get current work index from URL
function getCurrentWorkIndex() {
    const currentPath = window.location.pathname;
    
    // Extract the relevant part of the path starting from collections/
    const pathMatch = currentPath.match(/\/collections\/(.+)/);
    if (!pathMatch) return -1;
    
    const relativePath = 'collections/' + pathMatch[1];
    
    return galleryOrder.findIndex(path => path === relativePath);
}

// Function to calculate relative path from current page to target
function getRelativePath(targetPath) {
    // From a work page, we need to go up to root then down to target
    // Work pages are at: collections/category/work/index.html (3 levels deep)
    return '../../../' + targetPath;
}

// Function to update navigation links
function updateNavigationLinks() {
    const currentIndex = getCurrentWorkIndex();
    if (currentIndex === -1) return;
    
    // Calculate previous and next indices (wrapping around)
    const prevIndex = currentIndex === 0 ? galleryOrder.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === galleryOrder.length - 1 ? 0 : currentIndex + 1;
    
    const prevPath = getRelativePath(galleryOrder[prevIndex]);
    const nextPath = getRelativePath(galleryOrder[nextIndex]);
    
    // Update the navigation links
    const prevLink = document.querySelector('.prev-work');
    const nextLink = document.querySelector('.next-work');
    
    if (prevLink) {
        prevLink.href = prevPath;
    }
    
    if (nextLink) {
        nextLink.href = nextPath;
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', updateNavigationLinks);
