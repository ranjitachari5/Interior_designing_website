// Smooth scroll + active link
const navLinks = document.querySelectorAll('nav a[href^="#"]');
// Automatically add the 'reveal' class to sections for the fade effect
document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal');
});

// ... rest of your existing JS code ...
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1).toLowerCase();
    // Capitalize first letter to match your HTML IDs (e.g., #Contact)
    const formattedId = targetId.charAt(0).toUpperCase() + targetId.slice(1);
    const target = document.getElementById(formattedId);

    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Scroll reveal using IntersectionObserver
const sections = document.querySelectorAll('section');
sections.forEach(sec => sec.classList.add('reveal')); // Automatically add reveal class

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact submit logic
const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = '#22c55e';
      
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 1800);
    }, 900);
  });
}
// Simple featured photos slider
// Simple featured photos slider
const slideContainer = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

if (slideContainer && slideImages.length > 0) {
  let currentIndex = 0;
  let autoPlayId;

  function updateSlider() {
    const offset = -currentIndex * 100;
    slideContainer.style.transform = `translateX(${offset}%)`;

    slideImages.forEach((img, idx) => {
      img.classList.toggle('active', idx === currentIndex);
    });
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % slideImages.length;
    updateSlider();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
    updateSlider();
  }

  // start auto play
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayId = setInterval(goNext, 3000); // 3 seconds
  }

  function stopAutoPlay() {
    if (autoPlayId) clearInterval(autoPlayId);
  }

  // init
  updateSlider();
  startAutoPlay();

  nextBtn.addEventListener('click', () => {
    goNext();
    startAutoPlay(); // restart timer after manual click
  });

  prevBtn.addEventListener('click', () => {
    goPrev();
    startAutoPlay();
  });

  // optional: pause on hover
  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  }
}
