// Simple gallery with arrows for work pages
// Usage: add class 'arrow-gallery' to container, and 'gallery-image' to each image
// Supports touch swipe on mobile

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.arrow-gallery').forEach(function(gallery) {
        // Remove any existing arrows to prevent duplicates
        gallery.querySelectorAll('.gallery-arrow').forEach(el => el.remove());
        const images = Array.from(gallery.querySelectorAll('.gallery-image'));
        let current = 0;

        function show(idx) {
            images.forEach((img, i) => {
                if (i === idx) {
                    img.style.display = 'block';
                    img.classList.add('active');
                } else {
                    img.style.display = 'none';
                    img.classList.remove('active');
                }
                // Always rotate and center the zine poster
                if (img.src && img.src.includes('zineposter.jpg')) {
                    img.style.transform = 'translate(-50%, -50%) rotate(90deg)';
                    img.style.left = '50%';
                    img.style.top = '50%';
                    img.style.position = 'absolute';
                } else {
                    // Reset transforms for other images - they use CSS positioning
                    img.style.transform = '';
                    img.style.left = '';
                    img.style.top = '';
                    img.style.position = '';
                }
            });
        }

        function nextImage() {
            current = (current + 1) % images.length;
            show(current);
        }

        function prevImage() {
            current = (current - 1 + images.length) % images.length;
            show(current);
        }

        // Arrows with SVG
        const left = document.createElement('button');
        left.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32"><polyline points="20,8 12,16 20,24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        left.className = 'gallery-arrow left-arrow';
        left.setAttribute('aria-label', 'Previous image');
        left.onclick = prevImage;

        const right = document.createElement('button');
        right.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32"><polyline points="12,8 20,16 12,24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        right.className = 'gallery-arrow right-arrow';
        right.setAttribute('aria-label', 'Next image');
        right.onclick = nextImage;

        gallery.appendChild(left);
        gallery.appendChild(right);

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        gallery.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        gallery.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swiped right - go to previous
                    prevImage();
                } else {
                    // Swiped left - go to next
                    nextImage();
                }
            }
        }

        // Keyboard navigation when gallery is focused
        gallery.setAttribute('tabindex', '0');
        gallery.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevImage();
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                nextImage();
                e.preventDefault();
            }
        });

        show(current);
    });
});
