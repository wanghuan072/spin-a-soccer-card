import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { formatDate, guides } from "@/lib/content";
import { JsonLd, faqSchema } from "@/seo/structured-data";
import type { Guide } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function GuideDetailPage({ guide }: { guide: Guide }) {
  const related = guides.find((item) => item.slug !== guide.slug);
  const totalChecks = guide.tips.length + guide.mistakes.length;

  return (
    <main id="main-content">
      <JsonLd data={faqSchema(guide.faq)} />
      <PageHero
        eyebrow={`${guide.category} player manual`}
        title={guide.title}
        description={guide.summary}
        meta={[
          guide.readTime,
          `${guide.sections.length} practical chapters`,
          `Game window ${formatDate(guide.source.observedAt)}`,
        ]}
        image={guide.image}
        imageAlt={`In-game view for ${guide.title}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />

      <div className={`container ${styles.guideLayout}`}>
        <article className={styles.guideArticle}>
          <header className={styles.guideOpening}>
            <div>
              <p className={styles.kicker}>Player route · read in order</p>
              <h2>Turn the game loop into your next move</h2>
              <p>
                This manual is built around decisions you make inside the live
                game: what to inspect, what to keep and what to postpone. Menu
                labels are tied to the dated game window above, so a changed
                Shop or Rebirth panel should always take priority.
              </p>
            </div>
            <dl className={styles.guideBrief}>
              <div>
                <dt>Chapters</dt>
                <dd>{guide.sections.length}</dd>
              </div>
              <div>
                <dt>Checks</dt>
                <dd>{totalChecks}</dd>
              </div>
              <div>
                <dt>Page review</dt>
                <dd>{formatDate(guide.lastReviewedAt)}</dd>
              </div>
            </dl>
          </header>

          <nav className={styles.guideRoute} aria-label="Guide chapters">
            <p>Route card</p>
            <ol>
              {guide.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#chapter-${index + 1}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.guideChapters}>
            {guide.sections.map((section, index) => (
              <section
                id={`chapter-${index + 1}`}
                className={`${styles.guideChapter} ${
                  index % 2 === 1 ? styles.guideChapterFlip : ""
                }`}
                key={section.heading}
              >
                <div className={styles.chapterNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className={styles.chapterCopy}>
                  <p className={styles.kicker}>On-field decision</p>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
                {section.image ? (
                  <figure className={styles.guideFigure}>
                    <Image
                      src={section.image}
                      alt={section.imageAlt ?? section.heading}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 42vw, 390px"
                      quality={78}
                    />
                    {section.imageAlt ? (
                      <figcaption>{section.imageAlt}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </section>
            ))}
          </div>

          <section id="player-checklist" className={styles.decisionBoard}>
            <header>
              <p className={styles.kicker}>Before the next pack or reset</p>
              <h2>Player decision board</h2>
              <p>
                The left column protects progress. The right column catches
                the mistakes that most often waste Cash, cards or fresh codes.
              </p>
            </header>
            <div>
              <section>
                <h3>Make these checks</h3>
                <ol>
                  {guide.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ol>
              </section>
              <section>
                <h3>Do not spend around these</h3>
                <ol>
                  {guide.mistakes.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ol>
              </section>
            </div>
          </section>

          <section id="guide-answers" className={styles.guideAnswers}>
            <header>
              <p className={styles.kicker}>Common player decisions</p>
              <h2>{guide.title} questions</h2>
              <p>Every answer stays open on the page for quick scanning.</p>
            </header>
            <div>
              {guide.faq.map((faq, index) => (
                <article key={faq.question}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {related ? (
            <aside className={styles.nextGuide}>
              <div>
                <p className={styles.kicker}>Continue your route</p>
                <h2>{related.title}</h2>
                <p>{related.summary}</p>
              </div>
              <Link href={`/guides/${related.slug}`}>
                Open next guide <Icon name="arrow" size={17} />
              </Link>
            </aside>
          ) : null}
        </article>
      </div>
    </main>
  );
}
