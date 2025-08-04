/*
  Leah Cortez Studio Art - Main JavaScript File
  ---
  This file contains all the global JavaScript functionality for the website,
  such as the mobile navigation (hamburger menu), portfolio masonry layout,
  and other interactive elements.
*/

// The 'DOMContentLoaded' event fires when the initial HTML document has been
// completely loaded and parsed, without waiting for stylesheets, images, and
// subframes to finish loading. This is the perfect time to run our setup code.
document.addEventListener('DOMContentLoaded', () => {
  // Masonry.js initialization
  const grid = document.querySelector('.masonry-container');
  let msnry;
  
  function initializeMasonry() {
    const isMobile = window.innerWidth <= 768;
    
    if (grid) {
      if (!isMobile) {
        // Desktop/tablet: use Masonry
        imagesLoaded(grid, function () {
          if (msnry) {
            msnry.destroy();
          }
          
          msnry = new Masonry(grid, {
            itemSelector: '.masonry-item:not(.hidden)',
            columnWidth: '.grid-sizer',
            gutter: 35,
            percentPosition: true,
            horizontalOrder: true,
            transitionDuration: '0.4s',
            fitWidth: false,
            resize: true
          });
          
          // Initialize filtering after Masonry is ready
          initializeFiltering();
        });
      } else {
        // Mobile: destroy Masonry and use flexbox
        if (msnry) {
          msnry.destroy();
          msnry = null;
        }
        
        // Initialize filtering for mobile
        initializeFiltering();
      }
    }
  }
  
  // Initial setup
  initializeMasonry();
  
  // Add resize listener to handle layout changes
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initializeMasonry();
    }, 250);
  });
  
  // Portfolio filtering logic
  function initializeFiltering() {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const masonryItems = document.querySelectorAll('.masonry-item');

    function filterItems(category) {
      console.log('Filtering by category:', category);
      let visibleCount = 0;
      const isMobile = window.innerWidth <= 768;
      
      // Apply filtering immediately
      masonryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          visibleCount++;
        } else {
          item.classList.add('hidden');
        }
      });
      
      console.log('Visible items:', visibleCount);
      
      // Update layout - only use Masonry on desktop/tablet
      if (msnry && !isMobile) {
        setTimeout(() => {
          // First, reloadItems to refresh Masonry's item cache
          msnry.reloadItems();
          // Then layout to recalculate positions
          msnry.layout();
          console.log('Masonry layout updated');
        }, 100);
        
        // Additional layout call after a longer delay to ensure stability
        setTimeout(() => {
          msnry.layout();
        }, 300);
      }
      // On mobile, the CSS flexbox handles the layout automatically
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterCategory = button.getAttribute('data-filter');
        filterItems(filterCategory);
      });
    });
  }

  /* --------------------
     1. MOBILE NAVIGATION
     -------------------- */
  
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });

    // Close menu when clicking on nav links
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }

  /* --------------------
     2. CONTACT FORM VALIDATION & SUBMISSION
     -------------------- */

  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const captchaQuestion = document.querySelector('#captcha-question').innerText;
      const userAnswer = parseInt(document.querySelector('#captcha-answer').value, 10);
      const numbers = captchaQuestion.match(/\d+/g).map(Number);
      const correctAnswer = numbers[0] + numbers[1];

      if (userAnswer !== correctAnswer) {
        alert('Incorrect answer to the security question. Please try again.');
        return;
      }

      const honeypot = document.querySelector('#honeypot').value;
      if (honeypot !== '') {
        console.log('Honeypot field triggered. Likely a bot.');
        alert('Thank you for your message!');
        contactForm.reset();
        return;
      }

      console.log('Form submitted (simulation).');
      alert('Thank you for your message! Leah will get back to you soon.');
      contactForm.reset();
    });
  }

  /* --------------------
     3. PORTFOLIO MASONRY & FILTERING
     -------------------- */

  // ...existing code...

  /* --------------------
     4. SMOOTH SCROLLING FOR NAVIGATION LINKS
     -------------------- */

  // Add smooth scrolling to anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* --------------------
     5. IMAGE LAZY LOADING ENHANCEMENT
     -------------------- */

  // Add additional loading states for images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  lazyImages.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    
    img.addEventListener('error', () => {
      img.classList.add('error');
      // Optionally replace with placeholder image
      console.warn(`Failed to load image: ${img.src}`);
    });
  });

  /* --------------------
     6. KEYBOARD NAVIGATION SUPPORT
     -------------------- */

  // Add keyboard support for filter buttons (moved inside DOMContentLoaded)
  document.addEventListener('click', () => {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
  });

  // Mobile navigation removed - no hamburger menu keyboard support needed

  /* --------------------
     6. MAGNIFYING GLASS EFFECT FOR WORK PAGES
     -------------------- */

  const imageZoomContainers = document.querySelectorAll('.image-zoom-container');
  console.log('Found image zoom containers:', imageZoomContainers.length);
  
  imageZoomContainers.forEach((container, index) => {
    const img = container.querySelector('img');
    console.log('Processing container', index, 'with image:', img);
    
    if (img) {
      // Create magnifying glass element
      const magnifier = document.createElement('div');
      magnifier.className = 'magnifying-glass';
      container.appendChild(magnifier);
      console.log('Created magnifier for container', index);
      
      const setupMagnifier = () => {
        magnifier.style.backgroundImage = `url("${img.src}")`;
        
        // Calculate proper background size to maintain aspect ratio
        const containerRect = container.getBoundingClientRect();
        const zoomFactor = 3; // 3x zoom (reduced from 5x)
        
        // Set background size to be 3x the container size
        const bgWidth = containerRect.width * zoomFactor;
        const bgHeight = containerRect.height * zoomFactor;
        
        magnifier.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
        
        console.log('Setup magnifier with image:', img.src);
        console.log('Container size:', containerRect.width, 'x', containerRect.height);
        console.log('Background size:', bgWidth, 'x', bgHeight);
      };
      
      // Setup when image loads
      if (img.complete) {
        setupMagnifier();
      } else {
        img.addEventListener('load', setupMagnifier);
      }
      
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position the magnifying glass
        magnifier.style.left = x + 'px';
        magnifier.style.top = y + 'px';
        
        // Simple percentage calculation that works correctly
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Set background position - this should show exactly what's under the cursor
        magnifier.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
      });

      container.addEventListener('mouseenter', () => {
        magnifier.style.opacity = '1';
        console.log('Mouse entered container');
      });

      container.addEventListener('mouseleave', () => {
        magnifier.style.opacity = '0';
        console.log('Mouse left container');
      });
    }
  });

  /* --------------------
     7. PDF MODAL FUNCTIONALITY
     -------------------- */

  const viewCvBtn = document.querySelector('#viewCvBtn');
  const pdfModal = document.querySelector('#pdfModal');
  const closePdfBtn = document.querySelector('#closePdfBtn');
  const pdfViewer = document.querySelector('#pdfViewer');

  if (viewCvBtn && pdfModal && closePdfBtn && pdfViewer) {
    // Open PDF modal
    viewCvBtn.addEventListener('click', () => {
      pdfViewer.src = '../documents/LeahCortez_CV.pdf';
      pdfModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close PDF modal
    const closePdfModal = () => {
      pdfModal.style.display = 'none';
      pdfViewer.src = ''; // Clear the iframe source
      document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closePdfBtn.addEventListener('click', closePdfModal);

    // Close modal when clicking outside the content
    pdfModal.addEventListener('click', (event) => {
      if (event.target === pdfModal) {
        closePdfModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && pdfModal.style.display === 'block') {
        closePdfModal();
      }
    });
  }

  /* --------------------
     6. THUMBNAIL GALLERY FUNCTIONALITY
     -------------------- */

  const thumbnailItems = document.querySelectorAll('.thumbnail-item');
  const mainImage = document.querySelector('#mainImage');

  if (thumbnailItems.length > 0 && mainImage) {
    // Find the magnifier in the same container as mainImage
    const mainImageContainer = mainImage.closest('.image-zoom-container');
    const magnifier = mainImageContainer ? mainImageContainer.querySelector('.magnifying-glass') : null;

    thumbnailItems.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnailItems.forEach(item => item.classList.remove('active'));
        // Add active class to clicked thumbnail
        thumbnail.classList.add('active');
        // Update main image
        const newSrc = thumbnail.dataset.src;
        const newAlt = thumbnail.dataset.alt;
        mainImage.src = newSrc;
        mainImage.alt = newAlt;
        // Update magnifier background image if present
        if (magnifier) {
          magnifier.style.backgroundImage = `url("${newSrc}")`;
        }
      });
    });
  }

  /* --------------------
     7. FLOATING BACKGROUND ICONS
     -------------------- */

  // Floating icons are now handled by generateRandomFloatingIcons function below

}); // End of DOMContentLoaded event listener

