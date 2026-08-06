import Image from "next/image";
import Link from "next/link";
import { CardSearch } from "@/components/common/CardSearch";
import { CodeCopyButton } from "@/components/common/CodeCopyButton";
import { Icon } from "@/components/common/Icon";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ValueTable } from "@/components/common/ValueTable";
import {
  cards,
  formatDate,
  gameSnapshot,
  guides,
  mutations,
  packs,
  rarities,
  sortCodesForDisplay,
  updates,
} from "@/lib/content";
import { JsonLd, faqSchema, websiteSchema } from "@/seo/structured-data";
import styles from "@/style/page/home/home.module.css";

const faqs = [
  {
    question: "What is Spin a Soccer Card?",
    answer:
      "Buy packs in the Shop, unpack soccer cards, place them on your plot, and earn Cash while you play or AFK. Stronger cards and better packs push your income higher before each rebirth.",
  },
  {
    question: "What is the best card right now?",
    answer:
      "Compare the income label above each equipped card on your plot. A mutated high-tier card often beats a higher rarity with no mutation—check your live Index before chasing older names.",
  },
  {
    question: "How do I get better cards?",
    answer:
      "Keep every plot slot filled, farm Cash into the next Shop tier, and open the Odds panel before big spends. Free packs from codes and Spin Wheel spins also help.",
  },
  {
    question: "How do mutations work?",
    answer:
      "Mutations roll when you pull a card and stack with its rarity label. Labels like Misprint, Frozen, Venomous or Divine can multiply income—keep the best stacks in your Bank before rebirth.",
  },
  {
    question: "What happens when I rebirth?",
    answer:
      "Rebirth resets cash and plot cards for permanent income boosts and higher pack unlocks. The current game goes up through Rebirth 19, so always read the live panel requirements.",
  },
  {
    question: "How do I save cards before rebirth?",
    answer:
      "Open the Card Bank (available from Rebirth 2 onward in most builds), stash your top earner, then confirm the reset warning so you do not wipe a mutated card by mistake.",
  },
  {
    question: "How do I trade cards?",
    answer:
      "Travel to the official Trade World, inspect every offer slot, mutation and Trade Token amount, then accept only when the full deal matches what you want.",
  },
  {
    question: "Where are new codes released?",
    answer:
      "Join the Pixellar Studios group, finish at least 2 Rebirths, then redeem weekly codes in Shop. Fresh drops usually land in the Community Server or Discord first.",
  },
];

const statIcons = ["cards", "pack", "spark", "clock"] as const;

