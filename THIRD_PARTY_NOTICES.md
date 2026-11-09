# Third-party notices

This repository's firmware, configs, installer and docs are under
[PolyForm Noncommercial 1.0.0](LICENSE) (Copyright (c) 2026 Tiago Febra / skydoy).

The ESPHome configuration in `hunter/` and `core/boards/d1-mini-v1.yaml` (pin map, valve-feedback filters, zone 4 on A0, Pause Watering through SEN) is adapted from [czsmith/HunterMonitor](https://github.com/czsmith/HunterMonitor), distributed under the MIT License:

```
MIT License

Copyright (c) 2024 czsmith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

The Hunter ROAM drivers [javiervidao/Hunter_Roam](https://github.com/javiervidao/Hunter_Roam) and [luisfosoares/Hunter_ESP_IDF](https://github.com/luisfosoares/Hunter_ESP_IDF) are not copied here; ESPHome downloads them at build time from their own repositories at a fixed commit. Neither declares a licence.

The Hunter_LS PCB, photos and original README are by Luís Soares ([luisfosoares/Hunter_LS](https://github.com/luisfosoares/Hunter_LS)), who has not declared a licence; this fork does not add one.

## ESPHome runtime in the firmware
The firmware `.bin` files are built with [ESPHome](https://github.com/esphome/esphome). ESPHome's
C++ runtime, which is compiled into every image, is licensed under
[GPL-3.0](https://github.com/esphome/esphome/blob/dev/LICENSE) (its Python tooling is MIT). That
part keeps its own licence. The PolyForm Noncommercial 1.0.0 licence of this repository covers
this project's own code, configuration, installer and docs: you may use, change and share them,
but not for commercial purposes. This note is informational, not legal advice.

## Also downloaded at build time or in the browser (not stored here)
- **ESP-IDF / Arduino core for ESP32 and ESP8266** (Espressif and contributors), Apache-2.0 / LGPL-2.1: frameworks
  that ESPHome downloads and links into the firmware.
- **ESP Web Tools** (Open Home Foundation), Apache-2.0: the web installer's Install button, loaded from a CDN.
- **ESPHome web_server v3 front end** (ESPHome), loaded from the ESPHome CDN by the board's web page.

Hunter and X-Core are trademarks of Hunter Industries. This is an independent community project,
not affiliated with or endorsed by Hunter Industries.
