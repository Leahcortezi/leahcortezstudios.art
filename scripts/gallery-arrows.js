// Simple gallery with arrows for work pages
// Usage: add class 'arrow-gallery' to container, and 'gallery-image' to each image
// Optionally add data-rotate="90" to rotate an image 90deg clockwise

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.arrow-gallery').forEach(function(gallery) {
        // Remove any existing arrows to prevent duplicates
        gallery.querySelectorAll('.gallery-arrow').forEach(el => el.remove());
        const images = Array.from(gallery.querySelectorAll('.gallery-image'));
        let current = 0;
        function show(idx) {
            images.forEach((img, i) => {
                img.style.display = (i === idx) ? 'block' : 'none';
                img.classList.toggle('active', i === idx);
                // Always rotate the zine poster
                if (img.src && img.src.includes('zineposter.jpg')) {
                    img.style.transform = 'rotate(90deg)';
                } else {
                    img.style.transform = '';
                }
            });
        }
        // Arrows with SVG (no oval background, just arrow)
        const left = document.createElement('button');
        left.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32"><polyline points="20,8 12,16 20,24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        left.className = 'gallery-arrow left-arrow';
        left.onclick = function() {
            current = (current - 1 + images.length) % images.length;
            show(current);
        };
        const right = document.createElement('button');
        right.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32"><polyline points="12,8 20,16 12,24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        right.className = 'gallery-arrow right-arrow';
        right.onclick = function() {
            current = (current + 1) % images.length;
            show(current);
        };
        gallery.appendChild(left);
        gallery.appendChild(right);
        show(current);
    });
});
