import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dataDir = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "src",
  "data",
  "game",
);

async function load(name) {
  return JSON.parse(await readFile(path.join(dataDir, name), "utf8"));
}

async function save(name, value) {
  await writeFile(
    path.join(dataDir, name),
    `${JSON.stringify(value, null, 2)}\n`,
    "utf8",
  );
}

const cards = await load("cards.json");
const cardFixes = {
  "neymar-rebirth-report": {
    rarity: "Legendary",
    description:
      "Multiple progression guides list Neymar as a Legendary Shadow/Toxic-era card used in older Rebirth 3 checklists. The current return-build Index was not shown naming Neymar in the checked footage.",
    howToGet:
      "Historically associated with Shadow / Toxic pack progression. Confirm the live Rebirth panel and Index before keeping or selling cards for this name.",
  },
  "allison-rebirth-report": {
    rarity: "Legendary",
    imageAlt:
      "Historical Rebirth 3 panel used as context for older Legendary card requirements",
    description:
      "Allison is repeatedly named with Neymar in older Rebirth 3 Legendary checklists tied to Shadow/Toxic packs. No dedicated current pull frame was captured for this page.",
    howToGet:
      "Use the live Rebirth requirement list. Older Allison rows are retained only as historical progression context.",
  },
  "mbappe-rebirth-report": {
    rarity: "Mythical",
    imageAlt:
      "Historical Rebirth 4 panel used as context for older Mythical card requirements",
    description:
      "Community rebirth tables commonly list Mbappe among Mythical Corrupted/Infernal cards for older Rebirth 4 checklists. Current fictionalized naming may differ.",
    howToGet:
      "Guides place this name with Corrupted / Infernal era packs. Verify the live panel names before grinding duplicates.",
  },
  "haaland-rebirth-report": {
    rarity: "Mythical",
    imageAlt:
      "Historical Rebirth 4 panel used as context for older Mythical card requirements",
    description:
      "Haaland appears with Mbappe and Vinicius Jr. in many older Rebirth 4 Mythical lists. This entry records the community listing, not a current Index guarantee.",
    howToGet:
      "Historically tied to Corrupted / Infernal progression. Recheck live card names after the Blackmoon return naming changes.",
  },
  "turnly-endgame-report": {
    fullName: "Endgame Turnly community listing",
    rarity: "Omega",
    imageAlt:
      "Current Alpha Pack shop panel used as context for late-game card discussions",
    description:
      "Turnly is frequently named by tier-list sites as a top Omega/Alpha-era earner. No official API roster and no unique pull frame on this page confirm the current spelling, rating or income.",
    howToGet:
      "Guides place this name with Omega / Alpha pack discussions. Use live Odds and Index panels rather than tier-list certainty.",
  },
  "abilian-endgame-report": {
    fullName: "Endgame Abilian community listing",
    rarity: "Omega",
    imageAlt:
      "Current Alpha Pack shop panel used as context for late-game card discussions",
    description:
      "Abilian is commonly paired with Turnly in endgame Omega/Alpha discussions. This page stores the community listing and leaves rating, income and obtainability blank.",
    howToGet:
      "Guides place this name with late-game pack targets. Confirm the exact live name before trading or rebirthing around this target.",
  },
};

for (const card of cards) {
  if (cardFixes[card.slug]) Object.assign(card, cardFixes[card.slug]);
}
await save("cards.json", cards);

const packs = await load("packs.json");
for (const pack of packs) {
  if (pack.slug === "champions-pack") {
    pack.description =
      "Champions Pack is widely listed as a July 5-era premium pack tied to the Summer Tournament period. It is stored as a historical community listing, not as a proven current Shop row after the Blackmoon return update.";
  }
}
await save("packs.json", packs);

const mutations = await load("mutations.json");
for (const mutation of mutations) {
  if (mutation.slug === "drowned") {
    mutation.effect =
      "Summer Part 2 water-themed mutation named by multiple event trackers; exact income formula was not captured in the checked gameplay frames.";
    mutation.description =
      "Drowned is repeatedly listed with the Summer Part 2 / Lucid–Nightmare event window alongside Seashell variants. This site records the name and event context from community guides, without inventing a multiplier.";
  }
}
await save("mutations.json", mutations);

