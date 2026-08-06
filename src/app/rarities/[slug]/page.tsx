import { notFound } from "next/navigation";
import { RarityDetailPage } from "@/page/rarities/RarityDetailPage";
import { getRarity, rarities } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return rarities.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getRarity(slug);
  if (!item) return {};
  return createMetadata({
    ...item.seo,
    path: `/rarities/${slug}`,
    type: "article",
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = getRarity(slug);
  if (!item) notFound();
  const path = `/rarities/${slug}`;
  return (
    <>
      <PageStructuredData
        {...item.seo}
        path={path}
        article
        about={item.name}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Rarities", href: "/rarities" },
          { name: item.name, href: path },
        ]}
      />
      <RarityDetailPage rarity={item} />
    </>
  );
}
