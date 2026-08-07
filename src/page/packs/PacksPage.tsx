import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { PackItem } from "@/components/common/PackItem";
import { Icon } from "@/components/common/Icon";
import { packs } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function PacksPage() {
  const dated = packs.filter((pack) => pack.availability !== "historical");
  const historical = packs.filter((pack) => pack.availability === "historical");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Pack shop database"
        title="Spin a Soccer Card Packs - Costs, Cards & Unlocks"
        description={pageTdk.packs.description}
        meta={[
          `${dated.length} dated Shop or reward records`,
          `${historical.length} archive packs`,
          "Odds shown in-game",
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Packs" }]}
      />
      <div className={`container ${styles.content}`}>
        <aside className={styles.notice} id="details">
          <Icon name="pack" />
          <p>
            <strong>Shop tip:</strong> Read Cash cost, stock count, Robux
            bundle and Odds on every row before buying. Pair packs with the{" "}
            <Link href="/rebirths">Rebirth guide</Link> so you unlock the next
            tier instead of overspending early.
          </p>
        </aside>
        <section className={styles.section} id="progression">
          <div className={styles.heading}>
            <div>
              <h2>Recent Spin a Soccer Card Shop and reward records</h2>
              <p>
                These rows were readable in the July 30 game window. They are
                dated Shop records, not a promise that the same stock, price or
                calendar reward remains active after later updates.
              </p>
            </div>
          </div>
          <div className={styles.packsGrid}>
            {dated.map((pack) => (
              <PackItem key={pack.slug} pack={pack} />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Earlier Spin a Soccer Card pack rotations</h2>
              <p>
                Older Shop and event packs such as Lucid and Nightmare are kept
                only when a pack name, price or opening is visible in gameplay.
              </p>
            </div>
          </div>
          <div className={styles.packsGrid}>
            {historical.map((pack) => (
              <PackItem key={pack.slug} pack={pack} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
