/* =========================================================
   Arranque general del sitio
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  window.ITM.renderer.init();
  window.ITM.theme.init();
  window.ITM.menu.init();
  window.ITM.router.init();
  window.ITM.reveal.init();
});
