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
  if (grid) {
    imagesLoaded(grid, function () {
      msnry = new Masonry(grid, {
        itemSelector: '.masonry-item',
        columnWidth: '.grid-sizer',
        gutter: 35,
        percentPosition: true,
        horizontalOrder: true,
        transitionDuration: '0.4s'
      });
      
      // Initialize filtering after Masonry is ready
      initializeFiltering();
    });
  }
  
  // Portfolio filtering logic
  function initializeFiltering() {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const masonryItems = document.querySelectorAll('.masonry-item');

    function filterItems(category) {
      console.log('Filtering by category:', category);
      let visibleCount = 0;
      
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
      
      // Update Masonry layout after a brief delay for CSS transitions
      if (msnry) {
        setTimeout(() => {
          msnry.layout();
          console.log('Masonry layout updated');
        }, 320);
      }
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
     1. MOBILE NAVIGATION (HAMBURGER MENU)
     -------------------- */

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
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

  // Add keyboard support for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Add keyboard support for hamburger menu
  if (hamburger) {
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
      }
    });
  }

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

  // Initialize floating icons with a small delay
  setTimeout(createFloatingIcons, 100);

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

function createFloatingIcons() {
  // Embed simplified SVG content directly to avoid path/server issues
  const svgContent = {
    'flower': `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <path d="M540.01,472c13.8-50.29,32.48-99.33,45.71-149.78,12.77-48.71,23.48-113.52-12.2-155.23-37.77-44.15-103.38-37.16-132.32,12.71-31.13,53.63-5.86,131.92,10.54,187.07,10.56,35.54,22.39,70.79,33.27,106.22-.81.84-4.84-3.56-5.61-4.37-16.85-17.48-33.68-35.54-49.9-53.61-36.6-40.78-92.21-119.47-146.28-132.72-69.4-17-125.95,47.96-101.69,114.69,19.24,52.92,79.69,69.66,128.27,83.73,42.2,12.23,85.12,22.2,127.21,34.79,4.43,1.32,10.88,2.49,14,5.49-47.94,13.04-96.52,24.39-144.22,38.29-59.68,17.4-137.03,44.38-131.77,121.2,5.2,76.04,87.43,100.26,146.3,60.32s101.15-114.4,151.66-161.34l11.02-10.47c-5.73,19.96-11.58,39.92-17.73,59.76-19.22,62.06-55.75,147.44-32.01,211.48,29.2,78.78,135.42,73.09,158.25-7.25,19.96-70.25-23.74-166.73-43.77-235.23-2.79-9.56-6.51-20.05-7.24-29.76,19.16,21.48,38.91,42.46,58.02,63.98,36.36,40.95,86.8,112.19,141.27,125.73,79.44,19.74,140.21-64.96,94.62-133.62-26.38-39.74-84.65-55.24-128.19-67.81-44.14-12.74-88.98-23.42-133.21-35.78l132.21-36.79c53.05-15.27,123.98-33.44,141.05-93.95,18.63-66.07-39.66-122.76-105.47-107.47-55.4,12.87-110.85,92.2-148.28,133.72-17.25,19.14-35.23,37.86-53.5,55.99Z" fill="#666" stroke="#333" stroke-width="1"/>
    </svg>`,
    'star': `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <path d="M50 5 C55 25, 75 45, 95 50 C75 55, 55 75, 50 95 C45 75, 25 55, 5 50 C25 45, 45 25, 50 5 Z" fill="#666" stroke="#333" stroke-width="1"/>
    </svg>`,
    'starburst': `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <path d="M808.18,207.52c-34.56,41.79-70.67,83.45-95.16,132.33-25.95,51.78-36.52,101.93,24.48,131.84,61.54,30.17,136.65,33.3,203.69,41.32-54.22,3.69-109.38,7.33-161.53,23.48-82.68,25.6-109.5,64.38-68,147.04,24.93,49.67,64.18,94.04,99.52,136.48.94,1.13,2.43,1.63,1.99,3.5-49.86-40.49-103.23-87.96-163.72-111.77-113.86-44.81-126.75,80.96-139.14,160.4l-8.12,74.37c-2.99-36.52-6.78-73.12-13.32-109.18-8.58-47.29-26.27-129.72-85.31-135.69-44.65-4.51-120.96,48.88-156.29,75.46l-59.08,47.4c32.97-36.97,65.68-75.56,91.42-118.07,17.9-29.56,41.92-76.16,29.07-110.9-11.62-31.44-51.24-47.59-80.97-57.03-53.65-17.05-111.64-21.26-167.53-25.48,64.99-6.77,135.06-10.79,195.99-36.02,79.13-32.76,61.29-92.85,25.84-153.81-24.73-42.53-57.54-80.01-88.83-117.66l55.1,42.39c35.75,26.29,108.71,77.03,153.37,75.6,48.84-1.56,70.58-65.13,80.85-104.17,12.17-46.27,16.85-94.19,20.17-141.84,2.01,0,1.35,15.37,1.51,17.5,4.27,58.19,14.91,149.12,48.36,197.64,53.14,77.09,157.64-16.46,210.52-49.74l45.11-35.38Z" fill="#666" stroke="#333" stroke-width="1"/>
    </svg>`
  };
  
  // Create container for floating icons
  const floatingContainer = document.createElement('div');
  floatingContainer.className = 'floating-icons';
  document.body.appendChild(floatingContainer);

  const icons = ['flower', 'star', 'starburst'];
  const sizes = ['small', 'medium', 'large'];
  const rotations = ['rotate-1', 'rotate-2', 'rotate-3'];
  
  // Predefined positions to ensure visibility
  const positions = [
    { left: 10, top: 20 },
    { left: 80, top: 15 },
    { left: 20, top: 60 },
    { left: 70, top: 70 },
    { left: 30, top: 30 },
    { left: 85, top: 50 },
    { left: 15, top: 80 },
    { left: 60, top: 25 },
    { left: 40, top: 75 },
    { left: 75, top: 40 },
    { left: 25, top: 50 },
    { left: 90, top: 80 }
  ];
  
  // Create 12 floating icons with predefined positions
  for (let i = 0; i < 12; i++) {
    const iconElement = document.createElement('div');
    iconElement.className = 'floating-icon';
    
    // Random icon, size, and rotation
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    
    iconElement.classList.add(randomSize, randomRotation);
    
    // Use embedded SVG for all icons
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = svgContent[randomIcon];
    const svgElement = svgContainer.querySelector('svg');
    
    if (svgElement) {
      svgElement.style.width = '100%';
      svgElement.style.height = '100%';
      iconElement.appendChild(svgElement);
    }
    
    // Use predefined positions
    const position = positions[i];
    iconElement.style.left = position.left + '%';
    iconElement.style.top = position.top + '%';
    
    floatingContainer.appendChild(iconElement);
  }
  
  // Scroll-based movement - optimized for smoothness
  let scrollY = 0;
  let ticking = false;
  
  const updateIconPositions = () => {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach((icon, index) => {
      const speed = 0.1 + (index % 3) * 0.05; // Slower, gentler movement
      const movement = scrollY * speed; // All move in same direction (down when scrolling down)
      
      // Use translate3d for better performance, keeping CSS rotation intact
      icon.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
    
    ticking = false;
  };
  
  const handleScroll = () => {
    scrollY = window.scrollY;
    
    if (!ticking) {
      requestAnimationFrame(updateIconPositions);
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ...existing code...

