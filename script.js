// Wordplay – interactivity and UX enhancements
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Mobile nav toggle
  const navToggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Reveal on scroll
  const revealEls = $$('[data-animate]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Accordion
  $$('.accordion-item').forEach(item => {
    const header = $('.accordion-header', item);
    const panel = $('.accordion-panel', item);
    if (!header || !panel) return;
    header.addEventListener('click', () => {
      const expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });

  // Contact form validation and faux submit
  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const name = $('#name');
      const email = $('#email');
      const company = $('#company');
      const setErr = (el, msg) => { const err = el?.nextElementSibling; if (err) err.textContent = msg || ''; };

      if (!name.value.trim()) { setErr(name, 'Please enter your name'); valid = false; } else setErr(name);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { setErr(email, 'Enter a valid email'); valid = false; } else setErr(email);
      if (!company.value.trim()) { setErr(company, 'Please enter your company'); valid = false; } else setErr(company);

      if (!valid) return;

      // Simulate success
      form.reset();
      toast('Thanks! We\'ll get back to you shortly.');
    });
  }

  // Footer year
  const y = new Date().getFullYear();
  const yEl = $('#year'); if (yEl) yEl.textContent = String(y);

  // Toast
  function toast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
})();
