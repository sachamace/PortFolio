document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------------
     Smooth scroll (Lenis) synchronisé avec GSAP
  --------------------------------------------------------------------- */
  let lenis;
  if (typeof Lenis !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------------------------------------------------------------------
     Thème clair / sombre
  --------------------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ---------------------------------------------------------------------
     Nav : état au scroll + menu mobile
  --------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('navbar-links');

  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onUpdate: (self) => {
      header.classList.toggle('scrolled', self.scroll() > 80);
    }
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---------------------------------------------------------------------
     Barre de progression de scroll
  --------------------------------------------------------------------- */
  const progressBar = document.getElementById('scroll-progress');
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      progressBar.style.width = `${self.progress * 100}%`;
    }
  });

  /* ---------------------------------------------------------------------
     Hero : révélation du titre + éléments
  --------------------------------------------------------------------- */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 })
    .from('.hero-line', {
      yPercent: 120,
      opacity: 0,
      duration: 1,
      stagger: 0.12
    }, '-=0.3')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-stats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');

  /* Compteurs de stats */
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: target,
      duration: 1.4,
      delay: 1.2,
      snap: { innerText: 1 },
      ease: 'power2.out'
    });
  });

  /* ---------------------------------------------------------------------
     Blobs : flottement continu
  --------------------------------------------------------------------- */
  gsap.to('.blob-1', { x: 60, y: 40, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.blob-2', { x: -50, y: 60, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.blob-3', { x: 40, y: -50, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  /* ---------------------------------------------------------------------
     Révélations au scroll (sections, cartes, etc.)
  --------------------------------------------------------------------- */
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      },
      delay: (i % 3) * 0.08
    });
  });

  /* ---------------------------------------------------------------------
     Cartes projets : léger tilt à la souris
  --------------------------------------------------------------------- */
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateX: y * -6,
        rotateY: x * 8,
        transformPerspective: 900,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });

  /* ---------------------------------------------------------------------
     Boutons magnétiques
  --------------------------------------------------------------------- */
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.4, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  /* ---------------------------------------------------------------------
     Filtres de compétences
  --------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;

      skillCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (match) {
          gsap.to(card, { opacity: 1, scale: 1, display: 'block', duration: 0.35, ease: 'power2.out' });
        } else {
          gsap.to(card, {
            opacity: 0, scale: 0.85, duration: 0.25, ease: 'power2.in',
            onComplete: () => { card.style.display = 'none'; }
          });
        }
      });
    });
  });

  /* ---------------------------------------------------------------------
     Sidebar de détail projet
  --------------------------------------------------------------------- */
  const sidebar = document.getElementById('project-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const closeBtn = document.getElementById('close-sidebar');
  const sidebarIcon = document.getElementById('sidebar-icon');
  const sidebarBadge = document.getElementById('sidebar-badge');
  const sidebarTitle = document.getElementById('sidebar-title');
  const sidebarDesc = document.getElementById('sidebar-description');
  const sidebarTags = document.getElementById('sidebar-tags');
  const sidebarLinks = document.getElementById('sidebar-links');

  function openSidebar(card) {
    const { title, badge, description, tags, git, link } = card.dataset;
    const iconClass = card.querySelector('.project-visual i').className;
    const gradient = card.style.getPropertyValue('--card-grad');

    sidebarIcon.innerHTML = `<i class="${iconClass}"></i>`;
    sidebarIcon.style.background = gradient || '';
    sidebarBadge.textContent = badge || '';
    sidebarTitle.textContent = title;
    sidebarDesc.textContent = description;

    sidebarTags.innerHTML = '';
    (tags || '').split(',').filter(Boolean).forEach((tag) => {
      const span = document.createElement('span');
      span.textContent = tag.trim();
      sidebarTags.appendChild(span);
    });

    sidebarLinks.innerHTML = '';
    if (git) {
      const a = document.createElement('a');
      a.href = git;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'sidebar-link';
      a.innerHTML = '<i class="fa-brands fa-github"></i> Code source';
      sidebarLinks.appendChild(a);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'sidebar-link secondary';
      a.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Voir le projet';
      sidebarLinks.appendChild(a);
    }

    sidebar.classList.add('visible');
    overlay.classList.add('visible');
  }

  function closeSidebar() {
    sidebar.classList.remove('visible');
    overlay.classList.remove('visible');
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    const btn = card.querySelector('.project-more');
    btn.addEventListener('click', () => openSidebar(card));
  });

  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  /* ---------------------------------------------------------------------
     Année du footer
  --------------------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();
});
