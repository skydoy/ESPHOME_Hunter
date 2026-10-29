<!-- Fork maintained by skydoy (Tiago Febra). Everything below the line "Original README" is
     Luís Soares's README, unchanged. -->
# Hunter_LS + ESPHome – plug-and-play Wi-Fi for the Hunter X-Core

> **Hardware: [Luís Soares](https://github.com/luisfosoares) – [luisfosoares/Hunter_LS](https://github.com/luisfosoares/Hunter_LS).**
> The Hunter_LS PCB, its versions, photos and design notes are his work.
> **Schematic and original ESPHome approach: [CZSmith](https://github.com/czsmith) – [HunterMonitor](https://github.com/czsmith/HunterMonitor).**
> Hunter ROAM protocol drivers: [javiervidao/Hunter_Roam](https://github.com/javiervidao/Hunter_Roam) (v1.x) and
> [luisfosoares/Hunter_ESP_IDF](https://github.com/luisfosoares/Hunter_ESP_IDF) (v2.0.0), used as pinned external components.
> Parts of the ESPHome configuration are adapted from HunterMonitor (MIT, © 2024 czsmith), see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
> To buy a board, contact Luís (see *Interest from others* below).

This fork adds ready-made firmware so a Hunter_LS board goes from the box to Home Assistant
without writing any YAML: flash it from the browser, enter your Wi-Fi, and Home Assistant finds it.

**[➜ Open the web installer](https://skydoy.github.io/ESPHOME_Hunter/)** (Chrome or Edge, USB cable)

| | Board v1.x (v1.0.0 / v1.1.0 / v1.1.1) | Board v2.0.0 |
|---|---|---|
| ESP module | Wemos D1 mini (Pro), ESP8266 | Seeed XIAO ESP32-C6 |
| Zones | 4 | 2, 4, 6 or 8 (`zone_count`) |
| Wi-Fi setup | USB (Improv) or hotspot `Hunter-LS Setup` | USB, Bluetooth (Improv) or hotspot |
| Firmware status | built and validated by CI, **not yet tested on hardware** | built and validated by CI, **pin map to be confirmed, not yet tested on hardware** |

## Install in 3 steps
1. Open the [web installer](https://skydoy.github.io/ESPHOME_Hunter/), pick your board (the version is printed on the PCB), plug the ESP module in by USB and press **Install**.
2. Enter your Wi-Fi in the same window (or join the `Hunter-LS Setup` hotspot from your phone).
3. On the X-Core set the sensor bypass switch to **Active**, fit the board, and accept the new device in Home Assistant (**Settings → Devices & services → ESPHome**).

Guides: [Quick start (EN)](docs/quick-start.md) · [Guia rápido (PT)](docs/guia-rapido.md) ·
[Troubleshooting / Problemas](docs/troubleshooting.md) · [Configuration](docs/configuration.md) ·
[Hardware & pins](docs/hardware.md) · [Changelog](CHANGELOG.md)

## What you get in Home Assistant
| Entity | What it does |
|---|---|
| **Zone 1 … Zone N** (switch) | Starts / stops the zone for *Run Time* minutes. Shows the **real valve state** (read back from the valve wires), so it turns itself off if the X-Core did not start the valve. |
| **Zone N Running** | Valve feedback only (useful for automations and history). |
| **Watering** / **Active Zone** | Is anything watering, and which zone. |
| **Run Time** | Minutes used when you start a zone from Home Assistant (1–240). |
| **Run Program A / B / C**, **Stop All** | Same as the buttons on the controller. |
| **Pause Watering** | Opens the rain-sensor loop: nothing waters, not even the X-Core's own schedule, until switched off. |
| **Firmware Update** | New releases install over the air. |

Actions for automations: `esphome.<device>_start_zone` (`zone`, `minutes`), `_stop_zone`, `_stop_all`, `_run_program` (1 = A, 2 = B, 3 = C).

## Repository layout
`devices/` one file per board (what you adopt or build) · `core/boards/` pins and ESP chip ·
`hunter/` X-Core logic and zones · `core/` Wi-Fi, diagnostics, web page, updates ·
`static/` web installer · Luís's PCB photos stay in the repository root.

---

# Original README (Luís Soares)

# Hunter_LS
PCB implementation for Hunter Xcore irrigation system.

# Background 
Hunter XCORE is a  "dumb" system that can be locally programmed but no iOT connection is provided by Hunter. 
Solutions li like (https://github.com/marek-polak/hunter-wifi) can be implemented in homeassistant but lack active status feedback of the valves, without it ins uncertain if system was effectivelly started or not.

# Somebody worked on it already ...  
A great job was done by CZSmith at (https://github.com/czsmith/HunterMonitor) laying down the schematics for a working PCB but hardware was not available so i was up for the challange.

# The challange 
The oportunity was taken to develop a PCB.
Idea was a seamless integration into the Hunter XCORE. 

# PCB 
PCB was designed to fit the case, wave possibility to be integrated without any modification of the system. 
Design follows the schematic from CZSmith.
Through hole was the way to go, spece was not a problem and idea was to learn, solder and integrate all at home.
PCB supplied by JLC PCB.

# Software 
Managed through ESPHome as per (https://github.com/czsmith/HunterMonitor).
On new board V2.0.0 Software above was fully converted to be compatible with XAIO ESP32C6

# Possible improvements
V1.0.0 comes with some "issues"
  1) Power labels and comments should been done in brighter color, not easy to read.
  2) Mistake on footprint definition of 2W10 - currently 90º rotated part vs graphic description.
  3) Hole for antena in left side of PCB its useless as antena wiring would not fit the case - Idea not practical.
  4) Rearragne components if possible to allow space for full usb cable to fit - currently only short cable/angled cable is possible.

# 07/10/2025
# Updated version 1.1.0  
V1.1.0 comes with the following improvements:
  1) New DC-DC converter with wider input range. V1.0.0 DC-DC converter would not work depending on component supplier quality. This new component solves the topic.
  2) Power labels and comments improved with bright color and its now a lot easier to read.
  3) Footprint of 2W10 corrected
  4) Useless hole for antena removed
  5) Removed shunt of VAC-L and Zone C as it was useless
  6) New board color BLUE

