import { ValuesPage } from "@/page/values/ValuesPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({ ...pageTdk.values, path: "/values" });
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.values}
        path="/values"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Values", href: "/values" },
        ]}
      />
      <ValuesPage />
    </>
  );
}
