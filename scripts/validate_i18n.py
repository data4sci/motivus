#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "src" / "data" / "content.json"
HTML_PATH = ROOT / "src" / "index.html"


def _extract_attr_keys(html: str, attr: str) -> set[str]:
    pattern = re.compile(rf"""{re.escape(attr)}\s*=\s*["']([^"']+)["']""")
    return {match.group(1).strip() for match in pattern.finditer(html) if match.group(1).strip()}


def main() -> int:
    if not CONTENT_PATH.exists():
        print(f"Missing {CONTENT_PATH}", file=sys.stderr)
        return 2
    if not HTML_PATH.exists():
        print(f"Missing {HTML_PATH}", file=sys.stderr)
        return 2

    content = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    cz = content.get("cz", {})
    en = content.get("en", {})

    cz_keys = set(cz.keys())
    en_keys = set(en.keys())
    only_cz = sorted(cz_keys - en_keys)
    only_en = sorted(en_keys - cz_keys)

    ok = True
    if only_cz:
        ok = False
        print("Keys missing in EN:")
        for key in only_cz:
            print(f"  - {key}")
    if only_en:
        ok = False
        print("Keys missing in CZ:")
        for key in only_en:
            print(f"  - {key}")

    html = HTML_PATH.read_text(encoding="utf-8")
    used = set()
    used |= _extract_attr_keys(html, "data-i18n")
    used |= _extract_attr_keys(html, "data-i18n-placeholder")
    used |= _extract_attr_keys(html, "data-i18n-aria-label")

    missing = sorted([k for k in used if k not in cz_keys or k not in en_keys])
    if missing:
        ok = False
        print("Keys used in HTML but missing in content.json:")
        for key in missing:
            print(f"  - {key}")

    if ok:
        print("OK: i18n keys are consistent.")
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

