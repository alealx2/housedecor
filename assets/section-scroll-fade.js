const SELECTOR = '[data-scroll-fade]';

function reveal(element) {
  element.classList.add('is-visible');
}

function setupScrollFade() {
  const elements = Array.from(document.querySelectorAll(SELECTOR));

  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(reveal);
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  elements.forEach((element) => {
    if (element.classList.contains('is-visible')) return;
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', setupScrollFade);
document.addEventListener('shopify:section:load', setupScrollFade);
