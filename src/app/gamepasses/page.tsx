import { GamepassesPage } from "@/page/gamepasses/GamepassesPage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";
export const metadata = createMetadata({
  ...pageTdk.gamepasses,
  path: "/gamepasses",
});
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.gamepasses}
        path="/gamepasses"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Game Passes", href: "/gamepasses" },
        ]}
      />
      <GamepassesPage />
    </>
  );
}
