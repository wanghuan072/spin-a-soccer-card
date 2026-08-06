import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import {
  cards,
  codes,
  countByVerification,
  formatDate,
  formatNumber,
  gameSnapshot,
  mutations,
  packs,
  rebirths,
} from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/research/research.module.css";

const videos = [
  ["Mar 9", "Noob to Pro", "Bank, Rebirth 2–5 and early packs", "p6aR7xHqjwQ"],
  [
    "Apr 2",
    "125 Oracle Packs",
    "Historical Index and mutation tabs",
    "bOCz4Vmme04",
  ],
  [
    "Apr 15",
    "Crazy Luck",
    "Crafting, trophies and Rebirth 4 drift",
    "SIaYH2816I8",
  ],
  ["May 4", "Update 8", "Update panel, Wish and signed cards", "XmpK31r9vpk"],
  ["Jun 10", "Rarest Card", "Late-spring card list", "zx0XRv9S0q8"],
  [
    "Jun 17",
    "I Got Messi",
    "Weather, shop and 12 mutation labels",
    "qBYB37l8HZ8",
  ],
  ["Jun 20", "Best Trade", "Trade interface and value behavior", "cZXNuLYTbS4"],
  [
    "Jul 4",
    "Summer Update 16",
    "Aqua, Tournament Shop and Galactic",
    "mCLA9zs7fR0",
  ],
  [
    "Jul 5",
    "Scarlet Pack",
    "11 readable pulls and BLAZE-STORM result",
    "fAM7LxYD0t0",
  ],
  [
    "Jul 16",
    "285 Nightmare Packs",
    "Lucid, Nightmare and late mutations",
    "jd0A6J6uDmY",
  ],
  ["Jul 22", "Trade Tokens", "Booths, tax and direct offers", "jwJixWis6t8"],
  [
    "Jul 30",
    "Return Update",
    "Blackmoon, Rebirth 19 and WEAREBACK",
    "ZvTLThC_xqA",
  ],
  ["Aug 2", "Wish Opening", "Wish board and HERO-CRYSTAL", "m6L8YLl3zsU"],
  [
    "Aug 3",
    "Blackmoon Trading",
    "Current pack and trade observations",
    "D9PPPTi4LHg",
  ],
] as const;

const competitors = [
  [
    "SpinASoccerCard.wiki",
    "Cards, pack names and rebirth tables",
    "https://spinasoccercard.wiki/cards/",
  ],
  [
    "SpinASoccerCards.wiki",
    "Broad guide and database coverage",
    "https://spinasoccercards.wiki/",
  ],
  [
    "Beebom",
    "August active/expired code lists",
    "https://beebom.com/spin-a-soccer-card-codes/",
  ],
  [
    "Nerdschalk",
    "Working-code lists that may conflict with Beebom",
    "https://nerdschalk.com/spin-a-soccer-card-codes/",
  ],
  [
    "RobloxDen",
    "Large code archive and status checks",
    "https://robloxden.com/game-codes/spin-a-soccer-card",
  ],
  [
    "Pocket Gamer",
    "Code rewards and expired strings",
    "https://www.pocketgamer.com/roblox/spin-a-soccer-card-codes/",
  ],
] as const;

