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

  projectCards.forEach(card => {
    card.querySelector('.show-details').addEventListener('click', () => {
      const title = card.dataset.title;
      const description = card.dataset.description;
      const image = card.dataset.image;

      sidebarTitle.textContent = title;
      sidebarDesc.textContent = description;
      sidebarImage.src = image;
      sidebar.classList.add('visible');
    });
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('visible');
  });
});

