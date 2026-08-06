import { MutationsPage } from "@/page/mutations/MutationsPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({
  ...pageTdk.mutations,
  path: "/mutations",
});
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.mutations}
        path="/mutations"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Mutations", href: "/mutations" },
        ]}
      />
      <MutationsPage />
    </>
  );
}
