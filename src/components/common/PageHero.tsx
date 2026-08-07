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
  showVisual = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
  breadcrumbs: Array<{ label: string; href?: string }>;
  image?: string;
  imageAlt?: string;
  showVisual?: boolean;
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
        <div className={`${styles.frame} ${showVisual ? "" : styles.frameTextOnly}`}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span>RSC</span>
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
          </div>
          {showVisual ? (
            <figure className={styles.visual}>
              <Image
                src={heroImage}
                alt={imageAlt}
                fill
                preload
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 38vw, 34vw"
                quality={78}
              />
              <figcaption>
                <span>SCOUT FILE</span>
                <b>{title.slice(0, 2).toUpperCase()}</b>
                <small>GAME DATA / 2026</small>
              </figcaption>
            </figure>
          ) : null}
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
