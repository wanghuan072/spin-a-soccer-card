import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "src",
  "data",
  "game",
  "codes.json",
);

const codes = JSON.parse(await readFile(file, "utf8"));
const gate =
  "Join Pixellar Studios, finish 2 Rebirths, then redeem in Shop → Codes.";

const patches = {
  "HERO-CRYSTAL": {
    reward: "2 packs at your rebirth level + 3 Spin Wheel spins",
    status: "video-verified",
    requirement: gate,
    lastVerifiedAt: "2026-08-06",
    sourceNote:
      "Visible in the live Codes field on Aug 2 gameplay. Beebom (Aug 4) and Nerdschalk both list it among current working codes with the packs-and-spins reward.",
    image: "/images/evidence/hero-crystal-code.webp",
  },
  WEAREBACK: {
    reward:
      "2 packs at your rebirth level + 3 spins (some lists say 3 Transcendent packs + 3 spins)",
    status: "video-verified",
    requirement: gate,
    lastVerifiedAt: "2026-08-06",
    sourceNote:
      "Visible in the live Codes field on July 30 return gameplay. Beebom lists packs+spins; Nerdschalk lists 3 Transcendent packs + 3 spins.",
    image: "/images/evidence/weareback-code.webp",
  },
  "DRAGON-PRIME": {
    reward: "2 packs + 3 spins",
    status: "reported",
    requirement:
      "Try once in Shop → Codes after the group join + 2 Rebirths gate.",
    lastVerifiedAt: "2026-08-06",
    sourceNote:
      "August tracker conflict: Beebom expired vs Nerdschalk working. Keep as try-in-game.",
    image: "/images/codes/code-menu.webp",
  },
  "OWL-HAPPY": {
    reward: "2 packs at your rebirth level + 3 spins",
    status: "reported",
    requirement:
      "Paste exactly; some August lists still show it, others say Shop rejects it.",
    lastVerifiedAt: "2026-08-06",
    sourceNote:
      "August tracker conflict: Beebom expired vs Nerdschalk working. Keep as try-in-game.",
    image: "/images/codes/code-redemption.webp",
  },
  BIGUPDATECOMING: {
    reward: "2 Wish Tickets + 30 Tournament Tokens + 2 spins + 100 Gems",
    status: "reported",
    requirement:
      "Worth one quick redeem attempt if you still need Wish Tickets or tokens.",
    lastVerifiedAt: "2026-08-06",
    sourceNote:
      "August tracker conflict on acceptance. Reward text is consistent across older guides.",
    image: "/images/codes/code-field.webp",
  },
};

for (const entry of codes) {
  const patch = patches[entry.code];
  if (patch) Object.assign(entry, patch);
}

await writeFile(file, `${JSON.stringify(codes, null, 2)}\n`, "utf8");
console.log("codes player copy refreshed");
