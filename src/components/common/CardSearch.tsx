"use client";

import { useMemo, useState } from "react";
import type { SoccerCard } from "@/types/content";
import { CardItem } from "@/components/common/CardItem";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/search.module.css";

export interface CardSearchInitialFilters {
  query?: string;
  rarity?: string;
  pack?: string;
  mutation?: string;
  position?: string;
  limited?: string;
  obtainable?: string;
  status?: string;
  sort?: string;
}
type Choice = { value: string; label: string };

function labelSlug(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function ChoiceRail({
  label,
  value,
  choices,
  onChange,
}: {
  label: string;
  value: string;
  choices: Choice[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className={styles.choiceRail}>
      <div className={styles.choiceRow}>
        <legend>{label}</legend>
        <div className={styles.choiceButtons}>
          {choices.map((choice) => (
            <button
              type="button"
              key={choice.value}
              aria-pressed={value === choice.value}
              onClick={() => onChange(choice.value)}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </fieldset>
  );
}

export function CardSearch({
  cards,
  compact = false,
  initialFilters = {},
}: {
  cards: SoccerCard[];
  compact?: boolean;
  initialFilters?: CardSearchInitialFilters;
}) {
  const [query, setQuery] = useState(initialFilters.query ?? "");
  const [rarity, setRarity] = useState(initialFilters.rarity ?? "all");
  const [pack, setPack] = useState(initialFilters.pack ?? "all");
  const [mutation, setMutation] = useState(initialFilters.mutation ?? "all");
  const [position, setPosition] = useState(initialFilters.position ?? "all");
  const [limited, setLimited] = useState(initialFilters.limited ?? "all");
  const [obtainable, setObtainable] = useState(
    initialFilters.obtainable ?? "all",
  );
  const [status, setStatus] = useState(initialFilters.status ?? "all");
  const [sort, setSort] = useState(initialFilters.sort ?? "name");

  const filtered = useMemo(() => {
    return cards
      .filter(
        (card) =>
          `${card.name} ${card.fullName}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()) &&
          (rarity === "all" || card.rarity === rarity) &&
          (pack === "all" ||
            (pack === "unknown"
              ? card.packSlug === null
              : card.packSlug === pack)) &&
          (mutation === "all" || card.mutationSlugs.includes(mutation)) &&
          (position === "all" || card.position === position) &&
          (limited === "all" ||
            (limited === "unknown"
              ? card.limited === null
              : card.limited === (limited === "yes"))) &&
          (obtainable === "all" ||
            (obtainable === "unknown"
              ? card.obtainable === null
              : card.obtainable === (obtainable === "yes"))) &&
          (status === "all" || card.verificationStatus === status),
      )
      .sort((a, b) =>
        sort === "rating"
          ? (b.rating ?? -1) - (a.rating ?? -1)
          : sort === "income"
            ? (b.observedIncome ?? -1) - (a.observedIncome ?? -1)
            : sort === "value"
              ? (b.tradeValue ?? -1) - (a.tradeValue ?? -1)
              : sort === "newest"
                ? b.lastVerifiedAt.localeCompare(a.lastVerifiedAt)
                : a.name.localeCompare(b.name),
      );
  }, [
    cards,
    limited,
    mutation,
    obtainable,
    pack,
    position,
    query,
    rarity,
    sort,
    status,
  ]);

  const rarities = Array.from(new Set(cards.map((card) => card.rarity)));
  const packs = Array.from(
    new Set(cards.map((card) => card.packSlug).filter(Boolean)),
  ) as string[];
  const mutations = Array.from(
    new Set(cards.flatMap((card) => card.mutationSlugs)),
  );
  const positions = Array.from(new Set(cards.map((card) => card.position)));
  const reset = () => {
    setQuery("");
    setRarity("all");
    setPack("all");
    setMutation("all");
    setPosition("all");
    setLimited("all");
    setObtainable("all");
    setStatus("all");
    setSort("name");
  };

  return (
    <div className={`${styles.finder} ${compact ? styles.compactFinder : ""}`}>
      <div className={styles.filterBoard}>
        <div className={styles.searchRow}>
          <label className={styles.search}>
            <span>Search documented cards</span>
            <div>
              <Icon name="search" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try Messi, Ronaldo, Varmolen or GK..."
              />
            </div>
          </label>
          <button className={styles.reset} type="button" onClick={reset}>
            Reset all
          </button>
        </div>
        <ChoiceRail
          label="Game version"
          value={status}
          onChange={setStatus}
          choices={[
            { value: "all", label: "All cards" },
            { value: "official-source", label: "Official Roblox" },
            { value: "gameplay-verified", label: "Seen in game" },
            {
              value: "multi-source-reported",
              label: "Cross-checked reports",
            },
            { value: "historical-record", label: "Older version" },
          ]}
        />
        <ChoiceRail
          label="Rarity"
          value={rarity}
          onChange={setRarity}
          choices={[
            { value: "all", label: "All" },
            ...rarities.map((item) => ({ value: item, label: item })),
          ]}
        />
        {!compact ? (
          <>
            <ChoiceRail
              label="Pack"
              value={pack}
              onChange={setPack}
              choices={[
                { value: "all", label: "All packs" },
                { value: "unknown", label: "Pack unknown" },
                ...packs.map((item) => ({
                  value: item,
                  label: labelSlug(item),
                })),
              ]}
            />
            <ChoiceRail
              label="Mutation"
              value={mutation}
              onChange={setMutation}
              choices={[
                { value: "all", label: "All" },
                ...mutations.map((item) => ({
                  value: item,
                  label: labelSlug(item),
                })),
              ]}
            />
            <ChoiceRail
              label="Position"
              value={position}
              onChange={setPosition}
              choices={[
                { value: "all", label: "All" },
                ...positions.map((item) => ({ value: item, label: item })),
              ]}
            />
            <div className={styles.binaryRows}>
              <ChoiceRail
                label="Availability"
                value={obtainable}
                onChange={setObtainable}
                choices={[
                  { value: "all", label: "Any" },
                  { value: "yes", label: "Seen in a pack" },
                  { value: "no", label: "Unavailable" },
                  { value: "unknown", label: "Unknown" },
                ]}
              />
              <ChoiceRail
                label="Limited status"
                value={limited}
                onChange={setLimited}
                choices={[
                  { value: "all", label: "Any" },
                  { value: "yes", label: "Limited" },
                  { value: "no", label: "Not limited" },
                  { value: "unknown", label: "Unknown" },
                ]}
              />
            </div>
          </>
        ) : null}
        <ChoiceRail
          label="Sort cards"
          value={sort}
          onChange={setSort}
          choices={[
            { value: "name", label: "Name A–Z" },
            { value: "rating", label: "Rating" },
            { value: "income", label: "Recorded income" },
            { value: "value", label: "Trade value" },
            { value: "newest", label: "Recently checked" },
          ]}
        />
      </div>
      <p className={styles.resultCount} aria-live="polite">
        <strong>{filtered.length}</strong> of {cards.length} cards shown
      </p>
      {filtered.length ? (
        <div className={`${styles.grid} ${compact ? styles.compact : ""}`}>
          {filtered.map((card) => (
            <CardItem key={card.slug} card={card} compact={compact} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>No cards match those filters.</strong>
          <p>Reset filters or try another rarity, pack or game version.</p>
        </div>
      )}
    </div>
  );
}
