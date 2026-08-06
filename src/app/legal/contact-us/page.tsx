import { LegalPage } from "@/page/legal/LegalPage";
import { pageTdk } from "@/seo/tdk";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";

export const metadata = createMetadata({
  ...pageTdk.contact,
  path: "/legal/contact-us",
});

export default function Page() {
  const path = "/legal/contact-us";
  return (
    <>
      <PageStructuredData
        {...pageTdk.contact}
        path={path}
        pageType="ContactPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact Us", href: path },
        ]}
      />
      <LegalPage kind="contact" />
    </>
  );
}
