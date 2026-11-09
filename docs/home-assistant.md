# Home Assistant

## Add the device

**Settings → Devices & services**: *ESPHome Hunter* shows up under Discovered → **Configure**. Give it an area (e.g. Garden).

If it does not appear, add it by hand: ESPHome integration → host `esphome-hunter-xxxxxx.local` (or its IP). Same network/VLAN as Home Assistant; mDNS allowed.

## What you get

| Entity | What it does |
|---|---|
| **Zone 1 … Zone N** | Starts / stops a zone for *Run Time* minutes. Shows the **real** valve state. |
| **Watering**, **Active Zone** | Is anything watering, and which zone |
| **Run Time** | Minutes for a zone started from Home Assistant (1–240) |
| **Run Program A / B / C**, **Stop All** | Same as the controller's buttons |
| **Pause Watering** | Blocks all watering, including the X-Core schedule (like a rain sensor) |
| **Firmware Update** | New versions over Wi-Fi |

## Quick test

Set **Run Time** to 1, turn on **Zone 1**, check the valve opens and the switch stays on. If it turns itself off after a second, see [Troubleshooting](troubleshooting.md).

v2 shows 8 zones; if your X-Core has fewer, disable the unused ones in Home Assistant (or change `zone_count` — [configuration on GitHub](https://github.com/skydoy/ESPHOME_Hunter/blob/main/docs/configuration.md)).
