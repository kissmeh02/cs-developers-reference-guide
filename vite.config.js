import { defineConfig } from "vite";

// GitHub project Pages URL: https://<user>.github.io/<repo>/
// Must match repository name. CI sets GITHUB_PAGES=true for production build.
const repoSlug = "cs-developers-reference-guide";
const base =
  process.env.GITHUB_PAGES === "true" ? `/${repoSlug}/` : "/";

export default defineConfig({
  root: ".",
  base,
  publicDir: false,
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "index.html",
    },
  },
});
