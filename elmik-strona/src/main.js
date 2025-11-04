document.addEventListener('DOMContentLoaded', () => {
  // Hero Slider
  const slides = document.querySelectorAll('.hero-slider .slide');
  let current = 0;
  const total = slides.length;
  const delay = 5000; // 5 sekund

  // Pokaż pierwszy slajd od razu
  slides[current].classList.add('active');

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % total;
    slides[current].classList.add('active');
  }, delay);

  // Menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Animacja kafelków w ofercie
  const animateCards = () => {
    const cards = document.querySelectorAll('.services-grid .card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-100px)';
      card.style.animation = `slideInFromLeft 0.6s ease-out ${index * 0.1}s forwards`;
    });

    // Opóźnione pojawienie się przycisku "Rozwiń ofertę"
    const btn = document.getElementById('toggle-offers');
    if (btn) {
      btn.style.opacity = '0';
      setTimeout(() => {
        btn.style.transition = 'opacity 0.5s ease-out';
        btn.style.opacity = '1';
      }, cards.length * 100 + 300); // Opóźnienie równe czasowi animacji wszystkich kafelków + 300ms
    }
  }; // Tu było zamknięcie funkcji i średnik, który powodował błąd

  // Obsługa przycisku rozwiń ofertę z animacją
  const grid = document.querySelector('.services-grid .grid');
  
  if (grid && grid.children.length >= 9) {
    // Animuj kafelki przy pierwszym załadowaniu
    const offerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCards();
          offerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    offerObserver.observe(document.querySelector('.services-grid'));

    const btn = document.getElementById('toggle-offers'); 
    btn.addEventListener('click', () => {
      const isExpanded = grid.classList.toggle('expanded');
      btn.textContent = isExpanded ? 'Zwiń ofertę' : 'Rozwiń ofertę';
      
      // Animacja dla nowo pokazanych kafelków
      if (isExpanded) {
        const hiddenCards = document.querySelectorAll('.services-grid .grid .card:nth-child(n+9)');
        hiddenCards.forEach((card, index) => {
          card.style.animation = `slideInFromLeft 0.6s ease-out ${index * 0.1 + 0.3}s forwards`;
        });
      }
    });
  } else {
    const btn = document.getElementById('toggle-offers');
    if (btn) {
      btn.style.display = 'none';
    }
  }


  const runCount = el => {
    const target = +el.getAttribute('data-target');
    const count = +el.innerText;
    const inc = Math.ceil(target / speed);
    if (count < target) {
      el.innerText = count + inc;
      setTimeout(() => runCount(el), 20);
    } else {
      el.innerText = target;
    }
  };

  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => runCount(counter));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});


 
        

