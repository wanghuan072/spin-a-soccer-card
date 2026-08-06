import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(root, "src", "data", "game");
const snapshot = JSON.parse(
  await readFile(path.join(dataRoot, "site.json"), "utf8"),
);

const files = [
  "cards",
  "packs",
  "codes",
  "guides",
  "updates",
  "mutations",
  "rarities",
  "rebirths",
  "gamepasses",
  "trade-observations",
];
const data = Object.fromEntries(
  await Promise.all(
    files.map(async (name) => [
      name,
      JSON.parse(await readFile(path.join(dataRoot, `${name}.json`), "utf8")),
    ]),
  ),
);

const playerFields = {
  cards: [
    "name",
    "fullName",
    "position",
    "rarity",
    "imageAlt",
    "description",
    "howToGet",
    "addedInUpdate",
  ],
  packs: [
    "name",
    "currency",
    "unlockRequirement",
    "highestRarity",
    "description",
    "availability",
  ],
  codes: ["code", "reward", "requirement"],
  guides: [
    "title",
    "category",
    "summary",
    "sections",
    "tips",
    "mistakes",
    "faq",
  ],
  updates: [
    "title",
    "version",
    "imageAlt",
    "eventStatus",
    "newCards",
    "newPacks",
    "codeChanges",
    "balanceChanges",
    "summary",
    "details",
  ],
  mutations: ["name", "effect", "description"],
  rarities: ["name", "description", "effect"],
  rebirths: ["title", "requirement", "unlocks", "strategy"],
  gamepasses: ["name", "description"],
  "trade-observations": ["cardName", "variant", "currency", "interpretation"],
};
const bannedPlayerTerms = [
  /\bsummary\b/i,
  /\bsource(?:s)?\b/i,
  /\bevidence\b/i,
  /\bresearch\b/i,
  /\bmethodology\b/i,
  /\bverification\b/i,
  /\bverified\b/i,
  /\bsnapshot\b/i,
  /\breported\b/i,
  /\bobserved\b/i,
  /\bcitation(?:s)?\b/i,
  /\beditorial\b/i,
  /\baudit\b/i,
  /\bquick answer\b/i,
  /\bprimary source\b/i,
];

const errors = [];
const longCopyOwners = new Map();

function addError(message) {
  errors.push(message);
}

function validDate(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
  );
}

if (!validDate(snapshot.snapshotDate)) {
  addError("site: invalid site data date");
}
if (!validDate(snapshot.officialSnapshot?.observedAt)) {
  addError("site: invalid official game details date");
} else if (snapshot.officialSnapshot.observedAt > snapshot.snapshotDate) {
  addError("site: official game details are newer than the site data date");
}

function strings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(strings);
  return [];
}

function recordKey(collection, entry, index) {
  return `${collection}:${entry.slug ?? entry.code ?? entry.id ?? index}`;
}

