import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { getSitemapRoutes } = require(
  path.join(root, "src", "seo", "sitemap-routes.cjs"),
);
const output = path.join(root, "src", "seo", "page-lastmod.json");

function currentShanghaiDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function normalizePath(value) {
  const pathValue = value.trim();
  if (!pathValue || pathValue === "/") return "/";
  return `/${pathValue.replace(/^\/+|\/+$/g, "")}`;
}

let existing = {};
try {
  existing = JSON.parse(await readFile(output, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const touchIndex = process.argv.indexOf("--touch");
const cliTouches = touchIndex === -1 ? [] : process.argv.slice(touchIndex + 1);
const environmentTouches = (process.env.SITEMAP_UPDATED_PATHS ?? "")
  .split(",")
  .filter(Boolean);
const touched = new Set([...cliTouches, ...environmentTouches].map(normalizePath));
const routes = getSitemapRoutes();
const knownPaths = new Set(routes.map((entry) => entry.path));
const unknownTouches = [...touched].filter((entry) => !knownPaths.has(entry));

if (touchIndex !== -1 && touched.size === 0) {
  throw new Error("Pass one or more public paths after --touch.");
}
if (unknownTouches.length) {
  throw new Error(`Unknown sitemap path: ${unknownTouches.join(", ")}`);
}

const today = currentShanghaiDate();
const next = Object.fromEntries(
  routes.map(({ path: routePath }) => [
    routePath,
    touched.has(routePath) || !existing[routePath] ? today : existing[routePath],
  ]),
);

await writeFile(output, `${JSON.stringify(next, null, 2)}\n`, "utf8");

console.log(`Sitemap dates: ${Object.keys(next).length}`);
console.log(`New pages: ${Object.keys(next).filter((entry) => !existing[entry]).length}`);
console.log(`Updated pages: ${touched.size}`);
