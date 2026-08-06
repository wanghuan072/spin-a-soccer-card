import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { countByVerification, mutations } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";


export function MutationsPage() {
  const community = countByVerification(mutations, "multi-source-reported");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Modifier lab"
        title="Spin a Soccer Card Mutations - Effects, Multipliers & Cards"
        description={pageTdk.mutations.description}
        meta={[
          `${mutations.length} mutation labels`,
          `${community} event listings`,
          "No invented stacking",
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Mutations" }]}
      />
      <div className={`container ${styles.content}`}>
        <aside className={styles.notice}>
          <Icon name="spark" />
          <p>
            <strong>Mutation tip:</strong> Keep stacked labels on your highest
            earner before rebirth. Open the <Link href="/cards">card list</Link>{" "}
            and compare linked mutation examples after a strong pull.
          </p>
        </aside>
        <section className={styles.section}>
          <div className={styles.indexGrid}>
            {mutations.map((mutation) => (
              <article className={styles.indexCard} key={mutation.slug}>
                <span>
                  <Icon name="spark" />
                </span>
                <StatusBadge status={mutation.verificationStatus} />
                <h2>{mutation.name}</h2>
                <p>
                  {mutation.effect} {mutation.multiplier}.
                </p>
                <Link href={`/mutations/${mutation.slug}`}>
                  View mutation <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
