import Link from "next/link";
import {
  CardSearch,
  type CardSearchInitialFilters,
} from "@/components/common/CardSearch";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { cards, countByVerification } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function CardsPage({
  initialFilters = {},
}: {
  initialFilters?: CardSearchInitialFilters;
}) {
  const official = countByVerification(cards, "official-source");
  const gameplay = countByVerification(cards, "gameplay-verified");
  const popular = countByVerification(cards, "multi-source-reported");
  const historical = countByVerification(cards, "historical-record");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Player card database"
        title="Spin a Soccer Card Cards - Details, Ratings & Index"
        description={pageTdk.cards.description}
        meta={[
          `${cards.length} cards tracked`,
          `${official + gameplay} current builds`,
          `${popular} popular targets`,
          `${historical} older pulls`,
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cards" }]}
      />
      <div className={`container ${styles.content}`}>
        <aside className={styles.notice}>
          <Icon name="cards" />
          <p>
            <strong>Quick tip:</strong> Sort by rating or income, then open a
            card to see its pack route, mutations and rebirth value. Jump to{" "}
            <Link href="/packs">Packs</Link> for Shop costs or{" "}
            <Link href="/codes">Codes</Link> for free pulls.
          </p>
        </aside>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Find Spin a Soccer Card card details</h2>
              <p>
                Filter by rarity, pack, mutation, position and game version.
                URL links keep your filters ready when you share a page.
              </p>
            </div>
          </div>
          <CardSearch cards={cards} initialFilters={initialFilters} />
        </section>
      </div>
    </main>
  );
}
