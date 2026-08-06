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
          "Reviewed Aug 6, 2026",
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
      </div>
    </main>
  );
}
