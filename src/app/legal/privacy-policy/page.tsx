import { LegalPage } from "@/page/legal/LegalPage";
import { pageTdk } from "@/seo/tdk";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";

export const metadata = createMetadata({
  ...pageTdk.privacy,
  path: "/legal/privacy-policy",
});

export default function Page() {
  const path = "/legal/privacy-policy";
  return (
    <>
      <PageStructuredData
        {...pageTdk.privacy}
        path={path}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: path },
        ]}
      />
      <LegalPage kind="privacy" />
    </>
  );
}
