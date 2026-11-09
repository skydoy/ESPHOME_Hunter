<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/img/logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="docs/img/logo-light.png">
    <img src="docs/img/logo-light.png" alt="ESPHome Hunter" width="280">
  </picture>
</p>

<p align="center"><b>❤️ Like it? Help me bring you something even better.</b><br>
  <a href="https://ko-fi.com/skydoy"><img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-fi"></a>
  <a href="https://buymeacoffee.com/skydoy"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee"></a>
</p>

<p align="center">
  <a href="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/publish.yml"><img src="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/publish.yml/badge.svg" alt="Build"></a>
  <a href="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/validate.yml"><img src="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="https://github.com/skydoy/ESPHOME_Hunter/releases/latest"><img src="https://img.shields.io/github/v/release/skydoy/ESPHOME_Hunter?sort=semver" alt="Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue" alt="License: PolyForm Noncommercial"></a>
</p>

<p align="center"><b>Your Hunter X-Core irrigation controller in Home Assistant. Plug in, click Install, done. No YAML.</b><br>
🇵🇹 <a href="README.pt.md">Ler em português</a></p>

<p align="center">
  <a href="https://skydoy.github.io/ESPHOME_Hunter/"><img src="https://img.shields.io/badge/Open%20the%20web%20installer-0A8FD8?style=for-the-badge&logo=esphome&logoColor=white" alt="Open the web installer" height="40"></a>
</p>

