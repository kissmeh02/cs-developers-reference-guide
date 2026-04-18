import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllSectionIds, buildSectionLabelsMap } from "../src/data/sections.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");

const html = fs.readFileSync(indexPath, "utf8");

const domIds = new Set(
  [...html.matchAll(/id="(s-[a-z0-9-]+)"/g)].map((m) => m[1].slice(2))
);

const configIds = new Set(getAllSectionIds());
const labels = buildSectionLabelsMap();

const missingInDom = [...configIds].filter((k) => !domIds.has(k));
const missingInConfig = [...domIds].filter((k) => !configIds.has(k));

if (missingInDom.length || missingInConfig.length) {
  console.error("src/data/sections.js NAV_GROUPS and index.html id=s-* are out of sync.");
  if (missingInDom.length) console.error("In NAV_GROUPS but no id=s-* in index:", missingInDom);
  if (missingInConfig.length) console.error("In index but not in NAV_GROUPS:", missingInConfig);
  process.exit(1);
}

if (Object.keys(labels).length !== configIds.size) {
  console.error("buildSectionLabelsMap size mismatch.");
  process.exit(1);
}

console.log("OK:", domIds.size, "sections; NAV_GROUPS matches id=s-*.");
