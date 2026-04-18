# 2026 Engineering Reference

A static, single-page engineering reference (CS fundamentals through production practices), built with [Vite](https://vitejs.dev/). Content lives in `index.html` (merged from `sections-part-*.html`); navigation and styles live under `src/`.

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

## Create a new GitHub repository

### Option A — GitHub CLI (`gh`)

1. Install [GitHub CLI](https://cli.github.com/) and run `gh auth login` once.
2. From this folder (with Git already initialized and committed):

```bash
gh repo create cs-developers-reference-guide --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` if you want a public repo. Change the repo name if you prefer.

### Option B — GitHub website

1. On GitHub: **New repository** → choose name (e.g. `cs-developers-reference-guide`) → create **without** README (this repo already has one).
2. In your project folder:

```bash
git init
git add .
git commit -m "Initial commit: 2026 Engineering Reference"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your account and repository name.

## License

Add a `LICENSE` file if you need a specific license for your use case.
