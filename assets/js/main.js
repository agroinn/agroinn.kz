const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const currentLanguage = document.documentElement.lang;

function closeMenu() {
  if (!menuButton || !menu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

if (menuButton && menu) {
  const languageLink = document.createElement('a');

  if (currentLanguage === 'kk') {
    languageLink.href = '/';
    languageLink.textContent = 'Русский';
    languageLink.setAttribute('aria-label', 'Орыс тіліндегі нұсқа');
  } else {
    languageLink.href = '/kz/';
    languageLink.textContent = 'Қазақша';
    languageLink.setAttribute('aria-label', 'Қазақ тіліндегі нұсқа');
  }

  languageLink.classList.add('language-link');
  menu.appendChild(languageLink);

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

if (currentLanguage === 'kk') {
  document.querySelectorAll('a[href="/privacy/"]').forEach((link) => {
    link.href = '/kz/privacy/';
  });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
