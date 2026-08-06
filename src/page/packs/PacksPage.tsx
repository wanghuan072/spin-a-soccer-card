import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { PackItem } from "@/components/common/PackItem";
import { Icon } from "@/components/common/Icon";
import { countByVerification, packs } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function PacksPage() {
  const current = packs.filter((pack) => pack.availability !== "historical");
  const historical = packs.filter((pack) => pack.availability === "historical");
  const popular = countByVerification(packs, "multi-source-reported");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Pack shop database"
        title="Spin a Soccer Card Packs - Costs, Cards & Unlocks"
        description={pageTdk.packs.description}
        meta={[
          `${current.length} current packs`,
          `${historical.length} archive packs`,
          `${popular} event packs`,
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
              <h2>Current Spin a Soccer Card packs and rewards</h2>
              <p>
                Cosmic, Ordan, Alpha and calendar rewards from the latest Shop
                check—open a pack page for stock and known pulls.
              </p>
            </div>
          </div>
          <div className={styles.packsGrid}>
            {current.map((pack) => (
              <PackItem key={pack.slug} pack={pack} />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Earlier Spin a Soccer Card pack rotations</h2>
              <p>
                Older Shop and event packs such as Lucid, Nightmare and
                Champions—useful when trading legacy cards or reading old
                guides.
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
