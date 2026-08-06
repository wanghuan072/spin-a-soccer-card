import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { gamepasses } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/directory/directory.module.css";

export function GamepassesPage() {
  const onSale = gamepasses.filter((item) => item.isForSale);
  const unavailable = gamepasses.filter((item) => !item.isForSale);
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Official product database"
        title="Spin a Soccer Card Game Passes - Prices, Perks & Sale Status"
        description={pageTdk.gamepasses.description}
        meta={[
          `${gamepasses.length} official products`,
          `${onSale.length} on sale`,
          `${unavailable.length} unavailable`,
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Game Passes" }]}
      />
      <div className={`container ${styles.content}`}>
        <aside className={styles.notice}>
          <Icon name="spark" />
          <p>
            <strong>Pass tip:</strong> Mutation Luck and Auto Collect help long
            AFK sessions. Pair paid luck with free{" "}
            <Link href="/codes">codes</Link> and the{" "}
            <Link href="/guides/beginner-guide">beginner guide</Link> before you
            spend Robux.
          </p>
        </aside>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Spin a Soccer Card game passes currently for sale</h2>
              <p>
                Product artwork, IDs, prices and states were read from the
                official universe game-pass endpoint on August 4, 2026.
              </p>
            </div>
          </div>
          <div className={styles.gamepassGrid}>
            {onSale.map((item) => (
              <article className={styles.gamepassCard} key={item.id}>
                <div className={styles.gamepassImage}>
                  <Image
                    src={item.image}
                    alt={`${item.name} official game-pass icon`}
                    fill
                    sizes="(max-width: 768px) 42vw, 180px"
                  />
                </div>
                <div>
                  <span>{item.price} ROBUX</span>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <small>
                    Pass ID {item.id} · API updated {item.updatedAt}
                  </small>
                  <Link href={item.source.url} target="_blank" rel="noreferrer">
                    View on Roblox <Icon name="arrow" size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <div>
              <h2>Unavailable Spin a Soccer Card game passes</h2>
              <p>
                Kept as an older Roblox product entry and not shown as
                purchasable today.
              </p>
            </div>
          </div>
          <div className={styles.gamepassGrid}>
            {unavailable.map((item) => (
              <article className={styles.gamepassCard} key={item.id}>
                <div className={styles.gamepassImage}>
                  <Image
                    src={item.image}
                    alt={`${item.name} official game-pass icon`}
                    fill
                    sizes="180px"
                  />
                </div>
                <div>
                  <span>NOT FOR SALE</span>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <small>
                    Pass ID {item.id} · API updated {item.updatedAt}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
