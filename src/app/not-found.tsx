import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import styles from "@/style/page/detail/detail.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | Spin a Soccer Card Wiki",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="404 / Offside"
        title="This record is not on the team sheet"
        description="The page may have moved, the slug may be outdated, or the current roster audit has not created this record yet."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Not found" }]}
      />
      <div className={`container ${styles.notFoundAction}`}>
        <Link href="/cards">Search the card database</Link>
      </div>
    </main>
  );
}
