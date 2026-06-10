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
      title: "Bachillerato en Informática | Estudia tecnología"
    },
    {
      id: "promo2026",
      hash: "#promo2026",
      title: "La carrera | Bachillerato en Informática"
    },
    {
      id: "logros",
      hash: "#logros",
      title: "Logros | Bachillerato en Informática"
    },
    {
      id: "programas",
      hash: "#programas",
      title: "Lo que aprenderás | Bachillerato en Informática"
    },
    {
      id: "matricula",
      hash: "#matricula",
      title: "Inscripción | Bachillerato en Informática"
    },
    {
      id: "faq",
      hash: "#faq",
      title: "Preguntas frecuentes | Bachillerato en Informática"
    },
    {
      id: "contacto",
      hash: "#contacto",
      title: "Contacto | Bachillerato en Informática"
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
