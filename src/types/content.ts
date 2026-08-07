export type VerificationStatus =
  | "official-source"
  | "gameplay-verified"
  | "multi-source-reported"
  | "historical-record"
  | "not-confirmed";

export type ValueTrend = "rising" | "stable" | "falling" | "unverified";

export interface SourceReference {
  label: string;
  url: string;
  observedAt: string;
  note: string;
}

export interface SeoTdk {
  title: string;
  description: string;
  keywords: string[];
}

export interface SoccerCard {
  id: number;
  slug: string;
  name: string;
  fullName: string;
  rating: number | null;
  position: string;
  rarity: string;
  mutationSlugs: string[];
  packSlug: string | null;
  image: string;
  imageAlt: string;
  observedIncome: number | null;
  tradeValue: number | null;
  previousValue: number | null;
  valueTrend: ValueTrend;
  demand: "low" | "medium" | "high" | "unverified";
  obtainable: boolean | null;
  limited: boolean | null;
  wheelExclusive: boolean | null;
  eventExclusive: boolean | null;
  addedInUpdate: string | null;
  description: string;
  howToGet: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  sourceNote: string;
  source: SourceReference;
  seo: SeoTdk;
}

export interface SoccerPack {
  id: number;
  slug: string;
  name: string;
  image: string;
  cost: number | null;
  currency: string | null;
  unlockRequirement: string;
  rebirthRequirement: number | null;
  highestRarity: string;
  cardCount: number | null;
  cardSlugs: string[];
  description: string;
  order: number;
  verificationStatus: VerificationStatus;
  availability:
    | "dated-shop"
    | "dated-reward"
    | "historical"
    | "unknown";
  stockPerRefresh: number | null;
  bundleCost: number | null;
  bundleQuantity: number | null;
  source: SourceReference;
  seo: SeoTdk;
}

export interface GameCode {
  code: string;
  reward: string;
  status: "video-verified" | "reported" | "expired";
  requirement: string;
  addedAt: string | null;
  lastVerifiedAt: string;
  sourceNote: string;
  image: string;
  source: SourceReference;
}

export interface GuideSection {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  readTime: string;
  lastReviewedAt: string;
  sections: GuideSection[];
  tips: string[];
  mistakes: string[];
  faq: Array<{ question: string; answer: string }>;
  source: SourceReference;
  seo: SeoTdk;
}

export interface GameUpdate {
  slug: string;
  title: string;
  date: string;
  version: string;
  image: string;
  imageAlt: string;
  eventStatus: string;
  newCards: string;
  newPacks: string;
  codeChanges: string;
  balanceChanges: string;
  summary: string;
  details: string[];
  verificationStatus: VerificationStatus;
  source: SourceReference;
  seo: SeoTdk;
}

export interface Rarity {
  slug: string;
  name: string;
  color: string;
  description: string;
  effect: string;
  verificationStatus: VerificationStatus;
  sourceNote: string;
  seo: SeoTdk;
}

export interface Mutation {
  slug: string;
  name: string;
  color: string;
  effect: string;
  multiplier: string;
  description: string;
  verificationStatus: VerificationStatus;
  source: SourceReference;
  seo: SeoTdk;
}

export interface Rebirth {
  slug: string;
  level: number;
  title: string;
  requirement: string;
  unlocks: string[];
  strategy: string;
  verificationStatus: VerificationStatus;
  source: SourceReference;
  seo: SeoTdk;
}

export interface TradeObservation {
  id: string;
  cardName: string;
  variant: string;
  amount: number;
  currency: string;
  observedAt: string;
  interpretation: string;
  source: SourceReference;
}

export interface GamePass {
  id: number;
  slug: string;
  name: string;
  price: number | null;
  isForSale: boolean;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  source: SourceReference;
}