const rebirths = await load("rebirths.json");
for (const rebirth of rebirths) {
  if (rebirth.slug === "rebirth-18") {
    rebirth.title = "Rebirth 18 - Summer Part 2 Listing";
    rebirth.unlocks = [
      "Listed during Summer Part 2 as an endgame progression step",
      "Often paired by guides with Lucid / Nightmare era content",
      "Specific current unlock icons remain untranscribed",
    ];
  }
}
await save("rebirths.json", rebirths);

const guides = await load("guides.json");
for (const guide of guides) {
  if (guide.slug === "codes-redemption-guide") {
    guide.summary =
      "Redeem through the live Shop field, note the commonly listed group and Rebirth 2 gate, and separate gameplay sightings from conflicting third-party active lists.";
    guide.sections = guide.sections.map((section) => {
      if (/unlock gate/i.test(section.heading)) {
        return {
          heading: "Check the commonly listed unlock gate",
          body: "Independent August 2026 code guides consistently say players must join the Pixellar Studios Roblox group and complete at least 2 Rebirths before the Shop Codes UI accepts redemptions. This wiki records that as a community consensus note; the live UI response remains the final authority.",
        };
      }
      return section;
    });
    guide.faq = [
      {
        question: "Do I need the Pixellar group and 2 Rebirths?",
        answer:
          "Multiple current code guides say yes. If the Codes field rejects a correctly typed code, join the group, confirm your rebirth count, then retry before assuming the code is dead.",
      },
      {
        question: "Is HERO-CRYSTAL definitely active?",
        answer:
          "It was visible in the redemption field on August 2, and August guides still list it with a packs-and-spins reward. This page still does not treat a field sighting alone as a permanent active guarantee.",
      },
      {
        question: "Why do trackers disagree on OWL-HAPPY and BIGUPDATECOMING?",
        answer:
          "As of August 6, Beebom marks several late-July codes expired while Nerdschalk still lists some as working. Conflicting codes stay marked for in-game testing here until a live accept or reject result is captured.",
      },
    ];
  }
  if (guide.slug === "mutation-guide") {
    guide.sections = guide.sections.map((section) => {
      if (/drowned/i.test(section.body) || /event mutations/i.test(section.heading)) {
        return {
          heading: "Record event mutations separately",
          body: "Drowned appears in Summer Part 2 guides with Lucid/Nightmare content. Keep event-only names dated and do not invent multipliers when the Index detail text is missing.",
        };
      }
      return section;
    });
  }
}
await save("guides.json", guides);

const updates = await load("updates.json");
for (const update of updates) {
  if (update.slug === "nightmare-late-game-snapshot") {
    update.newPacks =
      "Lucid and Nightmare; Champions Pack separately listed for the same Summer window";
    update.details = update.details.map((line) =>
      /Drowned|Champions|Rebirth 18/i.test(line)
        ? "Summer Part 2 guides also name Champions Pack, Drowned mutation and Rebirth 18 around this late-July window; those three records are stored separately with community-listing status."
        : line,
    );
  }
}
await save("updates.json", updates);

const codes = await load("codes.json");
const reqPatches = {
  "DRAGON-PRIME":
    "Join the Pixellar Studios group and finish at least 2 Rebirths if your Shop Codes UI is locked. Beebom marks this expired while Nerdschalk still lists it working.",
  "OWL-HAPPY":
    "Join the Pixellar Studios group and finish at least 2 Rebirths if Codes stay locked. Beebom marks this expired while Nerdschalk still lists it working.",
  BIGUPDATECOMING:
    "Join the Pixellar Studios group and finish at least 2 Rebirths before testing weekly codes. Beebom marks this expired while Nerdschalk still lists it working.",
  "HERO-CRYSTAL":
    "Join the Pixellar Studios Roblox group and complete at least 2 Rebirths before relying on the Shop Codes field. Confirm any gate shown in your live session.",
  WEAREBACK:
    "Many August guides say the Pixellar Studios group plus 2 Rebirths unlock Codes. Confirm the live Shop response before assuming a failed redeem means the code expired.",
};
for (const code of codes) {
  if (reqPatches[code.code]) code.requirement = reqPatches[code.code];
}
await save("codes.json", codes);

console.log("player-copy cleanup done");
