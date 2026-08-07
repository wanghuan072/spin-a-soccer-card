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
    number: "02",
    title: "Open Shop → Codes",
    body: "On your plot, tap Shop on the side menu, scroll to the bottom, and find the Codes / Enter Code field.",
    image: "/images/codes/code-redemption.webp",
    alt: "In-game code redemption field with Redeem button",
  },
  {
    number: "03",
    title: "Read the access message",
    body: "Open the Codes box and follow the requirement shown on your account. Public trackers disagree about whether every code needs two rebirths.",
    image: "/images/codes/code-menu.webp",
    alt: "In-game Codes menu inside the Shop panel",
  },
  {
    number: "04",
    title: "Paste exactly and Redeem",
    body: "Codes are case-sensitive. Keep hyphens, zeros and punctuation, then hit Redeem and wait for the reward popup.",
    image: "/images/codes/code-field.webp",
    alt: "Cropped in-game code entry field",
  },
] as const;

const codeScreens: Record<string, { src: string; alt: string }> = {
  "HERO-CRYSTAL": {
    src: "/images/evidence/hero-crystal-code.webp",
    alt: "HERO-CRYSTAL entered in the Spin a Soccer Card Codes field",
  },
  WEAREBACK: {
    src: "/images/evidence/weareback-code.webp",
    alt: "WEAREBACK entered in the Spin a Soccer Card Codes field",
  },
};

const faqs = [
  {
    q: "What do Spin a Soccer Card codes give?",
    a: "Rewards vary by string. Dated game footage shows multi-pack rewards, while older code records also name spins, gems, Wish Tickets or Tournament Tokens. Read the success popup for the exact award.",
  },
  {
    q: "Why is my code not working?",
    a: "Check the live access message, exact spelling and whether the string has already expired. Some public trackers attach a two-rebirth gate to particular codes, but they do not agree on one rule for every code.",
  },
  {
    q: "Where do new codes drop?",
    a: "The in-game Codes panel says weekly strings are posted in the Community Server. That panel is the clearest route; public code pages are useful only when their check dates are recent.",
  },
  {
    q: "Should I save codes for later?",
    a: "Test a fresh string promptly. If its reward is described as packs aligned to your rebirth level, decide whether to redeem now or after the required rebirth; do not assume every pack code scales the same way.",
  },
] as const;

export function CodesPage() {
  const ordered = sortCodesForDisplay(codes);
  const fieldSightings = ordered.filter(
    (entry) => entry.status === "video-verified",
  );
  const tryCodes = ordered.filter((entry) => entry.status === "reported");
  const expired = ordered.filter((entry) => entry.status === "expired");

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Reward terminal"
        title="Spin a Soccer Card Codes (August 2026)"
        description={pageTdk.codes.description}
        meta={[
          `${fieldSightings.length} recent field sightings`,
          `${tryCodes.length} worth a quick try`,
          `${expired.length} expired`,
        ]}
        image="/images/codes/code-menu.webp"
        imageAlt="In-game Spin a Soccer Card Codes menu"
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
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 46vw, 420px"
              />
              <figcaption>
                In-game Shop → Codes panel (real redemption UI)
              </figcaption>
            </figure>
          </section>

          <section aria-labelledby="working-codes">
            <div className={styles.sectionHead}>
              <span>01 · Recent field sightings</span>
              <h2 id="working-codes">
                Spin a Soccer Card codes seen in recent gameplay
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
              {fieldSightings.map((entry) => {
                const screen = codeScreens[entry.code];

                return (
                  <article className={styles.workingCard} key={entry.code}>
                    <div className={styles.codeVisual}>
                      {screen ? (
                        <Image
                          src={screen.src}
                          alt={screen.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 46vw, 620px"
                          quality={84}
                        />
                      ) : (
                        <Icon name="pack" size={34} />
                      )}
                      <span>{entry.code}</span>
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
                );
              })}
            </div>
          </section>

          {tryCodes.length ? (
            <section aria-labelledby="try-codes">
              <div className={styles.sectionHead}>
                <span>02 · Unresolved checks</span>
                <h2 id="try-codes">
                  Spin a Soccer Card codes awaiting a current result
                </h2>
                <p>
                  A code appears here only while recent checks genuinely
                  conflict. Once most current trackers archive it, it moves to
                  the dated list below until a new successful redemption is
                  captured.
                </p>
              </div>
              <div className={styles.tryList}>
                {tryCodes.map((entry) => (
                  <article className={styles.tryCard} key={entry.code}>
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
          ) : null}

          <section className={styles.redeem} aria-labelledby="redeem-codes">
            <div className={styles.sectionHead}>
              <span>{tryCodes.length ? "03" : "02"} · Player steps</span>
              <h2 id="redeem-codes">
                How to redeem Spin a Soccer Card codes
              </h2>
              <p>
                Follow the same path you use in-game. Every screenshot below is
                from the real Shop / Codes UI—not a mockup.
              </p>
            </div>
            <div className={styles.redeemPrerequisite}>
              <span>01</span>
              <div>
                <strong>Join Pixellar Studios before opening the code box</strong>
                <p>
                  Join the official Pixellar Studios | RSC Roblox group first.
                  Codes commonly fail while the account is outside the group.
                </p>
              </div>
              <small>One-time account step</small>
            </div>
            <ol className={styles.redeemSteps}>
              {redeemSteps.map((step) => (
                <li key={step.title}>
                  <div className={styles.redeemShot}>
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 52vw, 430px"
                      quality={86}
                    />
                    <span>{step.number}</span>
                  </div>
                  <div className={styles.redeemCopy}>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 44vw, 360px"
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
              <span>{tryCodes.length ? "04" : "03"} · Archive</span>
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
              <span>{tryCodes.length ? "05" : "04"} · Fast answers</span>
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
