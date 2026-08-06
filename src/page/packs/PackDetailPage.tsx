import Image from "next/image";
import Link from "next/link";
import { CardItem } from "@/components/common/CardItem";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  cards,
  formatNumber,
  packs,
  seeInGame,
  verificationLabel,
} from "@/lib/content";
import type { SoccerPack } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function PackDetailPage({ pack }: { pack: SoccerPack }) {
  const pool = cards.filter((card) => pack.cardSlugs.includes(card.slug));
  const previous = packs.find((item) => item.order === pack.order - 1);
  const next = packs.find((item) => item.order === pack.order + 1);
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
      : pack.availability.replace(/-/g, " ");
  const hasPriceMetrics =
    pack.cost !== null || pack.bundleCost !== null || pack.stockPerRefresh !== null;
  let sectionNo = 1;
  const nextSection = () => String(sectionNo++).padStart(2, "0");
  return (
    <main id="main-content">
      <PageHero
        eyebrow={
          pack.availability === "historical"
            ? "Older pack guide"
            : "Pack shop guide"
        }
        title={`Spin a Soccer Card ${pack.name} - Cost, Cards & Requirements`}
        description={pack.seo.description}
        meta={[
          versionLabel,
          `${pool.length} known cards`,
          `Checked ${pack.source.observedAt}`,
        ]}
        image={pack.image}
        imageAlt={`${pack.name} artwork`}
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
                priority
                sizes="(max-width:768px) 100vw,420px"
              />
              <span className={styles.artStamp}>
                #{String(pack.order).padStart(2, "0")}
                <small>PACK</small>
              </span>
            </div>
            <div className={styles.facts}>
              <StatusBadge status={pack.verificationStatus} />
              <p className={styles.kicker}>{versionLabel}</p>
              <h2>Spin a Soccer Card {pack.name} details</h2>
              <dl>
                {pack.cost !== null ? (
                  <div>
                    <dt>Pack cost</dt>
                    <dd>
                      {formatNumber(
                        pack.cost,
                        pack.currency === "Cash" ? "$" : "",
                      )}
                      {pack.currency && pack.currency !== "Cash"
                        ? ` ${pack.currency}`
                        : null}
                    </dd>
                  </div>
                ) : null}
                {pack.currency && pack.cost === null ? (
                  <div>
                    <dt>Currency</dt>
                    <dd>{pack.currency}</dd>
                  </div>
                ) : null}
                {pack.rebirthRequirement !== null ? (
                  <div>
                    <dt>Rebirth gate</dt>
                    <dd>
                      {pack.rebirthRequirement === 0
                        ? "No rebirth gate"
                        : `Rebirth ${pack.rebirthRequirement}`}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt>Highest label</dt>
                  <dd>{pack.highestRarity}</dd>
                </div>
                {pack.stockPerRefresh !== null ? (
                  <div>
                    <dt>Stock shown</dt>
                    <dd>{pack.stockPerRefresh}</dd>
                  </div>
                ) : null}
                {pack.bundleCost ? (
                  <div>
                    <dt>Bundle</dt>
                    <dd>
                      {pack.bundleQuantity ?? "?"} for {pack.bundleCost} Robux
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt>Known cards</dt>
                  <dd>{pool.length}</dd>
                </div>
                {pack.cardCount !== null ? (
                  <div>
                    <dt>Claimed pool size</dt>
                    <dd>{pack.cardCount}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>{nextSection()}</span>
              <div>
                <h2>Economy and access</h2>
                <p>Shop prices and access rules shown for this game build.</p>
              </div>
            </div>
            {hasPriceMetrics ? (
              <div className={styles.metricRow}>
                {pack.cost !== null ? (
                  <article>
                    <span>Single-pack price</span>
                    <strong>
                      {formatNumber(
                        pack.cost,
                        pack.currency === "Cash" ? "$" : "",
                      )}
                    </strong>
                    <small>{pack.currency ?? seeInGame}</small>
                  </article>
                ) : null}
                {pack.bundleCost ? (
                  <article>
                    <span>Bundle price</span>
                    <strong>{pack.bundleCost} R$</strong>
                    <small>
                      {unitBundleCost
                        ? `${unitBundleCost.toFixed(1)} Robux per pack`
                        : "Robux bundle"}
                    </small>
                  </article>
                ) : null}
                <article>
                  <span>Availability</span>
                  <strong>{versionLabel}</strong>
                  <small>
                    {pack.stockPerRefresh === null
                      ? seeInGame
                      : `${pack.stockPerRefresh} shown per refresh`}
                  </small>
                </article>
              </div>
            ) : null}
            <div className={styles.note}>
              <strong>Unlock requirement</strong>
              <p>{pack.unlockRequirement}</p>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>{nextSection()}</span>
              <div>
                <h2>Known Spin a Soccer Card pulls from {pack.name}</h2>
                <p>
                  Every card below has its own page; this is not presented as a
                  complete pull pool.
                </p>
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
                        ? `${pool.length} of ${pack.cardCount} listed pool slots known`
                        : `${pool.length} readable pulls; complete pool size unknown`}
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
                <strong>No card list yet.</strong>
                <p>
                  The pack name or artwork is available, but no card names are
                  clear enough to publish.
                </p>
              </div>
            )}
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>{nextSection()}</span>
              <div>
                <h2>Pack status</h2>
                <p>When this Shop row was last checked.</p>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>{verificationLabel(pack.verificationStatus)}</td>
                  </tr>
                  <tr>
                    <th>Last checked</th>
                    <td>{pack.source.observedAt}</td>
                  </tr>
                  <tr>
                    <th>Availability</th>
                    <td>{pack.availability.replace(/-/g, " ")}</td>
                  </tr>
                  <tr>
                    <th>Unlock note</th>
                    <td>{pack.unlockRequirement}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{String(pack.order).padStart(2, "0")}</span>
            <h2>{pack.name}</h2>
            <p>
              Compare Cash cost with your current EPS, then open Odds before a
              big spend.
            </p>
          </section>
          <section>
            <h2>Nearby packs</h2>
            <ul>
              {previous ? (
                <li>
                  <Link href={`/packs/${previous.slug}`}>
                    Previous: {previous.name}
                  </Link>
                </li>
              ) : null}
              {next ? (
                <li>
                  <Link href={`/packs/${next.slug}`}>Next: {next.name}</Link>
                </li>
              ) : null}
              {pool[0] ? (
                <li>
                  <Link href={`/cards/${pool[0].slug}`}>
                    {pool[0].name} from this pack
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
