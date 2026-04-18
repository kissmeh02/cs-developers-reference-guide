/**
 * Renders navigation UI from {@link NAV_GROUPS} (data-driven, no duplicated markup).
 */

import { NAV_GROUPS } from "../data/sections.js";

/**
 * @param {import('../data/sections.js').NavGroup[]} groups
 */
export function renderSidebarNav(groups = NAV_GROUPS) {
  const frag = document.createDocumentFragment();
  for (const group of groups) {
    const wrap = document.createElement("div");
    wrap.className = "sb-group";
    const labelEl = document.createElement("div");
    labelEl.className = "sb-group-label";
    labelEl.textContent = group.label;
    wrap.appendChild(labelEl);
    for (const item of group.items) {
      const a = document.createElement("a");
      a.className = "sb-item";
      if (item.defaultActive) a.classList.add("active");
      a.href = `#${item.id}`;
      a.dataset.nav = item.id;
      const num = document.createElement("span");
      num.className = "num";
      num.textContent = item.num;
      a.appendChild(num);
      a.appendChild(document.createTextNode(item.title));
      wrap.appendChild(a);
    }
    frag.appendChild(wrap);
  }
  return frag;
}

/**
 * @param {HTMLSelectElement} selectEl
 * @param {import('../data/sections.js').NavGroup[]} groups
 */
export function renderMobileNav(selectEl, groups = NAV_GROUPS) {
  selectEl.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Jump to section…";
  selectEl.appendChild(placeholder);
  for (const group of groups) {
    for (const item of group.items) {
      const opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = `${item.num} · ${item.title}`;
      selectEl.appendChild(opt);
    }
  }
}
