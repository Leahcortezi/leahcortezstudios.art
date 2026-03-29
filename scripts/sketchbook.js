document.addEventListener('DOMContentLoaded', () => {
  const sketchbookPage = document.querySelector('.sketchbook-page');
  if (sketchbookPage) {
    sketchbookPage.classList.add('is-enhanced');
  }

  if (window.location.protocol === 'file:') {
    const warning = document.getElementById('protocolWarning');
    if (warning) warning.hidden = false;
  }

  const pages = Array.from(document.querySelectorAll('.sketch-page'));
  const nextButton = document.getElementById('nextPage');
  const prevButton = document.getElementById('prevPage');
  const counter = document.getElementById('pageCounter');

  if (!pages.length || !nextButton || !prevButton || !counter) return;

  let currentPage = 0;

  function updatePageStack() {
    pages.forEach((page, index) => {
      if (index < currentPage) {
        page.classList.add('flipped');
      } else {
        page.classList.remove('flipped');
      }

      page.style.zIndex = String(pages.length - index);
    });

    const shownPage = Math.min(currentPage + 1, pages.length);
    counter.textContent = `Page ${shownPage} of ${pages.length}`;

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= pages.length - 1;
  }

  function goNext() {
    if (currentPage < pages.length - 1) {
      currentPage += 1;
      updatePageStack();
    }
  }

  function goPrev() {
    if (currentPage > 0) {
      currentPage -= 1;
      updatePageStack();
    }
  }

  nextButton.addEventListener('click', goNext);
  prevButton.addEventListener('click', goPrev);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      goNext();
    }

    if (event.key === 'ArrowLeft') {
      goPrev();
    }
  });

  updatePageStack();
});
