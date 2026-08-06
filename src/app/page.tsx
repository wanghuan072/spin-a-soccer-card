import { HomePage } from "@/page/home/HomePage";
import { createMetadata } from "@/seo/metadata";
import { PageStructuredData } from "@/seo/structured-data";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata({ ...pageTdk.home, path: "/" });
export default function Page() {
  return (
    <>
      <PageStructuredData
        {...pageTdk.home}
        path="/"
        breadcrumbs={[{ name: "Home", href: "/" }]}
      />
      <HomePage />
    </>
  );
}
