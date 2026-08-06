import { notFound } from "next/navigation";
import { RebirthDetailPage } from "@/page/rebirths/RebirthDetailPage";
import { getRebirth, rebirths } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return rebirths.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getRebirth(slug);
  if (!item) return {};
  const path = `/rebirths/${slug}`;
  return createMetadata({
    ...item.seo,
    path,
    type: "article",
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = getRebirth(slug);
  if (!item) notFound();
  const path = `/rebirths/${slug}`;
  return (
    <>
      <PageStructuredData
        {...item.seo}
        path={path}
        article
        about={item.title}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Rebirths", href: "/rebirths" },
          { name: item.title, href: path },
        ]}
      />
      <RebirthDetailPage rebirth={item} />
    </>
  );
}
