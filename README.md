<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/img/logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="docs/img/logo-light.png">
    <img src="docs/img/logo-light.png" alt="ESPHome Hunter" width="280">
  </picture>
</p>

<p align="center">
  <a href="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/publish.yml"><img src="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/publish.yml/badge.svg" alt="Build"></a>
  <a href="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/validate.yml"><img src="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="https://github.com/skydoy/ESPHOME_Hunter/releases/latest"><img src="https://img.shields.io/github/v/release/skydoy/ESPHOME_Hunter?sort=semver" alt="Release"></a>
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
2. **Wi-Fi.** Type your Wi-Fi in the same window. (Or later: join the `Hunter-LS Setup` hotspot from your phone.)
3. **Fit and add.** Unplug the X-Core, set its sensor switch to **Active**, fit the board, plug it back in.
   Home Assistant shows *Hunter Irrigation* under **Settings → Devices & services** → **Configure**.

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

## Docs
[Troubleshooting](docs/troubleshooting.md) · [Problemas (PT)](docs/problemas.md) ·
[Advanced configuration](docs/configuration.md) · [Hardware & pins](docs/hardware.md) ·
[Changelog](CHANGELOG.md) · [Report a problem](https://github.com/skydoy/ESPHOME_Hunter/issues)

## Credits
- **Hardware: [Luís Soares](https://github.com/luisfosoares)**, [luisfosoares/Hunter_LS](https://github.com/luisfosoares/Hunter_LS).
  The PCB, its versions and photos are his work. [His original README](docs/original-hunter-ls.md)
  (including how to get a board) · [photos](hardware/).
- Schematic and the original ESPHome approach: **[CZSmith](https://github.com/czsmith)**, [HunterMonitor](https://github.com/czsmith/HunterMonitor) (MIT, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)).
- Hunter ROAM drivers: [javiervidao/Hunter_Roam](https://github.com/javiervidao/Hunter_Roam) (v1.x) and
  [luisfosoares/Hunter_ESP_IDF](https://github.com/luisfosoares/Hunter_ESP_IDF) (v2.0.0), used as pinned external components.
- Firmware, installer and logo: [skydoy](https://github.com/skydoy).

Hunter and X-Core are trademarks of Hunter Industries. This is an independent community project,
not affiliated with or endorsed by Hunter Industries.
