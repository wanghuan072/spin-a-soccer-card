import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, packs, rebirths, verificationLabel } from "@/lib/content";
import type { Rebirth } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function RebirthDetailPage({ rebirth }: { rebirth: Rebirth }) {
  const previous = rebirths
    .filter((item) => item.level < rebirth.level)
    .sort((a, b) => b.level - a.level)[0];
  const next = rebirths
    .filter((item) => item.level > rebirth.level)
    .sort((a, b) => a.level - b.level)[0];
  const unlockedPacks = packs.filter(
    (pack) => pack.rebirthRequirement === rebirth.level,
  );
  const image =
    rebirth.level >= 2 && rebirth.level <= 5
      ? `/images/video/rebirth-${rebirth.level}-panel.webp`
      : "/images/evidence/blackmoon-update-panel.webp";
  return (
    <main id="main-content">
      <PageHero
        eyebrow={`Rebirth ${rebirth.level} progression guide`}
        title={`Spin a Soccer Card Rebirth ${rebirth.level} - Requirements & Unlocks`}
        description={rebirth.seo.description}
        meta={[
          `${rebirth.unlocks.length} known unlocks`,
          `${unlockedPacks.length} linked packs`,
          `Checked ${formatDate(rebirth.source.observedAt)}`,
        ]}
        image={image}
        imageAlt={`${rebirth.title} panel in Spin a Soccer Card`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Rebirths", href: "/rebirths" },
          { label: rebirth.title },
        ]}
      />
      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section>
            <StatusBadge status={rebirth.verificationStatus} />
            <div className={styles.metricRow}>
              <article>
                <span>Milestone</span>
                <strong>R{rebirth.level}</strong>
                <small>{rebirth.title}</small>
              </article>
              <article>
                <span>Known unlocks</span>
                <strong>{rebirth.unlocks.length}</strong>
                <small>Readable milestone notes</small>
              </article>
              <article>
                <span>Linked packs</span>
                <strong>{unlockedPacks.length}</strong>
                <small>Exact rebirthRequirement matches</small>
              </article>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div>
                <h2>
                  Spin a Soccer Card Rebirth {rebirth.level} requirements
                </h2>
                <p>
                  Version-specific requirement text, including known conflicts.
                </p>
              </div>
            </div>
            <div className={styles.split}>
              <div>
                <h3>Requirement shown</h3>
                <p>{rebirth.requirement}</p>
              </div>
              <div>
                <h3>Version boundary</h3>
                <p>
                  Requirements can change between updates. The confirmation
                  panel in your current server takes priority over this date.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div>
                <h2>
                  Spin a Soccer Card Rebirth {rebirth.level} unlocks
                </h2>
                <p>Only rewards readable for this game build are listed.</p>
              </div>
            </div>
            <div className={styles.recordLinks}>
              {rebirth.unlocks.map((unlock, index) => (
                <article key={unlock}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{unlock}</p>
                </article>
              ))}
            </div>
            {unlockedPacks.length ? (
              <div className={styles.recordLinks}>
                {unlockedPacks.map((pack) => (
                  <Link key={pack.slug} href={`/packs/${pack.slug}`}>
                    <span>{pack.name}</span>
                    <small>
                      {pack.highestRarity} · {pack.availability}
                    </small>
                    <Icon name="arrow" size={15} />
                  </Link>
                ))}
              </div>
            ) : null}
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>04</span>
              <div>
                <h2>Strategy and timing</h2>
                <p>
                  How to use this milestone without treating it as permanent.
                </p>
              </div>
            </div>
            <p>{rebirth.strategy}</p>
            <div className={styles.tableWrap}>
              <table>
                <tbody>
                  <tr>
                    <th>Page status</th>
                    <td>{verificationLabel(rebirth.verificationStatus)}</td>
                  </tr>
                  <tr>
                    <th>Last checked</th>
                    <td>{formatDate(rebirth.source.observedAt)}</td>
                  </tr>
                  <tr>
                    <th>Page or video</th>
                    <td>{rebirth.source.label}</td>
                  </tr>
                  <tr>
                    <th>Page ID</th>
                    <td>{rebirth.slug}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link
              className={styles.sourceLink}
              href={rebirth.source.url}
              target="_blank"
              rel="noreferrer"
            >
              Open original panel <Icon name="arrow" size={16} />
            </Link>
          </section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>R{rebirth.level}</span>
            <h2>Progression point</h2>
            <p>Dated milestone, not a full current rebirth ladder.</p>
          </section>
          <section>
            <h2>Nearby rebirths</h2>
            <ul>
              {previous ? (
                <li>
                  <Link href={`/rebirths/${previous.slug}`}>
                    Previous: {previous.title}
                  </Link>
                </li>
              ) : null}
              {next ? (
                <li>
                  <Link href={`/rebirths/${next.slug}`}>
                    Next: {next.title}
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