for (const [collection, records] of Object.entries(data)) {
  if (!Array.isArray(records)) {
    addError(`${collection}: collection is not an array`);
    continue;
  }

  const identityField =
    collection === "codes"
      ? "code"
      : records.some((entry) => entry.slug)
        ? "slug"
        : "id";
  const identities = new Set();
  for (const [index, entry] of records.entries()) {
    const key = recordKey(collection, entry, index);
    const identity = entry[identityField];
    if (identity === undefined || identity === null || identity === "")
      addError(`${key}: missing ${identityField}`);
    else if (identities.has(String(identity)))
      addError(`${key}: duplicate ${identityField} ${identity}`);
    else identities.add(String(identity));

    if (entry.source) {
      try {
        const url = new URL(entry.source.url);
        if (!/^https?:$/.test(url.protocol))
          addError(`${key}: unsupported page URL protocol`);
      } catch {
        addError(`${key}: invalid page URL`);
      }
      if (!validDate(entry.source.observedAt))
        addError(`${key}: invalid checked date`);
      else if (entry.source.observedAt > snapshot.snapshotDate)
        addError(`${key}: checked date is newer than site data date`);
    }

    if (entry.lastVerifiedAt && !validDate(entry.lastVerifiedAt))
      addError(`${key}: invalid item date`);
    if (entry.date && !validDate(entry.date))
      addError(`${key}: invalid update date`);

    if (entry.seo) {
      const fields = Object.keys(entry.seo).sort().join(",");
      if (fields !== "description,keywords,title")
        addError(
          `${key}: TDK contains fields other than title, description and keywords`,
        );
    }

    for (const field of playerFields[collection] ?? []) {
      const playerValue =
        collection === "guides" && field === "sections"
          ? entry.sections.map(({ heading, body, imageAlt }) => ({
              heading,
              body,
              imageAlt,
            }))
          : entry[field];
      for (const text of strings(playerValue)) {
        for (const term of bannedPlayerTerms) {
          if (term.test(text))
            addError(
              `${key}.${field}: player copy contains "${text.match(term)?.[0]}"`,
            );
        }
        const normalized = text.replace(/\s+/g, " ").trim().toLowerCase();
        if (normalized.length >= 100) {
          const owners = longCopyOwners.get(normalized) ?? [];
          owners.push(`${key}.${field}`);
          longCopyOwners.set(normalized, owners);
        }
      }
    }

    for (const [field, value] of Object.entries(entry)) {
      if (
        !/image/i.test(field) ||
        typeof value !== "string" ||
        !value.startsWith("/")
      )
        continue;
      try {
        await access(path.join(root, "public", value.replace(/^\//, "")));
      } catch {
        addError(`${key}.${field}: missing public file ${value}`);
      }
    }
  }
}

const packSlugs = new Set(data.packs.map((entry) => entry.slug));
const cardSlugs = new Set(data.cards.map((entry) => entry.slug));
const mutationSlugs = new Set(data.mutations.map((entry) => entry.slug));
for (const card of data.cards) {
  if (card.packSlug && !packSlugs.has(card.packSlug))
    addError(`cards:${card.slug}: unknown pack ${card.packSlug}`);
  for (const slug of card.mutationSlugs ?? []) {
    if (!mutationSlugs.has(slug))
      addError(`cards:${card.slug}: unknown mutation ${slug}`);
  }
}
for (const pack of data.packs) {
  for (const slug of pack.cardSlugs ?? []) {
    if (!cardSlugs.has(slug))
      addError(`packs:${pack.slug}: unknown card ${slug}`);
  }
}

const expectedGuideSlugs = new Set([
  "beginner-guide",
  "codes-redemption-guide",
]);
if (data.guides.length !== expectedGuideSlugs.size) {
  addError(
    `guides: expected ${expectedGuideSlugs.size} published guides, found ${data.guides.length}`,
  );
}
for (const guide of data.guides) {
  if (!expectedGuideSlugs.has(guide.slug))
    addError(`guides:${guide.slug}: guide is not in the initial release set`);
  if (guide.sections.length < 6)
    addError(`guides:${guide.slug}: fewer than 6 complete sections`);
  if (guide.tips.length < 5 || guide.mistakes.length < 5)
    addError(`guides:${guide.slug}: tips or mistakes list is incomplete`);
  if (guide.faq.length < 5)
    addError(`guides:${guide.slug}: fewer than 5 direct answers`);
  for (const [index, section] of guide.sections.entries()) {
    if (!section.image || !section.imageAlt)
      addError(
        `guides:${guide.slug}: section ${index + 1} needs an image and descriptive alt text`,
      );
  }
  const guideWords = strings([
    guide.summary,
    guide.sections,
    guide.tips,
    guide.mistakes,
    guide.faq,
  ])
    .join(" ")
    .match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g)?.length;
  if ((guideWords ?? 0) < 500)
    addError(`guides:${guide.slug}: only ${guideWords ?? 0} content words`);
}

for (const owners of longCopyOwners.values()) {
  if (owners.length >= 3)
    addError(
      `repeated player copy (${owners.length} uses): ${owners.join(", ")}`,
    );
}

const pageLinks = Object.values(data)
  .flat()
  .filter((entry) => entry?.source?.url).length;
const missingCardNumbers = data.cards.filter(
  (entry) => entry.baseIncome === null || entry.tradeValue === null,
).length;

console.log(`Collections checked: ${files.length}`);
console.log(
  `Game entries checked: ${Object.values(data).reduce((total, records) => total + records.length, 0)}`,
);
console.log(`Dated page links checked: ${pageLinks}`);
console.log(
  `Cards retaining unknown income or trade values: ${missingCardNumbers}/${data.cards.length}`,
);
console.log(`Content errors: ${errors.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