/* --------------------
   UTILITY FUNCTIONS
   -------------------- */

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

/* --------------------
   FLOATING BACKGROUND ICONS
   -------------------- */

// Generate random floating icon animations on page load
function generateRandomFloatingIcons() {
  console.log('Generating random floating icons...');
  
  const icons = ['flower.svg', 'star.svg', 'starburst.svg'];
  const sizes = [20, 35, 50];
  const numIcons = 6;
  
  // Determine the correct path to icons based on current page location
  const currentPath = window.location.pathname;
  const iconPath = currentPath.includes('/bio/') || currentPath.includes('/collections/') || 
                   currentPath.includes('/cv/') || currentPath.includes('/contact/') ? '../icons/' : 'icons/';
  
  // Generate random positions
  const positions = [];
  for (let i = 0; i < numIcons; i++) {
    positions.push({
      x: Math.random() * 85 + 5, // 5% to 90% from left
      y: Math.random() * 85 + 5, // 5% to 90% from top
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      duration: Math.random() * 5 + 5, // 5-10 seconds
      delay: Math.random() * 5, // 0-5 second delay
      rotation: Math.random() * 10 - 5, // -5 to +5 degrees
      float: Math.random() * 5 + 2 // 2-7 pixels
    });
  }
  
  // Create CSS for random animations
  let css = `
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      background-image: `;
  
  // Add background images
  for (let i = 0; i < positions.length; i++) {
    css += `url('${iconPath}${positions[i].icon}')`;
    if (i < positions.length - 1) css += ', ';
  }
  
  css += `;
      background-size: `;
  
  // Add background sizes
  for (let i = 0; i < positions.length; i++) {
    css += `${positions[i].size}px ${positions[i].size}px`;
    if (i < positions.length - 1) css += ', ';
  }
  
  css += `;
      background-position: `;
  
  // Add background positions
  for (let i = 0; i < positions.length; i++) {
    css += `${positions[i].x}% ${positions[i].y}%`;
    if (i < positions.length - 1) css += ', ';
  }
  
  css += `;
      background-repeat: no-repeat;
      filter: brightness(3) invert(0.8) opacity(0.4);
      animation: `;
  
  // Add animations
  for (let i = 0; i < positions.length; i++) {
    css += `randomFloat${i} ${positions[i].duration}s ease-in-out infinite ${positions[i].delay}s`;
    if (i < positions.length - 1) css += ', ';
  }
  
  css += `;
    }`;
  
  // Create keyframes for each icon
  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    css += `
    @keyframes randomFloat${i} {
      0% { transform: rotate(0deg) translateY(0px); }
      25% { transform: rotate(${pos.rotation * 0.7}deg) translateY(-${pos.float * 0.6}px); }
      50% { transform: rotate(0deg) translateY(-${pos.float}px); }
      75% { transform: rotate(${-pos.rotation * 0.7}deg) translateY(-${pos.float * 0.6}px); }
      100% { transform: rotate(0deg) translateY(0px); }
    }`;
  }
  
  console.log('Generated CSS:', css);
  
  // Inject the CSS
  const styleElement = document.createElement('style');
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
  
  console.log('Floating icons CSS injected successfully');
}

