/*
  v2.js: small helpers for the Work and Project pages. No dependencies.

  1. Hero videos: respect "reduce motion" (show the poster, don't autoplay) and use the
     video's real shape to pick the frame ratio. 1.45 or wider fills the frame;
     anything narrower sits in a 16:9 frame on black.
  2. Work filters: show/hide cards by tag. Card numbers never change.
  3. Hamburger: keep aria-expanded in step with main.js, which toggles .active.
*/
(function () {
  'use strict';

  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* 1. hero videos */
  document.querySelectorAll('video[data-lc-hero]').forEach(function (v) {
    var frame = v.closest('.lc-hero-frame');
    function fit() {
      if (!frame || !v.videoWidth || !v.videoHeight) return;
      var r = v.videoWidth / v.videoHeight;
      if (r >= 1.45) {
        frame.style.setProperty('--ar', v.videoWidth + ' / ' + v.videoHeight);
        frame.style.setProperty('--fit', 'cover');
      } else {
        frame.style.setProperty('--ar', '16 / 9');
        frame.style.setProperty('--fit', 'contain');
      }
    }
    v.muted = true;
    v.setAttribute('playsinline', '');
    if (reduce) {
      v.removeAttribute('autoplay');
      v.preload = 'none';
      v.pause();
      v.load();
    } else {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }
    if (v.readyState >= 1) fit();
    v.addEventListener('loadedmetadata', fit);
  });

  /* 2. Work filters */
  var bar = document.querySelector('[data-lc-filters]');
  var grid = document.querySelector('[data-lc-grid]');
  if (bar && grid) {
    var buttons = Array.prototype.slice.call(bar.querySelectorAll('[data-filter]'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.lc-card'));
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        cards.forEach(function (c) {
          var tags = (c.getAttribute('data-tags') || '').split('|');
          c.hidden = !(f === 'All' || tags.indexOf(f) !== -1);
        });
      });
    });
  }

  /* 3. hamburger state */
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if (burger && links && window.MutationObserver) {
    var sync = function () { burger.setAttribute('aria-expanded', links.classList.contains('active') ? 'true' : 'false'); };
    sync();
    new MutationObserver(sync).observe(links, { attributes: true, attributeFilter: ['class'] });
  }
})();
