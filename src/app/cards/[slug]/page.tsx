import { notFound } from "next/navigation";
import { CardDetailPage } from "@/page/cards/CardDetailPage";
import { cards, getCard } from "@/lib/content";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return cards.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return {};
  const path = `/cards/${slug}`;
  return createMetadata({
    ...card.seo,
    path,
    type: "article",
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) notFound();
  const path = `/cards/${slug}`;
  return (
    <>
      <PageStructuredData
        {...card.seo}
        path={path}
        article
        about={card.name}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Cards", href: "/cards" },
          { name: card.name, href: path },
        ]}
      />
      <CardDetailPage card={card} />
    </>
  );
}
