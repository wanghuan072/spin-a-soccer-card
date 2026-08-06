import { LegalPage } from "@/page/legal/LegalPage";
import { pageTdk } from "@/seo/tdk";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";

export const metadata = createMetadata({
  ...pageTdk.about,
  path: "/legal/about-us",
});

export default function Page() {
  const path = "/legal/about-us";
  return (
    <>
      <PageStructuredData
        {...pageTdk.about}
        path={path}
        pageType="AboutPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About Us", href: path },
        ]}
      />
      <LegalPage kind="about" />
    </>
  );
}
