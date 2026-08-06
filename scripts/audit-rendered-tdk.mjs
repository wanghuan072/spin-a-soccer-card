import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const siteShared = JSON.parse(
  await readFile(resolve(root, "src/config/site-shared.json"), "utf8"),
);
const pageLastmod = JSON.parse(
  await readFile(resolve(root, "src/seo/page-lastmod.json"), "utf8"),
);
const socialImage = new URL(siteShared.socialImage, siteShared.url).toString();
const baseUrl = (process.env.TDK_AUDIT_URL || "http://127.0.0.1:3017").replace(
  /\/$/,
  "",
);

const detailSources = [
  ["cards", "cards.json"],
  ["packs", "packs.json"],
  ["guides", "guides.json"],
  ["mutations", "mutations.json"],
  ["rarities", "rarities.json"],
  ["rebirths", "rebirths.json"],
  ["updates", "updates.json"],
];

const staticPaths = {
  home: "/",
  cards: "/cards",
  packs: "/packs",
  values: "/values",
  guides: "/guides",
  codes: "/codes",
  updates: "/updates",
  mutations: "/mutations",
  rarities: "/rarities",
  rebirths: "/rebirths",
  gamepasses: "/gamepasses",
  research: "/research",
  privacy: "/legal/privacy-policy",
  terms: "/legal/terms-of-service",
  copyright: "/legal/copyright",
  about: "/legal/about-us",
  contact: "/legal/contact-us",
};

const bannedVisibleTerms = [
  /\bsummary\b/i,
  /\bsource(?:s)?\b/i,
  /\bevidence\b/i,
  /\bresearch\b/i,
  /\bmethodology\b/i,
  /\bverification\b/i,
  /\bverified\b/i,
  /\bsnapshot\b/i,
  /\breported\b/i,
  /\bobserved\b/i,
  /\bcitation(?:s)?\b/i,
  /\beditorial\b/i,
  /\baudit\b/i,
  /\bquick answer\b/i,
  /\bprimary source\b/i,
];
const bannedTemplateHeadings = [
  /^How to get .+ in Spin a Soccer Card$/i,
  /^Other Spin a Soccer Card pulls from /i,
  /^Useful for this card$/i,
  /^How to open this pack well$/i,
  /^Test the multiplier in your lobby$/i,
  /^How rarity links work$/i,
  /^Reset checklist$/i,
  /^What to check after this Spin a Soccer Card update$/i,
  /^Keep going$/i,
  /^Useful pages$/i,
];
const paragraphOwners = new Map();

const decodeHtml = (value = "") =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const cleanText = (value = "") =>
  decodeHtml(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, doubleQuoted, singleQuoted]) => [
        name.toLowerCase(),
        decodeHtml(doubleQuoted ?? singleQuoted ?? ""),
      ],
    ),
  );
}

async function loadStaticTdk() {
  const source = await readFile(resolve(root, "src/seo/tdk.js"), "utf8");
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  return (await import(moduleUrl)).pageTdk;
}

async function loadExpected() {
  const staticTdk = await loadStaticTdk();
  const expected = new Map(
    Object.entries(staticTdk).map(([id, entry]) => [staticPaths[id], entry]),
  );

  for (const [family, filename] of detailSources) {
    const records = JSON.parse(
      await readFile(resolve(root, "src/data/game", filename), "utf8"),
    );
    for (const record of records) {
      expected.set(`/${family}/${record.slug}`, {
        ...record.seo,
        path: `/${family}/${record.slug}`,
        expectedH1: family === "cards" ? record.name : undefined,
      });
    }
  }

  return expected;
}

