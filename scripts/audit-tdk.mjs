import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tdkSource = await readFile(
  path.join(root, "src", "seo", "tdk.js"),
  "utf8",
);
const { pageTdk } = await import(
  `data:text/javascript;base64,${Buffer.from(tdkSource).toString("base64")}`
);
const collections = [
  "cards",
  "packs",
  "guides",
  "mutations",
  "rarities",
  "rebirths",
  "updates",
];
const entries = Object.entries(pageTdk).map(([id, seo]) => ({
  id: `page:${id}`,
  ...seo,
}));

for (const collection of collections) {
  const file = path.join(root, "src", "data", "game", `${collection}.json`);
  const records = JSON.parse(await readFile(file, "utf8"));
  entries.push(
    ...records.map((record) => ({
      id: `${collection}:${record.slug}`,
      ...record.seo,
    })),
  );
}

const errors = [];
const titleOwners = new Map();
const descriptionOwners = new Map();

for (const entry of entries) {
  if (!entry.title || entry.title.length < 40 || entry.title.length > 60)
    errors.push(`${entry.id}: title length ${entry.title?.length ?? 0}`);
  if (
    !entry.description ||
    entry.description.length < 140 ||
    entry.description.length > 160
  )
    errors.push(
      `${entry.id}: description length ${entry.description?.length ?? 0}`,
    );
  if (!Array.isArray(entry.keywords) || !entry.keywords[0])
    errors.push(`${entry.id}: missing primary keyword`);
  const primary = entry.keywords[0];
  if (!entry.title?.toLowerCase().includes(primary.toLowerCase()))
    errors.push(`${entry.id}: title missing primary keyword "${primary}"`);
  if (!entry.description?.toLowerCase().includes(primary.toLowerCase()))
    errors.push(
      `${entry.id}: description missing primary keyword "${primary}"`,
    );
  if (!Array.isArray(entry.keywords) || entry.keywords.length < 2)
    errors.push(`${entry.id}: fewer than 2 keywords`);
  const fields = Object.keys(entry).filter((field) => field !== "id");
  if (
    fields.length !== 3 ||
    !fields.includes("title") ||
    !fields.includes("description") ||
    !fields.includes("keywords")
  )
    errors.push(
      `${entry.id}: TDK must contain only title, description, keywords`,
    );
  if (titleOwners.has(entry.title))
    errors.push(
      `${entry.id}: duplicate title with ${titleOwners.get(entry.title)}`,
    );
  else titleOwners.set(entry.title, entry.id);
  if (descriptionOwners.has(entry.description))
    errors.push(
      `${entry.id}: duplicate description with ${descriptionOwners.get(entry.description)}`,
    );
  else descriptionOwners.set(entry.description, entry.id);
}

console.log(`TDK entries: ${entries.length}`);
console.log(`Unique titles: ${titleOwners.size}`);
console.log(`Unique descriptions: ${descriptionOwners.size}`);
console.log(`Errors: ${errors.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
