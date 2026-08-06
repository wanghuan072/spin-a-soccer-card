/* eslint-disable @typescript-eslint/no-require-imports */
const { getSitemapRoutes } = require("./src/seo/sitemap-routes.cjs");
const pageLastmod = require("./src/seo/page-lastmod.json");
const siteShared = require("./src/config/site-shared.json");

const routes = getSitemapRoutes();
const fields = routes.map((entry) => ({
  loc: entry.path,
  changefreq: entry.changefreq,
  priority: entry.priority,
  lastmod: pageLastmod[entry.path],
}));
const fieldsByPath = new Map(fields.map((entry) => [entry.loc, entry]));

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteShared.url,
  outDir: "public",
  sitemapBaseFileName: "sitemap",
  sitemapSize: 50000,
  generateIndexSitemap: false,
  generateRobotsTxt: false,
  autoLastmod: false,
  transform: async (_config, routePath) => fieldsByPath.get(routePath) ?? null,
  additionalPaths: async () => fields,
};
