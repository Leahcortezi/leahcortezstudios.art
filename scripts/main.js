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

  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const masonryItems = document.querySelectorAll('.masonry-item');

  if (filterButtons.length > 0 && masonryItems.length > 0) {
    
    // Initialize masonry layout
    function initMasonry() {
      // The CSS handles the masonry layout using CSS columns
      // Add staggered animation delays for a nice entrance effect
      masonryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
      });
    }

    // Filter functionality
    function filterItems(category) {
      masonryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.style.display = 'inline-block';
        } else {
          item.classList.add('hidden');
          // Small delay before hiding to allow transition
          setTimeout(() => {
            if (item.classList.contains('hidden')) {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter category and apply filter
        const filterCategory = button.getAttribute('data-filter');
        filterItems(filterCategory);
      });
    });

    // Initialize masonry on page load
    initMasonry();
  }

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

}); // End of DOMContentLoaded event listener

/* --------------------
   7. UTILITY FUNCTIONS
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
