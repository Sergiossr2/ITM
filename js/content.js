/* =========================================================
   Contenido y configuracion compartida del sitio
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.content = {
  storageKeys: {
    theme: "school-theme"
  },

  routes: [
    {
      id: "top",
      hash: "#top",
      title: "Inicio | Instituto Tecnico Morazan"
    },
    {
      id: "matricula",
      hash: "#matricula",
      title: "Matricula | Instituto Tecnico Morazan"
    },
    {
      id: "programas",
      hash: "#programas",
      title: "Programas | Instituto Tecnico Morazan"
    },
    {
      id: "promo2026",
      hash: "#promo2026",
      title: "Promo 2026 | Instituto Tecnico Morazan"
    },
    {
      id: "noticias",
      hash: "#noticias",
      title: "Noticias | Instituto Tecnico Morazan"
    },
    {
      id: "actividades",
      hash: "#actividades",
      title: "Actividades | Instituto Tecnico Morazan"
    },
    {
      id: "faq",
      hash: "#faq",
      title: "Preguntas frecuentes | Instituto Tecnico Morazan"
    },
    {
      id: "contacto",
      hash: "#contacto",
      title: "Contacto | Instituto Tecnico Morazan"
    }
  ],

  selectors: {
    mainNav: "#mainNav",
    menuToggle: "#menuToggle",
    themeToggle: "#themeToggle",
    navLinks: ".nav-links a[href^='#']",
    revealItems: ".section-reveal"
  }
};

window.ITM.sections = {};
