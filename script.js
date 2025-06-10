document.addEventListener('DOMContentLoaded', function () {
  // Cache des éléments DOM
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const projectCards = document.querySelectorAll('.project-card');
  const competenceLinks = document.querySelectorAll('.softskill-card-link');

  competenceLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const selectedCompetence = this.getAttribute('data-competence');

      projectCards.forEach(card => {
        const projectCompetences = card.dataset.competences || "";
        const compArray = projectCompetences.split(',').map(c => c.trim());

        if (selectedCompetence === 'all' || compArray.includes(selectedCompetence)) {
          card.parentElement.style.display = 'block';
        } else {
          card.parentElement.style.display = 'none';
        }
      });

      // Scroll vers la section projets
      document.querySelector('h2.mb-4.text-center').scrollIntoView({ behavior: 'smooth' });
    });
  });
  const sidebar = document.getElementById('project-sidebar');
  const closeBtn = document.getElementById('close-sidebar');
  const sidebarTitle = document.getElementById('sidebar-title');
  const sidebarDesc = document.getElementById('sidebar-description');
  const sidebarImage = document.getElementById('sidebar-image');
  const sidebarLinks = document.getElementById('sidebar-links');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const competenceLabels = {
    dev: "Réaliser un développement d’application",
    data: "Gérer des données de l’information",
    ux: "Optimiser des applications informatiques",
    admin: "Administrer des systèmes informatiques communicants complexes",
    equipe: "Travailler dans une équipe informatique",
    projet: "Conduire un projet"
  };

  let isDarkMode = false;

  // Fonctions pour le thème
  function toggleTheme(isDark) {
    body.classList.toggle('dark-mode', isDark);
    body.classList.toggle('light-mode', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Gestion du thème
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    toggleTheme(isDarkMode);
  });

  // Initialisation du thème
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode = true;
    toggleTheme(true);
  }

  // Gestion de la sidebar des projets
  function openSidebar(title, description, image, link, git, competences) {
    sidebarTitle.textContent = title;
    sidebarDesc.textContent = description;
    sidebarImage.src = image;
    sidebarLinks.innerHTML = '';

    if (link && link.trim() && link.trim() !== '#') {
      const projectLink = document.createElement('a');
      projectLink.href = link;
      projectLink.target = '_blank';
      projectLink.className = 'sidebar-link';
      projectLink.innerHTML = '<i class="bx bx-link-external"></i> Voir le projet';
      sidebarLinks.appendChild(projectLink);
    }

    if (git && git.trim() && git.trim() !== '#') {
      const gitLink = document.createElement('a');
      gitLink.href = git;
      gitLink.target = '_blank';
      gitLink.className = 'sidebar-link';
      gitLink.innerHTML = '<i class="bx bxl-git"></i> Code Source';
      sidebarLinks.appendChild(gitLink);
    }
    if (competences) {
      const compList = document.createElement('ul');
      compList.className = 'competence-list mt-3';

      competences.split(',').forEach(code => {
        const li = document.createElement('li');
        li.textContent = competenceLabels[code.trim()] || code.trim();
        compList.appendChild(li);
      });

      const compTitle = document.createElement('h5');
      compTitle.textContent = "Compétences mobilisées :";
      sidebarLinks.appendChild(compTitle);
      sidebarLinks.appendChild(compList);
    }
    sidebar.classList.add('visible');
  }

  function closeSidebar() {
    sidebar.classList.remove('visible');
  }

  // Event listeners pour les projets
  projectCards.forEach(card => {
    const btn = card.querySelector('.show-details');
    if (btn) {
      btn.addEventListener('click', () => {
        const { title, description, image, link, git, competences } = card.dataset;
        openSidebar(title, description, image, link, git, competences);
      });
    }
  });

  closeBtn.addEventListener('click', closeSidebar);

  // Gestion du filtrage des compétences
  function filterSkills(category) {
    skillCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-cat');
      const shouldShow = category === 'all' || cardCategory === category;

      if (shouldShow) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 30);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  }

  // Event listeners pour les filtres
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Supprimer la classe active de tous les boutons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');
      filterSkills(filterValue);
    });
  });

  // Observer d'intersection pour les animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observer les cartes de compétences
  skillCards.forEach(card => {
    observer.observe(card);
  });

  // Effet parallaxe optimisé avec throttling
  let ticking = false;

  function updateParallax(e) {
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        skillCards.forEach(card => {
          if (card.matches(':hover')) {
            const rect = card.getBoundingClientRect();
            const cardX = (rect.left + rect.width / 2) / window.innerWidth;
            const cardY = (rect.top + rect.height / 2) / window.innerHeight;

            const deltaX = (x - cardX) * 3;
            const deltaY = (y - cardY) * 3;

            card.style.transform = `translateY(-10px) scale(1.02) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
          }
        });

        ticking = false;
      });

      ticking = true;
    }
  }

  document.addEventListener('mousemove', updateParallax);

  // Fermer la sidebar avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('visible')) {
      closeSidebar();
    }
  });

  // Fermer la sidebar en cliquant en dehors
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('visible') &&
      !sidebar.contains(e.target) &&
      !e.target.closest('.show-details')) {
      closeSidebar();
    }
  });
});