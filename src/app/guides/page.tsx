import { GuidesPage } from "@/page/guides/GuidesPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({ ...pageTdk.guides, path: "/guides" });
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.guides}
        path="/guides"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
        ]}
      />
      <GuidesPage />
    </>
  );
}
