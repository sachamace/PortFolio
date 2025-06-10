document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  let isDarkMode = false;

  function enableDarkMode() {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    isDarkMode = true;
    localStorage.setItem('theme', 'dark');
  }

  function enableLightMode() {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    isDarkMode = false;
    localStorage.setItem('theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    if (isDarkMode) {
      enableLightMode();
    } else {
      enableDarkMode();
    }
  });

  // Vérification du thème sauvegardé au chargement de la page
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    enableDarkMode();
  }

  // Gestion de l'affichage des détails du projet
  const projectCards = document.querySelectorAll('.project-card');
  const sidebar = document.getElementById('project-sidebar');
  const closeBtn = document.getElementById('close-sidebar');
  const sidebarTitle = document.getElementById('sidebar-title');
  const sidebarDesc = document.getElementById('sidebar-description');
  const sidebarImage = document.getElementById('sidebar-image');
  const sidebarLink = document.getElementById('sidebar-link');
  const sidebarGit = document.getElementById('sidebar-git');

  projectCards.forEach(card => {
    card.querySelector('.show-details').addEventListener('click', () => {
      const title = card.dataset.title;
      const description = card.dataset.description;
      const image = card.dataset.image;
      const link = card.dataset.link;
      const git = card.dataset.git;

      sidebarTitle.textContent = title;
      sidebarDesc.textContent = description;
      sidebarImage.src = image;
      sidebarLink.href = link;
      sidebarGit.href = git;
      sidebar.classList.add('visible');
    });
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('visible');
  });

  // Gestion du filtrage des compétences
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  function filterSkills(category) {
    skillCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-cat');

      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');
      filterSkills(filterValue);
    });
  });

  // Animation au défilement
  function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, {
      threshold: 0.1
    });

    skillCards.forEach(card => {
      observer.observe(card);
    });
  }

  animateOnScroll();

  // Effet de parallaxe léger sur les cartes
  document.addEventListener('mousemove', function (e) {
    const cards = document.querySelectorAll('.skill-card');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardX = (rect.left + rect.width / 2) / window.innerWidth;
      const cardY = (rect.top + rect.height / 2) / window.innerHeight;

      const deltaX = (x - cardX) * 5;
      const deltaY = (y - cardY) * 5;

      if (card.matches(':hover')) {
        card.style.transform = `translateY(-10px) scale(1.02) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
      }
    });
  });
});
