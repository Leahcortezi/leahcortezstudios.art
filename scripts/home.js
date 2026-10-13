/*
  home.js: the three bits of motion on the Home page. No dependencies.

  1. Polaroids: the front card and the two behind it cycle through the work every 3.4s.
     They pause on hover/focus, when the tab is hidden, and under "reduce motion".
     The front card links to whichever project is showing.
  2. About folder tabs: role="tablist" with arrow-key support.
  3. Tear-off tabs on the flyer: the tab falls away, then comes back after 2.6s.
     The link still fires.

  The project list for the polaroids lives in index.html (the <img data-*> attributes in
  the first .lc-pol-img stack), so adding or reordering a project is an HTML edit.
*/
(function () {
  'use strict';

  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* 1. polaroids */
  var wrap = document.querySelector('[data-pols]');
  if (wrap) {
    var ROT = [-2.2, 1.6, -1.2, 2.2, -1.6, 1.1];
    var stacks = Array.prototype.slice.call(wrap.querySelectorAll('[data-pol-stack]'));
    var front = stacks[0].querySelectorAll('img');
    var n = front.length;
    var link = wrap.querySelector('[data-pol-link]');
    var title = wrap.querySelector('[data-pol-title]');
    var meta = wrap.querySelector('[data-pol-meta]');
    var count = wrap.querySelector('[data-pol-count]');
    var i = 0, hold = false;

    var show = function (idx) {
      i = idx % n;
      stacks.forEach(function (s) {
        var off = Number(s.getAttribute('data-offset')) || 0;
        var imgs = s.querySelectorAll('img');
        for (var k = 0; k < imgs.length; k++) imgs[k].classList.toggle('is-on', k === (i + off) % n);
      });
      var cur = front[i];
      link.href = cur.getAttribute('data-href');
      title.textContent = cur.getAttribute('data-title');
      meta.textContent = cur.getAttribute('data-meta');
      count.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
      link.style.transform = 'rotate(' + ROT[i % ROT.length] + 'deg)';
      link.setAttribute('aria-label', cur.getAttribute('data-title') + ', ' + cur.getAttribute('data-meta') + '. Opens the project');
    };
    show(0);

    var holdOn = function () { hold = true; };
    var holdOff = function () { hold = false; };
    wrap.addEventListener('mouseenter', holdOn);
    wrap.addEventListener('mouseleave', holdOff);
    link.addEventListener('focus', holdOn);
    link.addEventListener('blur', holdOff);

    if (!reduce) {
      setInterval(function () { if (!hold && !document.hidden) show(i + 1); }, 3400);
    }
  }

  /* 2. folder tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.lc-tab'));
  if (tabs.length) {
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var pick = function (k, focus) {
      tabs.forEach(function (t, j) {
        var on = j === k;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabs[k].focus();
    };
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { pick(k, false); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); pick((k + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); pick((k - 1 + tabs.length) % tabs.length, true); }
      });
    });
  }

  /* 3. tear-off tabs */
  document.querySelectorAll('.lc-tear').forEach(function (t) {
    var timer;
    t.addEventListener('click', function () {
      if (t.classList.contains('is-torn')) return;
      t.classList.add('is-torn');
      clearTimeout(timer);
      timer = setTimeout(function () { t.classList.remove('is-torn'); }, 2600);
    });
  });
})();
