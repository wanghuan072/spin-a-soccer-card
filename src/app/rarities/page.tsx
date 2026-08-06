import { RaritiesPage } from "@/page/rarities/RaritiesPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({
  ...pageTdk.rarities,
  path: "/rarities",
});
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.rarities}
        path="/rarities"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Rarities", href: "/rarities" },
        ]}
      />
      <RaritiesPage />
    </>
  );
}
