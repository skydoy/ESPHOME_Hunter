# Changelog

All notable changes to the firmware and installer in this fork. Format:
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versions follow [SemVer](https://semver.org/).
The Hunter_LS PCB versions (v1.0.0 … v2.0.0) are Luís Soares's hardware versions and are
described in the [README](README.md); firmware versions below are independent of them.

## [Unreleased]

## [0.1.0] - unreleased
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
- Quick start in English and Portuguese, troubleshooting, configuration and hardware docs.

### Not yet verified
- No hardware test yet. The v2.0.0 pin map is a placeholder until confirmed by Luís Soares.

[Unreleased]: https://github.com/skydoy/ESPHOME_Hunter/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/skydoy/ESPHOME_Hunter/releases/tag/v0.1.0
