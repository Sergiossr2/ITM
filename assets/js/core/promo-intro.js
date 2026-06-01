/* =========================================================
   Intro animada para paginas de la Promo 2026
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.promoIntro = (() => {
  const careers = {
    "career-informatica": {
      code: "INF",
      image: "assets/img/promo2026/informatica/hero/hero-preview.png",
      eyebrow: "Sistema Promo 2026",
      title: "Bachillerato en Inform&aacute;tica",
      line: "Los que hicieron esta p&aacute;gina y convierten ideas en soluciones digitales.",
      hype: "Compilando la entrada de los duros de Inform&aacute;tica...",
      epic: true,
      skills: ["HTML", "CSS", "JS", "Soporte", "Creatividad"],
      commands: [
        "boot promo_2026.inf",
        "npm run talento --informatica",
        "render estudiantes_destacados",
        "deploy presentacion_epica"
      ],
      steps: ["Cargando talento", "Activando proyectos", "Preparando presentaci&oacute;n", "Iniciando Promo INF"]
    },
    "career-contaduria": {
      code: "CF",
      image: "assets/img/promo2026/contaduria-finanzas/hero/hero-preview.png",
      eyebrow: "Promo 2026 presenta",
      title: "Contadur&iacute;a y Finanzas",
      line: "Los que administran, emprenden y hacen que los n&uacute;meros hablen.",
      hype: "Calculando una entrada de alto nivel..."
    },
    "career-humanidades": {
      code: "HUM",
      image: "assets/img/promo2026/humanidades/hero/hero-preview.png",
      eyebrow: "Promo 2026 presenta",
      title: "Bachillerato en Humanidades",
      line: "Los que comunican, piensan fuerte y dejan huella.",
      hype: "Afinando criterio, voz y presencia..."
    }
  };

  const getCareer = () => {
    return Object.keys(careers).find((careerClass) => document.body.classList.contains(careerClass));
  };

  const buildIntro = (data, careerClass) => {
    const intro = document.createElement("div");
    intro.className = `promo-intro${data.epic ? " promo-intro-epic promo-intro-inf" : ""}`;
    intro.setAttribute("role", "status");
    intro.setAttribute("aria-live", "polite");

    intro.innerHTML = data.epic ? `
      <div class="promo-intro-bg" style="background-image: url('${data.image}')"></div>
      <div class="promo-intro-grid" aria-hidden="true"></div>
      <div class="promo-intro-terminal" aria-hidden="true">
        <span class="promo-terminal-prefix">&gt;</span>
        <span class="promo-terminal-text"></span>
        <span class="promo-terminal-cursor"></span>
      </div>
      <div class="promo-intro-panel promo-intro-epic-panel">
        <span class="promo-intro-code">${data.code}</span>
        <p class="promo-intro-eyebrow">${data.eyebrow}</p>
        <div class="promo-intro-countdown" aria-label="Cuenta regresiva de presentaci&oacute;n">3</div>
        <h2>${data.title}</h2>
        <p class="promo-intro-line">${data.line}</p>
        <div class="promo-intro-skills">
          ${data.skills.map((skill) => `<span>${skill}</span>`).join("")}
        </div>
        <div class="promo-intro-progress" aria-label="Barra de carga">
          <span></span>
        </div>
        <p class="promo-intro-hype">${data.hype}</p>
      </div>
    ` : `
      <div class="promo-intro-bg" style="background-image: url('${data.image}')"></div>
      <div class="promo-intro-panel">
        <div class="promo-intro-logo">
          <img src="assets/img/brand/logo-promo-2026-web.svg" alt="Logo Promo 2026" width="132" height="132" />
        </div>
        <span class="promo-intro-code">${data.code}</span>
        <p class="promo-intro-eyebrow">${data.eyebrow}</p>
        <h2>${data.title}</h2>
        <p class="promo-intro-line">${data.line}</p>
        <div class="promo-intro-progress" aria-label="Barra de carga">
          <span></span>
        </div>
        <p class="promo-intro-hype">${data.hype}</p>
      </div>
    `;

    intro.dataset.career = careerClass;
    return intro;
  };

  const paintEpicIntro = (intro, data, elapsed, duration) => {
    const countdown = intro.querySelector(".promo-intro-countdown");
    const hype = intro.querySelector(".promo-intro-hype");
    const terminalText = intro.querySelector(".promo-terminal-text");
    if (!countdown || !hype) return;

    const remaining = Math.max(1, 3 - Math.floor((elapsed / duration) * 3));
    const percent = elapsed / duration;
    const stepIndex = Math.min(Math.floor(percent * data.steps.length), data.steps.length - 1);
    const command = data.commands[stepIndex] || data.commands[0];
    const localStart = stepIndex / data.steps.length;
    const localEnd = (stepIndex + 1) / data.steps.length;
    const localProgress = Math.min(Math.max((percent - localStart) / (localEnd - localStart), 0), 1);
    const visibleLetters = Math.max(1, Math.floor(command.length * localProgress));

    countdown.textContent = elapsed >= duration * 0.88 ? "GO" : String(remaining);
    hype.textContent = data.steps[stepIndex];

    if (terminalText) {
      terminalText.textContent = command.slice(0, visibleLetters);
    }
  };

  const init = () => {
    const careerClass = getCareer();
    if (!careerClass) return;

    const data = careers[careerClass];
    const intro = buildIntro(data, careerClass);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 700 : data.epic ? 4300 : 2850;

    document.body.classList.add("promo-intro-lock");
    document.body.appendChild(intro);

    const progress = intro.querySelector(".promo-intro-progress span");
    let start = null;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      progress.style.width = `${percent}%`;

      if (data.epic && !reduceMotion) {
        paintEpicIntro(intro, data, elapsed, duration);
      }

      if (elapsed < duration) {
        window.requestAnimationFrame(tick);
        return;
      }

      intro.classList.add("promo-intro-exit");
      document.body.classList.remove("promo-intro-lock");
      window.setTimeout(() => intro.remove(), 650);
    };

    window.requestAnimationFrame(tick);
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  window.ITM.promoIntro.init();
});
