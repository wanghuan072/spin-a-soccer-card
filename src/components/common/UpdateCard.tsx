import Image from "next/image";
import Link from "next/link";
import type { GameUpdate } from "@/types/content";
import { formatDate } from "@/lib/content";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/update-card.module.css";

export function UpdateCard({
  update,
  sequence,
  featured = false,
}: {
  update: GameUpdate;
  sequence: number;
  featured?: boolean;
}) {
  const date = new Date(`${update.date}T00:00:00Z`);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
  const year = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <div className={styles.dateRail}>
        <span>Update {String(sequence).padStart(2, "0")}</span>
        <time dateTime={update.date}>
          <strong>{day}</strong>
          <b>{month}</b>
          <small>{year}</small>
        </time>
      </div>
      <Link className={styles.image} href={`/updates/${update.slug}`}>
        <Image
          src={update.image}
          alt={update.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 34vw, 300px"
          quality={82}
          priority={featured}
        />
        {featured ? <span>Latest entry</span> : null}
      </Link>
      <div className={styles.body}>
        <div className={styles.meta}>
          <StatusBadge status={update.verificationStatus} />
          <span>{update.version}</span>
        </div>
        <h3>
          <Link href={`/updates/${update.slug}`}>{update.title}</Link>
        </h3>
        <p>{update.summary}</p>
        <Link className={styles.link} href={`/updates/${update.slug}`}>
          Open full update <Icon name="arrow" size={16} />
        </Link>
      </div>
      <div className={styles.changeLog}>
        <span>Change log</span>
        <strong>{update.eventStatus}</strong>
        <ul>
          {update.details.slice(0, featured ? 3 : 2).map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <small>Checked {formatDate(update.source.observedAt)}</small>
      </div>
    </article>
  );
}