V1.1.0
![image](https://github.com/luisfosoares/Hunter_LS/blob/main/V1.1.0.jpg)

# 11/05/2026
# Updated version 1.1.1
V1.1.1 comes with the following improvements:
  1) Improved PCB traces
  2) Removed back support for PSU
  3) New board color RED

V1.1.1
![image](https://github.com/luisfosoares/Hunter_LS/blob/main/V1.1.1.jpeg)

# 16/06/2026
# Updated version 2.0.0
After being challanged to upgrade the board to up to 8 zones i have decided to release this new version, it was a tight fit but no change in any dimension.
V2.0.0 comes with the following improvements:
  1) New controller - XAIO ESP32C6
  2) Better performance
  3) Better wifi signal
  4) Up to 8 zones instead of 4
  5) Added back support for PSU again for stability 
  6) New board color BLACK
     
V2.0.0
![image](https://github.com/luisfosoares/Hunter_LS/blob/main/V2.0.0.jpg)

# Pictures of PCB and installation. 
(Pictures from v1.0.0 but works the same on V1.1.0, V1.1.1 or 2.0.0 - Just follow the labels on the pins of the board)
![image](https://github.com/user-attachments/assets/8abcf170-1876-4fbc-9b6d-4df3dc87784c)
![image](https://github.com/user-attachments/assets/0026dabc-cd52-4feb-be6b-f23143dd2b9e)
![image](https://github.com/user-attachments/assets/44e539b3-e559-4ddc-aaa5-a5bc3d83cabb)
![image](https://github.com/user-attachments/assets/14568da3-a0c9-467b-8901-e5f2e5959b70)
![image](https://github.com/user-attachments/assets/2496b162-fd1f-484b-a2dd-0d603f6e1615)
![image](https://github.com/user-attachments/assets/9290a2b2-218d-46c9-9a58-84029e065b5a)
![image](https://github.com/user-attachments/assets/161a6718-c6a4-4e6c-9298-dddae5da64cf)

# Interest from others 
If you are interested in this kind of item please contact me on (filipee8.net@gmail.com).

# Thanks
Thanks to CZSmith for the inital Schematic.



