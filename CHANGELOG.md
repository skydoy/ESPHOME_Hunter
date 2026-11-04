# Changelog

All notable changes to the firmware and installer in this fork. Format:
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versions follow [SemVer](https://semver.org/).
The Hunter_LS PCB versions (v1.0.0 … v2.0.0) are Luís Soares's hardware versions and are
described in the [README](README.md); firmware versions below are independent of them.

## [Unreleased]

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

[Unreleased]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/skydoy/ESPHOME_Hunter/releases/tag/v0.1.0
