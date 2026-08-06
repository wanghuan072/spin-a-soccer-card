from pathlib import Path

import cv2


SOURCE_DIR = Path(r"C:\Users\W\AppData\Local\Temp\spin-card-expanded-research")
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "video"

FRAMES = {
    "fAM7LxYD0t0.mp4": {
        "scarlet-pack-session.webp": 20.0,
        "card-odegaard-frame.webp": 140.0,
        "card-raphinha-frame.webp": 160.0,
        "card-saka-frame.webp": 180.0,
        "card-zubimendi-frame.webp": 200.0,
        "card-nesta-frame.webp": 220.0,
        "card-carlos-frame.webp": 260.0,
        "card-vitinha-frame.webp": 280.0,
        "card-maldini-frame.webp": 300.0,
        "card-musiala-frame.webp": 340.0,
        "card-donnarumma-frame.webp": 360.0,
        "card-buffon-frame.webp": 400.0,
        "blaze-storm-redemption.webp": 480.0,
    },
    "mCLA9zs7fR0.mp4": {
        "summer-shop.webp": 80.0,
        "summer-exclusive-cards.webp": 160.0,
        "summer-mutation-index.webp": 280.0,
        "summer-tournament-shop.webp": 340.0,
        "summer-admin-event.webp": 400.0,
    },
    "jd0A6J6uDmY.mp4": {
        "late-game-pack-shop.webp": 20.0,
        "late-game-mutation-index.webp": 100.0,
        "tournament-panel.webp": 160.0,
    },
    "jwJixWis6t8.mp4": {
        "trade-token-offer.webp": 20.0,
        "trade-tax-example.webp": 40.0,
        "trade-booth.webp": 60.0,
    },
    "p6aR7xHqjwQ.mp4": {
        "early-pack-shop.webp": 40.0,
        "rebirth-2-panel.webp": 100.0,
        "card-bank.webp": 180.0,
        "rebirth-3-panel.webp": 240.0,
        "rebirth-4-panel.webp": 280.0,
        "rebirth-5-panel.webp": 300.0,
    },
    "qBYB37l8HZ8.mp4": {
        "gamepass-shop-gameplay.webp": 240.0,
        "weather-potions.webp": 280.0,
        "historical-mutation-index.webp": 440.0,
        "trade-token-shop.webp": 540.0,
        "card-havertz-frame.webp": 40.0,
        "card-davies-frame.webp": 80.0,
        "card-arda-guler-frame.webp": 100.0,
        "card-wirtz-frame.webp": 320.0,
        "card-lewandowski-frame.webp": 800.0,
        "card-garnacho-frame.webp": 940.0,
        "card-messi-lunar-frame.webp": 980.0,
    },
    "SIaYH2816I8.mp4": {
        "rebirth-4-april-panel.webp": 40.0,
        "craft-trophy-shop.webp": 200.0,
    },
    "XmpK31r9vpk.mp4": {
        "admin-wish-panel.webp": 200.0,
        "update-8-log.webp": 300.0,
    },
    "bOCz4Vmme04.mp4": {
        "oracle-pack-index.webp": 160.0,
    },
}

CARD_CROPS = {
    "card-nesta-frame.webp": "card-nesta.webp",
    "card-odegaard-frame.webp": "card-odegaard.webp",
    "card-raphinha-frame.webp": "card-raphinha.webp",
    "card-saka-frame.webp": "card-saka.webp",
    "card-zubimendi-frame.webp": "card-zubimendi.webp",
    "card-carlos-frame.webp": "card-carlos.webp",
    "card-vitinha-frame.webp": "card-vitinha.webp",
    "card-maldini-frame.webp": "card-maldini.webp",
    "card-musiala-frame.webp": "card-musiala.webp",
    "card-donnarumma-frame.webp": "card-donnarumma.webp",
    "card-buffon-frame.webp": "card-buffon.webp",
    "card-havertz-frame.webp": "card-havertz.webp",
    "card-davies-frame.webp": "card-davies.webp",
    "card-arda-guler-frame.webp": "card-arda-guler.webp",
    "card-wirtz-frame.webp": "card-wirtz.webp",
    "card-lewandowski-frame.webp": "card-lewandowski.webp",
    "card-garnacho-frame.webp": "card-garnacho.webp",
    "card-messi-lunar-frame.webp": "card-messi-lunar.webp",
}


def extract_frame(video_path: Path, second: float, output_path: Path) -> None:
    capture = cv2.VideoCapture(str(video_path))
    capture.set(cv2.CAP_PROP_POS_MSEC, second * 1000)
    ok, frame = capture.read()
    capture.release()
    if not ok or frame is None:
        raise RuntimeError(f"Could not read {video_path.name} at {second}s")

    height, width = frame.shape[:2]
    frame = cv2.resize(frame, (width * 2, height * 2), interpolation=cv2.INTER_LANCZOS4)
    if not cv2.imwrite(str(output_path), frame, [cv2.IMWRITE_WEBP_QUALITY, 91]):
        raise RuntimeError(f"Could not write {output_path}")


OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
for source_name, entries in FRAMES.items():
    source_path = SOURCE_DIR / source_name
    if not source_path.exists():
        raise FileNotFoundError(source_path)
    for output_name, timestamp in entries.items():
        extract_frame(source_path, timestamp, OUTPUT_DIR / output_name)
        print(f"{output_name}: {source_name} @ {timestamp:.1f}s")

for source_name, output_name in CARD_CROPS.items():
    source = cv2.imread(str(OUTPUT_DIR / source_name))
    crop = source[70:660, 410:870]
    cv2.imwrite(str(OUTPUT_DIR / output_name), crop, [cv2.IMWRITE_WEBP_QUALITY, 94])
    print(f"{output_name}: centered card crop from {source_name}")
