import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { rebirths } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";


export function RebirthsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Rebirth progression guide"
        title="Spin a Soccer Card Rebirths - Requirements, Unlocks & Tips"
        description={pageTdk.rebirths.description}
        meta={[
          `${rebirths.length} dated milestones`,
          "Includes Rebirth 18–19 era notes",
          "Price drift preserved",
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Rebirths" }]}
      />
      <div className={`container ${styles.content}`}>
        <section className={styles.section}>
          <div className={styles.indexGrid}>
            {rebirths.map((rebirth) => (
              <article className={styles.indexCard} key={rebirth.slug}>
                <span>{rebirth.level}</span>
                <StatusBadge status={rebirth.verificationStatus} />
                <h2>{rebirth.title}</h2>
                <p>{rebirth.requirement}</p>
                <Link href={`/rebirths/${rebirth.slug}`}>
                  Open milestone <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <aside className={styles.notice}>
          <Icon name="clock" />
          <p>
            <strong>Before you reset:</strong> Bank your best card, confirm the
            live requirement panel, then plan the first{" "}
            <Link href="/packs">pack buy</Link> after rebirth. Read the{" "}
            <Link href="/guides/beginner-guide">beginner guide</Link> if you are
            new to banking cards before a reset.
          </p>
        </aside>
      </div>
    </main>
  );
}
