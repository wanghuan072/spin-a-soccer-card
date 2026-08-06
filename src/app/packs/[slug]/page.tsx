import { notFound } from "next/navigation";
import { PackDetailPage } from "@/page/packs/PackDetailPage";
import { getPack, packs } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return packs.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pack = getPack(slug);
  if (!pack) return {};
  const path = `/packs/${slug}`;
  return createMetadata({
    ...pack.seo,
    path,
    type: "article",
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const pack = getPack(slug);
  if (!pack) notFound();
  const path = `/packs/${slug}`;
  return (
    <>
      <PageStructuredData
        {...pack.seo}
        path={path}
        article
        about={pack.name}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Packs", href: "/packs" },
          { name: pack.name, href: path },
        ]}
      />
      <PackDetailPage pack={pack} />
    </>
  );
}
