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
});
