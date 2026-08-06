# Spin a Soccer Card research ledger

Audit date: 2026-08-05

Evidence order used by the project:

1. Official Roblox APIs and official game media
2. Readable, dated gameplay footage
3. Multiple independent community reports
4. Historical creator records

A source confirms only the fields it visibly contains. A typed code is not a successful redemption, one pull is not a drop rate, and one trade is not a permanent value.

## Official Roblox baseline

- Game metadata: https://games.roblox.com/v1/games?universeIds=9272693470
  - Universe `9272693470`, root place `112490729816320`
  - Verified creator `Pixellar Studios | RSC`
  - Game returned as live at the August 5 query
  - Snapshot values: 4,507 playing, 263,228,778 visits, 8-player servers
  - API update timestamp: 2026-08-03T16:15:54.944267Z
  - `copyingAllowed` is false
- Official media: https://games.roblox.com/v2/games/9272693470/media
  - Shows Rovaso and Rocaino at 115
  - Does not expose a full roster, income, pack source or value
- Official place inventory: https://develop.roblox.com/v1/universes/9272693470/places?isUniverseCreation=false&limit=100&sortOrder=Asc
  - Lists `Spin a Soccer Card: Trade World`, place `124069176440953`
- Official game-pass inventory: https://apis.roblox.com/game-passes/v1/universes/9272693470/game-passes?passView=Full&limit=100
  - 11 products: 10 on sale, one not for sale at the snapshot
  - Names, IDs, prices and sale states are stored in `src/data/game/gamepasses.json`
- Protected place asset: https://assetdelivery.roblox.com/v2/assetId/112490729816320
  - Returns authentication required; protected place files and scripts were not bypassed or decompiled

## Current gameplay evidence

- Return update and code: https://www.youtube.com/watch?v=ZvTLThC_xqA — 2026-07-30
  - Bloodmoon and Limited Blackmoon cards
  - New packs, Rebirth 19, Weekly Calendar, Blessed Stock, trophy and performance changes
  - Current Shop rows for Cosmic, Ordan and Alpha
  - Transcendent Pack reward and readable Varmolen, Alverton and Devalto pulls
  - `WEAREBACK` visible in the code field
- Wishes and code: https://www.youtube.com/watch?v=m6L8YLl3zsU — 2026-08-02
  - Wish reward categories
  - `HERO-CRYSTAL` visible in the code field
- Current inventory and trading: https://www.youtube.com/watch?v=D9PPPTi4LHg — 2026-08-03
  - Inventory filters and capacity display
  - Wildenz plot record and displayed income
  - Trade Chat, offers and currency input
- Dated transaction description: https://www.youtube.com/watch?v=2BbIJdWXLrs — 2026-07-14
  - Nebula Gabriel: 1,400 Trade Tokens
  - Nebula Havertz: 1,550 Trade Tokens
  - Stored as two observations, not current market values

## Codes and conflicts

- Pro Game Guides: https://progameguides.com/roblox/spin-a-soccer-card-codes/
- Pocket Gamer: https://www.pocketgamer.com/roblox/spin-a-soccer-card-codes/
- MrGuider: https://www.mrguider.org/roblox/spin-a-soccer-card-codes/

Late-July trackers disagree about `DRAGON-PRIME` and `OWL-HAPPY`. The local data therefore marks them `reported`, not active. `RAVEN-COMET` and `BIGUPDATECOMING` are also reports until a redemption result is captured.

## Historical pack records

- Fallen Pack: https://www.youtube.com/watch?v=F9Kc1PUnBYs — 2026-05-10
- Dusk Pack: https://www.youtube.com/watch?v=aWRw0u8MZm0 — 2026-04-27
- Oracle Pack: https://www.youtube.com/watch?v=bOCz4Vmme04 — 2026-04-02

These records prove the pack existed in the recorded version. They do not establish current Shop availability, cost or odds.

## Expanded YouTube sample

The audit reviewed 14 relevant gameplay videos across March–August 2026 rather than relying on one current creator session:

