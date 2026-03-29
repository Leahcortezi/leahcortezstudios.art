/*
  Leah Cortez Studios Art - Main JavaScript File
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
    if (grid) {
      const isMobile = window.innerWidth <= 768;
      
      // On mobile, use CSS flexbox layout instead of masonry for reliable two-column
      if (isMobile) {
        // Destroy existing masonry instance if any
        if (msnry) {
          msnry.destroy();
          msnry = null;
        }
        grid.classList.remove('masonry-ready');
        
        // Wait for images to load, then initialize filtering
        imagesLoaded(grid, function () {
          initializeFiltering();
        });
        return;
      }
      
      // Desktop: Use Masonry for Pinterest-style layout
      imagesLoaded(grid, function () {
        if (msnry) {
          msnry.destroy();
        }
        
        msnry = new Masonry(grid, {
          itemSelector: '.masonry-item:not(.hidden)',
          columnWidth: '.grid-sizer',
          gutter: 35,
          percentPosition: true,
          horizontalOrder: false,
          transitionDuration: '0.4s',
          fitWidth: false,
          resize: true
        });
        
        // Add masonry-ready class to switch from flexbox fallback to masonry positioning
        grid.classList.add('masonry-ready');
        
        // Force layout after a brief delay to ensure proper column distribution
        setTimeout(() => {
          if (msnry) {
            msnry.layout();
          }
        }, 100);
        
        // Initialize filtering after Masonry is ready
        initializeFiltering();
      });
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
    const categoryButtons = document.querySelectorAll('.filter-categories .filter-box-dropdown button[data-filter]');
    const filterBox = document.querySelector('.filter-box:not(.filter-categories)');
    const filterBoxHeader = filterBox ? filterBox.querySelector('.filter-box-header') : null;
    const filterBoxValue = filterBox ? filterBox.querySelector('.filter-box-value') : null;
    const yearButtons = document.querySelectorAll('.filter-box:not(.filter-categories) .filter-box-dropdown button[data-year]');
    const archiveSearchInput = document.querySelector('#archive-search');
    const noResultsMessage = document.querySelector('#archive-no-results');
    const masonryItems = document.querySelectorAll('.masonry-item');
    
    let currentCategory = 'all';
    let currentYear = 'all';
    let currentSearch = '';

    function filterItems() {
      console.log('Filtering by category:', currentCategory, 'year:', currentYear, 'search:', currentSearch);
      let visibleCount = 0;
      const isMobile = window.innerWidth <= 768;
      const normalizedQuery = currentSearch.trim().toLowerCase();
      
      // Apply filtering immediately
      masonryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const itemYear = item.getAttribute('data-year');
        const itemImage = item.querySelector('img');
        const itemAltText = itemImage ? (itemImage.getAttribute('alt') || '') : '';
        const itemCaption = item.querySelector('.caption') ? item.querySelector('.caption').textContent : '';
        const searchCorpus = `${itemCategory || ''} ${itemYear || ''} ${itemCaption || ''} ${itemAltText || ''}`.toLowerCase();
        
        const categoryMatch = currentCategory === 'all' || itemCategory === currentCategory;
        const yearMatch = currentYear === 'all' || itemYear === currentYear;
        const searchMatch = normalizedQuery === '' || searchCorpus.includes(normalizedQuery);
        
        if (categoryMatch && yearMatch && searchMatch) {
          item.classList.remove('hidden');
          visibleCount++;
        } else {
          item.classList.add('hidden');
        }
      });
      
      console.log('Visible items:', visibleCount);

      if (noResultsMessage) {
        noResultsMessage.hidden = visibleCount !== 0;
      }
      
      // Update Masonry layout on all screen sizes
      if (msnry) {
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
    }

    // Category filter buttons
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-filter');
        
        // On mobile, close dropdown and update filter box value
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          const filterCategories = document.querySelector('.filter-categories');
          if (filterCategories) {
            filterCategories.classList.remove('open');
            // Update displayed value
            const filterBoxValue = filterCategories.querySelector('.filter-box-value');
            if (filterBoxValue) {
              filterBoxValue.textContent = button.textContent;
            }
          }
        }
        
        filterItems();
      });
    });

    // Mobile dropdown toggle for category filters
    const filterCategories = document.querySelector('.filter-categories');
    const filterCategoriesHeader = filterCategories ? filterCategories.querySelector('.filter-box-header') : null;
    
    if (filterCategoriesHeader && filterCategories) {
      filterCategoriesHeader.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          e.stopPropagation();
          filterCategories.classList.toggle('open');
        }
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (filterCategories && !filterCategories.contains(e.target)) {
          filterCategories.classList.remove('open');
        }
      });
    }
    
    // Filter box toggle
    if (filterBoxHeader && filterBox) {
      filterBoxHeader.addEventListener('click', (e) => {
        e.stopPropagation();
        filterBox.classList.toggle('open');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!filterBox.contains(e.target)) {
          filterBox.classList.remove('open');
        }
      });
    }
    
    // Year filter buttons
    yearButtons.forEach(button => {
      button.addEventListener('click', () => {
        yearButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentYear = button.getAttribute('data-year');
        
        // Update the displayed value
        if (filterBoxValue) {
          const displayText = currentYear === 'all' ? 'All' : 
                             currentYear === 'early' ? 'Early' : currentYear;
          filterBoxValue.textContent = displayText;
        }
        
        // Close dropdown
        if (filterBox) {
          filterBox.classList.remove('open');
        }
        
        filterItems();
      });
    });

    if (archiveSearchInput) {
      archiveSearchInput.addEventListener('input', () => {
        currentSearch = archiveSearchInput.value || '';
        filterItems();
      });
    }
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
      const captchaQuestion = document.querySelector('#captcha-question').innerText;
      const userAnswer = parseInt(document.querySelector('#captcha-answer').value, 10);
      const numbers = captchaQuestion.match(/\d+/g).map(Number);
      const correctAnswer = numbers[0] + numbers[1];

      if (userAnswer !== correctAnswer) {
        event.preventDefault();
        alert('Incorrect answer to the security question. Please try again.');
        return;
      }

      const honeypot = document.querySelector('#honeypot').value;
      if (honeypot !== '') {
        event.preventDefault();
        console.log('Honeypot field triggered. Likely a bot.');
        alert('Spam protection triggered. Please try again.');
        contactForm.reset();
        return;
      }
    });
  }

  const faqItems = document.querySelectorAll('.contact-faq .faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach((faqItem) => {
      faqItem.addEventListener('toggle', () => {
        if (!faqItem.open) {
          return;
        }

        faqItems.forEach((otherItem) => {
          if (otherItem !== faqItem) {
            otherItem.open = false;
          }
        });
      });
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
      pdfViewer.src = '../documents/CV.pdf';
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
                   currentPath.includes('/cv/') || currentPath.includes('/contact/') || 
                   currentPath.includes('/community/') || currentPath.includes('/shop/') ? '../icons/' : 'icons/';
  
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
  
  // Initialize keyboard navigation for work pages
  initializeKeyboardNavigation();

  // Initialize curated related works section on work pages
  initializeCuratedRelatedWorks();
});

// --------------------
// KEYBOARD NAVIGATION FOR WORK PAGES
// --------------------

function initializeKeyboardNavigation() {
  // Check if we're on a work page
  const prevLink = document.querySelector('.prev-work');
  const nextLink = document.querySelector('.next-work');
  
  if (!prevLink && !nextLink) return; // Not on a work page
  
  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing in an input, textarea, or contenteditable
    if (e.target.matches('input, textarea, [contenteditable="true"]')) {
      return;
    }
    
    // Left arrow - previous work
    if (e.key === 'ArrowLeft' && prevLink && prevLink.href && prevLink.href !== '#') {
      e.preventDefault();
      window.location.href = prevLink.href;
    }
    
    // Right arrow - next work
    if (e.key === 'ArrowRight' && nextLink && nextLink.href && nextLink.href !== '#') {
      e.preventDefault();
      window.location.href = nextLink.href;
    }
  });
  
  console.log('Keyboard navigation initialized');
}

// --------------------
// CURATED RELATED WORKS FOR WORK PAGES
// --------------------

function initializeCuratedRelatedWorks() {
  const workPage = document.querySelector('.work-page');
  if (!workPage) return;
  if (workPage.querySelector('.curated-related')) return;

  const normalizePath = (path) => {
    const decoded = decodeURIComponent(path || '');
    return decoded
      .replace(/\/index\.html$/, '/')
      .replace(/\/+$/, '/')
      .toLowerCase();
  };

  const currentPath = normalizePath(window.location.pathname);

  const curatedSets = {
    devotional: [
      {
        href: '/collections/printmaking/reliquary-heart/index.html',
        title: 'Reliquary Heart',
        lens: 'Symbol',
        reason: 'Sacred icon language transformed through print and ritual intimacy.'
      },
      {
        href: '/collections/printmaking/the-unholy-gaze/index.html',
        title: 'The Unholy Gaze',
        lens: 'Theme',
        reason: 'Interrogates how belief systems shape who is seen as pure or profane.'
      },
      {
        href: '/collections/illustration/anointed-gaze/index.html',
        title: 'Anointed Gaze',
        lens: 'Mood',
        reason: 'Quietly devotional, uneasy, and charged with spiritual tension.'
      }
    ],
    inheritance: [
      {
        href: '/collections/illustration/abuelas-altar/index.html',
        title: "Abuela's Altar",
        lens: 'Theme',
        reason: 'A lineage-centered piece where grief, care, and memory coexist.'
      },
      {
        href: '/collections/objects/feathers-along-the-bend/index.html',
        title: 'Feathers Along the Bend',
        lens: 'Symbol',
        reason: 'Uses fragile materials to hold presence, loss, and family memory.'
      },
      {
        href: '/collections/printmaking/unbecoming/index.html',
        title: 'Unbecoming',
        lens: 'Mood',
        reason: 'Carries the emotional aftermath of inherited expectations and identity rupture.'
      }
    ],
    systems: [
      {
        href: '/collections/printmaking/the-unholy-gaze/index.html',
        title: 'The Unholy Gaze',
        lens: 'Theme',
        reason: 'Centers surveillance, judgment, and power under institutional belief.'
      },
      {
        href: '/collections/printmaking/unbecoming/index.html',
        title: 'Unbecoming',
        lens: 'Mood',
        reason: 'Tracks the internal cost of pressure, scrutiny, and forced transformation.'
      },
      {
        href: '/collections/design/contemporary-contexts-zine/index.html',
        title: 'Designer Tribute Zine',
        lens: 'Symbol',
        reason: 'Editorial form used to question systems and frame critical visual narratives.'
      }
    ],
    printRitual: [
      {
        href: '/collections/printmaking/reliquary-heart/index.html',
        title: 'Reliquary Heart',
        lens: 'Symbol',
        reason: 'Ritual object and print process merge into a devotional visual language.'
      },
      {
        href: '/collections/printmaking/the-living-room/index.html',
        title: 'The Living Room',
        lens: 'Mood',
        reason: 'Organic dream logic creates a world that feels alive, strange, and sacred.'
      },
      {
        href: '/collections/illustration/abuelas-altar/index.html',
        title: "Abuela's Altar",
        lens: 'Theme',
        reason: 'Shares the same devotional impulse through memory and symbolic objects.'
      }
    ],
    materialRemains: [
      {
        href: '/collections/objects/remnants/index.html',
        title: 'Remnants',
        lens: 'Theme',
        reason: 'Material residue as evidence of memory, erosion, and time.'
      },
      {
        href: '/collections/objects/unraveling/index.html',
        title: 'Unraveling',
        lens: 'Mood',
        reason: 'A tense, unstable feeling held together through form and texture.'
      },
      {
        href: '/collections/objects/gnaw/index.html',
        title: 'Gnaw',
        lens: 'Symbol',
        reason: 'Embodies consumption, anxiety, and persistence through tactile process.'
      }
    ],
    ecologyDream: [
      {
        href: '/collections/objects/abyss-bloom/index.html',
        title: 'Abyss Bloom',
        lens: 'Theme',
        reason: 'A speculative ecosystem where beauty and threat occupy the same space.'
      },
      {
        href: '/collections/printmaking/the-living-room/index.html',
        title: 'The Living Room',
        lens: 'Mood',
        reason: 'Transforms environment into organism with surreal, bioluminescent energy.'
      },
      {
        href: '/collections/illustration/heaven-on-fire/index.html',
        title: 'Heaven on Fire',
        lens: 'Symbol',
        reason: 'Natural and spiritual imagery collide in a charged atmospheric scene.'
      }
    ],
    designNarrative: [
      {
        href: '/collections/design/editorial-spread/index.html',
        title: 'Editorial Spreads',
        lens: 'Theme',
        reason: 'Narrative pacing through typography, hierarchy, and image rhythm.'
      },
      {
        href: '/collections/design/contemporary-contexts-zine/index.html',
        title: 'Designer Tribute Zine',
        lens: 'Symbol',
        reason: 'Publication design used as a vessel for visual research and homage.'
      },
      {
        href: '/collections/design/themed-playing-card-design/index-case-study.html',
        title: 'Themed Playing Cards',
        lens: 'Mood',
        reason: 'System-based design with character, motif repetition, and worldbuilding.'
      }
    ],
    brandingIdentity: [
      {
        href: '/collections/design/insane-grain-packaging/index.html',
        title: 'Snack Packaging',
        lens: 'Theme',
        reason: 'Brand voice translated into bold visuals, tone, and product storytelling.'
      },
      {
        href: '/collections/design/City Reliquary/index.html',
        title: 'City Reliquary',
        lens: 'Symbol',
        reason: 'Identity system rooted in memory objects and place-based narrative.'
      },
      {
        href: '/collections/design/Threads/index.html',
        title: 'Threads',
        lens: 'Mood',
        reason: 'Experimental mark-making with tension between structure and movement.'
      }
    ],
    entryPoint: [
      {
        href: '/collections/illustration/abuelas-altar/index.html',
        title: "Abuela's Altar",
        lens: 'Theme',
        reason: 'For memory, ritual, and devotional symbolism.'
      },
      {
        href: '/collections/printmaking/the-unholy-gaze/index.html',
        title: 'The Unholy Gaze',
        lens: 'Symbol',
        reason: 'For power, scrutiny, and religious framing of the body.'
      },
      {
        href: '/collections/objects/remnants/index.html',
        title: 'Remnants',
        lens: 'Mood',
        reason: 'For material memory, erosion, and haunting aftermath.'
      }
    ]
  };

  const workToSet = {
    '/collections/illustration/abuelas-altar/': 'devotional',
    '/collections/design/insane-grain-packaging/': 'brandingIdentity',
    '/collections/illustration/inheritance/': 'inheritance',
    '/collections/design/editorial-spread/': 'designNarrative',
    '/collections/printmaking/the-unholy-gaze/': 'systems',
    '/collections/design/contemporary-contexts-zine/': 'designNarrative',
    '/collections/illustration/anointed-gaze/': 'devotional',
    '/collections/design/threads/': 'brandingIdentity',
    '/collections/printmaking/reliquary-heart/': 'printRitual',
    '/collections/design/city reliquary/': 'brandingIdentity',
    '/collections/design/themed-playing-card-design/index-case-study/': 'designNarrative',
    '/collections/objects/abyss-bloom/': 'ecologyDream',
    '/collections/design/endangered-species-poster/': 'ecologyDream',
    '/collections/printmaking/the-living-room/': 'ecologyDream',
    '/collections/illustration/heaven-on-fire/': 'ecologyDream',
    '/collections/objects/feathers-along-the-bend/': 'inheritance',
    '/collections/printmaking/unbecoming/': 'systems',
    '/collections/objects/gnaw/': 'materialRemains',
    '/collections/objects/unraveling/': 'materialRemains',
    '/collections/objects/remnants/': 'materialRemains'
  };

  const setName = workToSet[currentPath] || 'entryPoint';
  const sourceItems = curatedSets[setName] || curatedSets.entryPoint;

  const currentNormalized = normalizePath(window.location.pathname);
  let relatedItems = sourceItems.filter((item) => normalizePath(item.href) !== currentNormalized);

  if (relatedItems.length < 2) {
    const fallback = curatedSets.entryPoint.filter((item) => normalizePath(item.href) !== currentNormalized);
    fallback.forEach((item) => {
      if (!relatedItems.find((existing) => normalizePath(existing.href) === normalizePath(item.href))) {
        relatedItems.push(item);
      }
    });
  }

  relatedItems = relatedItems.slice(0, 3);
  if (relatedItems.length < 2) return;

  const section = document.createElement('section');
  section.className = 'curated-related';
  section.setAttribute('aria-labelledby', 'curated-related-title');

  section.innerHTML = `
    <div class="curated-related-inner">
      <h2 id="curated-related-title">YOU MIGHT ALSO LIKE THIS</h2>
      <p class="curated-related-intro">Curated connections by theme, symbol, and mood — like someone guiding you through the archive.</p>
      <div class="curated-related-grid">
        ${relatedItems.map((item) => `
          <a class="curated-related-card" href="${item.href}">
            <span class="curated-related-lens">${item.lens}</span>
            <h3>${item.title}</h3>
            <p>${item.reason}</p>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  workPage.appendChild(section);
}

// ...existing code...