Firmware for **[Luís Soares's Hunter_LS board](docs/original-hunter-ls.md)**, a small PCB that fits
inside the X-Core, starts zones like the Hunter remote and reads back whether each valve is really on.
Local only: no cloud, no app, no account.

## Install in 3 steps
1. **Flash.** Open the **[web installer](https://skydoy.github.io/ESPHOME_Hunter/)** in Chrome or Edge,
   pick your board (the version is printed on the PCB), plug the ESP into your computer by USB → **Install**.
2. **Wi-Fi.** Type your Wi-Fi in the same window. (Or later: join the `ESPHome Hunter Setup` hotspot from your phone.)
3. **Fit and add.** Unplug the X-Core, set its sensor switch to **Active**, fit the board, plug it back in.
   Home Assistant shows *ESPHome Hunter* under **Settings → Devices & services** → **Configure**.

[![Wiring diagram](docs/img/wiring.svg)](docs/hardware.md#wiring)

The picture shows the X-Core and its zones. Where each Hunter_LS wire goes:

| Hunter_LS (PCB label) | X-Core terminal | What it does |
|---|---|---|
| VAC-L, VAC-R | 24VAC, 24VAC | Powers the board |
| REM | REM | ROAM remote commands |
| SEN-L, SEN-R | SEN, SEN | *Pause Watering* (set sensor switch to **Active**) |
| ZC | C | Valve common (feedback return) |
| Z1 … Z8 | 1 … 8 | Valve feedback (v1: Z1–Z4 only) |

Power jumper (blue): **5V** when installed in the X-Core; **N/C** for USB-only flashing.
More detail: **[Hardware & pins](docs/hardware.md#wiring)**.

Step-by-step with photos: **[Quick start](docs/quick-start.md)** · **[Guia rápido (PT)](docs/guia-rapido.md)**

## What you get in Home Assistant
| Entity | What it does |
|---|---|
| **Zone 1 … Zone N** | Starts / stops a zone for *Run Time* minutes. Shows the **real valve state**. |
| **Watering**, **Active Zone** | Is anything watering, and which zone. |
| **Run Time** | Minutes for a zone started from Home Assistant (1–240). |
| **Run Program A / B / C**, **Stop All** | Same as the controller's buttons. |
| **Pause Watering** | Blocks all watering, including the X-Core's own schedule (like a rain sensor). |
| **Firmware Update** | New versions install over Wi-Fi with one click. |

## Boards
| | **v2.0.0** (black PCB) | **v1.x** (v1.0.0 / v1.1.0 / v1.1.1) |
|---|---|---|
| ESP module | Seeed XIAO ESP32-C6 | Wemos D1 mini (ESP8266) |
| Zones | up to 8 (2/4/6/8) | 4 |
| Wi-Fi setup | USB, Bluetooth or hotspot | USB or hotspot |

> **Status:** v0.1.0 is built and checked automatically, but not yet tested on a real board.
> The v2.0.0 pins come from Luís's own firmware. Tried it? Please [tell us](https://github.com/skydoy/ESPHOME_Hunter/issues).

## Compatibility
This firmware only works with **Luís Soares's Hunter_LS boards** (v1.x: Wemos D1 mini / ESP8266; v2.0.0: Seeed XIAO ESP32-C6), fitted in a **Hunter** irrigation controller that has REM, SEN and zone terminals — for example the Hunter X-Core (up to 8 zones on v2). Other boards or controllers are not supported.

## Automatic updates (OTA)
Nothing to do: with **Auto Update** on (the default), the board checks for a new release once a
night at 03:MM local time (a random minute so devices do not all hit the server together) and
installs it. It also checks at start-up and every 6 hours. Only tested releases from the
`stable` branch are offered.
API key, Device Builder vs factory OTA, and the open LAN web page:
[Security and OTA](docs/security.md).
- **Installed with the web installer:** Home Assistant shows a **Firmware Update** card
  (Settings → Updates). You also get **Check for Update**, **Install Update** and **Update Status**
  on the device. Press **Install**, wait 1–2 minutes and don't unplug the controller.
  Your Wi-Fi and zones are kept.
- **Adopted in the ESPHome Device Builder:** the board only *tells* you a new version exists
  (*Update Available*, *Check for Update*, *Update Status*). Press **Install** in the Device
  Builder; your config already follows `stable`, so no YAML edit is needed.
- **Notify me:** import the Home Assistant blueprint
  `blueprints/automation/esphome_hunter_update_available.yaml` to get a phone notification when
  *Update Available* turns on.
- **v1 (ESP8266):** it can't verify the HTTPS certificate when downloading. It still works,
  but if you prefer, update by USB from the [installer](https://skydoy.github.io/ESPHOME_Hunter/).

## Changelog
Latest: **v0.1.11** – simplified animated X-Core wiring picture (zones 1–8) in the READMEs and web installer.
All versions: [CHANGELOG.md](CHANGELOG.md).

## Docs
[Troubleshooting](docs/troubleshooting.md) · [Problemas (PT)](docs/problemas.md) ·
[Advanced configuration](docs/configuration.md) · [Hardware & pins](docs/hardware.md) ·
[Changelog](CHANGELOG.md) · [Security and OTA](docs/security.md) ·
[Report a problem](https://github.com/skydoy/ESPHOME_Hunter/issues) ·
[Security policy](SECURITY.md) · [Third-party notices](THIRD_PARTY_NOTICES.md)

## Credits
- **Hardware: Luís Soares**, Hunter_LS board.
  The PCB, its versions and photos are his work. [His original README](docs/original-hunter-ls.md)
  (including how to get a board) · [photos](hardware/).
- Schematic and the original ESPHome approach: **CZSmith**, HunterMonitor (MIT, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)).
- Hunter ROAM drivers: Hunter_Roam by javiervidao (v1.x) and
  Hunter_ESP_IDF by Luís Soares (v2.0.0), used as pinned external components.
- Firmware, installer and logo: skydoy.

## License
[PolyForm Noncommercial 1.0.0](LICENSE): free for personal and non-commercial use, forks
welcome, commercial use not permitted. Covers this repo's firmware, config, installer and docs
only — not Luís's Hunter_LS hardware design, and not third-party code (see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)). Use at your own risk: the X-Core has mains
voltage inside.

Hunter and X-Core are trademarks of Hunter Industries. This is an independent community project,
not affiliated with or endorsed by Hunter Industries.
