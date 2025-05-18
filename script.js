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

  const widget = document.currentScript.previousElementSibling;   // la div.skills-widget
  const panel = widget.querySelector('.skills-panel');
  const tabs = widget.querySelectorAll('.skills-tabs button');

  // état : scores pour chaque compétence
  const scores = { html: 0, css: 0, js: 0 };

  // construit les 5 barres
  function renderBars(skill) {
    panel.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const bar = document.createElement('div');
      bar.className = 'skills-bar' + (i <= scores[skill] ? ' filled' : '');
      bar.title = `${i}/5`;
      bar.onclick = () => { scores[skill] = i; renderBars(skill); };
      panel.appendChild(bar);
    }
  }

  // gestion des onglets
  tabs.forEach(btn => {
    btn.addEventListener('click', e => {
      tabs.forEach(b => b.classList.toggle('active', b === btn));
      widget.dataset.skill = btn.dataset.skill;
      renderBars(btn.dataset.skill);
    });
  });

  // premier affichage
  renderBars(widget.dataset.skill);

});

