import Image from "next/image";
import Link from "next/link";
import type { SoccerCard } from "@/types/content";
import { formatDate, formatNumber } from "@/lib/content";
import styles from "@/style/common/table.module.css";

export function ValueTable({
  cards,
  compact = false,
}: {
  cards: SoccerCard[];
  compact?: boolean;
}) {
  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ""}`}>
      <table>
        <thead>
          <tr>
            <th>Card</th>
            <th>Rarity</th>
            <th>Recorded plot income</th>
            <th>Community value</th>
            <th>Trend</th>
            <th>Checked</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.slug}>
              <th scope="row">
                <span className={styles.cardCell}>
                  <Image src={card.image} alt="" width={28} height={28} />
                  <Link href={`/cards/${card.slug}`}>{card.name}</Link>
                </span>
              </th>
              <td>{card.rarity}</td>
              <td>
                {card.observedIncome === null
                  ? "Not captured"
                  : `${formatNumber(card.observedIncome, "$")} / sec`}
              </td>
              <td>{formatNumber(card.tradeValue)}</td>
              <td>
                <span className={styles.trend} data-trend={card.valueTrend}>
                  {card.valueTrend === "unverified"
                    ? "No history"
                    : card.valueTrend}
                </span>
              </td>
              <td>{formatDate(card.lastVerifiedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
