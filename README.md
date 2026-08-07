# Spin a Soccer Card Wiki

An unofficial, player-built database and guide site for the Roblox game **Spin a Soccer Card**. The site separates official APIs, dated gameplay evidence, conflicting reports and historical records instead of presenting scraped tables as confirmed facts.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run start
```

## Project structure

- `src/app` — thin Next.js route entries, metadata endpoints, sitemap and robots
- `src/page` — complete page implementations
- `src/components` — reusable layout, directory and interactive components
- `src/style` — global styles and CSS modules
- `src/data` — pure JSON content collections
- `src/types`, `src/lib`, `src/config`, `src/seo` — contracts, loaders, site settings and SEO helpers
- `public/images` — locally stored official Roblox media, gameplay evidence frames and source-linked historical thumbnails
- `docs/research-sources.md` — field-level evidence ledger and coverage boundaries

## Before publishing

The production domain is `https://spinasoccercard.com`, and the public contact address is `wyong@spinasoccercard.com`. Recheck dated gameplay records against the current live game before changing them to official-source status or publishing odds, values or availability claims.
