import { notFound } from "next/navigation";
import { UpdateDetailPage } from "@/page/updates/UpdateDetailPage";
import { getUpdate, updates } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return updates.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) return {};
  const path = `/updates/${slug}`;
  return createMetadata({
    ...update.seo,
    path,
    type: "article",
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) notFound();
  const path = `/updates/${slug}`;
  return (
    <>
      <PageStructuredData
        {...update.seo}
        path={path}
        article
        about={update.title}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Updates", href: "/updates" },
          { name: update.title, href: path },
        ]}
      />
      <UpdateDetailPage update={update} />
    </>
  );
}
