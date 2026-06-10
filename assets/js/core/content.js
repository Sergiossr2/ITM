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
      title: "Bachillerato en Informatica | Estudia tecnologia"
    },
    {
      id: "promo2026",
      hash: "#promo2026",
      title: "La carrera | Bachillerato en Informatica"
    },
    {
      id: "logros",
      hash: "#logros",
      title: "Logros | Bachillerato en Informatica"
    },
    {
      id: "programas",
      hash: "#programas",
      title: "Lo que aprenderas | Bachillerato en Informatica"
    },
    {
      id: "matricula",
      hash: "#matricula",
      title: "Inscripcion | Bachillerato en Informatica"
    },
    {
      id: "faq",
      hash: "#faq",
      title: "Preguntas frecuentes | Bachillerato en Informatica"
    },
    {
      id: "contacto",
      hash: "#contacto",
      title: "Contacto | Bachillerato en Informatica"
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