async function auditPage(path, expected) {
  const response = await fetch(`${baseUrl}${path}`);
  const html = await response.text();
  const head = html.split("</head>")[0];
  const title = cleanText(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const meta = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) =>
    attributes(tag),
  );
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) =>
    attributes(tag),
  );
  const description = meta.find((tag) => tag.name === "description")?.content;
  const keywords = meta.find((tag) => tag.name === "keywords")?.content;
  const canonical = links.find((tag) => tag.rel === "canonical")?.href;
  const metaContent = (key) =>
    meta.find((tag) => tag.name === key || tag.property === key)?.content;
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1 = cleanText(h1Matches[0]?.[1]);
  const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const mainText = cleanText(
    mainHtml
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " "),
  );
  const bodyHtml = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const visibleText = cleanText(
    bodyHtml
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " "),
  );
  const wordCount = mainText.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g)?.length ?? 0;
  const paragraphs = [
    ...mainHtml.matchAll(/<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi),
  ]
    .map(([, value]) => cleanText(value))
    .filter((value) => value.length >= 120);
  const contentHeadings = [
    ...mainHtml.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi),
  ].map(([, value]) => cleanText(value));
  const internalLinks = [...mainHtml.matchAll(/<a\b[^>]*>/gi)]
    .map(([tag]) => attributes(tag).href)
    .filter((href) => href?.startsWith("/"))
    .map((href) => new URL(href, baseUrl).pathname);
  const errors = [];
  const expectedCanonical =
    path === "/" ? siteShared.url : new URL(path, siteShared.url).toString();
  const detailPage = detailSources.some(([family]) =>
    path.startsWith(`/${family}/`),
  );

  if (!response.ok) errors.push(`HTTP ${response.status}`);
  if (title !== expected.title)
    errors.push("title does not match its TDK source");
  if (description !== expected.description)
    errors.push("description does not match its TDK source");
  if (title.length < 40 || title.length > 60)
    errors.push(`title length ${title.length}`);
  if (!description || description.length < 140 || description.length > 160)
    errors.push(`description length ${description?.length ?? 0}`);
  if (!keywords) errors.push("keywords meta is missing");
  for (const keyword of expected.keywords) {
    if (!keywords?.toLowerCase().includes(keyword.toLowerCase()))
      errors.push(`missing rendered keyword: ${keyword}`);
  }
  if (h1Matches.length !== 1) errors.push(`H1 count ${h1Matches.length}`);
  if (!h1) errors.push("H1 is empty");
  if (expected.expectedH1 && h1 !== expected.expectedH1)
    errors.push(`H1 does not match the card name: ${expected.expectedH1}`);
  if (canonical !== expectedCanonical)
    errors.push(`canonical does not match ${expectedCanonical}`);

  const socialExpectations = {
    "og:title": expected.title,
    "og:description": expected.description,
    "og:url": expectedCanonical,
    "og:type": detailPage ? "article" : "website",
    "og:image": socialImage,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "Spin a Soccer Card Wiki social preview",
    "twitter:card": "summary_large_image",
    "twitter:title": expected.title,
    "twitter:description": expected.description,
    "twitter:image": socialImage,
    "twitter:image:alt": "Spin a Soccer Card Wiki social preview",
  };
  for (const [key, value] of Object.entries(socialExpectations)) {
    if (metaContent(key) !== value) errors.push(`${key} is missing or incorrect`);
  }

  const structuredData = [
    ...html.matchAll(
      /<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].flatMap(([, value]) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      errors.push("contains invalid JSON-LD");
      return [];
    }
  });
  const schemas = structuredData.flatMap((entry) =>
    Array.isArray(entry?.["@graph"]) ? entry["@graph"] : [entry],
  );
  const pageTypes = new Set([
    "WebPage",
    "CollectionPage",
    "AboutPage",
    "ContactPage",
  ]);
  const pageSchema = schemas.find((entry) => pageTypes.has(entry?.["@type"]));
  if (!pageSchema) {
    errors.push("WebPage structured data is missing");
  } else {
    if (pageSchema.url !== expectedCanonical)
      errors.push("WebPage structured data URL is incorrect");
    if (pageSchema.dateModified !== pageLastmod[path])
      errors.push("WebPage dateModified does not match sitemap history");
    if (pageSchema.primaryImageOfPage?.url !== socialImage)
      errors.push("WebPage image does not match the shared social image");
  }
  if (path !== "/" && !schemas.some((entry) => entry?.["@type"] === "BreadcrumbList"))
    errors.push("BreadcrumbList structured data is missing");
  if (detailPage && !schemas.some((entry) => entry?.["@type"] === "Article"))
    errors.push("Article structured data is missing");
  if (path === "/") {
    const website = schemas.find((entry) => entry?.["@type"] === "WebSite");
    const expectedSearchTarget = `${siteShared.url}/cards?query={search_term_string}`;
    if (!website) {
      errors.push("WebSite structured data is missing");
    } else {
      if (website.potentialAction?.target !== expectedSearchTarget)
        errors.push("WebSite search target does not use the card query parameter");
      if (
        website.potentialAction?.["query-input"] !==
        "required name=search_term_string"
      )
        errors.push("WebSite search input declaration is incorrect");
    }
  }

  for (const term of bannedVisibleTerms) {
    const match = visibleText.match(term)?.[0];
    if (match) errors.push(`visible page copy contains "${match}"`);
  }
  for (const heading of contentHeadings) {
    if (bannedTemplateHeadings.some((pattern) => pattern.test(heading)))
      errors.push(`template heading remains: "${heading}"`);
  }

  for (const paragraph of paragraphs) {
    const normalized = paragraph.toLowerCase().replace(/\s+/g, " ");
    const owners = paragraphOwners.get(normalized) ?? [];
    owners.push(path);
    paragraphOwners.set(normalized, owners);
  }

  return { path, errors, wordCount, internalLinks };
}