// Initialize floating icons when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateRandomFloatingIcons);
} else {
  generateRandomFloatingIcons();
}

// --------------------
// TESTIMONIALS CAROUSEL
// --------------------

function initializeTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  if (!carousel || slides.length === 0) return;
  
  let currentSlide = 0;
  let isTransitioning = false;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Function to show specific slide
  function showSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    
    // Show new slide
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
    
    // Reset transition flag
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
  
  // Function to go to next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  
  // Function to go to previous slide
  function prevSlide() {
    const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(prev);
  }
  
  // Handle dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Handle arrow clicks
  const prevButton = document.querySelector('.carousel-arrow-left');
  const nextButton = document.querySelector('.carousel-arrow-right');
  
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }
  
  // Touch/swipe support
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
    }
  }
  
  // Auto-rotate slides (optional - currently disabled)
  // let autoRotateInterval;
  // function startAutoRotate() {
  //   autoRotateInterval = setInterval(nextSlide, 5000);
  // }
  
  // function stopAutoRotate() {
  //   clearInterval(autoRotateInterval);
  // }
  
  // Pause auto-rotation on hover
  // carousel.addEventListener('mouseenter', stopAutoRotate);
  // carousel.addEventListener('mouseleave', startAutoRotate);
  
  // Start auto-rotation
  // startAutoRotate();
  
  console.log('Testimonials carousel initialized');
}

// Add testimonials carousel to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  // ...existing initialization code...
  initializeTestimonialsCarousel();
});

// ...existing code...

