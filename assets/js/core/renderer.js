/* =========================================================
   Renderizado de contenido por secciones
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.renderer = (() => {
  const setHTML = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value) element.innerHTML = value;
  };

  const decodeHTML = (value) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = value;
    return textarea.value;
  };

  const renderCards = (selector, items, template, heading) => {
    const element = document.querySelector(selector);
    if (!element || !Array.isArray(items)) return;

    const headingHTML = heading ? `<h3>${heading}</h3>` : "";
    element.innerHTML = headingHTML + items.map(template).join("");
  };

  const renderInicio = () => {
    const data = window.ITM.sections.inicio;
    if (!data) return;

    setHTML(".hero-copy .eyebrow", data.eyebrow);
    setHTML(".hero-copy h1", data.title);
    setHTML(".hero-copy .lead", data.lead);

    renderCards(".hero-actions", data.actions, (action) => `
      <a class="${action.style}" href="${action.href}">${action.label}</a>
    `);

    renderCards(".hero-dashboard", data.stats, (stat) => `
      <article>
        <span>${stat.label}</span>
        <strong>${stat.value}</strong>
        <p>${stat.text}</p>
      </article>
    `);

    renderCards(".quick-grid", data.quickInfo, (item) => `
      <article>
        <span class="info-icon">${item.number}</span>
        <div>
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </div>
      </article>
    `);
  };

  const renderProgramas = () => {
    const data = window.ITM.sections.programas;
    if (!data) return;

    setHTML("#programas .section-header .eyebrow", data.eyebrow);
    setHTML("#programas .section-header h2", data.title);
    setHTML("#programas .section-header p", data.text);

    renderCards(".program-grid", data.items, (item) => `
      <article class="card program-card">
        <span class="program-icon">${item.code}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `);
  };

  const renderPromo2026 = () => {
    const data = window.ITM.sections.promo2026;
    if (!data) return;

    const paintCountdown = (target) => {
      const targetDate = new Date(target);
      const now = new Date();
      const distance = Math.max(targetDate.getTime() - now.getTime(), 0);
      const totalSeconds = Math.floor(distance / 1000);
      const values = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      };

      Object.entries(values).forEach(([unit, value]) => {
        const element = document.querySelector(`[data-countdown-unit="${unit}"]`);
        if (!element) return;
        element.textContent = unit === "days" ? String(value).padStart(3, "0") : String(value).padStart(2, "0");
      });
    };

    setHTML("#promo2026 .section-header .eyebrow", data.eyebrow);
    setHTML("#promo2026 .section-header h2", data.title);
    setHTML("#promo2026 .section-header p", data.text);

    if (data.spotlight) {
      setHTML(".promo-spotlight .eyebrow", data.spotlight.kicker);
      setHTML(".promo-spotlight h3", data.spotlight.title);
      setHTML(".promo-spotlight p", data.spotlight.text);

      if (data.spotlight.countdown) {
        setHTML(".promo-countdown-label", data.spotlight.countdown.label);
        setHTML(".promo-countdown-note", data.spotlight.countdown.note);
        paintCountdown(data.spotlight.countdown.target);
        window.setInterval(() => paintCountdown(data.spotlight.countdown.target), 1000);
      }

      renderCards(".promo-ideas", data.spotlight.ideas, (idea) => `
        <span>${idea}</span>
      `);
    }

    renderCards(".promo-grid", data.items, (item) => `
      <article class="card promo-card">
        <img class="promo-card-image" src="${item.image}" alt="${item.imageAlt}" loading="lazy" decoding="async" />
        <div class="promo-card-header">
          <span class="program-icon">${item.code}</span>
          <span class="badge">${item.badge}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <a class="button button-secondary" href="${item.href}">${item.cta}</a>
      </article>
    `);
  };

  const renderNoticias = () => {
    const data = window.ITM.sections.noticias;
    if (!data) return;

    setHTML("#noticias .section-header .eyebrow", data.eyebrow);
    setHTML("#noticias .section-header h2", data.title);
    setHTML("#noticias .section-header p", data.text);

    let featured = { ...data.featured };
    let compactItems = data.items.map((item) => ({ ...item }));

    const sortByDateDesc = (items) => {
      return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const animateNewsSwap = () => {
      const featuredCard = document.querySelector(".feature-news");
      const newsStack = document.querySelector(".news-stack");

      if (!featuredCard || !newsStack) return;

      featuredCard.classList.remove("news-swap-active");
      newsStack.classList.remove("news-stack-swap");
      void featuredCard.offsetWidth;

      featuredCard.classList.add("news-swap-active");
      newsStack.classList.add("news-stack-swap");
    };

    const paintNews = (shouldAnimate = false) => {
      compactItems = sortByDateDesc(compactItems);

      setHTML(".feature-news .meta", featured.meta);
      setHTML(".feature-news h3", featured.title);
      setHTML(".feature-news p:last-child", featured.text);

      const newsVisual = document.querySelector(".news-visual");
      if (newsVisual && featured.image) {
        newsVisual.style.backgroundImage = `
          linear-gradient(180deg, rgba(4, 14, 16, 0.08), rgba(4, 14, 16, 0.18) 46%, rgba(4, 14, 16, 0.58)),
          url("${featured.image}")
        `;
      }

      renderCards(".news-stack", compactItems, (item, index) => `
        <button class="card compact-news" type="button" data-news-index="${index}" aria-label="Ver noticia: ${item.title}">
          <p class="meta">${item.meta}</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </button>
      `);

      document.querySelectorAll(".compact-news[data-news-index]").forEach((card) => {
        card.addEventListener("click", () => {
          const index = Number(card.dataset.newsIndex);
          const selected = compactItems[index];

          compactItems = compactItems.filter((_, itemIndex) => itemIndex !== index);
          compactItems.push(featured);
          featured = selected;
          paintNews(true);
        });
      });

      if (shouldAnimate) {
        animateNewsSwap();
      }
    };

    paintNews();
  };

  const renderActividades = () => {
    const data = window.ITM.sections.actividades;
    if (!data) return;

    setHTML("#actividades .section-header .eyebrow", data.eyebrow);
    setHTML("#actividades .section-header h2", data.title);
    setHTML("#actividades .section-header p", data.text);

    renderCards(".activity-grid", data.items, (item) => `
      <article class="activity-tile">
        <span>${item.label}</span>
        <h3>${item.title}</h3>
      </article>
    `);
  };

  const renderFaq = () => {
    const data = window.ITM.sections.faq;
    if (!data) return;

    setHTML("#faq .section-header .eyebrow", data.eyebrow);
    setHTML("#faq .section-header h2", data.title);
    setHTML("#faq .section-header p", data.text);

    renderCards(".faq-list", data.items, (item) => `
      <details class="faq-item">
        <summary>${item.question}</summary>
        <p>${item.answer}</p>
      </details>
    `);
  };

  const renderContacto = () => {
    const data = window.ITM.sections.contacto;
    if (!data) return;

    setHTML(".cta-band .eyebrow", data.finalCta.eyebrow);
    setHTML(".cta-band h2", data.finalCta.title);
    setHTML(".cta-band p", data.finalCta.text);
    setHTML(".cta-band .button", data.finalCta.label);

    const cta = document.querySelector(".cta-band .button");
    if (cta) cta.setAttribute("href", data.finalCta.href);

    setHTML(".footer-brand strong", data.footer.name);
    setHTML(".footer-brand small", data.footer.tagline);
    setHTML(".footer-intro h2", data.footer.title);
    setHTML(".footer-intro p", data.footer.text);
    setHTML(".footer-note h3", data.footer.noteTitle);
    setHTML(".footer-note p", data.footer.noteText);

    renderCards(".footer-actions", data.footer.actions, (action) => `
      <a
        class="${action.className}"
        href="${action.href}"
        ${action.external ? 'target="_blank" rel="noopener"' : ""}
      >${action.label}</a>
    `);

    renderCards(".contact-grid", data.footer.cards, (card) => `
      <article class="contact-card">
        <span>${card.label}</span>
        <strong>${card.value}</strong>
        <p>${card.text}</p>
      </article>
    `);

    renderCards(".footer-directory .footer-links:nth-child(2)", data.footer.services, (service) => `
      <a href="${service.href}">${service.label}</a>
    `, data.footer.servicesTitle);

    const footerBottom = document.querySelector(".footer-bottom span:first-child");
    if (footerBottom) {
      footerBottom.innerHTML = `&copy; <span id="year"></span> ${data.footer.legal}`;
      const yearSpan = footerBottom.querySelector("#year");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }
    setHTML(".footer-bottom span:last-child", data.footer.slogan);
  };

  const renderAlumnos = () => {
    const data = window.ITM.sections.alumnos;
    if (!data) return;

    setHTML("#alumnos .section-header .eyebrow", data.eyebrow);
    setHTML("#alumnos .section-header h2", data.title);
    setHTML("#alumnos .section-header p", data.text);

    const container = document.querySelector("#alumnosContainer");
    if (!container) return;

    container.innerHTML = data.items.map((student) => `
      <article class="student-profile-card" data-student-id="${student.id}" style="cursor: pointer;">
        <div class="student-avatar-letter">${student.name.charAt(0)}</div>
        <div class="student-profile-top">
          <span class="student-profile-code">${student.code}</span>
          <h3>${student.name}</h3>
          <span class="student-card-role">${student.role}</span>
        </div>
        <span class="student-card-hint">Ver perfil &rarr;</span>
      </article>
    `).join("");

    container.querySelectorAll(".student-profile-card").forEach(card => {
      card.addEventListener("click", () => {
        openModal(card.dataset.studentId);
      });
    });
  };

  const renderCareerPage = () => {
    const data = window.ITM.sections.alumnos;
    if (!data) return;

    const container = document.querySelector("#careerAlumnosContainer");
    if (!container) return;

    container.innerHTML = data.items.map((student) => `
      <article class="student-profile-card" data-student-id="${student.id}" style="cursor: pointer;">
        <div class="student-avatar-letter">${student.name.charAt(0)}</div>
        <div class="student-profile-top">
          <span class="student-profile-code">${student.code}</span>
          <h3>${student.name}</h3>
          <span class="student-card-role">${student.role}</span>
        </div>
        <span class="student-card-hint">Ver perfil &rarr;</span>
      </article>
    `).join("");

    container.querySelectorAll(".student-profile-card").forEach(card => {
      card.addEventListener("click", () => {
        openModal(card.dataset.studentId);
      });
    });

    initModal();
    initMatrix();
  };

  let modalInitialized = false;

  const initModal = () => {
    if (modalInitialized) return;
    const modal = document.querySelector("#studentModal");
    const closeBtn = document.querySelector("#modalClose");
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
      }
    });

    modalInitialized = true;
  };

  const openModal = (studentId) => {
    const data = window.ITM.sections.alumnos;
    if (!data) return;

    const student = data.items.find(s => s.id === studentId);
    if (!student) return;

    const modal = document.querySelector("#studentModal");
    if (!modal) return;

    const avatar = modal.querySelector("#modalAvatar");
    if (avatar) avatar.textContent = student.name.charAt(0);

    const code = modal.querySelector("#modalCode");
    if (code) code.textContent = student.code;

    const name = modal.querySelector("#modalName");
    if (name) name.textContent = student.name;

    const role = modal.querySelector("#modalRole");
    if (role) role.textContent = student.role;

    const quote = modal.querySelector("#modalQuote");
    if (quote) quote.textContent = `"${student.quote}"`;

    const about = modal.querySelector("#modalAbout");
    if (about) about.textContent = student.about || "Estudiante del Bachillerato en Inform&aacute;tica del Instituto T&eacute;cnico Moraz&aacute;n.";

    const skillsGrid = modal.querySelector("#modalSkills");
    if (skillsGrid) {
      skillsGrid.innerHTML = student.skills.map(skill => `
        <div class="modal-skill-item">
          <div class="modal-skill-info">
            <span>${skill.name}</span>
            <span>${skill.value}%</span>
          </div>
          <div class="modal-skill-bar">
            <div class="modal-skill-progress" data-value="${skill.value}"></div>
          </div>
        </div>
      `).join("");
    }

    const projectsList = modal.querySelector("#modalProjects");
    if (projectsList) {
      if (Array.isArray(student.projects) && student.projects.length > 0) {
        projectsList.innerHTML = student.projects.map(p => `<li>${p}</li>`).join("");
      } else {
        projectsList.innerHTML = "<li>Proyecto final de inform&aacute;tica</li>";
      }
    }

    const songLink = modal.querySelector("#modalSongLink");
    const songName = modal.querySelector("#modalSongName");
    if (songLink && songName) {
      songLink.setAttribute("href", student.songUrl || "https://youtube.com");
      songName.textContent = student.songName || "M&uacute;sica favorita";
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      modal.querySelectorAll(".modal-skill-progress").forEach(bar => {
        bar.style.width = bar.dataset.value + "%";
      });
    }, 100);
  };

  const closeModal = () => {
    const modal = document.querySelector("#studentModal");
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    modal.querySelectorAll(".modal-skill-progress").forEach(bar => {
      bar.style.width = "0%";
    });
  };

  const initTerminal = () => {
    const terminal = document.querySelector("#interactiveTerminal");
    if (!terminal) return;

    const screen = terminal.querySelector("#terminalScreen");
    const inputText = terminal.querySelector("#terminalInputText");
    const cmdButtons = terminal.querySelectorAll(".btn-cmd");

    if (!screen || !inputText || !cmdButtons) return;

    const commands = {
      iniciar: {
        text: "./iniciar_sistema.sh",
        output: `[BOOT] Cargando mainframe de Informática...
[OK] Inicializando módulos de creatividad.
[OK] Cargando perfiles de la Promo 2026.
[OK] Conectando base de datos escolar.
[SISTEMA LISTO] ¡Bienvenido al portal interactivo!`
      },
      git: {
        text: "git log -n 3",
        output: `commit d7f23c9 (HEAD -> main)
Author: Sergio Soto <sergio@morazan.edu.hn>
Date:   Wed Jun 17 07:05:00 2026 -0600
    feat: agregar base de datos de perfiles y modal premium

commit a1b3c88
Author: Promo 2026 <info@morazan.edu.hn>
Date:   Mon Jun 15 15:30:12 2026 -0600
    style: ajustar tema cyberpunk y colores del laboratorio

commit 4e99f1a
Author: Rony García <rony@morazan.edu.hn>
Date:   Sat Jun 13 10:14:55 2026 -0600
    fix: corregir cableado virtual y enlazar galería`
      },
      info: {
        text: "cat info_bachillerato.txt",
        output: `ÁREA: Bachillerato Técnico Profesional en Informática
DURACIÓN: 3 años de retos, código y aprendizaje
TECNOLOGÍAS: HTML5, CSS3, JavaScript, Git, Redes, Soporte de Equipos.
MISIÓN: Formar líderes digitales capaces de resolver problemas reales mediante tecnología y creatividad, dejando una huella duradera.`
      },
      juego: {
        text: "./juego.sh",
        output: "__GAME__"
      },
      clear: {
        text: "clear",
        output: ""
      }
    };

    let typing = false;

    const typeWriter = (text, callback) => {
      inputText.textContent = "";
      let index = 0;
      typing = true;

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          inputText.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(typeInterval);
          typing = false;
          callback();
        }
      }, 50);
    };

    let galagaGameActive = false;

    const startGalaga = () => {
      if (galagaGameActive) return;
      galagaGameActive = true;

      // Create game container inside the terminal body
      const terminalBody = terminal.querySelector(".inf-terminal-body");
      const originalScreen = terminal.querySelector("#terminalScreen");
      const inputLine = terminal.querySelector(".terminal-input-line");

      // Hide original terminal content
      if (originalScreen) originalScreen.style.display = "none";
      if (inputLine) inputLine.style.display = "none";
      if (screen) screen.style.display = "none";

      // Create game wrapper
      const gameContainer = document.createElement("div");
      gameContainer.className = "galaga-container";
      gameContainer.style.cssText = "width:100%;height:280px;position:relative;";

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "× Salir del juego";
      closeBtn.className = "galaga-close-btn";
      closeBtn.style.cssText = "position:absolute;top:-28px;right:0;background:var(--night);color:#ef4444;border:1px solid #ef4444;padding:4px 10px;font:12px monospace;cursor:pointer;z-index:10;border-radius:4px;";
      closeBtn.addEventListener("click", () => {
        stopGalaga();
      });

      gameContainer.appendChild(closeBtn);
      terminalBody.insertBefore(gameContainer, terminalBody.firstChild);

      // Resize canvas to fit container
      const containerRect = terminalBody.getBoundingClientRect();
      const canvasWidth = containerRect.width - 20 || 440;
      const canvasHeight = 280;

      // Make sure ITM.galaga exists
      if (window.ITM && window.ITM.galaga) {
        window.ITM.galaga.start(gameContainer);
        const galagaCanvas = gameContainer.querySelector(".galaga-canvas");
        if (galagaCanvas) {
          galagaCanvas.width = canvasWidth;
          galagaCanvas.height = canvasHeight;
        }
      }

      // Disable cmd buttons while game is active
      cmdButtons.forEach(b => b.disabled = true);
    };

    const stopGalaga = () => {
      if (!galagaGameActive) return;
      galagaGameActive = false;

      if (window.ITM && window.ITM.galaga) {
        window.ITM.galaga.stop();
      }

      const gameContainer = document.querySelector(".galaga-container");
      if (gameContainer) gameContainer.remove();

      const originalScreen = terminal.querySelector("#terminalScreen");
      const inputLine = terminal.querySelector(".terminal-input-line");

      if (originalScreen) originalScreen.style.display = "";
      if (inputLine) inputLine.style.display = "";
      if (screen) screen.style.display = "";

      cmdButtons.forEach(b => b.disabled = false);
    };

    cmdButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (typing) return;

        const cmdKey = btn.dataset.cmd;
        const cmdData = commands[cmdKey];
        if (!cmdData) return;

        typeWriter(cmdData.text, () => {
          setTimeout(() => {
            if (cmdKey === "clear") {
              screen.innerHTML = '<p class="terminal-welcome">Pantalla limpia. Selecciona otro comando:</p>';
              galagaGameActive = false;
            } else if (cmdKey === "juego") {
              const cmdEcho = document.createElement("p");
              cmdEcho.className = "terminal-cmd-echo";
              cmdEcho.innerHTML = `<span>></span> ${cmdData.text}`;
              screen.appendChild(cmdEcho);
              // Pequeña demora para que se vea el comando antes de iniciar
              setTimeout(() => startGalaga(), 400);
            } else {
              const cmdEcho = document.createElement("p");
              cmdEcho.className = "terminal-cmd-echo";
              cmdEcho.innerHTML = `<span>></span> ${cmdData.text}`;

              const outputElem = document.createElement("p");
              outputElem.className = "terminal-output";
              outputElem.textContent = cmdData.output;

              screen.appendChild(cmdEcho);
              screen.appendChild(outputElem);
            }

            inputText.textContent = "";
            screen.scrollTop = screen.scrollHeight;
          }, 300);
        });
      });
    });
  };

  const initCarousel = () => {
    const carousel = document.querySelector("#memoriesCarousel");
    if (!carousel) return;

    const inner = carousel.querySelector("#carouselInner");
    const prevBtn = carousel.querySelector("#carouselPrev");
    const nextBtn = carousel.querySelector("#carouselNext");
    const indicators = carousel.querySelector("#carouselIndicators");

    if (!inner || !prevBtn || !nextBtn || !indicators) return;

    const memories = [
      {
        number: "01",
        tag: "Convivencia",
        title: "Viaje al Lago de Yojoa y Aguas Termales",
        text: "Un viaje especial para relajarnos, tomar fotograf\u00edas y celebrar el esfuerzo del grupo fuera de las aulas.",
        image: "assets/img/news/viaje-lago-yojoa.png"
      },
      {
        number: "02",
        tag: "Soporte T\u00e9cnico",
        title: "Taller Pr\u00e1ctico de Ensamble y Redes",
        text: "Probar componentes, diagnosticar fallas y ponchar cables. El laboratorio t\u00e9cnico es nuestro espacio favorito.",
        image: "assets/img/news/taller-padres.png"
      },
      {
        number: "03",
        tag: "Feria Tecnol\u00f3gica",
        title: "Proyectos en Acci\u00f3n y Orientaci\u00f3n",
        text: "Mostrando software real, maquetas y exponiendo el alcance de la inform\u00e1tica ante los nuevos alumnos.",
        image: "assets/img/news/orientacion-vocacional.png"
      },
      {
        number: "04",
        tag: "C\u00f3digo",
        title: "Creaci\u00f3n de la Memoria Digital",
        text: "Trabajar en equipo para dise\u00f1ar, programar y lanzar este sitio web, combinando HTML, CSS y JS con orgullo.",
        image: "assets/img/news/encuentro-deportivo.png"
      }
    ];

    inner.innerHTML = memories.map((mem, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}" data-slide-index="${index}">
        <div class="carousel-slide-content">
          <div class="carousel-img-slot">
            <img src="${mem.image}" alt="${mem.title}" loading="lazy" decoding="async" />
          </div>
          <div class="carousel-text-slot">
            <span class="carousel-number">${mem.number}</span>
            <span class="carousel-tag">${mem.tag}</span>
            <h3>${mem.title}</h3>
            <p>${mem.text}</p>
          </div>
        </div>
      </div>
    `).join("");

    indicators.innerHTML = memories.map((_, index) => `
      <button type="button" class="carousel-dot ${index === 0 ? "active" : ""}" data-indicator-index="${index}" aria-label="Ir al recuerdo ${index + 1}"></button>
    `).join("");

    let currentSlide = 0;
    const slides = inner.querySelectorAll(".carousel-item");
    const dots = indicators.querySelectorAll(".carousel-dot");

    const showSlide = (index) => {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove("active");
      dots[currentSlide].classList.remove("active");

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    };

    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
      });
    });

    let interval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 8000);

    carousel.addEventListener("mouseenter", () => clearInterval(interval));
    carousel.addEventListener("mouseleave", () => {
      interval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 8000);
    });
  };

  /* =========================================================
     Lluvia de Código Matrix
     ========================================================= */
  const initMatrix = () => {
    const canvas = document.querySelector("#matrixCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const hackerBtn = document.querySelector("#hackerToggle");
    if (!hackerBtn) return;

    let active = false;
    let animId = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "アイウエオカキクケコITM2026HACK{};=></>#01";
    const fontSize = 14;
    let columns = [];

    const resetColumns = () => {
      const count = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: count }, () => Math.random() * canvas.height / fontSize | 0);
    };
    resetColumns();

    const draw = () => {
      ctx.fillStyle = "rgba(6, 19, 22, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      columns.forEach((y, x) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const isHighlight = Math.random() > 0.96;
        ctx.fillStyle = isHighlight ? "#f59e0b" : (Math.random() > 0.85 ? "#67e8f9" : "#22c55e");
        ctx.fillText(char, x * fontSize, y * fontSize);
        columns[x] = y > canvas.height / fontSize && Math.random() > 0.975 ? 0 : y + 1;
      });

      animId = requestAnimationFrame(draw);
    };

    const startMatrix = () => {
      resetColumns();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.opacity = "1";
      document.body.classList.add("hacker-mode-active");
      hackerBtn.setAttribute("aria-pressed", "true");
      draw();
    };

    const stopMatrix = () => {
      if (animId) cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.opacity = "0";
      document.body.classList.remove("hacker-mode-active");
      hackerBtn.setAttribute("aria-pressed", "false");
    };

    hackerBtn.addEventListener("click", () => {
      active = !active;
      active ? startMatrix() : stopMatrix();
    });
  };

  /* =========================================================
     Mascota Digital Interactiva (Pulpo)
     ========================================================= */
  const initMascota = () => {
    const floatWidget = document.querySelector("#mascotFloat");
    const wrapper = document.querySelector("#mascotWrapper");
    const bubble = document.querySelector("#mascotBubble");
    const svg = document.querySelector("#mascotSvg");
    if (!floatWidget || !wrapper || !bubble || !svg) return;

    const messages = [
      "¡Hola! Soy Pulpo, la mascota de Informática 🐙",
      "¿Sabías que HTML tiene más de 100 etiquetas?",
      "if (estudio) { éxito = true; } 💻",
      "La Promo 2026 es la más hacker del ITM 🔥",
      "git commit -m 'mejor promo de informática' ✨",
      "Tengo 8 tentáculos y todos escriben código 🐙💻",
      "¡Estudiar informática es el mejor cheat code! 🎮",
      "El loop de la vida: aprender → crear → compartir 🔄",
      "Con mis tentáculos hago multitasking nivel pro 🪄",
      "¡Tú puedes ser el próximo desarrollador del ITM! 💪"
    ];

    let hideTimeout = null;
    let dragActive = false;
    let dragStartX = 0, dragStartY = 0;
    let widgetStartX = 0, widgetStartY = 0;

    const hideBubble = () => { bubble.style.opacity = "0"; };

    const showMessage = (msg) => {
      clearTimeout(hideTimeout);
      bubble.textContent = msg;
      bubble.style.opacity = "1";
      hideTimeout = setTimeout(hideBubble, 4000);
    };

    const blinkEyes = () => {
      const eyes = svg.querySelectorAll(".mascot-eye");
      const mouth = svg.querySelector(".mascot-mouth");
      eyes.forEach(e => e.style.transform = "scaleY(0.1)");
      if (mouth) mouth.setAttribute("d", "M 53 52 Q 60 48 67 52");
      setTimeout(() => {
        eyes.forEach(e => e.style.transform = "scaleY(1)");
        if (mouth) mouth.setAttribute("d", "M 53 50 Q 60 56 67 50");
      }, 400);
    };

    wrapper.addEventListener("click", () => {
      if (dragActive) return;
      const msg = messages[Math.floor(Math.random() * messages.length)];
      showMessage(msg);
      blinkEyes();
      wrapper.style.transform = "scale(1.18) rotate(-4deg)";
      setTimeout(() => { wrapper.style.transform = ""; }, 320);
    });

    const pupils = svg.querySelectorAll(".mascot-pupil");
    document.addEventListener("mousemove", (e) => {
      if (dragActive) return;
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist = Math.min(2, Math.hypot(e.clientX - cx, e.clientY - cy) / 80);
      pupils.forEach(p => p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`);
    });

    // Drag universal (mouse + touch)
    const onPointerDown = (clientX, clientY) => {
      const r = floatWidget.getBoundingClientRect();
      dragActive = true;
      dragStartX = clientX;
      dragStartY = clientY;
      widgetStartX = r.left;
      widgetStartY = r.top;
      floatWidget.style.transition = "none";
      floatWidget.style.left = r.left + "px";
      floatWidget.style.top = r.top + "px";
      floatWidget.style.bottom = "auto";
      floatWidget.style.right = "auto";
    };

    const onPointerMove = (clientX, clientY) => {
      if (!dragActive) return;
      floatWidget.style.left = (widgetStartX + clientX - dragStartX) + "px";
      floatWidget.style.top = (widgetStartY + clientY - dragStartY) + "px";
    };

    const onPointerUp = () => {
      if (!dragActive) return;
      dragActive = false;
      floatWidget.style.transition = "";
    };

    wrapper.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      onPointerDown(e.clientX, e.clientY);
    });
    document.addEventListener("mousemove", (e) => { onPointerMove(e.clientX, e.clientY); });
    document.addEventListener("mouseup", onPointerUp);

    wrapper.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    document.addEventListener("touchmove", (e) => {
      if (e.touches.length !== 1) return;
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    document.addEventListener("touchend", onPointerUp);

    bubble.style.opacity = "0";
  };

  /* =========================================================
     Quiz Vocacional de Programador
     ========================================================= */
  const initQuiz = () => {
    const quizCard = document.querySelector("#quizCard");
    const quizResultCard = document.querySelector("#quizResultCard");
    const questionNumber = document.querySelector("#quizQuestionNumber");
    const questionText = document.querySelector("#quizQuestionText");
    const optionsList = document.querySelector("#quizOptionsList");
    const progressFill = document.querySelector("#quizProgressFill");
    const resultIcon = document.querySelector("#quizResultIcon");
    const resultTitle = document.querySelector("#quizResultTitle");
    const resultText = document.querySelector("#quizResultText");
    const restartBtn = document.querySelector("#quizRestartBtn");

    if (!quizCard || !optionsList) return;

    const questions = [
      {
        text: "Cuando un proyecto no funciona, ¿qué hacés primero?",
        options: [
          { label: "Lo leo línea por línea y busco el bug", profile: "dev" },
          { label: "Lo apago y lo vuelvo a encender 😅", profile: "soporte" },
          { label: "Pienso cómo se ve y si el diseño es claro", profile: "diseño" },
          { label: "Busco en YouTube algún tutorial", profile: "maker" }
        ]
      },
      {
        text: "¿Cuál de estos proyectos te emociona más?",
        options: [
          { label: "Una app web para gestionar horarios del colegio", profile: "dev" },
          { label: "Armar una red local para el laboratorio", profile: "soporte" },
          { label: "Rediseñar la página del ITM para que se vea increíble", profile: "diseño" },
          { label: "Un videojuego que puedan jugar todos en el recreo", profile: "maker" }
        ]
      },
      {
        text: "Si tuvieras un superpoder tecnológico, sería:",
        options: [
          { label: "Hacer que cualquier app funcione a la primera", profile: "dev" },
          { label: "Que nunca se cayera ningún servidor", profile: "soporte" },
          { label: "Crear interfaces tan bonitas que la gente no quisiera salir", profile: "diseño" },
          { label: "Combinar hardware y software para inventar cosas nuevas", profile: "maker" }
        ]
      },
      {
        text: "En clases de informática, ¿qué parte te gusta más?",
        options: [
          { label: "La práctica de programación", profile: "dev" },
          { label: "Ensamblar y configurar equipos", profile: "soporte" },
          { label: "Hacer presentaciones y diseñar diapositivas", profile: "diseño" },
          { label: "Cuando hacemos proyectos finales creativos", profile: "maker" }
        ]
      },
      {
        text: "¿Cuál es tu frase favorita?",
        options: [
          { label: "'Si funciona, no lo toques' (pero lo toco igual)", profile: "dev" },
          { label: "'Un cable bien ponchado no falla'", profile: "soporte" },
          { label: "'El diseño es inteligencia hecha visible'", profile: "diseño" },
          { label: "'Hagamos algo que nunca se haya visto'", profile: "maker" }
        ]
      }
    ];

    const profiles = {
      dev: {
        icon: "👨‍💻",
        title: "Desarrollador Full-Stack",
        text: "Tenés mente de programador. Disfrutás construir lógica, crear sistemas y resolver problemas con código. HTML, JavaScript y las bases de datos son tu zona de confort. ¡La Promo 2026 necesita gente como vos!"
      },
      soporte: {
        icon: "🔧",
        title: "Técnico en Redes y Soporte",
        text: "Sos el héroe silencioso de la tecnología. Cuando nada funciona, vos entrás en acción: cables, drivers, configuraciones de red. El laboratorio técnico es tu hogar y eso tiene mucho valor en el mundo laboral."
      },
      diseño: {
        icon: "🎨",
        title: "Diseñador UI/UX y Creativo Digital",
        text: "Tu ojo para los detalles visuales es impresionante. Tenés el don de hacer que lo complejo se vea simple y bonito. Informática necesita personas que combinen lógica con creatividad, ¡y eso sos vos!"
      },
      maker: {
        icon: "🚀",
        title: "Maker Innovador y Emprendedor Tech",
        text: "No te conformás con lo que existe, querés inventar algo nuevo. Combinás hardware, software e ideas creativas. Sos el tipo de persona que funda startups, crea proyectos únicos y deja huella. ¡Informática ITM es para vos!"
      }
    };

    let currentQuestion = 0;
    const scores = { dev: 0, soporte: 0, diseño: 0, maker: 0 };

    const renderQuestion = () => {
      const q = questions[currentQuestion];
      const progress = (currentQuestion / questions.length) * 100;

      if (progressFill) progressFill.style.width = `${progress}%`;
      if (questionNumber) questionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
      if (questionText) questionText.textContent = q.text;

      if (optionsList) {
        optionsList.innerHTML = q.options.map((opt, i) => `
          <button type="button" class="quiz-opt-btn" data-profile="${opt.profile}">
            <span>${String.fromCharCode(65 + i)}</span>
            ${opt.label}
          </button>
        `).join("");

        optionsList.querySelectorAll(".quiz-opt-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const profile = btn.dataset.profile;
            scores[profile]++;
            currentQuestion++;

            if (currentQuestion >= questions.length) {
              showResult();
            } else {
              // Transición suave
              quizCard.style.opacity = "0";
              quizCard.style.transform = "translateX(16px)";
              setTimeout(() => {
                renderQuestion();
                quizCard.style.transition = "opacity 0.3s, transform 0.3s";
                quizCard.style.opacity = "1";
                quizCard.style.transform = "translateX(0)";
              }, 200);
            }
          });
        });
      }
    };

    const showResult = () => {
      const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      const profile = profiles[winner];

      if (progressFill) progressFill.style.width = "100%";
      if (resultIcon) resultIcon.textContent = profile.icon;
      if (resultTitle) resultTitle.textContent = profile.title;
      if (resultText) resultText.textContent = profile.text;

      quizCard.style.display = "none";
      if (quizResultCard) quizResultCard.style.display = "flex";
    };

    const resetQuiz = () => {
      currentQuestion = 0;
      Object.keys(scores).forEach(k => scores[k] = 0);
      if (quizResultCard) quizResultCard.style.display = "none";
      quizCard.style.display = "flex";
      quizCard.style.opacity = "1";
      quizCard.style.transform = "none";
      quizCard.style.transition = "";
      renderQuestion();
    };

    if (restartBtn) restartBtn.addEventListener("click", resetQuiz);

    renderQuestion();
  };

  const init = () => {
    renderInicio();
    renderProgramas();
    renderPromo2026();
    renderNoticias();
    renderActividades();
    renderFaq();
    renderContacto();

    renderAlumnos();
    initModal();
    initTerminal();
    initCarousel();
    initMatrix();
    initMascota();
    initQuiz();
  };

  return {
    init,
    renderCareerPage
  };
})();

