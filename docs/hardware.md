# Hardware and pin map

The Hunter_LS PCB is designed by **Luís Soares** ([luisfosoares/Hunter_LS](https://github.com/luisfosoares/Hunter_LS))
following **CZSmith**'s [HunterMonitor](https://github.com/czsmith/HunterMonitor) schematic:
- **REM**: the ESP sends Hunter ROAM remote commands to the X-Core's REM terminal through an opto-coupler.
- **Zone feedback**: each valve output (24 V AC) drives an opto-coupler, so the ESP sees whether the valve is really powered.
- **SEN**: an opto-isolated switch in the rain-sensor loop; opening it blocks all watering (*Pause Watering*).
- On-board DC-DC converter powered from the X-Core's 24 V AC; a jumper selects external/USB power.

## v1.x (v1.0.0 / v1.1.0 / v1.1.1) – Wemos D1 mini (ESP8266), 4 zones
Taken from HunterMonitor's `hunter-roam-alt.yaml`. **To be confirmed by Luís for the Hunter_LS PCB.**

| D1 mini pin | Function |
|---|---|
| D2 (GPIO4) | REM (ROAM commands) |
| D1 (GPIO5) | SEN ("Pause Watering") |
| D5 / D6 / D7 (GPIO14/12/13) | Zone 1 / 2 / 3 feedback (inverted, pull-up) |
| A0 | Zone 4 feedback (analog) |
| D4 (GPIO2) | Status LED (on-board) |

ROAM driver: `javiervidao/Hunter_Roam` (Arduino), pinned to commit `7c51ca1`.

## v2.0.0 – Seeed XIAO ESP32-C6, up to 8 zones
**PLACEHOLDER pin map – not confirmed.** Luís converted the firmware for this board; his pin
assignment and ROAM timings are needed (see the open questions in the pull request).

| XIAO pin | GPIO | Function (placeholder) |
|---|---|---|
| D0 / D1 / D2 / D3 | 0 / 1 / 2 / 21 | Zone 1 / 2 / 3 / 4 feedback |
| D4 / D5 / D6 / D7 | 22 / 23 / 16 / 17 | Zone 5 / 6 / 7 / 8 feedback |
| D8 | 19 | REM |
| D9 | 20 | SEN |
| D10 | 18 | free |
| – | 15 | Status LED (user LED) |
| – | 3 / 14 | RF switch power / antenna select ("External Antenna") |

ROAM driver: `luisfosoares/Hunter_ESP_IDF` (ESP-IDF), pinned to commit `9e765a4`.

## Licences
Neither ROAM driver repository declares a licence, so this repository does not copy their code:
it fetches them as ESPHome `external_components` at a fixed commit.
