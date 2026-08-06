import { siteConfig } from "@/config/site";
import pageLastmod from "@/seo/page-lastmod.json";

type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

function absolutePageUrl(path: string) {
  return path === "/" ? siteConfig.url : new URL(path, siteConfig.url).toString();
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/cards?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolutePageUrl(item.href),
    })),
  };
}

type PageSchemaType =
  | "WebPage"
  | "CollectionPage"
  | "AboutPage"
  | "ContactPage";

type PageStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  breadcrumbs: Array<{ name: string; href: string }>;
  pageType?: PageSchemaType;
  article?: boolean;
  about?: string;
};

function pageSchema({
  title,
  description,
  path,
  pageType = "WebPage",
}: Pick<
  PageStructuredDataProps,
  "title" | "description" | "path" | "pageType"
>) {
  const url = absolutePageUrl(path);
  const dateModified = (pageLastmod as Record<string, string>)[path];

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    dateModified,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: new URL(siteConfig.socialImage, siteConfig.url).toString(),
      width: 1200,
      height: 630,
    },
  };
}

function articleSchema({
  title,
  description,
  path,
  about = "Spin a Soccer Card",
}: Pick<
  PageStructuredDataProps,
  "title" | "description" | "path" | "about"
>) {
  const url = absolutePageUrl(path);
  const dateModified = (pageLastmod as Record<string, string>)[path];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    inLanguage: "en",
    image: new URL(siteConfig.socialImage, siteConfig.url).toString(),
    dateModified,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "VideoGame",
      name: about,
      url: siteConfig.robloxUrl,
    },
  };
}

export function PageStructuredData(props: PageStructuredDataProps) {
  const data: Record<string, unknown>[] = [pageSchema(props)];

  if (props.breadcrumbs.length > 1) {
    data.push(breadcrumbSchema(props.breadcrumbs));
  }
  if (props.article) {
    data.push(articleSchema(props));
  }

  return <JsonLd data={data} />;
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
