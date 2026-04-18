import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");

const names = [
  "sections-part-b.html",
  "sections-part-c.html",
  "sections-part-d.html",
  "sections-part-e.html",
];

const chunks = names
  .map((f) => path.join(root, f))
  .filter((p) => fs.existsSync(p))
  .map((p) => fs.readFileSync(p, "utf8"));

if (!chunks.length) {
  console.error("No section part files found.");
  process.exit(1);
}

let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("<!-- MERGE_NEXT -->")) {
  console.error("MERGE_NEXT not found in index.html");
  process.exit(1);
}
html = html.replace("<!-- MERGE_NEXT -->", chunks.join("\n"));
fs.writeFileSync(indexPath, html);
console.log("merged", chunks.length, "parts into index.html, length:", html.length);
