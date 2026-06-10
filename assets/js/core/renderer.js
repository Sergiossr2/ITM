/* =========================================================
   Renderizado de contenido por secciones
   ========================================================= */

window.ITM = window.ITM || {};

window.ITM.renderer = (() => {
  const setHTML = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value) element.innerHTML = value;
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

    setHTML("#promo2026 .section-header .eyebrow", data.eyebrow);
    setHTML("#promo2026 .section-header h2", data.title);
    setHTML("#promo2026 .section-header p", data.text);

    if (data.spotlight) {
      setHTML(".promo-spotlight .eyebrow", data.spotlight.kicker);
      setHTML(".promo-spotlight h3", data.spotlight.title);
      setHTML(".promo-spotlight p", data.spotlight.text);

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
    renderFaq();
    renderContacto();
  };

  return {
    init
  };
})();
