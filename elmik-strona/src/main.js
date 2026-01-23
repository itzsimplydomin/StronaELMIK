// ===== Toggle Menu =====
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// ===== Expand/Collapse Offers =====
const toggleBtn = document.getElementById('toggle-offers');
const servicesGrid = document.querySelector('.services-grid .grid');

if (toggleBtn && servicesGrid) {
  toggleBtn.addEventListener('click', () => {
    const isExpanded = servicesGrid.classList.contains('expanded');

    if (isExpanded) {
      servicesGrid.classList.remove('expanded');
      toggleBtn.textContent = 'Rozwiń ofertę';
    } else {
      servicesGrid.classList.add('expanded');
      toggleBtn.textContent = 'Zwiń ofertę';

      // Animuj nowo pokazane karty (9+)
      const hiddenCards = document.querySelectorAll('.services-grid .grid .card:nth-child(n+9)');
      hiddenCards.forEach((card, index) => {
        card.classList.remove('reveal-animate');
        card.style.setProperty('--delay', `${index * 0.1}s`);
        // reflow
        card.offsetHeight;
        card.classList.add('reveal-animate');
      });
    }
  });
}

// ===== Intersection Observer dla animacji przy scrollu =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Obserwuj sekcje
const sections = document.querySelectorAll('.services-grid, .about-section, .company-info');
sections.forEach(section => {
  animateOnScroll.observe(section);
});

// ===== Inicjalizacja animacji kafelków przy załadowaniu strony =====
document.addEventListener('DOMContentLoaded', () => {
  
  const cards = document.querySelectorAll('.services-grid .card');
  cards.forEach(card => {
    card.style.opacity = '';
    card.style.transform = '';
    card.style.animation = '';
  });

  const btn = document.getElementById('toggle-offers');
  if (btn) {
    btn.style.opacity = '';
    btn.style.transition = '';
  }
});

// ===== Smooth scroll dla linków =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});