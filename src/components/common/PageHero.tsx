import Image from "next/image";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import styles from "@/style/common/page-hero.module.css";

export function PageHero({
  eyebrow,
  title,
  description,
  meta,
  breadcrumbs,
  image,
  imageAlt = "Spin a Soccer Card gameplay artwork",
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
  breadcrumbs: Array<{ label: string; href?: string }>;
  image?: string;
  imageAlt?: string;
}) {
  const visualMap: Record<string, string> = {
    "Player card database": "/images/video/scarlet-pack-session.webp",
    "Pack shop database": "/images/video/late-game-pack-shop.webp",
    "Player routes": "/images/video/card-bank.webp",
    "Reward terminal": "/images/video/blaze-storm-redemption.webp",
    "Change log": "/images/video/summer-admin-event.webp",
    "Modifier lab": "/images/video/summer-mutation-index.webp",
    "Current label index": "/images/video/historical-mutation-index.webp",
    "Rebirth progression guide": "/images/video/rebirth-5-panel.webp",
    "Community value guide": "/images/video/trade-booth.webp",
    "Official product database": "/images/video/gamepass-shop-gameplay.webp",
    "Game data guide": "/images/video/update-8-log.webp",
    "Player tool": "/images/video/trade-tax-example.webp",
  };
  const heroImage =
    image ?? visualMap[eyebrow] ?? "/images/official/game-thumbnail-2.webp";
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <Breadcrumb items={breadcrumbs} />
        <div className={styles.frame}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span>RSC</span>
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
          </div>
          <figure className={styles.visual}>
            <Image
              src={heroImage}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 34vw"
            />
            <figcaption>
              <span>SCOUT FILE</span>
              <b>{title.slice(0, 2).toUpperCase()}</b>
              <small>GAME DATA / 2026</small>
            </figcaption>
          </figure>
        </div>
        {meta?.length ? (
          <ol className={styles.meta}>
            {meta.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </header>
  );
}
