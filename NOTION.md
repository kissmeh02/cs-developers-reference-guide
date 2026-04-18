# Using this reference in Notion

Notion works best with **Markdown** (structure, headings, tables, code blocks). The interactive HTML page (`index.html`) is for the browser; for Notion, use **`reference.md`**.

## Option A — Import as a page (recommended)

1. In Notion: **⋯** on the left sidebar → **Import** → **Markdown**.
2. Choose **`reference.md`** from this project.
3. Notion creates a page. You can **split** it: select a `##` heading block → **Turn into** → **Page** to make child pages per section.

## Option B — Paste

1. Open **`reference.md`** in an editor.
2. Copy a section (or the whole file).
3. In Notion, paste. Headings and lists usually map cleanly; very large tables may need minor cleanup.

## Option C — Embed the live page (if hosted)

1. Deploy the site (e.g. Vercel, Netlify, GitHub Pages) so `index.html` is at a public URL.
2. In Notion: type `/embed` → paste the URL.  
   Note: Notion may sandbox or strip some scripts; the static HTML/CSS view usually works for reading.

## Option D — Notion Web Clipper

Clip a **hosted** version of the page from the browser. Formatting will differ from a native Notion page; Markdown import is usually cleaner.

---

**Tip:** For a wiki-style setup, import `reference.md` once, then move each `## Section …` block to its own subpage under a parent “2026 Dev Reference” page.
