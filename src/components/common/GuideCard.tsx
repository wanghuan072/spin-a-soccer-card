import Image from "next/image";
import Link from "next/link";
import type { Guide } from "@/types/content";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/editorial-card.module.css";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className={styles.card}>
      <Link className={styles.image} href={`/guides/${guide.slug}`}>
        <Image
          src={guide.image}
          alt={`Gameplay image for ${guide.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>
      <div className={styles.body}>
        <span>
          {guide.category} · {guide.readTime}
        </span>
        <h3>
          <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
        </h3>
        <p>{guide.summary}</p>
        <Link className={styles.link} href={`/guides/${guide.slug}`}>
          Read guide <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}
