# Contributing

Thanks for helping! Hardware questions (PCB, buying a board) go to Luís Soares, see the README.

- Keep the README short; details go in `docs/`. Luís's original README stays unchanged in `docs/original-hunter-ls.md`.
  User docs exist in Portuguese and English: update both (`guia-rapido.md`/`quick-start.md`,
  `problemas.md`/`troubleshooting.md`, `README.pt.md`/`README.md`).
- Board-specific things (pins, ESP chip, ROAM driver) live in `core/boards/`; X-Core logic in
  `hunter/`; generic services in `core/`. `devices/` only composes packages.
- Before a PR: `esphome config devices/hunter-ls-v1.yaml` and `devices/hunter-ls-v2.yaml` pass,
  and `CHANGELOG.md` has a line under **Unreleased**.
- Say what you tested on real hardware (board version, X-Core model), or "not tested on hardware".

## Repository layout
| Folder | What |
|---|---|
| `devices/` | One file per board (`*.yaml` to adopt, `*.factory.yaml` = web-installer firmware) |
| `core/boards/` | Pins, ESP chip and ROAM driver per board |
| `hunter/` | X-Core logic: controller, zones |
| `core/` | Wi-Fi setup, diagnostics, web page, updates |
| `static/` | Web installer page (published to GitHub Pages) |
| `docs/` | Guides (PT + EN), hardware, configuration; `docs/img/` logo and photos |
| `hardware/` | Luís's full-size PCB and installation photos |
| `tools/` | `make-logo.py` (regenerates the logo) |

## Releasing
1. Move the **Unreleased** notes to `## [x.y.z] - YYYY-MM-DD` and set `project_version: "x.y.z"`
   in both `devices/hunter-ls-v1.yaml` and `devices/hunter-ls-v2.yaml`.
2. Tag `vx.y.z` on `main`. CI builds both boards, publishes the installer and OTA manifests to
   GitHub Pages, creates the GitHub Release and moves the `stable` branch to the tag.
