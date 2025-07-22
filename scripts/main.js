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
     3. PORTFOLIO CAROUSEL
     -------------------- */

  // Select all necessary carousel elements from the DOM.
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    let currentIndex = 0; // This variable keeps track of the current slide index.
    const totalItems = carouselItems.length;

    // --- Create Indicator Dots ---
    // This function dynamically creates the dots at the bottom of the carousel.
    function createIndicators() {
        // First, clear any existing indicators.
        indicatorsContainer.innerHTML = '';
        // Loop through each carousel item.
        carouselItems.forEach((_, index) => {
            // Create a new button element for each dot.
            const dot = document.createElement('button');
            // Add the CSS class for styling.
            dot.classList.add('indicator-dot');
            // Add a data attribute to store the index of the slide it corresponds to.
            dot.dataset.index = index;
            // Add the 'active' class to the first dot.
            if (index === 0) {
                dot.classList.add('active');
            }
            // Add the dot to the container.
            indicatorsContainer.appendChild(dot);
        });
    }

    // --- Update Carousel State ---
    // This is the main function for changing slides.
    function updateCarousel(newIndex) {
        // Remove the 'active' class from the current slide and indicator.
        carouselItems[currentIndex].classList.remove('active');
        const currentDot = indicatorsContainer.querySelector(`[data-index='${currentIndex}']`);
        if(currentDot) currentDot.classList.remove('active');


        // Update the currentIndex to the new index.
        currentIndex = newIndex;

        // Add the 'active' class to the new slide and indicator.
        carouselItems[currentIndex].classList.add('active');
        const newDot = indicatorsContainer.querySelector(`[data-index='${currentIndex}']`);
        if(newDot) newDot.classList.add('active');

        // This is the magic part: it moves the entire '.carousel-inner' container
        // horizontally. The amount it moves is the width of a slide (100%)
        // multiplied by the current index.
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }


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

  }

});
