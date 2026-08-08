from __future__ import annotations

import json
import mimetypes
import sqlite3
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse


ROOT = Path(__file__).resolve().parent
DATABASE = ROOT / "blm_camping.sqlite"
STATIC_DIR = ROOT / "static"


def database_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


class CampingRequestHandler(BaseHTTPRequestHandler):
    server_version = "BLMCamping/1.0"

    def do_GET(self) -> None:
        request = urlparse(self.path)

        if request.path == "/":
            self.send_file(STATIC_DIR / "index.html")
            return

        if request.path == "/api/sites":
            self.send_sites(parse_qs(request.query))
            return

        if request.path == "/api/features":
            self.send_features()
            return

        if request.path.startswith("/api/sites/"):
            self.send_site(request.path.removeprefix("/api/sites/"))
            return

        if request.path.startswith("/static/"):
            relative_path = unquote(request.path.removeprefix("/static/"))
            requested_file = (STATIC_DIR / relative_path).resolve()
            if STATIC_DIR.resolve() not in requested_file.parents:
                self.send_error(HTTPStatus.FORBIDDEN)
                return
            self.send_file(requested_file)
            return

        self.send_error(HTTPStatus.NOT_FOUND)

    def send_sites(self, query: dict[str, list[str]]) -> None:
        search = query.get("q", [""])[0].strip()
        cost = query.get("cost", ["all"])[0]
        site_type = query.get("site_type", ["all"])[0]
        included_features = [value.strip() for value in query.get("feature_in", []) if value.strip()]
        excluded_features = [value.strip() for value in query.get("feature_out", []) if value.strip()]
        parameters: list[object] = []
        conditions: list[str] = []

        if search:
            conditions.append("""
                (s.name LIKE ? ESCAPE '\\'
                 OR COALESCE(s.nearest_town, '') LIKE ? ESCAPE '\\'
                 OR COALESCE(s.notes, '') LIKE ? ESCAPE '\\')
            """)
            escaped = search.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
            pattern = f"%{escaped}%"
            parameters.extend([pattern, pattern, pattern])

        if cost == "free":
            conditions.append("s.fee_amount = 0")
        elif cost == "paid":
            conditions.append("s.fee_amount > 0")

        if site_type == "dispersed":
            conditions.append("s.site_category = 'dispersed'")
        elif site_type == "non-dispersed":
            conditions.append("s.site_category <> 'dispersed'")

        for feature in included_features:
            conditions.append("""
                EXISTS (
                    SELECT 1 FROM site_features AS sf_in
                    JOIN features AS f_in ON f_in.id = sf_in.feature_id
                    WHERE sf_in.site_id = s.id AND f_in.name = ?
                )
            """)
            parameters.append(feature)

        for feature in excluded_features:
            conditions.append("""
                NOT EXISTS (
                    SELECT 1 FROM site_features AS sf_out
                    JOIN features AS f_out ON f_out.id = sf_out.feature_id
                    WHERE sf_out.site_id = s.id AND f_out.name = ?
                )
            """)
            parameters.append(feature)

        where = f"WHERE {' AND '.join(conditions)}" if conditions else ""

        sql = f"""
            SELECT s.id, s.name, s.latitude, s.longitude, s.nearest_town,
                   s.nearest_town_state, s.site_category, s.tent_allowed,
                   s.rv_allowed, s.water_available, s.toilet_type,
                   s.fee_amount, s.fee_description, s.elevation_ft
            FROM sites AS s
            {where}
            ORDER BY s.name COLLATE NOCASE
        """

        with database_connection() as connection:
            sites = [dict(row) for row in connection.execute(sql, parameters)]
        self.send_json({"sites": sites, "count": len(sites)})

    def send_features(self) -> None:
        with database_connection() as connection:
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
        self.send_json({"features": features})

    def send_site(self, raw_id: str) -> None:
        try:
            site_id = int(raw_id)
        except ValueError:
            self.send_json({"error": "Invalid site ID"}, HTTPStatus.BAD_REQUEST)
            return

        with database_connection() as connection:
            site = connection.execute(
                """
                SELECT s.*, src.title AS source_title, src.page_number,
                       src.image_filename,
                       GROUP_CONCAT(f.name, '|') AS feature_names
                FROM sites AS s
                JOIN sources AS src ON src.id = s.source_id
                LEFT JOIN site_features AS sf ON sf.site_id = s.id
                LEFT JOIN features AS f ON f.id = sf.feature_id
                WHERE s.id = ?
                GROUP BY s.id
                """,
                (site_id,),
            ).fetchone()

        if site is None:
            self.send_json({"error": "Site not found"}, HTTPStatus.NOT_FOUND)
            return

        result = dict(site)
        result["features"] = result.pop("feature_names").split("|") if result["feature_names"] else []
        self.send_json(result)

    def send_json(self, value: object, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def send_file(self, path: Path) -> None:
        if not path.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        body = path.read_bytes()
        content_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8" if content_type.startswith("text/") else content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: object) -> None:
        print(f"{self.address_string()} - {format % args}")


def main() -> None:
    if not DATABASE.is_file():
        raise SystemExit(f"Database not found: {DATABASE}")

    server = ThreadingHTTPServer(("127.0.0.1", 8000), CampingRequestHandler)
    print("BLM camping map running at http://127.0.0.1:8000")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
