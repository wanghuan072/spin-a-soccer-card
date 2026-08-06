import { verificationLabel } from "@/lib/content";
import styles from "@/style/common/status.module.css";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={styles.badge} data-status={status}>
      {verificationLabel(status)}
    </span>
  );
}
