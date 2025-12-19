// Smooth scroll + active link
const navLinks = document.querySelectorAll('nav a[href^="#"]');

// Automatically add the 'reveal' class to sections for the fade effect
document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal');
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1).toLowerCase();
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
sections.forEach(sec => sec.classList.add('reveal'));

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

// WhatsApp Contact Form (Permanent & Safe)
document.getElementById("whatsapp-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const whatsappNumber = "917892356966"; // Business WhatsApp number

  const text =
    `New Property Inquiry\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email || "Not provided"}\n` +
    `Message: ${message || "No message"}`;

  const whatsappURL =
    `https://wa.me/${7892356966}?text=${encodeURIComponent(text)}`;

  window.open(whatsappURL, "_blank");

  document.getElementById("thank-you-message").style.display = "block";
  this.reset();
});

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

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayId = setInterval(goNext, 3000);
  }

  function stopAutoPlay() {
    if (autoPlayId) clearInterval(autoPlayId);
  }

  updateSlider();
  startAutoPlay();

  nextBtn.addEventListener('click', () => {
    goNext();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    goPrev();
    startAutoPlay();
  });

  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  }
}
