# Updates

## Automatic (factory / web-installer image)

With **Auto Update** on (the default), the board checks for a new release once a night at **03:MM** local time (random minute) and installs it. It also checks at start-up and every 6 hours. Only tested releases from the `stable` branch are offered.

Home Assistant also shows a **Firmware Update** card: press **Install**, wait 1–2 minutes, don't unplug. Wi-Fi and zones are kept.

## Device Builder (adopted)

If you adopted the board in the ESPHome Device Builder, it only *reports* a new version (*Update Available*, *Check for Update*, *Update Status*). Press **Install** in the Device Builder — your config already follows `@stable`.

!!! warning "Don't flash the factory image over an adopted build"
    That would wipe your API key and extras. See [Security](security.md).

## Notify me

Import the Home Assistant blueprint  
`blueprints/automation/esphome_hunter_update_available.yaml`  
for a phone notification when *Update Available* turns on.

## v1 (ESP8266)

v1 can't verify the HTTPS certificate when downloading. It still works; if you prefer, update by USB from the [installer](https://skydoy.github.io/ESPHOME_Hunter/).
