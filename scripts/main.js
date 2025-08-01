/*
  Rachel Anduja Real Estate - Main JavaScript File
  ---
  This file contains the scripts for site-wide interactivity, including
  the mobile navigation, testimonial slider, and other dynamic features.
*/

// Using a DOMContentLoaded event listener ensures the script runs only after the
// entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------
     1. MOBILE NAVIGATION TOGGLE
     -------------------- */

  // Select the hamburger menu icon and the navigation links container.
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Check if both elements exist on the page to avoid errors on pages
  // that might not have them.
  if (hamburger && navLinks) {
    // Add a click event listener to the hamburger icon.
    hamburger.addEventListener('click', () => {
      // Toggle the 'active' class on the nav-links container.
      // The CSS handles the actual showing and hiding of the menu.
      navLinks.classList.toggle('active');
    });
  }


  /* --------------------
     2. TESTIMONIAL SLIDER
     -------------------- */
  
  // Select all the testimonial slides.
  const slides = document.querySelectorAll('.testimonial-slide');
  // Check if there is more than one slide to avoid running the slider if there's only one testimonial.
  if (slides.length > 1) {
    let currentSlide = 0; // Initialize the current slide index.

    // Function to show a specific slide
    const showSlide = (index) => {
      // Remove 'active' class from all slides
      slides.forEach(slide => slide.classList.remove('active'));
      // Add 'active' class to the target slide
      slides[index].classList.add('active');
    };

    // Function to show the next slide in the sequence
    const nextSlide = () => {
      // Increment the current slide index.
      // Use the modulo operator (%) to loop back to 0 when it reaches the end.
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    // Set an interval to automatically call the nextSlide function every 5 seconds (5000 milliseconds).
    setInterval(nextSlide, 5000);
  }

  /* --------------------
     3. PARALLAX SCROLL EFFECT
     -------------------- */

  // Select the hero background element.
  const heroBg = document.querySelector('.hero-bg');

  // Check if the hero background element exists.
  if (heroBg) {
    // Add a scroll event listener to the window.
    window.addEventListener('scroll', () => {
      // Get the vertical scroll position of the window.
      const scrollPosition = window.pageYOffset;

      // Apply a transform to the background element.
      // The '0.5' factor slows down the scroll speed of the background, creating the parallax illusion.
      // The background moves at half the speed of the page scroll.
      heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  }

});
