/*
  Leah Cortez Studio Art - Main JavaScript File
  ---
  This file contains all the global JavaScript functionality for the website,
  such as the mobile navigation (hamburger menu) and potentially other
  interactive elements like carousels or form validation.
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
      // This function can be extended for more complex masonry needs
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
   4. GALLERY FILTERING (Legacy - kept for compatibility)
   -------------------- */

// TODO: Add JavaScript for gallery filtering here if needed.

  // --- Event Listeners ---
  // Add a click event listener to the 'next' button.
  nextButton.addEventListener('click', () => {
      // Calculate the next index. If we're at the last slide, loop back to the first (index 0).
      const newIndex = (currentIndex + 1) % totalItems;
      updateCarousel(newIndex);
  });

  // Add a click event listener to the 'previous' button.
  prevButton.addEventListener('click', () => {
      // Calculate the previous index. If we're at the first slide, loop to the last one.
      const newIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel(newIndex);
  });

  // Add a click event listener to the indicators container.
  // This uses event delegation to handle clicks on any dot.
  indicatorsContainer.addEventListener('click', (e) => {
      // Check if the clicked element is actually a dot.
      if (e.target.classList.contains('indicator-dot')) {
          // Get the index from the dot's data attribute.
          const newIndex = parseInt(e.target.dataset.index, 10);
          updateCarousel(newIndex);
      }
  });

  // --- Initialization ---
  // As soon as the script runs, create the indicators and set the first slide.
  createIndicators();
  // We need to manually re-set the first item to active after the indicators are created.
  // This is a bit of a hack to make sure the transform style is applied correctly.
  carouselItems.forEach(item => item.classList.remove('active'));
updateCarousel(0)

});
