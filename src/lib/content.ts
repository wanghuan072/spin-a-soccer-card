import cardsJson from "@/data/game/cards.json";
import codesJson from "@/data/game/codes.json";
import guidesJson from "@/data/game/guides.json";
import mutationsJson from "@/data/game/mutations.json";
import packsJson from "@/data/game/packs.json";
import raritiesJson from "@/data/game/rarities.json";
import rebirthsJson from "@/data/game/rebirths.json";
import siteJson from "@/data/game/site.json";
import updatesJson from "@/data/game/updates.json";
import tradeObservationsJson from "@/data/game/trade-observations.json";
import gamepassesJson from "@/data/game/gamepasses.json";
import type {
  GameCode,
  GameUpdate,
  Guide,
  Mutation,
  Rarity,
  Rebirth,
  SoccerCard,
  SoccerPack,
  TradeObservation,
  GamePass,
} from "@/types/content";

export const cards = cardsJson as SoccerCard[];
export const packs = packsJson as SoccerPack[];
export const codes = codesJson as GameCode[];
export const guides = guidesJson as Guide[];
export const updates = updatesJson as GameUpdate[];
export const rarities = raritiesJson as Rarity[];
export const mutations = mutationsJson as Mutation[];
export const rebirths = rebirthsJson as Rebirth[];
export const gameSnapshot = siteJson;
export const tradeObservations = tradeObservationsJson as TradeObservation[];
export const gamepasses = gamepassesJson as GamePass[];

export const getCard = (slug: string) =>
  cards.find((card) => card.slug === slug);
export const getPack = (slug: string) =>
  packs.find((pack) => pack.slug === slug);
export const getGuide = (slug: string) =>
  guides.find((guide) => guide.slug === slug);
export const getUpdate = (slug: string) =>
  updates.find((update) => update.slug === slug);
export const getRarity = (slug: string) =>
  rarities.find((rarity) => rarity.slug === slug);
export const getMutation = (slug: string) =>
  mutations.find((mutation) => mutation.slug === slug);
export const getRebirth = (slug: string) =>
  rebirths.find((rebirth) => rebirth.slug === slug);

/** Player-facing stand-in when a live value is not on file yet. */
export const seeInGame = "See in game";

export function formatNumber(value: number | null, prefix = ""): string {
  if (value === null) return seeInGame;
  return `${prefix}${new Intl.NumberFormat("en-US", {
    notation: value >= 100000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value)}`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function verificationLabel(status: string): string {
  const labels: Record<string, string> = {
    "official-source": "Official Roblox data",
    "gameplay-verified": "Seen in game",
    "multi-source-reported": "Popular target",
    "historical-record": "Older version",
    "not-confirmed": seeInGame,
    "video-verified": "Seen in Shop",
    reported: "Try in game",
    expired: "Expired",
  };
  return labels[status] ?? status;
}

const codeStatusPriority: Record<GameCode["status"], number> = {
  "video-verified": 0,
  reported: 1,
  expired: 2,
};

/** Prefer live field sightings, then try-in-game rows, then archive. */
export function sortCodesForDisplay(entries: GameCode[] = codes): GameCode[] {
  return [...entries].sort((a, b) => {
    const byStatus =
      codeStatusPriority[a.status] - codeStatusPriority[b.status];
    if (byStatus !== 0) return byStatus;
    return b.lastVerifiedAt.localeCompare(a.lastVerifiedAt);
  });
}

export function countByVerification<T extends { verificationStatus: string }>(
  entries: T[],
  status: string,
) {
  return entries.filter((entry) => entry.verificationStatus === status).length;
}
