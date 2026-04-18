/**
 * Hash routing, sidebar / mobile nav, and search filter — event delegation, no inline handlers.
 */

const NAV_SELECTOR = "a[data-nav]";

/**
 * @param {Record<string, string>} sectionLabels
 */
export function initNavigation(sectionLabels) {
  const navigateToSection = (/** @type {string} */ id) => {
    const target = document.getElementById(`s-${id}`);
    if (!target) return;

    document.querySelectorAll(".section").forEach((s) => {
      s.classList.toggle("active", s.id === `s-${id}`);
    });
    document.querySelectorAll(NAV_SELECTOR).forEach((b) => {
      b.classList.toggle("active", b.dataset.nav === id);
    });

    const pathEl = document.getElementById("curPath");
    if (pathEl) pathEl.textContent = sectionLabels[id] ?? id;

    syncMobileNav(id);
    if (history.replaceState) history.replaceState(null, "", `#${id}`);
    window.scrollTo(0, 0);
  };

  function syncMobileNav(/** @type {string} */ id) {
    const mn = document.getElementById("mobileNav");
    if (!mn) return;
    const idx = [...mn.options].findIndex((o) => o.value === id);
    mn.selectedIndex = idx >= 0 ? idx : 0;
  }

  function applyHash(/** @type {boolean} */ fromHashChange) {
    const h = (location.hash || "").replace(/^#/, "");
    if (!h) {
      if (fromHashChange) navigateToSection("home");
      else syncMobileNav("home");
      return;
    }
    if (sectionLabels[h] !== undefined) navigateToSection(h);
    else if (document.getElementById(`s-${h}`)) navigateToSection(h);
  }

  document.getElementById("sbNav")?.addEventListener("click", (e) => {
    const link = e.target.closest(NAV_SELECTOR);
    if (!link) return;
    e.preventDefault();
    const id = link.dataset.nav;
    if (id) navigateToSection(id);
  });

  document.getElementById("mobileNav")?.addEventListener("change", (e) => {
    const el = /** @type {HTMLSelectElement} */ (e.target);
    const v = el.value;
    if (v) navigateToSection(v);
  });

  document.getElementById("sbSearch")?.addEventListener("input", (e) => {
    const el = /** @type {HTMLInputElement} */ (e.target);
    filterSidebar(el.value);
  });

  document.querySelectorAll(".js-nav-card").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const id = el.getAttribute("data-nav");
      if (id) navigateToSection(id);
    });
  });

  applyHash(false);
  window.addEventListener("hashchange", () => applyHash(true));
}

/**
 * @param {string} q
 */
function filterSidebar(q) {
  const query = q.toLowerCase().trim();
  document.querySelectorAll(".sb-item").forEach((item) => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? "flex" : "none";
  });
  document.querySelectorAll(".sb-group").forEach((group) => {
    const label = group.querySelector(".sb-group-label");
    const hasVisible = [...group.querySelectorAll(".sb-item")].some((i) => i.style.display !== "none");
    if (label) label.style.display = hasVisible ? "block" : "none";
  });
}
