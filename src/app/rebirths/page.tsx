import { RebirthsPage } from "@/page/rebirths/RebirthsPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({
  ...pageTdk.rebirths,
  path: "/rebirths",
});
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.rebirths}
        path="/rebirths"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Rebirths", href: "/rebirths" },
        ]}
      />
      <RebirthsPage />
    </>
  );
}
