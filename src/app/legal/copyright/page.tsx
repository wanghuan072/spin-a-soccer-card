import { LegalPage } from "@/page/legal/LegalPage";
import { pageTdk } from "@/seo/tdk";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";

export const metadata = createMetadata({
  ...pageTdk.copyright,
  path: "/legal/copyright",
});

export default function Page() {
  const path = "/legal/copyright";
  return (
    <>
      <PageStructuredData
        {...pageTdk.copyright}
        path={path}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Copyright", href: path },
        ]}
      />
      <LegalPage kind="copyright" />
    </>
  );
}
