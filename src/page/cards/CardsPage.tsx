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
  const historical = countByVerification(cards, "historical-record");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Player card database"
        title="Spin a Soccer Card Cards - Details, Ratings & Index"
        description={pageTdk.cards.description}
        meta={[
          `${cards.length} dated card records`,
          `${official + gameplay} official or recent captures`,
          `${historical} dated pulls`,
          "1,300 index slots seen Aug 3",
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cards" }]}
      />
      <div className={`container ${styles.content}`}>
        <aside className={styles.notice}>
          <Icon name="cards" />
          <p>
            <strong>Coverage note:</strong> The August 3 card inventory showed
            1,300 index slots. This page contains only card faces that can be
            read in official media or dated gameplay; it is not presented as a
            complete 1,300-card list. Sort by rating or recorded income, then
            open a card for its exact game window. Jump to{" "}
            <Link href="/packs">Packs</Link> for Shop costs or{" "}
            <Link href="/codes">Codes</Link> for free pulls.
          </p>
        </aside>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Find Spin a Soccer Card card details</h2>
              <p>
                Filter the dated records by label, pack, mutation, position
                and game version. Recorded income is tied to the displayed copy
                and may include mutations, trophies, weather or account boosts.
              </p>
            </div>
          </div>
          <CardSearch cards={cards} initialFilters={initialFilters} />
        </section>
      </div>
    </main>
  );
}
