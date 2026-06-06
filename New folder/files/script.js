/* ─────────────────────────────────────────
   TANU SHARMA PORTFOLIO — script.js
   ───────────────────────────────────────── */

"use strict";

// ─── CUSTOM CURSOR ───
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
  cursorDot.style.left  = e.clientX + 'px';
  cursorDot.style.top   = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .cert-card, .skill-category').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── HAMBURGER / MOBILE MENU ───
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── TYPING ANIMATION ───
const phrases = [
  "intelligent AI systems.",
  "secure web apps.",
  "elegant algorithms.",
  "powerful experiences.",
  "the future of tech."
];

const typedEl = document.getElementById('typedText');
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
  }

  let delay = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

// Start after a brief delay (allows hero reveal animation)
setTimeout(type, 900);

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within the same parent
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── SKILL BAR ANIMATION ───
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ─── PROJECT CARD STAGGER ───
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.setProperty('--index', i);
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── ACTIVE NAV HIGHLIGHT ───
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ─── CONTACT FORM ───
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulate async send
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
    success.classList.add('show');
    form.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      success.classList.remove('show');
    }, 4000);
  }, 1500);
});

// ─── PARALLAX ORBS (subtle, desktop only) ───
if (window.matchMedia('(hover: hover)').matches) {
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
    });
  }, { passive: true });
}

// ─── HERO ENTRANCE (trigger immediately) ───
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => {
      el.style.transitionDelay = '';
      el.classList.add('visible');
    }, i * 140);
  });
});
