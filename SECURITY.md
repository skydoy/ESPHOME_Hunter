# Security

Please report security problems privately through
[GitHub security advisories](https://github.com/skydoy/ESPHOME_Hunter/security/advisories/new),
not in a public issue.

Notes: the installer firmware ships without Wi-Fi credentials, API encryption key or OTA
password (generic image for everyone). Adopt the device in the ESPHome Device Builder to get
an API encryption key and to set an OTA password. The fallback hotspot is open only while the
device cannot reach its saved Wi-Fi.
