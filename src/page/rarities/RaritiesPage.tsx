import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { rarities } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function RaritiesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Current label index"
        title="Spin a Soccer Card Rarities - Card & Pack Tier Guide"
        description={pageTdk.rarities.description}
        meta={[
          `${rarities.length} in-game labels`,
          "Card and pack tiers separated",
          "No income ranges invented",
        ]}
        image="/images/evidence/current-card-inventory.webp"
        imageAlt="In-game card inventory showing current card labels"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Rarities" }]}
      />
      <div className={`container ${styles.content}`}>
        <section className={styles.section}>
          <div className={styles.indexGrid}>
            {rarities.map((rarity) => (
              <article className={styles.indexCard} key={rarity.slug}>
                <span>{rarity.name[0]}</span>
                <StatusBadge status={rarity.verificationStatus} />
                <h2>{rarity.name}</h2>
                <p>
                  {rarity.description} {rarity.effect}
                </p>
                <Link href={`/rarities/${rarity.slug}`}>
                  View label <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <aside className={styles.notice}>
          <Icon name="cards" />
          <p>
            <strong>Label tip:</strong> Rarity and mutation stack separately.
            After you learn a tier, browse matching{" "}
            <Link href="/cards">cards</Link> or open the{" "}
            <Link href="/mutations">mutation list</Link> to plan what to keep on
            your plot.
          </p>
        </aside>
      </div>
    </main>
  );
}
