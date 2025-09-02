// Website/src/navbar.ts
import { getTheme, toggleTheme, onThemeChange, type Theme } from "./theme";

type MenuItem = { label: string; href: string; external?: boolean};

const MENU_ITEMS: MenuItem[] = [
  { label: "Mission (In Progress)", href: "/webpages/mission.html" },
  { label: "About Us (In Progress)", href: "../webpages/about_us.html" },
  { label: "Github", href: "https://github.com/jacobhallburns/FITARNA", external: true },
  { label: "Documentation (In Progress)", href: "/webpages/documentation.html" },
  

];

const HOME_LABEL = "Home";
const HOME_HREF = "/Website/index.html";

function renderNavbar(mountEl: HTMLElement): void {
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="navbar">
      <div class="dropdown">
        <button class="nav-btn menu-btn" id="menuBtn"
          aria-haspopup="true" aria-expanded="false" aria-controls="menuPanel">
          Menu <span class="menu-caret" aria-hidden="true"></span>
        </button>
        <div class="menu-panel" id="menuPanel" role="menu">
            <div class="menu-group">
               ${MENU_ITEMS.map(
                  (item) =>
                     `<a class="menu-link" role="menuitem" href="${item.href}" ${
                     item.external ? 'target="_blank" rel="noopener noreferrer"' : ""
                     }>${item.label}</a>`
               ).join("")}
            </div>
        </div>
      </div>

      <div class="brand">
        <a href="${HOME_HREF}" aria-label="Go to Home">${HOME_LABEL}</a>
      </div>

      <div></div>

      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme" aria-pressed="false" title="Toggle theme">
        <svg class="sun" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.76 4.84l-1.8-1.79-1.42 1.41 1.79 1.8 1.43-1.42zm10.48 0l1.8-1.79 1.42 1.41-1.79 1.8-1.43-1.42zM12 4V1h0v3zm0 19v-3h0v3zM4 12H1v0h3zm19 0h-3v0h3zM6.76 19.16l-1.43 1.42-1.79-1.8 1.42-1.41 1.8 1.79zm10.48 0l1.43 1.42 1.79-1.8-1.42-1.41-1.8 1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
        <svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
        </svg>
      </button>
    </div>
  `;
  mountEl.replaceWith(header);

  // Dropdown handlers
  const dropdown = header.querySelector(".dropdown") as HTMLElement;
  const menuBtn = header.querySelector("#menuBtn") as HTMLButtonElement;
  const menuPanel = header.querySelector("#menuPanel") as HTMLDivElement;

  function openMenu() {
    menuPanel.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    const clickOutside = (e: MouseEvent) => {
      if (!dropdown.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener("mousedown", clickOutside, { once: true });
  }
  function closeMenu() {
    menuPanel.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  menuBtn.addEventListener("click", () => {
    menuPanel.classList.contains("open") ? closeMenu() : openMenu();
  });
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && menuPanel.classList.contains("open")) {
      closeMenu(); menuBtn.focus();
    }
  });

  // Theme button state
  const themeToggleBtn = header.querySelector("#themeToggle") as HTMLButtonElement;
  function updateThemeBtn(t: Theme) {
    themeToggleBtn.setAttribute("aria-pressed", String(t === "dark"));
    themeToggleBtn.title = t === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }
  updateThemeBtn(getTheme());

  themeToggleBtn.addEventListener("click", () => {
    updateThemeBtn(toggleTheme());
  });

  onThemeChange(updateThemeBtn);
}

function mountNavbar(): void {
  const mountPoint = document.getElementById("site-header");
  if (mountPoint) {
    renderNavbar(mountPoint);
  } else {
    const temp = document.createElement("div");
    temp.id = "site-header";
    document.body.prepend(temp);
    renderNavbar(temp);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountNavbar);
} else {
  mountNavbar();
}
