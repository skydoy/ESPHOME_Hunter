# FAQ

## Which boards are supported?

Only **Luís Soares's Hunter_LS** boards: **v1.x** (Wemos D1 mini, 4 zones) and **v2.0.0** (XIAO ESP32-C6, up to 8 zones), in a Hunter controller with REM, SEN and zone terminals (e.g. X-Core). Other boards or controllers are not supported.

## Do I need YAML?

No. Use the [web installer](https://skydoy.github.io/ESPHOME_Hunter/). YAML is optional if you adopt the device in the ESPHome Device Builder.

## Why 2.4 GHz Wi-Fi?

ESP modules on these boards use 2.4 GHz only. 5 GHz networks won't work.

## What is the `ESPHome Hunter Setup` hotspot?

A fallback Wi-Fi access point the board opens when it has no saved network (or can't reach it). Join it from your phone to set Wi-Fi. It is open and only active while Wi-Fi is down.

## Why must the sensor switch be Active?

*Pause Watering* opens the rain-sensor loop. On the X-Core the sensor bypass must be **Active**, or Pause does nothing.

## Can I use this commercially?

No. The firmware is [PolyForm Noncommercial 1.0.0](licence.md): personal and non-commercial use only.

## Where are the device web page screenshots?

[Device web page](web-page.md).

## Something went wrong — where do I look?

[Troubleshooting](troubleshooting.md) · [GitHub issues](https://github.com/skydoy/ESPHOME_Hunter/issues)
