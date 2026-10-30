# Third-party notices

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
