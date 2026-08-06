import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dataDir = resolve(root, "src/data/game");

const publicFields = {
  cards: [
    "name",
    "fullName",
    "rarity",
    "position",
    "description",
    "howToGet",
    "addedInUpdate",
  ],
  packs: ["name", "unlockRequirement", "highestRarity", "description"],
  codes: ["code", "reward", "requirement"],
  guides: [
    "title",
    "category",
    "summary",
    "readTime",
    "sections",
    "tips",
    "mistakes",
    "faq",
  ],
  updates: [
    "title",
    "version",
    "eventStatus",
    "newCards",
    "newPacks",
    "codeChanges",
    "balanceChanges",
    "summary",
    "details",
  ],
  mutations: ["name", "effect", "multiplier", "description"],
  rarities: ["name", "description", "effect"],
  rebirths: ["title", "requirement", "unlocks", "strategy"],
  gamepasses: ["name", "description"],
  "trade-observations": ["cardName", "variant", "interpretation"],
};

const phraseReplacements = [
  [/Official Roblox Live dated view/gi, "Official Roblox Live Status"],
  [
    /Wish Station and HERO-CRYSTAL game check/gi,
    "Wish Station and HERO-CRYSTAL",
  ],
  [/Update 8 and Admin Event dated view/gi, "Update 8 and Admin Event"],
  [/Summer Update 16 dated view/gi, "Summer Update 16"],
  [
    /Lucid and Nightmare Late-Game dated view/gi,
    "Lucid and Nightmare Late-Game",
  ],
  [/Trade Token Market dated view/gi, "Trade Token Market"],
  [
    /Mutation Guide: Misprint and Frozen game details/gi,
    "Mutation Guide: Misprint, Frozen and Card Effects",
  ],
  [
    /Codes Guide: Verify Before Calling a Code Active/gi,
    "Codes Guide: Check Before Calling a Code Active",
  ],
  [
    /How to Get Messi: Historical Record and Current Check/gi,
    "How to Get Messi: Older Version and Current Check",
  ],
  [
    /How to Get Ronaldo: Historical Record and Current Check/gi,
    "How to Get Ronaldo: Older Version and Current Check",
  ],
  [/Spin Wheel Pool check Guide/gi, "Spin Wheel Pool Guide"],
  [/Gameplay game check/gi, "August gameplay"],
  [/Trade Token market period/gi, "Trade Token Market"],
  [/Rebirth 2 older version/gi, "Rebirth 2 - Older Game Build"],
  [/Rebirth 3 older version/gi, "Rebirth 3 - Older Game Build"],
  [
    /Rebirth 5 Historical and Return dated view/gi,
    "Rebirth 5 - Version Comparison",
  ],
  [/The checked dated view/gi, "The API check"],
  [/time-specific game checks/gi, "time-specific counts"],
  [/versioned dated view/gi, "dated game build"],
  [/dated late-game economy dated view/gi, "dated late-game economy view"],
  [/dated rotation dated view/gi, "dated rotation"],
  [/historical Index dated view/gi, "historical Index view"],
  [/during this audit/gi, "in the available footage"],
  [/sources checked for this audit/gi, "videos checked for this page"],
  [/This audit/gi, "This page"],
  [
    /game checks rather than fixed prices/gi,
    "player deals rather than fixed prices",
  ],
  [/community game check or estimate/gi, "community estimate"],
  [/sparse game checks as a log/gi, "sparse trades in a list"],
  [/Date every game check/gi, "Add a date to every trade"],
  [/Date the game check/gi, "Add the game date"],
  [/official record/gi, "official Roblox page"],
  [/The frame verifies/gi, "The frame shows"],
  [/verifies the/gi, "shows the"],
  [/Historically seen from/gi, "Seen in older footage from"],
  [/Historically seen in/gi, "Seen in an older"],
  [/Historical Scarlet Pack game check/gi, "Older Scarlet Pack footage"],
  [/historical income game check/gi, "older income example"],
  [/game check only/gi, "older footage only"],
  [
    /useful game details that a reward exists/gi,
    "useful because it shows that a reward exists",
  ],
  [/\brecord it\b/gi, "note it"],
  [/\brecord them\b/gi, "note them"],
  [/\brecord your\b/gi, "note your"],
  [/\brecord each\b/gi, "note each"],
  [/\brecord all\b/gi, "note all"],
  [/\brecord which\b/gi, "note which"],
  [/\bRecord (?=[a-z])/g, "Note "],
  [
    /\brecord (?=(?:the|a|both|how|results|new|exact|odds|a recipe)\b)/gi,
    "note ",
  ],
  [/This verifies/gi, "This shows"],
  [/directly verified here/gi, "shown clearly here"],
  [/verified public evidence set/gi, "public game-details set"],
  [/Video verified means/gi, "Seen in the code field means"],
  [/Reported means/gi, "Try in game means"],
  [/stronger evidence/gi, "more reliable information"],
  [/without evidence/gi, "without a clear game check"],
  [/no evidence/gi, "missing information"],
  [/an evidence gap/gi, "missing information"],
  [/evidence gap/gi, "missing information"],
  [/evidence limits/gi, "what is still unknown"],
  [/source and card/gi, "pack and card"],
  [/source pack/gi, "pack"],
  [/source and odds/gi, "pack and odds"],
  [/by source and version/gi, "by date and game version"],
  [/high-density source/gi, "detailed video"],
  [/the API is the source for/gi, "the API provides"],
  [/research snapshot/gi, "dated check"],
  [/API snapshot/gi, "API check"],
  [/historical snapshot/gi, "older version"],
  [/market snapshot/gi, "market period"],
  [/version snapshot/gi, "dated version"],
  [/this snapshot/gi, "this dated view"],
  [/current evidence/gi, "current game details"],
  [/historical evidence/gi, "older game details"],
  [/Shop evidence/gi, "Shop details"],
  [/opening evidence/gi, "opening details"],
  [/evidence date/gi, "game date"],
  [/current-source/gi, "current-game"],
  [/checked live sources did not show/gi, "current game checks did not show"],
  [/the checked sources/gi, "the current game checks"],
  [/current sources checked/gi, "current game checks"],
  [/\bsources\b/gi, "pages"],
  [/\bdated view\b/gi, "game version"],
  [/^seen\b/g, "Seen"],
];

