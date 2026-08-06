import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { ValueTable } from "@/components/common/ValueTable";
import {
  cards,
  formatDate,
  formatNumber,
  tradeObservations,
} from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function ValuesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Community value guide"
        title="Spin a Soccer Card Value - Card Values & Trade Guide"
        description={pageTdk.values.description}
        meta={[
          "Last reviewed Aug 4, 2026",
          `${tradeObservations.length} dated transactions`,
          "Blank values are intentional",
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Values" }]}
      />
      <div className={`container ${styles.content}`}>
        <aside className={styles.notice}>
          <Icon name="check" />
          <p>
            <strong>Trading tip:</strong> Match rating, mutation and currency
            before you accept. Compare the dated observations below with the
            complete card variant before accepting a booth offer.
          </p>
        </aside>

        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Spin a Soccer Card value list</h2>
              <p>
                Income appears only where a current plot label was readable. No
                value, previous value or trend is generated from artwork or
                rarity.
              </p>
            </div>
            <Link href="/cards">Open all card details</Link>
          </div>
          <ValueTable cards={cards} />
        </section>

        <section className={styles.section} id="trade-history">
          <div className={styles.heading}>
            <div>
              <h2>Spin a Soccer Card trade history</h2>
              <p>
                These are historical transaction descriptions kept separate from
                the current card database.
              </p>
            </div>
          </div>
          <div className={styles.codeList}>
            {tradeObservations.map((trade) => (
              <article key={trade.id}>
                <div>
                  <strong>
                    {trade.variant} {trade.cardName}
                  </strong>
                  <small>{formatDate(trade.observedAt)}</small>
                </div>
                <p>
                  {formatNumber(trade.amount)} {trade.currency}
                </p>
                <small>{trade.interpretation}</small>
                <Link href={trade.source.url} target="_blank" rel="noreferrer">
                  View transaction <Icon name="arrow" size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>How to compare Spin a Soccer Card card values</h2>
              <p>
                Note the complete variant, confirm a completed trade, keep the
                same currency, date it and wait for comparable deals before
                showing a range or trend.
              </p>
            </div>
          </div>
          <ol className={styles.steps}>
            <li>
              <strong>Identify</strong>
              <p>Name, rating, lower label and every mutation.</p>
            </li>
            <li>
              <strong>Confirm</strong>
              <p>Completed deal, not an unaccepted booth listing.</p>
            </li>
            <li>
              <strong>Normalize</strong>
              <p>Keep Trade Tokens, Cash and bundled cards separate.</p>
            </li>
            <li>
              <strong>Compare</strong>
              <p>Publish a range only after multiple dated matches.</p>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
