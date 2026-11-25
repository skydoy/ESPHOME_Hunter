# Security policy

## Supported versions
Only the latest release receives fixes. Devices update themselves over the air through the
**Firmware Update** entity.

| Version | Supported |
|---|---|
| `0.1.16` (current release) | ✅ |
| `0.1.15` and older | ❌ |

## Reporting a vulnerability
Please **do not open a public issue**. Report it privately through
[GitHub private vulnerability reporting](https://github.com/skydoy/ESPHOME_Hunter/security/advisories/new).
Include the firmware version, the affected file or feature, and steps to reproduce.

You can expect a first reply within 7 days. Once a fix is released, the advisory is published
with credit to the reporter unless you prefer otherwise.

## Scope
In scope: the firmware in this repository, the release workflow and the web installer.
Out of scope: ESPHome itself, Home Assistant, and the Hunter_LS hardware / X-Core electronics
(report those upstream or to the hardware author). Remember that the X-Core has mains voltage
inside; that is a safety matter, not a software vulnerability.

## Hardening tips
The prebuilt firmware ships without an API key, OTA password or hotspot password so that any
Home Assistant can adopt it. After adopting it in the ESPHome Device Builder, add these to your
own configuration and flash it once:
- `api: encryption: key:` (Home Assistant asks for it when you add the device; the Builder
  usually generates one already)
- an OTA password (`ota: - platform: esphome password:`)
- a fallback hotspot password (`wifi: ap: password:`)

What the device exposes on your local network (web page, Home Assistant API, OTA, setup
hotspot, USB setup) and how to lock it down is explained in
[What is reachable on your network](docs/security.md#what-is-reachable-on-your-network).

More detail: [Security and over-the-air updates](docs/security.md) ·
[Segurança e atualizações pelo ar](docs/seguranca.md).
