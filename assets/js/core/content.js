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
      title: "Inicio | Informatica ITM"
    },
    {
      id: "promo2026",
      hash: "#promo2026",
      title: "Promo 2026 | Informatica ITM"
    },
    {
      id: "laboratorio",
      hash: "#laboratorio",
      title: "Laboratorio | Informatica ITM"
    },
    {
      id: "alumnos",
      hash: "#alumnos",
      title: "Alumnos | Informatica ITM"
    },
    {
      id: "programas",
      hash: "#programas",
      title: "Informatica | ITM"
    },
    {
      id: "noticias",
      hash: "#noticias",
      title: "Noticias | Informatica ITM"
    },
    {
      id: "actividades",
      hash: "#actividades",
      title: "Actividades | Informatica ITM"
    },
    {
      id: "recuerdos",
      hash: "#recuerdos",
      title: "Recuerdos | Informatica ITM"
    },
    {
      id: "faq",
      hash: "#faq",
      title: "Preguntas frecuentes | Informatica ITM"
    },
    {
      id: "contacto",
      hash: "#contacto",
      title: "Contacto | Informatica ITM"
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
