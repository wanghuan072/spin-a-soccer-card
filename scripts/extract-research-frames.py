from pathlib import Path

import cv2


SOURCE_DIR = Path(r"C:\Users\W\AppData\Local\Temp\spin-card-video-audit")
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "evidence"

FRAMES = {
    "ZvTLThC_xqA.mp4": {
        "blackmoon-update-panel.webp": 14.0,
        "current-pack-shop-top.webp": 24.0,
        "current-pack-shop.webp": 25.0,
        "weareback-code.webp": 69.0,
        "transcendent-pack-opening.webp": 79.0,
        "varmolen-card.webp": 84.0,
        "alverton-card.webp": 89.0,
        "devalto-card-frame.webp": 94.0,
    },
    "m6L8YLl3zsU.mp4": {
        "wish-reward-board.webp": 52.0,
        "wish-station.webp": 97.0,
        "hero-crystal-code.webp": 142.0,
    },
    "D9PPPTi4LHg.mp4": {
        "current-card-inventory.webp": 42.0,
        "trade-plaza.webp": 272.0,
        "trade-card-offers.webp": 293.0,
    },
}

CROPS = {
    "varmolen-card.webp": (430, 120, 840, 660, "card-varmolen.webp"),
    "alverton-card.webp": (430, 120, 840, 660, "card-alverton.webp"),
    "devalto-card-frame.webp": (430, 120, 840, 660, "card-devalto.webp"),
    "current-card-inventory.webp": (120, 0, 610, 430, "card-wildenz.webp"),
    "current-pack-shop.webp": (250, 0, 940, 355, "pack-ordan.webp"),
    "current-pack-shop.webp#alpha": (250, 300, 940, 650, "pack-alpha.webp"),
    "current-pack-shop-top.webp#cosmic": (250, 290, 940, 650, "pack-cosmic.webp"),
    "transcendent-pack-opening.webp": (380, 40, 900, 680, "pack-transcendent.webp"),
    "blackmoon-update-panel.webp": (310, 90, 970, 650, "update-blackmoon.webp"),
}


def extract_frame(video_path: Path, second: float, output_path: Path) -> None:
    capture = cv2.VideoCapture(str(video_path))
    fps = capture.get(cv2.CAP_PROP_FPS)
    target_frame = round(second * fps)
    ok = False
    frame = None
    for _ in range(target_frame + 1):
        ok, frame = capture.read()
        if not ok:
            break
    capture.release()
    if not ok or frame is None:
        raise RuntimeError(f"Could not read {video_path.name} at {second}s")

    height, width = frame.shape[:2]
    frame = cv2.resize(frame, (width * 2, height * 2), interpolation=cv2.INTER_LANCZOS4)
    if not cv2.imwrite(str(output_path), frame, [cv2.IMWRITE_WEBP_QUALITY, 92]):
        raise RuntimeError(f"Could not write {output_path}")


OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
for source_name, entries in FRAMES.items():
    source_path = SOURCE_DIR / source_name
    for output_name, timestamp in entries.items():
        extract_frame(source_path, timestamp, OUTPUT_DIR / output_name)
        print(f"{output_name}: {source_name} @ {timestamp:.1f}s")

for crop_key, (left, top, right, bottom, output_name) in CROPS.items():
    source_name = crop_key.split("#", 1)[0]
    source = cv2.imread(str(OUTPUT_DIR / source_name))
    crop = source[top:bottom, left:right]
    cv2.imwrite(str(OUTPUT_DIR / output_name), crop, [cv2.IMWRITE_WEBP_QUALITY, 94])
    print(f"{output_name}: crop from {source_name}")
