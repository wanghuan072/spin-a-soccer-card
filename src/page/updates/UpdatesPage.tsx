import { PageHero } from "@/components/common/PageHero";
import { UpdateCard } from "@/components/common/UpdateCard";
import { updates } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function UpdatesPage() {
  const orderedUpdates = [...updates].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Change log"
        title="Spin a Soccer Card Updates - New Cards, Packs & Changes"
        description={pageTdk.updates.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Updates" }]}
      />
      <div className={`container ${styles.content}`}>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Latest Spin a Soccer Card updates</h2>
              <p>
                Each entry explains what is known, what changed and what players
                should still check in the live game.
              </p>
            </div>
          </div>
          <div className={styles.updateGrid}>
            {orderedUpdates.map((update, index) => (
              <UpdateCard
                key={update.slug}
                update={update}
                sequence={index + 1}
                featured={index === 0}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
