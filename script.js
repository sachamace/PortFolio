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

  /* ----- Filtrage des technologies ----- */
  const techButtons = document.querySelectorAll('.filter-btn');
  const techCards = document.querySelectorAll('.tech-card');

  techButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // état visuel onglet actif
      techButtons.forEach(b => b.classList.toggle('active', b === btn));
      const cat = btn.dataset.filter;
      techCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
});

