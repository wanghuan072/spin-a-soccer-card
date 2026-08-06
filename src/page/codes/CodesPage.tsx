import Image from "next/image";
import Link from "next/link";
import { CodeCopyButton } from "@/components/common/CodeCopyButton";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { codes, formatDate, sortCodesForDisplay } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/codes/codes.module.css";

const redeemSteps = [
  {
    title: "Join Pixellar Studios",
    body: "Open the official Pixellar Studios | RSC Roblox group and join before you redeem. Codes usually fail until you are in the group.",
    image: "/images/gameplay/shop-overlay.webp",
    alt: "Spin a Soccer Card Shop overlay on a live plot",
  },
  {
    title: "Read the access message",
    body: "Open the Codes box and follow the requirement shown on your account. Public trackers disagree about whether every code needs two rebirths.",
    image: "/images/codes/code-menu.webp",
    alt: "In-game Codes menu inside the Shop panel",
  },
  {
    title: "Open Shop → Codes",
    body: "On your plot, tap Shop on the side menu, scroll to the bottom, and find the Codes / Enter Code field.",
    image: "/images/codes/code-redemption.webp",
    alt: "In-game code redemption field with Redeem button",
  },
  {
    title: "Paste exactly and Redeem",
    body: "Codes are case-sensitive. Keep hyphens, zeros and punctuation, then hit Redeem and wait for the reward popup.",
    image: "/images/codes/code-field.webp",
    alt: "Cropped in-game code entry field",
  },
] as const;

const faqs = [
  {
    q: "What do Spin a Soccer Card codes give?",
    a: "Most weekly codes drop packs scaled to your rebirth level plus Spin Wheel spins. Some also add gems, Wish Tickets or Tournament Tokens.",
  },
  {
    q: "Why is my code not working?",
    a: "Check group membership, rebirth count, spelling and whether the code already expired. If the field rejects a correct code, try another server after an update.",
  },
  {
    q: "Where do new codes drop?",
    a: "Pixellar usually posts weekly codes in the Community Server / Discord and the Roblox group. Bookmark this page and redeem as soon as a fresh string appears.",
  },
  {
    q: "Should I save codes for later?",
    a: "No. Weekly codes often last only a few days. Redeem packs at your current rebirth so the free packs pull from a better pool.",
  },
] as const;

