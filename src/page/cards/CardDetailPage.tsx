import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  cards,
  formatDate,
  formatNumber,
  getPack,
  mutations,
  rarities,
} from "@/lib/content";
import type { SoccerCard } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

const flagLabel = (value: boolean | null) =>
  value === null ? "Not confirmed" : value ? "Yes" : "No";

export function CardDetailPage({ card }: { card: SoccerCard }) {
  const pack = card.packSlug ? getPack(card.packSlug) : undefined;
  const linkedMutations = mutations.filter((item) =>
    card.mutationSlugs.includes(item.slug),
  );
  const linkedRarity = rarities.find(
    (item) => item.name.toLowerCase() === card.rarity.toLowerCase(),
  );
  const related = cards
    .filter(
      (item) =>
        item.slug !== card.slug &&
        (item.packSlug === card.packSlug ||
          (item.position === card.position && item.rarity === card.rarity) ||
          item.mutationSlugs.some((slug) => card.mutationSlugs.includes(slug))),
    )
    .slice(0, 5);
  const hasIncomeTrade =
    card.baseIncome !== null || card.tradeValue !== null;
  let sectionNo = 1;
  const nextSection = () => String(sectionNo++).padStart(2, "0");
  const versionLabel =
    card.verificationStatus === "historical-record"
      ? `Older version · ${formatDate(card.lastVerifiedAt)}`
      : card.verificationStatus === "multi-source-reported"
        ? `Popular target · ${formatDate(card.lastVerifiedAt)}`
        : `Updated ${formatDate(card.lastVerifiedAt)}`;

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Card scouting dossier"
        title={card.name}
        description={card.seo.description}
        meta={[
          versionLabel,
          card.rating ? `Rating ${card.rating}` : card.position,
          pack ? pack.name : card.rarity,
        ]}
        image={card.image}
        imageAlt={card.imageAlt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cards", href: "/cards" },
          { label: card.name },
        ]}
      />
      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section className={styles.overview}>
            <div className={styles.art}>
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <span className={styles.artStamp}>
                {card.rating ?? "?"}
                <small>{card.position}</small>
              </span>
            </div>
            <div className={styles.facts}>
              <StatusBadge status={card.verificationStatus} />
              <p className={styles.kicker}>
                Card #{String(card.id).padStart(4, "0")}
              </p>
              <h2>Spin a Soccer Card {card.name} details</h2>
              <p>{card.description}</p>
              <dl>
                <div>
                  <dt>Full card name</dt>
                  <dd>{card.fullName}</dd>
                </div>
                <div>
                  <dt>Rating / position</dt>
                  <dd>
                    {card.rating !== null
                      ? `${card.rating} · ${card.position}`
                      : card.position}
                  </dd>
                </div>
                <div>
                  <dt>Rarity label</dt>
                  <dd>
                    {linkedRarity ? (
                      <Link href={`/rarities/${linkedRarity.slug}`}>
                        {card.rarity}
                      </Link>
                    ) : (
                      card.rarity
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Mutation labels</dt>
                  <dd>
                    {linkedMutations.length
                      ? linkedMutations.map((item, index) => (
                          <span key={item.slug}>
                            {index > 0 ? ", " : null}
                            <Link href={`/mutations/${item.slug}`}>
                              {item.name}
                            </Link>
                          </span>
                        ))
                      : "None on this pull"}
                  </dd>
                </div>
                {pack ? (
                  <div>
                    <dt>Known pack</dt>
                    <dd>
                      <Link href={`/packs/${pack.slug}`}>{pack.name}</Link>
                    </dd>
                  </div>
                ) : null}
                {card.baseIncome !== null ? (
                  <div>
                    <dt>Displayed income</dt>
                    <dd>{formatNumber(card.baseIncome, "$")}</dd>
                  </div>
                ) : null}
                {card.tradeValue !== null ? (
                  <div>
                    <dt>Trade value</dt>
                    <dd>{formatNumber(card.tradeValue)}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Obtainable</dt>
                  <dd>{flagLabel(card.obtainable)}</dd>
                </div>
                <div>
                  <dt>Limited</dt>
                  <dd>{flagLabel(card.limited)}</dd>
                </div>
                <div>
                  <dt>Wheel exclusive</dt>
                  <dd>{flagLabel(card.wheelExclusive)}</dd>
                </div>
                <div>
                  <dt>Event exclusive</dt>
                  <dd>{flagLabel(card.eventExclusive)}</dd>
                </div>
                {card.addedInUpdate ? (
                  <div>
                    <dt>Added in update</dt>
                    <dd>{card.addedInUpdate}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Last checked</dt>
                  <dd>{formatDate(card.lastVerifiedAt)}</dd>
                </div>
              </dl>
            </div>
          </section>

          {hasIncomeTrade ? (
            <section>
              <div className={styles.sectionHeading}>
                <span>{nextSection()}</span>
                <div>
                  <h2>Spin a Soccer Card {card.name} income and value</h2>
                  <p>Plot EPS and Trade Token value stay separate.</p>
                </div>
              </div>
              <div className={styles.metricRow}>
                {card.baseIncome !== null ? (
                  <article>
                    <span>Displayed income</span>
                    <strong>{formatNumber(card.baseIncome, "$")}</strong>
                    <small>Per-second plot label</small>
                  </article>
                ) : null}
                {card.tradeValue !== null ? (
                  <article>
                    <span>Trade value</span>
                    <strong>{formatNumber(card.tradeValue)}</strong>
                    <small>
                      {card.demand === "unverified"
                        ? "Demand still forming"
                        : `${card.demand} demand`}
                    </small>
                  </article>
                ) : null}
                {card.valueTrend !== "unverified" ||
                card.previousValue !== null ? (
                  <article>
                    <span>Trend</span>
                    <strong>
                      {card.valueTrend === "unverified"
                        ? "Watch market"
                        : card.valueTrend}
                    </strong>
                    <small>
                      {card.previousValue === null
                        ? "No earlier trade logged"
                        : `Previous: ${formatNumber(card.previousValue)}`}
                    </small>
                  </article>
                ) : null}
              </div>
            </section>
          ) : null}

        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{card.rating ?? "—"}</span>
            <h2>{card.name}</h2>
            <p>
              {card.rarity} · {card.position}
            </p>
          </section>
          {related.length ? (
            <section>
              <h2>Related cards</h2>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/cards/${item.slug}`}>
                      {item.name}
                      <Icon name="arrow" size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
