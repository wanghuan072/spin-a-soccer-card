import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/breadcrumb.module.css";

export function Breadcrumb({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 ? <Icon name="arrow" size={14} /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
