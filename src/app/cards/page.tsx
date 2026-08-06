import { CardsPage } from "@/page/cards/CardsPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.cards,
  path: "/cards",
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const single = (key: string) =>
    typeof params[key] === "string" ? params[key] : undefined;
  return (
    <>
      <PageStructuredData
        {...pageTdk.cards}
        path="/cards"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Cards", href: "/cards" },
        ]}
      />
      <CardsPage
        initialFilters={{
          query: single("query"),
          rarity: single("rarity"),
          pack: single("pack"),
          mutation: single("mutation"),
          position: single("position"),
          limited: single("limited"),
          obtainable: single("obtainable"),
          status: single("status"),
          sort: single("sort"),
        }}
      />
    </>
  );
}
