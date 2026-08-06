import { PacksPage } from "@/page/packs/PacksPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({ ...pageTdk.packs, path: "/packs" });
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.packs}
        path="/packs"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Packs", href: "/packs" },
        ]}
      />
      <PacksPage />
    </>
  );
}
