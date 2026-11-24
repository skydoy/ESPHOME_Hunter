# Contributing

Thanks for helping! Hardware questions (PCB, buying a board) go to Luís Soares, see the README.

- Keep the README short; details go in `docs/`. Luís's original README stays unchanged in `docs/original-hunter-ls.md`.
  User docs exist in Portuguese and English: update both (`guia-rapido.md`/`quick-start.md`,
  `problemas.md`/`troubleshooting.md`, `README.pt.md`/`README.md`).
- Board-specific things (pins, ESP chip, ROAM driver) live in `core/boards/`; X-Core logic in
  `hunter/`; generic services in `core/`. `devices/` only composes packages.
- Before a PR: `esphome config devices/hunter-ls-v1.yaml` and `devices/hunter-ls-v2.yaml` pass,
  and `CHANGELOG.md` has a line under **Unreleased**.
- Every commit must use the author `skydoy <25871317+skydoy@users.noreply.github.com>`
  (also commits made by tools or AI agents). A CI check fails the PR otherwise. Set it with
  `git config user.name skydoy` and `git config user.email 25871317+skydoy@users.noreply.github.com`.
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

## ESPHome version and automatic releases
The ESPHome compiler version is pinned in `.github/esphome-version` and used by Validate and the firmware build.

A daily workflow (`.github/workflows/esphome-auto-update.yml`, 04:00 UTC) checks the latest stable ESPHome release on PyPI (no beta or dev builds). If it is newer, it opens a PR that bumps the pin, raises the firmware `project_version` by a patch (for example 0.1.15 → 0.1.16) and adds a CHANGELOG entry. The same workflow compiles both boards, including the app-size check. If that build passes, it merges the PR, tags `vX.Y.Z`, publishes the GitHub release, deploys the installer and moves `stable`. If the build fails, the PR stays open and there is no release.

Pushes to `main` that change the firmware (`devices/`, `core/` or `hunter/`) also cut a patch release once the build passes. Changes that only touch docs, the READMEs, the web installer, or other non-firmware files do not.

You can still cut a release by hand with the steps above. Do not push a tag from a failed build.
