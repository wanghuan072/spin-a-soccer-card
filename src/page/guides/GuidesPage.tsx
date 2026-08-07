import { GuideCard } from "@/components/common/GuideCard";
import { PageHero } from "@/components/common/PageHero";
import { guides } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function GuidesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Player routes"
        title="Spin a Soccer Card Guide - Beginner & Codes"
        description={pageTdk.guides.description}
        meta={[
          `${guides.length} complete guides`,
          "Reviewed Aug 7, 2026",
          "Beginner + Codes",
        ]}
        image="/images/gameplay/shop-guide.webp"
        imageAlt="In-game Shop guide artwork for Spin a Soccer Card"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
      />
      <div className={`container ${styles.content}`}>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Two complete guides</h2>
              <p>
                Two complete routes for new players: learn the core loop, then
                redeem free packs from codes. More guides will follow.
              </p>
            </div>
          </div>
          <div className={styles.guideGrid}>
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Choose the route that matches your session</h2>
              <p>
                Start with progression when you are learning the plot economy.
                Use the code route when you already know Shop and only need a
                careful way to test a newly posted string.
              </p>
            </div>
          </div>
          <ol className={styles.steps}>
            <li>
              <strong>First session: protect your Cash loop</strong>
              <p>
                Follow the beginner chapters in order: fill plot slots, inspect
                Shop stock and Odds, sort inventory, compare live income, then
                learn what the Bank protects before a rebirth. The route avoids
                fixed pack rankings because the Shop and Index can change.
              </p>
            </li>
            <li>
              <strong>Code session: prove the result</strong>
              <p>
                Use Shop → Codes, preserve punctuation and distinguish a string
                seen in the field from a successful reward popup. Public code
                trackers frequently disagree, so the guide shows how to stop
                after a failed test instead of cycling through an undated list.
              </p>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
