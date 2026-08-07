import Image from "next/image";
import Link from "next/link";
import { CardItem } from "@/components/common/CardItem";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cards, formatNumber } from "@/lib/content";
import type { SoccerPack } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function PackDetailPage({ pack }: { pack: SoccerPack }) {
  const pool = cards.filter((card) => pack.cardSlugs.includes(card.slug));
  const documentedRate = pack.cardCount
    ? Math.min(100, Math.round((pool.length / pack.cardCount) * 100))
    : null;
  const unitBundleCost =
    pack.bundleCost && pack.bundleQuantity
      ? pack.bundleCost / pack.bundleQuantity
      : null;
  const versionLabel =
    pack.availability === "historical"
      ? "Historical rotation"
      : pack.availability === "dated-shop"
        ? `Shop record · ${pack.source.observedAt}`
        : pack.availability === "dated-reward"
          ? `Reward record · ${pack.source.observedAt}`
          : "Availability not established";
  const singlePrice =
    pack.cost !== null
      ? `${formatNumber(pack.cost, pack.currency === "Cash" ? "$" : "")}${
          pack.currency && pack.currency !== "Cash" ? ` ${pack.currency}` : ""
        }`
      : "Not captured";
  const bundlePrice =
    pack.bundleCost !== null
      ? `${pack.bundleCost} Robux${
          pack.bundleQuantity ? ` / ${pack.bundleQuantity} packs` : ""
        }`
      : "Not captured";

  return (
    <main id="main-content">
      <PageHero
        eyebrow={
          pack.availability === "historical"
            ? "Older pack record"
            : "Pack shop record"
        }
        title={pack.name}
        description={pack.description}
        meta={[
          versionLabel,
          `${pool.length} documented cards`,
          `Checked ${pack.source.observedAt}`,
        ]}
        showVisual={false}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Packs", href: "/packs" },
          { label: pack.name },
        ]}
      />

      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section className={styles.overview}>
            <div className={styles.art}>
              <Image
                src={pack.image}
                alt={`${pack.name} shown in Spin a Soccer Card`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 42vw, 420px"
                quality={82}
              />
              <span className={styles.artStamp}>
                {pack.availability === "historical" ? "ARCHIVE" : "DATED"}
                <small>PACK RECORD</small>
              </span>
            </div>

            <div className={styles.facts}>
              <StatusBadge status={pack.verificationStatus} />
              <p className={styles.kicker}>{versionLabel}</p>
              <h2>Pack pricing and availability</h2>

              <div className={styles.topMetrics}>
                <article>
                  <span>Single-pack price</span>
                  <strong>{singlePrice}</strong>
                  <small>{pack.currency ?? "Currency not captured"}</small>
                </article>
                <article>
                  <span>Robux bundle</span>
                  <strong>{bundlePrice}</strong>
                  <small>Recorded Shop product</small>
                </article>
                <article>
                  <span>Robux per pack</span>
                  <strong>
                    {unitBundleCost !== null
                      ? `${unitBundleCost.toFixed(1)} Robux`
                      : "Not available"}
                  </strong>
                  <small>Calculated only from a readable bundle</small>
                </article>
              </div>

              <dl>
                <div>
                  <dt>Availability</dt>
                  <dd>{versionLabel}</dd>
                </div>
                <div>
                  <dt>Stock shown</dt>
                  <dd>
                    {pack.stockPerRefresh !== null
                      ? `${pack.stockPerRefresh} per refresh`
                      : "Not captured"}
                  </dd>
                </div>
                <div>
                  <dt>Rebirth gate</dt>
                  <dd>
                    {pack.rebirthRequirement === null
                      ? "Not established"
                      : pack.rebirthRequirement === 0
                        ? "No rebirth gate"
                        : `Rebirth ${pack.rebirthRequirement}`}
                  </dd>
                </div>
                <div>
                  <dt>Highest label</dt>
                  <dd>{pack.highestRarity}</dd>
                </div>
                <div>
                  <dt>Documented cards</dt>
                  <dd>{pool.length}</dd>
                </div>
                <div>
                  <dt>Listed pool size</dt>
                  <dd>{pack.cardCount ?? "Not captured"}</dd>
                </div>
                <div>
                  <dt>Unlock requirement</dt>
                  <dd>{pack.unlockRequirement}</dd>
                </div>
                <div>
                  <dt>Last game check</dt>
                  <dd>{pack.source.observedAt}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div>
                <h2>{pack.name} card records</h2>
                <p>Card faces connected to this dated pack record.</p>
              </div>
            </div>
            {pool.length ? (
              <>
                <div className={styles.coverage}>
                  <div>
                    <strong>
                      {documentedRate === null
                        ? pool.length
                        : `${documentedRate}%`}
                    </strong>
                    <span>
                      {pack.cardCount
                        ? `${pool.length} of ${pack.cardCount} listed slots have card records`
                        : `${pool.length} card faces are readable; the complete pool size is not established`}
                    </span>
                  </div>
                  {documentedRate !== null ? (
                    <meter min="0" max="100" value={documentedRate}>
                      {documentedRate}%
                    </meter>
                  ) : null}
                </div>
                <div className={styles.detailCardGrid}>
                  {pool.map((card) => (
                    <CardItem key={card.slug} card={card} />
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.note}>
                <strong>No readable card faces.</strong>
                <p>
                  The pack artwork is documented, but no individual card name is
                  clear enough to add to this pack record.
                </p>
              </div>
            )}
          </section>

          <section>
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div>
                <h2>{pack.name} record notes</h2>
                <p>Pack-specific facts retained for the checked game window.</p>
              </div>
            </div>
            <div className={styles.recordNotes}>
              <article>
                <span>Pack record</span>
                <p>{pack.description}</p>
              </article>
              <article>
                <span>Access</span>
                <p>{pack.unlockRequirement}</p>
              </article>
              <article>
                <span>Pool limit</span>
                <p>
                  {pack.cardCount !== null
                    ? `${pack.name} lists ${pack.cardCount} pool slots for this game window; ${pool.length} currently have readable card records.`
                    : `${pack.name} has ${pool.length} readable card records, but the complete pool size was not visible.`}
                </p>
              </article>
            </div>
          </section>
        </article>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{pack.availability === "historical" ? "OLD" : "DATE"}</span>
            <h2>{pack.name}</h2>
            <p>{singlePrice} · {versionLabel}</p>
          </section>
          <section>
            <h2>Connected records</h2>
            <ul>
              {pool[0] ? (
                <li>
                  <Link href={`/cards/${pool[0].slug}`}>
                    Open {pool[0].name}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/packs">Open all dated pack records</Link>
              </li>
              <li>
                <Link href="/updates">Check matching game updates</Link>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
