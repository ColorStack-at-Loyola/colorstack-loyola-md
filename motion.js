(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = [...document.querySelectorAll('body > section')];
  const footer = document.querySelector('footer');

  document.querySelectorAll('.site-brand').forEach((link) => link.classList.add('interactive-brand'));
  document.querySelectorAll('.site-nav-links > a:not(.nav-join)').forEach((link) => link.classList.add('interactive-nav-link'));
  document.querySelectorAll('.nav-join, .welcome-buttons a, .welcome-button2').forEach((link) => link.classList.add('interactive-cta'));

  document.querySelectorAll('section img:not(.logo-track img), .linkedin-logo').forEach((image) => {
    image.classList.add('interactive-image');
  });

  const contentSections = sections.slice(1);
  const revealItems = [];

  contentSections.forEach((section, sectionIndex) => {
    const directContent = [...section.children].filter((element) =>
      element.matches('div, h1, h2, h3, p')
    );

    if (directContent.length) {
      directContent.forEach((element, itemIndex) => {
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(itemIndex * 90, 270)}ms`);
        revealItems.push(element);
      });
    } else {
      section.classList.add('reveal');
      revealItems.push(section);
    }

    if (sectionIndex === 0 && directContent[0]) {
      const heroColumns = [...directContent[0].children].filter((element) => element.tagName === 'DIV');
      heroColumns.forEach((column, index) => {
        column.classList.add('reveal', index === 0 ? 'reveal-from-left' : 'reveal-from-right');
        column.style.setProperty('--reveal-delay', `${120 + index * 100}ms`);
        revealItems.push(column);
      });
    }
  });

  if (footer) {
    footer.classList.add('reveal');
    revealItems.push(footer);
  }

  document.documentElement.classList.add('motion-ready');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((element) => observer.observe(element));
})();