export function HomePage() {
  return (
    <main id="main-content" className={styles.page}>
      <JsonLd data={[websiteSchema(), faqSchema(faqs)]} />

      <section className={styles.hero}>
        <Image
          className={styles.heroBackdrop}
          src="/images/official/game-thumbnail-1.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Roblox soccer card wiki</p>
            <h1 className={styles.heroTitle}>
              <span>Spin a Soccer Card -</span>
              <span>Cards, Packs &amp; Codes</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Find card ratings, pack costs, working codes and rebirth routes
              for today&apos;s game
            </p>
            <p className={styles.lead}>
              Open packs smarter, bank the right cards before rebirth, and check
              live Shop stock before you spend Cash or Robux.
            </p>
            <div className={styles.heroActions}>
              <Link href="/cards">
                <Icon name="cards" /> Browse Cards
              </Link>
              <Link href="/codes">
                <Icon name="spark" /> Latest Codes
              </Link>
              <Link href="/packs">
                <Icon name="pack" /> Pack Shop
              </Link>
            </div>
            <ul className={styles.trustList}>
              <li>
                <Icon name="check" size={15} /> Live Shop &amp; pack prices
              </li>
              <li>
                <Icon name="database" size={15} /> Card Index &amp; mutations
              </li>
              <li>
                <Icon name="spark" size={15} /> Weekly codes to redeem
              </li>
            </ul>
          </div>

          <div
            className={styles.heroShowcase}
            aria-label="Official Spin a Soccer Card promotional artwork"
          >
            <article className={`${styles.heroCard} ${styles.rocainoCard}`}>
              <Image
                src="/images/official/game-thumbnail-3.webp"
                alt="Official promotional art featuring Rocaino"
                fill
                sizes="190px"
              />
              <span className={styles.heroRating}>
                115<small>2026</small>
              </span>
              <div>
                <strong>Rocaino</strong>
                <small>Official promo</small>
              </div>
            </article>
            <article className={`${styles.heroCard} ${styles.rovasoCard}`}>
              <Image
                src="/images/official/game-thumbnail-1.webp"
                alt="Official promotional art featuring Rovaso"
                fill
                sizes="220px"
              />
              <span className={styles.heroRating}>
                115<small>2026</small>
              </span>
              <div>
                <strong>Rovaso</strong>
                <small>Official promo</small>
              </div>
            </article>
            <article className={`${styles.heroCard} ${styles.wheelCard}`}>
              <Image
                src="/images/evidence/card-alverton.webp"
                alt="Gameplay capture of 109-rated Frozen Alverton"
                fill
                sizes="180px"
              />
              <span className={styles.heroRating}>
                109<small>GK</small>
              </span>
              <div>
                <strong>Alverton</strong>
                <small>Frozen · Exclusive</small>
              </div>
            </article>
            <Link className={styles.packPromo} href="/packs/transcendent-pack">
              <Image
                src="/images/evidence/pack-transcendent.webp"
                alt="Transcendent Pack shown in current gameplay"
                fill
                sizes="180px"
              />
              <span>
                <small>PACK DATABASE</small>
                <strong>Choose your next pack</strong>
              </span>
            </Link>
            <Link
              className={styles.wheelPromo}
              href="/guides/codes-redemption-guide"
              aria-label="Open the Codes Guide"
            >
              <Image
                src="/images/official/game-thumbnail-2.webp"
                alt=""
                fill
                sizes="150px"
              />
              <span>SPIN</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.statsSection} aria-label="Database status">
        <div className={`container ${styles.stats}`}>
          {gameSnapshot.stats.map((stat, index) => (
            <article key={stat.label}>
              <span>
                <Icon name={statIcons[index]} size={24} />
              </span>
              <div>
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
                <small>{stat.note}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dashboard}>
        <div className={`container ${styles.dashboardGrid}`}>
          <div className={styles.dashboardColumn}>
            <section className={`${styles.panel} ${styles.finderPanel}`}>
              <div className={styles.panelHeading}>
                <div>
                  <span>Find ratings, packs and mutations</span>
                  <h2>Card Finder</h2>
                </div>
                <Link href="/cards">
                  View all <Icon name="arrow" size={15} />
                </Link>
              </div>
              <CardSearch cards={cards.slice(0, 8)} compact />
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeading}>
                <div>
                  <span>Build a better route</span>
                  <h2>Guides</h2>
                </div>
                <Link href="/guides">
                  All guides <Icon name="arrow" size={15} />
                </Link>
              </div>
              <div className={styles.guideStrip}>
                {guides.slice(0, 5).map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                    <span className={styles.guideImage}>
                      <Image src={guide.image} alt="" fill sizes="150px" />
                    </span>
                    <strong>{guide.title}</strong>
                    <small>{guide.category}</small>
                  </Link>
                ))}
              </div>
            </section>

          </div>

          <div className={styles.dashboardColumn}>
            <section className={styles.panel} id="progression">
              <div className={styles.panelHeading}>
                <div>
                  <span>Cash cost, stock and Robux bundles</span>
                  <h2>Pack Finder</h2>
                </div>
                <Link href="/packs">
                  All packs <Icon name="arrow" size={15} />
                </Link>
              </div>
              <div className={styles.packRoute}>
                {packs.slice(0, 6).map((pack, index) => (
                  <div className={styles.packStep} key={pack.slug}>
                    <Link href={`/packs/${pack.slug}`} data-order={pack.order}>
                      <span>
                        <Image src={pack.image} alt="" fill sizes="86px" />
                      </span>
                      <strong>{pack.name}</strong>
                      <small>
                        {pack.availability === "historical"
                          ? "HISTORICAL"
                          : "SEEN IN GAME"}
                      </small>
                    </Link>
                    {index < 5 && <Icon name="arrow" size={20} />}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeading}>
                <div>
                  <span>Plot income and Trade Token deals</span>
                  <h2>Value List</h2>
                </div>
                <Link href="/values">
                  Open values <Icon name="arrow" size={15} />
                </Link>
              </div>
              <p className={styles.panelNotice}>
                Compare plot income first, then review the dated{" "}
                <Link href="/values">Spin a Soccer Card value guide</Link>{" "}
                before accepting a booth offer.
              </p>
              <ValueTable cards={cards.slice(0, 8)} compact />
            </section>

            <div className={styles.systemGrid}>
              <section className={styles.panel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span>Card tiers</span>
                    <h2>Rarities</h2>
                  </div>
                  <Link href="/rarities">
                    Open <Icon name="arrow" size={15} />
                  </Link>
                </div>
                <div className={styles.rarityRail}>
                  {rarities.map((rarity) => (
                    <Link
                      key={rarity.slug}
                      href={`/rarities/${rarity.slug}`}
                      data-color={rarity.color}
                    >
                      <span>{rarity.name.slice(0, 1)}</span>
                      <small>{rarity.name}</small>
                    </Link>
                  ))}
                </div>
              </section>
              <section className={styles.panel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span>Labels on current pulls</span>
                    <h2>Mutations</h2>
                  </div>
                  <Link href="/mutations">
                    Open <Icon name="arrow" size={15} />
                  </Link>
                </div>
                <div className={styles.mutationList}>
                  {mutations.slice(0, 6).map((mutation) => (
                    <Link
                      key={mutation.slug}
                      href={`/mutations/${mutation.slug}`}
                      data-color={mutation.color}
                    >
                      <Icon name="spark" size={18} />
                      <span>
                        <strong>{mutation.name}</strong>
                        <small>{mutation.multiplier}</small>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="container">
          <section className={`${styles.panel} ${styles.codesBand}`}>
            <div className={styles.panelHeading}>
              <div>
                <span>Redeem in Shop after 2 Rebirths</span>
                <h2>Latest Codes</h2>
              </div>
              <Link href="/codes">
                Code log <Icon name="arrow" size={15} />
              </Link>
            </div>
            <div className={styles.codeRows}>
              {sortCodesForDisplay()
                .filter((entry) => entry.status !== "expired")
                .slice(0, 3)
                .map((entry) => (
                  <article key={entry.code}>
                    <div>
                      <div className={styles.codeHead}>
                        <StatusBadge status={entry.status} />
                        <code>{entry.code}</code>
                      </div>
                      <small>{entry.reward}</small>
                    </div>
                    <CodeCopyButton code={entry.code} />
                  </article>
                ))}
            </div>
          </section>
        </div>

        <div className={`container ${styles.lowerGrid}`}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <span>Roster and code changes</span>
                <h2>Latest Updates</h2>
              </div>
              <Link href="/updates">
                Update log <Icon name="arrow" size={15} />
              </Link>
            </div>
            <div className={styles.updateRows}>
              {updates.slice(0, 3).map((update) => (
                <Link key={update.slug} href={`/updates/${update.slug}`}>
                  <span className={styles.updateImage}>
                    <Image src={update.image} alt="" fill sizes="220px" />
                  </span>
                  <div>
                    <StatusBadge status={update.verificationStatus} />
                    <strong>{update.title}</strong>
                    <small>
                      {formatDate(update.date)} · {update.version}
                    </small>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <span>Fast player answers</span>
                <h2>Frequently Asked Questions</h2>
              </div>
              <Link href="/guides">
                More guides <Icon name="arrow" size={15} />
              </Link>
            </div>
            <div className={styles.faqGrid}>
              {faqs.map((faq) => (
                <article key={faq.question}>
                  <span>?</span>
                  <div>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
