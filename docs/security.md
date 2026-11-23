# Security and over-the-air updates


## Prebuilt firmware (web installer)
The image from the [web installer](https://skydoy.github.io/ESPHOME_Hunter/) is the same for
everyone, so it **cannot contain your keys or passwords**. It ships with:

| Item | Prebuilt firmware | Why |
|---|---|---|
| Home Assistant API encryption key | none | Any Home Assistant on your LAN can adopt it in one click. |
| OTA password (ESPHome) | none | Same public image for all users. |
| Fallback hotspot (`ESPHome Hunter Setup`) | open, only while Wi-Fi is not connected | So you can set Wi-Fi from a phone. |
| Device web page (`http://<ip>/`) | **no password** (LAN only) | By design for local control and live logs. Anyone on your network can view and start or stop zones. |
| Firmware updates | **Firmware Update** + **Auto Update** | Downloaded over HTTPS from this project's GitHub Pages; the manifest carries an MD5 the device checks before reboot. |

On a home network you trust, this is the usual ESPHome ready-made setup. If other people or
devices share that network, harden it as below (or put the controller on a trusted VLAN).

## What is reachable on your network
This is exactly what the firmware opens, taken from its configuration. "Anyone on your
network" means any phone, PC or smart device connected to the same Wi-Fi or LAN.

| What | Where | Protection in the prebuilt firmware | Who can use it |
|---|---|---|---|
| Device web page | `http://<ip>/` (port 80, plain HTTP) | **none** | Anyone on your network can see the zones, start or stop watering, change settings, press **Restart** and read the live logs. |
| Home Assistant connection (native API) | port 6053 | **no encryption key** | Anyone on your network with Home Assistant or the ESPHome tools can connect and control the device. |
| Wireless updates (ESPHome OTA) | port 3232 on v2.0.0, 8266 on v1.x | **no password** | Anyone on your network could upload a different firmware. |
| Setup hotspot `ESPHome Hunter Setup` + setup page | its own Wi-Fi network | **open** (no password) | Anyone near the controller, **only while the hotspot is on**: when no Wi-Fi is saved yet, or about 90 seconds after the saved Wi-Fi stops answering. It turns off again once the device is back on your Wi-Fi. |
| Wi-Fi setup over USB (Improv Serial) | USB cable | needs physical access | Only someone who plugs a cable into the board. |
| Network name (mDNS) | port 5353 | — | Announces the device's name and IP so Home Assistant finds it. |
| Bluetooth | — | not used | Nothing. (Up to 0.1.14 the v2.0.0 board also offered Wi-Fi setup over Bluetooth; it was removed.) |

The device also makes some connections **out** to the internet:

- **Update checks:** every 6 hours (and at night, if **Auto Update** is on) it downloads a
  small file from `https://skydoy.github.io/ESPHOME_Hunter/` to see whether there is a new
  version. It sends nothing about you or your garden. The v2.0.0 board checks the HTTPS
  certificate; the v1.x board (ESP8266) cannot, so it relies on the MD5 check of the downloaded
  firmware.
- **Clock:** it gets the time from Home Assistant, or from public internet time servers (SNTP)
  when Home Assistant is not there.

Nothing else listens or calls home. There is no cloud account and no remote access from the
internet unless you open ports on your router yourself (**don't**).

### Simple ways to protect it
1. **Never forward its ports on your router.** Keep it on your home network only.
2. **Put it on a separate network for smart devices** (an IoT VLAN or a guest network) if your
   router supports it, and allow only Home Assistant to reach it.
3. **Add an API key, an OTA password and a hotspot password** — see
   [Adding an API key](#adding-an-api-key-recommended) below.
4. **Protect or remove the web page** if other people use your network (see the end of the
   next section).
5. **Keep it up to date:** leave **Auto Update** on, or install updates when Home Assistant
   shows them.

## Factory OTA vs Device Builder
- **Web installer / factory image:** Home Assistant shows **Firmware Update**. Press
  **Install**, or leave **Auto Update** on for a night install. Your Wi-Fi and zones are kept.
- **Adopted in the ESPHome Device Builder:** the board only *reports* a new version
  (**Update Available**, **Check for Update**, **Update Status**). Press **Install** in the
  Device Builder; your config already follows `@stable`. Do **not** flash the generic factory
  image over an adopted build — that would wipe your API key and extras.

Details: [configuration.md → Updates (OTA)](https://github.com/skydoy/ESPHOME_Hunter/blob/main/docs/configuration.md#updates-ota).

## Adding an API key (recommended)
Adopt the device in the ESPHome Device Builder (it generates an encryption key for you), then
add an OTA password and hotspot password to your YAML (and Secrets):

```yaml
api:
  encryption:
    key: !secret api_key   # openssl rand -base64 32  (or keep the key the Builder generated)

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ap:
    password: !secret ap_password   # at least 8 characters
```

Flash with **Install → Wirelessly**. Home Assistant will ask for the same `api_key` if you
changed it. Step-by-step for adopting: [Adopt in the Device Builder](https://github.com/skydoy/ESPHOME_Hunter/blob/main/docs/configuration.md#adopt-in-the-device-builder).

To password-protect the device web page, add `web_server: auth:` in your own config; to remove
the page entirely, override the package with `web_server: !remove` (see `core/web-server.yaml`).

## Reporting a vulnerability
See [SECURITY.md](https://github.com/skydoy/ESPHOME_Hunter/blob/main/SECURITY.md). Please do **not** open a public issue for security problems.
