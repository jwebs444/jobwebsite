# BLM Camping Map

A dependency-free Python web app that reads camping locations from `blm_camping.sqlite` and displays them on an interactive OpenStreetMap map.

The browser reads a generated JSON snapshot of the SQLite records, allowing the same interface to deploy as a static Cloudflare Pages site. The SQLite database remains the source of record.

After changing the database, refresh the deployment snapshot with `python export_static_data.py` before building.

## Run

From PowerShell in this directory, run:

```powershell
.\start.ps1
```

Then open <http://127.0.0.1:8000>.

The launcher uses a system Python installation when available, otherwise it finds the Python runtime bundled with Codex Desktop. The server has no third-party dependencies. The browser needs internet access to load Leaflet and OpenStreetMap tiles.

## Build for deployment

```powershell
npm run build
```

The static deployment is written to `dist/`.
