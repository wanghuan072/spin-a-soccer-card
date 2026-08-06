import { notFound } from "next/navigation";
import { MutationDetailPage } from "@/page/mutations/MutationDetailPage";
import { getMutation, mutations } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return mutations.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getMutation(slug);
  if (!item) return {};
  const path = `/mutations/${slug}`;
  return createMetadata({
    ...item.seo,
    path,
    type: "article",
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = getMutation(slug);
  if (!item) notFound();
  const path = `/mutations/${slug}`;
  return (
    <>
      <PageStructuredData
        {...item.seo}
        path={path}
        article
        about={item.name}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Mutations", href: "/mutations" },
          { name: item.name, href: path },
        ]}
      />
      <MutationDetailPage mutation={item} />
    </>
  );
}
