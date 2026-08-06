import { ResearchPage } from "@/page/research/ResearchPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({
  ...pageTdk.research,
  path: "/research",
});
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.research}
        path="/research"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Game Data", href: "/research" },
        ]}
      />
      <ResearchPage />
    </>
  );
}