export function CodesPage() {
  const ordered = sortCodesForDisplay(codes);
  const working = ordered.filter((entry) => entry.status === "video-verified");
  const tryCodes = ordered.filter((entry) => entry.status === "reported");
  const expired = ordered.filter((entry) => entry.status === "expired");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Reward terminal"
        title="Spin a Soccer Card Codes (August 2026)"
        description={pageTdk.codes.description}
        meta={[
          `${working.length} working now`,
          `${tryCodes.length} worth a quick try`,
          `${expired.length} expired`,
        ]}
        image="/images/evidence/hero-crystal-code.webp"
        imageAlt="HERO-CRYSTAL typed in the live Spin a Soccer Card Codes field"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Codes" }]}
      />

      <div className={`container ${styles.page}`}>
        <div className={styles.content}>
          <section className={styles.intro} aria-labelledby="codes-intro">
            <div className={styles.introCopy}>
              <h2 id="codes-intro">What are Spin a Soccer Card codes?</h2>
              <p>
                Codes are free redeem strings from Pixellar Studios. You paste
                them in Shop to claim packs, Spin Wheel spins and sometimes
                gems or event tokens—without spending Cash or Robux.
              </p>
              <ul className={styles.introPoints}>
                <li>
                  <Icon name="check" size={16} />
                  <span>
                    Some pack codes scale rewards to a rebirth tier, while
                    fixed-resource codes can award gems, spins or event items.
                  </span>
                </li>
                <li>
                  <Icon name="spark" size={16} />
                  <span>
                    Free spins help chase Wheel exclusives after you clear the
                    weekly code.
                  </span>
                </li>
                <li>
                  <Icon name="clock" size={16} />
                  <span>
                    New strings often appear around weekly drops and updates;
                    test them promptly because status lists can drift.
                  </span>
                </li>
              </ul>
            </div>
            <figure className={styles.introFigure}>
              <Image
                src="/images/codes/code-redemption.webp"
                alt="Live Shop Codes panel with Enter a code field and Redeem button"
                fill
                sizes="(max-width: 960px) 100vw, 420px"
                priority
              />
              <figcaption>
                In-game Shop → Codes panel (real redemption UI)
              </figcaption>
            </figure>
          </section>

          <section aria-labelledby="working-codes">
            <div className={styles.sectionHead}>
              <span>01 · Working codes</span>
              <h2 id="working-codes">
                Working Spin a Soccer Card codes for August 2026
              </h2>
              <p>
                These exact strings were captured in the live Codes field
                during recent gameplay. A field sighting confirms spelling,
                not a successful redemption, so test the string before planning
                rewards from the current{" "}
                <Link href="/packs">Shop tier</Link>.
              </p>
            </div>
            <div className={styles.workingGrid}>
              {working.map((entry) => (
                <article className={styles.workingCard} key={entry.code}>
                  <div className={styles.workingMedia}>
                    <Image
                      src={entry.image}
                      alt={`${entry.code} shown in the live Spin a Soccer Card Codes field`}
                      fill
                      sizes="(max-width: 960px) 100vw, 480px"
                    />
                  </div>
                  <div className={styles.workingBody}>
                    <div className={styles.workingTop}>
                      <StatusBadge status={entry.status} />
                      <code>{entry.code}</code>
                    </div>
                    <p>{entry.reward}</p>
                    <p className={styles.workingMeta}>
                      Field checked {formatDate(entry.lastVerifiedAt)} ·{" "}
                      {entry.requirement}
                    </p>
                    <div className={styles.workingActions}>
                      <CodeCopyButton code={entry.code} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="try-codes">
            <div className={styles.sectionHead}>
              <span>02 · Quick tests</span>
              <h2 id="try-codes">
                Spin a Soccer Card codes worth trying in game
              </h2>
              <p>
                Trackers disagree on these right now—some August lists still
                show them working, others already mark them expired. Spend a few
                seconds testing each; if Shop rejects the string, skip it.
              </p>
            </div>
            <div className={styles.tryList}>
              {tryCodes.map((entry) => (
                <article className={styles.tryCard} key={entry.code}>
                  <div className={styles.tryShot}>
                    <Image
                      src={entry.image}
                      alt={`In-game Codes UI used when testing ${entry.code}`}
                      fill
                      sizes="120px"
                    />
                  </div>
                  <div>
                    <StatusBadge status={entry.status} />
                    <code>{entry.code}</code>
                  </div>
                  <div>
                    <p>{entry.reward}</p>
                    <small>{entry.requirement}</small>
                  </div>
                  <CodeCopyButton code={entry.code} />
                </article>
              ))}
            </div>
          </section>

          <section className={styles.redeem} aria-labelledby="redeem-codes">
            <div className={styles.sectionHead}>
              <span>03 · Player steps</span>
              <h2 id="redeem-codes">
                How to redeem Spin a Soccer Card codes
              </h2>
              <p>
                Follow the same path you use in-game. Every screenshot below is
                from the real Shop / Codes UI—not a mockup.
              </p>
            </div>
            <ol className={styles.redeemSteps}>
              {redeemSteps.map((step) => (
                <li key={step.title}>
                  <div className={styles.redeemCopy}>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                  <div className={styles.redeemShot}>
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="160px"
                    />
                  </div>
                </li>
              ))}
            </ol>
            <div className={styles.successNote}>
              <figure>
                <Image
                  src="/images/video/blaze-storm-redemption.webp"
                  alt="Successful BLAZE-STORM code redemption reward popup in gameplay"
                  fill
                  sizes="(max-width: 960px) 100vw, 360px"
                />
              </figure>
              <div>
                <h3>What a successful redeem looks like</h3>
                <p>
                  A working code shows a reward popup (packs, spins or gems)
                  right after Redeem. The frame above is a historical July
                  success screen for <strong>BLAZE-STORM</strong>. Current
                  trackers disagree on its later status, but the popup style is
                  what you want to see for{" "}
                  <strong>HERO-CRYSTAL</strong> and <strong>WEAREBACK</strong>.
                </p>
                <p>
                  After claiming, open packs from your{" "}
                  <Link href="/packs">Pack Shop</Link> or bank the best pull
                  before the next <Link href="/rebirths">rebirth</Link>.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="expired-codes">
            <div className={styles.sectionHead}>
              <span>04 · Archive</span>
              <h2 id="expired-codes">
                Expired Spin a Soccer Card codes archive
              </h2>
              <p>
                These strings are kept in the expired archive based on the
                dated checks attached to each record. A reused string should be
                moved only after a new successful redemption is captured.
              </p>
            </div>
            <div className={styles.expiredList}>
              {expired.map((entry) => (
                <article className={styles.expiredCard} key={entry.code}>
                  <div>
                    <StatusBadge status={entry.status} />
                    <code>{entry.code}</code>
                  </div>
                  <div>
                    <p>{entry.reward}</p>
                    <small>
                      Archived {formatDate(entry.lastVerifiedAt)}
                    </small>
                  </div>
                  <span>Expired</span>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="codes-faq">
            <div className={styles.sectionHead}>
              <span>05 · Fast answers</span>
              <h2 id="codes-faq">
                Spin a Soccer Card codes FAQ and requirements
              </h2>
            </div>
            <div className={styles.faq}>
              {faqs.map((item) => (
                <article key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
