import Image from "next/image";
import Link from "next/link";
import type { SoccerPack } from "@/types/content";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/pack-item.module.css";

export function PackItem({
  pack,
  compact = false,
}: {
  pack: SoccerPack;
  compact?: boolean;
}) {
  return (
    <article className={`${styles.pack} ${compact ? styles.compact : ""}`}>
      <div className={styles.imageWrap}>
        <Image
          src={pack.image}
          alt={`${pack.name} shown in Spin a Soccer Card`}
          width={180}
          height={180}
        />
        <span>{pack.availability === "historical" ? "ARCHIVE" : "DATED"}</span>
      </div>
      <div className={styles.body}>
        <StatusBadge status={pack.verificationStatus} />
        <h3>{pack.name}</h3>
        <p>{pack.unlockRequirement}</p>
        <dl>
          <div>
            <dt>Cards</dt>
            <dd>{pack.cardCount ?? "TBD"}</dd>
          </div>
          <div>
            <dt>Top rarity</dt>
            <dd>{pack.highestRarity}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{pack.stockPerRefresh ?? "Not shown"}</dd>
          </div>
        </dl>
        <Link href={`/packs/${pack.slug}`}>
          Inspect pack <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}
