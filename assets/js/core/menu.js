/* =========================================================
   Menu responsive
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.menu = (() => {
  const config = window.ITM.content;

  const closeMenu = (mainNav, menuToggle) => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = (mainNav, menuToggle) => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  const init = () => {
    const menuToggle = document.querySelector(config.selectors.menuToggle);
    const mainNav = document.querySelector(config.selectors.mainNav);

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", () => {
      toggleMenu(mainNav, menuToggle);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu(mainNav, menuToggle);
      });
    });
  };

  return {
    init
  };
})();
