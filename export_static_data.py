from __future__ import annotations

import json
import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DATABASE = ROOT / "blm_camping.sqlite"
OUTPUT = ROOT / "static" / "data"


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    try:
        rows = connection.execute(
            """
            SELECT s.*, src.title AS source_title, src.page_number,
                   src.image_filename,
                   GROUP_CONCAT(f.name, '|') AS feature_names
            FROM sites AS s
            JOIN sources AS src ON src.id = s.source_id
            LEFT JOIN site_features AS sf ON sf.site_id = s.id
            LEFT JOIN features AS f ON f.id = sf.feature_id
            GROUP BY s.id
            ORDER BY s.name COLLATE NOCASE
            """
        ).fetchall()

        sites = []
        for row in rows:
            site = dict(row)
            feature_names = site.pop("feature_names")
            site["features"] = feature_names.split("|") if feature_names else []
            sites.append(site)

        features = [
            dict(row)
            for row in connection.execute(
                """
                SELECT f.name, COUNT(sf.site_id) AS site_count
                FROM features AS f
                LEFT JOIN site_features AS sf ON sf.feature_id = f.id
                GROUP BY f.id
                ORDER BY f.name COLLATE NOCASE
                """
            )
        ]
    finally:
        connection.close()

    (OUTPUT / "sites.json").write_text(
        json.dumps(sites, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUTPUT / "features.json").write_text(
        json.dumps({"features": features}, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Exported {len(sites)} sites and {len(features)} features to {OUTPUT}")


if __name__ == "__main__":
    main()
