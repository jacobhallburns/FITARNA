// Website/src/theme.ts
export type Theme = "light" | "dark";
const KEY = "site-theme";

// Optional: fast cross-tab channel (supported in modern browsers)
const chan = "theme-sync";
const bc = "BroadcastChannel" in window ? new BroadcastChannel(chan) : null;

/** Read persisted theme (default to light) */
export function getTheme(): Theme {
  const t = localStorage.getItem(KEY);
  return t === "dark" ? "dark" : "light";
}

/** Apply theme by toggling .dark on <html> and emit event for local listeners */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");

  root.setAttribute("data-theme", theme);
  // notify components on this page
  window.dispatchEvent(new CustomEvent<Theme>("themechange", { detail: theme }));
}

/** Persist + apply + broadcast */
export function setTheme(theme: Theme): void {
  // 1) persist
  localStorage.setItem(KEY, theme);
  // 2) apply to this page immediately
  applyTheme(theme);
  // 3) broadcast to other tabs (nice-to-have)
  bc?.postMessage(theme);
}

/** Toggle helper */
export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}

/** Subscribe helper (optional for components) */
export function onThemeChange(cb: (t: Theme) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Theme>).detail);
  window.addEventListener("themechange", handler);
  return () => window.removeEventListener("themechange", handler);
}

/* ---------- Cross-tab listeners ---------- */

// When another tab updates localStorage, this fires here.
window.addEventListener("storage", (e: StorageEvent) => {
  if (e.key === KEY && (e.newValue === "light" || e.newValue === "dark")) {
    applyTheme(e.newValue as Theme);
  }
});

// When another tab posts via BroadcastChannel, sync immediately.
bc?.addEventListener("message", (ev: MessageEvent) => {
  const t = ev.data;
  if (t === "light" || t === "dark") applyTheme(t);
});

// Also re-apply if the tab was backgrounded and user returns.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) applyTheme(getTheme());
});

/* ---------- Initialize on load ---------- */
(function init() {
  let t = localStorage.getItem(KEY) as Theme | null;
  if (t !== "light" && t !== "dark") {
    t = "light";
    try { localStorage.setItem(KEY, t); } catch {}
  }
  applyTheme(t);
})();
