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
    const decoded = decodeURIComponent((path || '').split('?')[0].split('#')[0]);
    const marker = '/collections/';
    const markerIndex = decoded.toLowerCase().indexOf(marker);
    const scopedPath = markerIndex >= 0 ? decoded.slice(markerIndex) : decoded;

    return scopedPath
      .replace(/\/(index|index-case-study)\.html$/i, '/')
      .replace(/\/+$/, '/')
      .toLowerCase();
  };

  const currentPath = normalizePath(window.location.pathname);
  const collectionsIndex = window.location.pathname.toLowerCase().indexOf('/collections/');
  const basePrefix = collectionsIndex > 0 ? window.location.pathname.slice(0, collectionsIndex) : '';

  const withBase = (urlPath) => {
    if (!urlPath) return '';
    if (/^https?:\/\//i.test(urlPath)) return urlPath;
    if (urlPath.startsWith('/')) return `${basePrefix}${urlPath}`;
    return urlPath;
  };

  const perPieceRecommendations = {
    '/collections/illustration/abuelas-altar/': [
      { href: '/collections/printmaking/reliquary-heart/index.html', lens: 'Symbol', reason: 'Ritual object language and devotional iconography echo this altar energy.' },
      { href: '/collections/illustration/inheritance/index.html', lens: 'Theme', reason: 'Both pieces hold family memory, grief, and generational identity.' },
      { href: '/collections/illustration/anointed-gaze/index.html', lens: 'Mood', reason: 'A similarly intimate spiritual tension with sacred visual cues.' }
    ],
    '/collections/design/insane-grain-packaging/': [
      { href: '/collections/design/space-age-wine-packaging/index.html', lens: 'Theme', reason: 'Packaging redesign centered on concept, audience, and strong visual narrative.' },
      { href: '/collections/design/Threads/index.html', lens: 'Symbol', reason: 'Bold brand voice translated through typographic personality and form.' },
      { href: '/collections/design/City Reliquary/index.html', lens: 'Symbol', reason: 'Identity work grounded in narrative systems and cultural reference.' },
      { href: '/collections/design/editorial-spread/index.html', lens: 'Mood', reason: 'Shares the same pacing, hierarchy, and visual confidence.' }
    ],
    '/collections/illustration/inheritance/': [
      { href: '/collections/illustration/abuelas-altar/index.html', lens: 'Theme', reason: 'A companion piece on family lineage, absence, and memory.' },
      { href: '/collections/printmaking/unbecoming/index.html', lens: 'Mood', reason: 'Carries emotional pressure, rupture, and identity transformation.' },
      { href: '/collections/objects/feathers-along-the-bend/index.html', lens: 'Symbol', reason: 'Fragile materials and gesture used to hold memory in form.' }
    ],
    '/collections/design/editorial-spread/': [
      { href: '/collections/design/contemporary-contexts-zine/index.html', lens: 'Theme', reason: 'Editorial storytelling and sequence-driven communication.' },
      { href: '/collections/design/themed-playing-card-design/index-case-study.html', lens: 'Symbol', reason: 'System design built from repeated motifs and visual structure.' },
      { href: '/collections/design/City Reliquary/index.html', lens: 'Mood', reason: 'Strong typographic rhythm with conceptual narrative framing.' }
    ],
    '/collections/printmaking/the-unholy-gaze/': [
      { href: '/collections/printmaking/unbecoming/index.html', lens: 'Theme', reason: 'Continues the critique of judgment, control, and identity strain.' },
      { href: '/collections/printmaking/reliquary-heart/index.html', lens: 'Symbol', reason: 'Sacred symbolism reworked through print and bodily language.' },
      { href: '/collections/illustration/anointed-gaze/index.html', lens: 'Mood', reason: 'Hushed but charged, balancing devotion with discomfort.' }
    ],
    '/collections/design/contemporary-contexts-zine/': [
      { href: '/collections/design/editorial-spread/index.html', lens: 'Theme', reason: 'A close continuation of publication storytelling and hierarchy.' },
      { href: '/collections/design/themed-playing-card-design/index-case-study.html', lens: 'Symbol', reason: 'Repeating motif systems and information architecture.' },
      { href: '/collections/design/endangered-species-poster/index.html', lens: 'Mood', reason: 'Urgent message-driven design with strong visual impact.' }
    ],
    '/collections/illustration/anointed-gaze/': [
      { href: '/collections/illustration/abuelas-altar/index.html', lens: 'Theme', reason: 'Devotional imagery and spiritual inheritance overlap deeply.' },
      { href: '/collections/printmaking/the-unholy-gaze/index.html', lens: 'Symbol', reason: 'Religious framing and the gaze become central visual forces.' },
      { href: '/collections/printmaking/reliquary-heart/index.html', lens: 'Mood', reason: 'Ritual intimacy and sacred atmosphere resonate across both works.' }
    ],
    '/collections/design/threads/': [
      { href: '/collections/design/space-age-wine-packaging/index.html', lens: 'Theme', reason: 'Illustration-led branding with clear hierarchy and a concept-driven voice.' },
      { href: '/collections/design/insane-grain-packaging/index.html', lens: 'Symbol', reason: 'Brand identity translated into energetic visual voice.' },
      { href: '/collections/design/City Reliquary/index.html', lens: 'Mood', reason: 'Identity systems driven by narrative structure and visual cohesion.' }
    ],
    '/collections/design/space-age-wine-packaging/': [
      { href: '/collections/design/insane-grain-packaging/index.html', lens: 'Theme', reason: 'Packaging strategy driven by clear audience positioning and concept.' },
      { href: '/collections/design/City Reliquary/index.html', lens: 'Symbol', reason: 'Narrative identity where illustration and typographic system work together.' },
      { href: '/collections/design/Threads/index.html', lens: 'Mood', reason: 'Expressive line quality and bold brand voice with contemporary energy.' }
    ],
    '/collections/printmaking/reliquary-heart/': [
      { href: '/collections/illustration/abuelas-altar/index.html', lens: 'Theme', reason: 'A shared ritual language around devotion, loss, and remembrance.' },
      { href: '/collections/printmaking/the-unholy-gaze/index.html', lens: 'Symbol', reason: 'Sacred symbolism and bodily scrutiny appear in different registers.' },
      { href: '/collections/printmaking/the-living-room/index.html', lens: 'Mood', reason: 'Print textures holding a dreamlike spiritual atmosphere.' }
    ],
    '/collections/design/city reliquary/': [
      { href: '/collections/design/Threads/index.html', lens: 'Theme', reason: 'Identity direction through mark, motion, and typographic tone.' },
      { href: '/collections/design/insane-grain-packaging/index.html', lens: 'Symbol', reason: 'Narrative branding where objects carry meaning.' },
      { href: '/collections/design/editorial-spread/index.html', lens: 'Mood', reason: 'Strong layout rhythm and conceptual storytelling.' }
    ],
    '/collections/design/themed-playing-card-design/': [
      { href: '/collections/design/editorial-spread/index.html', lens: 'Theme', reason: 'Structured visual systems and sequencing.' },
      { href: '/collections/design/contemporary-contexts-zine/index.html', lens: 'Symbol', reason: 'Publication logic and recurring motif language.' },
      { href: '/collections/design/endangered-species-poster/index.html', lens: 'Mood', reason: 'Bold communication with clear conceptual framing.' }
    ],
    '/collections/objects/abyss-bloom/': [
      { href: '/collections/printmaking/the-living-room/index.html', lens: 'Theme', reason: 'Organic, speculative ecosystems and unfamiliar life forms.' },
      { href: '/collections/illustration/heaven-on-fire/index.html', lens: 'Mood', reason: 'Atmospheric intensity with surreal environmental charge.' },
      { href: '/collections/objects/remnants/index.html', lens: 'Symbol', reason: 'Material form used to hold time, pressure, and residue.' }
    ],
    '/collections/design/endangered-species-poster/': [
      { href: '/collections/objects/abyss-bloom/index.html', lens: 'Theme', reason: 'Ecological concern translated into visceral visual form.' },
      { href: '/collections/printmaking/the-living-room/index.html', lens: 'Symbol', reason: 'Environment treated as an active living body.' },
      { href: '/collections/design/themed-playing-card-design/index-case-study.html', lens: 'Mood', reason: 'Systemic design language with strong concept-driven clarity.' }
    ],
    '/collections/printmaking/the-living-room/': [
      { href: '/collections/objects/abyss-bloom/index.html', lens: 'Theme', reason: 'A related world of biological surrealism and speculative nature.' },
      { href: '/collections/illustration/heaven-on-fire/index.html', lens: 'Mood', reason: 'Charged atmosphere and otherworldly visual intensity.' },
      { href: '/collections/printmaking/reliquary-heart/index.html', lens: 'Symbol', reason: 'Print process carrying ritual and emotional density.' }
    ],
    '/collections/illustration/heaven-on-fire/': [
      { href: '/collections/printmaking/the-living-room/index.html', lens: 'Theme', reason: 'Dream-logic environments where worlds feel sentient.' },
      { href: '/collections/objects/abyss-bloom/index.html', lens: 'Symbol', reason: 'Organic forms as metaphors for tension and emergence.' },
      { href: '/collections/illustration/anointed-gaze/index.html', lens: 'Mood', reason: 'Spiritual unease and intimate emotional heat.' }
    ],
    '/collections/objects/feathers-along-the-bend/': [
      { href: '/collections/illustration/inheritance/index.html', lens: 'Theme', reason: 'Material and gesture both carrying generational memory.' },
      { href: '/collections/illustration/abuelas-altar/index.html', lens: 'Symbol', reason: 'Presence, care, and remembrance embodied through objects.' },
      { href: '/collections/objects/remnants/index.html', lens: 'Mood', reason: 'Quiet residue and fragile persistence over time.' }
    ],
    '/collections/printmaking/unbecoming/': [
      { href: '/collections/printmaking/the-unholy-gaze/index.html', lens: 'Theme', reason: 'Directly connected through scrutiny, control, and social pressure.' },
      { href: '/collections/illustration/inheritance/index.html', lens: 'Mood', reason: 'Shared emotional terrain of inherited tension and rupture.' },
      { href: '/collections/objects/gnaw/index.html', lens: 'Symbol', reason: 'Embodied anxiety translated into tactile form.' }
    ],
    '/collections/objects/gnaw/': [
      { href: '/collections/objects/unraveling/index.html', lens: 'Theme', reason: 'Companion material language around instability and erosion.' },
      { href: '/collections/objects/remnants/index.html', lens: 'Mood', reason: 'A similar afterimage of pressure, residue, and persistence.' },
      { href: '/collections/printmaking/unbecoming/index.html', lens: 'Symbol', reason: 'Internal tension made visible through fractured form.' }
    ],
    '/collections/objects/unraveling/': [
      { href: '/collections/objects/gnaw/index.html', lens: 'Theme', reason: 'Parallel exploration of breakdown through texture and form.' },
      { href: '/collections/objects/remnants/index.html', lens: 'Symbol', reason: 'Material fragments as evidence of lived pressure.' },
      { href: '/collections/objects/feathers-along-the-bend/index.html', lens: 'Mood', reason: 'Fragility and suspension held in sculptural balance.' }
    ],
    '/collections/objects/remnants/': [
      { href: '/collections/objects/unraveling/index.html', lens: 'Theme', reason: 'Shared language of deterioration, fracture, and remains.' },
      { href: '/collections/objects/gnaw/index.html', lens: 'Symbol', reason: 'A tactile vocabulary of compression and compulsion.' },
      { href: '/collections/objects/feathers-along-the-bend/index.html', lens: 'Mood', reason: 'Quiet traces of what lingers after a moment has passed.' }
    ]
  };

  const relatedThumbs = {
    '/collections/illustration/abuelas-altar/': '/collections/illustration/abuelas-altar/images/JPEG/Studio10.jpg',
    '/collections/design/insane-grain-packaging/': '/collections/design/insane-grain-packaging/images/snackmockup.jpg',
    '/collections/illustration/inheritance/': '/collections/illustration/inheritance/images/JPEG/Personal1.jpg',
    '/collections/design/editorial-spread/': '/collections/design/editorial-spread/editorial%20spread%20mockup.jpg',
    '/collections/printmaking/the-unholy-gaze/': '/collections/printmaking/The%20Unholy%20Gaze.jpg',
    '/collections/design/contemporary-contexts-zine/': '/collections/design/contemporary-contexts-zine/zine-mockup.jpg',
    '/collections/illustration/anointed-gaze/': '/collections/illustration/anointed-gaze/images/JPEG/personal6.jpg',
    '/collections/design/threads/': '/collections/design/Threads/bagsmockup.jpg',
    '/collections/design/space-age-wine-packaging/': '/collections/design/space-age-wine-packaging/images/mockupfinalfinal.jpg',
    '/collections/printmaking/reliquary-heart/': '/collections/printmaking/Reliquary.jpg',
    '/collections/design/city reliquary/': '/collections/design/City%20Reliquary/PosterMOckup.jpg',
    '/collections/design/historicalposters/': '/collections/design/HISTORICALPOSTERS/allmockup.jpg',
    '/collections/design/themed-playing-card-design/': '/collections/design/themed-playing-card-design/images/card-mockup.jpg',
    '/collections/objects/abyss-bloom/': '/collections/objects/abyss-bloom/images/JPEG/studio2.jpg',
    '/collections/design/endangered-species-poster/': '/collections/design/endangered-species-poster/images/KoalaMockup.jpg',
    '/collections/printmaking/the-living-room/': '/collections/printmaking/The%20Living%20Room.jpg',
    '/collections/illustration/heaven-on-fire/': '/collections/illustration/heaven-on-fire/images/JPEG/personal7.jpg',
    '/collections/objects/feathers-along-the-bend/': '/collections/objects/feathers-along-the-bend/images/JPEG/studio8.jpg',
    '/collections/printmaking/unbecoming/': '/collections/printmaking/Unbecoming.jpg',
    '/collections/objects/gnaw/': '/collections/objects/gnaw/images/JPEG/Studio6.jpg',
    '/collections/objects/unraveling/': '/collections/objects/unraveling/images/JPEG/Studio5.jpg',
    '/collections/objects/remnants/': '/collections/objects/remnants/images/JPEG/studio1.jpg'
  };

  const relatedTitles = {
    '/collections/illustration/abuelas-altar/': "Abuela's Altar",
    '/collections/design/insane-grain-packaging/': 'Snack Packaging',
    '/collections/illustration/inheritance/': 'Inheritance',
    '/collections/design/editorial-spread/': 'Editorial Spreads',
    '/collections/printmaking/the-unholy-gaze/': 'The Unholy Gaze',
    '/collections/design/contemporary-contexts-zine/': 'Designer Tribute Zine',
    '/collections/illustration/anointed-gaze/': 'Anointed Gaze',
    '/collections/design/threads/': 'Threads',
    '/collections/design/space-age-wine-packaging/': 'Space Age Wine Packaging',
    '/collections/printmaking/reliquary-heart/': 'Reliquary Heart',
    '/collections/design/city reliquary/': 'City Reliquary',
    '/collections/design/historicalposters/': 'Historical Poster Series',
    '/collections/design/themed-playing-card-design/': 'Themed Playing Cards',
    '/collections/objects/abyss-bloom/': 'Abyss Bloom',
    '/collections/design/endangered-species-poster/': 'Disappearing Species',
    '/collections/printmaking/the-living-room/': 'The Living Room',
    '/collections/illustration/heaven-on-fire/': 'Heaven on Fire',
    '/collections/objects/feathers-along-the-bend/': 'Feathers Along the Bend',
    '/collections/printmaking/unbecoming/': 'Unbecoming',
    '/collections/objects/gnaw/': 'Gnaw',
    '/collections/objects/unraveling/': 'Unraveling',
    '/collections/objects/remnants/': 'Remnants'
  };

  const getThumbForHref = (href) => {
    const normalized = normalizePath(href);
    return relatedThumbs[normalized] || '';
  };

  const getTitleForHref = (href) => {
    const normalized = normalizePath(href);
    return relatedTitles[normalized] || 'Related Work';
  };

  const fallbackItems = [
    { href: '/collections/illustration/abuelas-altar/index.html', lens: 'Theme', reason: 'Memory and ritual grounded in intimate symbolism.' },
    { href: '/collections/printmaking/the-unholy-gaze/index.html', lens: 'Symbol', reason: 'Power, scrutiny, and spiritual framing through print.' },
    { href: '/collections/objects/remnants/index.html', lens: 'Mood', reason: 'Material residue carrying emotional afterlife.' }
  ];

  const currentNormalized = normalizePath(window.location.pathname);
  let relatedItems = (perPieceRecommendations[currentPath] || []).filter(
    (item) => normalizePath(item.href) !== currentNormalized
  );

  if (relatedItems.length < 2) {
    fallbackItems.forEach((item) => {
      const normalizedHref = normalizePath(item.href);
      if (normalizedHref !== currentNormalized && !relatedItems.find((existing) => normalizePath(existing.href) === normalizedHref)) {
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
      <div class="curated-related-grid">
        ${relatedItems.map((item) => `
          <a class="curated-related-card" href="${withBase(item.href)}">
            ${getThumbForHref(item.href) ? `
              <div class="curated-related-thumb-wrap">
                <img class="curated-related-thumb" src="${withBase(getThumbForHref(item.href))}" alt="${getTitleForHref(item.href)} thumbnail" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('no-thumb');">
              </div>
            ` : ''}
            <div class="curated-related-copy">
              <span class="curated-related-lens">${item.lens}</span>
              <h3>${getTitleForHref(item.href)}</h3>
              <p>${item.reason}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  workPage.appendChild(section);
}

// ...existing code...

