// Website/src/navbar.ts
import { getTheme, toggleTheme, onThemeChange, type Theme } from "./theme";

type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

const PRIMARY_ITEMS: MenuItem[] = [
  { label: "Mission", href: "/FITARNA/webpages/mission.html" },
  { label: "About Us", href: "/FITARNA/webpages/about_us.html" },
  { label: "Demo", href: "/FITARNA/index.html#demo" },
  { label: "Project Materials", href: "/FITARNA/index.html#documents" },
];

const UTILITY_ITEMS: MenuItem[] = [
  { label: "GitHub", href: "https://github.com/jacobhallburns/FITARNA", external: true },
  { label: "Documentation", href: "/FITARNA/webpages/documentation.html" },
];

const HOME_HREF = "/FITARNA/index.html";
const LOGO_SRC = "/FITARNA/assets/images/Fitarna_Logo.png";
const CONTACT_HREF =
  "https://mail.google.com/mail/?view=cm&fs=1&to=vbarager2022@my.fit.edu,ddixon2022@my.fit.edu,jhallburns2021@my.fit.edu,ewadley2022@my.fit.edu,eribeiro@fit.edu";

function normalizePath(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

function isCurrentPage(href: string, external?: boolean): boolean {
  if (external) return false;

  try {
    const hrefUrl = new URL(href, window.location.origin);
    const currentUrl = new URL(window.location.href);

    const samePath =
      normalizePath(hrefUrl.pathname) === normalizePath(currentUrl.pathname);

    if (!samePath) return false;

    // Only mark hash links active when the current URL has that exact hash.
    if (hrefUrl.hash) {
      return hrefUrl.hash === currentUrl.hash;
    }

    // Normal page links are active only when the current page has no section hash.
    return !currentUrl.hash;
  } catch {
    return false;
  }
}
function renderLink(item: MenuItem, className: string): string {
  const activeClass = isCurrentPage(item.href, item.external) ? " is-active" : "";
  const extraAttrs = item.external ? ` target="_blank" rel="noopener noreferrer"` : "";

  return `<a class="${className}${activeClass}" href="${item.href}"${extraAttrs}>${item.label}</a>`;
}

function renderMenuLinks(): string {
  const allItems: MenuItem[] = [
    ...PRIMARY_ITEMS,
    ...UTILITY_ITEMS,
    { label: "Contact Us", href: CONTACT_HREF, external: true },
  ];

  return allItems.map((item) => renderLink(item, "menu-link")).join("");
}

function renderNavbar(mountEl: HTMLElement): void {
  const header = document.createElement("header");
  header.className = "site-header";

  header.innerHTML = `
    <div class="fit-style-navbar">
      <div class="brand-area">
        <a class="brand-link" href="${HOME_HREF}" aria-label="Go to FITARNA Home">
          <img class="nav-logo" src="${LOGO_SRC}" alt="FITARNA logo" />
          <div class="brand-copy">
            <span class="brand-subtitle">Florida Tech AR Navigation App</span>
          </div>
        </a>
      </div>

      <div class="nav-stack">
        <div class="utility-row">
          ${UTILITY_ITEMS.map((item) => renderLink(item, "utility-link")).join("")}

          <span class="utility-divider" aria-hidden="true"></span>

          <a
            class="utility-link contact-utility"
            href="${CONTACT_HREF}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>

          <button
            class="theme-toggle"
            id="themeToggle"
            aria-label="Toggle theme"
            aria-pressed="false"
            title="Toggle theme"
          >
            <svg class="sun" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.76 4.84l-1.8-1.79-1.42 1.41 1.79 1.8 1.43-1.42zm10.48 0l1.8-1.79 1.42 1.41-1.79 1.8-1.43-1.42zM12 4V1h0v3zm0 19v-3h0v3zM4 12H1v0h3zm19 0h-3v0h3zM6.76 19.16l-1.43 1.42-1.79-1.8 1.42-1.41 1.8 1.79zm10.48 0l1.43 1.42 1.79-1.8-1.42-1.41-1.8 1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
            <svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
            </svg>
          </button>
        </div>

        <nav class="primary-row" aria-label="Primary navigation">
          ${PRIMARY_ITEMS.map((item) => renderLink(item, "nav-link")).join("")}
        </nav>
      </div>

      <div class="dropdown mobile-nav">
        <button
          class="nav-btn menu-btn"
          id="menuBtn"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="menuPanel"
        >
          Menu <span class="menu-caret" aria-hidden="true"></span>
        </button>

        <div class="menu-panel" id="menuPanel" role="menu">
          <div class="menu-group">
            ${renderMenuLinks()}
          </div>
        </div>
      </div>
    </div>
  `;

  mountEl.replaceWith(header);

  const dropdown = header.querySelector(".mobile-nav") as HTMLElement | null;
  const menuBtn = header.querySelector("#menuBtn") as HTMLButtonElement | null;
  const menuPanel = header.querySelector("#menuPanel") as HTMLDivElement | null;

  function closeMenu(): void {
    if (!menuPanel || !menuBtn) return;
    menuPanel.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu(): void {
    if (!menuPanel || !menuBtn || !dropdown) return;

    menuPanel.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");

    const clickOutside = (e: MouseEvent): void => {
      if (!dropdown.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", clickOutside, { once: true });
  }

  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", () => {
      menuPanel.classList.contains("open") ? closeMenu() : openMenu();
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuPanel.classList.contains("open")) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  const themeToggleBtn = header.querySelector("#themeToggle") as HTMLButtonElement;

  function updateThemeBtn(t: Theme): void {
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