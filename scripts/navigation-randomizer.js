// Gallery order lives in scripts/gallery-order.json (shared with scripts/build-case-studies.js).
let galleryOrder = [];

// Function to get current work index from URL
function getCurrentWorkIndex() {
    const currentPath = decodeURIComponent(window.location.pathname);
    
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
document.addEventListener('DOMContentLoaded', () => {
    fetch('../../../scripts/gallery-order.json')
        .then((res) => res.json())
        .then((order) => {
            galleryOrder = order;
            updateNavigationLinks();
        })
        .catch(() => {});
});