- 2026-03-09: https://www.youtube.com/watch?v=p6aR7xHqjwQ — Bank, Rebirth 2–5 and early packs
- 2026-04-02: https://www.youtube.com/watch?v=bOCz4Vmme04 — Oracle Pack and historical 1,199-slot Index
- 2026-04-15: https://www.youtube.com/watch?v=SIaYH2816I8 — crafting, trophies and a changed Rebirth 4 price
- 2026-05-04: https://www.youtube.com/watch?v=XmpK31r9vpk — Update 8, Wish and signed cards
- 2026-06-10: https://www.youtube.com/watch?v=zx0XRv9S0q8 — rare-card session
- 2026-06-17: https://www.youtube.com/watch?v=qBYB37l8HZ8 — weather, Game Pass shop and mutation Index
- 2026-06-20: https://www.youtube.com/watch?v=cZXNuLYTbS4 — trading behavior
- 2026-07-04: https://www.youtube.com/watch?v=mCLA9zs7fR0 — Summer Update 16, Aqua, Tournament Shop and Galactic
- 2026-07-05: https://www.youtube.com/watch?v=fAM7LxYD0t0 — Scarlet pulls and successful `BLAZE-STORM` redemption
- 2026-07-16: https://www.youtube.com/watch?v=jd0A6J6uDmY — Lucid, Nightmare and late mutation tabs
- 2026-07-22: https://www.youtube.com/watch?v=jwJixWis6t8 — Trade Tokens, booths and tax
- 2026-07-30, 2026-08-02 and 2026-08-03: the three current-era sources listed above

## Competitor discovery coverage

- https://spinasoccercard.wiki/cards/ — card, pack and rebirth claim discovery
- https://spinasoccercards.wiki/ — broad guide/database structure comparison
- https://robloxden.com/game-codes/spin-a-soccer-card — current/check/expired code leads
- Pocket Gamer, Pro Game Guides and MrGuider — reward and status conflict checks

Competitor totals, prices and status labels are never promoted directly to verified game facts. A major example is Rebirth 4: March footage shows `$650M`, while April footage shows `$600M`. Both remain dated historical observations.

## Coverage boundary

- The project does not claim a complete current roster or pack total because Roblox exposes neither through the checked APIs.
- The card data contains 24 readable official-media and gameplay records: 6 current-source records and 18 historical records.
- Old real-player imagery is used only in the Messi and Ronaldo historical status guides.
- Mutation multipliers, pack odds, current value trends and unknown first-seen code dates remain blank.


## August 6 content refresh

- Official universe snapshot re-checked: visits `263,836,809`, playing `4,445` at query time; API `updated` timestamp still `2026-08-03T16:15:54.944Z`.
- Codes:
  - `HERO-CRYSTAL` / `WEAREBACK` remain `video-verified` field sightings; reward text updated from August guides with conflict notes for `WEAREBACK`.
  - `DRAGON-PRIME`, `OWL-HAPPY` and `BIGUPDATECOMING` stay `reported` because Beebom expired lists disagree with Nerdschalk working lists.
  - `BLAZE-STORM`, `PRIME-TURBO`, `EPIC-LION`, `PHOENIX-MYTHIC`, `COMET-SHARK` and `RAVEN-COMET` moved to `expired` after August archives agreed.
  - Fifteen common expired archive strings were added for coverage only.
- 2026-08-06 Codes page redesign cross-check:
  - Beebom (updated Aug 4): working = `HERO-CRYSTAL`, `WEAREBACK`; lists `DRAGON-PRIME` / `OWL-HAPPY` / `BIGUPDATECOMING` as expired.
  - Nerdschalk (August page): still lists those three plus `HERO-CRYSTAL` / `WEAREBACK` as working; `WEAREBACK` reward text differs (3 Transcendent packs + 3 spins).
  - Player page order: intro → available → try → redeem (real UI shots) → expired archive → FAQ.
- Added multi-source or historical status records for Drowned mutation, Champions Pack, Rebirth 18, Ronaldo, Neymar, Allison, Mbappe, Haaland, Turnly and Abilian.
- Competitor multiplier, Wheel percentage and complete-roster claims remain excluded unless a readable UI string or dated pull proves the field.
