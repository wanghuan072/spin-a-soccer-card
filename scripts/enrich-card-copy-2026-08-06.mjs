import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "src",
  "data",
  "game",
  "cards.json",
);

const cards = JSON.parse(await readFile(file, "utf8"));

const enrich = {
  "rovaso-2026": {
    description:
      "Rovaso is a 115-rated showcase card featured in official Roblox promo art for Spin a Soccer Card. Players treat high 110+ ratings as endgame plot anchors—compare its live Index income with your current best slot before chasing Robux packs.",
    howToGet:
      "Watch the live Index, Shop Odds and Spin Wheel preview for Rovaso. Official art proves the name and rating; open Cosmic, Ordan or Alpha when those rows show matching high tiers.",
  },
  "rocaino-2026": {
    description:
      "Rocaino sits beside Rovaso in official 115-rated promo art. Use it as a target benchmark when sorting your Index by rating—if a mutated mid-tier card already out-earns a clean 115, keep the mutation.",
    howToGet:
      "Search Rocaino in the Index after each update. Pair Shop farming with weekly codes so you can open more high-tier packs without draining Cash.",
  },
  "varmolen": {
    description:
      "Varmolen is a 107 Netherlands ST pulled from a Transcendent Pack with a Nether rarity label and Misprint mutation. Mutated mid-100s cards are strong Bank candidates before rebirth because the Misprint stack can beat cleaner lower pulls.",
    howToGet:
      "Open Transcendent Packs from the Welcome Back Calendar or any live reward that grants them. After the pull, equip Varmolen if it beats your weakest plot slot, then Bank it before the next rebirth.",
  },
  "alverton": {
    description:
      "Alverton is a 109 Brazil GK labeled Exclusive with Frozen mutation from the same Transcendent opening window. Goalkeeper slots still print Cash—Frozen copies are worth keeping when they raise total EPS.",
    howToGet:
      "Target Transcendent or late Shop packs that list Exclusive pulls. Compare Alverton’s plot income with other GKs before selling duplicates.",
  },
  "wildenz": {
    description:
      "Wildenz appeared on a live plot with extremely high displayed income in an August trading session. Treat that number as a build-specific ceiling example—your rebirth multipliers and mutations will change the exact figure.",
    howToGet:
      "Chase top-tier packs and mutation stacks rather than a single name. Compare the dated value guide before trading Trade Tokens for a Wildenz-level earner.",
  },
  "messi-lunar-rainbow-june-2026": {
    description:
      "A June plot showed Lunar Messi at rating 100 with Rainbow mutation earning $67.5M per second in that build. Messi remains one of the most searched Spin Wheel exclusives—always confirm the live Wheel preview before spending spins.",
    howToGet:
      "Check the Spin Wheel reward preview and redeem codes that grant free spins. Older guides mentioning 0.1% rates may not match today’s pool, so trust the in-game preview first.",
  },
  "ronaldo-legacy-june-2026": {
    description:
      "Ronaldo is a long-running exclusive target for collectors and traders. Older showcases prove the card existed; current builds may rename or rotate exclusives, so verify the Index and Wheel before grinding.",
    howToGet:
      "Open the Spin Wheel preview and Index search for Ronaldo after each update. Free spins from codes are the cheapest way to chase exclusives without Cash packs.",
  },
  "neymar-rebirth-report": {
    description:
      "Neymar shows up in many Rebirth 3 Legendary checklists tied to Shadow and Toxic packs. Players farming early rebirths still look for this name—or the live panel’s current Legendary substitutes—before resetting.",
    howToGet:
      "Progress to Rebirth 2 packs (Shadow / Toxic era), open until the live Rebirth 3 panel’s Legendary slots are filled, then Bank your best earner and reset.",
  },
  "mbappe-rebirth-report": {
    description:
      "Mbappe is a common Mythical requirement on older Rebirth 4 lists with Haaland and Vinicius Jr. Use the live Rebirth panel names if they differ after the Blackmoon return naming pass.",
    howToGet:
      "Unlock Corrupted / Infernal style packs after Rebirth 3, farm the Mythical cards your panel asks for, and avoid selling the last copy needed for the reset.",
  },
  "turnly-endgame-report": {
    description:
      "Turnly is widely called out as a top Omega / Alpha earner for late-game plots. Prioritize mutation stacks on Turnly-level cards—Divine or Venomous copies often define endgame EPS.",
    howToGet:
      "Reach the late Shop tiers (Omega / Alpha rows), open with Odds checked, and Bank the best Turnly mutation before high rebirths.",
  },
  "abilian-endgame-report": {
    description:
      "Abilian is paired with Turnly in most endgame tier talks. If both appear in your Index, keep the higher EPS mutation and trade or sell clean duplicates for Cash.",
    howToGet:
      "Farm Alpha / Omega pack rows after the required rebirths. Compare Abilian against Turnly and your mutated mid-tier keepers before spending Trade Tokens.",
  },
};

for (const card of cards) {
  const patch = enrich[card.slug];
  if (patch) Object.assign(card, patch);
}

await writeFile(file, `${JSON.stringify(cards, null, 2)}\n`, "utf8");
console.log("card copy enriched");
