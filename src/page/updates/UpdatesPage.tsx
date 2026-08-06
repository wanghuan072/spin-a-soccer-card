import { PageHero } from "@/components/common/PageHero";
import { UpdateCard } from "@/components/common/UpdateCard";
import { updates } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function UpdatesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Change log"
        title="Spin a Soccer Card Updates - New Cards, Packs & Changes"
        description={pageTdk.updates.description}
        meta={[
          `${updates.length} dated updates`,
          "Roblox and community details separated",
          "No copied Discord posts",
        ]}
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
            {updates.map((update) => (
              <UpdateCard key={update.slug} update={update} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
