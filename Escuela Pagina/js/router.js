/* =========================================================
   Router ligero por hash y navegacion activa
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.router = (() => {
  const config = window.ITM.content;

  const getRouteByHash = (hash) => {
    return config.routes.find((route) => route.hash === hash) || config.routes[0];
  };

  const updateDocumentTitle = (hash) => {
    const route = getRouteByHash(hash || "#top");
    document.title = route.title;
  };

  const getVisibleRouteHash = (sections) => {
    let activeHash = "#top";
    const activationLine = window.innerHeight * 0.35;

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationLine) {
        activeHash = `#${section.id}`;
      }
    });

    return activeHash;
  };

  const setActiveLink = (links, activeHash) => {
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === activeHash);
    });
  };

  const init = () => {
    const links = [...document.querySelectorAll(config.selectors.navLinks)];
    const sections = config.routes
      .map((route) => document.getElementById(route.id))
      .filter(Boolean);

    const syncRoute = () => {
      const activeHash = getVisibleRouteHash(sections);

      setActiveLink(links, activeHash);
      updateDocumentTitle(activeHash);
    };

    links.forEach((link) => {
      link.addEventListener("click", () => {
        updateDocumentTitle(link.getAttribute("href"));
      });
    });

    window.addEventListener("hashchange", () => {
      updateDocumentTitle(window.location.hash);
    });

    window.addEventListener("scroll", syncRoute, { passive: true });

    updateDocumentTitle(window.location.hash);
    syncRoute();
  };

  return {
    init
  };
})();
