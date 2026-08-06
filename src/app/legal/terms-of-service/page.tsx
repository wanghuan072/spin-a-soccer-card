import { LegalPage } from "@/page/legal/LegalPage";
import { pageTdk } from "@/seo/tdk";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";

export const metadata = createMetadata({
  ...pageTdk.terms,
  path: "/legal/terms-of-service",
});

export default function Page() {
  const path = "/legal/terms-of-service";
  return (
    <>
      <PageStructuredData
        {...pageTdk.terms}
        path={path}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: path },
        ]}
      />
      <LegalPage kind="terms" />
    </>
  );
}
