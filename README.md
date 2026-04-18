# 2026 Engineering Reference

[![CI](https://github.com/kissmeh02/cs-developers-reference-guide/actions/workflows/ci.yml/badge.svg)](https://github.com/kissmeh02/cs-developers-reference-guide/actions/workflows/ci.yml)
[![Deploy GitHub Pages](https://github.com/kissmeh02/cs-developers-reference-guide/actions/workflows/pages.yml/badge.svg)](https://github.com/kissmeh02/cs-developers-reference-guide/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A static, single-page engineering reference (CS fundamentals through production practices), built with [Vite](https://vitejs.dev/). Content lives in `index.html` (merged from `sections-part-*.html`); navigation and styles live under `src/`.

Repository links use GitHub user **`kissmeh02`** (from your global Git config). If you rename the repo or change the owner, update `package.json`, the badges above, and `vite.config.js` (`repoSlug`) accordingly.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run verify` | Check nav config matches section IDs in `index.html` |

### GitHub Pages build (local check)

CI sets `GITHUB_PAGES=true` so asset paths use `/cs-developers-reference-guide/`. To reproduce locally:

**Windows (PowerShell)**

```powershell
$env:GITHUB_PAGES="true"; npm run build; npm run preview
```

**macOS / Linux**

```bash
GITHUB_PAGES=true npm run build && npm run preview
```

## Project layout

- `index.html` — Reference content and page shell
- `src/main.js` — App entry
- `src/data/sections.js` — Nav metadata (single source of truth)
- `src/app/navigation.js` — Routing and filters
- `src/nav/render-nav.js` — Sidebar / mobile nav rendering
- `src/styles/main.css` — Styles
- `scripts/merge-sections.mjs` — Merge `sections-part-*.html` into `index.html` (restore `<!-- MERGE_NEXT -->` in `index.html` before re-running)
- `scripts/verify-reference.mjs` — Consistency check

Do not open `index.html` via `file://`; use `npm run dev` or `npm run preview` after build (ES modules).

## GitHub repository setup

### Create the remote

**Option A — GitHub CLI (`gh`)**

1. Install [GitHub CLI](https://cli.github.com/) and run `gh auth login` once.
2. From this folder (with Git already initialized and committed):

```bash
gh repo create cs-developers-reference-guide --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` if you want a public repo. Change the repo name if you prefer (then update `repoSlug` in `vite.config.js` and `package.json` fields).

**Option B — GitHub website**

1. On GitHub: **New repository** → choose name (e.g. `cs-developers-reference-guide`) → create **without** README (this repo already has one).
2. In your project folder:

```bash
git remote add origin https://github.com/kissmeh02/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### GitHub Pages (optional)

1. **Repository → Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. Push to `main`. The workflow **Deploy GitHub Pages** (`.github/workflows/pages.yml`) builds with `GITHUB_PAGES=true` and publishes `dist/`.
3. The site will be available at `https://kissmeh02.github.io/cs-developers-reference-guide/` for a **project** site (repository name must match `repoSlug` in `vite.config.js` unless you change it).

If Pages fails on first run, open **Actions**, approve the **github-pages** environment if prompted, and re-run the workflow.

### What’s included for GitHub

| Item | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | `npm ci`, `verify`, `build` on push/PR |
| `.github/workflows/pages.yml` | Deploy to GitHub Pages from `main` |
| `.github/dependabot.yml` | Monthly npm + GitHub Actions updates |
| `.github/ISSUE_TEMPLATE/` | Bug report and feature request forms |
| `.github/pull_request_template.md` | PR checklist |
| `CONTRIBUTING.md` | How to contribute |
| `SECURITY.md` | How to report security concerns |
| `LICENSE` | MIT |

**Suggested repo settings (optional):** enable **Discussions**, add **topics** (e.g. `engineering`, `computer-science`, `reference`, `documentation`, `vite`), and set a **social preview** image under Settings → General.

## License

This project is licensed under the [MIT License](LICENSE).
