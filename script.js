document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

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
     Hero : petite animation d'entrée au chargement (une seule fois,
     pas liée au scroll)
  --------------------------------------------------------------------- */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.5 })
    .from('.hero-line', { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.25')
    .from('.hero-subtitle', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
    .from('.hero-cta', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4');

  /* ---------------------------------------------------------------------
     Blobs : flottement continu en fond, purement décoratif
  --------------------------------------------------------------------- */
  gsap.to('.blob-1', { x: 50, y: 30, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.blob-2', { x: -40, y: -40, duration: 16, repeat: -1, yoyo: true, ease: 'sine.inOut' });

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
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---------------------------------------------------------------------
     Sidebar de détail projet
  --------------------------------------------------------------------- */
  const sidebar = document.getElementById('project-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const closeBtn = document.getElementById('close-sidebar');
  const sidebarMeta = document.getElementById('sidebar-meta');
  const sidebarAward = document.getElementById('sidebar-award');
  const sidebarTitle = document.getElementById('sidebar-title');
  const sidebarDesc = document.getElementById('sidebar-description');
  const sidebarTags = document.getElementById('sidebar-tags');
  const sidebarLinks = document.getElementById('sidebar-links');

  function openSidebar(card) {
    const { title, meta, award, description, tags, git, link } = card.dataset;

    sidebarMeta.textContent = meta || '';
    if (award) {
      sidebarAward.textContent = `★ ${award}`;
      sidebarAward.classList.add('visible');
    } else {
      sidebarAward.textContent = '';
      sidebarAward.classList.remove('visible');
    }
    sidebarTitle.textContent = title;
    sidebarDesc.textContent = description;
    sidebarTags.textContent = (tags || '').split(',').filter(Boolean).map((t) => t.trim()).join(' · ');

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
