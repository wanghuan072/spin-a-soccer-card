import { UpdatesPage } from "@/page/updates/UpdatesPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({
  ...pageTdk.updates,
  path: "/updates",
});
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.updates}
        path="/updates"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Updates", href: "/updates" },
        ]}
      />
      <UpdatesPage />
    </>
  );
}