const expected = await loadExpected();
const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Unable to load sitemap: HTTP ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  ([, entry]) => ({
    loc: decodeHtml(entry.match(/<loc>(.*?)<\/loc>/)?.[1] ?? ""),
    lastmod: entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  }),
);
const paths = sitemapEntries.map(({ loc }) => new URL(loc).pathname);
const errors = [];
const pageResults = [];

if (/<sitemapindex\b/i.test(sitemap))
  errors.push("Sitemap is an index instead of a standard URL set");
if (!/<urlset\b/i.test(sitemap)) errors.push("Sitemap URL set is missing");
if (new Set(paths).size !== paths.length)
  errors.push("Sitemap contains duplicate URLs");

for (const { loc, lastmod } of sitemapEntries) {
  const url = new URL(loc);
  if (url.origin !== siteShared.url)
    errors.push(`${url.pathname}: sitemap origin is incorrect`);
  if (!lastmod) errors.push(`${url.pathname}: sitemap lastmod is missing`);
  if (lastmod !== pageLastmod[url.pathname])
    errors.push(`${url.pathname}: sitemap lastmod does not match page history`);
}

const publicFiles = await readdir(resolve(root, "public"));
const unexpectedSitemaps = publicFiles.filter((name) =>
  /^sitemap(?:-index|-\d+)\.xml$/i.test(name),
);
if (unexpectedSitemaps.length)
  errors.push(`Unexpected sitemap files: ${unexpectedSitemaps.join(", ")}`);

const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
const robotsText = await robotsResponse.text();
if (!robotsResponse.ok) errors.push(`robots.txt HTTP ${robotsResponse.status}`);
if (!robotsText.includes(`Sitemap: ${siteShared.url}/sitemap.xml`))
  errors.push("robots.txt does not reference the canonical sitemap");

if (paths.length !== expected.size) {
  errors.push(
    `Sitemap has ${paths.length} URLs, but TDK sources define ${expected.size}`,
  );
}

for (const path of paths) {
  const entry = expected.get(path);
  if (!entry) {
    errors.push(`${path}: no matching TDK source`);
    continue;
  }
  const result = await auditPage(path, entry);
  pageResults.push(result);
  errors.push(...result.errors.map((error) => `${path}: ${error}`));
}

for (const path of expected.keys()) {
  if (!paths.includes(path)) errors.push(`${path}: missing from sitemap`);
}

const sitemapPaths = new Set(paths);
for (const result of pageResults) {
  for (const link of result.internalLinks) {
    if (!sitemapPaths.has(link))
      errors.push(
        `${result.path}: internal link points outside sitemap: ${link}`,
      );
  }
}

const repeatedParagraphs = [...paragraphOwners.values()].filter(
  (owners) => new Set(owners).size >= 5,
);
for (const owners of repeatedParagraphs) {
  errors.push(
    `same long paragraph appears on ${new Set(owners).size} pages: ${[...new Set(owners)].join(", ")}`,
  );
}

const thinPages = pageResults
  .filter((result) => result.wordCount < 300)
  .sort((a, b) => a.wordCount - b.wordCount);
const minimumWordCounts = new Map();
for (const result of pageResults) {
  const minimum = minimumWordCounts.get(result.path);
  if (minimum && result.wordCount < minimum)
    errors.push(
      `${result.path}: main copy has ${result.wordCount} words; expected at least ${minimum}`,
    );
}

console.log(`Rendered sitemap URLs: ${paths.length}`);
console.log(`Expected TDK entries: ${expected.size}`);
console.log(`Pages below 300 main words: ${thinPages.length}`);
console.log(
  `Repeated long paragraphs on 5+ pages: ${repeatedParagraphs.length}`,
);
if (thinPages.length) {
  console.log(
    `Lowest main word counts: ${thinPages
      .slice(0, 12)
      .map((entry) => `${entry.path}=${entry.wordCount}`)
      .join(", ")}`,
  );
}
console.log(`Rendered errors: ${errors.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
