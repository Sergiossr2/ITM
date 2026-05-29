/* =========================================================
   Modo claro / oscuro
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.theme = (() => {
  const root = document.documentElement;
  const config = window.ITM.content;

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(config.storageKeys.theme);
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    return savedTheme || systemTheme;
  };

  const setTheme = (theme) => {
    const themeToggle = document.querySelector(config.selectors.themeToggle);
    const isDark = theme === "dark";

    root.dataset.theme = theme;
    localStorage.setItem(config.storageKeys.theme, theme);

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    }
  };

  const toggleTheme = () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  };

  const init = () => {
    const themeToggle = document.querySelector(config.selectors.themeToggle);

    setTheme(getPreferredTheme());

    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }
  };

  return {
    init,
    setTheme
  };
})();
