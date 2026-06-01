/* =========================================================
   Animaciones de entrada por seccion
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.reveal = (() => {
  const config = window.ITM.content;

  const showImmediately = (items) => {
    items.forEach((item) => item.classList.add("is-visible"));
  };

  const init = () => {
    const items = [...document.querySelectorAll(config.selectors.revealItems)];

    if (!("IntersectionObserver" in window)) {
      showImmediately(items);
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => {
      revealObserver.observe(item);
    });
  };

  return {
    init
  };
})();
