import { CodesPage } from "@/page/codes/CodesPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({ ...pageTdk.codes, path: "/codes" });
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.codes}
        path="/codes"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Codes", href: "/codes" },
        ]}
      />
      <CodesPage />
    </>
  );
}
