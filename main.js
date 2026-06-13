(function () {
  'use strict';

  const progressBar = document.getElementById('progressBar');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const words = ['restaurant', 'école', 'PME', 'boulangerie', 'particulier', 'commerce'];
  const typewriterEl = document.getElementById('typewriterWord');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseEnd = 0;

  function typewriter() {
    const current = words[wordIndex];
    const now = Date.now();

    if (pauseEnd > now) {
      requestAnimationFrame(typewriter);
      return;
    }

    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        pauseEnd = now + 2000;
      }
    } else {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        pauseEnd = now + 400;
      }
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(typewriter, speed);
  }

  typewriter();

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const sections = document.querySelectorAll('section[id]');
  const navLinks = nav.querySelectorAll('a');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (window.location.protocol === 'file:') {
        e.preventDefault();
        alert('Formulaire prêt pour Netlify. En local, contactez-moi à : abdramanediallo005@gmail.com');
      }
    });
  }
})();
