// Simple gallery with arrows for work pages
// Usage: add class 'arrow-gallery' to container, and 'gallery-image' to each image
// Optionally add data-rotate="90" to rotate an image 90deg clockwise

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.arrow-gallery').forEach(function(gallery) {
        const images = Array.from(gallery.querySelectorAll('.gallery-image'));
        let current = 0;
        function show(idx) {
            images.forEach((img, i) => {
                img.style.display = (i === idx) ? 'block' : 'none';
                if (img.dataset.rotate === '90') {
                    img.style.transform = 'rotate(90deg)';
                } else {
                    img.style.transform = '';
                }
            });
        }
        // Arrows
        const left = document.createElement('button');
        left.innerHTML = '&#8592;';
        left.className = 'gallery-arrow left-arrow';
        left.onclick = function() {
            current = (current - 1 + images.length) % images.length;
            show(current);
        };
        const right = document.createElement('button');
        right.innerHTML = '&#8594;';
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
