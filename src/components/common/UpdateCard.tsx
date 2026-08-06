import Image from "next/image";
import Link from "next/link";
import type { GameUpdate } from "@/types/content";
import { formatDate } from "@/lib/content";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/editorial-card.module.css";

export function UpdateCard({ update }: { update: GameUpdate }) {
  return (
    <article className={styles.card}>
      <Link className={styles.image} href={`/updates/${update.slug}`}>
        <Image
          src={update.image}
          alt={update.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </Link>
      <div className={styles.body}>
        <StatusBadge status={update.verificationStatus} />
        <span>
          {formatDate(update.date)} · {update.version}
        </span>
        <h3>
          <Link href={`/updates/${update.slug}`}>{update.title}</Link>
        </h3>
        <p>{update.summary}</p>
        <Link className={styles.link} href={`/updates/${update.slug}`}>
          Read update <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}
