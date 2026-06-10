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
      line: "Los que hicieron esta p&aacute;gina. Los que convierten ideas en soluciones digitales.",
      hype: "Arrancando la presentaci&oacute;n m&aacute;s pesada de la Promo 2026.",
      legendary: true,
      skills: ["HTML", "CSS", "JavaScript", "UI", "Debug", "Deploy"],
      commands: [
        "itm@promo2026:~$ init --team=informatica --mode=legendary",
        "npm run build:promo -- --power=max --style=tech",
        "git commit -m \"Los que programaron esta pagina\"",
        "render --scene=presentacion --level=epico",
        "deploy --origin=informatica --status=live"
      ],
      steps: [
        "Inicializando sistema INF",
        "Compilando identidad digital",
        "Sincronizando equipo",
        "Renderizando presentaci&oacute;n",
        "Deploy exitoso"
      ],
      stages: [
        ["01", "BOOT"],
        ["02", "BUILD"],
        ["03", "SYNC"],
        ["04", "RENDER"],
        ["05", "LIVE"]
      ],
      diagnostics: [
        ["Front-end", "Interfaz lista", "96%"],
        ["L&oacute;gica", "Soluciones activas", "92%"],
        ["Creatividad", "Modo encendido", "99%"],
        ["Equipo", "Promo INF conectada", "100%"]
      ],
      codeLines: [
        "const promo = \"Inform&aacute;tica 2026\";",
        "import orgullo from \"./equipo.js\";",
        "while (ideas.length) { crear(); }",
        "debug(dudas).then(aprender);",
        "deploy(site, \"hecho por nosotros\");"
      ],
      streams: [
        "01001100", "const promo = 2026;", "npm run futuro", "&lt;/html&gt;",
        "deploy ok", "while(true) crear();", "git push origin orgullo", "debug --focus"
      ]
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
    const explicitCareer = Object.keys(careers).find((careerClass) => document.body.classList.contains(careerClass));

    if (explicitCareer) {
      return explicitCareer;
    }

    if (document.body.classList.contains("promo-index")) {
      return "career-informatica";
    }

    return null;
  };

  const renderDefaultIntro = (data) => `
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

  const renderLegendaryIntro = (data) => `
    <div class="promo-intro-bg" style="background-image: url('${data.image}')"></div>
    <div class="promo-inf-cinematic">
      <div class="promo-inf-aura" aria-hidden="true"></div>
      <div class="promo-intro-grid" aria-hidden="true"></div>
      <div class="promo-code-rain" aria-hidden="true">
        ${data.streams.map((stream) => `<span>${stream}</span>`).join("")}
      </div>
      <div class="promo-inf-hud" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="promo-inf-statusbar" aria-hidden="true">
        <strong>ITM // PROMO 2026</strong>
        <span>mainframe: inform&aacute;tica</span>
        <span>status: compiling</span>
      </div>
      <div class="promo-inf-layout">
        <aside class="promo-inf-editor" aria-hidden="true">
          <div class="promo-shell-bar">
            <span></span><span></span><span></span>
            <strong>promo2026/informatica/main.js</strong>
          </div>
          <div class="promo-code-editor">
            ${data.codeLines.map((line, index) => `
              <p class="promo-code-line">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <code>${line}</code>
              </p>
            `).join("")}
          </div>
          <div class="promo-inf-terminal">
            <p><span>&gt;</span> auth promo_2026</p>
            <p><span>&gt;</span> load creatividad.dll</p>
            <p><span>&gt;</span> mount proyectos/</p>
            <p class="promo-shell-active"><span>&gt;</span> <strong class="promo-terminal-text"></strong><i class="promo-terminal-cursor"></i></p>
          </div>
        </aside>

        <main class="promo-inf-core">
          <div class="promo-inf-kernel" aria-hidden="true">
            <span></span><span></span><span></span>
            <strong class="promo-count-number">3</strong>
          </div>
          <div class="promo-inf-label">
            <span class="promo-intro-code">${data.code}</span>
            <p class="promo-intro-eyebrow">${data.eyebrow}</p>
          </div>
          <h2 data-text="Bachillerato en Informática">${data.title}</h2>
          <p class="promo-intro-line">${data.line}</p>
          <div class="promo-inf-stages">
            ${data.stages.map((stage) => `
              <span class="promo-inf-stage-pill">
                <b>${stage[0]}</b>
                <small>${stage[1]}</small>
              </span>
            `).join("")}
          </div>
          <div class="promo-intro-skills">
            ${data.skills.map((skill) => `<span>${skill}</span>`).join("")}
          </div>
          <div class="promo-progress-wrap">
            <div class="promo-intro-progress" aria-label="Barra de carga">
              <span></span>
            </div>
            <strong class="promo-progress-percent">0%</strong>
          </div>
          <p class="promo-intro-hype">${data.hype}</p>
        </main>

        <aside class="promo-inf-diagnostics" aria-hidden="true">
          <strong class="promo-diag-title">diagn&oacute;stico del sistema</strong>
          ${data.diagnostics.map((item) => `
            <span class="promo-intro-module">
              <b>${item[0]}</b>
              <small>${item[1]}</small>
              <i style="--diag:${item[2]}"></i>
              <strong>${item[2]}</strong>
            </span>
          `).join("")}
          <p>Hecho por Inform&aacute;tica. Presentado por Promo 2026.</p>
        </aside>
      </div>
      <div class="promo-inf-final" aria-hidden="true">
        <span>DEPLOY COMPLETE</span>
        <strong>Inform&aacute;tica se presenta.</strong>
      </div>
    </div>
  `;

  const buildIntro = (data, careerClass) => {
    const intro = document.createElement("div");
    intro.className = `promo-intro${data.legendary ? " promo-intro-inf" : ""}`;
    intro.setAttribute("role", "status");
    intro.setAttribute("aria-live", "polite");
    intro.innerHTML = data.legendary ? renderLegendaryIntro(data) : renderDefaultIntro(data);
    intro.dataset.career = careerClass;
    return intro;
  };

  const updateLegendaryIntro = (intro, data, elapsed, duration) => {
    const percent = Math.min(elapsed / duration, 1);
    const stepIndex = Math.min(Math.floor(percent * data.steps.length), data.steps.length - 1);
    const command = data.commands[stepIndex] || data.commands[0];
    const localStart = stepIndex / data.steps.length;
    const localEnd = (stepIndex + 1) / data.steps.length;
    const localProgress = Math.min(Math.max((percent - localStart) / (localEnd - localStart), 0), 1);
    const visibleLetters = Math.max(1, Math.floor(command.length * localProgress));

    const countdown = intro.querySelector(".promo-count-number");
    const hype = intro.querySelector(".promo-intro-hype");
    const terminalText = intro.querySelector(".promo-terminal-text");
    const stagePills = intro.querySelectorAll(".promo-inf-stage-pill");
    const codeLines = intro.querySelectorAll(".promo-code-line");
    const diagnostics = intro.querySelectorAll(".promo-intro-module");
    const progressPercent = intro.querySelector(".promo-progress-percent");

    if (countdown) {
      const label = percent > 0.86 ? "LIVE" : percent > 0.66 ? "RUN" : String(Math.max(1, 3 - Math.floor(percent * 4)));
      countdown.textContent = label;
    }

    if (hype) hype.textContent = data.steps[stepIndex];
    if (terminalText) terminalText.textContent = command.slice(0, visibleLetters);
    if (progressPercent) progressPercent.textContent = `${Math.round(percent * 100)}%`;

    intro.dataset.phase = data.stages[stepIndex]?.[1]?.toLowerCase() || "";
    intro.classList.toggle("is-final", percent > 0.86);

    stagePills.forEach((stage, index) => {
      stage.classList.toggle("is-active", index <= stepIndex);
    });

    codeLines.forEach((line, index) => {
      line.classList.toggle("is-lit", index <= stepIndex);
    });

    diagnostics.forEach((item, index) => {
      item.classList.toggle("is-active", index <= Math.min(stepIndex, diagnostics.length - 1));
    });
  };

  const init = () => {
    if (document.body.dataset.promoIntroStarted === "true") {
      return;
    }

    document.body.dataset.promoIntroStarted = "true";

    const careerClass = getCareer();
    if (!careerClass) return;

    const data = careers[careerClass];
    const intro = buildIntro(data, careerClass);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 700 : data.legendary ? 6800 : 2850;

    document.body.classList.add("promo-intro-lock");
    document.body.appendChild(intro);

    const progress = intro.querySelector(".promo-intro-progress span");
    let start = null;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      if (progress) progress.style.width = `${percent}%`;
      if (data.legendary) updateLegendaryIntro(intro, data, elapsed, duration);

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