const wordReplacements = [
  [/\bverified\b/gi, "confirmed"],
  [/\bverification\b/gi, "check"],
  [/\breported\b/gi, "listed"],
  [/\bobserved\b/gi, "seen"],
  [/\bobservation\b/gi, "game check"],
  [/\bobservations\b/gi, "game checks"],
  [/\bsnapshot\b/gi, "dated view"],
  [/\bevidence\b/gi, "game details"],
  [/\bresearch\b/gi, "game check"],
  [/\bmethodology\b/gi, "approach"],
  [/\bcitation\b/gi, "link"],
  [/\bsource\b/gi, "page"],
  [/\bverifies\b/gi, "shows"],
  [/\bverify\b/gi, "check"],
  [/\baudit\b/gi, "review"],
  [/\brecords\b/gi, "entries"],
  [/\brecord\b/gi, "entry"],
];

function cleanString(value) {
  let next = value;
  for (const [pattern, replacement] of phraseReplacements)
    next = next.replace(pattern, replacement);
  for (const [pattern, replacement] of wordReplacements)
    next = next.replace(pattern, replacement);
  next = next.replace(/^seen\b/, "Seen");
  return next;
}

function cleanValue(value) {
  if (typeof value === "string") return cleanString(value);
  if (Array.isArray(value)) return value.map(cleanValue);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, cleanValue(child)]),
    );
  return value;
}

for (const [collection, fields] of Object.entries(publicFields)) {
  const file = resolve(dataDir, `${collection}.json`);
  const rows = JSON.parse(await readFile(file, "utf8"));
  const next = rows.map((row) => {
    const copy = { ...row };
    for (const field of fields) copy[field] = cleanValue(copy[field]);
    return copy;
  });
  await writeFile(file, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  console.log(`${collection}: ${next.length} player-copy entries cleaned`);
}
