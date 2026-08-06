import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/content";
import type { GameUpdate } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function UpdateDetailPage({ update }: { update: GameUpdate }) {
  const changeRows = [
    ["New cards", update.newCards],
    ["New packs", update.newPacks],
    ["Code changes", update.codeChanges],
    ["Balance changes", update.balanceChanges],
    ["Event state", update.eventStatus],
  ];
  const captured = changeRows.filter(
    ([, value]) =>
      !value.toLowerCase().includes("not captured") &&
      !value.toLowerCase().includes("no "),
  ).length;
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Version change guide"
        title={`Spin a Soccer Card ${update.title} Update`}
        description={update.seo.description}
        meta={[
          formatDate(update.date),
          update.version,
          `${captured} populated change groups`,
        ]}
        image={update.image}
        imageAlt={update.imageAlt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Updates", href: "/updates" },
          { label: update.title },
        ]}
      />
      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section>
            <StatusBadge status={update.verificationStatus} />
            <div className={styles.metricRow}>
              <article>
                <span>Build label</span>
                <strong>{update.version}</strong>
                <small>{update.eventStatus}</small>
              </article>
              <article>
                <span>Update date</span>
                <strong>{formatDate(update.date)}</strong>
                <small>Not a permanent current-state claim</small>
              </article>
              <article>
                <span>Change groups</span>
                <strong>{captured}/5</strong>
                <small>Details readable for this build</small>
              </article>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div>
                <h2>Spin a Soccer Card player-facing changes</h2>
                <p>
                  Each line describes something shown for this dated game build.
                </p>
              </div>
            </div>
            <div className={styles.recordLinks}>
              {update.details.map((detail, index) => (
                <article key={detail}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div>
                <h2>Change matrix</h2>
                <p>
                  Cards, packs, codes, balance and event state are kept in
                  separate fields.
                </p>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>System</th>
                    <th>Change shown</th>
                  </tr>
                </thead>
                <tbody>
                  {changeRows.map(([label, value]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>04</span>
              <div>
                <h2>Update context</h2>
                <p>What this page covers and what can still change.</p>
              </div>
            </div>
            <p>{update.summary}</p>
            <Link
              className={styles.sourceLink}
              href={update.source.url}
              target="_blank"
              rel="noreferrer"
            >
              Open related page <Icon name="arrow" size={16} />
            </Link>
          </section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{captured}</span>
            <h2>Change groups</h2>
            <p>Populated fields from five tracked systems.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
