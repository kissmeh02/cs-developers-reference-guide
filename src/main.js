/**
 * App entry: styles + data-driven navigation (see src/data/sections.js).
 */
import "./styles/main.css";
import { NAV_GROUPS, buildSectionLabelsMap } from "./data/sections.js";
import { renderSidebarNav, renderMobileNav } from "./nav/render-nav.js";
import { initNavigation } from "./app/navigation.js";

const sbNav = document.getElementById("sbNav");
const mobileNav = document.getElementById("mobileNav");

if (sbNav) sbNav.appendChild(renderSidebarNav(NAV_GROUPS));
if (mobileNav) renderMobileNav(mobileNav, NAV_GROUPS);

initNavigation(buildSectionLabelsMap());
