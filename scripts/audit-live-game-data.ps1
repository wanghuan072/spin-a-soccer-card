$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$dataRoot = Join-Path $projectRoot "src/data/game"
$snapshot = Get-Content (Join-Path $dataRoot "site.json") -Raw | ConvertFrom-Json
$localPasses = Get-Content (Join-Path $dataRoot "gamepasses.json") -Raw | ConvertFrom-Json
$errors = [System.Collections.Generic.List[string]]::new()
$universeId = $snapshot.officialSnapshot.universeId

$gameResponse = Invoke-RestMethod -Uri "https://games.roblox.com/v1/games?universeIds=$universeId"
$liveGame = $gameResponse.data | Select-Object -First 1

if (-not $liveGame) {
  $errors.Add("Official Roblox universe was not returned")
} else {
  $stableFields = @(
    @("universeId", "id"),
    @("rootPlaceId", "rootPlaceId"),
    @("maxPlayers", "maxPlayers")
  )
  foreach ($fieldPair in $stableFields) {
    $localField = $fieldPair[0]
    $liveField = $fieldPair[1]
    $localValue = $snapshot.officialSnapshot.$localField
    $liveValue = $liveGame.$liveField
    if ($localValue -ne $liveValue) {
      $errors.Add("Roblox ${localField}: local=$localValue, live=$liveValue")
    }
  }
  if ($snapshot.officialSnapshot.creator -ne $liveGame.creator.name) {
    $errors.Add("Roblox creator: local=$($snapshot.officialSnapshot.creator), live=$($liveGame.creator.name)")
  }
}

$passResponse = Invoke-RestMethod -Uri "https://apis.roblox.com/game-passes/v1/universes/$universeId/game-passes?passView=Full&limit=100"
$livePasses = $passResponse.gamePasses
if ($livePasses.Count -ne $localPasses.Count) {
  $errors.Add("Game-pass count: local=$($localPasses.Count), live=$($livePasses.Count)")
}

foreach ($local in $localPasses) {
  $live = $livePasses | Where-Object { $_.id -eq $local.id } | Select-Object -First 1
  if (-not $live) {
    $errors.Add("Game pass $($local.id) is missing from the official API")
    continue
  }
  foreach ($field in @("name", "price", "isForSale")) {
    if ($local.$field -ne $live.$field) {
      $errors.Add("Game pass $($local.id) ${field}: local=$($local.$field), live=$($live.$field)")
    }
  }
}

$videoIds = [System.Collections.Generic.HashSet[string]]::new()
$jsonFiles = @(
  "cards.json",
  "codes.json",
  "guides.json",
  "mutations.json",
  "packs.json",
  "rebirths.json",
  "trade-observations.json",
  "updates.json"
)
foreach ($filename in $jsonFiles) {
  $content = Get-Content (Join-Path $dataRoot $filename) -Raw
  foreach ($match in [regex]::Matches($content, 'youtube\.com/watch\?v=([\w-]{11})')) {
    [void]$videoIds.Add($match.Groups[1].Value)
  }
}

$researchPage = Get-Content (Join-Path $projectRoot "src/page/research/ResearchPage.tsx") -Raw
$researchVideoSection = ($researchPage -split "const competitors", 2)[0]
foreach ($match in [regex]::Matches($researchVideoSection, '"([\w-]{11})"')) {
  [void]$videoIds.Add($match.Groups[1].Value)
}

foreach ($id in $videoIds) {
  $watchUrl = [uri]::EscapeDataString("https://www.youtube.com/watch?v=$id")
  try {
    $metadata = Invoke-RestMethod -Uri "https://www.youtube.com/oembed?url=$watchUrl&format=json"
    if (-not $metadata.title -or -not $metadata.author_name) {
      $errors.Add("YouTube ${id}: metadata is incomplete")
    }
  } catch {
    $errors.Add("YouTube ${id}: $($_.Exception.Message)")
  }
}

Write-Output "Official Roblox universe: $($liveGame.name)"
Write-Output "Official game passes matched: $($localPasses.Count)"
Write-Output "Referenced YouTube videos reachable: $($videoIds.Count)"
Write-Output "Live-data errors: $($errors.Count)"
if ($errors.Count) {
  $errors | ForEach-Object { Write-Error $_ }
  exit 1
}
