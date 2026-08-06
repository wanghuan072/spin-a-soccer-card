import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { formatDate, guides } from "@/lib/content";
import { JsonLd, faqSchema } from "@/seo/structured-data";
import type { Guide } from "@/types/content";
import styles from "@/style/page/detail/detail.module.css";

export function GuideDetailPage({ guide }: { guide: Guide }) {
  const related = guides
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3);
  const totalChecks =
    guide.sections.length + guide.tips.length + guide.mistakes.length;
  return (
    <main id="main-content">
      <JsonLd data={faqSchema(guide.faq)} />
      <PageHero
        eyebrow={`${guide.category} field manual`}
        title={guide.title}
        description={guide.seo.description}
        meta={[
          guide.readTime,
          `${guide.sections.length} guide sections`,
          `${totalChecks} action points`,
        ]}
        image={guide.image}
        imageAlt={`Gameplay image for ${guide.title}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />
      <div className={`container ${styles.content}`}>
        <article className={styles.article}>
          <section>
            <div className={styles.metricRow}>
              <article>
                <span>Page updated</span>
                <strong>{formatDate(guide.lastReviewedAt)}</strong>
                <small>Latest wording and link check</small>
              </article>
              <article>
                <span>Game date</span>
                <strong>{formatDate(guide.source.observedAt)}</strong>
                <small>Game version covered here</small>
              </article>
              <article>
                <span>Action points</span>
                <strong>{totalChecks}</strong>
                <small>Sections, tips and mistakes</small>
              </article>
            </div>
            <nav className={styles.toc} aria-label="Guide contents">
              <strong>Complete guide contents</strong>
              {guide.sections.map((section, index) => (
                <a key={section.heading} href={`#step-${index + 1}`}>
                  {String(index + 1).padStart(2, "0")} · {section.heading}
                </a>
              ))}
              <a href="#player-tips">Tips checklist</a>
              <a href="#guide-faq">Direct answers</a>
            </nav>
            <div className={styles.note}>
              <strong>Check the current menu before spending</strong>
              <p>
                Prices, stock, requirements and event access can change between
                game updates. Match these steps to the live Shop and Index in
                your server.
              </p>
            </div>
          </section>
          {guide.sections.map((section, index) => (
            <section id={`step-${index + 1}`} key={section.heading}>
              <div className={styles.sectionHeading}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.heading}</h2>
                </div>
              </div>
              <div
                className={
                  section.image ? styles.guideStep : styles.guideStepText
                }
              >
                <p>{section.body}</p>
                {section.image ? (
                  <figure className={styles.guideFigure}>
                    <Image
                      src={section.image}
                      alt={section.imageAlt ?? section.heading}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    {section.imageAlt ? (
                      <figcaption>{section.imageAlt}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </div>
            </section>
          ))}
          <section id="player-tips">
            <div className={styles.sectionHeading}>
              <span>+</span>
              <div>
                <h2>Player checklist</h2>
                <p>Useful actions and failure patterns shown together.</p>
              </div>
            </div>
            <div className={styles.split}>
              <div>
                <h3>Do this</h3>
                <ul>
                  {guide.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Avoid this</h3>
                <ul>
                  {guide.mistakes.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section id="guide-faq" className={styles.faq}>
            <div className={styles.sectionHeading}>
              <span>?</span>
              <div>
                <h2>Direct answers</h2>
                <p>
                  All answers are visible—nothing is hidden behind an accordion.
                </p>
              </div>
            </div>
            {guide.faq.map((faq) => (
              <article className={styles.faqItem} key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </section>
        </article>
        <aside className={styles.sidebar}>
          <section className={styles.sidebarLead}>
            <span>{guide.sections.length}</span>
            <h2>Guide sections</h2>
            <p>{guide.category} manual with practical, version-aware steps.</p>
          </section>
          {related.length ? (
            <section>
              <h2>Also read</h2>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/guides/${item.slug}`}>
                      {item.title}
                      <Icon name="arrow" size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
