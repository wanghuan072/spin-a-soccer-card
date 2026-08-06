import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cards, packs } from "@/lib/content";
import type { Rarity } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function RarityDetailPage({ rarity }: { rarity: Rarity }) {
  const linkedCards = cards.filter(
    (card) => card.rarity.toLowerCase() === rarity.name.toLowerCase(),
  );
  const linkedPacks = packs.filter(
    (pack) => pack.highestRarity.toLowerCase() === rarity.name.toLowerCase(),
  );
  const visual =
    linkedCards[0]?.image ??
    linkedPacks[0]?.image ??
    "/images/video/historical-mutation-index.webp";
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Rarity and pack guide"
        title={`Spin a Soccer Card ${rarity.name} Rarity - Cards, Packs & Meaning`}
        description={rarity.seo.description}
        meta={[
          `${linkedCards.length} linked cards`,
          `${linkedPacks.length} linked packs`,
          "Label seen in game",
        ]}
        image={visual}
        imageAlt={`${rarity.name} rarity shown in Spin a Soccer Card`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Rarities", href: "/rarities" },
          { label: rarity.name },
        ]}
      />
      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section>
            <StatusBadge status={rarity.verificationStatus} />
            <div className={styles.metricRow}>
              <article>
                <span>Linked cards</span>
                <strong>{linkedCards.length}</strong>
                <small>Exact label matches</small>
              </article>
              <article>
                <span>Linked packs</span>
                <strong>{linkedPacks.length}</strong>
                <small>Highest-rarity field matches</small>
              </article>
              <article>
                <span>Color family</span>
                <strong>{rarity.color}</strong>
                <small>Site classification token</small>
              </article>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div>
                <h2>
                  Spin a Soccer Card {rarity.name} rarity details
                </h2>
                <p>What this label means and where it appears.</p>
              </div>
            </div>
            <div className={styles.split}>
              <div>
                <h3>Description</h3>
                <p>{rarity.description}</p>
              </div>
              <div>
                <h3>In-game meaning</h3>
                <p>{rarity.effect}</p>
              </div>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div>
                <h2>Spin a Soccer Card {rarity.name} cards</h2>
                <p>Only exact rarity-label relationships are included.</p>
              </div>
            </div>
            {linkedCards.length ? (
              <div className={styles.recordLinks}>
                {linkedCards.map((card) => (
                  <Link key={card.slug} href={`/cards/${card.slug}`}>
                    <span>{card.name}</span>
                    <small>
                      {card.rating ?? "?"} · {card.position} · {card.rarity}
                    </small>
                    <Icon name="arrow" size={15} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.note}>
                <strong>No exact card link yet.</strong>
                <p>
                  The rarity label is documented, but the available card
                  captures use another label or an unreadable field.
                </p>
              </div>
            )}
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>03</span>
              <div>
                <h2>Linked packs</h2>
                <p>Packs whose highestRarity field matches this label.</p>
              </div>
            </div>
            {linkedPacks.length ? (
              <div className={styles.recordLinks}>
                {linkedPacks.map((pack) => (
                  <Link key={pack.slug} href={`/packs/${pack.slug}`}>
                    <span>{pack.name}</span>
                    <small>
                      {pack.availability} · checked {pack.source.observedAt}
                    </small>
                    <Icon name="arrow" size={15} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.note}>
                <strong>No exact pack link.</strong>
                <p>
                  A card rarity and a Shop pack tier are not automatically
                  treated as the same system.
                </p>
              </div>
            )}
          </section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{linkedCards.length + linkedPacks.length}</span>
            <h2>Total links</h2>
            <p>Exact card and pack relationships.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
