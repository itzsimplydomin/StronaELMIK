document.addEventListener('DOMContentLoaded', () => {

  // Menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Animacja kafelków
  const animateCards = () => {
    const cards = document.querySelectorAll('.services-grid .card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-100px)';
      card.style.animation = `slideInFromLeft 0.6s ease-out ${index * 0.1}s forwards`;
    });

    const btn = document.getElementById('toggle-offers');
    if (btn) {
      btn.style.opacity = '0';
      setTimeout(() => {
        btn.style.transition = 'opacity 0.5s ease-out';
        btn.style.opacity = '1';
      }, cards.length * 100 + 300);
    }
  };

  // Obsługa przycisku "Rozwiń ofertę"
  const grid = document.querySelector('.services-grid .grid');
  const btn = document.getElementById('toggle-offers');

  if (grid && btn) {

    btn.addEventListener('click', () => {
      const isExpanded = grid.classList.toggle('expanded');
      btn.textContent = isExpanded ? 'Zwiń ofertę' : 'Rozwiń ofertę';

      if (isExpanded) {
        const hiddenCards = document.querySelectorAll('.services-grid .grid .card:nth-child(n+9)');
        hiddenCards.forEach((card, index) => {
          card.style.animation = `slideInFromLeft 0.6s ease-out ${index * 0.1 + 0.3}s forwards`;
        });
      }
    });

    // Obserwacja wejścia sekcji w viewport
    const offerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCards();
          offerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    offerObserver.observe(document.querySelector('.services-grid'));
  }
});
