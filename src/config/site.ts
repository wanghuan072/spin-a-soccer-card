import siteShared from "@/config/site-shared.json";

export const siteConfig = {
  name: "Spin a Soccer Card Wiki",
  shortName: "SASC Wiki",
  tagline: "Cards, Packs, Values, Codes and Guides",
  description:
    "A player-focused Spin a Soccer Card wiki with cards, pack prices, codes, values, mutations, rebirths and practical guides.",
  url: siteShared.url,
  socialImage: siteShared.socialImage,
  contactEmail: "wyong@gothic1remake.com",
  robloxUrl: "https://www.roblox.com/games/112490729816320/Spin-a-Soccer-Card",
  gameUniverseId: "9272693470",
  dataSnapshot: "2026-08-06",
} as const;

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Codes", href: "/codes" },
  { label: "Cards", href: "/cards" },
  { label: "Packs", href: "/packs" },
  { label: "Values", href: "/values" },
  { label: "Guides", href: "/guides" },
  { label: "Updates", href: "/updates" },
] as const;

export const directoryNavigation = {
  Cards: [
    { label: "All Cards", href: "/cards" },
    { label: "Highest Rating", href: "/cards?sort=rating" },
    { label: "Seen in Game", href: "/cards?status=gameplay-verified" },
    {
      label: "Popular Targets",
      href: "/cards?status=multi-source-reported",
    },
    { label: "Cards by Pack", href: "/cards?pack=transcendent-pack" },
    { label: "Cards by Rarity", href: "/rarities" },
  ],
  Packs: [
    { label: "All Packs", href: "/packs" },
    { label: "Pack Progression", href: "/packs#progression" },
    { label: "Pack Details", href: "/packs#details" },
  ],
  Values: [
    { label: "Value List", href: "/values" },
    { label: "Card Details", href: "/cards" },
    { label: "Trade History", href: "/values#trade-history" },
  ],
  Guides: [
    { label: "Beginner Guide", href: "/guides/beginner-guide" },
    { label: "Codes Guide", href: "/guides/codes-redemption-guide" },
    { label: "Game Passes", href: "/gamepasses" },
    { label: "Game Data", href: "/research" },
  ],
} as const;
