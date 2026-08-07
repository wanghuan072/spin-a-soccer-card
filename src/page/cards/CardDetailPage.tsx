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
  value === null ? "Not established" : value ? "Yes" : "No";

export function CardDetailPage({ card }: { card: SoccerCard }) {
  const pack = card.packSlug ? getPack(card.packSlug) : undefined;
  const linkedMutations = mutations.filter((item) =>
    card.mutationSlugs.includes(item.slug),
  );
  const linkedRarity = rarities.find(
    (item) => item.name.toLowerCase() === card.rarity.toLowerCase(),
  );
  const comparablePosition = !["not confirmed", "not readable"].includes(
    card.position.toLowerCase(),
  );
  const samePosition = comparablePosition
    ? cards.find(
        (item) => item.slug !== card.slug && item.position === card.position,
      )
    : undefined;
  const hasExactCardImage =
    !card.image.includes("/rebirth-") &&
    !card.image.includes("/pack-alpha") &&
    !card.imageAlt.toLowerCase().includes("context");
  const versionLabel =
    card.verificationStatus === "historical-record"
      ? `Older build · ${formatDate(card.lastVerifiedAt)}`
      : card.verificationStatus === "multi-source-reported"
        ? `Community record · ${formatDate(card.lastVerifiedAt)}`
        : card.verificationStatus === "official-source"
          ? `Official media · ${formatDate(card.lastVerifiedAt)}`
          : `Game capture · ${formatDate(card.lastVerifiedAt)}`;
  const packPrice =
    pack?.cost !== null && pack?.cost !== undefined
      ? formatNumber(pack.cost, pack.currency === "Cash" ? "$" : "")
      : "Not captured";
  const plotIncome =
    card.observedIncome !== null
      ? `${formatNumber(card.observedIncome, "$")} / sec`
      : "Not captured";
  const tradeValue =
    card.tradeValue !== null
      ? `${formatNumber(card.tradeValue)} Trade Tokens`
      : "Not captured";
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Card data record"
        title={card.name}
        description={card.description}
        meta={[
          versionLabel,
          card.rating ? `Rating ${card.rating} · ${card.position}` : card.position,
          pack ? pack.name : card.rarity,
        ]}
        showVisual={false}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cards", href: "/cards" },
          { label: card.name },
        ]}
      />

      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section className={styles.overview}>
            {hasExactCardImage ? (
              <div className={styles.art}>
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 42vw, 420px"
                  quality={82}
                />
                <span className={styles.artStamp}>
                  {card.rating ?? "?"}
                  <small>{card.position}</small>
                </span>
              </div>
            ) : (
              <div className={styles.artUnavailable}>
                <span>{card.rating ?? "—"}</span>
                <strong>{card.name}</strong>
                <small>No unique card capture is available for this record.</small>
              </div>
            )}

            <div className={styles.facts}>
              <StatusBadge status={card.verificationStatus} />
              <p className={styles.kicker}>
                Record #{String(card.id).padStart(4, "0")} · {versionLabel}
              </p>
              <h2>{card.name} card data</h2>

              <div className={styles.topMetrics}>
                <article>
                  <span>Recorded plot income</span>
                  <strong>{plotIncome}</strong>
                  <small>One dated plot display; not a base rate</small>
                </article>
                <article>
                  <span>Trade value</span>
                  <strong>{tradeValue}</strong>
                  <small>Dated market amount only</small>
                </article>
                <article>
                  <span>Connected pack price</span>
                  <strong>{packPrice}</strong>
                  <small>{pack ? pack.name : "No pack assigned"}</small>
                </article>
              </div>

              <dl>
                <div>
                  <dt>Displayed name</dt>
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
                  <dt>Card label</dt>
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
                  <dt>Mutation</dt>
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
                      : "No mutation visible"}
                  </dd>
                </div>
                <div>
                  <dt>Connected pack</dt>
                  <dd>
                    {pack ? (
                      <Link href={`/packs/${pack.slug}`}>{pack.name}</Link>
                    ) : (
                      "Not assigned"
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Pack stock</dt>
                  <dd>
                    {pack?.stockPerRefresh !== null &&
                    pack?.stockPerRefresh !== undefined
                      ? `${pack.stockPerRefresh} per refresh`
                      : "Not captured"}
                  </dd>
                </div>
                <div>
                  <dt>Demand</dt>
                  <dd>{card.demand === "unverified" ? "Not established" : card.demand}</dd>
                </div>
                <div>
                  <dt>Value trend</dt>
                  <dd>{card.valueTrend === "unverified" ? "Not established" : card.valueTrend}</dd>
                </div>
                <div>
                  <dt>Availability in captured window</dt>
                  <dd>{flagLabel(card.obtainable)}</dd>
                </div>
                <div>
                  <dt>Limited card</dt>
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
                <div>
                  <dt>Last game check</dt>
                  <dd>{formatDate(card.lastVerifiedAt)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div>
                <h2>{card.name} record notes</h2>
                <p>Only card-specific information retained for this game window.</p>
              </div>
            </div>
            <div className={styles.recordNotes}>
              <article>
                <span>Card record</span>
                <p>{card.description}</p>
              </article>
              <article>
                <span>Acquisition information</span>
                <p>{card.howToGet}</p>
              </article>
            </div>
          </section>
        </article>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{card.rating ?? "—"}</span>
            <h2>{card.name}</h2>
            <p>{card.rarity} · {card.position}</p>
          </section>
          <section>
            <h2>Related data</h2>
            <ul>
              {pack ? (
                <li>
                  <Link href={`/packs/${pack.slug}`}>
                    {pack.name}<Icon name="arrow" size={15} />
                  </Link>
                </li>
              ) : null}
              {linkedRarity ? (
                <li>
                  <Link href={`/rarities/${linkedRarity.slug}`}>
                    {linkedRarity.name} label<Icon name="arrow" size={15} />
                  </Link>
                </li>
              ) : null}
              {linkedMutations.map((item) => (
                <li key={item.slug}>
                  <Link href={`/mutations/${item.slug}`}>
                    {item.name} mutation<Icon name="arrow" size={15} />
                  </Link>
                </li>
              ))}
              {samePosition ? (
                <li>
                  <Link href={`/cards/${samePosition.slug}`}>
                    Another {card.position}: {samePosition.name}
                    <Icon name="arrow" size={15} />
                  </Link>
                </li>
              ) : null}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
