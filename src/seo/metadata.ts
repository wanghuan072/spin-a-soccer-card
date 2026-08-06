import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  type?: "website" | "article";
};

export function createMetadata({
  title,
  description,
  keywords,
  path,
  type = "website",
}: MetadataInput): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const absoluteImage = new URL(siteConfig.socialImage, siteConfig.url).toString();
  const imageAlt = `${siteConfig.name} social preview`;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        { url: absoluteImage, width: 1200, height: 630, alt: imageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: absoluteImage, alt: imageAlt }],
    },
  };
}
