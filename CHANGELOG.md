# Changelog

All notable changes to the firmware and installer in this fork. Format:
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versions follow [SemVer](https://semver.org/).
The Hunter_LS PCB versions (v1.0.0 … v2.0.0) are Luís Soares's hardware versions and are
described in the [README](README.md); firmware versions below are independent of them.

## [Unreleased]

## [0.1.13] - 2026-11-09
### Changed
- Short, beginner-friendly READMEs (PT/EN) with the same top block as ESPHome_AC; technical
  details and web UI screenshots moved to the docs.
- Web installer simplified to 3 steps: choose the board, connect by USB, install.
- New documentation site (MkDocs Material, PT/EN) published at `/docs/`.
- No firmware behaviour changes.

## [0.1.12] - 2026-11-09
### Added
- Factory OTA UX (same idea as ESPHome_AC): *Update Status*, *Check for Update*, *Install Update*,
  *Auto Update* (default on, nightly 03:MM random minute, skip &lt;10 min after boot; time from
  Home Assistant or SNTP). `http_request` id `hunter_http_request` (ESP8266 `verify_ssl: false`).
- Adopted builds: *Update Status* text "New version X available, install from Device Builder".
- Device web UI: PT/EN language toggle (entity names, group headers, diagnostic/update values),
  live X-Core wiring diagram driven by zone state (`/events`), LCD ZONE/ZONA, installer
  `favicon.png`, full-page screenshots in the READMEs.
- Home Assistant blueprint `blueprints/automation/esphome_hunter_update_available.yaml`.
- Compatibility / Compatibilidade sections in the READMEs (Hunter_LS boards + Hunter controllers).
- Security / OTA guides (`docs/security.md`, `docs/seguranca.md`) linked from the READMEs and
  `SECURITY.md`; `.github/CODEOWNERS`.

### Changed
- GitHub Actions runners pinned to `ubuntu-24.04`; third-party Actions pinned by commit SHA.
- `THIRD_PARTY_NOTICES.md`: note that firmware `.bin` images include ESPHome's GPL-3.0 C++ runtime;
  PolyForm Noncommercial covers this project's own code.

## [0.1.11] - 2026-11-09
### Changed
- Wiring picture replaced with the simplified Hunter X-Core diagram (1790×1200, animated sprinklers for zones 1–8) in the READMEs, docs/hardware.md and the web installer. Connection table unchanged (24VAC, REM, SEN, C, zones 1–8).

## [0.1.10] - 2026-11-09
### Added
- Project favicon (droplet+chip) on the device web UI at `http://<device>/` via `web_server` `js_include` (same approach as Altherma; applied to v1 and v2).
- [PolyForm Noncommercial 1.0.0](LICENSE) licence (same as ESPHome_AC), licence badge on both READMEs, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). The licence covers this repo's firmware/config/docs only — not Luís's Hunter_LS hardware or third-party code (see THIRD_PARTY_NOTICES.md).

### Changed
- User-facing identity uses the **project** name: Wi-Fi fallback hotspot is now `ESPHome Hunter Setup` (was `Hunter-LS Setup`); default hostname prefix `esphome-hunter-xxxxxx` and friendly name `ESPHome Hunter` (was `hunter-ls` / `Hunter Irrigation`). `esphome.project` ids stay `skydoy.hunter-ls-v1` / `skydoy.hunter-ls-v2` so OTA manifests and adopted packages keep working. Docs and the web installer updated accordingly.

## [0.1.9] - 2026-11-09
### Changed
- READMEs and the web installer now show the board→X-Core connection table right under the wiring picture (X-Core with animated sprinklers).

## [0.1.8] - 2026-11-07
### Changed
- Wiring picture simplified: only the Hunter X-Core and its zones 1–8 with animated sprinklers (zones run one after another). Board-to-X-Core connections are in the table in docs/hardware.md and in the installer text.

## [0.1.7] - 2026-11-07
### Changed
- Wiring diagram redrawn for beginners: real photo of the v2.0.0 board, drawing of the X-Core terminals, only the wires to connect, and animated sprinklers running zones 1 to 8. Explanations moved to the table in docs/hardware.md.

## [0.1.6] - 2026-11-07
### Added
- Wiring diagram (X-Core terminals to the Hunter_LS v2.0.0 connectors, power jumper, XIAO pins) in the README, docs/hardware.md and the web installer, in the same style as ESPHome_AC.

## [0.1.5] - 2026-11-04
### Changed
- All European Portuguese texts (web installer, README.pt.md, guia rápido, problemas) now address the user informally with "tu" ("A tua placa", "Liga", "Escolhe", "Carrega em"), matching the other projects.

## [0.1.4] - 2026-11-04
### Changed
- Web installer now uses the same visual language as the ESPHome_AC and Altherma installers: same cyan→blue header gradient and palette (light and dark), same PT/EN pills and ☾/☀ theme toggle (same markup, size and position, icon centred), same "Like it?" support row and Ko-fi/Buy Me a Coffee pill styles.

## [0.1.3] - 2026-11-04
### Added
- Dark mode in the web installer: follows the system theme, with a ☀️/🌙 toggle (PT/EN labels) saved in the browser; no flash on load. ESP Web Tools dialogs follow the theme.
### Changed
- Installer header, buttons and Ko-fi button use darker colours so text meets WCAG AA contrast.

## [0.1.2] - 2026-11-04
### Changed
- READMEs, docs and the web installer credit the original authors as plain text, without links to other GitHub repos.
### Added
- "Automatic updates (OTA)" and "Changelog" sections in both READMEs.

## [0.1.1] - 2026-11-02
### Added
- Ko-fi and Buy Me a Coffee links at the top of the READMEs and the web installer, plus `.github/FUNDING.yml`.

## [0.1.0] - 2026-11-02
### Added
- ESPHome firmware for both boards: `devices/hunter-ls-v1.yaml` (Wemos D1 mini, 4 zones) and
  `devices/hunter-ls-v2.yaml` (XIAO ESP32-C6, 2/4/6/8 zones via `zone_count`).
- Zone switches that follow the real valve state (opto-coupler feedback), *Watering*,
  *Active Zone*, *Run Time*, *Run Program A/B/C*, *Stop All*, *Pause Watering*, and
  Home Assistant actions `start_zone`, `stop_zone`, `stop_all`, `run_program`.
- Wi-Fi setup without YAML: Improv Serial (web installer), Improv over BLE (v2.0.0), and the
  `Hunter-LS Setup` hotspot with captive portal.
- Over-the-air updates from GitHub Pages (*Firmware Update* entity) for installer firmware;
  *Update Available* / *Latest Version* for configs adopted in the ESPHome Device Builder.
- Web installer (ESP Web Tools) with a board picker, CI builds, releases and the `stable` branch.
- Logo, a bilingual (PT/EN) web installer, a short README and quick start in Portuguese and English, troubleshooting, configuration and hardware docs.

- v2.0.0 pin map recovered from Luís Soares's own v2.0.0 firmware (REM GPIO21, SEN GPIO22,
  zones GPIO0/1/2/16/17/19/20/18) and his cold-boot restart; see [docs/hardware.md](docs/hardware.md).

### Not yet verified
- Not yet tested on a real board with this firmware. Please report how it goes in an issue.

[Unreleased]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.12...HEAD
[0.1.12]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.11...v0.1.12
[0.1.11]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.10...v0.1.11
[0.1.10]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.9...v0.1.10
[0.1.9]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.8...v0.1.9
[0.1.8]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.7...v0.1.8
[0.1.7]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.6...v0.1.7
[0.1.6]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/skydoy/ESPHOME_Hunter/releases/tag/v0.1.0
