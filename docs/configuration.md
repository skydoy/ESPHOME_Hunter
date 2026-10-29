# Configuration (advanced)

The web-installer firmware needs no configuration. This page is for people who adopt the device
in the **ESPHome Device Builder** to change settings or add their own YAML.

## Adopt in the Device Builder
The Device Builder shows the device as *Discovered* → **Take control / Adopt**. The generated YAML is short:

```yaml
substitutions:
  name: hunter-ls-abc123
  friendly_name: Hunter Irrigation
packages:
  skydoy.hunter-ls-v2: github://skydoy/ESPHOME_Hunter/devices/hunter-ls-v2.yaml@stable
esphome:
  name: ${name}
  name_add_mac_suffix: false
  friendly_name: ${friendly_name}
api:
  encryption:
    key: <generated>
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
```

`@stable` always points at the latest release, so **Install** updates it. Adopted devices do not
have the *Firmware Update* entity (it would overwrite your YAML); *Update Available* tells you when to press Install.

## Settings (substitutions)
| Substitution | Default | Meaning |
|---|---|---|
| `zone_count` (v2.0.0) | `8` | Zones shown in Home Assistant: `2`, `4`, `6` or `8`. |
| `zone_on_delay` | `50ms` | Valve feedback must stay on this long to count as running. |
| `zone_off_delay` | `500ms` | Valve feedback must stay off this long to count as stopped (filters the 50 Hz AC ripple). |
| `zone_adc_threshold` (v1.x) | `2.5` | Volts on A0 below which zone 4 counts as running. |
| `friendly_name` | `Hunter Irrigation` | Device name in Home Assistant. |

Example (4-zone X-Core on a v2.0.0 board):
```yaml
substitutions:
  zone_count: "4"
```

## Actions for automations
```yaml
action: esphome.hunter_ls_abc123_start_zone
data: { zone: 2, minutes: 15 }
```
Also `_stop_zone` (`zone`), `_stop_all`, `_run_program` (`program`: 1 = A, 2 = B, 3 = C).

## Pins
Pins are substitutions in `core/boards/*.yaml` (`rem_pin`, `sen_pin`, `zoneN_pin`) and can be
overridden the same way. See [hardware.md](hardware.md).
