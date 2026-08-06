import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/lib/content";
import type { SoccerCard } from "@/types/content";
import { StatusBadge } from "@/components/common/StatusBadge";
import styles from "@/style/common/card-item.module.css";

export function CardItem({
  card,
  compact = false,
}: {
  card: SoccerCard;
  compact?: boolean;
}) {
  return (
    <article
      className={`${styles.card} ${compact ? styles.compact : ""}`}
      data-rarity={card.rarity.toLowerCase()}
    >
      <Link className={styles.art} href={`/cards/${card.slug}`}>
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 46vw, 220px"
        />
        <span className={styles.rating}>{card.rating ?? "?"}</span>
        <span className={styles.rarity}>{card.rarity}</span>
      </Link>
      <div className={styles.body}>
        <StatusBadge status={card.verificationStatus} />
        <h3>
          <Link href={`/cards/${card.slug}`}>{card.name}</Link>
        </h3>
        <p>{card.position}</p>
        <dl>
          <div>
            <dt>Income</dt>
            <dd>{formatNumber(card.baseIncome, "$")}</dd>
          </div>
          <div>
            <dt>Value</dt>
            <dd>{formatNumber(card.tradeValue)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
