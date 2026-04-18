/**
 * Single source of truth for sidebar, mobile nav, and URL path labels.
 * Section body HTML remains in index.html (merge workflow); ids must match `id` here.
 */

/** @typedef {{ id: string, num: string, title: string, pathSlug: string, defaultActive?: boolean }} NavItem */
/** @typedef {{ label: string, items: NavItem[] }} NavGroup */

/** @type {NavGroup[]} */
export const NAV_GROUPS = [
  {
    label: "Foundations",
    items: [
      { id: "home", num: "00", title: "Overview", pathSlug: "overview", defaultActive: true },
      { id: "cs", num: "01", title: "CS Fundamentals", pathSlug: "cs-fundamentals" },
      { id: "ds", num: "02", title: "Data Structures", pathSlug: "data-structures" },
      { id: "algo", num: "03", title: "Algorithms & Complexity", pathSlug: "algorithms-and-complexity" },
      { id: "os", num: "04", title: "Operating Systems", pathSlug: "operating-systems" },
      { id: "net", num: "05", title: "Computer Networking", pathSlug: "computer-networking" },
    ],
  },
  {
    label: "Systems",
    items: [
      { id: "arch", num: "06", title: "System Architecture", pathSlug: "system-architecture" },
      { id: "data", num: "07", title: "Data Layer", pathSlug: "data-layer" },
      { id: "api", num: "08", title: "API Design", pathSlug: "api-design" },
      { id: "dist", num: "09", title: "Distributed Systems", pathSlug: "distributed-systems" },
      { id: "concur", num: "10", title: "Concurrency & Parallelism", pathSlug: "concurrency-and-parallelism" },
    ],
  },
  {
    label: "Engineering",
    items: [
      { id: "env", num: "11", title: "Environment & Config", pathSlug: "environment" },
      { id: "testing", num: "12", title: "Testing Strategy", pathSlug: "testing-strategy" },
      { id: "cicd", num: "13", title: "CI/CD & GitOps", pathSlug: "ci-cd-gitops" },
      { id: "perf", num: "14", title: "Performance", pathSlug: "performance" },
      { id: "obs", num: "15", title: "Observability", pathSlug: "observability" },
    ],
  },
  {
    label: "Security & AI",
    items: [
      { id: "security", num: "16", title: "Security & Zero Trust", pathSlug: "security-and-zero-trust" },
      { id: "crypto", num: "17", title: "Cryptography", pathSlug: "cryptography" },
      { id: "ai", num: "18", title: "AI Collaboration", pathSlug: "ai-collaboration" },
      { id: "ml", num: "19", title: "ML Fundamentals", pathSlug: "ml-fundamentals" },
    ],
  },
  {
    label: "Frontend & Language",
    items: [
      { id: "fe", num: "20", title: "Frontend Systems", pathSlug: "frontend-systems" },
      { id: "lang", num: "21", title: "Language Theory", pathSlug: "language-theory" },
      { id: "compilers", num: "22", title: "Compilers", pathSlug: "compilers" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "design", num: "23", title: "Design Patterns", pathSlug: "design-patterns" },
      { id: "rules", num: "24", title: "Golden Rules", pathSlug: "golden-rules" },
    ],
  },
];

/**
 * @returns {Record<string, string>} map of section id → top-bar path segment
 */
export function buildSectionLabelsMap() {
  /** @type {Record<string, string>} */
  const map = {};
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      map[item.id] = item.pathSlug;
    }
  }
  return map;
}

/** @returns {string[]} ordered section ids */
export function getAllSectionIds() {
  return NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));
}
