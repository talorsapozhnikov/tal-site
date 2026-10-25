/* Small, optional reveal motion for editorial sections and gallery rows. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll('.sec-head, .sel-group, .cat, .chapter, .p-head, .next, .seq > .b');
  if (!targets.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  document.documentElement.classList.add('motion-ready');
  targets.forEach(function (target) {
    target.classList.add('reveal');
    observer.observe(target);
  });
})();
