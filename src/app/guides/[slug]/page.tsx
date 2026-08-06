import { notFound } from "next/navigation";
import { GuideDetailPage } from "@/page/guides/GuideDetailPage";
import { getGuide, guides } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const path = `/guides/${slug}`;
  return createMetadata({
    ...guide.seo,
    path,
    type: "article",
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const path = `/guides/${slug}`;
  return (
    <>
      <PageStructuredData
        {...guide.seo}
        path={path}
        article
        about={guide.title}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: guide.title, href: path },
        ]}
      />
      <GuideDetailPage guide={guide} />
    </>
  );
}