export function ResearchPage() {
  const official = gameSnapshot.officialSnapshot;
  const communityCards = countByVerification(cards, "multi-source-reported");
  const tryCodes = codes.filter((entry) => entry.status === "reported").length;
  const expiredCodes = codes.filter(
    (entry) => entry.status === "expired",
  ).length;

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Game data guide"
        title="Spin a Soccer Card Data - Roblox, Videos & Versions"
        description={pageTdk.research.description}
        meta={[
          `${videos.length} gameplay videos`,
          `${competitors.length} community comparison sites`,
          `Data date ${formatDate(gameSnapshot.snapshotDate)}`,
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Game Data" }]}
      />
      <div className={`container ${styles.content}`}>
        <section className={styles.boundary}>
          <Icon name="database" />
          <div>
            <h2>How Spin a Soccer Card data stays current</h2>
            <p>
              We track the live Roblox universe, official Game Passes, Shop
              screenshots and dated gameplay so pack prices, codes and card
              names match what players see after each update.
            </p>
            <div>
              <Link
                href="https://games.roblox.com/v1/games?universeIds=9272693470"
                target="_blank"
              >
                Universe API
              </Link>
              <Link
                href="https://assetdelivery.roblox.com/v2/assetId/112490729816320"
                target="_blank"
              >
                Asset boundary
              </Link>
              <Link href="/gamepasses">Game-pass database</Link>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <span>01</span>
            <div>
              <h2>Spin a Soccer Card Roblox game details</h2>
              <p>
                Public game information checked on{" "}
                {formatDate(official.observedAt)}.
              </p>
            </div>
          </div>
          <div className={styles.officialGrid}>
            <article>
              <strong>Universe</strong>
              <b>{official.universeId}</b>
              <p>Main experience identity.</p>
            </article>
            <article>
              <strong>Visits</strong>
              <b>{formatNumber(official.visits)}</b>
              <p>{official.playing} playing at check time.</p>
            </article>
            <article>
              <strong>Game passes</strong>
              <b>{official.gamePasses}</b>
              <p>Public product inventory.</p>
            </article>
            <article>
              <strong>Creator</strong>
              <b>{official.creator}</b>
              <p>Roblox creator group.</p>
            </article>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <span>02</span>
            <div>
              <h2>Current Spin a Soccer Card data coverage</h2>
              <p>
                Counts come from the live JSON collections, not a scraped full
                Index.
              </p>
            </div>
          </div>
          <div className={styles.officialGrid}>
            <article>
              <strong>Cards</strong>
              <b>{cards.length}</b>
              <p>{communityCards} popular player targets.</p>
            </article>
            <article>
              <strong>Packs</strong>
              <b>{packs.length}</b>
              <p>Current Shop rows plus dated archive.</p>
            </article>
            <article>
              <strong>Codes</strong>
              <b>{codes.length}</b>
              <p>
                {tryCodes} try-in-game · {expiredCodes} archive.
              </p>
            </article>
            <article>
              <strong>Systems</strong>
              <b>
                {mutations.length}/{rebirths.length}
              </b>
              <p>Mutation labels / rebirth milestones.</p>
            </article>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <span>03</span>
            <div>
              <h2>Spin a Soccer Card YouTube gameplay coverage</h2>
              <p>
                Six months of builds are kept separate so version drift stays
                visible.
              </p>
            </div>
          </div>
          <div className={styles.videoGrid}>
            {videos.map(([date, title, coverage, id]) => (
              <article key={id}>
                <small>{date}, 2026</small>
                <h3>{title}</h3>
                <p>{coverage}</p>
                <Link
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                >
                  Watch video <Icon name="arrow" size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <span>04</span>
            <div>
              <h2>Spin a Soccer Card community site comparisons</h2>
              <p>
                Used to discover claims—not to promote them to fact without
                confirmation in the live game.
              </p>
            </div>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Site</th>
                  <th>What you can find</th>
                  <th>How it is used here</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map(([name, coverage, url]) => (
                  <tr key={name}>
                    <td>
                      <Link href={url} target="_blank">
                        {name}
                      </Link>
                    </td>
                    <td>{coverage}</td>
                    <td>
                      Cross-check with live Shop, Index and code field.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.heading}>
            <span>05</span>
            <div>
              <h2>Known Spin a Soccer Card version conflicts</h2>
              <p>
                Conflicting dates stay visible instead of choosing a convenient
                number.
              </p>
            </div>
          </div>
          <div className={styles.conflicts}>
            <article>
              <h3>Rebirth 4 price</h3>
              <p>March shows $650M; April shows $600M.</p>
            </article>
            <article>
              <h3>Card totals</h3>
              <p>
                An April Index showed 1,199 slots; no current public roster API
                exists.
              </p>
            </article>
            <article>
              <h3>Code status</h3>
              <p>
                August trackers still disagree on OWL-HAPPY, BIGUPDATECOMING
                and DRAGON-PRIME, so those rows stay try-in-game.
              </p>
            </article>
            <article>
              <h3>WEAREBACK reward</h3>
              <p>
                Guides conflict between packs-and-spins wording and Transcendent
                pack wording; the field sighting is kept without picking one.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
