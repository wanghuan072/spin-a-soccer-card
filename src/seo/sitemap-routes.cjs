/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");

const dataRoot = path.join(__dirname, "..", "data", "game");

const fixedRoutes = [
  { path: "/", changefreq: "weekly", priority: 1 },
  { path: "/cards", changefreq: "weekly", priority: 0.9 },
  { path: "/packs", changefreq: "weekly", priority: 0.9 },
  { path: "/values", changefreq: "weekly", priority: 0.9 },
  { path: "/guides", changefreq: "weekly", priority: 0.9 },
  { path: "/codes", changefreq: "weekly", priority: 0.9 },
  { path: "/updates", changefreq: "weekly", priority: 0.9 },
  { path: "/mutations", changefreq: "monthly", priority: 0.8 },
  { path: "/rarities", changefreq: "monthly", priority: 0.8 },
  { path: "/rebirths", changefreq: "monthly", priority: 0.8 },
  { path: "/gamepasses", changefreq: "monthly", priority: 0.8 },
  { path: "/research", changefreq: "monthly", priority: 0.7 },
  { path: "/legal/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { path: "/legal/terms-of-service", changefreq: "yearly", priority: 0.3 },
  { path: "/legal/copyright", changefreq: "yearly", priority: 0.3 },
  { path: "/legal/about-us", changefreq: "yearly", priority: 0.5 },
  { path: "/legal/contact-us", changefreq: "yearly", priority: 0.4 },
];

const detailFamilies = [
  ["cards", "cards.json"],
  ["packs", "packs.json"],
  ["guides", "guides.json"],
  ["updates", "updates.json"],
  ["mutations", "mutations.json"],
  ["rarities", "rarities.json"],
  ["rebirths", "rebirths.json"],
];

function readCollection(filename) {
  return require(path.join(dataRoot, filename));
}

function getSitemapRoutes() {
  const details = detailFamilies.flatMap(([family, filename]) =>
    readCollection(filename).map((entry) => ({
      path: `/${family}/${entry.slug}`,
      changefreq: family === "updates" ? "weekly" : "monthly",
      priority: family === "guides" ? 0.7 : 0.6,
    })),
  );

  return [...fixedRoutes, ...details];
}

module.exports = { getSitemapRoutes };
