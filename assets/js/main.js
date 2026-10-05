const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const headerInner = document.querySelector('.site-header .header-inner');
const headerCta = document.querySelector('.site-header .header-cta');
const currentLanguage = document.documentElement.lang === 'kk' ? 'kk' : 'ru';

function closeMenu() {
  if (!menuButton || !menu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

function addLanguageSwitcher() {
  if (!headerInner || headerInner.querySelector('.language-switch')) return;

  const switcher = document.createElement('nav');
  switcher.className = 'language-switch';
  switcher.setAttribute('aria-label', currentLanguage === 'kk' ? 'Тілді таңдау' : 'Выбор языка');

  const russian = document.createElement('a');
  russian.href = '/';
  russian.className = `language-choice${currentLanguage === 'ru' ? ' is-active' : ''}`;
  russian.setAttribute('lang', 'ru');
  if (currentLanguage === 'ru') russian.setAttribute('aria-current', 'page');
  russian.innerHTML = '<span class="language-full">Русский</span><span class="language-short">RU</span>';

  const kazakh = document.createElement('a');
  kazakh.href = '/kz/';
  kazakh.className = `language-choice${currentLanguage === 'kk' ? ' is-active' : ''}`;
  kazakh.setAttribute('lang', 'kk');
  if (currentLanguage === 'kk') kazakh.setAttribute('aria-current', 'page');
  kazakh.innerHTML = '<span class="language-full">Қазақша</span><span class="language-short">ҚАЗ</span>';

  switcher.append(russian, kazakh);

  if (headerCta) {
    headerInner.insertBefore(switcher, headerCta);
  } else {
    headerInner.appendChild(switcher);
  }
}

function addLanguageSwitcherStyles() {
  if (document.getElementById('language-switch-styles')) return;

  const style = document.createElement('style');
  style.id = 'language-switch-styles';
  style.textContent = `
    .language-switch {
      display: inline-flex;
      flex: none;
      align-items: center;
      gap: 3px;
      padding: 4px;
      border: 1px solid rgba(32, 112, 50, 0.18);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 6px 18px rgba(42, 65, 43, 0.08);
      backdrop-filter: blur(10px);
    }

    .language-choice {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 34px;
      padding: 7px 11px;
      border-radius: 999px;
      color: #657068;
      font-size: 0.78rem;
      font-weight: 800;
      line-height: 1;
      text-decoration: none;
      white-space: nowrap;
      transition: color 160ms ease, background 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }

    .language-choice:not(.is-active):hover {
      color: #207032;
      background: #eef5eb;
      transform: translateY(-1px);
    }

    .language-choice.is-active {
      color: #fff;
      background: #207032;
      box-shadow: 0 5px 14px rgba(32, 112, 50, 0.22);
      cursor: default;
    }

    .language-short { display: none; }

    @media (max-width: 1240px) {
      .site-header .language-switch {
        order: 2;
        margin-left: auto;
      }
      .site-header .menu-button {
        order: 3;
        margin-left: 0;
      }
    }

    @media (max-width: 520px) {
      .language-switch { padding: 3px; }
      .language-choice {
        min-height: 32px;
        padding: 6px 9px;
        font-size: 0.72rem;
      }
      .language-full { display: none; }
      .language-short { display: inline; }
    }
  `;
  document.head.appendChild(style);
}

addLanguageSwitcherStyles();
addLanguageSwitcher();

if (menuButton && menu) {
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
