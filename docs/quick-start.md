# Quick start

From the box to Home Assistant in about 10 minutes, with no YAML. *Português: [guia-rapido.md](guia-rapido.md).*

> **Status:** the firmware is built and validated automatically but has **not yet been tested on
> a real board**. The v2.0.0 pin map still has to be confirmed by Luís Soares. See [hardware.md](hardware.md).

## You need
- A Hunter_LS board (v1.x or v2.0.0; the version is printed on the PCB).
- A computer with **Chrome or Edge** and a USB data cable (USB-C for v2.0.0, micro-USB for v1.x).
- Your Wi-Fi name and password (2.4 GHz network).
- Home Assistant with the ESPHome integration (it is offered automatically).

## 1. Flash the firmware
1. Open **https://skydoy.github.io/ESPHOME_Hunter/**.
2. Pick your board: **v2.0.0** (black PCB, XIAO ESP32-C6) or **v1.x** (red/blue PCB, Wemos D1 mini).
3. Plug the ESP module into the computer. It can be on the board but the board must **not**
   be connected to the X-Core while it is on USB, unless the power jumper is set to USB (see the board labels).
4. Press **Connect**, choose the serial port (often "USB JTAG/serial" or "CH340/CP210x"), then **Install**.

## 2. Wi-Fi
- Right after installing, the same window asks for your Wi-Fi: enter it and press **Connect**.
- Or, later: on your phone join the hotspot **`Hunter-LS Setup`**, a page opens, pick your network.
  The hotspot comes back by itself whenever the saved Wi-Fi cannot be reached.
- v2.0.0 only: the Home Assistant app can also set up Wi-Fi over Bluetooth.

## 3. Fit the board in the X-Core
1. **Unplug the X-Core transformer** from the mains.
2. Set the X-Core **sensor bypass switch to "Active"** (otherwise *Pause Watering* does nothing).
3. Connect the board's screw/plug terminals to the X-Core following the labels printed on the board
   (zone outputs, VAC, REM, SEN). Luís's photos in the [README](../README.md#pictures-of-pcb-and-installation)
   show a finished installation.
4. Plug the transformer back in. The ESP's LED blinks until Wi-Fi is connected.

## 4. Home Assistant
**Settings → Devices & services**: a new "Hunter Irrigation" device is discovered → **Configure**.
Name it, put it in an area, done. Test with a short run:
set **Run Time** to 1, turn **Zone 1** on, check that the valve opens and *Zone 1 Running* turns on.

## 5. Updates
New versions show up in Home Assistant as **Firmware Update** → **Install**. Nothing else to do.

Something wrong? See [troubleshooting.md](troubleshooting.md).
