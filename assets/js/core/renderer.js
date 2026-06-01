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

  const renderMatricula = () => {
    const data = window.ITM.sections.matricula;
    if (!data) return;

    setHTML("#matricula .section-header .eyebrow", data.eyebrow);
    setHTML("#matricula .section-header h2", data.title);
    setHTML("#matricula .section-header p", data.text);
    setHTML("#matricula .section-header .button", data.cta.label);

    const cta = document.querySelector("#matricula .section-header .button");
    if (cta) cta.setAttribute("href", data.cta.href);

    renderCards(".process-grid", data.steps, (step) => `
      <article class="card process-card">
        <span class="badge">${step.badge}</span>
        <h3>${step.title}</h3>
        <p>${step.text}</p>
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

  const init = () => {
    renderInicio();
    renderMatricula();
    renderProgramas();
    renderPromo2026();
    renderNoticias();
    renderActividades();
    renderFaq();
    renderContacto();
  };

  return {
    init
  };
})();
