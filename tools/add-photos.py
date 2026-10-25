#!/usr/bin/env python3
"""Prepare photographs for the site.

    python3 tools/add-photos.py PHOTO.jpg [PHOTO.jpg ...] --prefix shore-evening

For each photo this writes WebP files into images/ at the widths the site expects
(landscape 400/800/1400/2000, portrait 600/1000/1400), with all metadata removed
(no EXIF, no GPS), and prints an entry to paste into assets/data/photos.js.
Fill in the alt text in both languages before publishing.

Needs Pillow (pip install Pillow).
"""
import argparse
import os
import re
import sys

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "images")


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("photos", nargs="+")
    ap.add_argument("--prefix", required=True, help="start of each photo id, e.g. the story id")
    ap.add_argument("--quality", type=int, default=80)
    args = ap.parse_args()

    prefix = slug(args.prefix)
    for n, path in enumerate(args.photos, 1):
        name = f"{prefix}-{n:02d}"
        if os.path.exists(os.path.join(OUT, f"{name}-800.webp")) or os.path.exists(os.path.join(OUT, f"{name}-600.webp")):
            sys.exit(f"{name} already exists in images/. Choose another --prefix.")
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        w, h = im.size
        portrait = h > w
        for target in ([600, 1000, 1400] if portrait else [400, 800, 1400, 2000]):
            out = im.resize((target, round(h * target / w)), Image.LANCZOS) if target < w else im
            out.save(os.path.join(OUT, f"{name}-{target}.webp"), "WEBP", quality=args.quality, method=6)
        extra = ""
        if portrait and abs(w / h - 2 / 3) > 0.01:
            extra = f" w: {w}, h: {h},"
        elif not portrait and abs(w / h - 3 / 2) > 0.01:
            extra = f" w: {w}, h: {h},"
        flag = " portrait: true," if portrait else ""
        print(f"  '{name}':{' ' * max(1, 21 - len(name))}{{{flag}{extra}\n"
              f"    alt: {{ he: '', en: '' }} }},   /* {os.path.basename(path)} */")


if __name__ == "__main__":
    main()
