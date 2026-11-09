# Install

## 1. Open the installer

Open **[https://skydoy.github.io/ESPHOME_Hunter/](https://skydoy.github.io/ESPHOME_Hunter/)** in Chrome or Edge on a computer.

## 2. Pick your board

The version is printed on the PCB.

- **v2.0.0** — black PCB, XIAO ESP32-C6, up to 8 zones, USB-C
- **v1.x** — Wemos D1 mini, 4 zones, micro-USB

## 3. Connect USB and Install

Plug the ESP into the computer with a USB **data** cable **before** fitting the board in the X-Core. Press **Install**, pick the serial port, confirm.

You should see a progress bar (~1 minute), then the Wi-Fi window. Type your **2.4 GHz** network (or later join the `ESPHome Hunter Setup` hotspot from your phone).

!!! tip "Board not showing up?"
    Use a data cable. On v2, hold **BOOT** while plugging in. On v1, install the CH340/CP210x driver.

## Next

[Wiring](wiring.md) → fit the board, then [Home Assistant](home-assistant.md).
