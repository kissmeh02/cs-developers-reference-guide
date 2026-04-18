# Contributing

Thanks for helping improve the Engineering Reference.

## Getting started

1. Install [Node.js](https://nodejs.org/) 20 or newer.
2. Clone the repository and run `npm install`.
3. Use `npm run dev` for local preview with hot reload.

## Before you open a pull request

- Run **`npm run verify`** — ensures navigation metadata in `src/data/sections.js` matches section IDs in `index.html`.
- Run **`npm run build`** — confirms the production build succeeds.

## Editing content

- Main content lives in **`index.html`**, often assembled from **`sections-part-*.html`** via `scripts/merge-sections.mjs`.
- If you merge parts into `index.html`, restore the `<!-- MERGE_NEXT -->` marker in `index.html` before running the merge script again (see `README.md`).
- Navigation labels and groups are defined in **`src/data/sections.js`** — keep new sections in sync with `id="s-..."` anchors in the HTML.

## Style

- Match existing tone: concise, reference-oriented, technically accurate.
- Prefer small, focused changes over large mixed edits when possible.

## License

By contributing, you agree that your contributions are licensed under the same terms as the project (see `LICENSE`).
