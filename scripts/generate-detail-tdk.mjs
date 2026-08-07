import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src", "data", "game");

const guideTopics = {
  "beginner-guide": {
    title: "Beginner Tips - Spin a Soccer Card Beginner Guide",
    description:
      "Beginner tips lead this Spin a Soccer Card Beginner Guide through packs, Shop Odds, Index sorting, income upgrades, banking, rebirth preparation and codes.",
    primary: "Beginner Tips",
    keywords: ["Spin a Soccer Card Beginner Guide", "Spin a Soccer Card how to play"],
  },
  "codes-redemption-guide": {
    title: "Code Redemption - Spin a Soccer Card Codes Guide",
    description:
      "Code redemption leads this Spin a Soccer Card Codes Guide through Shop entry, exact strings, redeem checks, conflicting status lists, rewards and mistakes.",
    primary: "Code Redemption",
    keywords: ["Spin a Soccer Card Codes Guide", "how to redeem Spin a Soccer Card codes"],
  },
};

const updateTopics = {
  "official-live-snapshot-august-2026": "Official Live Status",
  "wish-and-hero-crystal": "HERO-CRYSTAL",
  "blackmoon-return-update": "Blackmoon & Rebirth 19",
  "official-trade-world": "Official Trade World",
  "update-8-admin-abuse": "Update 8 & Admin Event",
    "july-4-summer-admin-event": "July 4 Summer Event",
  "scarlet-pack-and-blaze-storm": "Scarlet & BLAZE-STORM",
  "nightmare-late-game-snapshot": "Lucid & Nightmare",
  "trade-token-market-snapshot": "Trade Token Market",
};

function seo(title, description, primaryKeyword, extraKeywords) {
  return {
    title,
    description,
    keywords: [primaryKeyword, ...extraKeywords],
  };
}

const builders = {
  cards: (item) => {
    const primary = `${item.name} Card Details`;
    return seo(
      `${primary} - Spin a Soccer Card Details`,
      `${primary} list rating, position, rarity, pack, income, availability, mutations and status in this Spin a Soccer Card Details guide page.`,
      primary,
      ["Spin a Soccer Card Details", `Spin a Soccer Card ${item.name} details`, `${item.name} rating`],
    );
  },
  packs: (item) => {
    const primary = `${item.name} Details`;
    return seo(
      `${primary} - Spin a Soccer Card Packs`,
      `${primary} cover cost, stock, unlocks, known cards, availability and bundles in this Spin a Soccer Card Packs guide with a checked game date.`,
      primary,
      ["Spin a Soccer Card Packs", `Spin a Soccer Card ${item.name}`, `${item.name} cards`],
    );
  },
  guides: (item) => {
    const topic = guideTopics[item.slug];
    if (!topic) throw new Error(`Missing guide TDK topic: ${item.slug}`);
    return seo(topic.title, topic.description, topic.primary, topic.keywords);
  },
  mutations: (item) => {
    const primary = `${item.name} Mutation Details`;
    return seo(
      `${primary} - Spin a Soccer Card`,
      `${primary} cover effect, multiplier, linked cards, availability and status in this Spin a Soccer Card mutation guide with updated game date.`,
      primary,
      ["Spin a Soccer Card Mutation Details", `Spin a Soccer Card ${item.name} mutation`, `${item.name} multiplier`],
    );
  },
  rarities: (item) => {
    const primary = `${item.name} Rarity Details`;
    return seo(
      `${primary} - Spin a Soccer Card`,
      `${primary} list cards, packs, classification and availability in this Spin a Soccer Card rarity guide, including meaning and checked date.`,
      primary,
      ["Spin a Soccer Card Rarity Details", `Spin a Soccer Card ${item.name} cards`, `${item.name} cards`],
    );
  },
  rebirths: (item) => {
    const primary = `Rebirth ${item.level} Requirements`;
    return seo(
      `${primary} - Spin a Soccer Card Guide`,
      `${primary} cover cards, cash, unlocks, reset warnings, strategy and status in this Spin a Soccer Card guide with a last checked game date.`,
      primary,
      ["Spin a Soccer Card rebirth requirements", `Spin a Soccer Card Rebirth ${item.level}`, `Rebirth ${item.level} unlocks`],
    );
  },
  updates: (item) => {
    const topic = updateTopics[item.slug];
    if (!topic) throw new Error(`Missing update TDK topic: ${item.slug}`);
    const primary = `${topic} Details`;
    return seo(
      `${primary} - Spin a Soccer Card Update`,
      `${primary} cover dated card, pack, code and event changes, player impact and version notes in this Spin a Soccer Card update record.`,
      primary,
      ["Spin a Soccer Card Update", `${topic} Update`, item.title],
    );
  },
};

for (const [collection, buildSeo] of Object.entries(builders)) {
  const file = path.join(dataDir, `${collection}.json`);
  const records = JSON.parse(await readFile(file, "utf8"));
  const next = records.map((record) => ({ ...record, seo: buildSeo(record) }));
  await writeFile(file, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  console.log(`${collection}: ${next.length} TDK records`);
}
