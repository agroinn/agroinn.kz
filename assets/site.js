const languageToggle = document.querySelector(".language-toggle");
const languageDestination = languageToggle.getAttribute("href");

function syncLanguageLink() {
  languageToggle.setAttribute("href", languageDestination + window.location.hash);
}

syncLanguageLink();
window.addEventListener("hashchange", syncLanguageLink);

const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
const header = menu.closest(".site-header");

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
}

header.classList.add("has-menu-toggle");
menu.hidden = false;

menu.addEventListener("click", () => {
  setMenu(menu.getAttribute("aria-expanded") === "false");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

header.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});

const mobileLayout = window.matchMedia("(max-width: 1080px)");
mobileLayout.addEventListener("change", () => setMenu(false));

const tabList = document.querySelector(".product-tabs");
const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

function selectTab(index, moveFocus = false) {
  tabs.forEach((tab, position) => {
    const selected = position === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[position].hidden = !selected;
    panels[position].tabIndex = selected ? 0 : -1;
  });
  if (moveFocus) tabs[index].focus();
}

const keyboardActions = {
  ArrowRight: (index) => (index + 1) % tabs.length,
  ArrowLeft: (index) => (index + tabs.length - 1) % tabs.length,
  Home: () => 0,
  End: () => tabs.length - 1,
};

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(index));
  tab.addEventListener("keydown", (event) => {
    const getIndex = keyboardActions[event.key];
    if (!Object.hasOwn(keyboardActions, event.key)) return;
    event.preventDefault();
    selectTab(getIndex(index), true);
  });
});

selectTab(0);
tabList.hidden = false;
