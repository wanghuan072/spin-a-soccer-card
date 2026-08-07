import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cards, formatDate, verificationLabel } from "@/lib/content";
import type { Mutation } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function MutationDetailPage({ mutation }: { mutation: Mutation }) {
  const linkedCards = cards.filter((card) =>
    card.mutationSlugs.includes(mutation.slug),
  );
  const visual =
    linkedCards[0]?.image ?? "/images/video/summer-mutation-index.webp";
  const hasMatchingVisual =
    linkedCards.length > 0 || mutation.verificationStatus !== "multi-source-reported";
  const hasReadableMultiplier = !mutation.multiplier
    .toLowerCase()
    .includes("not shown");
  const decisionTitle = hasReadableMultiplier
    ? `${mutation.name} income record`
    : mutation.verificationStatus === "historical-record"
      ? `${mutation.name} in its recorded game window`
      : `${mutation.name} as a live comparison label`;
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Mutation effect guide"
        title={`Spin a Soccer Card ${mutation.name} Mutation - Effect, Multiplier & Cards`}
        description={mutation.seo.description}
        meta={[
          mutation.effect,
          mutation.multiplier,
          `${linkedCards.length} linked cards`,
        ]}
        image={hasMatchingVisual ? visual : undefined}
        imageAlt={`${mutation.name} mutation shown in Spin a Soccer Card`}
        showVisual={hasMatchingVisual}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Mutations", href: "/mutations" },
          { label: mutation.name },
        ]}
      />
      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section>
            <StatusBadge status={mutation.verificationStatus} />
            <div className={styles.metricRow}>
              <article>
                <span>Effect field</span>
                <strong>{mutation.effect}</strong>
                <small>Text shown in game</small>
              </article>
              <article>
                <span>Multiplier</span>
                <strong>{mutation.multiplier}</strong>
                <small>Read live Index for exact math</small>
              </article>
              <article>
                <span>Linked cards</span>
                <strong>{linkedCards.length}</strong>
                <small>Documented pulls with this label</small>
              </article>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div>
                <h2>
                  How the Spin a Soccer Card {mutation.name} mutation works
                </h2>
                <p>Keep, Bank or trade decisions for this mutation.</p>
              </div>
            </div>
            <div className={styles.split}>
              <div>
                <h3>What it does</h3>
                <p>
                  {mutation.description} Effect in game: {mutation.effect}.
                  Multiplier shown here: <strong>{mutation.multiplier}</strong>.
                </p>
              </div>
              <dl className={styles.statusList}>
                <div>
                  <dt>Status</dt>
                  <dd>{verificationLabel(mutation.verificationStatus)}</dd>
                </div>
                <div>
                  <dt>Last checked</dt>
                  <dd>{formatDate(mutation.source.observedAt)}</dd>
                </div>
                <div>
                  <dt>Color</dt>
                  <dd>{mutation.color}</dd>
                </div>
                <div>
                  <dt>Related guide</dt>
                  <dd>
                    <Link href="/guides/beginner-guide">Beginner guide</Link>
                  </dd>
                </div>
              </dl>
            </div>
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div>
                <h2>
                  Spin a Soccer Card cards with {mutation.name}
                </h2>
                <p>Open a card page to see pack route and income.</p>
              </div>
            </div>
            {linkedCards.length ? (
              <div className={styles.recordLinks}>
                {linkedCards.map((card) => (
                  <Link key={card.slug} href={`/cards/${card.slug}`}>
                    <span>{card.name}</span>
                    <small>
                      {card.rating ?? "?"} · {card.position} · {card.rarity}
                    </small>
                    <Icon name="arrow" size={15} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.note}>
                <strong>No named pull linked yet</strong>
                <p>
                  Watch the Index mutation tab while opening{" "}
                  <Link href="/packs">packs</Link> or the Spin Wheel. When you
                  hit {mutation.name}, keep that copy if it beats your weakest
                  plot slot.
                </p>
              </div>
            )}
          </section>
          <section>
            <div className={styles.sectionHeading}>
              <span>03</span>
              <div>
                <h2>{decisionTitle}</h2>
                <p>Use the card in front of you, not a universal tier-list multiplier.</p>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <tbody>
                  <tr>
                    <th>Readable label</th>
                    <td>{mutation.name}</td>
                  </tr>
                  <tr>
                    <th>Money figure</th>
                    <td>{mutation.multiplier}</td>
                  </tr>
                  <tr>
                    <th>Game window</th>
                    <td>{formatDate(mutation.source.observedAt)}</td>
                  </tr>
                  <tr>
                    <th>Card examples</th>
                    <td>
                      {linkedCards.length
                        ? linkedCards.map((card) => card.name).join(", ")
                        : "No clean card-face capture linked"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ol>
              <li>
                Compare the {mutation.name} copy with the same card name and
                rating without that label whenever both are available.
              </li>
              <li>
                Read the Cash-per-second label after placement; do not turn a
                color or animation into an invented multiplier.
              </li>
              <li>
                Bank the variant before rebirth only when its live income,
                collection role or trade demand earns the limited slot.
              </li>
              <li>
                Recheck {mutation.name} in the Index after an update because its
                label can stay visible in old videos after the acquisition window
                closes.
              </li>
            </ol>
          </section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{linkedCards.length}</span>
            <h2>{mutation.name}</h2>
            <p>{mutation.multiplier}</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
