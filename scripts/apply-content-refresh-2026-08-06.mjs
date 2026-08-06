/**
 * One-shot content refresh for 2026-08-06 audit findings.
 * Evidence policy: do not upgrade conflicting third-party claims to active/verified.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src", "data", "game");
const TODAY = "2026-08-06";

async function readJson(name) {
  return JSON.parse(await readFile(path.join(dataDir, name), "utf8"));
}

async function writeJson(name, value) {
  await writeFile(
    path.join(dataDir, name),
    `${JSON.stringify(value, null, 2)}\n`,
    "utf8",
  );
}

function seoCard(name) {
  const primary = `${name} Card Details`;
  return {
    title: `${primary} - Spin a Soccer Card Details`,
    description: `${primary} list rating, position, rarity, pack, income, availability, mutations and status in this Spin a Soccer Card Details guide page.`,
    keywords: [
      primary,
      "Spin a Soccer Card Details",
      `Spin a Soccer Card ${name} details`,
      `${name} rating`,
    ],
  };
}

function seoPack(name) {
  const primary = `${name} Details`;
  return {
    title: `${primary} - Spin a Soccer Card Packs`,
    description: `${primary} cover cost, stock, unlocks, known cards, availability and bundles in this Spin a Soccer Card Packs guide with a checked game date.`,
    keywords: [
      primary,
      "Spin a Soccer Card Packs",
      `Spin a Soccer Card ${name}`,
      `${name} cards`,
    ],
  };
}

function seoMutation(name) {
  const primary = `${name} Mutation Details`;
  return {
    title: `${primary} - Spin a Soccer Card`,
    description: `${primary} cover effect, multiplier, linked cards, availability and status in this Spin a Soccer Card mutation guide with updated game date.`,
    keywords: [
      primary,
      "Spin a Soccer Card Mutation Details",
      `Spin a Soccer Card ${name} mutation`,
      `${name} multiplier`,
    ],
  };
}

function seoRebirth(level) {
  const primary = `Rebirth ${level} Requirements`;
  return {
    title: `${primary} - Spin a Soccer Card Guide`,
    description: `${primary} cover cards, cash, unlocks, reset warnings, strategy and status in this Spin a Soccer Card guide with a last checked game date.`,
    keywords: [
      primary,
      "Spin a Soccer Card rebirth requirements",
      `Spin a Soccer Card Rebirth ${level}`,
      `Rebirth ${level} unlocks`,
    ],
  };
}

const commonCodeRequirement =
  "Multiple August 2026 code guides report joining the Pixellar Studios Roblox group and completing at least 2 Rebirths before the Shop Codes field accepts redemptions. Confirm any gate shown in your live session.";

const expiredArchiveSource = {
  label: "August 2026 expired-code archives (Beebom / Nerdschalk)",
  url: "https://beebom.com/spin-a-soccer-card-codes/",
  observedAt: TODAY,
  note: "Archived from multi-source expired lists; not a live redemption test.",
};

async function refreshCodes() {
  const codes = await readJson("codes.json");
  const byCode = new Map(codes.map((entry) => [entry.code, entry]));

  const patchExisting = {
    "HERO-CRYSTAL": {
      reward:
        "Listed as 2 packs at rebirth level and 3 extra spins by August code guides; original Aug 2 clip showed the field only, not the reward toast",
      status: "video-verified",
      requirement: commonCodeRequirement,
      lastVerifiedAt: TODAY,
      sourceNote:
        "Exact string was visible in the live Codes field on Aug 2. Beebom (Aug 4) and Nerdschalk both list the same reward text, but acceptance and toast were not re-captured in this audit.",
    },
    WEAREBACK: {
      reward:
        "Reward reports conflict: Beebom lists 2 packs + 3 spins; Nerdschalk lists 3 Transcendent packs + 3 spins. Original July 30 clip showed the field only",
      status: "video-verified",
      requirement: commonCodeRequirement,
      lastVerifiedAt: TODAY,
      sourceNote:
        "Exact string was visible after the return update. Reward wording still conflicts across August trackers, so neither reward string is treated as confirmed.",
    },
    "DRAGON-PRIME": {
      status: "reported",
      requirement: `${commonCodeRequirement} Beebom marks expired while Nerdschalk still lists working.`,
      lastVerifiedAt: TODAY,
      sourceNote:
        "August tracker conflict remains: Beebom expired archive vs Nerdschalk working list. Kept as reported until a live accept/reject result is captured.",
    },
    "OWL-HAPPY": {
      status: "reported",
      requirement: `${commonCodeRequirement} Beebom marks expired while Nerdschalk still lists working.`,
      lastVerifiedAt: TODAY,
      sourceNote:
        "August tracker conflict remains: Beebom expired archive vs Nerdschalk working list. Kept as reported until a live accept/reject result is captured.",
    },
    BIGUPDATECOMING: {
      status: "reported",
      requirement: `${commonCodeRequirement} Beebom marks expired while Nerdschalk still lists working.`,
      lastVerifiedAt: TODAY,
      sourceNote:
        "August tracker conflict remains on current acceptance. Reward text is still widely repeated, but live status is unresolved.",
    },
    "BLAZE-STORM": {
      status: "expired",
      requirement: "Archive only; historical July redemption is retained separately from current status",
      lastVerifiedAt: TODAY,
      sourceNote:
        "Successful July 5 redemption remains documented. Current August trackers consistently place the string in expired archives.",
    },
    "PRIME-TURBO": {
      status: "expired",
      requirement: "Archive only",
      lastVerifiedAt: TODAY,
      sourceNote: "August expired archives now agree; previously check-required on RobloxDen.",
    },
    "EPIC-LION": {
      status: "expired",
      requirement: "Archive only",
      lastVerifiedAt: TODAY,
      sourceNote: "August expired archives now agree; previously check-required on RobloxDen.",
    },
    "PHOENIX-MYTHIC": {
      status: "expired",
      requirement: "Archive only",
      lastVerifiedAt: TODAY,
      sourceNote: "August expired archives now agree across the checked public trackers.",
    },
    "COMET-SHARK": {
      status: "expired",
      requirement: "Archive only",
      lastVerifiedAt: TODAY,
      sourceNote: "August expired archives now agree across the checked public trackers.",
    },
    "RAVEN-COMET": {
      status: "expired",
      requirement: "Archive only",
      lastVerifiedAt: TODAY,
      sourceNote:
        "Late-July reported weekly code. It no longer appears on August active lists and is archived until a fresh live hit.",
    },
  };

  for (const [code, patch] of Object.entries(patchExisting)) {
    const entry = byCode.get(code);
    if (!entry) throw new Error(`Missing expected code: ${code}`);
    Object.assign(entry, patch);
  }

  const missingExpired = [
    ["TOURNAMENTS50", "Historical tournament reward not confirmed"],
    ["APRILDAY2", "Historical April event reward not confirmed"],
    ["APRILDAY3", "Historical April event reward not confirmed"],
    ["RUBY-PRIME", "Historical reward not confirmed"],
    ["TIGER-MEGA", "Historical reward not confirmed"],
    ["CHAMP-CRYSTAL", "Historical reward not confirmed"],
    ["RAVEN-OMEGA", "Historical reward not confirmed"],
    ["MOON-STRIKER", "Historical reward not confirmed"],
    ["GOLDEN-BRONZE", "Historical reward not confirmed"],
    ["release", "Historical launch-era reward not confirmed"],
    ["CHAMP-LEGEND", "Historical reward not confirmed"],
    ["GOLDEN-SHADOW", "Historical reward not confirmed"],
    ["MYTHIC-CRYSTAL", "Historical reward not confirmed"],
    ["FOX-SUPER", "Historical reward not confirmed"],
    ["FROZEN-DRAGON", "Historical reward not confirmed"],
  ];

  const images = [
    "/images/codes/code-field.webp",
    "/images/codes/code-menu.webp",
    "/images/codes/code-redemption.webp",
    "/images/research/codes-hero.webp",
    "/images/gameplay/shop-overlay.webp",
  ];

  for (const [index, [code, reward]] of missingExpired.entries()) {
    if (byCode.has(code)) continue;
    const entry = {
      code,
      reward,
      status: "expired",
      requirement: "Archive only",
      addedAt: null,
      lastVerifiedAt: TODAY,
      sourceNote:
        "Added from August 2026 multi-source expired archives to improve historical code coverage. Spelling is preserved as published by those trackers.",
      image: images[index % images.length],
      source: expiredArchiveSource,
    };
    codes.push(entry);
    byCode.set(code, entry);
  }

  await writeJson("codes.json", codes);
  return codes.length;
}

async function refreshMutations() {
  const mutations = await readJson("mutations.json");
  if (!mutations.some((item) => item.slug === "drowned")) {
    mutations.push({
      slug: "drowned",
      name: "Drowned",
      color: "blue",
      effect:
        "Summer Part 2 water-themed mutation reported by multiple event trackers; exact income formula was not captured in the checked gameplay frames.",
      multiplier: "Not shown in the checked footage",
      description:
        "Drowned is repeatedly listed with the Summer Part 2 / Lucid–Nightmare event window alongside Seashell variants. This site records the name and event context as multi-source reported, without inventing a multiplier.",
      verificationStatus: "multi-source-reported",
      source: {
        label: "Summer Part 2 event trackers and late-July pack coverage",
        url: "https://spinasoccercard.wiki/cards/",
        observedAt: TODAY,
        note: "Competitor and event calendars name Drowned; no controlled before/after income display was transcribed for this audit.",
      },
      seo: seoMutation("Drowned"),
    });
  }
  await writeJson("mutations.json", mutations);
  return mutations.length;
}

async function refreshPacks() {
  const packs = await readJson("packs.json");
  if (!packs.some((item) => item.slug === "champions-pack")) {
    const nextId = Math.max(...packs.map((item) => item.id)) + 1;
    packs.push({
      id: nextId,
      slug: "champions-pack",
      name: "Champions Pack",
      image: "/images/video/summer-tournament-shop.webp",
      cost: null,
      currency: null,
      unlockRequirement:
        "Multiple July 2026 guides place Champions as a premium mid/late Shop pack around the Summer Tournament window. Exact Cash/Robux row was not transcribed from the checked footage.",
      rebirthRequirement: null,
      highestRarity: "Not confirmed",
      cardCount: null,
      cardSlugs: [],
      description:
        "Champions Pack is widely reported as a July 5-era premium pack tied to the Summer Tournament period. It is stored as a historical/multi-source record, not as a proven current Shop row after the Blackmoon return update.",
      order: nextId,
      verificationStatus: "multi-source-reported",
      availability: "historical",
      stockPerRefresh: null,
      bundleCost: null,
      bundleQuantity: null,
      source: {
        label: "July 2026 Summer Tournament / Champions Pack reports",
        url: "https://spinasoccercard.wiki/cards/",
        observedAt: TODAY,
        note: "Name and event timing are multi-source; live cost and current availability remain unconfirmed.",
      },
      seo: seoPack("Champions Pack"),
    });
  }
  await writeJson("packs.json", packs);
  return packs.length;
}

async function refreshRebirths() {
  const rebirths = await readJson("rebirths.json");
  if (!rebirths.some((item) => item.slug === "rebirth-18")) {
    rebirths.push({
      slug: "rebirth-18",
      level: 18,
      title: "Rebirth 18 - Summer Part 2 Report",
      requirement:
        "Summer Part 2 trackers describe Rebirth 18 as an endgame extension with high Cash and Divine-card style gates. Exact live Cash and named-card requirements were not captured in the checked footage.",
      unlocks: [
        "Reported during Summer Part 2 as an endgame progression step",
        "Often paired by guides with Lucid / Nightmare era content",
        "Specific current unlock icons remain untranscribed",
      ],
      strategy:
        "Treat Rebirth 18 as a dated event-era milestone until the live panel is photographed. Do not spend cards based only on a competitor table.",
      verificationStatus: "multi-source-reported",
      source: {
        label: "Summer Part 2 event trackers",
        url: "https://abusetime.dev/games/spin-a-soccer-card",
        observedAt: TODAY,
        note: "Event calendars list New Rebirth 18 with Lucid/Nightmare/Drowned; live panel text was not captured here.",
      },
      seo: seoRebirth(18),
    });
  }

  rebirths.sort((a, b) => a.level - b.level);
  await writeJson("rebirths.json", rebirths);
  return rebirths.length;
}

async function refreshCards() {
  const cards = await readJson("cards.json");
  const existing = new Set(cards.map((item) => item.slug));
  let nextId = Math.max(...cards.map((item) => item.id)) + 1;

  const additions = [
    {
      slug: "ronaldo-legacy-june-2026",
      name: "Ronaldo",
      fullName: "Historical Ronaldo showcase card",
      rating: null,
      position: "Not readable",
      rarity: "Historical showcase",
      mutationSlugs: [],
      packSlug: null,
      image: "/images/cards/legacy/ronaldo.webp",
      imageAlt: "Historical creator media showing a Ronaldo soccer card showcase",
      baseIncome: null,
      tradeValue: null,
      previousValue: null,
      valueTrend: "unverified",
      demand: "high",
      obtainable: null,
      limited: null,
      wheelExclusive: null,
      eventExclusive: null,
      addedInUpdate: null,
      description:
        "Older creator media documents a Ronaldo card presentation from a pre-return game era. Current official media and July 30–August 3 gameplay checks did not expose a matching live Index route.",
      howToGet:
        "Treat as a historical record. Open the live Index / Spin Wheel preview before chasing any older Wheel or pack guide.",
      lastVerifiedAt: TODAY,
      verificationStatus: "historical-record",
      sourceNote:
        "Legacy artwork proves a past-era entry only. It does not prove a current 0.1% Wheel rate or pack page.",
      source: {
        label: "Historical creator Ronaldo showcase media",
        url: "https://www.youtube.com/watch?v=-pLq74JMPHo",
        observedAt: "2026-08-04",
        note: "Local legacy crop retained for historical status pages.",
      },
    },
    {
      slug: "neymar-rebirth-report",
      name: "Neymar",
      fullName: "Historical Neymar rebirth-requirement report",
      rating: null,
      position: "Not confirmed",
      rarity: "Legendary (reported)",
      mutationSlugs: [],
      packSlug: "toxic-pack",
      image: "/images/cards/legacy/neymar.webp",
      imageAlt: "Historical Neymar card imagery retained for status comparison",
      baseIncome: null,
      tradeValue: null,
      previousValue: null,
      valueTrend: "unverified",
      demand: "high",
      obtainable: null,
      limited: false,
      wheelExclusive: false,
      eventExclusive: false,
      addedInUpdate: null,
      description:
        "Multiple progression guides list Neymar as a Legendary Shadow/Toxic-era card used in older Rebirth 3 checklists. The current return-build Index was not shown naming Neymar in the checked footage.",
      howToGet:
        "Historically associated with Shadow / Toxic pack progression. Confirm the live Rebirth panel and Index before keeping or selling cards for this name.",
      lastVerifiedAt: TODAY,
      verificationStatus: "multi-source-reported",
      sourceNote:
        "Name and rebirth role come from multi-source guides plus legacy media, not a current pull frame.",
      source: {
        label: "Rebirth / pack progression guide consensus",
        url: "https://spinasoccercard.wiki/cards/",
        observedAt: TODAY,
        note: "Reported Legendary rebirth-requirement card; current obtainability unverified.",
      },
    },
    {
      slug: "allison-rebirth-report",
      name: "Allison",
      fullName: "Historical Allison rebirth-requirement report",
      rating: null,
      position: "Not confirmed",
      rarity: "Legendary (reported)",
      mutationSlugs: [],
      packSlug: "toxic-pack",
      image: "/images/video/rebirth-3-panel.webp",
      imageAlt: "Historical Rebirth 3 panel used as context for reported Legendary requirements",
      baseIncome: null,
      tradeValue: null,
      previousValue: null,
      valueTrend: "unverified",
      demand: "medium",
      obtainable: null,
      limited: false,
      wheelExclusive: false,
      eventExclusive: false,
      addedInUpdate: null,
      description:
        "Allison is repeatedly named with Neymar in older Rebirth 3 Legendary checklists tied to Shadow/Toxic packs. No dedicated current pull frame was captured for this audit.",
      howToGet:
        "Use the live Rebirth requirement list. Older Allison rows are retained only as historical progression context.",
      lastVerifiedAt: TODAY,
      verificationStatus: "multi-source-reported",
      sourceNote: "Multi-source rebirth checklist name without a dated unique card crop.",
      source: {
        label: "Rebirth progression guide consensus",
        url: "https://spinasoccercard.wiki/guide/",
        observedAt: TODAY,
        note: "Reported alongside Neymar for older Rebirth 3 lists.",
      },
    },
    {
      slug: "mbappe-rebirth-report",
      name: "Mbappe",
      fullName: "Historical Mbappe rebirth-requirement report",
      rating: null,
      position: "Not confirmed",
      rarity: "Mythical (reported)",
      mutationSlugs: [],
      packSlug: "corrupted-pack",
      image: "/images/video/rebirth-4-panel.webp",
      imageAlt: "Historical Rebirth 4 panel used as context for reported Mythical requirements",
      baseIncome: null,
      tradeValue: null,
      previousValue: null,
      valueTrend: "unverified",
      demand: "high",
      obtainable: null,
      limited: false,
      wheelExclusive: false,
      eventExclusive: false,
      addedInUpdate: null,
      description:
        "Community rebirth tables commonly list Mbappe among Mythical Corrupted/Infernal cards for older Rebirth 4 checklists. Current fictionalized naming may differ.",
      howToGet:
        "Reported from Corrupted / Infernal era packs. Verify the live panel names before grinding duplicates.",
      lastVerifiedAt: TODAY,
      verificationStatus: "multi-source-reported",
      sourceNote: "Guide consensus only; no unique pull frame retained in this repo.",
      source: {
        label: "Rebirth 4 checklist reports",
        url: "https://spinasoccercard.wiki/cards/",
        observedAt: TODAY,
        note: "Mythical rebirth-requirement report.",
      },
    },
    {
      slug: "haaland-rebirth-report",
      name: "Haaland",
      fullName: "Historical Haaland rebirth-requirement report",
      rating: null,
      position: "Not confirmed",
      rarity: "Mythical (reported)",
      mutationSlugs: [],
      packSlug: "corrupted-pack",
      image: "/images/video/rebirth-4-panel.webp",
      imageAlt: "Historical Rebirth 4 panel used as context for reported Mythical requirements",
      baseIncome: null,
      tradeValue: null,
      previousValue: null,
      valueTrend: "unverified",
      demand: "high",
      obtainable: null,
      limited: false,
      wheelExclusive: false,
      eventExclusive: false,
      addedInUpdate: null,
      description:
        "Haaland appears with Mbappe and Vinicius Jr. in many older Rebirth 4 Mythical lists. This entry records the report, not a current Index guarantee.",
      howToGet:
        "Historically tied to Corrupted / Infernal progression. Recheck live card names after the Blackmoon return naming changes.",
      lastVerifiedAt: TODAY,
      verificationStatus: "multi-source-reported",
      sourceNote: "Multi-source report retained for SEO status clarity and rebirth research.",
      source: {
        label: "Rebirth 4 checklist reports",
        url: "https://earnaldo.com/blog/spin-a-soccer-card-tier-list-2026",
        observedAt: TODAY,
        note: "Tier/rebirth guides still circulate the name.",
      },
    },
    {
      slug: "turnly-endgame-report",
      name: "Turnly",
      fullName: "Reported endgame Turnly card",
      rating: null,
      position: "Not confirmed",
      rarity: "Omega (reported)",
      mutationSlugs: [],
      packSlug: "alpha-pack",
      image: "/images/evidence/pack-alpha.webp",
      imageAlt: "Current Alpha Pack shop evidence used as context for reported endgame cards",
      baseIncome: null,
      tradeValue: null,
      previousValue: null,
      valueTrend: "unverified",
      demand: "high",
      obtainable: null,
      limited: null,
      wheelExclusive: false,
      eventExclusive: false,
      addedInUpdate: null,
      description:
        "Turnly is frequently named by tier-list sites as a top Omega/Alpha-era earner. No official API roster and no unique pull frame in this audit confirm the current spelling, rating or income.",
      howToGet:
        "Reported from Omega / Alpha pack discussions. Use live Odds and Index panels rather than tier-list certainty.",
      lastVerifiedAt: TODAY,
      verificationStatus: "multi-source-reported",
      sourceNote: "High-traffic endgame name retained as reported, not verified income data.",
      source: {
        label: "Community tier-list and pack guides",
        url: "https://earnaldo.com/blog/spin-a-soccer-card-tier-list-2026",
        observedAt: TODAY,
        note: "Reported top standard-pack card.",
      },
    },
    {
      slug: "abilian-endgame-report",
      name: "Abilian",
      fullName: "Reported endgame Abilian card",
      rating: null,
      position: "Not confirmed",
      rarity: "Omega (reported)",
      mutationSlugs: [],
      packSlug: "alpha-pack",
      image: "/images/evidence/pack-alpha.webp",
      imageAlt: "Current Alpha Pack shop evidence used as context for reported endgame cards",
      baseIncome: null,
      tradeValue: null,
      previousValue: null,
      valueTrend: "unverified",
      demand: "high",
      obtainable: null,
      limited: null,
      wheelExclusive: false,
      eventExclusive: false,
      addedInUpdate: null,
      description:
        "Abilian is commonly paired with Turnly in endgame Omega/Alpha discussions. This page stores the community report and leaves rating, income and obtainability blank.",
      howToGet:
        "Reported from late-game pack guides. Confirm the exact live name before trading or rebirthing around this target.",
      lastVerifiedAt: TODAY,
      verificationStatus: "multi-source-reported",
      sourceNote: "Community endgame report without a captured unique card crop.",
      source: {
        label: "Community tier-list and pack guides",
        url: "https://spinasoccercards.wiki/",
        observedAt: TODAY,
        note: "Reported top standard-pack card.",
      },
    },
  ];

  for (const item of additions) {
    if (existing.has(item.slug)) continue;
    cards.push({
      id: nextId++,
      ...item,
      seo: seoCard(item.name),
    });
  }

  await writeJson("cards.json", cards);
  return cards.length;
}

async function refreshGuides() {
  const guides = await readJson("guides.json");
  const codesGuide = guides.find((item) => item.slug === "codes-redemption-guide");
  if (codesGuide) {
    codesGuide.lastReviewedAt = TODAY;
    codesGuide.summary =
      "Redeem through the live Shop field, note the commonly reported group and Rebirth 2 gate, and separate gameplay sightings from conflicting third-party active lists.";
    const gateSection = {
      heading: "Check the commonly reported unlock gate",
      body: "Independent August 2026 code guides consistently say players must join the Pixellar Studios Roblox group and complete at least 2 Rebirths before the Shop Codes UI accepts redemptions. This wiki records that as a multi-source report; the live UI response remains the final authority.",
    };
    if (!codesGuide.sections.some((section) => section.heading === gateSection.heading)) {
      codesGuide.sections.splice(1, 0, gateSection);
    }
    codesGuide.faq = [
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
          "As of the August 6 audit, Beebom marks several late-July codes expired while Nerdschalk still lists some as working. Conflicting codes stay reported here until a live accept or reject result is captured.",
      },
    ];
  }

  const mutationGuide = guides.find((item) => item.slug === "mutation-guide");
  if (mutationGuide) {
    mutationGuide.lastReviewedAt = TODAY;
    if (
      !mutationGuide.sections.some((section) =>
        section.body.toLowerCase().includes("drowned"),
      )
    ) {
      mutationGuide.sections.push({
        heading: "Record event mutations separately",
        body: "Drowned is multi-source reported for the Summer Part 2 window with Lucid/Nightmare content. Keep event-only names dated and do not invent multipliers when the Index detail text is missing.",
      });
    }
  }

  await writeJson("guides.json", guides);
}

async function refreshUpdates() {
  const updates = await readJson("updates.json");
  const nightmare = updates.find((item) => item.slug === "nightmare-late-game-snapshot");
  if (nightmare) {
    if (!nightmare.details.some((line) => /Drowned|Champions|Rebirth 18/i.test(line))) {
      nightmare.details.push(
        "Multi-source Summer Part 2 reports also name Champions Pack, Drowned mutation and Rebirth 18 around this late-July window; those three records are stored separately with multi-source status.",
      );
    }
    if (!/Champions|Drowned|Rebirth 18/i.test(nightmare.newPacks)) {
      nightmare.newPacks = "Lucid and Nightmare; Champions Pack separately reported for the same Summer window";
    }
  }
  await writeJson("updates.json", updates);
}

async function refreshSite(counts) {
  const site = await readJson("site.json");
  site.snapshotDate = TODAY;
  site.stats = [
    {
      label: "Documented cards",
      value: String(counts.cards),
      note: "Current evidence, historical pulls and multi-source status records",
    },
    {
      label: "Pack details",
      value: String(counts.packs),
      note: "Current Shop rows plus historical and reported packs",
    },
    {
      label: "Codes tracked",
      value: String(counts.codes),
      note: "Video sightings, conflicting reports and expired archive coverage",
    },
    {
      label: "Gameplay videos",
      value: "14",
      note: "March through August 2026",
    },
  ];
  site.officialSnapshot = {
    ...site.officialSnapshot,
    playing: 4445,
    visits: 263836809,
    observedAt: TODAY,
    apiUpdatedAt: "2026-08-03T16:15:54.944Z",
    note: "Refreshed from games.roblox.com universe endpoint during the August 6 content audit.",
  };
  await writeJson("site.json", site);
}

async function refreshResearchDoc() {
  const file = path.join(root, "docs", "research-sources.md");
  let text = await readFile(file, "utf8");
  if (!text.includes("## August 6 content refresh")) {
    text += `

## August 6 content refresh

- Official universe snapshot re-checked: visits \`263,836,809\`, playing \`4,445\` at query time; API \`updated\` timestamp still \`2026-08-03T16:15:54.944Z\`.
- Codes:
  - \`HERO-CRYSTAL\` / \`WEAREBACK\` remain \`video-verified\` field sightings; reward text updated from August guides with conflict notes for \`WEAREBACK\`.
  - \`DRAGON-PRIME\`, \`OWL-HAPPY\` and \`BIGUPDATECOMING\` stay \`reported\` because Beebom expired lists disagree with Nerdschalk working lists.
  - \`BLAZE-STORM\`, \`PRIME-TURBO\`, \`EPIC-LION\`, \`PHOENIX-MYTHIC\`, \`COMET-SHARK\` and \`RAVEN-COMET\` moved to \`expired\` after August archives agreed.
  - Fifteen common expired archive strings were added for coverage only.
- Added multi-source or historical status records for Drowned mutation, Champions Pack, Rebirth 18, Ronaldo, Neymar, Allison, Mbappe, Haaland, Turnly and Abilian.
- Competitor multiplier, Wheel percentage and complete-roster claims remain excluded unless a readable UI string or dated pull proves the field.
`;
  }
  await writeFile(file, text, "utf8");
}

const codes = await refreshCodes();
const mutations = await refreshMutations();
const packs = await refreshPacks();
const rebirths = await refreshRebirths();
const cards = await refreshCards();
await refreshGuides();
await refreshUpdates();
await refreshSite({ codes, packs, cards });
await refreshResearchDoc();

console.log(
  JSON.stringify(
    {
      codes,
      mutations,
      packs,
      rebirths,
      cards,
      date: TODAY,
    },
    null,
    2,
  ),
);
